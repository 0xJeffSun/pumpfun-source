"""Offline AMM legacy sell with synthetic test-owned signer/state and captured CPIs."""
import sys,base64
sys.path.insert(0,'scripts')
from pump_amm_trade_v2_differential import *
ATA=Pubkey.from_string('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')
PROTOCOL=Pubkey.from_bytes(bytes(RAW[57:89]));PROTOCOL_ATA=Pubkey.find_program_address([bytes(PROTOCOL),bytes(TOKEN),bytes(quote)],ATA)[0]
CREATOR=Pubkey.from_bytes(bytes(poolraw[211:243]));CREATOR_VAULT=Pubkey.find_program_address([b'creator_vault',bytes(CREATOR)],PROGRAM)[0];CREATOR_ATA=Pubkey.find_program_address([bytes(CREATOR_VAULT),bytes(TOKEN),bytes(quote)],ATA)[0]
def legacy(amount=10**10,limit=0,overrides=None,candidate=None,unsigned=False,payload_length=None,remaining=True):
 h=acquire_harness(candidate or ROOT/'evidence/original/pump_amm/deployed.so');h.vm.set_clock(Clock(100,1234567890,0,0,1234567890))
 for pid,filepath in [(TOKEN,'evidence/dependencies/spl_token/deployed.so'),(TOKEN22,'evidence/dependencies/spl_token_2022/deployed.so'),(FEES,'evidence/original/pump_fees/deployed.so'),(ATA,'evidence/dependencies/associated_token/deployed.so')]:h.vm.add_program_from_file(pid,ROOT/filepath)
 for n,row in f['accounts'].items():h.vm.set_account(Pubkey.from_string(row['address']),Account(row['lamports'],base64.b64decode(row['data_base64']),Pubkey.from_string(row['owner'])))
 glob=bytearray(RAW);glob[56]=0;h.vm.set_account(CONFIG_KEY,Account(CONFIG['lamports'],bytes(glob),PROGRAM))
 for k,m,owner,native in [(userbase,base,PAYER.pubkey(),False),(userquote,quote,PAYER.pubkey(),True),(PROTOCOL_ATA,quote,PROTOCOL,True),(CREATOR_ATA,quote,CREATOR_VAULT,True)]:h.vm.set_account(k,Account(10**15+2039280 if native else 10**9,token(m,owner,10**15 if k in [userbase,userquote] else 0,native),TOKEN))
 for k in [PROTOCOL,CREATOR_VAULT]:h.vm.set_account(k,Account(10**9,b'',Pubkey.default()))
 h.vm.set_account(volume,Account(0,b'',Pubkey.default()))
 keys=[pool,PAYER.pubkey(),CONFIG_KEY,base,quote,userbase,userquote,vaultbase,vaultquote,PROTOCOL,PROTOCOL_ATA,TOKEN,TOKEN,Pubkey.default(),ATA,EVENT,PROGRAM,CREATOR_ATA,CREATOR_VAULT,feeconfig,FEES]
 ix=next(x for x in IDL['instructions'] if x['name']=='sell');metas=[AccountMeta(k,bool(row.get('signer')),bool(row.get('writable'))) for k,row in zip(keys,ix['accounts'])]
 if remaining:
  owner=Pubkey.from_bytes(base64.b64decode(f['accounts']['buyback_fee_recipient']['data_base64'])[32:64]);poolv2=Pubkey.find_program_address([b'pool-v2',bytes(base)],PROGRAM)[0]
  for key in [poolv2,owner]:h.vm.set_account(key,Account(10**9,b'',Pubkey.default()))
  metas+=[AccountMeta(poolv2,False,False),AccountMeta(owner,False,False),AccountMeta(buyback,False,True)]
 if overrides:overrides(h,metas)
 data=bytes(ix['discriminator'])+struct.pack('<QQ',amount,limit)
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
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=pathlib.Path,required=True);p.add_argument('--output',type=pathlib.Path,required=True);a=p.parse_args();rows=[]
 def test(label,**kw):
  x,y=legacy(**kw),legacy(candidate=a.candidate,**kw);diff=[k for k in x if k!='logs' and x[k]!=y[k]];rows.append({'case':label,'original':x,'candidate':y,'diff':diff})
 def tail(count,skip=False):
  def ov(h,m):
   if skip:del m[21]
   del m[21+count:]
  return ov
 for amount in [0,1,1000,10**6,10**10,2**64-1]:
  for count in [0,1,2,3]:
   for skip in [False,True]:test('amount-tail='+str((amount,count,skip)),amount=amount,overrides=tail(count,skip))
 for limit in [0,1,1802114,1802115,1802116,2**64-1]:test('limit='+str(limit),limit=limit)
 test('unsigned',unsigned=True)
 for length in range(24):test('payload='+str(length),payload_length=length)
 for idx in range(24):
  if idx!=1:test('substitute='+str(idx),overrides=meta_mutation(idx,'substitute'))
 for idx in [0,5,6,7,8,10,17,23]:test('readonly='+str(idx),overrides=meta_mutation(idx,'readonly'))
 for key in [pool,CONFIG_KEY,base,quote,userbase,userquote,vaultbase,vaultquote,feeconfig,PROTOCOL_ATA,CREATOR_ATA,buyback]:
  for owner in [Pubkey.default(),TOKEN22]:test('owner='+str((key,owner)),overrides=mutate(key,0,b'',owner=owner))
 for off,v in [(243,b'\1'),(244,b'\1'),(270,b'\1'),(261,struct.pack('<Q',100)),(245,(10**9).to_bytes(16,'little',signed=True))]:test('pool-field='+str((off,v.hex())),overrides=mutate(pool,off,v))
 for key,offset in [(vaultbase,64),(vaultquote,64),(userbase,64),(userquote,64),(base,36)]:
  for value in [0,1,2**64-1]:test('amount-field='+str((key,offset,value)),overrides=mutate(key,offset,struct.pack('<Q',value)))
 for v in [-2**127,-10**13,-125882,0,1,10**9,2**64,2**127-1]:test('virtual='+str(v),overrides=mutate(pool,245,v.to_bytes(16,'little',signed=True)))
 for flags in [0,1,2,4,8,16,31,255]:test('disable='+str(flags),overrides=mutate(CONFIG_KEY,56,bytes([flags])))
 for length in [0,7,8,210,211,243,244,245,261,270,271,286,287,300]:test('pool-layout='+str(length),overrides=mutate(pool,0,b'',length))
 for length in [0,7,8,65,69,1068,1069,2511,2512,3000,4072,4073,4096,4097]:test('fee-layout='+str(length),overrides=mutate(feeconfig,0,b'',length))
 for off in [261,271,279]:
  for v in [0,1,10**9,2**64-1]:test('pool-fees='+str((off,v)),overrides=mutate(pool,off,struct.pack('<Q',v)))
 for v in [0,1,9999,10000,10001,2**64-1]:test('buyback-bps='+str(v),overrides=mutate(CONFIG_KEY,899,struct.pack('<Q',v)))
 for key in [userbase,userquote,vaultbase,vaultquote,PROTOCOL_ATA,CREATOR_ATA,buyback]:
  for off,v in [(0,bytes(32)),(32,bytes(OUTSIDER.pubkey())),(108,b'\0'),(108,b'\2')]:test('token-field='+str((key,off,v.hex())),overrides=mutate(key,off,v))
  def missing(h,m,key=key):h.vm.set_account(key,Account(0,b'',Pubkey.default()))
  test('missing-token='+str(key),overrides=missing)
 failures=[i for i,r in enumerate(rows) if r['diff']];sha=lambda p:hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest();report={'scope':'AMM legacy sell scratch differential; ordinary verified signatures, synthetic signer/state fixtures and actual captured token/ATA/Fees CPI. Not whole-program equality.','candidate_sha256':sha(a.candidate),'original_sha256':sha(ROOT/'evidence/original/pump_amm/deployed.so'),'script_sha256':sha(__file__),'case_count':len(rows),'mismatches':failures,'cases':rows};a.output.parent.mkdir(exist_ok=True,parents=True);a.output.write_text(json.dumps(report,separators=(',',':'))+'\n');print(json.dumps({'case_count':len(rows),'mismatches':failures}));raise SystemExit(bool(failures))
if __name__=='__main__':main()
