#!/usr/bin/env python3
"""Verify direct original comparisons, signed inputs, source/build and static evidence."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,subprocess,sys,tempfile
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
 p=Path(p)
 if not p.exists()and p.suffix=='.json':p=p.with_suffix('.json.gz')
 b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def module(name,p):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def main():
 p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');a=p.parse_args();d=HERE/'results'
 assert sha(d/'manifest.json')==MANIFEST
 entries=load(d/'manifest.json');assert {str(f.relative_to(d))for f in d.rglob('*')if f.is_file()}==set(entries)|{'manifest.json'}
 for name,digest in entries.items():assert sha(d/name)==digest
 candidate=d/'build/candidate.so';build=load(d/'build/build-comparison.json')
 assert sha(candidate)==CANDIDATE==build['comparison']['candidate_sha256']
 assert build['returncode']==0 and build['source_unchanged'] and build['source_sha256']==build['source_after_sha256']
 assert build['dependency_cache_before']==build['dependency_cache_after'] and build['dependency_cache_before']
 assert build['build_log_sha256']==sha(d/'build/build.log') and build['unstripped_sha256']==sha(d/'build/unstripped.so')
 assert len(build['source_sha256'])==31
 for name,digest in build['source_sha256'].items():
  rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert sha(d/'source'/rel)==digest
  if a.current_source:assert sha(ROOT/rel)==digest
 summary=load(d/'runtime/summary.json');inputs=load(d/'runtime/inputs.json');assert summary['inputs_unchanged'] and not summary['mismatches']
 assert inputs['candidate_sha256']==CANDIDATE and inputs['original_sha256']==sha(ROOT/'evidence/original/pump_amm/deployed.so')
 for name,digest in inputs['harness_sha256'].items():assert sha(d/'harness'/Path(name).name)==digest
 assert inputs['observer_sha256']==sha(d/'harness/observe_suite.py')
 for run in load(d/'runtime/progress.json'):
  assert run['returncode']==0 and not run['mismatches']
  # Receipts are compressed for retention; producer hashes refer to uncompressed bytes.
  for name,digest in [(run['suite']+'.json',run['receipt_sha256'])]:assert hashlib.sha256(gzip.decompress((d/'runtime'/(name+'.gz')).read_bytes())).hexdigest()==digest
  assert sha(d/'runtime'/(run['suite']+'-transactions.json.gz'))==run['sidecar_sha256']
 direct=module('direct_original',HERE/'compare_direct.py');result=direct.audit(d/'runtime',CANDIDATE)
 assert result==load(HERE/'direct-comparison.json') and not result['mismatches']
 assert (result['cases'],result['transactions'],result['signature_fields'],result['identical_signed_message_pairs'])==(17462,35074,35418,17537)
 fixed=load(d/'buyback.json');assert fixed['candidate_sha256']==CANDIDATE and len(fixed['cases'])==72
 for c in fixed['cases']:
  assert not c['diff'] and direct.clean(c['original'])==direct.clean(c['candidate'])
  x,y=[Transaction.from_bytes(base64.b64decode(c[k]['transaction_base64']))for k in ['original','candidate']];assert all(x.verify_with_results())and bytes(x.message)==bytes(y.message)
 cpi=module('cpi_verifier',HERE/'verify_cpi.py').verify(d,candidate);assert cpi==91
 negative=load(d/'baseline-mismatches.json');assert len(negative)==73;real=fixture=0
 for row in negative:
  c=row['case'];assert direct.clean(c['original'])!=direct.clean(c['candidate'])
  x,y=[Transaction.from_bytes(base64.b64decode(t['transaction_base64']))for t in row['transactions']];assert all(x.verify_with_results())and all(y.verify_with_results())
  if bytes(x.message)==bytes(y.message):real+=1
  else:fixture+=1
 assert(real,fixture)==(70,3)
 oldbuild=load(d/'baseline-build/build-comparison.json');assert sha(d/'baseline-build/candidate.so')==oldbuild['comparison']['candidate_sha256']=='a672720fdba7b912aa72cdf78d3768e3338e34ace53408aad07d85135a73a809'
 for name,digest in oldbuild['source_sha256'].items():assert sha(d/'baseline-build/source'/('programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]))==digest
 with tempfile.TemporaryDirectory()as tmp:
  out=Path(tmp)/'m.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(d/'build/unstripped.so'),'--output',str(out)],check=True,stdout=subprocess.DEVNULL);assert load(out)==load(d/'measurement.json')
 for name,fn,target in [('static_order','audit','order-evidence.json'),('static_reader','audit','reader-evidence.json'),('static_buyback','audit','buyback-evidence.json')]:assert getattr(module(name,HERE/(name+'.py')),fn)(candidate,d/'build/unstripped.so')==load(HERE/target)
 print(json.dumps({**result,'candidate_sha256':CANDIDATE,'new_buyback_cases':72,'cpi_cases':cpi,'fixed_observed_diagnostic_cases':real,'repaired_fixture_log_cases':fixture,'current_source_checked':a.current_source,'normalized_matches':540,'raw_matches':109,'whole_elf_equal':False}))
MANIFEST='746a2976182147e2859f1f478d967ce3d5803dae27209ba512cb7f0e1630aa8b'
CANDIDATE='fe3c75511a1499b496649313dc57a8fce0cacc88ceb23406a59be522dae458bf'
if __name__=='__main__':main()
