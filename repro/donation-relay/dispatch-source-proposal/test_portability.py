"""Only temporary static-evidence copies; never builds or runs reconstruction code."""
from pathlib import Path
import argparse,hashlib,json,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--alternate-python',type=Path);args=parser.parse_args();results=[]
 def run(name,p,python,accept):
  q=subprocess.run([str(python),'-B',str(p/'verify.py')],cwd=p.parent,text=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
  assert (q.returncode==0)==accept,(name,q.stdout,q.stderr)
  item={'name':name,'external_copy':True,'expected_accept':accept,'accepted':q.returncode==0,'returncode':q.returncode,'python_version':subprocess.check_output([str(python),'--version'],text=True).strip()}
  if accept:
   result=json.loads(q.stdout);item['stable_semantics']={k:v for k,v in result.items() if k!='payload_files'}
  else:item['rejection_last_line']=q.stderr.splitlines()[-1]
  results.append(item)
 with tempfile.TemporaryDirectory(prefix='relay-dispatch-portability-') as temp:
  p=Path(temp)/'packet';shutil.copytree(P,p)
  run('base Python copied verification',p,Path(sys.executable),True)
  if args.alternate_python:run('alternate Python copied verification',p,args.alternate_python.resolve(),True)
  target=p/'inputs/relay_generated_exit_closure.tar.gz';data=target.read_bytes();target.unlink();run('missing exact exit archive rejected',p,Path(sys.executable),False);target.write_bytes(data)
  target=p/'inputs/deployed.so';data=target.read_bytes();target.write_bytes(bytes([data[0]^1])+data[1:]);run('altered original bytes rejected',p,Path(sys.executable),False);target.write_bytes(data)
  target=p/'proposal/dispatch.rs';oldsource=target.read_bytes();target.write_text(oldsource.decode().replace('named(2002,None)','named(3010,None)'))
  source_map=p/'source-sha256.json';oldmap=source_map.read_bytes();m=json.loads(oldmap);m['proposal/dispatch.rs']=H(target.read_bytes());source_map.write_text(json.dumps(m,indent=2)+'\n')
  seal=p/'manifest.json';oldseal=seal.read_bytes();m=json.loads(oldseal);m['files']['proposal/dispatch.rs']=H(target.read_bytes());m['files']['source-sha256.json']=H(source_map.read_bytes());seal.write_text(json.dumps(m,indent=2)+'\n')
  run('self-consistently resealed wrong event signer code rejected',p,Path(sys.executable),False)
  target.write_bytes(oldsource);source_map.write_bytes(oldmap);seal.write_bytes(oldseal)
  run('restored copied evidence accepted',p,Path(sys.executable),True)
 print(json.dumps({'scope':'Static verification only; all mutations restricted to temporary copies','tests':results},indent=2))
if __name__=='__main__':main()
