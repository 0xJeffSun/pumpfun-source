#!/usr/bin/env python3
"""Read-only portable verification. No subprocesses, target execution or network."""
from pathlib import Path
import hashlib,json
import analyze
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def main():
 seal=(W/'MANIFEST.sha256').read_text().strip();manifest_bytes=(W/'manifest.json').read_bytes()
 assert sha(manifest_bytes)==seal,'manifest digest'
 manifest=json.loads(manifest_bytes)
 actual={str(p.relative_to(W)) for p in W.rglob('*') if p.is_file()}
 assert actual==set(manifest)|{'manifest.json','MANIFEST.sha256'},('file set',actual^set(manifest))
 for name,rec in manifest.items():
  p=W/name;assert not p.is_symlink(),name;b=p.read_bytes()
  assert len(b)==rec['bytes'] and sha(b)==rec['sha256'],name
 origins=json.loads((W/'input-origins.json').read_text())
 for r in origins:
  b=(W/r['path']).read_bytes()
  assert r['commit']=='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
  assert r['sha256']==sha(b) and r['bytes']==len(b)
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob_sha1'],r['path']
 regenerated=analyze.analyze()
 for name,value in regenerated.items():assert (W/name).read_bytes()==analyze.dump(value).encode(),name
 print(json.dumps(dict(status='pass',manifest_sha256=seal,sealed_files=len(manifest),frozen_inputs=len(origins),regenerated_ledgers=len(regenerated),original_windows=regenerated['result.json']['inventory']['original_ranges'],candidate_windows=regenerated['result.json']['inventory']['candidate_ranges'],whole_file_equal=False,target_executions=0),sort_keys=True))
if __name__=='__main__':main()
