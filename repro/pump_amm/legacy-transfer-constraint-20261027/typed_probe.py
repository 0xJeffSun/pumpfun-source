#!/usr/bin/env python3
"""Observe complete signed account-decoder output on malformed and boundary inputs."""
import argparse,hashlib,json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_creator_reassignment_differential as h
from solders.transaction import Transaction
import base64

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def normalize(v):return {k:([s for s in x if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)]if k=='logs'else x)for k,x in v.items()}
def roster():
 rows=[]
 for op,key,limit,extra in [('set_coin_creator','curve',84,[(48,2),(48,255),(81,2),(81,255),(82,2),(82,255)]),('migrate_pool_coin_creator','sharing',116,[(10,2),(10,255),(75,2),(75,255)])]:
  for n in range(limit+1):rows.append({'name':key+'-length-'+str(n),'op':op,'lengths':{key:n}})
  for off,value in [(0,0),(0,255)]+extra:rows.append({'name':key+'-byte-'+str((off,value)),'op':op,'patches':{key:[(off,bytes([value]).hex())]}})
 return rows

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--build-record',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();build=json.loads(a.build_record.read_text());assert build['comparison']['candidate_sha256']==sha(a.candidate) and build['returncode']==0 and build['source_unchanged'];rows=[]
 for c in roster():
  x=h.run_creator(c);y=h.run_creator(c,a.candidate)
  assert x['transaction_base64']==y['transaction_base64'] and x['before']==y['before']
  tx=Transaction.from_bytes(base64.b64decode(x['transaction_base64']));assert all(tx.verify_with_results())
  fields=[k for k in x if normalize(x)[k]!=normalize(y)[k]]
  rows.append({'case':c,'original':x,'candidate':y,'differences_without_compute':fields})
 result={'candidate_sha256':sha(a.candidate),'original_sha256':sha(ROOT/'evidence/original/pump_amm/deployed.so'),'build_record_sha256':sha(a.build_record),'probe_sha256':sha(Path(__file__)),'harness_sha256':sha(Path(h.__file__)),'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(r['differences_without_compute'])for r in rows),'non_log_mismatches':sum(any(k!='logs'for k in r['differences_without_compute'])for r in rows)}))
if __name__=='__main__':main()
