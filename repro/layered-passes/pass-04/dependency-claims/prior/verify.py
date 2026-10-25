#!/usr/bin/env python3
"""Standalone offline verification. No target execution, build, network, or writes."""
import hashlib,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def load(n):return json.loads((P/n).read_text())
manifest=load('manifest.json')
assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0], 'manifest seal'
all_paths=list(P.rglob('*'));assert not any(p.is_symlink() for p in all_paths),'symlink forbidden'
actual={str(p.relative_to(P)) for p in all_paths if p.is_file()}
assert actual==set(manifest)|{'manifest.json','manifest.sha256'}, 'unexpected or missing file'
for n,r in manifest.items():
 b=(P/n).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256'],n
owned=load('ownedmap.json');assert {r['path'] for r in owned['files']}==actual,'ownedmap coverage'
prov=load('input-provenance.json');assert len({r['path'] for r in prov})==len(prov)
for r in prov:
 b=(P/r['path']).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256'],r['path']
assert {r['path'] for r in prov}=={n for n in actual if n.startswith('inputs/')},'input allowlist coverage'
# Old manifests preserved verbatim. Verify all selected files they bind,
# not the omitted runtime material or the entire previous packages.
old_a=load('inputs/ata/baseline/manifest.json');old_m=load('inputs/metaplex/baseline/manifest-sha256.json')
assert H((P/'inputs/ata/baseline/manifest.json').read_bytes())==(P/'inputs/ata/baseline/manifest.sha256').read_text().split()[0]
old_verified=0
prefix='repro/layered-passes/pass-01/results/'
for r in prov:
 if not r['source'].startswith(prefix):continue
 d,rel=r['source'][len(prefix):].split('/',1);old=old_a if d=='ata' else old_m
 if rel in old:
  expected=old[rel]['sha256'] if isinstance(old[rel],dict) else old[rel]
  assert r['sha256']==expected,('old seal',r['path']);old_verified+=1
# Import only this package's pure static analyzer, never retained build scripts.
sys.path.insert(0,str(P))
import analyze
assert analyze.derive()==load('evidence.json'),'static evidence mismatch'
print(json.dumps({'status':'passed','payload_files':len(manifest),'inputs':len(prov),'selected_old_seal_bindings':old_verified,'manifest_sha256':H((P/'manifest.json').read_bytes()),'builds':0,'runtime_executions':0,'whole_original_equality':{'ata':False,'metaplex':False},'new_recipe':None},sort_keys=True))
