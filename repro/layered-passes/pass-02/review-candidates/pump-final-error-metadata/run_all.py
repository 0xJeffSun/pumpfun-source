from pathlib import Path
import concurrent.futures,hashlib,json,os,subprocess,sys
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if(p/'evidence/original/pump/deployed.so').is_file());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert json.loads((W/'build-result.json').read_text())['returncode']==0
assert all(x['returncode']==0 for x in json.loads((W/'static-check-exits.json').read_text()))
assert not(W/'runtime-launch.json').exists()
commands={n:[str(R/'work/test-env/bin/python'),'-B',str(W/n)]for n in ['run_regressions.py','run_existing_extra.py','run_surfpool.py']}
(W/'runtime-launch.json').write_text(json.dumps({'candidate_sha256':H(W/'candidate.so'),'commands':commands,'orchestration_sha256':{n:H(W/n)for n in [*commands,'run_all.py']},'unchanged_existing_comparisons':9269,'unchanged_surfpool_comparisons':1024,'new_unique_cases':0,'port_ownership':'Parent assigned all established28 port sets exclusively to this lane.'},indent=2)+'\n')
def run(row):
 n,cmd=row
 with(W/(n+'.stdout')).open('w')as out,(W/(n+'.stderr')).open('w')as err:r=subprocess.run(cmd,cwd=R,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=out,stderr=err)
 result={'script':n,'command':cmd,'returncode':r.returncode,'stdout_sha256':H(W/(n+'.stdout')),'stderr_sha256':H(W/(n+'.stderr'))};(W/(n+'.result.json')).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True);return result
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:results=list(pool.map(run,commands.items()))
(W/'runtime-results.json').write_text(json.dumps(results,indent=2)+'\n')
raise SystemExit(any(r['returncode']for r in results))
