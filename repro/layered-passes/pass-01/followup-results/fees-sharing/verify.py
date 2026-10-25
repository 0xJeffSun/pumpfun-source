#!/usr/bin/env python3
"""Read-only offline verifier; no target/harness execution."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import hashlib,json,subprocess
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def main():
 raw=(W/'manifest.json').read_bytes();seal=(W/'MANIFEST.sha256').read_text().strip()
 assert sha(raw)==seal
 manifest=json.loads(raw)
 actual={str(p.relative_to(W)) for p in W.rglob('*') if p.is_file()}
 assert actual==set(manifest)|{'manifest.json','MANIFEST.sha256'},actual^set(manifest)
 for name,v in manifest.items():
  p=W/name;assert not p.is_symlink();b=p.read_bytes();assert len(b)==v['bytes'] and sha(b)==v['sha256'],name
 for v in json.loads((W/'input-origins.json').read_text()):
  b=(W/v['path']).read_bytes();assert sha(b)==v['sha256']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==v['git_blob_sha1']
  assert v['commit']=='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
 # Only the reviewed static verifier runs. No saved harness is imported.
 result=subprocess.run([sys.executable,'-B',str(W/'layer01/verify.py')],cwd=W/'layer01',capture_output=True,text=True)
 assert result.returncode==0,result.stderr+result.stdout
 import analyze_sharing
 outputs,patch,source=analyze_sharing.generate()
 for n,v in outputs.items():assert (W/n).read_text()==analyze_sharing.dump(v),n
 assert (W/'pending-sharing.patch').read_text()==patch
 assert (W/'pending-sharing_update.rs').read_text()==source
 print(json.dumps(dict(status='pass',manifest_sha256=seal,files=len(manifest),focused_ledgers=len(outputs),nested=json.loads(result.stdout),target_executions=0,builds=0,accepted_source_changes=0,whole_original_equal=False),sort_keys=True))
if __name__=='__main__':main()
