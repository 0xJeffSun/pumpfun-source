"""Original-only AMM legacy buy probes; synthetic states and normal test-owned signatures."""
import sys,pathlib
sys.path.insert(0,str(pathlib.Path.cwd()/'scripts'))
from pump_amm_legacy_sell_differential import *
GLOBAL_VOLUME=Pubkey.find_program_address([b'global_volume_accumulator'],PROGRAM)[0]
GDISC=bytes(next(x for x in IDL['accounts'] if x['name']=='GlobalVolumeAccumulator')['discriminator'])
def legacy_buy(name='buy',amount=10**10,limit=10**12,track=b'\0',overrides=None,candidate=None,unsigned=False,payload_length=None,remaining=True):
 h=acquire_harness(candidate or ROOT/'evidence/original/pump_amm/deployed.so');h.vm.set_clock(Clock(100,1234567890,0,0,1234567890))
 for pid,filepath in [(TOKEN,'evidence/dependencies/spl_token/deployed.so'),(TOKEN22,'evidence/dependencies/spl_token_2022/deployed.so'),(FEES,'evidence/original/pump_fees/deployed.so'),(ATA,'evidence/dependencies/associated_token/deployed.so')]:h.vm.add_program_from_file(pid,ROOT/filepath)
 for n,row in f['accounts'].items():h.vm.set_account(Pubkey.from_string(row['address']),Account(row['lamports'],base64.b64decode(row['data_base64']),Pubkey.from_string(row['owner'])))
 glob=bytearray(RAW);glob[56]=0;h.vm.set_account(CONFIG_KEY,Account(CONFIG['lamports'],bytes(glob),PROGRAM))
 for k,m,owner,native in [(userbase,base,PAYER.pubkey(),False),(userquote,quote,PAYER.pubkey(),True),(PROTOCOL_ATA,quote,PROTOCOL,True),(CREATOR_ATA,quote,CREATOR_VAULT,True)]:h.vm.set_account(k,Account(10**15+2039280 if native else 10**9,token(m,owner,10**15 if k in [userbase,userquote] else 0,native),TOKEN))
 for k in [PROTOCOL,CREATOR_VAULT]:h.vm.set_account(k,Account(10**9,b'',Pubkey.default()))
 h.vm.set_account(volume,Account(0,b'',Pubkey.default()));h.vm.set_account(GLOBAL_VOLUME,Account(10**9,GDISC+struct.pack('<qqq',0,0,86400)+bytes(base)+bytes(480),PROGRAM))
 keys=[pool,PAYER.pubkey(),CONFIG_KEY,base,quote,userbase,userquote,vaultbase,vaultquote,PROTOCOL,PROTOCOL_ATA,TOKEN,TOKEN,Pubkey.default(),ATA,EVENT,PROGRAM,CREATOR_ATA,CREATOR_VAULT,GLOBAL_VOLUME,volume,feeconfig,FEES]
 ix=next(x for x in IDL['instructions'] if x['name']==name);metas=[AccountMeta(k,bool(row.get('signer')),bool(row.get('writable'))) for k,row in zip(keys,ix['accounts'])]
 if remaining:
  owner=Pubkey.from_bytes(base64.b64decode(f['accounts']['buyback_fee_recipient']['data_base64'])[32:64]);poolv2=Pubkey.find_program_address([b'pool-v2',bytes(base)],PROGRAM)[0]
  for key in [poolv2,owner]:h.vm.set_account(key,Account(10**9,b'',Pubkey.default()))
  metas+=[AccountMeta(poolv2,False,False),AccountMeta(owner,False,False),AccountMeta(buyback,False,True)]
 if overrides:overrides(h,metas)
 data=bytes(ix['discriminator'])+struct.pack('<QQ',amount,limit)+track
 if payload_length is not None:data=data[:payload_length]
 payer=OUTSIDER if unsigned else PAYER
 if unsigned:metas[1]=AccountMeta(PAYER.pubkey(),False,True)
 watch=set(m.pubkey for m in metas)|{volume}
 def snapshot():
  rows={}
  for k in sorted(watch,key=str):
   a=h.vm.get_account(k)
   if not a or not a.executable:rows[str(k)]=None if not a else {'data_hex':bytes(a.data).hex(),'lamports':a.lamports,'owner':str(a.owner)}
  return rows
 before=snapshot();tx=Transaction.new_signed_with_payer([Instruction(PROGRAM,data,metas)],payer.pubkey(),[payer],h.vm.latest_blockhash());r=h.vm.send_transaction(tx);failed=isinstance(r,FailedTransactionMetadata);meta=r.meta() if failed else r
 return {'error':str(r.err()) if failed else None,'logs':meta.logs(),'events':[x for x in meta.logs() if x.startswith('Program data: ')],'inner':json.loads(meta.to_json())['inner_instructions'],'return_data':json.loads(meta.to_json()).get('return_data'),'before':before,'after':snapshot(),'transaction_base64':base64.b64encode(bytes(tx)).decode()}
if __name__=='__main__':
 rows=[]
 def test(label,**kw):
  r=legacy_buy(**kw);rows.append({'case':label,'result':r});print(label,r['error'],len(r['inner'][0]),[l for l in r['logs'] if 'Error' in l or 'panicked' in l])
 for n in ['buy','buy_exact_quote_in']:
  for amount in [0,1,1000,10**7,10**10]:
   for track in [b'',b'\0',b'\1',b'\2']:
    test(str((n,amount,track.hex())),name=n,amount=amount,limit=10**12 if n=='buy' else 0,track=track)
 pathlib.Path('work/pump-amm-legacy-buy/observations-01.json').write_text(json.dumps(rows,indent=2))
