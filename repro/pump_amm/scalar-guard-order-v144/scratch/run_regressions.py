#!/usr/bin/env python3
"""Replay the unchanged 25-suite/17,462-case AMM corpus, retaining signed bytes."""
from pathlib import Path
import concurrent.futures,gzip,hashlib,json,subprocess,sys,time
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump_amm.json').is_file())
BASE=R/'repro/pump_amm/pool-serialization-thirty-seven';OUT=W/'runtime-01';OUT.mkdir(exist_ok=False)
CAND=W/'build-01/artifacts/pump_amm_recovered.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
expected_candidate=sha(CAND);expected_original=sha(R/'evidence/original/pump_amm/deployed.so')
build=json.loads((W/'build-01/build-comparison.json').read_text());assert len(build['source_sha256'])==18
harness={p:h for p,h in json.loads((BASE/'test-source-sha256.json').read_text()).items()if p.startswith('scripts/')}
for p,h in harness.items():assert sha(R/p)==h,p
for p in [Path(__file__),W/'observe_suite.py']:harness[str(p.relative_to(R))]=sha(p)
runtime=json.loads((BASE/'runtime-input-sha256.json').read_text())
legacy=json.loads((W/'baseline-source-sha256.json').read_text())
bindings={'actual_compiled_source':build['source_sha256'],'harness':harness,'runtime':runtime,'legacy_checkout_snapshot':legacy,'candidate_sha256':expected_candidate,'build_report_sha256':sha(W/'build-01/build-comparison.json'),'legacy_source_note':'Embedded legacy source maps describe the unchanged checkout, not the compiled scratch. The clean18-input build manifest binds the actual candidate source.'}
def check():
 for mapping in [bindings['actual_compiled_source'],harness,runtime,legacy]:
  for p,h in mapping.items():assert sha(R/p)==h,p
 assert sha(CAND)==expected_candidate
check();(OUT/'inputs-before.json').write_text(json.dumps(bindings,indent=2)+'\n')
specs=json.loads((BASE/'replay-commands.json').read_text())['commands'];counts=json.loads((BASE/'summary.json').read_text())['suites']
assert len(specs)==25 and sum(counts.values())==17462
def run(spec):
 name=spec['suite'];cmd=list(spec['command']);cmd[0]=sys.executable;cmd[1]=str(R/cmd[1]);cmd[cmd.index('--candidate')+1]=str(CAND);path=OUT/(name+'.json');cmd[cmd.index('--output')+1]=str(path)
 sidecar=OUT/(name+'-transactions.json.gz');observed=[cmd[0],str(W/'observe_suite.py'),str(sidecar),*cmd[1:]];start=time.monotonic()
 with (OUT/(name+'.log')).open('w')as log:p=subprocess.run(observed,cwd=R,stdout=log,stderr=subprocess.STDOUT)
 row={'suite':name,'unchanged_suite_command':cmd,'observational_command':observed,'returncode':p.returncode,'elapsed_seconds':time.monotonic()-start,'log_sha256':sha(OUT/(name+'.log')),'candidate_sha256':expected_candidate,'actual_source_sha256':build['source_sha256'],'build_report_sha256':bindings['build_report_sha256']}
 if path.exists():
  raw=path.read_bytes();d=json.loads(raw);row.update(receipt_sha256=hashlib.sha256(raw).hexdigest(),case_count=d['case_count'],mismatches=d.get('mismatches',[]))
  assert d['candidate_sha256']==expected_candidate and d['original_sha256']==expected_original,name
 if sidecar.exists():
  tx=json.loads(gzip.decompress(sidecar.read_bytes()));row.update(transaction_sidecar_sha256=sha(sidecar),transaction_count=tx['transaction_count'],signature_count=tx['signature_count'])
 print(json.dumps({'suite':name,'returncode':p.returncode,'case_count':row.get('case_count'),'transaction_count':row.get('transaction_count'),'elapsed_seconds':row['elapsed_seconds']}),flush=True)
 return row
rows=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:
 for f in concurrent.futures.as_completed([pool.submit(run,s)for s in specs]):
  rows.append(f.result());(OUT/'progress.json').write_text(json.dumps(rows,indent=2)+'\n')
(OUT/'run.json').write_text(json.dumps(rows,indent=2)+'\n');check();(OUT/'inputs-after.json').write_text(json.dumps(bindings,indent=2)+'\n')
for row in rows:
 assert row['returncode']==0 and row['case_count']==counts[row['suite']]and not row['mismatches'],row
 assert row['transaction_count']==2*row['case_count'],row
summary={'candidate_sha256':expected_candidate,'original_sha256':expected_original,'suite_count':25,'case_count':17462,'transaction_count':sum(x['transaction_count']for x in rows),'signature_count':sum(x['signature_count']for x in rows),'new_cases':0,'mismatches':[],'inputs_unchanged':True,'full_byte_equality':False}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
