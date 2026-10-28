#!/usr/bin/env python3
"""Rewrite manifest.json: SHA-256 of every packet file except manifest.json itself."""
import hashlib, json, sys
from pathlib import Path

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parents[1]
files = sorted(f for f in P.rglob('*') if f.is_file() and f != P / 'manifest.json')
assert not any(f.is_symlink() for f in P.rglob('*'))
manifest = {f.relative_to(P).as_posix(): hashlib.sha256(f.read_bytes()).hexdigest() for f in files}
(P / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(len(manifest), 'files')
