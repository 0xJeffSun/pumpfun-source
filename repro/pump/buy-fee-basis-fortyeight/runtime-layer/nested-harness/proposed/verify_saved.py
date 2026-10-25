"""Proposed saved-result verifier; never executes a program or signs a transaction."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,sys
sys.dont_write_bytecode=True
from solders.transaction import Transaction
import pump_nested_general_differential as h
p=argparse.ArgumentParser();p.add_argument('receipt',type=Path);a=p.parse_args();j=json.loads(gzip.decompress(a.receipt.read_bytes()));expected=json.loads(h.CASES.read_text())['cases']
assert j['inputs_unchanged']and j['case_count']==j['new_unique_cases']==16 and j['baseline_repeats_in_this_runner']==0 and len(j['cases'])==16
assert not j['failures'];signatures=0
for want,row in zip(expected,j['cases']):
 assert row['case']==want and not row['mismatches']and not row['original_assertion_failures']and not row['candidate_assertion_failures']
 for side in ['original','candidate']:
  result=row[side]
  if result is None:assert j['candidate_sha256']is None;continue
  assert not h.assertions(want,result,row['layout'])
  raw=base64.b64decode(result['transaction_base64']);tx=Transaction.from_bytes(raw);assert all(tx.verify_with_results())and len(tx.signatures)==2
  assert set(tx.message.account_keys[:2])=={h.h.USER.pubkey(),h.h.MINT.pubkey()}
  assert hashlib.sha256(raw).hexdigest()==result['transaction_sha256'];signatures+=2
  call=[ix for ix in tx.message.instructions if tx.message.account_keys[ix.program_id_index]==h.h.PROGRAM];assert len(call)==1
  assert bytes(call[0].data)[:8]==bytes(next(x['discriminator']for x in h.h.IDL['instructions']if x['name']=='create_v2'))
 if row['candidate']:
  assert row['original']['transaction_base64']==row['candidate']['transaction_base64'],'Original/candidate must use the same normally signed message'
  for k in ['before','after','error','events','inner','return']:assert row['original'][k]==row['candidate'][k],(want['id'],k)
  assert h.logs_for_comparison(row['original']['logs'])==h.logs_for_comparison(row['candidate']['logs'])
assert signatures==j['verified_signatures']==(64 if j['candidate_sha256']else 32)
print(json.dumps({'status':'PASS','cases':16,'signatures':signatures,'new_runtime':False}))
