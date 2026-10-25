#!/usr/bin/env python3
"""Verify historical inventories and preserved static studies; never execute builds."""
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
# Nested manifests are payload and must also be included in the outer seal.
actual = {str(p.relative_to(ROOT)) for p in paths if p.is_file() and p != ROOT / 'manifest.json'}
assert actual == set(seal['files'])
for name, digest in seal['files'].items():
    assert sha((ROOT / name).read_bytes()) == digest, name
index = json.loads((ROOT / 'publication-index.json').read_text())
for name, record in index['preserved_seals'].items():
    assert sha((ROOT / record['path']).read_bytes()) == record['sha256']
for record in index['research_packages'].values():
    assert sha((ROOT / record['path'] / 'manifest.json').read_bytes()) == record['manifest_sha256']
for record in index['additional_static_packages'].values():
    assert sha((ROOT / record['path'] / record['manifest']).read_bytes()) == record['manifest_sha256']
summary = json.loads((ROOT / 'gap-summary.json').read_text())
assert summary['semantic_source_completion_percent'] is None
for record in summary['later_checkpoint_notes']:
    assert sha((ROOT / record['copied_note']).read_bytes()) == record['note_sha256']
prefix = 'repro/function-inventory/2026-10-24-374fcf0/'
owned = json.loads((ROOT / 'owned-files.json').read_text())
assert owned == sorted(prefix + p for p in actual | {'manifest.json'})
checks = [
    'verify_pump_amm.py',
    'work/fees-mayhem-function-inventory/verify.py',
    'work/dependency-function-gap-inventory/verify.py',
    'work/pump-native-multicurve-static/verify.py',
    'work/pump-tokenkeg-two-curve-static/verify.py',
    'research/mayhem-burn-codec-followup/verify.py',
    'research/mayhem-error-abi-provenance/verify.py',
    'research/mayhem-linux-v152-build-plan/verify_plan.py',
    'research/darwin-sbf-postprocessing-provenance/verify.py',
    'research/fees-linux-recorded-pipeline-plan/verify_proposal.py',
]
passed = []
env = {**os.environ, 'PYTHONDONTWRITEBYTECODE': '1'}
for script in checks:
    command = [sys.executable, '-B']
    command += [str(ROOT / 'isolation_runner.py'), script] if args.audit else [str(ROOT / script)]
    result = subprocess.run(command, cwd=ROOT, env=env, text=True, capture_output=True)
    if result.returncode:
        sys.stderr.write(result.stdout + result.stderr)
        raise RuntimeError('Static verifier failed: ' + script)
    if args.audit:
        assert '"file_open_guard": "PASS"' in result.stdout, script
    passed.append(script)
print(json.dumps({'verified': True, 'sealed_files': len(actual), 'static_verifiers_passed': passed,
                  'preserved_inventories': 3, 'preserved_additional_studies': 7,
                  'external_file_open_audit': args.audit, 'semantic_completion_percent': None,
                  'builds': 0, 'new_runtime_cases': 0, 'sealed_payloads_modified': False}, indent=2))
