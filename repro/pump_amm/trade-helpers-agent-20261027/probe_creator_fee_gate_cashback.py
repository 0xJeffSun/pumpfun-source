#!/usr/bin/env python3
"""Observe the creator-fee override gate with cashback payout accounts enabled."""
import argparse,base64,hashlib,json,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy','buy_exact_quote_in','sell']:
  for enabled in [False,True]:
   for bps in [0,1,100,10000]:
    cash=h.cash(True)if name=='sell'else h.cashback_buy(True)
    ov=h.combine(cash,h.mutate(h.CONFIG_KEY,940,bytes([enabled])),h.mutate(h.pool,261,struct.pack('<Q',bps)))
    kw={'overrides':ov}
    if name=='sell':run=h.legacy
    else:run=h.legacy_buy;kw.update(name=name,amount=10**10 if name=='buy'else 10**7,limit=10**12 if name=='buy'else 1)
    x,y=run(**kw),run(candidate=a.candidate,**kw)
    for v in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(v['transaction_base64'])).verify_with_results())
    assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'instruction':name,'enabled':enabled,'pool_bps':bps,'cashback':True,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(r['differences'])for r in rows)}))
if __name__=='__main__':main()
