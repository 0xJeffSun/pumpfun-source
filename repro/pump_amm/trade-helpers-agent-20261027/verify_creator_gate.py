#!/usr/bin/env python3
"""Authenticate all 64 original/candidate creator-fee gate observations."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json
from solders.transaction import Transaction
from probe_creator_fee_gate import clean
HERE=Path(__file__).resolve().parent
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
BEFORE='03df8937e0a6b15cb7c3a81e8ce4a24e0faadbef01a48c91edf12a9f4d5525fd'
AFTER='2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path);a=p.parse_args()
 assert sha(HERE/'creator-gate-manifest.json')=='f9d62c98abd23813d6f0d137cb036bb18939f986a77aac2dfb872258e21c59c0'
 if a.candidate:assert sha(a.candidate)==AFTER
 manifest=json.loads((HERE/'creator-gate-manifest.json').read_text());d=HERE/'creator-gate-results';assert set(manifest)=={p.name for p in d.iterdir()}
 for f,h in manifest.items():assert sha(d/f)==h
 count=old_bad=0
 for prefix,producer,expected in [('creator-gate','probe_creator_fee_gate.py',24),('multi-creator-gate','probe_multi_creator_gate.py',16),('creator-gate-cashback','probe_creator_fee_gate_cashback.py',24)]:
  old=json.loads(gzip.decompress((d/(prefix+'-before.json.gz')).read_bytes()));new=json.loads(gzip.decompress((d/(prefix+'-after.json.gz')).read_bytes()))
  assert old['candidate_sha256']==BEFORE and new['candidate_sha256']==AFTER
  assert old['original_sha256']==new['original_sha256']==ORIGINAL
  field='probe_sha256'if prefix=='creator-gate'else'producer_sha256';assert old[field]==new[field]==sha(HERE/producer)
  assert len(old['cases'])==len(new['cases'])==expected
  for x,y in zip(old['cases'],new['cases']):
   assert {k:v for k,v in x.items()if k not in ['original','candidate','differences']}=={k:v for k,v in y.items()if k not in ['original','candidate','differences']}
   assert x['original']==y['original'];old_bad+=bool(x['differences']);assert not y['differences']
   assert clean(y['original'])==clean(y['candidate'])
   assert y['original']['before']==y['candidate']['before']
   assert y['original']['transaction_base64']==y['candidate']['transaction_base64']
   for side in ['original','candidate']:
    tx=Transaction.from_bytes(base64.b64decode(y[side]['transaction_base64'],validate=True));assert all(tx.verify_with_results())
   count+=1
 assert count==64 and old_bad==24
 print(json.dumps({'cases':count,'signed_executions':count*2,'before_mismatches':old_bad,'after_mismatches':0,'candidate_sha256':AFTER}))
if __name__=='__main__':main()
