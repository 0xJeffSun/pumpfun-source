"""Pure case generator copied from the pinned Extend fixture; no VM import."""
import hashlib, random
TYPES={'GlobalParams':318,'FeeRecipient':74,'MayhemState':170}
def cases():
 rng=random.Random(13579);rows=[]
 for name,target in TYPES.items():
  disc=hashlib.sha256(('account:'+name).encode()).digest()[:8]
  for size in sorted(set(range(0,12))|{target-1,target,target+1,1024}):
   data=(disc+rng.randbytes(1024))[:size]
   for lamports in [1,10**7]:rows.append({'name':f'{name}-size-{size}-balance-{lamports}','data':data.hex(),'lamports':lamports,'timestamp':rng.randrange(-10000000,10000000)})
  data=disc+rng.randbytes(8)
  for kind in ['readonly_account','readonly_user','unsigned_user','wrong_owner','wrong_system','wrong_event','wrong_program','other_address','trailing','extra_account']+[f'accounts_{n}' for n in range(5)]:
   for lamports in [1,10**7]:rows.append({'name':f'{name}-{kind}-{lamports}','data':data.hex(),'lamports':lamports,'kind':kind})
  for timestamp in [-(2**63),-1,0,1,2**63-1]:rows.append({'name':f'{name}-clock-{timestamp}','data':data.hex(),'timestamp':timestamp})
 for i in range(100):rows.append({'name':f'unknown-discriminator-{i}','data':rng.randbytes(32).hex()})
 return rows
