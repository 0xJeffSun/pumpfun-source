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
