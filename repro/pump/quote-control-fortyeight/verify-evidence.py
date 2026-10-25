"""Independently bind saved results and verify their recorded signatures, without execution."""
from pathlib import Path
import base64,gzip,hashlib,json
from solders.transaction import VersionedTransaction
W=Path(__file__).resolve().parent;R=W.parents[1];sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
candidate=W/'build/artifacts/pump_recovered.so';expected=sha(candidate);original=sha(R/'evidence/original/pump/deployed.so')
inputs=json.loads((W/'inputs-before.json').read_text())
for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main42_source_before']:
 for p,h in inputs[group].items():assert sha(R/p)==h,p
assert sha(R/inputs['surfpool_path'])==inputs['surfpool_sha256']
build=json.loads((W/'build/build-comparison.json').read_text());attempt=json.loads((W/'build/build-attempt.json').read_text())
assert attempt['returncode']==0 and attempt['source_unchanged'] and attempt['source_sha256']==attempt['source_after_sha256']==build['source_sha256']
for p,h in build['source_sha256'].items():assert sha(R/p)==h,p
assert build['comparison']['candidate_sha256']==expected and build['comparison']['original_sha256']==original
assert hashlib.sha256((W/'build/build.log').read_bytes()).hexdigest()==build['build_log_sha256']
def load(path):
 raw=path.read_bytes();return json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw)
def transactions(value):
 if isinstance(value,dict):
  if isinstance(value.get('transaction_base64'),str):yield value['transaction_base64']
  for key,child in value.items():
   if key!='transaction_base64':yield from transactions(child)
 elif isinstance(value,list):
  for child in value:yield from transactions(child)
def verify_transactions(value):
 count=0;signature_count=0
 for raw in transactions(value):
  data=base64.b64decode(raw);tx=VersionedTransaction.from_bytes(data)
  assert all(tx.verify_with_results())and bytes(tx)==data
  count+=1;signature_count+=len(tx.signatures)
 return {'transactions':count,'signatures':signature_count}
diffrows=json.loads((W/'differential/run.json').read_text());assert len(diffrows)==35
diffs=[]
for row in diffrows:
 assert row['returncode']==0 and row['bound_hashes_match']and not row['mismatches'],row['suite']
 p=W/'differential'/(row['suite']+'.json.gz');assert sha(p)==row['receipt_sha256'];d=load(p)
 diffs.append({'suite':row['suite'],'family':row['family'],'case_count':row['case_count'],'receipt':str(p.relative_to(R)),'receipt_sha256':sha(p),'saved_transaction_and_signature_counts':verify_transactions(d)})
assert sum(x['case_count']for x in diffs if x['family']=='prior33')==7957
assert sum(x['case_count']for x in diffs if x['family']=='holder_nested')==697
surfrows=json.loads((W/'surfpool/run.json').read_text());assert len(surfrows)==28
surfs=[]
for row in surfrows:
 assert row['returncode']==0 and row['runner_unchanged']and row['candidate_sha256']==expected,row['name']
 directory=R/row['output'];found=[]
 for p in directory.glob('pump-*-transactions.json'):
  d=load(p)
  if isinstance(d,dict)and 'candidate_sha256'in d and 'signed_transactions'in d:found.append((p,d))
 assert len(found)==1,(row['name'],found)
 p,d=found[0];assert d['candidate_sha256']==expected and d['original_sha256']==original
 assert not d['mismatches']and not d.get('unexpected_original_errors',[])and not d.get('unexpected_errors',[]),row['name']
 assert len(d['original'])==len(d['candidate'])==d['cases']
 count=verify_transactions({'original':d['original'],'candidate':d['candidate']})
 assert count['transactions']==d['signed_transactions']==2*d['cases']
 surfs.append({'suite':row['name'],'family':row['family'],'cases':d['cases'],'signed_transactions':count['transactions'],'verified_signatures':count['signatures'],'receipt':str(p.relative_to(R)),'receipt_sha256':sha(p)})
assert sum(x['cases']for x in surfs if x['family']=='prior26')==936
assert sum(x['cases']for x in surfs if x['family']=='holder_nested')==88
assert sum(x['signed_transactions']for x in surfs)==2048
report={'scope':'Saved-file, build/source/hash and cryptographic signature verification only; no transactions executed by this verifier.',
 'candidate_sha256':expected,'original_sha256':original,'source_inputs':len(build['source_sha256']),
 'harness_inputs':len(inputs['harness_sha256']),'runtime_inputs':len(inputs['repository_fixture_snapshot_sha256']),
 'differential_suites':diffs,'differential_cases':8654,'differential_groups':{'prior33':7957,'holder_nested':697},
 'surfpool_suites':surfs,'surfpool_comparisons':1024,'surfpool_groups':{'prior26':936,'holder_nested':88},
 'surfpool_signed_transactions':2048,'surfpool_verified_signatures':sum(x['verified_signatures']for x in surfs),'inputs_unchanged':True,'main_source_unchanged':True,
 'full_byte_equality':False,'mismatches':[]}
focused=json.loads((W/'verification.json').read_text());assert focused['cases']==507 and focused['mismatches']==0 and focused['executions']==1014 and focused['verified_signatures']==2008
assert focused['receipt_sha256']==sha(W/'focused-current.json.gz')
assert focused['verifier_sha256']==sha(W/'verify-focused.py')
fresh=load(W/'focused-current.json.gz')
for path,digest in fresh['bound_inputs_sha256'].items():assert sha(R/path)==digest,path
report.update(focused_quote_control=focused,total_differential_cases=9161,total_differential_suites=36,focused_receipt_sha256=sha(W/'focused-current.json.gz'),maintained_quote_control_runner_sha256=sha(R/'scripts/pump_quote_control_fresh_differential.py'))
(W/'independent-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items()if k not in ['differential_suites','surfpool_suites']},indent=2))
