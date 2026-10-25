"""Read-only saved receipt/source/ELF/signature verification of the composite."""
from pathlib import Path
import base64,gzip,hashlib,json
from solders.transaction import VersionedTransaction
from solders.pubkey import Pubkey
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump.json').is_file())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 raw=p.read_bytes();return json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw)
CAND=W/'build/artifacts/pump_recovered.so';expected=sha(CAND);original=sha(R/'evidence/original/pump/deployed.so')
inputs=read(W/'inputs-before.json');build=read(W/'build/build-comparison.json');attempt=read(W/'build/build-attempt.json')
for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main48_source_before']:
 for p,h in inputs[group].items():assert sha(R/p)==h,p
assert sha(R/inputs['surfpool_path'])==inputs['surfpool_sha256']
assert attempt['returncode']==0 and attempt['source_unchanged']
assert attempt['source_sha256']==attempt['source_after_sha256']==build['source_sha256']
assert len(build['source_sha256'])==36
for p,h in build['source_sha256'].items():assert sha(R/p)==h,p
assert build['comparison']['candidate_sha256']==expected and build['comparison']['original_sha256']==original
assert sha(W/'build/build.log')==build['build_log_sha256']
def transactions(value):
 if isinstance(value,dict):
  if isinstance(value.get('transaction_base64'),str):yield value['transaction_base64']
  for key,child in value.items():
   if key!='transaction_base64':yield from transactions(child)
 elif isinstance(value,list):
  for child in value:yield from transactions(child)
def signatures(value):
 count=0;sigcount=0
 for encoded in transactions(value):
  raw=base64.b64decode(encoded);tx=VersionedTransaction.from_bytes(raw)
  assert all(tx.verify_with_results())and bytes(tx)==raw
  count+=1;sigcount+=len(tx.signatures)
 return {'transactions':count,'signatures':sigcount}
bindings=[]
def bind(path,data,kind):
 binding={'receipt':str(path.relative_to(R)),'receipt_sha256':sha(path),'kind':kind,
  'executed_candidate_sha256':expected,'executed_original_sha256':original,
  'build_report':str((W/'build/build-comparison.json').relative_to(R)),'build_report_sha256':sha(W/'build/build-comparison.json'),
  'actual_compiler_inputs_sha256':build['source_sha256'],
  'embedded_legacy_source_map_role':'Any source_sha256 map captured from programs/pump by an unchanged legacy runner is an incidental main48 checkout snapshot, not the composite build input map. This binding identifies the actual 36 compiled scratch inputs.'}
 if isinstance(data.get('source_sha256'),dict):binding['embedded_checkout_source_sha256']=data['source_sha256']
 bindings.append(binding)

diffrows=read(W/'differential/run.json');assert len(diffrows)==37;diffs=[]
for row in diffrows:
 assert row['returncode']==0 and row['bound_hashes_match']and not row['mismatches'],row
 p=W/'differential'/(row['suite']+'.json.gz');assert sha(p)==row['receipt_sha256'];data=read(p)
 assert row['candidate_sha256']==expected and row['original_sha256']==original
 bind(p,data,'differential');diffs.append({'suite':row['suite'],'family':row['family'],'case_count':row['case_count'],'receipt_sha256':sha(p),'verified':signatures(data)})
assert sum(d['case_count']for d in diffs)==9217
qc=read(W/'differential/quote_control.json.gz');bound=qc['bound_inputs_sha256']
for path,digest in build['source_sha256'].items():assert bound[path]==digest,path
assert bound[str((W/'build/build-comparison.json').relative_to(R))]==sha(W/'build/build-comparison.json')
for path,digest in bound.items():assert sha(R/path)==digest,path
assert next(d for d in diffs if d['suite']=='quote_control')['verified']=={'transactions':1014,'signatures':2008}

partial=read(W/'differential/multi_hop_curve_partial.json.gz');assert partial['case_count']==partial['passed']==56
AMM=Pubkey.from_string('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA');PUMP=Pubkey.from_string('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P')
partial_cpis=0;partial_success=0
for c in partial['cases']:
 assert not c['mismatches']
 assert all(c['original'][k]==c['candidate'][k]for k in ['error','events','inner','return_data','before','after'])
 calls=[]
 for side in ['original','candidate']:
  side_result=c[side];assert side_result['fresh_vm']
  assert side_result['program_sha256'][str(PUMP)]==(original if side=='original'else expected)
  tx=VersionedTransaction.from_bytes(base64.b64decode(side_result['transaction_base64']));keys=tx.message.account_keys
  assert len(tx.message.instructions)==1 and keys[tx.message.instructions[0].program_id_index]==AMM
  pump_calls=[x for group in side_result['inner']for x in group if keys[x['instruction']['programIdIndex']]==PUMP and bytes(x['instruction']['data'][1:]).startswith(bytes([225,154,117,22,215,86,246,103]))]
  assert len(pump_calls)<=1
  for call in pump_calls:
   assert bytes(call['instruction']['data'][1:])[16:]==bytes([1,0,0,0,3])
   assert len(call['instruction']['accounts'][1:])==18
   assert keys[call['instruction']['accounts'][3]]==Pubkey.find_program_address([b'global_config'],AMM)[0]
  calls.append(bool(pump_calls))
 assert calls[0]==calls[1];partial_cpis+=calls[0];partial_success+=c['original']['error']is None
assert (partial_cpis,partial_success)==(50,11)
assert next(d for d in diffs if d['suite']=='multi_hop_curve_partial')['verified']=={'transactions':112,'signatures':112}

surfrows=read(W/'surfpool/run.json');assert len(surfrows)==28;surfs=[];elf_copies={}
for row in surfrows:
 assert row['returncode']==0 and row['runner_unchanged']and row['candidate_sha256']==expected,row
 directory=R/row['output'];found=[]
 for p in directory.glob('pump-*-transactions.json'):
  data=read(p)
  if isinstance(data,dict)and 'candidate_sha256'in data and 'signed_transactions'in data:found.append((p,data))
 assert len(found)==1,(row['name'],len(found));p,data=found[0]
 assert data['candidate_sha256']==expected and data['original_sha256']==original
 assert not data['mismatches']and not data.get('unexpected_original_errors',[])and not data.get('unexpected_errors',[]),row['name']
 assert len(data['original'])==len(data['candidate'])==data['cases']
 verified=signatures({'original':data['original'],'candidate':data['candidate']})
 assert verified['transactions']==data['signed_transactions']==2*data['cases']
 for filename,digest in [('candidate.so',expected),('original.so',original)]:
  copy=directory/filename;assert sha(copy)==digest;elf_copies[str(copy.relative_to(R))]=digest
 bind(p,data,'surfpool');surfs.append({'suite':row['name'],'family':row['family'],'cases':data['cases'],'receipt_sha256':sha(p),'verified':verified})
assert sum(s['cases']for s in surfs)==1024
assert sum(s['verified']['transactions']for s in surfs)==2048
(W/'receipt-build-bindings.json').write_text(json.dumps(bindings,indent=2)+'\n')
(W/'surfpool-executable-sha256.json').write_text(json.dumps(elf_copies,indent=2)+'\n')
out={'scope':'Read-only saved receipt/source/ELF/signature verification. Actual compiler inputs are the 36 scratch inputs in receipt-build-bindings.json. Legacy embedded checkout maps are preserved only as incidental snapshots.',
 'base_revision':inputs['base_revision'],'base_candidate_sha256':inputs['base_candidate_sha256'],
 'candidate_sha256':expected,'original_sha256':original,'source_inputs':36,'harness_files':len(inputs['harness_sha256']),'runtime_files':len(inputs['repository_fixture_snapshot_sha256']),
 'differential_suites':diffs,'differential_case_count':9217,'published48_differential_cases':9161,'partial_curve_comparisons':56,'partial_curve_verified_signatures':112,'partial_curve_pump_cpi_cases':partial_cpis,'partial_curve_successful_cases':partial_success,
 'surfpool_suites':surfs,'surfpool_comparisons':1024,'surfpool_signed_transactions':2048,'surfpool_verified_signatures':sum(s['verified']['signatures']for s in surfs),
 'receipt_build_bindings':len(bindings),'receipt_build_bindings_sha256':sha(W/'receipt-build-bindings.json'),'quote_control_binds_actual_composite_build':True,
 'main_source_unchanged':True,'inputs_unchanged':True,'full_byte_equality':False,'security_audit_complete':False,'mismatches':[]}
(W/'independent-verification.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({k:v for k,v in out.items()if k not in ['differential_suites','surfpool_suites']},indent=2))
