from pathlib import Path
import json,gzip,hashlib,base64,struct
from solders.transaction import Transaction
def verify(path):
 f=Path(path);j=json.loads(gzip.decompress(f.read_bytes()))
 assert j['case_count']==1032 and j['signed_transactions']==2064 and not j['mismatches'];success=0
 spec=[(8,4),(12,4),(16,8),(24,8),(32,8),(40,8),(137,1),(146,8),(154,8),(129,8),(166,8),(182,8),(190,8),(198,8),(222,8),(230,8)]
 for row in j['cases']:
  c=row['case'];assert c['op']!='initialize_global_params' and not row['different_fields'];o=row['original'];n=row['candidate'];assert row['original_transaction_base64']==row['candidate_transaction_base64']
  for side in ['original','candidate']:
   tx=Transaction.from_bytes(base64.b64decode(row[side+'_transaction_base64']));assert all(tx.verify_with_results())
  for key in ['error','data','lamports','events','inner_instructions','owner','admin_lamports_delta','payer_lamports_delta']:assert o[key]==n[key]
  if o['error'] is not None:continue
  success+=1;expected=bytearray.fromhex(c['data']);args=bytes.fromhex(c.get('args',''));op=c['op']
  if op=='reset_sol_deployed':expected[113:129]=bytes(16)
  elif op=='reset_stable_deployed':expected[206:222]=bytes(16)
  elif op=='reset_state':
   for a,b in[(8,49),(113,129),(137,162),(182,246)]:expected[a:b]=bytes(b-a)
  elif op=='stop_trading':expected[48]=1
  elif op=='resume_trading':expected[48]=0
  elif op=='update_admin':expected[49:81]=args[:32]
  elif op=='update_trader':expected[81:113]=args[:32]
  elif op=='update_max_sol_per_sweep':expected[174:182]=args[:8]
  elif op=='update_max_stable_per_sweep':expected[246:254]=args[:8]
  elif op=='update_global_params':
   cursor=0
   for offset,width in spec:
    tag=args[cursor];cursor+=1;assert tag in[0,1]
    if tag:expected[offset:offset+width]=args[cursor:cursor+width];cursor+=width
   version=int.from_bytes(expected[162:166],'little');assert version<2**32-1;expected[162:166]=(version+1).to_bytes(4,'little')
  else:raise AssertionError(op)
  assert expected.hex()==o['data'],c['name']
 result=dict(receipt_sha256=hashlib.sha256(f.read_bytes()).hexdigest(),candidate_sha256=j['candidate_sha256'],case_count=1032,verified_signed_transactions=2064,successful_account_bytes_rederived=success,mismatches=[],initializers_excluded=True)
 return result
