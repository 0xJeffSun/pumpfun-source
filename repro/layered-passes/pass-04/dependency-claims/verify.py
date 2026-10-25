#!/usr/bin/env python3
"""Portable offline verifier. Python standard library only; writes nothing."""
import sys,json,hashlib
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def load(n):return json.loads((P/n).read_text())
def check(ok,msg):
 if not ok:raise ValueError(msg)
check(not sys.flags.optimize,'Run without -O; derivation uses assertions')
m=load('manifest.json');check(H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0],'manifest seal')
paths=list(P.rglob('*'));check(not any(p.is_symlink() for p in paths),'symlink')
actual={str(p.relative_to(P)) for p in paths if p.is_file()}
check(actual==set(m)|{'manifest.json','manifest.sha256'},'exact file allowlist')
for n,r in m.items():
 b=(P/n).read_bytes();check(len(b)==r['bytes'] and H(b)==r['sha256'],n)
check({r['path'] for r in load('ownedmap.json')['files']}==actual,'ownedmap')
inputs=load('input-map.json')
check(len({r['path'] for r in inputs})==len(inputs),'duplicate input')
for r in inputs:
 b=(P/r['path']).read_bytes();check(len(b)==r['bytes'] and H(b)==r['sha256'],r['path'])
 check(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob_sha1'],'blob digest')
check({r['path'] for r in inputs}=={n for n in actual if n.startswith(('prior/','claims/','pass01/','context/'))},'input map coverage')
# Historical manifest is unchanged. Its one excluded cache is NOT republished or certified.
pm=load('prior/manifest.json');check(H((P/'prior/manifest.json').read_bytes())==(P/'prior/manifest.sha256').read_text().split()[0],'historical manifest seal')
omitted=[]
for n,r in pm.items():
 if '__pycache__' in Path(n).parts or n.endswith('.pyc'):omitted.append(n);continue
 b=(P/'prior'/n).read_bytes();check(len(b)==r['bytes'] and H(b)==r['sha256'],'prior seal '+n)
check(omitted==['__pycache__/analyze.cpython-314.pyc'],'historical exclusion')
sys.path.insert(0,str(P));import analyze
check(analyze.derive()==load('facts.json'),'rederived raw/CFG facts')
print(json.dumps(dict(status='passed',inputs=len(inputs),payload_files=len(m),manifest_sha256=H((P/'manifest.json').read_bytes()),metaplex_nonjump_cfg_instructions_per_side=580,ata_raw_differences=307,metaplex_raw_differences=1509,whole_original_equality=False,new_builds=0,new_runtime_executions=0,historical_cache_payload_excluded=omitted),sort_keys=True))
