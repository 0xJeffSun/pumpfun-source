#!/usr/bin/env python3
"""Test portable static verification and disposable negative copies only."""
import argparse,hashlib,json,shutil,subprocess,tempfile
from pathlib import Path
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def test(base,second):
 rows=[]
 with tempfile.TemporaryDirectory(prefix='relay-next-layer-') as tmp:
  p=Path(tmp)/'package';shutil.copytree(P,p)
  def check(name,python,expected):
   r=subprocess.run([str(python),'-B',str(p/'verify.py')],cwd=tmp,capture_output=True,text=True);assert (r.returncode==0)==expected,(name,r.stdout,r.stderr);rows.append({'name':name,'expected_success':expected,'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr})
  check('external_base',base,True);check('external_second_python',second,True)
  for name,rel in [('missing_original','baseline/original.so'),('changed_call_classification','classification-delta.json'),('changed_candidate','baseline/candidate.so'),('changed_source','source-proposal/src/generated_exit.rs'),('stale_shape_count','inventory-summary.json')]:
   f=p/rel;raw=f.read_bytes();seal=(p/'manifest.json').read_bytes()
   if name=='missing_original':f.unlink()
   elif name=='changed_call_classification':
    j=json.loads(raw);j['classification_changes'][0]['after']['symbol']='made_up';f.write_text(json.dumps(j)+'\n')
   elif name=='changed_candidate':f.write_bytes(raw[:300]+bytes([raw[300]^1])+raw[301:])
   elif name=='changed_source':f.write_bytes(raw.replace(b'writer.write_all(&TRACKER_DISC)?;',b'writer.write_all(&DEBOUNCER_DISC)?;',1))
   else:
    j=json.loads(raw);j['corrected_comparison']['original_normalized_match_windows']=112;f.write_text(json.dumps(j)+'\n')
   if f.exists():
    m=json.loads(seal);m['files'][rel]=H(f.read_bytes());(p/'manifest.json').write_text(json.dumps(m,indent=2,sort_keys=True)+'\n')
   check(name,second,False);f.write_bytes(raw);(p/'manifest.json').write_bytes(seal)
  check('restored',second,True)
 return {'input_manifest_sha256':H((P/'manifest.json').read_bytes()),'all_expected':True,'tests':rows,'compiler_vm_target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--base-python',type=Path,required=True);a.add_argument('--second-python',type=Path,required=True);a.add_argument('--output',type=Path,required=True);a=a.parse_args();r=test(a.base_python.absolute(),a.second_python.absolute());a.output.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'all_expected':r['all_expected'],'test_count':len(r['tests']),'compiler_vm_target_executions':0,'input_manifest_sha256':r['input_manifest_sha256']}))
