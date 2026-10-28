from pathlib import Path
import argparse,datetime,importlib.metadata,json,os,subprocess,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
def main():
 p=argparse.ArgumentParser();p.add_argument('--output',type=Path,required=True);a=p.parse_args();out=a.output.resolve();out.mkdir(exist_ok=False,parents=True)
 command=[sys.executable,'-B',str(P/'observer.py'),str(out/'observed'),str(P/'replay.py'),'--output',str(out/'run')]
 env=dict(os.environ,PYTHONPYCACHEPREFIX=str(out/'unused-cache'),PYTHONDONTWRITEBYTECODE='1')
 record=dict(command=command,cwd=str(R),at=datetime.datetime.now(datetime.timezone.utc).isoformat(),python=sys.version,solders=importlib.metadata.version('solders'),environment={k:env[k]for k in ['PYTHONPYCACHEPREFIX','PYTHONDONTWRITEBYTECODE']})
 (out/'launch.json').write_text(json.dumps(record,indent=2)+'\n')
 with (out/'run.log').open('xb')as log:result=subprocess.run(command,cwd=R,env=env,stdout=log,stderr=subprocess.STDOUT)
 (out/'result.json').write_text(json.dumps(dict(returncode=result.returncode))+'\n');result.check_returncode()
 print((out/'run.log').read_text())
if __name__=='__main__':main()
