"""Offline original boost handler probes; synthetic state, normal test-owned signer."""
import sys,pathlib,base64,os
ROOT=pathlib.Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'));os.chdir(ROOT)
from pump_amm_legacy_sell_differential import *
BOOST=Pubkey.find_program_address([b'boost_vault',bytes(pool)],PROGRAM)[0]
BOOST_ATA=Pubkey.find_program_address([bytes(BOOST),bytes(TOKEN),bytes(quote)],ATA)[0]
def run(amount=10**9,limit=0,overrides=None,candidate=None,unsigned=False,payload_length=None,separate_payer=False):
 h=acquire_harness(candidate or ROOT/'evidence/original/pump_amm/deployed.so');h.vm.set_clock(Clock(100,1234567890,0,0,1234567890))
 for pid,name in [(TOKEN,'spl_token'),(TOKEN22,'spl_token_2022'),(ATA,'associated_token')]:h.vm.add_program_from_file(pid,ROOT/'evidence/dependencies'/name/'deployed.so')
 for row in f['accounts'].values():h.vm.set_account(Pubkey.from_string(row['address']),Account(row['lamports'],base64.b64decode(row['data_base64']),Pubkey.from_string(row['owner'])))
 raw=bytearray(RAW);raw[907:939]=bytes(PAYER.pubkey());raw[939]=1;h.vm.set_account(CONFIG_KEY,Account(CONFIG['lamports'],bytes(raw),PROGRAM))
 mutate(pool,245,(10**9).to_bytes(16,'little',signed=True))(h,[])
 h.vm.set_account(BOOST,Account(10**9,b'',Pubkey.default()));h.vm.set_account(BOOST_ATA,Account(10**12+2039280,token(quote,BOOST,10**12,True),TOKEN))
 keys=[pool,PAYER.pubkey(),CONFIG_KEY,base,quote,vaultbase,vaultquote,BOOST,BOOST_ATA,TOKEN,TOKEN,EVENT,PROGRAM]
 ix=next(i for i in IDL['instructions'] if i['name']=='boost_buy_and_burn');m=[AccountMeta(k,bool(a.get('signer')),bool(a.get('writable')))for k,a in zip(keys,ix['accounts'])]
 if overrides:overrides(h,m)
 data=bytes(ix['discriminator'])+struct.pack('<QQ',amount,limit)
 if payload_length is not None:data=data[:payload_length]
 payer=OUTSIDER if unsigned or separate_payer else PAYER
 if unsigned:m[1]=AccountMeta(PAYER.pubkey(),False,True)
 def snap():
  out={}
  for key in sorted(set(k.pubkey for k in m),key=str):
   a=h.vm.get_account(key)
   if not a or not a.executable:out[str(key)]=None if not a else {'data_hex':bytes(a.data).hex(),'lamports':a.lamports,'owner':str(a.owner)}
  return out
 before=snap();tx=Transaction.new_signed_with_payer([Instruction(PROGRAM,data,m)],payer.pubkey(),[payer,PAYER] if separate_payer and not unsigned else [payer],h.vm.latest_blockhash());assert all(tx.verify_with_results());r=h.vm.send_transaction(tx);failed=isinstance(r,FailedTransactionMetadata);meta=r.meta() if failed else r
 return {'error':str(r.err())if failed else None,'logs':meta.logs(),'events':[x for x in meta.logs()if x.startswith('Program data: ')],'inner':json.loads(meta.to_json())['inner_instructions'],'return_data':json.loads(meta.to_json()).get('return_data'),'before':before,'after':snap(),'transaction_base64':base64.b64encode(bytes(tx)).decode()}
def summarize(r):
 out={'error':r['error'],'logs':r['logs'],'inner':r['inner']}
 if not r['error']:
  out['amounts']={str(k):[int.from_bytes(bytes.fromhex(r[t][str(k)]['data_hex'])[64:72],'little') if r[t][str(k)] else None for t in ['before','after']] for k in [vaultbase,vaultquote,BOOST_ATA]}
 return out
if __name__=='__main__':
 rows=[]
 for amount in [0,1,1000,10**6,10**9,10**12,10**12+1,2**64-1]:
  r=run(amount);rows.append({'amount':amount,'result':r});print(amount,json.dumps(summarize(r)))
 (pathlib.Path(__file__).parent/'observations-01.json').write_text(json.dumps(rows))

def boost_transferfee(key,bps=100,maximum=2**64-1,withheld=0,writable=False):
 def ov(h,m):
  mint=h.vm.get_account(key);d=bytearray(mint.data[:82]);d+=bytes(83)+bytes([1]);conf=bytes(72)+struct.pack('<QQH',0,maximum,bps)*2;d+=struct.pack('<HH',1,len(conf))+conf;h.vm.set_account(key,Account(10**9,bytes(d),TOKEN22));m[9 if key==base else 10]=AccountMeta(TOKEN22,False,False)
  for k in ([vaultbase]if key==base else [vaultquote]):
   a=h.vm.get_account(k);d=a.data[:165]+bytes([2])+struct.pack('<HHQ',2,8,0);h.vm.set_account(k,Account(a.lamports,bytes(d),TOKEN22))
  if key==quote:
   a=h.vm.get_account(BOOST_ATA);new=Pubkey.find_program_address([bytes(BOOST),bytes(TOKEN22),bytes(quote)],ATA)[0];d=a.data[:165]+bytes([2])+struct.pack('<HHQ',2,8,withheld);h.vm.set_account(new,Account(10**12+10**9,bytes(d),TOKEN22));m[8]=AccountMeta(new,False,True);m[4]=AccountMeta(quote,False,writable)
 return ov
