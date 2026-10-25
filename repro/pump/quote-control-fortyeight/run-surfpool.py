"""All28 unchanged main42 signed runners with per-port locks."""
from pathlib import Path
import ast,concurrent.futures,hashlib,json,socket,subprocess,sys,threading
W=Path(__file__).resolve().parent;R=W.parents[1];OUT=W/'surfpool';OUT.mkdir(exist_ok=False)
CAND=W/'build/artifacts/pump_recovered.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected=sha(CAND)
inputs=json.loads((W/'inputs-before.json').read_text())
def verify_inputs():
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main42_source_before']:
  for p,h in inputs[group].items():assert sha(R/p)==h,p
 assert sha(CAND)==expected
 assert sha(R/inputs['surfpool_path'])==inputs['surfpool_sha256']
verify_inputs()
tree=ast.parse((R/'repro/pump/creator-fortyone/run-surfpool.py').read_text())
ports=dict(next(ast.literal_eval(n.value)for n in tree.body if isinstance(n,ast.Assign)and any(isinstance(x,ast.Name)and x.id=='suites'for x in n.targets)))
baseline=json.loads((R/'repro/pump/creator-fortyone/surfpool-run.json').read_text());assert len(baseline)==26
locks={port:threading.Lock()for port in set(ports.values())|{20151,20251}};rows=[];rowlock=threading.Lock()
def run(spec):
 family,name,runner,port=spec
 with locks[port]:
  for p in [port,port+1]:
   with socket.socket()as sock:sock.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1);sock.bind(('127.0.0.1',p))
  command=[sys.executable,str(R/runner),'--candidate',str(CAND),'--output',str(OUT/name)]
  before=sha(R/runner)
  with (OUT/(name+'.log')).open('w')as log:proc=subprocess.run(command,cwd=R,stdout=log,stderr=subprocess.STDOUT)
  row={'family':family,'name':name,'runner':runner,'runner_sha256':before,'runner_unchanged':sha(R/runner)==before,
   'candidate_sha256':sha(CAND),'port':port,'command':command,'returncode':proc.returncode,'output':str((OUT/name).relative_to(R)),'log_sha256':sha(OUT/(name+'.log'))}
  with rowlock:
   rows.append(row);(OUT/'run.json').write_text(json.dumps(rows,indent=2)+'\n')
  print(json.dumps(row),flush=True)
  return row
focused=[('holder_nested','holder_distribution','scripts/pump_holder_distribution_surfpool.py',20251),('holder_nested','nested_create','scripts/pump_create_nested_surfpool.py',20151)]
with concurrent.futures.ThreadPoolExecutor(max_workers=2)as pool:focused_rows=list(pool.map(run,focused))
assert all(r['returncode']==0 for r in focused_rows),'Focused runners failed; retained evidence, baseline phase not started'
specs=[('prior26',row['name'],row['runner'],ports[row['name']])for row in baseline]
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:baseline_rows=list(pool.map(run,specs))
verify_inputs()
assert len(rows)==28
for row in rows:assert row['returncode']==0 and row['runner_unchanged']and row['candidate_sha256']==expected,row
print('ALL28 RUNNERS COMPLETE',flush=True)
