#!/usr/bin/env python3
"""Write MANIFEST.json (sha256 of every packet file except itself and caches)."""
import hashlib
import json
from pathlib import Path

P = Path(__file__).resolve().parents[1]
files = sorted(str(f.relative_to(P)) for f in P.rglob('*')
               if f.is_file() and '__pycache__' not in f.parts and f.name != 'MANIFEST.json')
(P / 'MANIFEST.json').write_text(json.dumps({f: hashlib.sha256((P / f).read_bytes()).hexdigest() for f in files}, indent=1) + '\n')
print(len(files), 'files')
