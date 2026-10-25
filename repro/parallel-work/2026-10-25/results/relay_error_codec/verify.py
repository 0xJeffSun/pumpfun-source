#!/usr/bin/env python3
"""Location-independent, stdlib-only, static verification; never builds/runs SBF."""
import sys
sys.dont_write_bytecode=True
import hashlib,json,tarfile
from pathlib import Path
from derive import derive
R=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
manifest=json.loads((R/'manifest-sha256.json').read_text())
actual={p.relative_to(R).as_posix():sha(p.read_bytes()) for p in R.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
assert actual==manifest,'manifest mismatch / unexpected file'
for item in json.loads((R/'provenance.json').read_text()):
 b=(R/item['path']).read_bytes();assert sha(b)==item['sha256'] and len(b)==item['bytes']
 if 'git_blob' in item:
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==item['git_blob']
 else:
  with tarfile.open(R/item['archive']) as t:assert t.extractfile(item['member']).read()==b
assert derive()==json.loads((R/'static-evidence.json').read_text()),'static derivation mismatch'
result=json.loads((R/'result.json').read_text());assert not result['exact_error_abi_recovered'] and not result['rust_fragments_supplied']
print(json.dumps(dict(status='pass',files=len(actual),binary_sha256=result['binary_sha256'],scope='hash/provenance/static operands and selected dataflow; not execution or semantic equivalence')))
