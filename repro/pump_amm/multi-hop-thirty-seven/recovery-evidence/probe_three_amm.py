from probe_routes import *
BASE3=Pubkey.from_bytes(bytes([86])*32);C3=Pubkey.find_program_address([b'pool-authority',bytes(BASE3)],PUMP)[0];P3,B3=Pubkey.find_program_address([b'pool',bytes(2),bytes(C3),bytes(BASE3),bytes(BASE2)],PROGRAM);VB3=Pubkey.find_program_address([bytes(P3),bytes(TOKEN),bytes(BASE3)],ATA)[0];VQ3=Pubkey.find_program_address([bytes(P3),bytes(TOKEN),bytes(BASE2)],ATA)[0];U3=Pubkey.from_bytes(bytes([87])*32)
def three_amm(sell=False):
 def ov(h,m):
  route2(sell)(h,m);h.vm.set_account(BASE3,h.vm.get_account(base));d=bytearray(poolraw);d[8]=B3;d[9:11]=bytes(2);d[11:43]=bytes(C3);d[43:75]=bytes(BASE3);d[75:107]=bytes(BASE2);d[139:171]=bytes(VB3);d[171:203]=bytes(VQ3);h.vm.set_account(P3,Account(10**9,bytes(d),PROGRAM))
  for k,mi,owner in [(VB3,BASE3,P3),(VQ3,BASE2,P3),(U3,BASE3,PAYER.pubkey())]:h.vm.set_account(k,Account(10**9,token(mi,owner,10**15),TOKEN))
  group=[AccountMeta(BASE3,False,False),AccountMeta(BASE2,False,False),AccountMeta(P3,False,True),AccountMeta(VB3,False,True),AccountMeta(VQ3,False,True)];m[1 if sell else 2]=AccountMeta(U3,False,True)
  if sell:m[16:16]=group
  else:m.extend(group)
 return ov
if __name__=='__main__':
 rows=[]
 for sell in [False,True]:
  for amount in [10**6,10**9]:
   r=run(amount=amount,sell=sell,overrides=three_amm(sell));rows.append({'case':f'{sell}-{amount}','result':r});print(rows[-1]['case'],r['error'],r['logs'])
 (pathlib.Path(__file__).parent/'observations-07.json').write_text(json.dumps(rows))
