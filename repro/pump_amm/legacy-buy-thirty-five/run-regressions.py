"""Replay all AMM33 suites, extend sell with16 event regressions, add two legacy buy bodies."""
import pathlib,json,subprocess,concurrent.futures,hashlib,sys,tarfile
root=pathlib.Path(__file__).resolve().parent;build=root/sys.argv[1];candidate=build/'artifacts/pump_amm_recovered.so';out=build/'results';out.mkdir(exist_ok=False)
rows=json.loads(pathlib.Path('repro/pump_amm/legacy-sell-thirty-three/replay-commands.json').read_text())['commands']
for row in rows:
 if row['suite']=='legacy_sell':row['command'][1]=str(root/'sell-differential.py')
rows.append({'suite':'legacy_buy','command':['work/test-env/bin/python',str(root/'buy-differential.py'),'--candidate',str(candidate),'--output',str(out/'legacy_buy.json')]})
old=json.loads(pathlib.Path('repro/pump_amm/legacy-sell-thirty-three/test-source-sha256.json').read_text());paths=[pathlib.Path(p) for p in old if p.startswith('scripts/')]+[root/'sell-differential.py',root/'buy-differential.py',pathlib.Path(__file__)]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inputs={str(p.relative_to(pathlib.Path.cwd()) if p.is_absolute() else p):sha(p) for p in paths};(out/'test-source-sha256.json').write_text(json.dumps(inputs,indent=2)+'\n')
with tarfile.open(out/'test-snapshot.tar.gz','w:gz') as t:
 for p in inputs:t.add(p,arcname=p)
def run(row):
 cmd=list(row['command']);cmd[cmd.index('--candidate')+1]=str(candidate);cmd[cmd.index('--output')+1]=str(out/(row['suite']+'.json'));p=subprocess.run(cmd,text=True,capture_output=True);result={'suite':row['suite'],'command':cmd,'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr};print(json.dumps(result),flush=True);return result
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:results=list(ex.map(run,rows))
(out/'regression-run.json').write_text(json.dumps(results,indent=2)+'\n')
for p,h in inputs.items():assert sha(pathlib.Path(p))==h,p
raise SystemExit(any(r['returncode'] for r in results))
