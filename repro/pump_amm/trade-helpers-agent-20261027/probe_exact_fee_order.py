#!/usr/bin/env python3
"""Observe exact-quote fee precomputation before the inverse-price calculation."""
import argparse,base64,hashlib,json,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for kind in ['lp','creator']:
  for bps in [10000,10001,20000]:
   for amount in [10**15,2**64-1]:
    if kind=='lp':ov=h.combine(h.custom_fee_table([(0,(bps,0,0))]),h.mutate(h.pool,261,bytes(8)))
    else:ov=h.combine(h.mutate(h.CONFIG_KEY,940,b'\1'),h.mutate(h.pool,261,struct.pack('<Q',bps)))
    kw={'name':'buy_exact_quote_in','amount':amount,'limit':1,'overrides':ov};x,y=h.legacy_buy(**kw),h.legacy_buy(candidate=a.candidate,**kw)
    for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
    assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'kind':kind,'bps':bps,'amount':amount,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':[{**{k:r[k]for k in ['kind','bps','amount','differences']},'original_error':r['original']['error'],'candidate_error':r['candidate']['error']}for r in rows if r['differences']]},indent=2))
if __name__=='__main__':main()
