"""Verify the frozen promoted package from any working directory; no execution."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,tarfile
from solders.transaction import VersionedTransaction
Q=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
ap=argparse.ArgumentParser();ap.add_argument('--current-main',action='store_true');ap.add_argument('--output',type=Path);args=ap.parse_args()
def read(p):
 raw=p.read_bytes();return json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw)
manifest=read(Q/'manifest-sha256.json')
for p,h in manifest.items():assert sha(Q/p)==h,p
candidate=sha(Q/'candidate.so');build=read(Q/'build-comparison.json');attempt=read(Q/'build-attempt.json');identity=read(Q/'main-scratch-identity.json')
assert candidate==identity['main_candidate_sha256']==identity['scratch_candidate_sha256']
assert identity['whole_file_equal'] and (Q/'candidate.so').stat().st_size==identity['candidate_bytes']
assert build['comparison']['candidate_sha256']==candidate and not build['comparison']['full_byte_equality']
assert attempt['returncode']==0 and attempt['source_unchanged']
assert attempt['source_sha256']==attempt['source_after_sha256']==build['source_sha256']
assert len(build['source_sha256'])==36
assert hashlib.sha256(gzip.decompress((Q/'build.log.gz').read_bytes())).hexdigest()==build['build_log_sha256']
def archive_hashes(path):
 with tarfile.open(path)as t:return {m.name:hashlib.sha256(t.extractfile(m).read()).hexdigest()for m in t.getmembers()if m.isfile()}
assert archive_hashes(Q/'source-snapshot.tar.gz')==build['source_sha256']
scratch=read(Q/'scratch-composite/build-comparison.json');scratch_sources={str(Path(p).relative_to(identity['scratch_source_root'])):h for p,h in scratch['source_sha256'].items()}
main_sources={str(Path(p).relative_to('programs/pump')):h for p,h in build['source_sha256'].items()}
assert scratch_sources==main_sources and len(scratch_sources)==36
assert sha(Q/'scratch-composite/build-comparison.json')==identity['scratch_build_report_sha256']
source_harness=read(Q/'source-harness-sha256.json');assert source_harness['source_sha256']==build['source_sha256']
tests=archive_hashes(Q/'test-snapshot.tar.gz')
for p,h in source_harness['harness_sha256'].items():assert tests[p]==h,p
for p,h in source_harness['tool_sha256'].items():assert tests[p]==h,p
mapping=read(Q/'receipt-copy-map.json');by_execution={v['executed_path']:(Q/p,v)for p,v in mapping.items()}
for p,v in mapping.items():
 assert sha(Q/p)==v['stored_file_sha256'],p
 raw=(Q/p).read_bytes();plain=gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw
 assert hashlib.sha256(plain).hexdigest()==v['decompressed_sha256'],p
bindings=read(Q/'receipt-build-bindings.json');assert len(bindings)==65
def transactions(value):
 if isinstance(value,dict):
  if isinstance(value.get('transaction_base64'),str):yield value['transaction_base64']
  for k,v in value.items():
   if k!='transaction_base64':yield from transactions(v)
 elif isinstance(value,list):
  for v in value:yield from transactions(v)
counts={'differential_receipts':0,'differential_cases':0,'differential_saved_transactions':0,'differential_verified_signatures':0,'surfpool_receipts':0,'surfpool_comparisons':0,'surfpool_signed_transactions':0,'surfpool_verified_signatures':0}
for binding in bindings:
 p,copy=by_execution[binding['receipt']];assert copy['executed_file_sha256']==binding['receipt_sha256']
 assert binding['executed_candidate_sha256']==candidate
 assert binding['build_report_sha256']==identity['scratch_build_report_sha256']
 assert binding['actual_compiler_inputs_sha256']==scratch['source_sha256']
 data=read(p);kind=binding['kind'];assert not data.get('mismatches',data.get('failures',[]))
 assert not data.get('unexpected_original_errors',[])and not data.get('unexpected_errors',[])
 bound=data.get('bound_inputs_sha256',{});prov=data.get('provenance',{})
 candidate_path=identity['scratch_candidate_path']
 candidate_prov=next((h for k,h in prov.items()if k.endswith(candidate_path)),None)
 observed=data.get('candidate_sha256',bound.get(candidate_path,candidate_prov));assert observed==candidate,(str(p),observed)
 ntx=0;nsig=0
 transaction_data={'original':data['original'],'candidate':data['candidate']}if kind=='surfpool'else data
 for encoded in transactions(transaction_data):
  raw=base64.b64decode(encoded);tx=VersionedTransaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results());ntx+=1;nsig+=len(tx.signatures)
 if kind=='differential':
  counts['differential_receipts']+=1
  count=data.get('case_count',data['cases']if isinstance(data['cases'],int)else len(data['cases']))
  counts['differential_cases']+=count;counts['differential_saved_transactions']+=ntx;counts['differential_verified_signatures']+=nsig
  if p.name=='quote_control.json.gz':
   assert count==507 and (ntx,nsig)==(1014,2008)
   for path,digest in scratch['source_sha256'].items():assert bound[path]==digest
   assert bound[binding['build_report']]==identity['scratch_build_report_sha256']
  if p.name=='multi_hop_curve_partial.json.gz':assert data['passed']==56 and (ntx,nsig)==(112,112)
 else:
  assert kind=='surfpool' and ntx==data['signed_transactions']==2*data['cases']
  counts['surfpool_receipts']+=1;counts['surfpool_comparisons']+=data['cases'];counts['surfpool_signed_transactions']+=ntx;counts['surfpool_verified_signatures']+=nsig
assert (counts['differential_receipts'],counts['differential_cases'])==(37,9217)
assert (counts['surfpool_receipts'],counts['surfpool_comparisons'],counts['surfpool_signed_transactions'],counts['surfpool_verified_signatures'])==(28,1024,2048,2980)
saved=read(Q/'independent-verification.json');assert saved['candidate_sha256']==candidate and saved['partial_curve_pump_cpi_cases']==50 and saved['partial_curve_successful_cases']==11
scratch_manifest=read(Q/'scratch-composite/manifest-sha256.json');preservation=read(Q/'scratch-package-bindings.json')
for original_path,digest in scratch_manifest.items():assert sha(Q/preservation[original_path])==digest,original_path
if args.current_main:
 R=next(p for p in Q.parents if (p/'programs/pump/Cargo.toml').is_file())
 for p,h in build['source_sha256'].items():assert sha(R/p)==h,p
 for p,h in source_harness['repository_fixture_snapshot_sha256'].items():assert sha(R/p)==h,p
 for p,h in read(Q/'documentation-sha256.json').items():assert sha(R/p)==h,p
out={'scope':'Portable saved-package verification only; no build, program execution or network access. Raw legacy source maps remain checkout snapshots; all65 receipt build bindings name the actual36-input scratch build, connected to main by whole-file ELF identity.','package_files_verified':len(manifest),'candidate_sha256':candidate,'candidate_bytes':(Q/'candidate.so').stat().st_size,'source_inputs':36,'harness_inputs':len(source_harness['harness_sha256']),'runtime_inputs':len(source_harness['repository_fixture_snapshot_sha256']),**counts,'partial_curve_comparisons':56,'partial_curve_verified_signatures':112,'partial_curve_pump_cpi_cases':50,'partial_curve_successful_cases':11,'partial_curve_caller_rejections':6,'current_main_checked':args.current_main,'whole_main_scratch_identity':True,'full_byte_equality':False,'security_audit_complete':False}
if args.output:args.output.write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out,indent=2))
