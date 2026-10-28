from pathlib import Path
import concurrent.futures,hashlib,json,os,subprocess,time
R=Path.cwd();W=R/'work/mayhem-priority-20261027';D=R/'work/latest-review-20261027/qualified436-runtime';C=W/'fast-curve-pr404-qualified436-build/candidate.so';O=D/'runtime/trades';O.mkdir(parents=True,exist_ok=False)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();parent=json.loads((R/'research/mayhem-initializer-current-recovery-20261027/runtime/trades/commands.json').read_bytes());env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
def run(row):
 name=row['family'];cmd=list(row['command']);cmd[cmd.index('--candidate')+1]=str(C);cmd[cmd.index('--output')+1]=str(O/(name+'.json'));inputs={v:sha(Path(v))for v in cmd if Path(v).is_file()and Path(v)!=C};start=time.monotonic()
 with(O/(name+'.log')).open('wb')as f:ret=subprocess.run(cmd,cwd=R,env=env,stdout=f,stderr=subprocess.STDOUT)
 data=json.loads((O/(name+'.json')).read_bytes());count=data.get('case_count',data.get('count',len(data.get('cases',[]))));mismatches=data.get('mismatch_count',data.get('mismatches',[]));assert ret.returncode==0 and count==row['cases']and not mismatches,(name,ret.returncode,count,mismatches);assert data['candidate_sha256']==sha(C);assert all(sha(Path(p))==h for p,h in inputs.items());print(name,count,flush=True);return dict(family=name,command=cmd,returncode=ret.returncode,cases=count,mismatches=0,seconds=time.monotonic()-start,input_hashes=inputs)
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as pool:results=list(pool.map(run,parent['runs']))
assert sum(r['cases']for r in results)==6636
(O/'commands.json').write_text(json.dumps(dict(candidate_sha256=sha(C),runs=results,controller_sha256=sha(Path(__file__))),indent=2)+'\n')
