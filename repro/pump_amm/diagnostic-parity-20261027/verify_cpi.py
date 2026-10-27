"""Verify full observed effects, logs and genuine signatures for 91 CPI cases."""
from pathlib import Path
import base64,gzip,hashlib,json,re
from solders.transaction import Transaction
ROOT=Path(__file__).resolve().parents[3]
BASE=ROOT/'repro/pump_amm/linux-v144-current-20261027/results/cpi'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def clean(v):
 if isinstance(v,dict):return{k:clean(x)for k,x in v.items()}
 if isinstance(v,list):return[clean(x)for x in v if not isinstance(x,str)or not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]
 if isinstance(v,str):return re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',v))
 return v
def verify(d,candidate):
 total=0
 specs=[('cpi',65,'observations','repro/pump_amm/return-data-diagnostics-20261026/probe.py'),('curve-balances',20,'curve-observations','repro/pump_amm/return-data-diagnostics-20261026/probe_curve_balances.py'),('source-amounts',6,'source-amount-observations','repro/pump_amm/legacy-transfer-constraint-20261027/probe_source_amounts.py')]
 for name,count,prior,producer in specs:
  r=load(d/(name+'.json.gz'));old=load(BASE/(prior+'.json.gz'));assert len(r['cases'])==len(old['cases'])==count
  assert r.get('genuine_original_sha256',r.get('original_sha256'))==sha(ROOT/'evidence/original/pump_amm/deployed.so')
  assert r.get('genuine_candidate_sha256',r.get('candidate_sha256'))==sha(candidate)
  assert r.get('probe_sha256',r.get('producer_sha256'))==sha(ROOT/producer)
  assert r.get('candidate_build_record_sha256',r.get('candidate_record_sha256'))==sha(d/'build/build-comparison.json')
  assert r.get('synthetic_oracle_sha256',r.get('oracle_sha256'))==sha(BASE/'oracle/synthetic-oracle.so')
  assert r.get('oracle_build_record_sha256',r.get('oracle_record_sha256'))==sha(BASE/'oracle/build-comparison.json')
  for c,prev in zip(r['cases'],old['cases']):
   assert {k:v for k,v in c.items()if k not in ('original','candidate','differences')}=={k:v for k,v in prev.items()if k not in ('original','candidate','differences')}
   x,y=c['original'],c['candidate'];assert x==prev['original'];assert x['before']==y['before'];assert clean(x)==clean(y)
   assert x['transaction_base64']==y['transaction_base64'];raw=base64.b64decode(x['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results())
   assert x['signature_verification']==y['signature_verification']==tx.verify_with_results()
   assert len([s for s in x['logs']if 'SYNTHETIC_RETURN_ORACLE'in s])==1
   total+=1
 assert total==91;return total
