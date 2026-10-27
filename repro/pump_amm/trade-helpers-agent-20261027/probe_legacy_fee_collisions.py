#!/usr/bin/env python3
"""Cross-check fees, accrued reserves, whitelist, and remaining-account precedence."""
import argparse, base64, hashlib, json, struct, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean

def override(name,bps,protocol,creator,whitelist,tail):
 def apply(vm,m):
  h.custom_fee_table([(0,(bps,0,30))])(vm,m)
  h.mutate(h.pool,261,bytes(8))(vm,m)
  h.mutate(h.pool,271,struct.pack('<QQ',protocol,creator))(vm,m)
  h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey() if whitelist else h.OUTSIDER.pubkey()))(vm,m)
  if not tail:del m[21 if name=='sell' else 23:]
 return apply

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy','buy_exact_quote_in','sell']:
  for bps in [20,2**64-1]:
   for protocol,creator in [(0,0),(2**64-1,0),(2**64-1,1)]:
    for whitelist in [False,True]:
     for tail in [False,True]:
      kw={'overrides':override(name,bps,protocol,creator,whitelist,tail)}
      if name=='sell':run=h.legacy
      else:run=h.legacy_buy;kw.update(name=name,amount=10**10 if name=='buy' else 10**7,limit=10**12 if name=='buy' else 1)
      x,y=run(**kw),run(candidate=a.candidate,**kw)
      for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
      assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y)
      rows.append({'instruction':name,'fee_bps':bps,'protocol_accrued':protocol,'creator_accrued':creator,'whitelisted':whitelist,'remaining_accounts_present':tail,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 out={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n')
 print(json.dumps({'cases':len(rows),'mismatches':[{k:v for k,v in r.items() if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']} for r in rows if r['differences']]},indent=2))
if __name__=='__main__':main()
