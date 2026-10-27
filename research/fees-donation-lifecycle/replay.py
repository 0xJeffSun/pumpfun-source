"""Run both retained native candidates through fresh signed lifecycle sequences."""
from pathlib import Path
import argparse,contextlib,gzip,json,os,subprocess,sys,tempfile
import verify

def replay(output=None):
 verify.verify()
 results={}
 if output is not None:output.mkdir(parents=True,exist_ok=False)
 context=contextlib.nullcontext(str(output))if output is not None else tempfile.TemporaryDirectory(prefix='fees-donation-lifecycle-')
 with context as temp:
  d=Path(temp)
  for label in verify.LABELS:
   candidate=d/(label+'.so')
   candidate.write_bytes(gzip.decompress((verify.P/'public/builds'/label/'candidate.so.gz').read_bytes()))
   prefix=d/(label+'-observed');report=d/(label+'.json')
   command=[sys.executable,'-B',str(verify.P/'observer.py'),str(prefix),str(verify.P/'lifecycle.py'),'--candidate',str(candidate),'--output',str(report)]
   env=dict(os.environ,PYTHONDONTWRITEBYTECODE='1',PYTHONPYCACHEPREFIX=str(d/'unused-cache'))
   run=subprocess.run(command,env=env,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True)
   verify.require(run.returncode==0,'fresh lifecycle execution: '+run.stdout)
   transcript=verify.rows(prefix.with_suffix('.jsonl.gz'))
   saved=verify.rows(verify.P/'receipts/lifecycle'/(label+'-observed.jsonl.gz'))
   verify.require(transcript==saved,'fresh signed state/transaction/raw-log reproduction')
   fresh=verify.read(report);saved_report=verify.read(verify.P/'receipts/lifecycle'/(label+'.json.gz'))
   verify.require(fresh==saved_report,'fresh canonical sequence report')
   verify.header(prefix.with_suffix('.json'),transcript,verify.P/'observer.py')
   results[label]=verify.verify_lifecycle(fresh,transcript,verify.sha(candidate.read_bytes()))
 return results
if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--output',type=Path,help='New directory retaining all fresh replay artifacts and receipts')
 print(json.dumps(replay(parser.parse_args().output),indent=2))
