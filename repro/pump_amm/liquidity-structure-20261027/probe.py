#!/usr/bin/env python3
"""Observe effective-virtual overflow at the legacy liquidity can-boost boundary."""
from pathlib import Path
import argparse,hashlib,json,re,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_liquidity_differential as h

def normalized(v):
 if isinstance(v,dict):return{k:([re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',s)for s in x if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)]if k=='logs'else normalized(x))for k,x in v.items()}
 if isinstance(v,list):return[normalized(x)for x in v]
 return v

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['deposit','withdraw']:
  for virtual in [2**127-1,2**127-2,-2**127]:
   for fee in [0,1,2]:
    kw=dict(name=name,amount=1000,virtual=virtual,maxbase=0 if name=='withdraw'else 2**64-1,maxquote=0 if name=='withdraw'else 2**64-1,overrides=h.mutate(h.pool,271,struct.pack('<Q',fee)))
    x=h.run(**kw);y=h.run(candidate=a.candidate,**kw);nx,ny=normalized(x),normalized(y);diff=[k for k in nx if nx[k]!=ny[k]]
    rows.append({'instruction':name,'virtual_quote_reserves':virtual,'protocol_fees':fee,'creator_fees':0,'amount':1000,'original':x,'candidate':y,'differences':diff})
 r={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'harness_sha256':hashlib.sha256((ROOT/'scripts/pump_amm_liquidity_differential.py').read_bytes()).hexdigest(),'cases':rows,'mismatches':sum(bool(r['differences'])for r in rows)};a.output.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':r['mismatches']}))
if __name__=='__main__':main()
