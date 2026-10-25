#!/usr/bin/env python3
"""Verify evidence-only worker packages; never execute build/runtime harnesses."""
from pathlib import Path
import argparse
import hashlib
import json
import os
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
sha = lambda data: hashlib.sha256(data).hexdigest()
parser = argparse.ArgumentParser()
parser.add_argument('--audit', action='store_true')
args = parser.parse_args()
seal = json.loads((ROOT / 'manifest.json').read_text())
paths = list(ROOT.rglob('*'))
assert not any(p.is_symlink() for p in paths)
files = {str(p.relative_to(ROOT)) for p in paths if p.is_file() and p != ROOT / 'manifest.json'}
assert files == set(seal['files'])
for path, digest in seal['files'].items():
    assert sha((ROOT / path).read_bytes()) == digest, path
index = json.loads((ROOT / 'publication-index.json').read_text())
excluded = {'events.jsonl', 'process.json', 'prompt.txt', 'exit.json', 'final.txt', 'stderr.log', 'supervisor.log'}
assert len(index['lanes']) == 8
passed = []
env = {**os.environ, 'PYTHONDONTWRITEBYTECODE': '1'}
for lane in index['lanes']:
    directory = ROOT / lane
    evidence = directory / 'evidence'
    manifest = json.loads((directory / 'evidence-manifest.json').read_text())
    actual = {str(p.relative_to(evidence)) for p in evidence.rglob('*') if p.is_file()}
    assert actual == set(manifest), lane
    assert not (set(p.name for p in evidence.iterdir()) & excluded)
    assert not any('__pycache__' in Path(p).parts or p.endswith('-keypair.json') for p in actual)
    for path, digest in manifest.items():
        assert sha((evidence / path).read_bytes()) == digest, (lane, path)
    packaging = json.loads((directory / 'packaging.json').read_text())
    assert not packaging['verifier_modified'] and not packaging['analysis_report_modified']
    correction = packaging.get('packaging_correction')
    for record in packaging['source_copy_hashes']:
        path = record['path']
        if correction and path == correction['corrected_file']:
            original = directory / 'packaging-history' / ('original-' + path)
            assert sha(original.read_bytes()) == record['sha256'] == correction['original_manifest_sha256']
            assert sha((evidence / path).read_bytes()) == correction['corrected_manifest_sha256']
        else:
            data = (evidence / path).read_bytes()
            assert sha(data) == record['sha256'] and len(data) == record['bytes'], (lane, path)
    script = lane + '/evidence/verify.py'
    command = [sys.executable, '-B']
    command += [str(ROOT / 'isolation_runner.py'), script] if args.audit else [str(ROOT / script)]
    result = subprocess.run(command, cwd=ROOT, env=env, text=True, capture_output=True)
    if result.returncode:
        sys.stderr.write(result.stdout + result.stderr)
        raise RuntimeError('Copied verifier failed: ' + lane)
    if args.audit:
        assert '"file_open_guard": "PASS"' in result.stdout
    passed.append(lane)
prefix = 'repro/parallel-work/2026-10-24/results/'
assert json.loads((ROOT / 'owned-files.json').read_text()) == sorted(prefix + p for p in files | {'manifest.json'})
print(json.dumps({'verified': True, 'evidence_lanes': passed, 'sealed_payload_files': len(files),
                  'packaging_only_manifest_corrections': 2, 'worker_verifiers_modified': 0,
                  'analysis_reports_modified': 0, 'external_file_open_audit': args.audit,
                  'new_builds': 0, 'new_runtime_cases': 0, 'audit_coverage_complete': False}, indent=2))
