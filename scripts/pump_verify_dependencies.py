#!/usr/bin/env python3
"""Verify saved dependency registry evidence against captured binaries; no network."""
import hashlib, json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
registry = json.loads((ROOT/'repro/pump/dependency-verification-registry.json').read_text())
results = {}
for name in ['spl_token', 'spl_token_2022']:
    b = (ROOT/'evidence/dependencies'/name/'deployed.so').read_bytes()
    # The verifier's executable digest removes trailing zero allocation bytes.
    normalized = b.rstrip(b'\0')
    h = hashlib.sha256(normalized).hexdigest()
    row = registry['results'][name]
    assert row['is_verified'] is True
    assert h == row['on_chain_hash'] == row['executable_hash']
    results[name] = {'captured_bytes':len(b), 'normalized_bytes':len(normalized),
                     'normalized_sha256':h, 'source_commit':row['commit'],
                     'scope':'Saved third-party verified-build attribution matches capture; not a fresh local source rebuild.'}
print(json.dumps(results, indent=2))
# This is a separate fresh source-build proof, rather than registry attribution.
proof_dir=ROOT/'repro/pump/verified-spl-token'
proof=json.loads((proof_dir/'comparison.json').read_text())
built=(proof_dir/'pinocchio_token_program.so').read_bytes()
captured=(ROOT/'evidence/dependencies/spl_token/deployed.so').read_bytes()
assert built==captured
assert hashlib.sha256(built).hexdigest()==proof['candidate_sha256']==proof['original_sha256']
for filename,field in [('source-manifest.json','source_manifest_sha256'),('build.log','build_log_sha256')]:
 assert hashlib.sha256((proof_dir/filename).read_bytes()).hexdigest()==proof[field]
assert proof['full_byte_equality'] is True
assert proof['source_commit']==registry['results']['spl_token']['commit']
images=json.loads((proof_dir/'image-inspect.json').read_text())
assert proof['image'] in images[0]['RepoDigests']
print('SPL Token fresh Linux source build: full',len(built),'byte equality confirmed; SHA-256',proof['candidate_sha256'])
