"""Original AMM multi-hop observations with normally signed synthetic local state."""
import sys,pathlib,os
ROOT=pathlib.Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'));os.chdir(ROOT)
from pump_amm_legacy_sell_differential import *
PUMP_GLOBAL=Pubkey.find_program_address([b'global'],PUMP)[0];PUMP_FEES=Pubkey.find_program_address([b'fee_config',bytes(PUMP)],FEES)[0];PUMP_EVENT=Pubkey.find_program_address([b'__event_authority'],PUMP)[0]
def run(amount=10**9,limit=1,sell=False,tail=True,overrides=None,candidate=None,unsigned=False,separate_payer=False,payload_length=None,extra_data=b''):
 h=acquire_harness(candidate or ROOT/'evidence/original/pump_amm/deployed.so');h.vm.set_clock(Clock(100,1234567890,0,0,1234567890))
 for pid,p in [(TOKEN,'evidence/dependencies/spl_token/deployed.so'),(TOKEN22,'evidence/dependencies/spl_token_2022/deployed.so'),(FEES,'evidence/original/pump_fees/deployed.so'),(ATA,'evidence/dependencies/associated_token/deployed.so'),(PUMP,'evidence/original/pump/deployed.so')]:h.vm.add_program_from_file(pid,ROOT/p)
 for row in f['accounts'].values():h.vm.set_account(Pubkey.from_string(row['address']),Account(row['lamports'],base64.b64decode(row['data_base64']),Pubkey.from_string(row['owner'])))
 raw=bytearray(RAW);raw[56]=0;h.vm.set_account(CONFIG_KEY,Account(CONFIG['lamports'],bytes(raw),PROGRAM))
 for k,m,native in [(userbase,base,False),(userquote,quote,True)]:h.vm.set_account(k,Account(10**15+2039280 if native else 10**9,token(m,PAYER.pubkey(),10**15,native),TOKEN))
 h.vm.set_account(volume,Account(0,b'',Pubkey.default()))
 for k in [PUMP_GLOBAL,PUMP_FEES,PUMP_EVENT]:h.vm.set_account(k,Account(10**9,b'',Pubkey.default()))
 ix=next(x for x in IDL['instructions']if x['name']=='multi_hop_swap');keys=[PAYER.pubkey(),userbase if sell else userquote,userquote if sell else userbase,CONFIG_KEY,feeconfig,volume,buyback,TOKEN,TOKEN22,Pubkey.default(),EVENT,PROGRAM,PUMP,PUMP_GLOBAL,PUMP_FEES,PUMP_EVENT];m=[AccountMeta(k,bool(a.get('signer')),bool(a.get('writable')))for k,a in zip(keys,ix['accounts'])]
 if tail:m += [AccountMeta(base,False,False),AccountMeta(quote,False,False),AccountMeta(pool,False,True),AccountMeta(vaultbase,False,True),AccountMeta(vaultquote,False,True)]
 if overrides:overrides(h,m)
 payer=OUTSIDER if unsigned or separate_payer else PAYER
 if unsigned:m[0]=AccountMeta(PAYER.pubkey(),False,True)
 data=bytes(ix['discriminator'])+struct.pack('<QQ',amount,limit)+extra_data
 if payload_length is not None:data=data[:payload_length]
 def snap():
  out={}
  for k in sorted(set([x.pubkey for x in m]+[payer.pubkey()]),key=str):
   a=h.vm.get_account(k)
   if not a or not a.executable:out[str(k)]=None if not a else{'lamports':a.lamports,'owner':str(a.owner),'data_hex':bytes(a.data).hex()}
  return out
 before=snap();tx=Transaction.new_signed_with_payer([Instruction(PROGRAM,data,m)],payer.pubkey(),[payer,PAYER]if separate_payer and not unsigned else[payer],h.vm.latest_blockhash());assert all(tx.verify_with_results());r=h.vm.send_transaction(tx);failed=isinstance(r,FailedTransactionMetadata);meta=r.meta()if failed else r
 return {'error':str(r.err())if failed else None,'logs':meta.logs(),'events':[x for x in meta.logs()if x.startswith('Program data: ')],'inner':json.loads(meta.to_json())['inner_instructions'],'return_data':json.loads(meta.to_json()).get('return_data'),'before':before,'after':snap(),'transaction_base64':base64.b64encode(bytes(tx)).decode()}
if __name__=='__main__':
 rows=[]
 for sell in [False,True]:
  for tail in [False,True]:
   for amount,limit in [(0,0),(0,1),(1,0),(1,1),(10**9,1)]:
    r=run(amount,limit,sell,tail);rows.append({'case':str((sell,tail,amount,limit)),'result':r});print(rows[-1]['case'],r['error'],r['logs'])
 (pathlib.Path(__file__).parent/'observations-01.json').write_text(json.dumps(rows))
