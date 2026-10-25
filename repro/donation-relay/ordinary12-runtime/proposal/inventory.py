#!/usr/bin/env python3
"""Deterministic account-byte preparation and saved-message verification only.
No VM creation, transaction construction, signing, simulation, or execution.
"""
import base64,gzip,hashlib,importlib.util,json
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def load_harness():
 spec=importlib.util.spec_from_file_location('relay_plan_harness',P/'harness_proposal.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 def forbidden(*a,**kw):raise AssertionError('inventory must not create a VM')
 m.LiteSVM=forbidden
 return m
def fixtures():
 h=load_harness();out=[]
 for case in h.CASES:
  accounts,ix,available,fee,proof=h.prepare(case,P)
  required={str(m.pubkey) for m in ix.accounts if m.is_signer}|{str(fee.pubkey())}
  assert required.issubset({str(k.pubkey()) for k in available})
  assert 'RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc' not in required
  out.append({'case':case,'program_id':str(ix.program_id),'fee_payer':str(fee.pubkey()),'required_test_owned_signers':sorted(required),'fixture':proof})
 return out

def saved_messages():
 from solders.transaction import Transaction,VersionedTransaction
 relay='RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu';fixed='RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc';rows=[]
 path=P/'inputs/donation-sequence.json.gz';j=json.loads(gzip.decompress(path.read_bytes()))
 for step in j['steps']:
  for side in ['original','candidate']:
   entry=step[side];raw=base64.b64decode(entry['transaction_base64']);tx=Transaction.from_bytes(raw);keys=list(map(str,tx.message.account_keys));n=tx.message.header.num_required_signatures
   rows.append({'source':'inputs/donation-sequence.json.gz','source_sha256':H(path.read_bytes()),'kind':'saved synthetic ordinary-signature fixture','step':step['step'],'side':side,'transaction_sha256':H(raw),'message_sha256':H(bytes(tx.message)),'transaction_base64':entry['transaction_base64'],'signature_count':len(tx.signatures),'verified_signatures':tx.verify_with_results(),'signers':keys[:n],'recent_blockhash':str(tx.message.recent_blockhash),'relay_in_account_keys':relay in keys,'fixed_relayer_is_signer':fixed in keys[:n],'recorded_error':entry['error'],'execution_performed_now':False})
 for name in ['admin-success-80.json','admin-success-81.json']:
  path=P/'inputs'/name;j=json.loads(path.read_bytes());raw=base64.b64decode(j['response']['result']['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);keys=list(map(str,tx.message.account_keys));n=tx.message.header.num_required_signatures
  rows.append({'source':'inputs/'+name,'source_sha256':H(path.read_bytes()),'kind':'captured historical Fees initializer; not relay invocation evidence','transaction_sha256':H(raw),'signature_count':len(tx.signatures),'verified_signatures':tx.verify_with_results(),'signers':keys[:n],'recent_blockhash':str(tx.message.recent_blockhash),'relay_in_account_keys':relay in keys,'fixed_relayer_is_signer':fixed in keys[:n],'recorded_error':j['response']['result']['meta']['err'],'execution_performed_now':False})
 assert all(all(r['verified_signatures']) for r in rows)
 return {'scope':'Only listed canonical public relay directory/captures, Fees donation sequence/harnesses and Fees initializer-history messages; duplicate receipt archives not exhaustively scanned. No global absence claim.','rows':rows,'saved_synthetic_fields':20,'unique_saved_synthetic_transactions':len({r['transaction_sha256'] for r in rows[:20]}),'historical_fields_checked':2,'genuine_fixed_relayer_authorizations_found':sum(r['kind'].startswith('captured') and r['fixed_relayer_is_signer'] for r in rows),'transaction_execution':0}
if __name__=='__main__':
 (P/'fixture-blueprints.json').write_text(json.dumps(fixtures(),indent=2,sort_keys=True)+'\n')
 (P/'saved-message-inventory.json').write_text(json.dumps(saved_messages(),indent=2,sort_keys=True)+'\n')
 print(json.dumps({'blueprints':15,'transaction_execution':0,'saved_signature_fields':22}))
