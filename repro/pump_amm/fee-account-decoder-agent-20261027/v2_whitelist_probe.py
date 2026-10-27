"""Check whether the original v2 trade path applies the legacy user whitelist."""
import argparse,hashlib,json,re,sys
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
  for label,key in [('default',h.Pubkey.default()),('outsider',h.OUTSIDER.pubkey()),('user',h.PAYER.pubkey())]:
   def override(vm,m):h.mutate(h.CONFIG_KEY,353,bytes(key))(vm,m)
   args={'name':name,'amount':10**7 if name=='buy_exact_quote_in_v2' else 10**10,'limit':10**12 if name=='buy_v2' else 1,'overrides':override}
   x=h.trade(**args);y=h.trade(candidate=a.candidate,**args);u,v=clean(x),clean(y);rows.append({'instruction':name,'whitelist':label,'original':x,'candidate':y,'differences':[k for k in u if u[k]!=v[k]]})
 a.output.write_text(json.dumps({'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'cases':rows},separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(c['differences'])for c in rows)}))
if __name__=='__main__':main()
