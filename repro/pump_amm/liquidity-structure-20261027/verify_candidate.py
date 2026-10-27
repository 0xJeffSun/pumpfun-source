#!/usr/bin/env python3
"""Compare all recorded liquidity fields/logs and verify every actual signed message."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,re
from solders.transaction import Transaction

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def norm(v):
 if isinstance(v,dict):
  return{k:([re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',x))for x in data if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]if k=='logs'else norm(data))for k,data in v.items()}
 if isinstance(v,list):return[norm(x)for x in v]
 return v

def check(path,sidecar,candidate,expected):
 data=json.loads(gzip.decompress(path.read_bytes())if path.suffix=='.gz'else path.read_bytes());rows=data['cases'];observed=json.loads(gzip.decompress(sidecar.read_bytes()));txs=observed['transactions'];assert len(rows)==expected and observed['transaction_count']==len(txs)==2*expected
 assert data['candidate_sha256']==sha(candidate);fail=[]
 for i,row in enumerate(rows):
  a,b=row['original'],row['candidate']
  if norm(a)!=norm(b):fail.append({'case':i,'fields':[k for k in a if norm(a[k])!=norm(b[k])]})
  l,r=txs[2*i:2*i+2]
  for rec,output in [(l,a),(r,b)]:
   raw=base64.b64decode(rec['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results());assert hashlib.sha256(raw).hexdigest()==rec['transaction_sha256'];assert hashlib.sha256(json.dumps(output['logs'],separators=(',',':')).encode()).hexdigest()==rec['logs_sha256']
  assert l['amm_program_sha256']==data['original_sha256']and r['amm_program_sha256']==data['candidate_sha256']
  assert Transaction.from_bytes(base64.b64decode(l['transaction_base64'])).message==Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).message
 return {'cases':expected,'transactions':2*expected,'mismatches':fail}

def main():
 p=argparse.ArgumentParser()
 for name in ['suite','suite-transactions','overflow','overflow-transactions','candidate','build-record','output']:p.add_argument('--'+name,type=Path,required=True)
 a=p.parse_args();record=json.loads(a.build_record.read_text());assert record['returncode']==0 and record['source_unchanged']and record['source_sha256']==record['source_after_sha256'];assert record['comparison']['candidate_sha256']==sha(a.candidate);assert record['dependency_cache_before']==record['dependency_cache_after']
 suite=check(a.suite,a.suite_transactions,a.candidate,680);overflow=check(a.overflow,a.overflow_transactions,a.candidate,18);result={'candidate_sha256':sha(a.candidate),'suite':suite,'overflow':overflow};assert not a.output.exists();a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));assert not suite['mismatches']and not overflow['mismatches']
if __name__=='__main__':main()
