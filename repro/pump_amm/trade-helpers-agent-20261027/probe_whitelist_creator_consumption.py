#!/usr/bin/env python3
"""Verify whitelist waiver of a nonzero creator fee and its remaining-account consumption."""
import argparse,base64,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean

def options(name,cashback,whitelisted):
 def apply(vm,m):
  if cashback:(h.cash(True)if name=='sell'else h.cashback_buy(True))(vm,m)
  h.custom_fee_table([(0,(10,20,30))])(vm,m);h.mutate(h.pool,261,bytes(8))(vm,m)
  h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey()if whitelisted else h.OUTSIDER.pubkey()))(vm,m)
  if whitelisted:
   start=21 if name=='sell'else 23
   count=(3 if name=='sell'else 2)if cashback else 1
   del m[start:start+count]
 return apply

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy','buy_exact_quote_in','sell']:
  for cashback in [False,True]:
   for whitelisted in [False,True]:
    kw={'overrides':options(name,cashback,whitelisted)}
    if name=='sell':run=h.legacy
    else:run=h.legacy_buy;kw.update(name=name,amount=10**10 if name=='buy'else 10**7,limit=10**12 if name=='buy'else 1)
    x,y=run(**kw),run(candidate=a.candidate,**kw)
    for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
    assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'instruction':name,'cashback':cashback,'whitelisted':whitelisted,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 out={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(x['differences'])for x in rows),'original_errors':[x['original']['error']for x in rows]}))
if __name__=='__main__':main()
