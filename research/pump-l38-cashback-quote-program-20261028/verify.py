#!/usr/bin/env python3
"""Verify the narrow L38 cashback quote-program correction."""
from pathlib import Path
import sys,json,gzip,hashlib,tarfile,tempfile,difflib,base64,tomllib
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if(p/'evidence/original/pump/deployed.so').is_file())
sys.dont_write_bytecode=True;sys.path.insert(0,str(P/'tools'));sys.path.insert(0,str(R/'scripts'));import measure
from solders.transaction import Transaction
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
 prov=read(P/'PROVENANCE.json');res=read(P/'RESULT.json');bind=read(P/'ARTIFACT-BINDING.json');rec=read(P/'build-record.json');ctrl=read(P/'control/build-comparison.json');src=tarfiles(P/'source.tar.gz');oldsrc=tarfiles(P/'control/source.tar.gz')
 assert rec['returncode']==0 and rec['source_unchanged']and rec['target_libraries_unchanged'];assert{p:sha(b)for p,b in src.items()}==rec['source_sha256'];assert sha((P/'tools/recorded-build.py').read_bytes())==rec['builder_sha256']
 assert ctrl['returncode']==0 and ctrl['source_unchanged']and ctrl['target_libraries_unchanged'];assert ctrl['comparison']['candidate_sha256']==prov['control_candidate_sha256']and ctrl['unstripped_sha256']==prov['control_unstripped_sha256']
 assert bind['build_record_sha256']==sha((P/'build-record.json').read_bytes())and bind['source_archive_sha256']==sha((P/'source.tar.gz').read_bytes())and bind['control_compiler_receipt_sha256']==sha((P/'control/build-comparison.json').read_bytes())and bind['control_source_archive_sha256']==sha((P/'control/source.tar.gz').read_bytes())
 assert bind['candidate_sha256']==res['candidate_sha256']and bind['unstripped_sha256']==res['unstripped_sha256']
 prefix=prov['control_source_hash_prefix']
 for name,digest in ctrl['source_sha256'].items():
  rel=name.removeprefix(prefix);assert rel!=name and sha(oldsrc[rel])==digest,name
 assert set(src)==set(oldsrc)
 for name in['Cargo.toml','programs/pump/Cargo.toml']:assert tomllib.loads(src[name].decode())==tomllib.loads(oldsrc[name].decode())
 rel=prov['changed_source'];changed=[p for p in sorted(src)if src[p]!=oldsrc[p]and p not in['Cargo.toml','programs/pump/Cargo.toml']];assert changed==[rel];assert src[rel]==(P/'source'/rel).read_bytes();patch=''.join(difflib.unified_diff(oldsrc[rel].decode().splitlines(keepends=True),src[rel].decode().splitlines(keepends=True),'a/'+rel,'b/'+rel));assert patch==(P/'source.patch').read_text()
 assert sha((R/'evidence/original/pump/deployed.so').read_bytes())==prov['original_sha256']
 with tempfile.TemporaryDirectory()as tmp:
  paths={}
  for name in['candidate.so','unstripped.so','control/candidate.so','control/unstripped.so']:
   p=Path(tmp)/name.replace('/','-');p.write_bytes(gzip.decompress((P/(name+'.gz')).read_bytes()));paths[name]=p
  assert sha(paths['candidate.so'].read_bytes())==res['candidate_sha256']and sha(paths['unstripped.so'].read_bytes())==res['unstripped_sha256'];assert sha(paths['control/candidate.so'].read_bytes())==prov['control_candidate_sha256']and sha(paths['control/unstripped.so'].read_bytes())==prov['control_unstripped_sha256']
  new=measure.census(paths['unstripped.so']);old=measure.census(paths['control/unstripped.so']);assert new==read(P/'inventory.json.gz')and old==read(P/'control/inventory.json.gz');assert new['counts']==old['counts']==res['counts'];assert new['counts']['normalized']==1018 and new['counts']['raw']==166
  for predicate in[lambda r:bool(r['normalized_matches']),lambda r:r['raw_match']]:assert{r['start']for r in new['windows']if predicate(r)}=={r['start']for r in old['windows']if predicate(r)}
  assert res['gains']==res['losses']==res['raw_gains']==res['raw_losses']==[]
 focused=read(P/'focused.json.gz');assert focused['candidate_sha256']==res['candidate_sha256']and focused['baseline_sha256']==prov['control_candidate_sha256']and focused['case_count']==8 and focused['signature_verifications']==24 and not focused['mismatches'];assert focused['producer_sha256']==sha((P/'tools/focused.py').read_bytes())
 for row in focused['cases']:
  for name in['original','baseline','candidate']:Transaction.from_bytes(base64.b64decode(row[name]['transaction_base64'])).verify()
  for key in['error','accounts','events','inner','return_data']:assert row['original'][key]==row['candidate'][key]
  if row['case']['name'].startswith('fake-'):
   assert'6064'in row['candidate']['error'];logs=lambda r:[s for s in r['logs']if'AnchorError thrown'in s];assert logs(row['original'])==logs(row['candidate'])
 assert focused['cases'][0]['baseline']['error']is None and'IncorrectProgramId'in focused['cases'][1]['baseline']['error']
 corpus=read(P/'cashback.json.gz');assert corpus['candidate_sha256']==res['candidate_sha256']and corpus['case_count']==283 and not corpus['mismatches']
 for name,hashes in[('focused',{res['candidate_sha256'],prov['original_sha256'],prov['control_candidate_sha256']}),('cashback',{res['candidate_sha256'],prov['original_sha256']})]:
  loader=read(P/(name+'.loader.json.gz'));assert{r['elf_sha256']for r in loader['loads']}==hashes;assert all(r['elf_prefix_unchanged']and r['zero_allocation_tail']and r['program_bytes']==36 and r['programdata_bytes']==10485760 for r in loader['loads'])
 print(json.dumps({'verified':True,'normalized':1018,'raw':166,'all_normalized_and_raw_matches_preserved':True,'new_window_gain':False,'focused_cases':8,'verified_signatures':24,'cashback_corpus_cases':283,'corrected_error':6064,'whole_elf_identity':False},indent=2))
if __name__=='__main__':main()
