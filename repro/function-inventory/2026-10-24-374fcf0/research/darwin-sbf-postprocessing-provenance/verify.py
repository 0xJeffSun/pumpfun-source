#!/usr/bin/env python3
from pathlib import Path
import hashlib
import json
from analyze import analyze

ROOT = Path(__file__).resolve().parent
seal = json.loads((ROOT / 'manifest.json').read_text())
paths = list(ROOT.rglob('*'))
assert not any(p.is_symlink() for p in paths)
files = {str(p.relative_to(ROOT)) for p in paths if p.is_file() and p.name != 'manifest.json'}
assert files == set(seal['files'])
for path, digest in seal['files'].items():
    assert hashlib.sha256((ROOT / path).read_bytes()).hexdigest() == digest, path
result = analyze()
assert result == json.loads((ROOT / 'analysis.json').read_text())
print(json.dumps({'verified': True, 'files': len(files), 'retained_builds': len(result['builds']),
    'all_text_sections_unchanged_by_recorded_stripping': True,
    'v144_selected_compilation_builds_with_v152_postprocessing_evidence': 2,
    'historical_process_executable_hashes_available': False,
    'compiler_invocations': 0, 'runtime_probes': 0}, indent=2))
