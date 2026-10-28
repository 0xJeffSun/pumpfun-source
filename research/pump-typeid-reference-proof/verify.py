"""Check native std probes and actual linked table/call relationships."""
from pathlib import Path
import gzip,hashlib,json
from elf import symbols,symbol_body,relocations,thunk
import proof
P=Path(__file__).resolve().parent;R=P.parents[1]
sha=lambda raw:hashlib.sha256(raw).hexdigest()
def read(path):return json.loads(path.read_bytes())
require=proof.require
def core_chain(image):
 syms=symbols(image)
 panic=next(s for s in syms if s['type']==2 and '9panicking9panic_fmt' in s['name'])
 rel=relocations(image);refs=[r for r in rel if r['section']==panic['section']and r['type']==1]
 require(len(refs)==1 and refs[0]['offset']==16 and refs[0]['addend']==0,'panic_fmt actual vtable relocation')
 table=refs[0]['symbol'];require(table['size']==32,'panic payload vtable size')
 raw=symbol_body(image,table);require(int.from_bytes(raw[8:16],'little')==0 and int.from_bytes(raw[16:24],'little')==1,'panic payload layout')
 slots=[r for r in rel if r['section']==table['section']]
 require(sorted(r['offset']for r in slots)==[0,24]and all(r['type']==1 and r['addend']==0 for r in slots),'panic table method relocations')
 target=next(r['symbol']for r in slots if r['offset']==24);value=thunk(symbol_body(image,target))
 require(value is not None,'actual core panic TypeId thunk')
 return dict(panic_symbol=panic['name'],panic_section=panic['section'],vtable_symbol=table['name'],vtable_section=table['section'],typeid_symbol=target['name'],typeid_section=target['section'],value=[f'{v:016x}'for v in value])

def native(original_entries):
 expected_error=next(e['value']for e in original_entries if e['typeid_slot']==7)
 expected_panic=next(e['value']for e in original_entries if e['typeid_slot']==3)
 sdk=read(P/'native/sdk-inputs.json');require(sdk['archive_sha256']=='6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9','authenticated SDK archive')
 source=sha((P/'source/probe.rs').read_bytes());require(source==sha((P/'public/evidence/probe.rs').read_bytes()),'unchanged public probe source')
 results={}
 for target in ['sbf-solana-solana','sbpf-solana-solana']:
  d=P/'native'/target;launch=read(d/'launch.json');result=read(d/'result.json')
  require(launch['source_inputs']=={'probe.rs':source},'actual compiler source')
  require(launch['sdk_inputs_sha256']==sha((P/'native/sdk-inputs.json').read_bytes()),'compiler SDK input binding')
  require(launch['controller_sha256']==sha((P/'reproduce.py').read_bytes()),'executed reproduction controller')
  require(not launch['original_mounted'],'no original compiler input')
  require(result['returncode']==0 and result['source_unchanged']and result['sdk_unchanged'],'stable native compilation')
  for n,h in result['files'].items():require(sha((d/n).read_bytes())==h,'native output '+target+'/'+n)
  image=(d/'typeid_probe.o').read_bytes();f=[s for s in symbols(image)if s['type']==2 and '4core5error5Error7type_id' in s['name']]
  require(len(f)==1,'compiled StringError thunk')
  value=thunk(symbol_body(image,f[0]));require(value is not None,'compiled StringError instruction body')
  value=[f'{v:016x}'for v in value]
  meta=read(d/'core-member.json');core=gzip.decompress((d/'core-member.o.gz').read_bytes())
  require(sha(core)==meta['sha256']and len(core)==meta['size'],'actual core archive member')
  require(sdk['files'][meta['archive']]==meta['archive_sha256'],'core member source archive hash')
  chain=core_chain(core);require(chain['value']==meta['value'],'core archive semantic binding')
  matches=target=='sbpf-solana-solana'
  require((value==expected_error)==matches and(chain['value']==expected_panic)==matches,'target-library identity/control result')
  results[target]=dict(string_error_typeid=value,panic_payload=chain,original_values_match=matches,object_sha256=sha(image))
 return dict(sdk_files=len(sdk['files']),probes=results)

def verify(validate_ledger=True):
 manifest=read(P/'manifest.json')
 for n,h in manifest['files'].items():require(sha((P/n).read_bytes())==h,'packet hash '+n)
 for n,h in manifest['external_files'].items():require(sha((R/n).read_bytes())==h,'external hash '+n)
 public=read(P/'public/MANIFEST.json')
 for n,h in public.items():require(sha((P/'public'/n).read_bytes())==h,'public input '+n)
 original=(R/'evidence/original/pump/deployed.so').read_bytes();entries,_=proof.scan(original)
 out=dict(native=native(entries),linked={})
 for b in read(P/'public/BUILDS.json'):
  image=gzip.decompress((P/'public'/b['unstripped']).read_bytes());require(sha(image)==b['unstripped_sha256'],'public native ELF')
  result=proof.compare(original,image,control=b['name']=='round36-mac')
  if not result['control']:
   require(result['root_pairs']==28 and result['reached_equal_pairs']==62 and result['equal_direct_edges']==75,'bounded direct-call closure')
  out['linked'][b['name']]=result
 if validate_ledger:require(out==json.loads(gzip.decompress((P/'reference-proof.json.gz').read_bytes())),'independently recomputed reference ledger')
 return out
def summary(report):
 return dict(native=report['native'],linked={k:{n:v[n]for n in v if n!='vtables'and n!='direct_edges'}for k,v in report['linked'].items()})
if __name__=='__main__':print(json.dumps(summary(verify()),indent=2))
