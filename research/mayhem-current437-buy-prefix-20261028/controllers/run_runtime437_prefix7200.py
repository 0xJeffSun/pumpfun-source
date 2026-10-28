from pathlib import Path
import concurrent.futures,hashlib,json,os,subprocess
R=Path(__file__).resolve().parents[3];W=R/'work/mayhem-priority-20261027';D=Path(__file__).resolve().parent/'runtime437-prefix7200';D.mkdir(exist_ok=False)
PYTHON='/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python';candidate=W/'qualified-amm437-buy-sol-after-globals-01-build/candidate.so';cases=W/'amm-body-audit/revisit-cases.json';env=dict(os.environ,PYTHONDONTWRITEBYTECODE='1')
expected='064dda9b45a9b6a758e30e6bf4b9c78ab555829f79b5ff90ec282f77ac8b6f64'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(candidate)==expected
inputs={str(p):sha(p)for p in [candidate,cases,Path(__file__),R/'scripts/mayhem_pump_swap_differential.py']}
(D/'launch.json').write_text(json.dumps({'candidate_sha256':expected,'controller_sha256':sha(Path(__file__)),'input_hashes':inputs},indent=2)+'\n')
def run(task):
 instruction,family=task;name=instruction+'-'+family;out=D/(name+'.json');cmd=[PYTHON,'-B',str(R/'scripts/mayhem_pump_swap_differential.py'),'--candidate',str(candidate),'--output',str(out),'--cases',str(cases),'--instruction',instruction,'--family',family]
 with(D/(name+'.log')).open('wb')as log:p=subprocess.run(cmd,cwd=R,env=env,stdout=log,stderr=subprocess.STDOUT)
 return {'name':name,'command':cmd,'returncode':p.returncode}
tasks=[(i,f)for i in ['buy_pump_swap','sell_pump_swap']for f in ['native','token']]
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as pool:results=list(pool.map(run,tasks))
(D/'commands.json').write_text(json.dumps({'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'runs':results},indent=2)+'\n');print(results);assert all(r['returncode']==0 for r in results);assert all(sha(Path(p))==h for p,h in inputs.items())
