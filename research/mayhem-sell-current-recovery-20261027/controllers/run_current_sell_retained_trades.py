from pathlib import Path
import concurrent.futures,hashlib,json,os,subprocess,sys,time
R=Path.cwd();W=R/'work/mayhem-priority-20261027';D=W/'current-sell-retained-qualified-a';C=D/'qualified-a/candidate.so';O=D/'trades';O.mkdir();sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
parent=json.loads((R/'research/mayhem-initializer-current-recovery-20261027/runtime/trades/commands.json').read_bytes());env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
def run(row):
 name=row['family'];cmd=list(row['command']);cmd[cmd.index('--candidate')+1]=str(C);cmd[cmd.index('--output')+1]=str(O/(name+'.json'));inputs={v:sha(Path(v))for v in cmd if Path(v).is_file() and Path(v)!=C};start=time.monotonic()
 with (O/(name+'.log')).open('wb')as f:ret=subprocess.run(cmd,cwd=R,env=env,stdout=f,stderr=subprocess.STDOUT)
 out=json.loads((O/(name+'.json')).read_bytes());count=out.get('case_count',out.get('count',len(out.get('cases',[]))));mismatches=out.get('mismatch_count',out.get('mismatches',[]))
 assert ret.returncode==0 and count==row['cases'] and not mismatches,(name,ret.returncode,count,mismatches)
 assert out['candidate_sha256']==sha(C)
 assert all(sha(Path(p))==h for p,h in inputs.items())
 result={'family':name,'command':cmd,'returncode':ret.returncode,'cases':count,'mismatches':0,'seconds':time.monotonic()-start,'input_hashes':inputs};print(name,count,flush=True);return result
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as executor:rows=list(executor.map(run,parent['runs']))
assert sum(r['cases']for r in rows)==6636
(O/'commands.json').write_text(json.dumps({'candidate_sha256':sha(C),'runs':rows},indent=2)+'\n')
