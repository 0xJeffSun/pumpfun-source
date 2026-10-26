"""Fresh verification of retained ordinary transactions; no VM or target execution."""
from pathlib import Path
import base64,hashlib,json,sys
from solders.transaction import Transaction
from solders.pubkey import Pubkey
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());receipt=J(P/'preservation-results/receipt.json');saved=J(P/'preservation-results/independent-saved-signatures.json');rows=[]
pump=Pubkey.from_string('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');mint=Pubkey.from_bytes(bytes([61])*32);pool=Pubkey.find_program_address([b'pool-authority',bytes(mint)],pump)[0]
for r in receipt['cases']:
 for side in ['original','candidate']:
  x=r[side];raw=base64.b64decode(x['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and len(tx.signatures)>0 and all(tx.verify_with_results())
  signer_keys=list(tx.message.account_keys[:tx.message.header.num_required_signatures]);assert pool not in signer_keys
  rows.append({'case':r['case']['name'],'side':side,'transaction_sha256':hashlib.sha256(raw).hexdigest(),'signatures':len(tx.signatures),'all_verified':True,'top_level_pool_authority_signer':False})
assert rows==saved['rows']and len(rows)==726 and sum(r['signatures']for r in rows)==1448
print('PASS:726retainednormallysignedtransactions/1448signaturefields, poolauthoritynotatoplevelsigner; noVM/targetexecution')
