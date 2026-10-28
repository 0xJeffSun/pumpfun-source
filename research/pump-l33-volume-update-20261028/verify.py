#!/usr/bin/env python3
"""Verify the isolated L33 update recovery, its exact compiled source and1035-window census."""
from pathlib import Path
import sys,json,gzip,hashlib,difflib,tarfile,tempfile
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.dont_write_bytecode=True;sys.path.insert(0,str(P/'tools'));sys.path.insert(0,str(R/'scripts'))
import measure
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def tarfiles(p):
 with tarfile.open(p)as tar:
  out={}
  for m in tar:
   assert m.isfile()and not Path(m.name).is_absolute()and'..'not in Path(m.name).parts,m.name
   out[m.name]=tar.extractfile(m).read()
  return out

def main():
 man=read(P/'MANIFEST.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and'__pycache__'not in p.parts};assert actual==set(man)|{'MANIFEST.json'},actual^set(man)
 assert all(sha((P/k).read_bytes())==v for k,v in man.items())
 prov=read(P/'PROVENANCE.json');res=read(P/'RESULT.json');rec=read(P/'build-record.json');src=tarfiles(P/'source.tar.gz');control=tarfiles(P/'control/source.tar.gz')
 binding=read(P/'ARTIFACT-BINDING.json');assert binding['build_record_sha256']==sha((P/'build-record.json').read_bytes())and binding['source_archive_sha256']==sha((P/'source.tar.gz').read_bytes())and binding['candidate_sha256']==res['candidate_sha256']and binding['unstripped_sha256']==res['unstripped_sha256'];assert sha((P/'tools/recorded-build.py').read_bytes())==rec['builder_sha256']
 assert rec['returncode']==0 and rec['source_unchanged']and rec['target_libraries_unchanged']
 assert{p:sha(b)for p,b in src.items()}==rec['source_sha256']
 rel=prov['changed_source'];assert[p for p in sorted(src)if src[p]!=control[p]]==[rel]
 assert src[rel]==(P/'source'/rel).read_bytes()and sha(src[rel])==prov['changed_source_sha256']
 base=R/prov['base_package']/'source'/rel;patch=''.join(difflib.unified_diff(base.read_text().splitlines(keepends=True),src[rel].decode().splitlines(keepends=True),'a/'+rel,'b/'+rel));assert patch==(P/'source.patch').read_text()
 # The compiled workspace transformation is recorded; every original Rust input besides this file is unchanged.
 archived=R/prov['base_package']/'source/programs/pump'
 for p in archived.rglob('*'):
  if not p.is_file()or p.name in['Cargo.toml','Cargo.lock']:continue
  key='programs/pump/'+str(p.relative_to(archived));assert key in src
  assert src[key]==((P/'source'/rel).read_bytes()if key==rel else p.read_bytes()),key
 assert len(src[rel].splitlines())==470
 original=(R/'evidence/original/pump/deployed.so').read_bytes();assert sha(original)==prov['original_sha256']
 with tempfile.TemporaryDirectory()as tmp:
  tmp=Path(tmp);paths={}
  for name in ['unstripped.so','candidate.so','control/unstripped.so']:
   data=gzip.decompress((P/(name+'.gz')).read_bytes());p=tmp/Path(name).name
   if name.startswith('control/'):p=tmp/'control.so'
   p.write_bytes(data);paths[name]=p
  assert sha(paths['unstripped.so'].read_bytes())==res['unstripped_sha256']
  assert sha(paths['candidate.so'].read_bytes())==res['candidate_sha256']
  assert sha(paths['control/unstripped.so'].read_bytes())==prov['native_control_unstripped_sha256']
  c=measure.census(paths['unstripped.so']);b=measure.census(paths['control/unstripped.so'])
  assert c==read(P/'inventory.json.gz')and b==read(P/'control/inventory.json.gz')
  assert c['counts']==res['counts'];bn={x['start']for x in b['windows']if x['normalized_matches']};cn={x['start']for x in c['windows']if x['normalized_matches']}
  assert[hex(x)for x in sorted(cn-bn)]==res['gains']==['0x7bfd8']and not(bn-cn)and not res['losses']
  br={x['start']for x in b['windows']if x['raw_match']};cr={x['start']for x in c['windows']if x['raw_match']};assert [hex(x)for x in sorted(cr-br)]==res['raw_gains']and [hex(x)for x in sorted(br-cr)]==res['raw_losses']==[]
  by={x['start']:x for x in c['windows']};call=read(P/'calls.json');assert call['candidate_sha256']==res['unstripped_sha256']
  match=by[0x7bfd8]['normalized_matches'];assert len(match)==1;st=match[0]['start'];elf=paths['unstripped.so'].read_bytes();_,orig_ops=normalize(body(original,sections(original),0x7bfd8,1864),0x7bfd8,sections(original));_,new_ops=normalize(body(elf,sections(elf),st,1864),st,sections(elf));oc=[x for x in orig_ops if x['kind']=='direct-call'];nc={x['offset']:x for x in new_ops if x['kind']=='direct-call'}
  assert len(oc)==len(call['outgoing_calls'])==13
  for x in oc:assert nc[x['offset']]['target']in{m['start']for m in by[x['target']]['normalized_matches']}
  w=by[0x75308];assert w['normalized_matches'];caller=w['normalized_matches'][0]['start'];_,ops=normalize(body(elf,sections(elf),caller,w['bytes']),caller,sections(elf));assert any(x['kind']=='direct-call'and x['offset']==240 and x['target']==st for x in ops)
 pointers=read(P/'pointers.json');locations=[x for x in pointers if x['original']['kind']=='Location'];assert len(locations)==7 and all(x['original']==x['candidate']for x in locations)
 for name,count in [('claim-boundary',334),('claim-panic',2)]:
  d=read(P/(name+'.json.gz'));assert d['candidate_sha256']==res['candidate_sha256']and d['case_count']==count and not d['mismatches']
  loader=read(P/(name+'.loader.json'));assert loader['loads'];assert{r['elf_sha256']for r in loader['loads']}=={res['candidate_sha256'],prov['original_sha256']}
  assert all(x['elf_prefix_unchanged']and x['zero_allocation_tail']and x['program_bytes']==36 and x['programdata_bytes']==10485760 for x in loader['loads'])
 print(json.dumps({'verified':True,'counts':res['counts'],'gains':res['gains'],'losses':res['losses'],'outgoing_callees_verified':13,'incoming_claim_call_verified':True,'same_operation_panic_locations_equal':6,'focused_runtime_cases':336,'whole_elf_identity':False},indent=2))
if __name__=='__main__':main()
