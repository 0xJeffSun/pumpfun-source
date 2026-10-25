"""Run only this Python static verifier on separate file copies; never Rust/SBF."""
import sys,subprocess,tempfile,shutil,json,hashlib
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def run(py,p):
 r=subprocess.run([py,'-B',str(p/'verify.py')],cwd=p.parent,capture_output=True,text=True)
 return {'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr}
def main(interpreters):
 results=[]
 seal=H((P/'manifest.json').read_bytes())
 with tempfile.TemporaryDirectory(prefix='relay-idl-portable-') as tmp:
  for k,py in enumerate(interpreters):
   version=subprocess.check_output([py,'--version'],text=True).strip()
   copy=Path(tmp)/str(k)/'copy';copy.parent.mkdir();shutil.copytree(P,copy,ignore=shutil.ignore_patterns('__pycache__'))
   good=run(py,copy);assert good['returncode']==0,good
   results.append({'test':'external copied directory','python':version,**good})
  py=interpreters[-1]
  for case in ['missing helper','raw original tamper','self-consistent wrong growth cap']:
   copy=Path(tmp)/case.replace(' ','-');shutil.copytree(P,copy,ignore=shutil.ignore_patterns('__pycache__'))
   if case=='missing helper':(copy/'evidence/332.asm').unlink()
   elif case=='raw original tamper':
    path=copy/'inputs/deployed.so';b=bytearray(path.read_bytes());b[690560]^=1;path.write_bytes(b)
   else:
    path=copy/'proposal/idl.rs';s=path.read_text();assert 'requested.min(10_000)' in s;s=s.replace('requested.min(10_000)','requested.min(1_000)');path.write_text(s)
    mp=copy/'manifest.json';m=json.loads(mp.read_text());m['files']['proposal/idl.rs']=H(path.read_bytes());mp.write_text(json.dumps(m,indent=2)+'\n')
   bad=run(py,copy);assert bad['returncode']!=0,(case,bad)
   results.append({'test':case,'expected_rejection':True,**bad})
 assert H((P/'manifest.json').read_bytes())==seal
 report={'kind':'static verifier portability and negative checks only','tested_pre_report_manifest_sha256':seal,'source_package_mutated_by_tests':False,'target_execution':False,'interpreter_paths_are_diagnostic_only':True,'checks':results}
 (P/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps({'pass':True,'checks':len(results),'target_execution':False}))
if __name__=='__main__':main(sys.argv[1:] or [sys.executable])
