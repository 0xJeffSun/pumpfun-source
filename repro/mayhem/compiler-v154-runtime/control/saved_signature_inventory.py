"""Independent saved raw transaction signature inventory; no LiteSVM imports/VM."""
from pathlib import Path
import base64,gzip,json,hashlib,sys
from solders.transaction import Transaction
P=Path(__file__).resolve().parent

def inventory(root):
 summary=json.loads((root/'summary.json').read_text());out=[];total_tx=total_sig=missing=0
 for suite in summary['rows']:
  name=suite['name'];file=root/('replay/burn/comparison.json'if name=='burn'else'replay/'+name+'.json.gz');file=file if file.exists()else file.with_suffix('');b=file.read_bytes();j=json.loads(gzip.decompress(b)if b[:2]==b'\x1f\x8b'else b);txs=sigs=absent=0
  for row in j['cases']:
   for side in ['original','candidate']:
    values=[row[side]]
    if name=='burn':values.append(row[side]['sequential_second'])
    for value in values:
     if 'transaction_base64'not in value:absent+=1;continue
     raw=base64.b64decode(value['transaction_base64']);tx=Transaction.from_bytes(raw);verified=tx.verify_with_results();assert verified and all(verified)and bytes(tx)==raw;txs+=1;sigs+=len(verified)
  total_tx+=txs;total_sig+=sigs;missing+=absent;out.append({'suite':name,'receipt_sha256':hashlib.sha256(b).hexdigest(),'raw_transactions_signature_verified':txs,'individual_signatures_verified':sigs,'executions_without_retained_raw_transaction_bytes':absent})
 assert(total_tx,total_sig,missing)==(13284,26500,5906)
 return{'scope':'Saved raw bytes only; no VM/target/network or signature/history settings change','raw_transactions_signature_verified':total_tx,'individual_signatures_verified':total_sig,'executions_without_retained_raw_transaction_bytes':missing,'recorded_or_derived_signed_executions':19190,'all_execution_signatures_independently_verified':False,'rows':out,'new_target_executions':0}
if __name__=='__main__':
 result=inventory(Path(sys.argv[1])if len(sys.argv)>1 else P/'baseline6129');print(json.dumps(result,indent=2))
