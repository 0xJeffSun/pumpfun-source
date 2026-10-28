from pathlib import Path
import concurrent.futures,hashlib,json,os,subprocess,time
R=Path.cwd();D=R/'work/latest-review-20261027/qualified438-runtime';C=D/'candidate.so';O=D/'runtime/trades';O.mkdir(parents=True,exist_ok=False)
expected='b69ee99d83cb1eaaa999082dc707560e95e1540174f27b5e6a8e1438cc4c34fc'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();assert sha(C)==expected
controller_hash=sha(Path(__file__));template=Path(__file__).parent/'trade-template.json';parent=json.loads(template.read_bytes());env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
inputs={str(p):sha(p)for p in [C,template,Path(__file__),R/'evidence/original/mayhem/deployed.so']}
for row in parent['runs']:
 command=row['command'];excluded={command.index('--candidate')+1,command.index('--output')+1}
 for index,arg in enumerate(command):
  p=Path(arg)
  if index not in excluded and p.is_file()and p.suffix in ('.py','.json'):inputs[str(p)]=sha(p)
(O/'launch.json').write_text(json.dumps(dict(candidate_sha256=expected,controller_sha256=controller_hash,template_sha256=sha(template),input_hashes=inputs,scope='Fresh438 signed trade matrix, no inherited receipts'),indent=2)+'\n')
def run(row):
 name=row['family'];cmd=list(row['command']);cmd[cmd.index('--candidate')+1]=str(C);cmd[cmd.index('--output')+1]=str(O/(name+'.json'));run_inputs={v:sha(Path(v))for v in cmd if Path(v).is_file()and Path(v)!=C};start=time.monotonic()
 with(O/(name+'.log')).open('wb')as f:ret=subprocess.run(cmd,cwd=R,env=env,stdout=f,stderr=subprocess.STDOUT)
 data=json.loads((O/(name+'.json')).read_bytes());count=data.get('case_count',data.get('count',len(data.get('cases',[]))));mismatches=data.get('mismatch_count',data.get('mismatches',[]));assert ret.returncode==0 and count==row['cases']and not mismatches,(name,ret.returncode,count,mismatches);assert data['candidate_sha256']==sha(C)==expected;assert all(sha(Path(p))==h for p,h in run_inputs.items());print(name,count,flush=True);return dict(family=name,command=cmd,returncode=ret.returncode,cases=count,mismatches=0,seconds=time.monotonic()-start,input_hashes=run_inputs)
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as pool:results=list(pool.map(run,parent['runs']))
assert sum(r['cases']for r in results)==6636 and sha(Path(__file__))==controller_hash and all(sha(Path(p))==h for p,h in inputs.items())
(O/'commands.json').write_text(json.dumps(dict(candidate_sha256=expected,runs=results,controller_sha256=controller_hash,input_hashes=inputs),indent=2)+'\n')
print('COMPLETE6636',flush=True)
