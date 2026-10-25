"""Replay the published AMM32 regression commands against the independent v1.44 control."""
import pathlib,json,subprocess,concurrent.futures,hashlib,sys
root=pathlib.Path(__file__).resolve().parent
baseline=pathlib.Path('repro/pump_amm/cashback-thirty-two/regression-run.json')
rows=json.loads(baseline.read_text());candidate=root/'build-03/artifacts/pump_amm_recovered.so';out=root/'results';out.mkdir(exist_ok=True)
def run(row):
 cmd=list(row['command']);cmd[cmd.index('--candidate')+1]=str(candidate);cmd[cmd.index('--output')+1]=str(out/(row['suite']+'.json'))
 p=subprocess.run(cmd,text=True,capture_output=True)
 result={'suite':row['suite'],'command':cmd,'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr}
 print(json.dumps(result),flush=True);return result
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:results=list(ex.map(run,rows))
(out/'regression-run.json').write_text(json.dumps(results,indent=2)+'\n')
raise SystemExit(any(r['returncode'] for r in results))
