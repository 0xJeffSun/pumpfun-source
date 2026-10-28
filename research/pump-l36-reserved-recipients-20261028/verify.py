#!/usr/bin/env python3
"""Verify the historical independent L36 reserved-setter proof."""
from pathlib import Path
import sys,json,gzip,hashlib,difflib,tarfile,tempfile
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if(p/'evidence/original/pump/deployed.so').is_file())
sys.dont_write_bytecode=True;sys.path.insert(0,str(P/'tools'));sys.path.insert(0,str(R/'scripts'))
import measure
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def tarfiles(p):
 with tarfile.open(p)as tar:
  out={}
  for m in tar:
   assert m.isfile()and not Path(m.name).is_absolute()and'..'not in Path(m.name).parts
   out[m.name]=tar.extractfile(m).read()
  return out

def main():
 manifest=read(P/'MANIFEST.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and'__pycache__'not in p.parts};assert actual==set(manifest)|{'MANIFEST.json'};assert all(sha((P/k).read_bytes())==v for k,v in manifest.items())
 prov=read(P/'PROVENANCE.json');res=read(P/'RESULT.json');binding=read(P/'ARTIFACT-BINDING.json');src=tarfiles(P/'source.tar.gz');oldsrc=tarfiles(P/'control/source.tar.gz');base=read(P/'base-L36-build.json');rec=read(P/'build-record.json');ctrl=read(P/'control/build-record.json')
 for name,record,source in[('',rec,src),('control/',ctrl,oldsrc)]:
  assert record['returncode']==0 and record['source_unchanged']and record['target_libraries_unchanged'];assert{p:sha(b)for p,b in source.items()}==record['source_sha256']
  assert binding['control_build_record_sha256'if name else'build_record_sha256']==sha((P/(name+'build-record.json')).read_bytes());assert binding['control_source_archive_sha256'if name else'source_archive_sha256']==sha((P/(name+'source.tar.gz')).read_bytes())
 assert sha((P/'tools/recorded-build.py').read_bytes())==rec['builder_sha256'];assert rec['tool_sha256']==ctrl['tool_sha256']and rec['target_libraries_sha256']==ctrl['target_libraries_sha256']
 assert sorted(p for p in src if src[p]!=oldsrc[p])==prov['changed_sources'];patch=''
 for rel in prov['changed_sources']:
  assert src[rel]==(P/'source'/rel).read_bytes();patch+=''.join(difflib.unified_diff(oldsrc[rel].decode().splitlines(keepends=True),src[rel].decode().splitlines(keepends=True),'a/'+rel,'b/'+rel))
 assert patch==(P/'source.patch').read_text()
 for name,digest in base['primary_source_sha256'].items():
  rel=name.removeprefix(prov['base_source_prefix']);assert rel!=name
  if rel=='programs/pump/Cargo.toml':continue
  if rel=='programs/pump/Cargo.lock':rel='Cargo.lock'
  assert sha(oldsrc[rel])==digest,name
 assert binding['candidate_sha256']==res['candidate_sha256']and binding['unstripped_sha256']==res['unstripped_sha256']
 original=(R/'evidence/original/pump/deployed.so').read_bytes();assert sha(original)==prov['original_sha256']
 with tempfile.TemporaryDirectory()as tmp:
  paths={}
  for name in['candidate.so','unstripped.so','control/unstripped.so']:
   p=Path(tmp)/name.replace('/','-');p.write_bytes(gzip.decompress((P/(name+'.gz')).read_bytes()));paths[name]=p
  assert sha(paths['candidate.so'].read_bytes())==res['candidate_sha256'];assert sha(paths['unstripped.so'].read_bytes())==res['unstripped_sha256'];assert sha(paths['control/unstripped.so'].read_bytes())==prov['native_control_unstripped_sha256']
  new=measure.census(paths['unstripped.so']);old=measure.census(paths['control/unstripped.so']);assert new==read(P/'inventory.json.gz')and old==read(P/'control/inventory.json.gz');assert old['counts']['normalized']==1016 and new['counts']==res['counts']
  bn={x['start']for x in old['windows']if x['normalized_matches']};cn={x['start']for x in new['windows']if x['normalized_matches']};assert[hex(x)for x in sorted(cn-bn)]==res['gains']==['0x6fef8']and not(bn-cn)and not res['losses'];br={x['start']for x in old['windows']if x['raw_match']};cr={x['start']for x in new['windows']if x['raw_match']};assert[hex(x)for x in sorted(cr-br)]==res['raw_gains']==[]and[hex(x)for x in sorted(br-cr)]==res['raw_losses']==[]
  by={x['start']:x for x in new['windows']};ms=by[0x6fef8]['normalized_matches'];assert len(ms)==1;st=ms[0]['start'];elf=paths['unstripped.so'].read_bytes();_,oo=normalize(body(original,sections(original),0x6fef8,9176),0x6fef8,sections(original));_,co=normalize(body(elf,sections(elf),st,9176),st,sections(elf));oc=[x for x in oo if x['kind']=='direct-call'];nc={x['offset']:x for x in co if x['kind']=='direct-call'};assert len(oc)==66
  for x in oc:assert nc[x['offset']]['target']in{m['start']for m in by[x['target']]['normalized_matches']}
  caller=by[0x125ae8];assert caller['normalized_matches'];cs=caller['normalized_matches'][0]['start'];_,ops=normalize(body(elf,sections(elf),cs,caller['bytes']),cs,sections(elf));assert any(x['kind']=='direct-call'and x['offset']==632 and x['target']==st for x in ops)
  assert{bool(x['normalized_matches'])for x in read(P/'base-L36-inventory.json.gz')['windows']if x['start']in bn}=={True}
 run=read(P/'authority.json.gz');assert run['candidate_sha256']==res['candidate_sha256']and run['case_count']==59 and not run['mismatches'];loader=read(P/'authority.loader.json.gz');assert{r['elf_sha256']for r in loader['loads']}=={res['candidate_sha256'],prov['original_sha256']};assert all(r['elf_prefix_unchanged']and r['zero_allocation_tail']and r['program_bytes']==36 and r['programdata_bytes']==10485760 for r in loader['loads'])
 print(json.dumps({'verified':True,'historical_base':'L36','normalized':1017,'raw':166,'gains_vs_native_L36':['0x6fef8'],'normalized_or_raw_losses':[],'verified_direct_calls':66,'verified_dispatcher':True,'focused_runtime_cases':59,'frontier_gain_claim':False,'whole_elf_identity':False},indent=2))
if __name__=='__main__':main()
