#!/usr/bin/env python3
"""Portable static-only checker. Its two child scripts are inherited static verifiers."""
from pathlib import Path
import hashlib,json,subprocess,sys
import analyze
W=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 seal=(W/'MANIFEST.sha256').read_text().strip();blob=(W/'manifest.json').read_bytes()
 assert H(blob)==seal,'manifest seal'
 m=json.loads(blob);actual={str(p.relative_to(W)) for p in W.rglob('*') if p.is_file()}
 assert actual==set(m)|{'manifest.json','MANIFEST.sha256'},('file-set difference',actual^(set(m)|{'manifest.json','MANIFEST.sha256'}))
 for name,r in m.items():
  p=W/name;assert not p.is_symlink();b=p.read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256'],name
 for r in json.loads((W/'acquisition.json').read_text()):
  b=(W/r['path']).read_bytes();assert r['commit']=='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
  assert len(b)==r['bytes'] and H(b)==r['sha256']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob_sha1']
 r=json.loads((W/'original-provenance.json').read_text());b=(W/r['retained_path']).read_bytes()
 assert len(b)==r['bytes'] and H(b)==r['sha256']
 assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob_sha1']
 inherited={}
 for directory in ['layer01','baseline']:
  result=subprocess.run([sys.executable,'-B',str(W/directory/'verify.py')],cwd=W/directory,text=True,capture_output=True)
  assert result.returncode==0,(directory,result.stdout,result.stderr)
  inherited[directory]=json.loads(result.stdout)
 outputs=analyze.produce()
 for path,value in outputs.items():
  expected=value if isinstance(value,str) else analyze.dump(value)
  assert (W/path).read_text()==expected,path
 print(json.dumps(dict(status='pass',manifest_sha256=seal,sealed_files=len(m),regenerated_outputs=len(outputs),inherited_verifiers=inherited,original_windows=585,candidate_windows=546,whole_file_equal=False,source_proposal_accepted=False,target_executions=0,compiler_executions=0),indent=2))
if __name__=='__main__':main()
