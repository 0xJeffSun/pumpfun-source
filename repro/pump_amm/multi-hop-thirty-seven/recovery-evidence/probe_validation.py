from probe import *
def account_change(index,which,value):
 def ov(h,m):
  k=m[index].pubkey;a=h.vm.get_account(k)
  if which=='owner':a=Account(a.lamports,bytes(a.data),value)
  elif which=='data':a=Account(max(a.lamports,10**9),value,a.owner)
  elif which=='readonly':m[index]=AccountMeta(k,m[index].is_signer,False);return
  h.vm.set_account(k,a)
 return ov
def mutate_at(index,offset,data):
 def ov(h,m):
  k=m[index].pubkey;a=h.vm.get_account(k);d=bytearray(a.data);d[offset:offset+len(data)]=data;h.vm.set_account(k,Account(max(a.lamports,10**9),bytes(d),a.owner))
 return ov
if __name__=='__main__':
 rows=[]
 cases=[]
 for i in list(range(1,7))+list(range(12,21)):
  for typ,val in [('owner',Pubkey.default()),('data',b''),('readonly',None)]:cases.append((f'{i}-{typ}',account_change(i,typ,val)))
 for i in [1,2,19,20]:
  for off,d in [(0,bytes(32)),(32,bytes(32)),(108,bytes([0])),(108,bytes([2]))]:cases.append((f'{i}-data{off}-{d[0]}',mutate_at(i,off,d)))
 for off,d in [(8,bytes([0])),(11,bytes(32)),(43,bytes(32)),(75,bytes(32)),(139,bytes(32)),(171,bytes(32)),(243,b'\x01'),(244,b'\x01')]:cases.append((f'pool-{off}',mutate_at(18,off,d)))
 for n,ov in cases:
  try:r=run(overrides=ov)
  except BaseException as e:print(n,type(e).__name__,str(e));continue
  rows.append({'case':n,'result':r});print(n,r['error'],[s for s in r['logs']if 'AnchorError' in s])
 (pathlib.Path(__file__).parent/'observations-04.json').write_text(json.dumps(rows))
