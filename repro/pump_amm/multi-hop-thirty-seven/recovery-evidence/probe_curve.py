"""Synthetic local curve routes executed through the original AMM's actual CPI signer."""
from probe import *
x=json.load(open(ROOT/'research/imported-lab/analysis/pump_fun/curve-fresh-trades-v3-signed-surfpool.json'));s=x['steps'][4];keys={k:Pubkey.from_string(v)for k,v in x['accounts'].items()}
CURVE=keys['curve'];CB=keys['curve_base'];CM=keys['mint'];CQ=Pubkey.find_program_address([bytes(CURVE),bytes(TOKEN),bytes(quote)],ATA)[0];CU=Pubkey.from_bytes(bytes([83])*32)
def curve_route(sell=False):
 def ov(h,m):
  for name in ['global','fee_config','mint','curve','curve_base']:
   row=s['before'][name];h.vm.set_account(keys[name],Account(row['lamports'],base64.b64decode(row['data_base64']),Pubkey.from_string(row['owner'])))
  ca=h.vm.get_account(CURVE);print('CURVE',bytes(ca.data).hex())
  h.vm.set_account(CQ,Account(10**15+2039280,token(quote,CURVE,10**15,True),TOKEN))
  u=bytearray(base64.b64decode(s['before']['user_base']['data_base64']));u[32:64]=bytes(PAYER.pubkey());u[64:72]=struct.pack('<Q',10**15);h.vm.set_account(CU,Account(10**9,bytes(u),TOKEN22))
  m[1 if sell else 2]=AccountMeta(CU,False,True)
  m[16:]=[AccountMeta(CM,False,False),AccountMeta(quote,False,False),AccountMeta(CURVE,False,True),AccountMeta(CB,False,True),AccountMeta(CQ,False,True)]
 return ov
if __name__=='__main__':
 rows=[]
 for sell in [False,True]:
  for amount in [1,10**6,10**9,10**12]:
   r=run(amount=amount,sell=sell,overrides=curve_route(sell));rows.append({'case':str((sell,amount)),'result':r});print(rows[-1]['case'],r['error'],r['logs'])
 (pathlib.Path(__file__).parent/'observations-03.json').write_text(json.dumps(rows))
