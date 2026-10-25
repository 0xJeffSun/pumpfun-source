"""Replay the exact ten accepted jobs against the fresh approved binary."""
from pathlib import Path
import ast,concurrent.futures,hashlib,json,os,subprocess,sys,time
W=Path(__file__).resolve().parent;ROOT=W.parents[1];R=W/'runner-repo';OUT=W/'runtime'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
def save(n,j):(W/n).write_text(json.dumps(j,indent=2)+'\n')
inputs=read(W/'frozen-runner-inputs.json');candidate=W/'candidate.so';source=inputs['source_sha256'];harness=inputs['harness_sha256'];runtime=inputs['runtime_sha256']
assert read(W/'static-gate.json')['retained_static_checks_pass']
focused=read(W/'runtime-focused/focused20.json');assert focused['case_count']==20 and not focused['mismatches']and focused['candidate_sha256']==sha(candidate)
assert not OUT.exists();OUT.mkdir()
prior=ROOT/'repro/pump_fees/social-v2-account-layout-v144/run-regressions.py';orchestration=prior.read_bytes();(W/'prior-run-regressions.py').write_bytes(orchestration)
module=ast.parse(orchestration);jobs=next(ast.literal_eval(n.value)for n in module.body if isinstance(n,ast.Assign)and any(isinstance(t,ast.Name)and t.id=='jobs'for t in n.targets))
assert len(jobs)==10 and sum(n for _,_,n in jobs if n is not None)==17441
for n,h in {**source,**harness,**runtime}.items():assert sha(R/n)==h,n
save('runtime-launch.json',{'jobs':jobs,'prior_orchestration_sha256':sha(prior),'runner_sha256':sha(Path(__file__)),'candidate_sha256':sha(candidate),'actual_compiler_inputs':read(W/'build-01/build-comparison.json')['source_sha256'],'build_report_sha256':sha(W/'build-01/build-comparison.json'),'scope':'No changed cases or signature/history/assertion controls. Stop scheduling if any job fails.'})
def run(row):
 name,script,expected=row;path=OUT/(name+'.json');cmd=[sys.executable,str(R/script),'--candidate',str(candidate),'--output',str(path)];start=time.monotonic()
 with(OUT/(name+'.log')).open('wb')as log:p=subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'})
 entry={'name':name,'command':cmd,'returncode':p.returncode,'elapsed_seconds':time.monotonic()-start,'expected_cases':expected,'report':str(path.relative_to(W)),'candidate_sha256':sha(candidate),'actual_compiler_inputs':read(W/'build-01/build-comparison.json')['source_sha256'],'build_report_sha256':sha(W/'build-01/build-comparison.json')}
 if not path.is_file():entry.update(passed=False,error='missing report');return entry
 data=read(path);entry.update(report_sha256=sha(path),case_count=data.get('case_count'),mismatches=data.get('mismatches',data.get('failures',[])))
 checks=[p.returncode==0,not entry['mismatches'],not data.get('unexpected_errors',[]),not data.get('unexpected_original_errors',[]),data['candidate_sha256']==sha(candidate),data['original_sha256']==sha(R/'evidence/original/pump_fees/deployed.so')]
 if expected is not None:checks.append(data['case_count']==expected)
 else:checks.append(len(data['steps'])==10 and all(x['match']and x['original']['signature_verification']and x['candidate']['signature_verification']for x in data['steps']))
 entry['passed']=all(checks);print(name,'PASS'if entry['passed']else'FAIL',flush=True);return entry
results=[];errors=[];pending={};cursor=0
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:
 while cursor<len(jobs)and len(pending)<3:pending[pool.submit(run,jobs[cursor])]=jobs[cursor];cursor+=1
 while pending:
  done,_=concurrent.futures.wait(pending,return_when=concurrent.futures.FIRST_COMPLETED)
  for f in done:
   job=pending.pop(f)
   try:results.append(f.result())
   except BaseException as e:errors.append({'job':job[0],'type':type(e).__name__,'error':str(e)})
  save('runtime/progress.json',{'results':results,'errors':errors})
  failed=bool(errors)or any(not r['passed']for r in results)
  while not failed and cursor<len(jobs)and len(pending)<3:pending[pool.submit(run,jobs[cursor])]=jobs[cursor];cursor+=1
for n,h in {**source,**harness,**runtime}.items():assert sha(R/n)==h,n
for n,h in source.items():assert sha(W/'prebuild/source'/n)==h,n
summary={'candidate_sha256':sha(candidate),'reports':results,'comparison_receipts':sum(r.get('case_count',0)or 0 for r in results if r['expected_cases']is not None),'donation_sequence_steps':10 if any(r['name']=='donation-sequence'and r['passed']for r in results)else 0,'mismatches':[r['name']for r in results if not r['passed']],'orchestration_failures':errors,'new_unique_cases':0,'source_inputs':26,'harness_inputs':46,'runtime_inputs':18}
save('runtime/summary.json',summary);assert len(results)==10 and summary['comparison_receipts']==17441 and not summary['mismatches']and not errors
print('PASS17441plus10separatesteps',flush=True)
