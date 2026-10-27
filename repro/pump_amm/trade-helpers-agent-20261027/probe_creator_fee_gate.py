#!/usr/bin/env python3
"""Observe the original legacy creator-fee override gate with signed local fixtures."""
import argparse,base64,hashlib,json,re,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_legacy_buy_differential as h

def clean(v):
 if isinstance(v,dict):return{k:([re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',s)for s in x if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)]if k=='logs'else clean(x))for k,x in v.items()}
 if isinstance(v,list):return[clean(x)for x in v]
 return v

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy','buy_exact_quote_in','sell']:
  for enabled in [False,True]:
   for bps in [0,1,100,10000]:
    override=h.combine(h.mutate(h.CONFIG_KEY,940,bytes([enabled])),h.mutate(h.pool,261,struct.pack('<Q',bps)))
    kw={'overrides':override}
    if name=='sell':run=h.legacy
    else:run=h.legacy_buy;kw.update(name=name,amount=10**10 if name=='buy' else 10**7,limit=10**12 if name=='buy' else 1)
    x,y=run(**kw),run(candidate=a.candidate,**kw)
    for r in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify_with_results())
    assert x['transaction_base64']==y['transaction_base64'] and x['before']==y['before']
    cx,cy=clean(x),clean(y);diff=[k for k in cx if cx[k]!=cy[k]]
    rows.append({'instruction':name,'enabled':enabled,'pool_bps':bps,'original':x,'candidate':y,'differences':diff})
 result={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':[{'instruction':r['instruction'],'enabled':r['enabled'],'pool_bps':r['pool_bps'],'differences':r['differences']}for r in rows if r['differences']]},indent=2))
if __name__=='__main__':main()
