#!/usr/bin/env python3
"""Bounded identity-field probes for the exact-buy fee exemption comparison."""
import argparse,base64,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean
FIELDS={'admin':8,'creator_authority':321,'whitelist':353,'reserved':385,'boost_authority':907}
FIELDS.update({'protocol_'+str(i):57+32*i for i in range(1,8)})
FIELDS.update({'reserved_'+str(i):418+32*i for i in range(7)})

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for field,offset in FIELDS.items():
  ov=h.combine(h.custom_fee_table([(0,(10,20,30))]),h.mutate(h.pool,261,bytes(8)),h.mutate(h.CONFIG_KEY,offset,bytes(h.PAYER.pubkey())))
  kw={'name':'buy_exact_quote_in','amount':10**7,'limit':1,'overrides':ov};x,y=h.legacy_buy(**kw),h.legacy_buy(candidate=a.candidate,**kw)
  for v in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(v['transaction_base64'])).verify_with_results())
  assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'field':field,'offset':offset,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 out={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':[{k:x[k]for k in ['field','offset','differences']}for x in rows if x['differences']]},indent=2))
if __name__=='__main__':main()
