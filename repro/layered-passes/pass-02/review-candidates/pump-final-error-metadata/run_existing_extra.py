"""Repeat accepted nested16 and route16 without case/assertion changes."""
from pathlib import Path
import hashlib,json,subprocess,sys
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if(p/'evidence/original/pump/deployed.so').is_file());sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inputs=json.loads((W/'inputs-before.json').read_text());records=[]
def check():
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','published_additional_inputs','runtime_layer_sha256','baseline_main_source','compiler_source_sha256']:
  for n,h in inputs[group].items():assert sha(R/n)==h,n
check();candidate=W/'build-01/artifacts/pump_recovered.so';report=W/'build-01/build-comparison.json';python=sys.executable
nested=W/'runtime-layer/nested-harness/proposed/pump_nested_general_differential.py';route=W/'runtime-layer/route-harness/pump_general_route_differential.py'
commands=[('nested-original',[python,'-B',str(nested),'--output',str(W/'nested-original.json.gz')]),('nested-differential',[python,'-B',str(nested),'--candidate',str(candidate),'--build-report',str(report),'--accepted-original',str(W/'nested-original.json.gz'),'--output',str(W/'nested-differential.json.gz')]),('route-original',[python,'-B',str(route),'--repo',str(R),'--stage','original','--output',str(W/'route-original')]),('route-candidate',[python,'-B',str(route),'--repo',str(R),'--stage','candidate','--candidate',str(candidate),'--build-report',str(report),'--source-root',str(W/'source'),'--accepted-original',str(W/'route-original'),'--output',str(W/'route-candidate')])]
for name,cmd in commands:
 with(W/(name+'.stdout')).open('w')as out,(W/(name+'.stderr')).open('w')as err:r=subprocess.run(cmd,cwd=R,stdout=out,stderr=err)
 records.append({'name':name,'command':cmd,'returncode':r.returncode,'stdout_sha256':sha(W/(name+'.stdout')),'stderr_sha256':sha(W/(name+'.stderr'))});(W/'extra-run.json').write_text(json.dumps(records,indent=2)+'\n');print(name,r.returncode,flush=True);assert r.returncode==0,'Discrepancy retained; no next run'
check();print('PASS: repeated nested16 and route16; no new unique coverage',flush=True)
