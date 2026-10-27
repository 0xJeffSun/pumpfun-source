from pathlib import Path
import concurrent.futures,hashlib,json,os,subprocess,time
R=Path('/workspace/pumpfun-source-current');W=Path(__file__).resolve().parent;O=W/'trades';O.mkdir();C=W/'enabled-a/candidate.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();parent=json.loads((R/'research/mayhem-quotes-current-recovery-20261027/runtime/trades/commands.json').read_bytes())
def local(arg):
 marker='/pumpfun-source/'
 return str(R/arg.split(marker,1)[1]) if marker in arg else arg

def run(row):
 name=row['family'];cmd=[local(a) for a in row['command']];cmd[0]='/workspace/mayhem-runtime/bin/python';cmd[cmd.index('--candidate')+1]=str(C);cmd[cmd.index('--output')+1]=str(O/(name+'.json'))
 inputs={a:sha(Path(a)) for a in cmd if Path(a).is_file() and Path(a)!=C};start=time.monotonic()
 with (O/(name+'.log')).open('wb') as log:p=subprocess.run(cmd,cwd=R,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=log,stderr=subprocess.STDOUT)
 result={'family':name,'command':cmd,'returncode':p.returncode,'seconds':time.monotonic()-start,'input_hashes':inputs,'inputs_unchanged':all(sha(Path(n))==h for n,h in inputs.items())}
 if (O/(name+'.json')).exists():
  data=json.loads((O/(name+'.json')).read_bytes());result.update(cases=data['case_count'],mismatches=len(data['mismatches']),candidate_sha256=data['candidate_sha256'])
 (O/(name+'.result.json')).write_text(json.dumps(result,indent=2)+'\n');print(result['family'],result,flush=True);return result
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(run,parent['runs']))
(O/'commands.json').write_text(json.dumps({'candidate_sha256':sha(C),'runs':rows},indent=2)+'\n')
assert all(r['returncode']==0 and r['mismatches']==0 and r['inputs_unchanged'] and r['candidate_sha256']==sha(C) for r in rows)
assert sum(r['cases'] for r in rows)==6636
