#!/usr/bin/env python3
"""Order fee subtraction, real-reserve validation, whitelist, and missing-tail failures."""
import argparse, base64, hashlib, json, struct, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean

def override(fees,accrued,whitelist,tail):
 def apply(vm,m):
  h.custom_fee_table([(0,fees)])(vm,m);h.mutate(h.pool,261,bytes(8))(vm,m)
  h.mutate(h.pool,271,struct.pack('<QQ',accrued,0))(vm,m)
  h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey() if whitelist else h.OUTSIDER.pubkey()))(vm,m)
  if not tail:del m[21:]
 return apply

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for fees in [(20,0,30),(20000,0,0),(0,20000,0),(0,0,20000),(2**64-1,0,0)]:
  for accrued in [0,int(h.f['pool_quote_vault_amount_raw']),2**64-1]:
   for whitelist in [False,True]:
    for tail in [False,True]:
     kw={'overrides':override(fees,accrued,whitelist,tail)};x,y=h.legacy(**kw),h.legacy(candidate=a.candidate,**kw)
     for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
     assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y)
     rows.append({'fee_bps':fees,'protocol_accrued':accrued,'whitelisted':whitelist,'remaining_accounts_present':tail,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 out={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n')
 print(json.dumps({'cases':len(rows),'mismatches':[{k:v for k,v in r.items() if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']} for r in rows if r['differences']]},indent=2))
if __name__=='__main__':main()
