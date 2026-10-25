from probe_curve import *
CM2=Pubkey.from_bytes(bytes([84])*32);CV2=Pubkey.find_program_address([b'bonding-curve',bytes(CM2)],PUMP)[0];CB2=Pubkey.find_program_address([bytes(CV2),bytes(TOKEN22),bytes(CM2)],ATA)[0];CQ2=Pubkey.find_program_address([bytes(CV2),bytes(TOKEN22),bytes(CM)],ATA)[0];CU2=Pubkey.from_bytes(bytes([85])*32)
def two_curves(sell=False):
 def ov(h,m):
  curve_route(sell)(h,m);first=m[16:]
  h.vm.set_account(CM2,h.vm.get_account(CM));d=bytearray(h.vm.get_account(CURVE).data);d[83:115]=bytes(CM);d[8:48]=struct.pack('<QQQQQ',10**15,10**15,10**15,10**15,10**15);h.vm.set_account(CV2,Account(10**12,bytes(d),PUMP))
  for key,mi,owner,amount in [(CB2,CM2,CV2,10**15),(CQ2,CM,CV2,10**15),(CU2,CM2,PAYER.pubkey(),10**15)]:
   d=bytearray(h.vm.get_account(CB).data);d[:32]=bytes(mi);d[32:64]=bytes(owner);d[64:72]=struct.pack('<Q',amount);h.vm.set_account(key,Account(10**9,bytes(d),TOKEN22))
  second=[AccountMeta(CM2,False,False),AccountMeta(CM,False,False),AccountMeta(CV2,False,True),AccountMeta(CB2,False,True),AccountMeta(CQ2,False,True)]
  m[1 if sell else 2]=AccountMeta(CU2,False,True);m[16:]=second+first if sell else first+second
 return ov
if __name__=='__main__':
 rows=[]
 for sell in [False,True]:
  for amount in [10**6,10**9]:
   r=run(amount=amount,sell=sell,overrides=two_curves(sell));rows.append({'case':f'{sell}-{amount}','result':r});print(rows[-1]['case'],r['error'],r['logs'])
 (pathlib.Path(__file__).parent/'observations-06.json').write_text(json.dumps(rows))
