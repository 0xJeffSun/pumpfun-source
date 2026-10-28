"""Fresh-VM local replay with command, versions and exact loaded-byte receipts."""
from pathlib import Path
import argparse,datetime,importlib.metadata,json,os,subprocess,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
def main():
 p=argparse.ArgumentParser();p.add_argument('--output',type=Path,required=True);args=p.parse_args()
 out=args.output.resolve();out.mkdir(parents=True,exist_ok=False)
 command=[sys.executable,'-B',str(P/'observer.py'),str(out/'observed'),str(P/'replay.py'),'--output',str(out/'replay')]
 env=dict(os.environ,PUMP_AMM_FRESH_VM='1',PYTHONPYCACHEPREFIX=str(out/'unused-pycache'),PYTHONDONTWRITEBYTECODE='1')
 launch=dict(at=datetime.datetime.now(datetime.timezone.utc).isoformat(),command=command,cwd=str(R),python=sys.version,solders=importlib.metadata.version('solders'),environment={k:env[k]for k in ['PUMP_AMM_FRESH_VM','PYTHONPYCACHEPREFIX','PYTHONDONTWRITEBYTECODE']})
 (out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
 with (out/'replay.log').open('xb')as stream:run=subprocess.run(command,cwd=R,env=env,stdout=stream,stderr=subprocess.STDOUT)
 (out/'result.json').write_text(json.dumps(dict(returncode=run.returncode),indent=2)+'\n');run.check_returncode()
 # Verify actual new receipts using the same semantic checks as the frozen run.
 import shutil
 shutil.copy2(out/'replay/results.json.gz',out/'results.json.gz')
 import verify
 report=verify.runtime(out)
 (out/'runtime-report.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps({k:v for k,v in report.items()if k!='cases'},indent=2))
if __name__=='__main__':main()
