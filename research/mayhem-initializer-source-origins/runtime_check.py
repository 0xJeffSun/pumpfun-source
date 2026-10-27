"""Validate qualified execution records and keep unqualified evidence distinct."""
from pathlib import Path
import base64,gzip,hashlib,importlib.util,json
from solders.transaction import Transaction
P=Path(__file__).resolve().parent
load=lambda p:json.loads(gzip.decompress(p.read_bytes()))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(root,qualified,unqualified):
 root=Path(root);original=sha(root/'evidence/original/mayhem/deployed.so');qhash=hashlib.sha256(qualified).hexdigest();uhash=hashlib.sha256(unqualified).hexdigest();assert qhash!=uhash
 runner=sha(P/'runtime/replay.py');pump=sha(root/'evidence/original/pump/deployed.so');pump_id=json.loads((root/'evidence/upstream/pump.json').read_text())['address'];summaries=[]
 matrix=module('canonical_initializer_matrix',root/'research/mayhem-initializer-validation/validation_matrix.py')
 cpi=module('canonical_initializer_cpi',root/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py')
 canonical={'rejections':matrix.cases(),'pump-cpi':[c for c in cpi.cases()if c['case']!='zero-creator-is-rejected']}
 for kind,oldname in [('rejections','accounts-init-source-rejections.json.gz'),('pump-cpi','accounts-init-source-cpi.json.gz')]:
  r=load(P/f'runtime/qualified/{kind}.json.gz');old=load(P/f'runtime/unqualified/{oldname}');assert r['schema']=='initializer-source-origins-runtime-v1'and r['kind']==kind
  assert r['candidate_sha256']==qhash and old['candidate_sha256']==uhash and r['original_sha256']==old['original_sha256']==original
  assert r['runner_sha256']==runner
  for path,digest in r['harness_sha256'].items():assert sha(root/path)==digest
  expected=53 if kind=='rejections'else 16;assert len(r['cases'])==len(old['cases'])==r['case_count']==old['case_count']==expected;assert r['mismatches']==old['mismatches']==[]
  assert [row['case']for row in r['cases']]==canonical[kind]
  assert [row['case']for row in old['cases']]==canonical[kind]
  if kind=='rejections':
   assert old['runner_sha256']==sha(P/'runtime/unqualified/rejection-runner.py')
   fields=['error','anchor_errors','before','after','events','inner','return','signed_transaction_base64']
  else:
   assert old['runner_sha256']==sha(P/'runtime/unqualified/cpi-runner.py')and old['original_pump_sha256']==pump
   fields=['before','after','error','events','inner','return']
  assert r['compared_fields']==fields;txcount=success=0
  for row,prior in zip(r['cases'],old['cases']):
   assert row['case']==prior['case'];assert row['differences']==prior['differences']==[]
   for f in fields:assert row['original'][f]==row['candidate'][f]==prior['original'][f]==prior['candidate'][f],(kind,row['case'],f)
   success+=row['original']['error']is None
   x,y=row['original_executions'],row['candidate_executions'];assert len(x)==len(y)
   expected_executions=1 if kind=='rejections'or not row['case'].get('init_global_params',True)else 2
   assert len(x)==len(y)==expected_executions
   xt=[v['signed_transaction_base64']for v in x];yt=[v['signed_transaction_base64']for v in y];assert xt==yt
   assert len(set(xt))==len(xt)
   if kind=='rejections':assert xt==[row['original']['signed_transaction_base64']]
   else:assert xt==prior['original_signed_transactions']==prior['candidate_signed_transactions']
   for side,rows,digest,bytecount in [('original',x,original,(root/'evidence/original/mayhem/deployed.so').stat().st_size),('candidate',y,qhash,len(qualified))]:
    for execution in rows:
     tx=Transaction.from_bytes(base64.b64decode(execution['signed_transaction_base64']));assert all(tx.verify_with_results());txcount+=1
     assert execution['program_accounts'][MAY]==dict(sha256=digest,bytes=bytecount,executable=True)
     if kind=='pump-cpi':assert execution['program_accounts'][pump_id]==dict(sha256=pump,bytes=(root/'evidence/original/pump/deployed.so').stat().st_size,executable=True)
  assert success==(0 if kind=='rejections'else 10)
  summaries.append(dict(kind=kind,cases=expected,original_successes=success,signed_execution_records=txcount,checked_mismatches=0))
 assert sum(x['signed_execution_records']for x in summaries)==168
 return dict(qualified_candidate_sha256=qhash,unqualified_candidate_sha256=uhash,comparisons=69,original_successes=10,signed_execution_records=168,actual_program_accounts_attested=True,qualified_reports_preserve_unqualified_checked_fields=True,summaries=summaries,scope='Fresh qualified runtime is separately signed and attested. Legacy unqualified69-case receipts are comparison evidence for a different ELF, never relabeled. No live deployment or exhaustive semantics claim.')
