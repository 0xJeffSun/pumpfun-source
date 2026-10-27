#!/usr/bin/env python3
"""Signed entrypoint observations for FeeConfig account decoder recovery."""
import argparse,base64,hashlib,json,re,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_legacy_buy_differential as buy
import pump_amm_trade_v2_differential as v2

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def clean(v):
 if isinstance(v,dict):return{k:clean(x)for k,x in v.items()}
 if isinstance(v,list):return[re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',x))if isinstance(x,str)else clean(x)for x in v if not isinstance(x,str)or not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]
 return v

def variants():
 captured=base64.b64decode(buy.f['accounts']['fee_config']['data_base64'])
 for n in list(range(105))+[1068,1069,2511,2512,4072,4073,4096,4097]:yield 'captured-length-'+str(n),captured[:n].ljust(n,b'\0')
 for index in [0,7]:
  raw=bytearray(captured);raw[index]^=255;yield 'bad-discriminator-'+str(index),bytes(raw)
 for tiers,stable in [(0,0),(1,0),(0,1),(1,1)]:
  raw=captured[:41]+struct.pack('<QQQI',25,5,0,tiers)
  for _ in range(tiers):raw+=bytes(16)+struct.pack('<QQQ',10,20,30)
  raw+=struct.pack('<I',stable)
  for _ in range(stable):raw+=bytes(16)+struct.pack('<QQQ',40,50,60)
  raw+=struct.pack('<QQQ',70,80,90)
  for n in [len(raw),1069,2512,4073,4097]:yield f'compact-{tiers}-{stable}-length-{n}',raw.ljust(n,b'\0')

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy','buy_exact_quote_in','sell','buy_v2','sell_v2','buy_exact_quote_in_v2']:
  for label,data in variants():
   for quote_case in ['native','stable','exotic']:
    if quote_case!='native' and not label.startswith('compact-'):continue
    quote_key=buy.quote if quote_case=='native' else buy.Pubkey.from_string('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') if quote_case=='stable' else buy.Pubkey.from_bytes(bytes([90])*32)
    def override(h,m):
     if quote_case!='native':
      if name in ['buy','buy_exact_quote_in','sell']:
       (buy.adapt_sell_helper(buy.legacy_rekey(quote_key))if name!='sell'else buy.legacy_rekey(quote_key))(h,m)
      else:v2.rekey_pool(quote_key)(h,m)
     old=h.vm.get_account(buy.feeconfig);h.vm.set_account(buy.feeconfig,buy.Account(old.lamports,data,old.owner))
    def run(candidate):
     if name=='sell':return buy.legacy(candidate=candidate,amount=10**7,limit=0,overrides=override)
     if name in ['buy','buy_exact_quote_in']:return buy.legacy_buy(candidate=candidate,name=name,amount=10**7,limit=10**12 if name=='buy' else 1,overrides=override)
     return v2.trade(name,candidate=candidate,amount=10**7,limit=10**12 if name=='buy_v2' else 1,overrides=override)
    x,y=run(ROOT/'evidence/original/pump_amm/deployed.so'),run(a.candidate);cx,cy=clean(x),clean(y);differences=[k for k in cx if cx[k]!=cy[k]]
    rows.append({'instruction':name,'case':label,'quote_case':quote_case,'fee_data_hex':data.hex(),'original':x,'candidate':y,'differences':differences})
 result={'scope':__doc__,'original_sha256':sha(ROOT/'evidence/original/pump_amm/deployed.so'),'candidate_sha256':sha(a.candidate),'probe_sha256':sha(__file__),'harness_sha256':{n:sha(ROOT/n)for n in ['scripts/pump_amm_legacy_buy_differential.py','scripts/pump_amm_legacy_sell_differential.py','scripts/pump_amm_trade_v2_differential.py','scripts/pump_amm_reusable_harness.py']},'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(r['differences'])for r in rows),'non_log_mismatches':sum(any(k!='logs'for k in r['differences'])for r in rows)}))
if __name__=='__main__':main()
