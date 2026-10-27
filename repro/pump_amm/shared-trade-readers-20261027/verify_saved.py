#!/usr/bin/env python3
"""Verify the frozen buyback validation checkpoint and original observations."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,re,subprocess,sys,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def load(p):
 p=Path(p)
 if not p.exists()and p.suffix=='.json':p=p.with_suffix('.json.gz')
 b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def module(name,p):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def main():
 p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');a=p.parse_args();d=HERE/'results'
 assert sha(d/'manifest.json')==MANIFEST_SHA
 manifest=load(d/'manifest.json');assert {str(f.relative_to(d))for f in d.rglob('*')if f.is_file()}==set(manifest)|{'manifest.json'}
 for name,digest in manifest.items():assert sha(d/name)==digest
 record=load(d/'build/build-comparison.json');candidate=d/'build/candidate.so'
 assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256']
 assert record['comparison']['candidate_sha256']==sha(candidate)==CANDIDATE_SHA
 assert record['unstripped_sha256']==sha(d/'build/unstripped.so') and record['build_log_sha256']==sha(d/'build/build.log')
 assert record['dependency_cache_before']==record['dependency_cache_after'] and record['dependency_cache_before']
 for name,digest in record['source_sha256'].items():
  rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert sha(d/'source'/rel)==digest
  if a.current_source:assert sha(ROOT/rel)==digest
 subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/buyback-owner-validation-20261027/verify_saved.py')],check=True,stdout=subprocess.DEVNULL)
 b=module('buyback_behavior',ROOT/'repro/pump_amm/linux-v144-current-20261027/verify_behavior.py')
 b.BASE=ROOT/'repro/pump_amm/buyback-owner-validation-20261027/results';b.PRIOR='b58374f0b126162e540cc1a3718288be52085a4f88df63c2238232878516f14b'
 def normalized(logs):
  return [re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',s))for s in b.compute_removed(logs)]
 def compare_logs(now,old,source=None):
  x,y=b.log_fields(now),b.log_fields(old);assert x.keys()==y.keys();return all(normalized(x[k])==normalized(y[k])for k in x)
 b.compare_logs=compare_logs
 result=b.verify(d/'runtime',candidate,d/'source',d/'build/build-comparison.json')
 probe=module('buyback_probe',ROOT/'repro/pump_amm/buyback-owner-validation-20261027/probe.py');from solders.transaction import Transaction
 fixed=load(d/'fixed.json');base=load(d/'baseline.json');assert len(fixed['cases'])==len(base['cases'])==72
 assert fixed['candidate_sha256']==sha(candidate)and base['candidate_sha256']=='2af1fd3607ae9289415f6403aaadfb9a29752ecb567218f65cb1601aed24f935'
 assert fixed['probe_sha256']==base['probe_sha256']==sha(ROOT/'repro/pump_amm/buyback-owner-validation-20261027/probe.py')
 assert sum(bool(r['diff'])for r in base['cases'])==36
 transactions=0
 for now,old in zip(fixed['cases'],base['cases']):
  assert {k:v for k,v in now.items()if k not in ('original','candidate','diff')}=={k:v for k,v in old.items()if k not in ('original','candidate','diff')}
  assert now['original']==old['original'] and not now['diff']
  assert probe.normalized(now['original'])==probe.normalized(now['candidate'])
  assert now['original']['before']==now['candidate']['before'] and now['original']['transaction_base64']==now['candidate']['transaction_base64']
  for side in ['original','candidate']:
   tx=Transaction.from_bytes(base64.b64decode(now[side]['transaction_base64']));assert all(tx.verify_with_results());transactions+=1
 with tempfile.TemporaryDirectory()as tmp:
  out=Path(tmp)/'m.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(d/'build/unstripped.so'),'--output',str(out)],check=True,stdout=subprocess.DEVNULL);assert load(out)==load(d/'measurement.json')
 assert module('token_static',HERE/'static_reader.py').audit(candidate,d/'build/unstripped.so')==load(HERE/'reader-identity.json')
 assert module('buyback_helper',HERE/'static_buyback.py').audit(candidate,d/'build/unstripped.so')==load(HERE/'buyback-identity.json')
 cpi=module('token_cpi',HERE/'verify_cpi.py').verify(d,candidate) 
 print(json.dumps({'candidate_sha256':sha(candidate),'normalized_matches':540,'full_corpus_cases':result['cases'],'full_corpus_transactions':result['transactions'],'targeted_cases':72,'targeted_transactions':transactions,'targeted_mismatches':0,'cpi_cases':cpi,'current_source_checked':a.current_source,'whole_elf_equal':False}))
MANIFEST_SHA='c3c97dbe974d07058019e0bc525395fa3ee747db46e132281ff6f73912a93bd6'
CANDIDATE_SHA='2a265136374a1220d0400f5584d7f000a4bee452bf7fcda7fde11a085bbba88c'
if __name__=='__main__':main()
