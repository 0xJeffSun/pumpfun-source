#!/usr/bin/env python3
"""Offline portable seal and full static-rederivation verifier. Writes nothing."""
import sys,json,hashlib,subprocess
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
manifest=P/'manifest.json'
assert H(manifest.read_bytes())==(P/'manifest.sha256').read_text().split()[0],'manifest seal'
sealed=json.loads(manifest.read_text())
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}-{'manifest.json','manifest.sha256'}
assert actual==set(sealed),'unexpected or missing package file'
for n,r in sealed.items():
 b=(P/n).read_bytes();assert H(b)==r['sha256'] and len(b)==r['bytes'],n
prov=json.loads((P/'input-provenance.json').read_text())
assert prov['commit']=='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
for r in prov['files']:
 b=(P/'inputs'/r['path']).read_bytes()
 assert H(b)==r['sha256'] and len(b)==r['bytes'],r['path']
 assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],r['path']
subprocess.run([sys.executable,'-B',str(P/'analyze.py')],cwd=P,check=True)
subprocess.run([sys.executable,'-B',str(P/'inputs/repro/parallel-work/2026-10-24/results/ata_recipe/evidence/verify.py')],cwd=P,check=True)
print(json.dumps({'portable_verification':'passed','sealed_files':len(sealed),'frozen_git_blobs':len(prov['files']),'manifest_sha256':H(manifest.read_bytes())},sort_keys=True))
