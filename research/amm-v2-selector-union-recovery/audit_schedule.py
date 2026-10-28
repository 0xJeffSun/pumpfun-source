"""Recount the five exact signed schedule controls before/after H11 integration."""
from pathlib import Path
import base64,gzip,hashlib,json,sys
from solders.transaction import Transaction
H=Path(__file__).resolve().parent;R=H.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
original=sha(R/'evidence/original/pump_amm/deployed.so');results=[]
for stage,build in [('before','intermediate'),('after','candidate')]:
 d=json.loads(gzip.decompress((H/'schedule'/f'{stage}.json.gz').read_bytes()));expected=json.loads((H/'builds'/build/'result.json').read_bytes())['candidate_sha256']
 assert d['candidate_sha256']==expected and d['original_sha256']==original
 parent=R/'research/claude-amm-union2-20261028/negative'
 assert d['producer_sha256']==sha(parent/'producer.py') and d['fixture_sha256']==sha(parent/'fixture.py')
 for name,digest in d['inputs'].items():assert sha(R/name)==digest
 assert [r['name'] for r in d['cases']]==['negative-end','end-before-start','active-control','equality-control','zero-supply']
 mismatches=[];signatures=0
 for row in d['cases']:
  a,b=row['original'],row['candidate'];assert a.keys()==b.keys()
  for label,value,digest in [('original',a,original),('candidate',b,expected)]:
   assert value['executed_program_sha256']==digest
   assert value['signature_verification'] and value['sigverify_runtime_enabled']
   checks=Transaction.from_bytes(base64.b64decode(value['transaction_base64'])).verify_with_results();assert checks and all(checks);signatures+=len(checks)
  assert a['before']==b['before'] and a['after']==b['after'] and a['transaction_base64']==b['transaction_base64']
  assert row['error_equal']==(a['error']==b['error'])
  if a['error']!=b['error']:
   mismatches.append(row['name']);assert 'ProgramFailedToComplete' in a['error'] and '6035' in b['error']
  if stage=='after':assert all(a[k]==b[k] for k in a if k not in ['logs','executed_program_sha256'])
 assert mismatches==(['negative-end','end-before-start'] if stage=='before' else [])
 results.append({'stage':stage,'candidate_sha256':expected,'cases':5,'executions':10,'verified_signature_fields':signatures,'error_mismatches':mismatches})
if '--write' in sys.argv:(H/'schedule/audit.json').write_bytes((json.dumps(results,indent=2)+'\n').encode())
else:assert results==json.loads((H/'schedule/audit.json').read_bytes())
print('PASS H11 integration: 2 -> 0 mismatches in five controls; signed executed ELF bindings')
