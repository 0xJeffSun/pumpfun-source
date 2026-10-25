#!/usr/bin/env python3
"""Pure retained-failure verifier tests, no target execution."""
import argparse,base64,hashlib,json,shutil,subprocess,tempfile
from pathlib import Path
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def test(base,runtime):
 rows=[]
 with tempfile.TemporaryDirectory(prefix='relay-rejection-review-') as tmp:
  copy=Path(tmp)/'package';shutil.copytree(P,copy)
  def check(name,python,args,ok):
   r=subprocess.run([str(python),'-B',str(copy/'verify.py')]+args,cwd=tmp,capture_output=True,text=True);assert (r.returncode==0)==ok,(name,r.stdout,r.stderr);rows.append({'name':name,'expected_success':ok,'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr})
  check('external_base',base,[],True);check('external_runtime',runtime,['--runtime'],True)
  for mode in ['missing_receipt','false_pass','erased_log_difference','altered_signature','false_original_line']:
   rel='evidence/diagnostic-points.json' if mode=='false_original_line' else 'run/business-rejection.json';path=copy/rel;raw=path.read_bytes();seal=(copy/'manifest.json').read_bytes()
   if mode=='missing_receipt':path.unlink()
   else:
    j=json.loads(raw)
    if mode=='false_original_line':j['points'][3]['raw_hex']='620a00ff38000000'
    elif mode=='false_pass':j['passed']=1;j['cases'][0]['mismatches']=[]
    elif mode=='erased_log_difference':
     old=j['cases'][0]['original'];new=j['cases'][0]['candidate'];new['logs']=old['logs'];new['metadata']['logs']=old['logs']
    else:
     c=j['cases'][0];b=bytearray(base64.b64decode(c['original']['transaction_base64']));b[1]^=1
     for side in ['original','candidate']:c[side]['transaction_base64']=base64.b64encode(b).decode()
    path.write_text(json.dumps(j,indent=2)+'\n');m=json.loads(seal);m['files'][rel]=H(path.read_bytes());(copy/'manifest.json').write_text(json.dumps(m,indent=2,sort_keys=True)+'\n')
   check(mode,runtime,['--runtime'],False);path.write_bytes(raw);(copy/'manifest.json').write_bytes(seal)
  check('restored_runtime',runtime,['--runtime'],True)
 return {'input_manifest_sha256':H((P/'manifest.json').read_bytes()),'all_expected':True,'tests':rows,'target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--base-python',type=Path,required=True);a.add_argument('--runtime-python',type=Path,required=True);a.add_argument('--output',type=Path,required=True);a=a.parse_args();r=test(a.base_python.absolute(),a.runtime_python.absolute());a.output.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'all_expected':r['all_expected'],'tests':len(r['tests']),'target_executions':0,'input_manifest_sha256':r['input_manifest_sha256']}))
