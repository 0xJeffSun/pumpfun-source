"""Independently verify saved synthetic transaction signatures; no VM or RPC."""
from pathlib import Path
import base64,gzip,hashlib,importlib.metadata,json
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent
def verify():
 assert importlib.metadata.version('solders')=='0.27.1';e=json.loads((HERE/'experiment.json').read_text());inputs={};unique=set();verified=0
 for label,v in e['variants'].items():
  p=HERE/f'receipts/{label}-crank.json.gz';raw=p.read_bytes();r=json.loads(gzip.decompress(raw));assert r['candidate_sha256']==v['files']['candidate']['sha256'];inputs[label]=hashlib.sha256(raw).hexdigest()
  for row in r['cases']:
   for side in ['original','candidate']:
    encoded=base64.b64decode(row[side]['transaction_base64'],validate=True);tx=Transaction.from_bytes(encoded);assert bytes(tx)==encoded and all(tx.verify_with_results());unique.add(hashlib.sha256(encoded).hexdigest());verified+=1
 return dict(scope='Saved signed synthetic transactions only; no VM, RPC, privileged signer or execution-authentication claim.',solders='0.27.1',receipt_sha256=inputs,transaction_records_verified=verified,unique_transaction_sha256=sorted(unique))
if __name__=='__main__':
 r=verify();p=HERE/'checks/signatures.json'
 if p.exists():assert json.loads(p.read_text())==r
 else:p.parent.mkdir(exist_ok=True);p.write_text(json.dumps(r,indent=2)+'\n')
 print('PASS: saved signatures',r['transaction_records_verified'],'records;',len(r['unique_transaction_sha256']),'unique signed payloads')
