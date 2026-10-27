#!/usr/bin/env python3
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent

def main():
 p=argparse.ArgumentParser();p.add_argument('--report',type=Path,default=HERE/'baseline.json');p.add_argument('--transactions',type=Path,default=HERE/'baseline-transactions.json.gz');p.add_argument('--expected-mismatches',type=int,default=6);a=p.parse_args();r=json.loads(a.report.read_text());t=json.loads(gzip.decompress(a.transactions.read_bytes()));spec=importlib.util.spec_from_file_location('probe',HERE/'probe.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 assert r['probe_sha256']==hashlib.sha256((HERE/'probe.py').read_bytes()).hexdigest();assert len(r['cases'])==18 and t['transaction_count']==len(t['transactions'])==36
 failures=[]
 for i,row in enumerate(r['cases']):
  x,y=row['original'],row['candidate'];left,right=t['transactions'][i*2:i*2+2]
  for record,observed in [(left,x),(right,y)]:
   raw=base64.b64decode(record['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results()) and record['all_signatures_verified'];assert hashlib.sha256(raw).hexdigest()==record['transaction_sha256'];assert hashlib.sha256(json.dumps(observed['logs'],separators=(',',':')).encode()).hexdigest()==record['logs_sha256']
  assert left['amm_program_sha256']==r['original_sha256']and right['amm_program_sha256']==r['candidate_sha256'];assert Transaction.from_bytes(base64.b64decode(left['transaction_base64'])).message==Transaction.from_bytes(base64.b64decode(right['transaction_base64'])).message
  nx,ny=m.normalized(x),m.normalized(y);diff=[k for k in nx if nx[k]!=ny[k]];assert diff==row['differences']
  if diff:failures.append((row['instruction'],row['virtual_quote_reserves'],row['protocol_fees']))
 assert len(failures)==r['mismatches']==a.expected_mismatches
 if a.expected_mismatches==6:assert all(v['original']['error']is None and '6023'in v['candidate']['error']for v in r['cases']if v['differences'])
 print(json.dumps({'cases':18,'signed_executions':36,'mismatches':len(failures),'failure_inputs':failures}))
if __name__=='__main__':main()
