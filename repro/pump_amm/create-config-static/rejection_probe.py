#!/usr/bin/env python3
"""Offline ordinary-signature negative checks. No fixed-admin signer or success claim."""
from pathlib import Path
import argparse,base64,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
from pump_amm_admin_differential import *
from pump_amm_reusable_harness import acquire_harness
from solders.clock import Clock
FIXED_ADMIN=Pubkey.from_string('8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8')
assert PAYER.pubkey()!=FIXED_ADMIN and OUTSIDER.pubkey()!=FIXED_ADMIN

def run(candidate,case):
 h=acquire_harness(candidate);h.vm.set_clock(Clock(100,1234567890,0,0,1234567890))
 h.vm.set_account(CONFIG_KEY,Account(case.get('lamports',0),bytes(case.get('length',0)),Pubkey.from_string(case.get('owner',str(Pubkey.default())))))
 metas=[AccountMeta(PAYER.pubkey(),True,True),AccountMeta(CONFIG_KEY,False,True),AccountMeta(Pubkey.default(),False,False),AccountMeta(EVENT,False,False),AccountMeta(PROGRAM,False,False)]
 for i in case.get('readonly',[]):
  m=metas[i];metas[i]=AccountMeta(m.pubkey,m.is_signer,False)
 for i in case.get('substitute',[]):
  key=Pubkey.from_bytes(bytes([90+i])*32);h.vm.set_account(key,Account(10**9,b'',Pubkey.default()));m=metas[i];metas[i]=AccountMeta(key,False,m.is_writable)
 if case.get('unsigned'):
  metas[0]=AccountMeta(PAYER.pubkey(),False,True)
 if case.get('fixed_nonsigner'):
  h.vm.set_account(FIXED_ADMIN,Account(10**12,b'',Pubkey.default()));metas[0]=AccountMeta(FIXED_ADMIN,False,True)
 if case.get('payer_lamports') is not None:h.vm.set_account(PAYER.pubkey(),Account(case['payer_lamports'],b'',Pubkey.default()))
 recipients=[bytes([i])*32 for i in range(1,9)]
 if case.get('recipients')=='zero':recipients=[bytes(32)]*8
 elif case.get('recipients')=='reverse':recipients=recipients[::-1]
 elif case.get('recipients')=='duplicate':recipients=[bytes([1])*32]*8
 data=bytes([201,207,243,114,75,111,47,189])+struct.pack('<QQ',case.get('lp',20),case.get('protocol',5))+b''.join(recipients)+struct.pack('<Q',case.get('creator',0))+bytes(OUTSIDER.pubkey())
 if 'payload_length'in case:data=data[:case['payload_length']]
 if 'trailing'in case:data+=bytes(case['trailing'])
 if 'accounts'in case:metas=metas[:case['accounts']]
 signers=[OUTSIDER]
 if any(m.pubkey==PAYER.pubkey()and m.is_signer for m in metas):signers.append(PAYER)
 tx=Transaction.new_signed_with_payer([Instruction(PROGRAM,data,metas)],OUTSIDER.pubkey(),signers,h.vm.latest_blockhash())
 verified=tx.verify_with_results();assert verified and all(verified)
 signer_keys=list(tx.message.account_keys[:tx.message.header.num_required_signatures]);assert FIXED_ADMIN not in signer_keys
 def states():
  result={}
  for key in sorted(set(m.pubkey for m in metas)|{OUTSIDER.pubkey()},key=str):
   a=h.vm.get_account(key)
   if a is None or not a.executable:result[str(key)]=None if a is None else {'data':bytes(a.data).hex(),'lamports':a.lamports,'owner':str(a.owner)}
  return result
 before=states();res=h.vm.send_transaction(tx);failed=isinstance(res,FailedTransactionMetadata);assert failed,'Ordinary negative fixture unexpectedly succeeded'
 meta=res.meta();after=states()
 return {'error':str(res.err()),'before':before,'after':after,'events':[s for s in meta.logs()if s.startswith('Program data: ')],'inner':json.loads(meta.to_json())['inner_instructions'],'logs':meta.logs(),'transaction_base64':base64.b64encode(bytes(tx)).decode(),'signer_keys':list(map(str,signer_keys)),'signature_verification':verified}

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--candidate',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);a=ap.parse_args();orig=ROOT/'evidence/original/pump_amm/deployed.so';cases=[{'name':'wrong-admin'},{'name':'unsigned-admin','unsigned':True},{'name':'fixed-admin-is-not-signer','fixed_nonsigner':True}]
 cases +=[{'name':f'payload-{n}','payload_length':n}for n in range(320)]
 cases +=[{'name':f'accounts-{n}','accounts':n}for n in range(5)]
 cases +=[{'name':f'readonly-{i}','readonly':[i]}for i in [0,1]]
 cases +=[{'name':f'substitute-{i}','substitute':[i]}for i in [1,2,3,4]]
 cases +=[{'name':f'prefunded-{n}','lamports':n}for n in [1,100,1000000,7495920,10**9]]
 cases +=[{'name':f'existing-{owner}-{n}','lamports':10**9,'length':n,'owner':str(owner)}for owner in [Pubkey.default(),PROGRAM]for n in [1,8,907,940,949,1000]]
 cases +=[{'name':f'admin-funds-{n}','payer_lamports':n}for n in [1,1000,1000000]]
 cases +=[{'name':f'{field}-{n}',field:n}for field in ['lp','protocol','creator']for n in [0,1000,1001,2**64-1]]
 cases +=[{'name':f'recipients-{kind}','recipients':kind}for kind in ['zero','reverse','duplicate']]
 cases +=[{'name':f'trailing-{n}','trailing':n}for n in [1,32,500]]
 rows=[]
 for case in cases:
  x=run(orig,case);y=run(a.candidate,case)
  diff=[k for k in ['error','before','after','events','inner','transaction_base64','signer_keys','signature_verification']if x[k]!=y[k]]
  rows.append({'parameters':case,'original':x,'candidate':y,'mismatched_fields':diff,'match':not diff})
 result={'scope':'Ordinary verified test-owned outer signatures; synthetic state. Every case must fail. No positive runtime validation of create_config or fixed-admin signer bypass. Logs are retained; equality covers error, account states, event data, actual captured inner instructions, and exact signed transaction.','original_sha256':hashlib.sha256(orig.read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'case_count':len(rows),'positive_runtime_cases':0,'signature_bypass':False,'mismatches':[x['parameters']['name']for x in rows if not x['match']],'cases':rows}
 a.output.write_text(json.dumps(result,separators=(',',':'))+'\n');print(json.dumps({k:result[k]for k in ['case_count','positive_runtime_cases','mismatches']}))
 if result['mismatches']:raise SystemExit(1)
if __name__=='__main__':main()
