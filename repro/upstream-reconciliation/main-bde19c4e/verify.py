#!/usr/bin/env python3
"""Verify preserved reconciliation evidence without running imported code."""
import argparse
import hashlib
import json
from pathlib import Path

P = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('--current', type=Path)
args = parser.parse_args()
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
manifest = json.loads((P / 'manifest.json').read_text())
assert sha(P / 'manifest.json') == (P / 'manifest.sha256').read_text().split()[0]
actual = {str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in (P / 'manifest.json', P / 'manifest.sha256')}
assert set(manifest) == actual
for name, digest in manifest.items():
    f = P / name
    assert not f.is_symlink() and sha(f) == digest, name
record = json.loads((P / 'resolution.json').read_text())
assert record['target_executions'] == 0 and record['active_protected_tree_equal_to_base']
assert len(record['paths']) == record['incoming_paths'] == 266
for row in record['paths']:
    path = row['path']
    if row['disposition'].startswith('accepted active'):
        assert sha(P / 'upstream-files' / path) == row['upstream_sha256']
    if args.current:
        f = args.current / path
        assert (sha(f) if f.is_file() else None) == row['resolved_sha256'], path
accepted = P / 'accepted-files'
if args.current:
    for f in accepted.rglob('*'):
        if f.is_file():
            target = args.current / f.relative_to(accepted)
            assert target.is_file() and not target.is_symlink() and sha(target) == sha(f), target
    expect = {str(f.relative_to(accepted)) for f in (accepted / 'programs/pump').rglob('*') if f.is_file()}
    present = {str(f.relative_to(args.current)) for f in (args.current / 'programs/pump').rglob('*') if f.is_file()}
    assert present == expect, present ^ expect
print(json.dumps({'status': 'PASS', 'incoming_paths': 266, 'current_checked': bool(args.current), 'target_executions': 0}))
