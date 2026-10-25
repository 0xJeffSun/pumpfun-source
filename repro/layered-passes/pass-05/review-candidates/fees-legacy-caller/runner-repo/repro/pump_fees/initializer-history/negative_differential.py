#!/usr/bin/env python3
"""Ordinary test-owned signers exercise initializer rejection; no privileged signer spoofing."""
from pathlib import Path
import argparse,hashlib,json
from solders.litesvm import LiteSVM
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.account import Account
from solders.instruction import AccountMeta,Instruction
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
ROOT=Path(__file__).resolve().parent;REPO=next(p for p in ROOT.parents if (p/'evidence/original').exists());FEES=Pubkey.from_string('pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ');FIXED=Pubkey.from_string('8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8');SYSTEM=Pubkey.default();ADMIN=Keypair.from_seed(bytes([207])*32);PAYER=Keypair.from_seed(bytes([208])*32);OTHER=Pubkey.from_bytes(bytes([209])*32);NS=Pubkey.from_string('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');EVENT=Pubkey.find_program_address([b'__event_authority'],FEES)[0];sha=lambda b:hashlib.sha256(b).hexdigest()
assert ADMIN.pubkey()!=FIXED and PAYER.pubkey()!=FIXED

def run(binary,c):
 vm=LiteSVM().with_sigverify(True).with_transaction_history(0);vm.add_program_from_file(FEES,binary)
 ns=OTHER if c.get('namespace')=='other' else NS;config=Pubkey.find_program_address([b'fee_config',bytes(ns)],FEES)[0]
 if c.get('wrong_pda'):config=Pubkey.from_bytes(bytes([210])*32)
 if c.get('payer_equals_target'):config=ADMIN.pubkey()
 for k,n in [(ADMIN.pubkey(),c.get('admin_lamports',10**9)),(PAYER.pubkey(),10**9),(ns,1)]:vm.set_account(k,Account(n,b'',SYSTEM))
 if c.get('initial')=='fee-owned':initial=Account(10**9,bytes(2512),FEES)
 elif c.get('initial')=='foreign-owned':initial=Account(10**9,bytes(2512),OTHER)
 elif c.get('initial')=='system-data':initial=Account(10**9,bytes(1),SYSTEM)
 else:initial=Account(c.get('prefund',0),b'',SYSTEM)
 if not c.get('payer_equals_target'):vm.set_account(config,initial)
 system=OTHER if c.get('wrong_system') else SYSTEM;event=OTHER if c.get('wrong_event') else EVENT;program=SYSTEM if c.get('wrong_program') else FEES
 accounts=[AccountMeta(ADMIN.pubkey(),not c.get('unsigned'),not c.get('admin_readonly')),AccountMeta(config,False,not c.get('config_readonly')),AccountMeta(system,False,False),AccountMeta(ns,False,False),AccountMeta(event,False,False),AccountMeta(program,False,False)]
 if 'count' in c:accounts=accounts[:c['count']]
 payload=bytes.fromhex('3ea214857941911b')+bytes(c.get('extra_args',0))
 signers=[PAYER]+([ADMIN] if accounts and not c.get('unsigned') else [])
 tx=Transaction.new_signed_with_payer([Instruction(FEES,payload,accounts)],PAYER.pubkey(),signers,vm.latest_blockhash())
 assert all(tx.verify_with_results())
 def state(k):
  a=vm.get_account(k);return {'lamports':a.lamports,'data_hex':a.data.hex(),'owner':str(a.owner),'executable':a.executable} if a else None
 before={str(k):state(k) for k in [ADMIN.pubkey(),PAYER.pubkey(),config,ns]};r=vm.send_transaction(tx);failed=isinstance(r,FailedTransactionMetadata);m=r.meta() if failed else r
 return {'error':str(r.err()) if failed else None,'signature_verification':all(tx.verify_with_results()),'runtime_sigverify_enabled':True,'admin_is_test_owned':str(ADMIN.pubkey()),'fixed_admin_never_claimed_signer':str(FIXED) not in [str(k) for k in tx.message.account_keys],'before':before,'after':{str(k):state(k) for k in [ADMIN.pubkey(),PAYER.pubkey(),config,ns]},'events':[l for l in m.logs() if l.startswith('Program data:')],'inner_instructions':json.loads(m.to_json())['inner_instructions'],'logs':m.logs()}

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();original=REPO/'evidence/original/pump_fees/deployed.so'
 cases=[{'name':'wrong-admin'},*[{'name':f'prefund-{n}','prefund':n} for n in [1,18374399,18374400,10**9]],*[{'name':'admin-balance-'+str(n),'admin_lamports':n} for n in [0,1,18374399,18374400]],*[{'name':x,x:True} for x in ['unsigned','admin_readonly','config_readonly','wrong_pda','wrong_system','wrong_event','wrong_program','payer_equals_target']],*[{'name':'initial-'+x,'initial':x} for x in ['fee-owned','foreign-owned','system-data']],*[{'name':'accounts-'+str(n),'count':n} for n in range(6)],{'name':'other-namespace','namespace':'other'},{'name':'trailing-arguments','extra_args':32}]
 rows=[];bad=[]
 for c in cases:
  x=run(original,c);y=run(a.candidate,c);match=all(x[k]==y[k] for k in ['error','before','after','events','inner_instructions']);rows.append({'case':c,'original':x,'candidate':y,'match':match});assert x['error'] is not None,'Ordinary wrong admin unexpectedly succeeded'
  if not match:bad.append(c['name'])
 out={'scope':'Initializer rejection using only ordinary test-owned signers; fixed admin is never a transaction signer. Signature verification is explicitly enabled. Local original/candidate SBF execution; no network writes.','original_sha256':sha(original.read_bytes()),'candidate_sha256':sha(a.candidate.read_bytes()),'case_count':len(rows),'mismatches':bad,'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'case_count':len(rows),'mismatches':bad}));assert not bad
if __name__=='__main__':main()
