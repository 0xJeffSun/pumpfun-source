"""Bind all AMM36 suites plus the new multi-hop suite to one clean scratch executable."""
import pathlib,json,subprocess,concurrent.futures,hashlib,sys,tarfile
root=pathlib.Path(__file__).resolve().parent;repo=root.parents[1];build=root/sys.argv[1];candidate=build/'artifacts/pump_amm_recovered.so';out=build/'results';out.mkdir(exist_ok=False)
rows=json.loads((repo/'repro/pump_amm/boost-burn-thirty-six/replay-commands.json').read_text())['commands']
old=json.loads((repo/'repro/pump_amm/boost-burn-thirty-six/test-source-sha256.json').read_text());paths=[repo/p for p in old if p.startswith('scripts/')]+list(root.glob('*.py'));paths=list(dict.fromkeys(paths))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inputs={str(p.relative_to(repo)):sha(p)for p in paths};(out/'test-source-sha256.json').write_text(json.dumps(inputs,indent=2)+'\n')
with tarfile.open(out/'test-snapshot.tar.gz','w:gz')as t:
 for p in inputs:t.add(repo/p,arcname=p)
with tarfile.open(build/'source-snapshot.tar.gz','w:gz')as t:
 for p in sorted((root/'crate').rglob('*')):
  if p.is_file()and'target'not in p.parts:t.add(p,arcname=str(p.relative_to(root/'crate')))
def run(row):
 cmd=list(row['command']);cmd[cmd.index('--candidate')+1]=str(candidate);cmd[cmd.index('--output')+1]=str(out/(row['suite']+'.json'));p=subprocess.run(cmd,text=True,capture_output=True,cwd=repo);r={'suite':row['suite'],'command':cmd,'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr};print(json.dumps(r),flush=True);return r
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as ex:results=list(ex.map(run,rows))
cmd=[str(repo/'work/test-env/bin/python'),str(root/'compare_broad.py'),str(candidate),str(out/'multi_hop')];p=subprocess.run(cmd,text=True,capture_output=True,cwd=repo);r={'suite':'multi_hop','command':cmd,'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr};results.append(r);print(json.dumps({'suite':'multi_hop','returncode':p.returncode,'stdout_tail':p.stdout[-2000:],'stderr':p.stderr}),flush=True)
(out/'regression-run.json').write_text(json.dumps(results,indent=2)+'\n')
for p,h in inputs.items():assert sha(repo/p)==h,p
raise SystemExit(any(r['returncode']for r in results))
