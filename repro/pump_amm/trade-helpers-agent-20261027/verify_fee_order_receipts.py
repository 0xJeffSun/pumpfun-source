#!/usr/bin/env python3
"""Independently verify signed messages, prestate, recorded fields, and result deltas."""
from pathlib import Path
import argparse, base64, gzip, hashlib, json, re
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
def clean(value):
 if isinstance(value,dict):
  return {key:([re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',line) for line in item if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',line)] if key=='logs' else clean(item)) for key,item in value.items()}
 if isinstance(value,list):return [clean(item) for item in value]
 return value
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def main():
 p=argparse.ArgumentParser();p.add_argument('directory',type=Path);p.add_argument('--candidate',type=Path);p.add_argument('--require-parity',action='store_true');a=p.parse_args();manifest=json.loads((a.directory/'manifest.json').read_text());count=bad=0
 if a.candidate:assert sha(a.candidate)==manifest['candidate_sha256']
 for row in manifest['receipts']:
  receipt=a.directory/row['receipt'];assert sha(receipt)==row['sha256'];assert sha(HERE/row['producer'])==row['producer_sha256']
  data=json.loads(gzip.decompress(receipt.read_bytes()));assert data['original_sha256']==ORIGINAL;assert data['candidate_sha256']==manifest['candidate_sha256'];assert data.get('producer_sha256',data.get('probe_sha256'))==row['producer_sha256'];assert len(data['cases'])==row['cases'];local_bad=0
  for case in data['cases']:
   x,y=case['original'],case['candidate'];assert x['before']==y['before'];assert x['transaction_base64']==y['transaction_base64']
   for side in (x,y):assert all(Transaction.from_bytes(base64.b64decode(side['transaction_base64'],validate=True)).verify_with_results())
   cx,cy=clean(x),clean(y);assert cx.keys()==cy.keys();diff=[key for key in cx if cx[key]!=cy[key]];assert diff==case['differences'];local_bad+=bool(diff);count+=1
  assert local_bad==row['mismatches'];bad+=local_bad
 assert count==manifest['cases'] and bad==manifest['mismatches']
 if a.require_parity:assert bad==0
 print(json.dumps({'cases':count,'signed_executions':count*2,'mismatches':bad,'candidate_sha256':manifest['candidate_sha256']}))
if __name__=='__main__':main()
