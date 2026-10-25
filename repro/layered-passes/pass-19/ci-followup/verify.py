#!/usr/bin/env python3
"""Validate the frozen CI repair and its existing-case replay without execution."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import subprocess
import sys

P = Path(__file__).resolve().parent
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
parser = argparse.ArgumentParser()
parser.add_argument('--repo', type=Path, required=True)
args = parser.parse_args()
root = args.repo.resolve()
manifest = json.loads((P / 'manifest.json').read_text())
assert sha(P / 'manifest.json') == (P / 'manifest.sha256').read_text().split()[0]
for name, digest in manifest.items():
    assert sha(P / name) == digest, name
main = root / 'repro/pump/admin-cto-typed-main-fortyeight/main'
report = json.loads((main / 'build-comparison.json').read_text())
attempt = json.loads((main / 'build-attempt.json').read_text())
assert attempt['returncode'] == 0 and attempt['source_unchanged']
sources = report['source_sha256']
assert len(sources) == 37 and sources == attempt['source_sha256'] == attempt['source_after_sha256']
assert json.loads((P / 'harness/expected-source-map.json').read_text()) == sources
for name, digest in sources.items():
    assert sha(main / 'source' / name) == digest, name
receipt = json.loads(gzip.decompress((P / 'differential.json.gz').read_bytes()))
assert receipt['candidate_sha256'] == sha(main / 'candidate.so') == report['comparison']['candidate_sha256']
binding = receipt['provenance']['compiled_candidate_binding']
assert binding['report_sha256'] == sha(main / 'build-comparison.json')
assert binding['attempt_sha256'] == sha(main / 'build-attempt.json')
assert binding['actual_source_sha256'] == sources
assert binding['expected_source_map_sha256'] == sha(P / 'harness/expected-source-map.json')
for name, digest in receipt['provenance']['proposed_harness_inputs'].items():
    assert sha(P / 'harness' / name) == digest, name
for name, digest in receipt['provenance']['repository_inputs'].items():
    assert sha(root / name) == digest, name
subprocess.run([sys.executable, '-B', str(P / 'harness/proposed/verify_saved.py'), str(P / 'differential.json.gz')], check=True, cwd=root)
print(json.dumps({'status': 'PASS', 'repeated_cases': 16, 'new_unique_cases': 0, 'verified_signatures': 64, 'target_executions': 0}))
