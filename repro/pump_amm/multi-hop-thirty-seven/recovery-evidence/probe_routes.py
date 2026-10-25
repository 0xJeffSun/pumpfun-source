from probe import *
BASE2=Pubkey.from_bytes(bytes([81])*32);CREATOR2=Pubkey.find_program_address([b'pool-authority',bytes(BASE2)],PUMP)[0];POOL2,BUMP2=Pubkey.find_program_address([b'pool',bytes(2),bytes(CREATOR2),bytes(BASE2),bytes(base)],PROGRAM);VB2=Pubkey.find_program_address([bytes(POOL2),bytes(TOKEN),bytes(BASE2)],ATA)[0];VQ2=Pubkey.find_program_address([bytes(POOL2),bytes(TOKEN),bytes(base)],ATA)[0];USER2=Pubkey.from_bytes(bytes([82])*32)
def route2(sell=False):
 def ov(h,m):
  h.vm.set_account(BASE2,h.vm.get_account(base));d=bytearray(poolraw);d[8]=BUMP2;d[9:11]=bytes(2);d[11:43]=bytes(CREATOR2);d[43:75]=bytes(BASE2);d[75:107]=bytes(base);d[139:171]=bytes(VB2);d[171:203]=bytes(VQ2);h.vm.set_account(POOL2,Account(10**9,bytes(d),PROGRAM))
  for k,mi,ow,amt in [(VB2,BASE2,POOL2,10**15),(VQ2,base,POOL2,10**15),(USER2,BASE2,PAYER.pubkey(),10**15)]:h.vm.set_account(k,Account(10**9,token(mi,ow,amt),TOKEN))
  second=[AccountMeta(BASE2,False,False),AccountMeta(base,False,False),AccountMeta(POOL2,False,True),AccountMeta(VB2,False,True),AccountMeta(VQ2,False,True)]
  if sell:m[1]=AccountMeta(USER2,False,True);m[16:16]=second
  else:m[2]=AccountMeta(USER2,False,True);m.extend(second)
 return ov
if __name__=='__main__':
 rows=[]
 for sell in [False,True]:
  for amount in [1,10**6,10**9,10**12]:
   r=run(amount=amount,sell=sell,overrides=route2(sell));rows.append({'case':str((sell,amount)),'result':r});print(rows[-1]['case'],r['error'],r['logs'])
 (pathlib.Path(__file__).parent/'observations-02.json').write_text(json.dumps(rows))
