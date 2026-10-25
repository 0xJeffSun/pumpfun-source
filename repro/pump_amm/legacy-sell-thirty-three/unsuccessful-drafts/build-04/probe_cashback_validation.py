from differential import *
owner=Pubkey.from_bytes(base64.b64decode(f['accounts']['buyback_fee_recipient']['data_base64'])[32:64]);p2=Pubkey.find_program_address([b'pool-v2',bytes(base)],PROGRAM)[0];uvata=Pubkey.find_program_address([bytes(volume),bytes(TOKEN),bytes(quote)],ATA)[0]
def cash(present=True,change=None):
 def ov(h,m):
  mutate(pool,244,b'\1')(h,m);del m[21:]
  for key in [p2,owner]:h.vm.set_account(key,Account(10**9,b'',Pubkey.default()))
  if present:
   disc=bytes(next(x for x in IDL['accounts'] if x['name']=='UserVolumeAccumulator')['discriminator']);h.vm.set_account(volume,Account(10**9,(disc+bytes(PAYER.pubkey())+bytes(97)),PROGRAM));h.vm.set_account(uvata,Account(2039280,token(quote,volume,0,True),TOKEN))
  m.extend([AccountMeta(uvata,False,True),AccountMeta(volume,False,True),AccountMeta(p2,False,False),AccountMeta(owner,False,False),AccountMeta(buyback,False,True)])
  if change:change(h,m)
 return ov
if __name__=='__main__':
 rows=[]
 def test(label,**kw):
  r=legacy(**kw);rows.append({'case':label,'result':r});print(label,r['error'],[l for l in r['logs'] if 'Error' in l or 'panicked' in l],len(r['inner'][0]))
 for key in [volume,uvata]:
  for newowner in [Pubkey.default(),TOKEN,PROGRAM]:test('owner='+str((key,newowner)),overrides=cash(change=mutate(key,0,b'',owner=newowner)))
 for length in [0,7,8,40,73,74,81,82,89,90,136,137]:test('Ulength='+str(length),overrides=cash(change=mutate(volume,0,b'',length)))
 for off,val in [(0,bytes(8)),(8,bytes(32)),(8,bytes(OUTSIDER.pubkey())),(40,b'\2'),(74,struct.pack('<Q',2**64-1))]:test('Ufield='+str((off,val.hex())),overrides=cash(change=mutate(volume,off,val)))
 for idx in [21,22,23]:
  for mode in ['readonly','substitute']:test('meta='+str((idx,mode)),overrides=cash(change=meta_mutation(idx,mode)))
 for off,val in [(0,bytes(32)),(32,bytes(OUTSIDER.pubkey())),(108,b'\0'),(108,b'\2')]:test('ATAfield='+str((off,val.hex())),overrides=cash(change=mutate(uvata,off,val)))
 for count in range(6):
  def trim(h,m,count=count):del m[21+count:]
  test('tail='+str(count),overrides=cash(change=trim))
 for lamports in [1,1844399,1844400,10**9]:
  def prefund(h,m,lamports=lamports):h.vm.set_account(volume,Account(lamports,b'',Pubkey.default()))
  test('prefunded='+str(lamports),overrides=cash(False,prefund))
 pathlib.Path('work/pump-amm-legacy-sell/observations-06.json').write_text(json.dumps(rows,indent=2))
