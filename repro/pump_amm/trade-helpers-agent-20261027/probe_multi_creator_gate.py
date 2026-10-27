#!/usr/bin/env python3
"""Check the same creator-fee gate on ordinary AMM multi-hop routes."""
import argparse,base64,hashlib,json,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_multi_hop_differential as h
from probe_creator_fee_gate import clean

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for sell in [False,True]:
  for enabled in [False,True]:
   for bps in [0,1,100,10000]:
    ov=h.combine(h.mutate(h.CONFIG_KEY,940,bytes([enabled])),h.mutate(h.pool,261,struct.pack('<Q',bps)))
    x,y=h.run(sell=sell,overrides=ov),h.run(sell=sell,overrides=ov,candidate=a.candidate)
    for r in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify_with_results())
    assert x['transaction_base64']==y['transaction_base64']and x['before']==y['before'];cx,cy=clean(x),clean(y);rows.append({'sell':sell,'enabled':enabled,'pool_bps':bps,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 out={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':[{k:r[k]for k in ['sell','enabled','pool_bps','differences']}for r in rows if r['differences']]},indent=2))
if __name__=='__main__':main()
