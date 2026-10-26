#!/usr/bin/env python3
"""Pure saved-evidence verifier copy/negative tests. Never runs the harness."""
import argparse,hashlib,json,shutil,subprocess,sys,tempfile
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def run(python,path,runtime):
 args=[str(python),'-B',str(path/'verify.py')]+(['--runtime'] if runtime else [])
 r=subprocess.run(args,cwd=path.parent,capture_output=True,text=True)
 return {'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr}
def reseal_copy(path,filename):
 m=json.loads((path/'manifest.json').read_text());m['files'][filename]=H((path/filename).read_bytes());(path/'manifest.json').write_text(json.dumps(m,indent=2,sort_keys=True)+'\n')
def main(base,runtime):
 rows=[]
 with tempfile.TemporaryDirectory(prefix='relay-proposal-review-') as temp:
  copy=Path(temp)/'package';shutil.copytree(P,copy)
  for name,python,flag in [('external_copy_base',base,False),('external_copy_runtime',runtime,True)]:
   r=run(python,copy,flag);assert r['returncode']==0,r;rows.append({'name':name,'expected':'pass',**r})
  for name,path,mode in [('missing_harness','harness_proposal.py','remove'),('tampered_harness','harness_proposal.py','append'),('resealed_source_change','build04-source/src/handlers.rs','source'),('resealed_fixture_change','fixture-blueprints.json','fixture'),('resealed_window_change','abi-window-ledger.json','window')]:
   target=copy/path;original=target.read_bytes();manifest=(copy/'manifest.json').read_bytes()
   if mode=='remove':target.unlink()
   elif mode in ['append','source']:target.write_bytes(original+b'\n// changed\n' if mode=='source' else original+b'\n# changed\n')
   else:
    j=json.loads(original)
    if mode=='fixture':j[0]['fixture']['accounts'][j[0]['fee_payer']]['lamports']+=1
    else:j[0]['raw_sha256']='0'*64
    target.write_text(json.dumps(j,indent=2,sort_keys=True)+'\n')
   if mode in ['source','fixture','window']:reseal_copy(copy,path)
   r=run(runtime,copy,True);assert r['returncode']!=0,name;rows.append({'name':name,'expected':'reject',**r})
   target.write_bytes(original);(copy/'manifest.json').write_bytes(manifest)
  r=run(runtime,copy,True);assert r['returncode']==0;rows.append({'name':'restored_copy','expected':'pass',**r})
 return {'input_manifest_sha256':H((P/'manifest.json').read_bytes()),'test_count':len(rows),'all_expected':True,'vm_or_transaction_execution':0,'tests':rows}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--base-python',type=Path,required=True);p.add_argument('--runtime-python',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();result=main(a.base_python.absolute(),a.runtime_python.absolute());a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k!='tests'}))
