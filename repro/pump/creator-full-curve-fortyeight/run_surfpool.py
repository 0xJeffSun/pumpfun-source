"""Replay the 28 unchanged published signed runners with per-port locks."""
from pathlib import Path
import concurrent.futures,hashlib,json,socket,subprocess,sys,threading
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump.json').is_file())
OUT=W/'surfpool';OUT.mkdir(exist_ok=False);CAND=W/'build-01/artifacts/pump_recovered.so'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected=sha(CAND)
inputs=json.loads((W/'inputs-before.json').read_text())
def check():
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','published_additional_inputs','runtime_layer_sha256','baseline_main_source','compiler_source_sha256']:
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
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:
 pending={};remaining=iter(specs[2:]);failed=False
 def submit():
  try:spec=next(remaining)
  except StopIteration:return False
  pending[pool.submit(run,spec)]=spec;return True
 for _ in range(3):submit()
 while pending:
  done,_=concurrent.futures.wait(pending,return_when=concurrent.futures.FIRST_COMPLETED)
  for future in done:
   pending.pop(future);row=future.result();failed=failed or row['returncode']!=0
  if not failed:
   for _ in done:submit()
assert not failed,'Discrepancy preserved; no further runners scheduled'
check();assert len(rows)==28
for row in rows:assert row['returncode']==0 and row['runner_unchanged']and row['candidate_sha256']==expected,row
print('ALL 28 PUBLISHED SURFPOOL RUNNERS COMPLETE',flush=True)
