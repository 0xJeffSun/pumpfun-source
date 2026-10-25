#!/usr/bin/env python3
"""Read-only portable integrity and static recomputation; no network or ELF execution."""
import hashlib,json,runpy,sys
from pathlib import Path
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((P/'manifest-sha256.json').read_text())
files={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json' and '__pycache__' not in p.parts}
assert files==set(m),(files-set(m),set(m)-files)
for n,h in m.items():assert sha((P/n).read_bytes())==h,n
for r in json.loads((P/'inputs.json').read_text()):
 b=(P/r['path']).read_bytes();assert len(b)==r['size'] and sha(b)==r['sha256']
 assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],r['path']
sys.argv=[str(P/'prior/verify.py')]
runpy.run_path(str(P/'prior/verify.py'),run_name='__main__')
sys.argv=[str(P/'analyze.py')]
runpy.run_path(str(P/'analyze.py'),run_name='__main__')
print(json.dumps(dict(portable_static_verification=True,sealed_files=len(m),target_executions=0,builds=0)))
