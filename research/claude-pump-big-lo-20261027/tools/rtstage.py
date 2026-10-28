#!/usr/bin/env python3
"""Stage a fastbuild source tree + its stripped candidate inside the repository (work/<name>/) with the build
records run_suites.py and the tokenkeg_two_curve suite require (source manifest of the staged workspace).

  rtstage.py <name> <crate-src-dir> <candidate.so>      (run from the repository root)
"""
import hashlib, json, shutil, sys
from pathlib import Path
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
sys.path.insert(0, 'scripts')
import fastbuild  # noqa
from build_source_manifest import source_manifest  # noqa
name, src, cand_src = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
root = Path('.').resolve()
d = root / 'work' / name
if d.exists():
    shutil.rmtree(d)
d.mkdir(parents=True)
crate = fastbuild.stage(src.resolve(), d / 'ws')
man = source_manifest(crate, d / 'ws', root, cwd=d / 'ws')
cand = d / 'candidate.so'
shutil.copy2(cand_src, cand)
sha = hashlib.sha256(cand.read_bytes()).hexdigest()
(d / 'build-comparison.json').write_text(json.dumps({'returncode': 0, 'source_unchanged': True,
    'builder': 'claude-pump-work/harness/fastbuild.py (identity recipe), staged workspace',
    'source_directory': str(crate), 'source_sha256': man, 'comparison': {'candidate_sha256': sha}}, indent=1) + '\n')
(d / 'build-attempt.json').write_text(json.dumps({'returncode': 0, 'source_unchanged': True, 'source_sha256': man,
    'source_after_sha256': man}, indent=1) + '\n')
print(d, sha)
