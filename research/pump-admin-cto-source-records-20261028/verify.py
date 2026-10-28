#!/usr/bin/env python3
"""Verify the admin_cto Source-record correction."""
from pathlib import Path
import sys,json,gzip,hashlib,tarfile,tempfile,difflib,base64,tomllib,re
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
 prov=read(P/'PROVENANCE.json');res=read(P/'RESULT.json');bind=read(P/'ARTIFACT-BINDING.json');rec=read(P/'build-record.json');ctrl=read(P/'control/build-record.json');src=tarfiles(P/'source.tar.gz');oldsrc=tarfiles(P/'control/source.tar.gz')
 assert rec['returncode']==0 and rec['source_unchanged']and rec['target_libraries_unchanged'];assert{p:sha(b)for p,b in src.items()}==rec['source_sha256'];assert sha((P/'tools/recorded-build.py').read_bytes())==rec['builder_sha256']
 assert ctrl['returncode']==0 and ctrl['source_unchanged']and ctrl['target_libraries_unchanged'];oldbind=read(P/'control/ARTIFACT-BINDING.json');assert oldbind['candidate_sha256']==prov['control_candidate_sha256']and oldbind['unstripped_sha256']==prov['control_unstripped_sha256'];assert oldbind['build_record_sha256']==sha((P/'control/build-record.json').read_bytes())and oldbind['source_archive_sha256']==sha((P/'control/source.tar.gz').read_bytes());assert ctrl['tool_sha256']==rec['tool_sha256']and ctrl['target_libraries_sha256']==rec['target_libraries_sha256']
 assert bind['build_record_sha256']==sha((P/'build-record.json').read_bytes())and bind['source_archive_sha256']==sha((P/'source.tar.gz').read_bytes())and bind['control_compiler_receipt_sha256']==sha((P/'control/build-record.json').read_bytes())and bind['control_source_archive_sha256']==sha((P/'control/source.tar.gz').read_bytes())
 assert bind['candidate_sha256']==res['candidate_sha256']and bind['unstripped_sha256']==res['unstripped_sha256']
 assert{p:sha(b)for p,b in oldsrc.items()}==ctrl['source_sha256']
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
 token_pattern=re.compile(r'"(?:\\.|[^"\\])*"|//[^\n]*|\s+|.',re.S)
 tokens=lambda text:[t for t in token_pattern.findall(text)if not t.isspace()and not t.startswith('//')]
 assert tokens(src[rel].decode())==tokens(oldsrc[rel].decode())
 assert len(src[rel].splitlines())==len(oldsrc[rel].splitlines())
 sites=read(P/'SOURCE-RECORDS.json');assert len(sites)==5
 errors=lambda data:{name:[data[:m.start()].count('\n')+1 for m in re.finditer('PumpError::'+name+r'\b',data)]for name in set(re.findall(r'PumpError::(\w+)',data))}
 olderrors=errors(oldsrc[rel].decode());newerrors=errors(src[rel].decode());expected={r['name']:r for r in sites};assert set(olderrors)==set(newerrors)
 for name,positions in olderrors.items():
  if name in expected:
   site=expected[name];assert positions==[site['control']]and newerrors[name]==[site['original']]
  else:assert positions==newerrors[name]
 focused=read(P/'focused.json.gz');assert focused['candidate_sha256']==res['candidate_sha256']and focused['baseline_sha256']==prov['control_candidate_sha256']and focused['case_count']==5 and focused['signature_verifications']==15 and not focused['mismatches'];assert focused['producer_sha256']==sha((P/'tools/focused.py').read_bytes())
 logs=lambda r:[s for s in r['logs']if s.startswith('Program log: ')or s.startswith('Program data: ')]
 for row in focused['cases']:
  for name in['original','baseline','candidate']:
   r=row[name];Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify();assert r['signatures_verified']and not r['pool_authority_top_level_signer']
  for key in['error','before','after','events','inner','return']:assert row['original'][key]==row['candidate'][key]
  assert logs(row['original'])==logs(row['candidate'])
  assert any(f"admin_cto.rs:{row['original_line']}."in s for s in row['original']['logs'])and any(f"admin_cto.rs:{row['baseline_line']}."in s for s in row['baseline']['logs'])
 corpus=read(P/'admin.json.gz');assert corpus['candidate_sha256']==res['candidate_sha256']and corpus['case_count']==363 and not corpus['mismatches']
 for row in corpus['cases']:
  for name in['original','candidate']:
   r=row[name];Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify();assert r['signatures_verified']and not r['pool_authority_top_level_signer']
  for key in['error','before','after','events','inner','return']:assert row['original'][key]==row['candidate'][key]
  assert row['match']and logs(row['original'])==logs(row['candidate'])
 ordered=read(P/'ordered-logs.json');assert ordered['case_count']==363 and ordered['mismatches']==[]
 for name,hashes in[('focused',{res['candidate_sha256'],prov['original_sha256'],prov['control_candidate_sha256']}),('admin',{res['candidate_sha256'],prov['original_sha256']})]:
  loader=read(P/(name+'.loader.json.gz'));assert{r['elf_sha256']for r in loader['loads']}==hashes;assert all(r['elf_prefix_unchanged']and r['zero_allocation_tail']and r['program_bytes']==36 and r['programdata_bytes']==10485760 for r in loader['loads'])
 clean=read(P/'clean-record.json');assert clean['returncode']==0 and bind['clean_record_sha256']==sha((P/'clean-record.json').read_bytes())
 for flag in['--manifest-path','--release','--target','sbpf-solana-solana','--offline','pump-recovered','pump-token-ext']:assert flag in clean['command']
 for name in['build.log.gz','control/build.log.gz']:
  log=gzip.decompress((P/name).read_bytes()).decode()
  for package in['pump-recovered','pump-token-ext']:assert 'Compiling '+package in log
 print(json.dumps({'verified':True,'normalized':1018,'raw':166,'all_normalized_and_raw_matches_preserved':True,'new_window_gain':False,'rust_token_stream_unchanged':True,'corrected_source_records':5,'focused_cases':5,'verified_focused_signatures':15,'admin_corpus_cases':363,'ordered_program_message_mismatches':0,'whole_elf_identity':False},indent=2))
if __name__=='__main__':main()
