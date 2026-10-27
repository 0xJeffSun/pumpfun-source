#!/usr/bin/env python3
"""Determine whether legacy whitelist exemption precedes initial fee errors."""
import argparse,base64,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_zero_creator_fee import override as zero_creator
from probe_creator_fee_gate import clean

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name,amount,bps in [('buy',10**10,2**64-1),('sell',10**10,2**64-1),('buy_exact_quote_in',2**64-1,20000),('buy_exact_quote_in',1,2**64-1),('buy_exact_quote_in',10**7,20)]:
  ov=h.combine(zero_creator(name,0),h.custom_fee_table([(0,(bps,0,0))]),h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey())))
  kw={'amount':amount,'overrides':ov}
  if name=='sell':run=h.legacy
  else:run=h.legacy_buy;kw.update(name=name,limit=1 if name=='buy_exact_quote_in'else 10**12)
  x,y=run(**kw),run(candidate=a.candidate,**kw)
  for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
  assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'instruction':name,'amount':amount,'lp_bps':bps,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'cases':len(rows),'results':[{'instruction':x['instruction'],'amount':x['amount'],'bps':x['lp_bps'],'original':x['original']['error'],'candidate':x['candidate']['error'],'differences':x['differences']}for x in rows]},indent=2))
if __name__=='__main__':main()
