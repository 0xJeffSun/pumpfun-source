"""Replay the 28 unchanged published signed runners with per-port locks."""
from pathlib import Path
import concurrent.futures,hashlib,json,socket,subprocess,sys,threading
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump.json').is_file())
OUT=W/'surfpool';OUT.mkdir(exist_ok=False);CAND=W/'build/artifacts/pump_recovered.so'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected=sha(CAND)
inputs=json.loads((W/'inputs-before.json').read_text())
def check():
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main48_source_before']:
  for path,digest in inputs[group].items():assert sha(R/path)==digest,path
 assert sha(CAND)==expected and sha(R/inputs['surfpool_path'])==inputs['surfpool_sha256']
check()
specs=json.loads((R/'repro/pump/quote-control-fortyeight/replay-commands.json').read_text())['surfpool'];assert len(specs)==28
locks={s['port']:threading.Lock()for s in specs};rows=[];rowlock=threading.Lock()
def run(spec):
 name=spec['suite'];port=spec['port']
 with locks[port]:
  for p in [port,port+1]:
   with socket.socket()as sock:sock.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1);sock.bind(('127.0.0.1',p))
  cmd=spec['command'].copy();runner=cmd[1];cmd[0]=sys.executable;cmd[1]=str(R/runner);cmd[cmd.index('--candidate')+1]=str(CAND);cmd[cmd.index('--output')+1]=str(OUT/name)
  before=sha(R/runner)
  with (OUT/(name+'.log')).open('w')as log:proc=subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT)
  row={'name':name,'family':spec['family'],'port':port,'runner':runner,'runner_sha256':before,'runner_unchanged':sha(R/runner)==before,'candidate_sha256':sha(CAND),'command':cmd,'returncode':proc.returncode,'output':str((OUT/name).relative_to(R)),'log_sha256':sha(OUT/(name+'.log'))}
  with rowlock:rows.append(row);(OUT/'run.json').write_text(json.dumps(rows,indent=2)+'\n')
  print(json.dumps(row),flush=True);return row
with concurrent.futures.ThreadPoolExecutor(max_workers=2)as pool:focused=list(pool.map(run,specs[:2]))
assert all(r['returncode']==0 for r in focused),'Focused published runners failed; remaining runners not started'
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:list(pool.map(run,specs[2:]))
check();assert len(rows)==28
for row in rows:assert row['returncode']==0 and row['runner_unchanged']and row['candidate_sha256']==expected,row
print('ALL 28 PUBLISHED SURFPOOL RUNNERS COMPLETE',flush=True)
