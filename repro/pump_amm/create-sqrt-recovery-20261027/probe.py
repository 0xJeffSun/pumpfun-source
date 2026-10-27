#!/usr/bin/env python3
"""Local signed create_pool probes around floor-sqrt and wide-product boundaries."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,math,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_create_differential as h
s=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');direct=importlib.util.module_from_spec(s);s.loader.exec_module(direct)
def pairs():
 result=[(0,0),(0,10000),(10000,0),(1,1),(99,99),(100,100),(101,101),(2,4999),(2,5000),(2,5001)]
 for n in [100,101,65536,1000000,2**32-1]:
  for delta in [-1,0,1]:result.append((1,n*n+delta))
 for n in [2**32-1,2**32,2**48,2**63,(2**64)-10_000_000]:
  result.extend([(n,n),(n,100),(100,n)])
 return list(dict.fromkeys(result))
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for base,quote in pairs():
  def funding(vm,metas):
   for key,mint,amount,native in [(h.userbase,h.base,base,False),(h.userquote,h.quote,quote,True)]:
    vm.vm.set_account(key,h.Account(amount+2039280 if native else 10**9,h.token(mint,h.PAYER.pubkey(),amount,native),h.TOKEN))
  kw=dict(base_amount=base,quote_amount=quote,overrides=funding)
  x=h.create(**kw);y=h.create(candidate=a.candidate,**kw);nx,ny=direct.clean(x),direct.clean(y);diff=[k for k in nx if nx[k]!=ny[k]]
  expected=math.isqrt(base*quote);observed=None
  if x['error'] is None:
   pool=next(iter(x['states'].values()));observed=struct.unpack_from('<Q',bytes.fromhex(pool['data']),203)[0]
   assert observed==expected,(base,quote,observed,expected)
  rows.append({'base':base,'quote':quote,'product':str(base*quote),'expected_floor_sqrt':expected,'observed_lp_supply':observed,'original':x,'candidate':y,'differences':diff})
 r={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows,'case_count':len(rows),'mismatches':sum(bool(r['differences'])for r in rows),'scope':'Synthetic funded token balances, including values above fixture mint supply; same signed local messages and captured dependencies. Successful original pool LP supply also checked against Python isqrt. Not a chain observation.'}
 a.output.write_text(json.dumps(r,separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'successes':sum(r['observed_lp_supply']is not None for r in rows),'mismatches':r['mismatches']}));assert not r['mismatches']
if __name__=='__main__':main()
