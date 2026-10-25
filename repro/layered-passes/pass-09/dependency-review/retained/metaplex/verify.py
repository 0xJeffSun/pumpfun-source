#!/usr/bin/env python3
"""Portable read-only verifier; does not run saved harnesses or programs."""
import hashlib,json,runpy,sys
from pathlib import Path
p=Path(__file__).resolve().parent
m=json.loads((p/'manifest-sha256.json').read_text())
actual={str(x.relative_to(p)) for x in p.rglob('*') if x.is_file() and x.name!='manifest-sha256.json' and '__pycache__' not in x.parts}
# Nested retained manifests ARE inputs; only the package root manifest is omitted.
actual={str(x.relative_to(p)) for x in p.rglob('*') if x.is_file() and x!=p/'manifest-sha256.json' and '__pycache__' not in x.parts}
assert actual==set(m), (actual-set(m),set(m)-actual)
for n,h in m.items():assert hashlib.sha256((p/n).read_bytes()).hexdigest()==h,n
sys.argv=[str(p/'analyze.py')]
runpy.run_path(str(p/'analyze.py'),run_name='__main__')
print(json.dumps({'sealed_files_verified':len(m),'runtime_probes':0,'builds':0}))
