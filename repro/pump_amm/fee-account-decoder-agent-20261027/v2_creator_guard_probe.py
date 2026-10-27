"""Observe v2 fee overrides with the global configurability gate disabled/enabled."""
import argparse,hashlib,json,struct,sys,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_trade_v2_differential as h

def clean(v):
 if isinstance(v,dict):return{k:clean(x)for k,x in v.items()}
 if isinstance(v,list):return[re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',x))if isinstance(x,str)else clean(x)for x in v if not isinstance(x,str)or not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]
 return v

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy_v2','buy_exact_quote_in_v2','sell_v2']:
  for flag in [False,True]:
   for bps in [0,1,100,10000,65535]:
    def override(vm,metas):
     h.mutate(h.CONFIG_KEY,940,bytes([flag]))(vm,metas)
     h.mutate(h.pool,261,struct.pack('<Q',bps))(vm,metas)
     h.mutate(h.pool,211,bytes(h.PAYER.pubkey()))(vm,metas)
    kw=dict(name=name,amount=10**7 if name=='buy_exact_quote_in_v2' else 10**10,limit=10**12 if name=='buy_v2'else 1,overrides=override)
    x=h.trade(**kw);y=h.trade(candidate=a.candidate,**kw);cx,cy=clean(x),clean(y);rows.append({'instruction':name,'flag':flag,'bps':bps,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(c['differences'])for c in rows)}))
if __name__=='__main__':main()
