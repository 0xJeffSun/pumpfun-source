from probe_routes import *
from probe_curve import curve_route,CM,CURVE,CB,CQ,CU

def curve_then_amm(sell=False):
 def ov(h,m):
  curve_route(sell)(h,m);saved=m[16:];route2(sell)(h,m)
  creator=CREATOR2;newpool,bump=Pubkey.find_program_address([b'pool',bytes(2),bytes(creator),bytes(BASE2),bytes(CM)],PROGRAM);vb=Pubkey.find_program_address([bytes(newpool),bytes(TOKEN),bytes(BASE2)],ATA)[0];vq=Pubkey.find_program_address([bytes(newpool),bytes(TOKEN22),bytes(CM)],ATA)[0]
  d=bytearray(h.vm.get_account(POOL2).data);d[8]=bump;d[75:107]=bytes(CM);d[139:171]=bytes(vb);d[171:203]=bytes(vq);h.vm.set_account(newpool,Account(10**9,bytes(d),PROGRAM))
  h.vm.set_account(vb,Account(10**9,token(BASE2,newpool,10**15),TOKEN));d=bytearray(h.vm.get_account(CB).data);d[32:64]=bytes(newpool);d[64:72]=struct.pack('<Q',10**15);h.vm.set_account(vq,Account(10**9,bytes(d),TOKEN22))
  second=[AccountMeta(BASE2,False,False),AccountMeta(CM,False,False),AccountMeta(newpool,False,True),AccountMeta(vb,False,True),AccountMeta(vq,False,True)]
  m[16:]=second+saved if sell else saved+second
  m[1 if sell else 2]=AccountMeta(USER2,False,True)
 return ov

def amm_then_curve(sell=False):
 def ov(h,m):
  saved=m[16:];curve_route(sell)(h,m);d=bytearray(h.vm.get_account(CURVE).data);d[83:115]=bytes(base);h.vm.set_account(CURVE,Account(10**12,bytes(d),PUMP));newq=Pubkey.find_program_address([bytes(CURVE),bytes(TOKEN),bytes(base)],ATA)[0];h.vm.set_account(newq,Account(10**9,token(base,CURVE,10**15),TOKEN));second=[AccountMeta(CM,False,False),AccountMeta(base,False,False),AccountMeta(CURVE,False,True),AccountMeta(CB,False,True),AccountMeta(newq,False,True)];m[16:]=second+saved if sell else saved+second
 return ov
if __name__=='__main__':
 rows=[]
 for kind,setup in [('curve-amm',curve_then_amm),('amm-curve',amm_then_curve)]:
  for sell in [False,True]:
   for amount in [10**6,10**9]:
    r=run(amount=amount,sell=sell,overrides=setup(sell));rows.append({'case':f'{kind}-{sell}-{amount}','result':r});print(rows[-1]['case'],r['error'],r['logs'])
 (pathlib.Path(__file__).parent/'observations-05.json').write_text(json.dumps(rows))
