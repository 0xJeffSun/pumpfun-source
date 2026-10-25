from pathlib import Path
import ast,json,hashlib,subprocess,sys,os,time
W=Path(__file__).resolve().parent;R=W/'runner-repo';C=W/'candidate.so';OUT=W/'runtime';OUT.mkdir()
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert J(W/'static-gate.json')['passed']
frozen=J(W/'runtime-frozen-inputs.json')
for m in frozen.values():
 for n,h in m.items():assert H(R/n)==h
results=[]
def run(name,cmd,expected):
 start=time.monotonic()
 with (OUT/(name+'.stdout')).open('w') as out,(OUT/(name+'.stderr')).open('w') as err:
  p=subprocess.run(cmd,cwd=R,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=out,stderr=err)
 row={'name':name,'command':cmd,'returncode':p.returncode,'elapsed_seconds':time.monotonic()-start,'expected_cases':expected,'candidate_sha256':H(C),'symbols_sha256':H(W/'symbols.so'),'build_report_sha256':H(W/'build-01/build-comparison.json')}
 results.append(row);save('runtime/progress.json',results)
 assert p.returncode==0,(name,p.returncode)
 path=OUT/(name+'.json');d=J(path);row['report_sha256']=H(path)
 assert d['candidate_sha256']==H(C) and not d.get('mismatches',d.get('failures',[])) and not d.get('unexpected_errors',[]) and not d.get('unexpected_original_errors',[])
 if expected is not None:assert d['case_count']==expected
 else:assert len(d['steps'])==10 and all(x['match'] and x['original']['signature_verification'] and x['candidate']['signature_verification'] for x in d['steps'])
 row['passed']=True;save('runtime/progress.json',results);print(name,'PASS',flush=True)
run('focused20',[sys.executable,'-B',str(W/'validation-layer/harness/fees_donation_business_differential.py'),'--repo',str(R),'--source-root',str(W/'source'),'--candidate',str(C),'--candidate-sha256',H(C),'--build-record',str(W/'build-01/build-comparison.json'),'--output',str(OUT/'focused20.json')],20)
module=ast.parse((W/'reference/prior-run-regressions.py').read_text());jobs=next(ast.literal_eval(n.value) for n in module.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='jobs' for t in n.targets))
assert len(jobs)==10 and sum(n for _,_,n in jobs if n is not None)==17441
for name,script,expected in jobs:run(name,[sys.executable,'-B',str(R/script),'--candidate',str(C),'--output',str(OUT/(name+'.json'))],expected)
for m in frozen.values():
 for n,h in m.items():assert H(R/n)==h
save('runtime/summary.json',{'candidate_sha256':H(C),'baseline_comparisons':17441,'focused_comparisons':20,'sequence_steps_separate':10,'results':results,'new_cases':0})
