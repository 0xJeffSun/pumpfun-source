"""Signed local create/fund/crank sequences without resetting the created state."""
import argparse,base64,hashlib,json,sys
from pathlib import Path
R=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(R/'scripts'))
import fees_donation_create_differential as create
import fees_donation_crank_probe as crank
from solders.system_program import transfer,TransferParams
from solders.instruction import Instruction,AccountMeta
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
from solders.account import Account
from solders.pubkey import Pubkey
from solders.clock import Clock
from solders.compute_budget import set_compute_unit_limit

def cases():
 return [dict(name=f'{mode}-{prefund}',mode=mode,prefund=prefund)for mode in ['ordinary','missing-whitelist','disabled','readonly','sharing']for prefund in [0,1,10**9]]

def run(binary,case):
 f=create.Fixture(binary);vm=f.vm;steps=[];edits=[]
 vm.set_clock(Clock(1000,0,0,0,1700000000))
 initial=dict(name=case['name'],prefund=case['prefund'])
 if case['mode']=='sharing':initial['sharing']={'status':1}
 created=f.run(initial);assert created['error']is None,created['error']
 created_account=vm.get_account(create.DONATION)
 assert bytes(created_account.data).hex()==created['data']
 steps.append(dict(name='create',result=created))
 for name,key in [('donation_relay',crank.RELAY),('spl_token',crank.TOKEN),('associated_token',crank.ATA)]:vm.add_program_from_file(key,R/f'evidence/dependencies/{name}/deployed.so')
 fixture=json.loads((R/'research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json').read_text());mint=fixture['accounts']['quote_mint']
 vm.set_account(create.QUOTE,Account(mint['lamports'],base64.b64decode(mint['data_base64']),crank.TOKEN))
 edits.append(dict(name='synthetic-quote',key=str(create.QUOTE),lamports=mint['lamports'],data=base64.b64decode(mint['data_base64']).hex(),owner=str(crank.TOKEN)))
 def whitelist():
  wd=hashlib.sha256(b'account:MintWhitelistV1').digest()[:8]+bytes([crank.WB])+bytes(4)
  vm.set_account(crank.WHITELIST,Account(10**9,wd,crank.RELAY));edits.append(dict(name='synthetic-whitelist',before_step=len(steps),key=str(crank.WHITELIST),lamports=10**9,data=wd.hex(),owner=str(crank.RELAY)))
 if case['mode']!='missing-whitelist':whitelist()
 assert bytes(vm.get_account(create.DONATION).data)==bytes(created_account.data)
 names={'event_authority':create.EVENT,'program':create.PROGRAM,'payer':create.AUTH.pubkey(),'system_program':Pubkey.default(),'token_program':crank.TOKEN,'associated_token_program':crank.ATA,'rent':Pubkey.from_string('SysvarRent111111111111111111111111111111111'),'fee_program_global':create.GLOBAL,'donation_fee_pda':create.DONATION,'quote_mint':create.QUOTE,'donation_fee_pda_ata':crank.D_ATA,'donation_relay_program':crank.RELAY,'donation_relay_event_authority':crank.RELAY_EVENT,'mint_whitelist':crank.WHITELIST,'epoch_tracker':crank.EPOCH,'debouncer':crank.DEBOUNCER,'debouncer_ata':crank.B_ATA}
 def send(name,ixs,signers):
  vm.expire_blockhash()
  tx=Transaction.new_signed_with_payer(ixs,create.PAYER.pubkey(),signers,vm.latest_blockhash());assert all(tx.verify_with_results())
  donation=vm.get_account(create.DONATION);before=dict(lamports=donation.lamports,data=bytes(donation.data).hex(),owner=str(donation.owner))
  r=vm.send_transaction(tx);failed=isinstance(r,FailedTransactionMetadata);m=r.meta()if failed else r;meta=json.loads(m.to_json())
  donation=vm.get_account(create.DONATION);after=dict(lamports=donation.lamports,data=bytes(donation.data).hex(),owner=str(donation.owner))
  result=dict(error=str(r.err())if failed else None,before=before,after=after,logs=m.logs(),inner=meta['inner_instructions'],return_data=meta['return_data'],transaction_base64=base64.b64encode(bytes(tx)).decode())
  steps.append(dict(name=name,result=result));return result
 def fund(n,name):
  r=send(name,[transfer(TransferParams(from_pubkey=create.PAYER.pubkey(),to_pubkey=create.DONATION,lamports=n))],[create.PAYER]);assert r['error']is None
 def flags(value,name):
  ix=next(x for x in create.IDL['instructions']if x['name']=='set_disable_flags');metas=[AccountMeta(create.AUTH.pubkey(),True,True),AccountMeta(create.GLOBAL,False,True),AccountMeta(create.EVENT,False,False),AccountMeta(create.PROGRAM,False,False)]
  r=send(name,[Instruction(create.PROGRAM,bytes(ix['discriminator'])+bytes([value]),metas)],[create.PAYER,create.AUTH]);assert r['error']is None
 def settle(name,readonly=False):
  metas=[AccountMeta(names[a['name']],a.get('signer',False),a.get('writable',False)and not(readonly and a['name']=='donation_fee_pda'))for a in crank.IX['accounts']]
  return send(name,[set_compute_unit_limit(1400000),Instruction(create.PROGRAM,bytes(crank.IX['discriminator']),metas)],[create.PAYER,create.AUTH])
 fund(1000000,'fund-first')
 if case['mode']=='disabled':flags(8,'disable-crank')
 first=settle('crank-first',case['mode']=='readonly')
 if case['mode']in ['missing-whitelist','disabled','readonly']:
  assert first['error']is not None,case
  assert first['before']==first['after'],'failed transaction changed donation'
  if case['mode']=='missing-whitelist':whitelist()
  if case['mode']=='disabled':flags(0,'enable-crank')
  assert settle('crank-retry')['error']is None
 else:assert first['error']is None
 # Fresh signed funding then repeated crank on existing ATA/relay state.
 fund(500000,'fund-second');settle('crank-same-time')
 vm.set_clock(Clock(1001,0,0,0,1700000124));edits.append(dict(name='advance-clock',before_step=len(steps),unix_timestamp=1700000124,slot=1001))
 settle('crank-after-interval');settle('crank-repeat-empty')
 return dict(case=case,steps=steps,environment_edits=edits,created_account_preserved=True)

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();original=R/'evidence/original/pump_fees/deployed.so';rows=[];differences=[]
 for case in cases():
  x=run(original,case);y=run(a.candidate,case)
  def comparison(r):
   r=json.loads(json.dumps(r))
   for step in r['steps']:
    step['result']['logs']=[l for l in step['result']['logs']if l.startswith(('Program log:','Program data:','Program return:'))]
   return r
  match=comparison(x)==comparison(y)
  if not match:differences.append(case['name'])
  rows.append(dict(case=case,original=x,candidate=y,match=match));print(case['name'],match,flush=True)
 report=dict(original_sha256=hashlib.sha256(original.read_bytes()).hexdigest(),candidate_sha256=hashlib.sha256(a.candidate.read_bytes()).hexdigest(),cases=rows,mismatches=differences)
 a.output.write_text(json.dumps(report,indent=2)+'\n');assert not differences,differences
if __name__=='__main__':main()
