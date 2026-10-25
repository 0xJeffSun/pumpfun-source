from differential import *
owner=Pubkey.from_bytes(base64.b64decode(f['accounts']['buyback_fee_recipient']['data_base64'])[32:64]);p2=Pubkey.find_program_address([b'pool-v2',bytes(base)],PROGRAM)[0];uvata=Pubkey.find_program_address([bytes(volume),bytes(TOKEN),bytes(quote)],ATA)[0]
rows=[]
for amount in [1,1000,10**6,10**10]:
 for present in [False,True]:
  def ov(h,m,present=present):
   mutate(pool,244,b'\1')(h,m);del m[21:]
   for key in [p2,owner]:h.vm.set_account(key,Account(10**9,b'',Pubkey.default()))
   if present:
    disc=bytes(next(x for x in IDL['accounts'] if x['name']=='UserVolumeAccumulator')['discriminator']);h.vm.set_account(volume,Account(10**9,(disc+bytes(PAYER.pubkey())+bytes(97)),PROGRAM));h.vm.set_account(uvata,Account(2039280,token(quote,volume,0,True),TOKEN))
   m.extend([AccountMeta(uvata,False,True),AccountMeta(volume,False,True),AccountMeta(p2,False,False),AccountMeta(owner,False,False),AccountMeta(buyback,False,True)])
  r=legacy(amount=amount,overrides=ov);rows.append({'amount':amount,'present':present,'result':r});print(amount,present,r['error']);print(r['logs'][-5:])
  if not r['error']:
   print('acc',r['after'].get(str(volume)));print('uvata',r['after'].get(str(uvata)));print('event',r['events'])
pathlib.Path('work/pump-amm-legacy-sell/observations-05.json').write_text(json.dumps(rows,indent=2))
