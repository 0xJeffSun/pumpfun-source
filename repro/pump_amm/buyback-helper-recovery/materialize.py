#!/usr/bin/env python3
"""Restore recorded compiler inputs only; never compile or execute the target."""
from pathlib import Path
import argparse,gzip,hashlib,json
p=argparse.ArgumentParser();p.add_argument('--variant',choices=['baseline','final'],required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();root=Path(__file__).resolve().parent;m=json.loads((root/'manifest.json').read_text());a.output.mkdir(parents=True,exist_ok=False)
def read(name):
 r=m[name];b=gzip.decompress((root/r['storage']).read_bytes());assert hashlib.sha256(b).hexdigest()==r['sha256'];return b
def write(name,target):target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(read(name))
for name in m:
 prefix='sources/'+a.variant+'/'
 if name.startswith(prefix):write(name,a.output/'source'/name[len(prefix):])
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']:write('recipe/'+name,a.output/'source/scripts'/name)
write('artifacts/original.so',a.output/'source/evidence/original/pump_amm/deployed.so')
write('recipe/root_remap.py',a.output/'root_remap.py');(a.output/'root_remap.py').chmod(0o755)
print(a.output)
