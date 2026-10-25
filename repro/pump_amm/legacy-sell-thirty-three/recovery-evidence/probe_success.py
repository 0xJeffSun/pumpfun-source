from differential import *
owner=Pubkey.from_bytes(base64.b64decode(f['accounts']['buyback_fee_recipient']['data_base64'])[32:64]);p2=Pubkey.find_program_address([b'pool-v2',bytes(base)],PROGRAM)[0]
rows=[]
for amount in [1,1000,1000000,10**10]:
 for tail in [[owner,buyback],[p2,owner,buyback]]:
  def ov(h,m,tail=tail):
   del m[21:]
   for k in tail:
    if h.vm.get_account(k) is None:h.vm.set_account(k,Account(10**9,b'',Pubkey.default()))
    m.append(AccountMeta(k,False,True))
  r=legacy(amount=amount,overrides=ov);rows.append({'amount':amount,'tail':list(map(str,tail)),'result':r});print(amount,len(tail),r['error'])
  if not r['error']:
   for k in [pool,userbase,userquote,vaultbase,vaultquote,PROTOCOL_ATA,CREATOR_ATA,buyback]:
    before=bytes.fromhex(r['before'][str(k)]['data_hex']);after=bytes.fromhex(r['after'][str(k)]['data_hex']);print(str(k),'changed bytes' if k==pool else 'token delta',[(i,x,y) for i,(x,y) in enumerate(zip(before,after)) if x!=y] if k==pool else int.from_bytes(after[64:72],'little')-int.from_bytes(before[64:72],'little'))
   print('eventraw',base64.b64decode(r['events'][0].split(': ')[1]).hex())
pathlib.Path('work/pump-amm-legacy-sell/observations-03.json').write_text(json.dumps(rows,indent=2))
