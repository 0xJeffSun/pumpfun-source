#!/usr/bin/env python3
"""Saved-receipt tests only; no VM or target execution."""
import argparse,base64,hashlib,json,shutil,subprocess,tempfile
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def test(base,runtime):
 results=[]
 with tempfile.TemporaryDirectory(prefix='relay-ordinary-receipts-') as tmp:
  copy=Path(tmp)/'package';shutil.copytree(P,copy)
  def check(name,python,extra,success):
   r=subprocess.run([str(python),'-B',str(copy/'verify.py')]+extra,cwd=Path(tmp),capture_output=True,text=True);assert (r.returncode==0)==success,(name,r.stdout,r.stderr);results.append({'name':name,'expected_success':success,'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr})
  check('copied_base',base,[],True);check('copied_runtime',runtime,['--runtime'],True)
  for mode in ['missing_receipt','missing_row','claimed_mismatch','changed_state','changed_signature']:
   path=copy/'run/ordinary.json';raw=path.read_bytes();seal=(copy/'manifest.json').read_bytes()
   if mode=='missing_receipt':path.unlink()
   else:
    j=json.loads(raw)
    if mode=='missing_row':j['cases'].pop()
    if mode=='claimed_mismatch':j['cases'][0]['mismatches']=['logs']
    if mode=='changed_state':
     case=j['cases'][0];key=case['fixture']['canonical_pdas']['debouncer_token_account'];case['candidate']['after'][key]['lamports']+=1
    if mode=='changed_signature':
     case=j['cases'][0];b=bytearray(base64.b64decode(case['original']['transaction_base64']));b[1]^=1
     for side in ['original','candidate']:case[side]['transaction_base64']=base64.b64encode(b).decode()
    path.write_text(json.dumps(j,indent=2)+'\n');m=json.loads(seal);m['files']['run/ordinary.json']=H(path.read_bytes());(copy/'manifest.json').write_text(json.dumps(m,indent=2,sort_keys=True)+'\n')
   check(mode,runtime,['--runtime'],False);path.write_bytes(raw);(copy/'manifest.json').write_bytes(seal)
  check('restored_runtime',runtime,['--runtime'],True)
 return {'input_manifest_sha256':H((P/'manifest.json').read_bytes()),'all_expected':True,'tests':results,'new_target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--base-python',type=Path,required=True);a.add_argument('--runtime-python',type=Path,required=True);a.add_argument('--output',type=Path,required=True);a=a.parse_args();r=test(a.base_python.absolute(),a.runtime_python.absolute());a.output.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'all_expected':r['all_expected'],'tests':len(r['tests']),'new_target_executions':0,'input_manifest_sha256':r['input_manifest_sha256']}))
