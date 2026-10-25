#!/usr/bin/env python3
"""Recompute saved Pump/AMM tables without writing the sealed inventories."""
from pathlib import Path
import hashlib
import json
import sys
from unittest.mock import patch

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parent
W = ROOT / 'work/pump-amm-current-body-inventory'
sys.path.insert(0, str(W))
import catalog

sha = lambda data: hashlib.sha256(data).hexdigest()
assert catalog.ROOT == ROOT and catalog.HERE == W
seal = json.loads((W / 'manifest-sha256.json').read_text())
for path, record in seal.items():
    data = (W / path).read_bytes()
    assert sha(data) == record['sha256'] and len(data) == record['bytes']
inputs = json.loads((W / 'input-manifest.json').read_text())
for path, record in inputs.items():
    data = (ROOT / path).read_bytes()
    assert sha(data) == record['sha256'] and len(data) == record['bytes']
saved = {}


def verify_write(path, data, *args, **kwargs):
    # The original generator writes its table at the end. Compare the exact
    # bytes it would write, while preserving the sealed published file.
    assert path in [W / 'pump-bodies.json', W / 'pump_amm-bodies.json']
    assert data.encode() == path.read_bytes()
    saved[path.name] = True
    return len(data)


reports = {}
with patch.object(Path, 'write_text', verify_write):
    for name, settings in catalog.PROGRAMS.items():
        reports[name] = catalog.catalog(name, settings)
assert len(saved) == 2
assert {n: r['summary'] for n, r in reports.items()} == json.loads((W / 'body-summary.json').read_text())
bindings = json.loads((W / 'source-bindings.json').read_text())
for source_map in bindings['source_maps'].values():
    for path, digest in source_map.items():
        assert sha((ROOT / path).read_bytes()) == digest
print(json.dumps({'verified': True, 'input_files': len(inputs), 'table_bytes_reproduced': True,
                  'programs': {n: r['summary'] for n, r in reports.items()},
                  'sealed_files_written': 0, 'builds': 0, 'runtime_probes': 0}, indent=2))
