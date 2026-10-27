#!/usr/bin/env python3
"""Observe exact-quote denominator formation when basis-point sums exceed u64."""
import argparse,base64,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for fees in [(2**64-1,0,0),(2**64-1-10000,0,0),(2**63,2**63,0),(0,0,2**64-1)]:
  for amount in [1,1000,10000,10001]:
   ov=h.combine(h.custom_fee_table([(0,fees)]),h.mutate(h.pool,261,bytes(8)));kw={'name':'buy_exact_quote_in','amount':amount,'limit':1,'overrides':ov};x,y=h.legacy_buy(**kw),h.legacy_buy(candidate=a.candidate,**kw)
   for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
   assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'fees':fees,'amount':amount,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 out={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':[{k:r[k]for k in ['fees','amount','differences']}|{'original':r['original']['error'],'candidate':r['candidate']['error']}for r in rows if r['differences']]},indent=2))
if __name__=='__main__':main()
