#!/usr/bin/env python3
"""Observe whitelist fee treatment without changing remaining-account requirements."""
import argparse,base64,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
import pump_amm_multi_hop_differential as multi
from probe_zero_creator_fee import override as zero_creator
from probe_creator_fee_gate import clean

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for kind in ['buy','buy_exact_quote_in','sell','multi_buy','multi_sell']:
  for whitelisted in [False,True]:
   key=h.PAYER.pubkey()if whitelisted else h.OUTSIDER.pubkey();parts=[h.custom_fee_table([(0,(10,20,30))]),h.mutate(h.CONFIG_KEY,353,bytes(key))]
   if kind.startswith('multi_'):run=multi.run;kw={'sell':kind=='multi_sell','amount':10**7,'limit':1}
   else:
    parts.insert(0,zero_creator(kind,0))
    if kind=='sell':run=h.legacy;kw={'amount':10**10,'limit':0}
    else:run=h.legacy_buy;kw={'name':kind,'amount':10**10 if kind=='buy'else 10**7,'limit':10**12 if kind=='buy'else 1}
   kw['overrides']=h.combine(*parts);x,y=run(**kw),run(candidate=a.candidate,**kw)
   for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
   assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'kind':kind,'whitelisted':whitelisted,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':[{'kind':x['kind'],'whitelisted':x['whitelisted'],'differences':x['differences'],'original_error':x['original']['error'],'candidate_error':x['candidate']['error']}for x in rows if x['differences']]},indent=2))
if __name__=='__main__':main()
