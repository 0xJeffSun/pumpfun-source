"""Offline authentication of focused sharing-update transactions; no VM/RPC."""
from pathlib import Path
import base64,gzip,hashlib,json
from solders.transaction import Transaction
P=Path(__file__).resolve().parent
def main():
 p=P/'receipts/origins-sharing.json.gz';r=json.loads(gzip.decompress(p.read_bytes()));records=0;unique=set()
 for row in r['cases']:
  for side in ['original','candidate']:
   for field in ['transaction_base64','bootstrap_transaction_base64']:
    b=base64.b64decode(row[side][field],validate=True);tx=Transaction.from_bytes(b);assert bytes(tx)==b and len(tx.signatures)>0 and all(tx.verify_with_results());unique.add(hashlib.sha256(b).hexdigest());records+=1
 assert records==1668
 print(json.dumps(dict(receipt_sha256=hashlib.sha256(p.read_bytes()).hexdigest(),transaction_records_verified=records,unique_transaction_sha256=sorted(unique),scope='Saved focused signatures only; no execution or unrecorded account claim.'),indent=2))
if __name__=='__main__':main()
