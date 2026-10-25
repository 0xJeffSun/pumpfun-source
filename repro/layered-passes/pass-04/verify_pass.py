#!/usr/bin/env python3
"""Verify this pass's frozen packets and all byte ranges without executing targets."""
from pathlib import Path
import argparse
import hashlib
import json
import os
import subprocess
import sys

P = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('--repo', type=Path, required=True)
parser.add_argument('--runtime-signatures', action='store_true')
args = parser.parse_args()
root = args.repo.resolve()
env = {**os.environ, 'PYTHONDONTWRITEBYTECODE': '1'}
results = []
for row in json.loads((P / 'packets.json').read_text()):
    package = root / row['path']
    assert hashlib.sha256((package / row['manifest']).read_bytes()).hexdigest() == row['sha256'], row['path']
    command = [sys.executable, '-B', str(package / 'verify.py')]
    if row['path'].endswith('build06-ordinary12'):
        command += ['--repo', str(root)]
        if args.runtime_signatures:
            command += ['--runtime']
    run = subprocess.run(command, cwd=root, env=env, capture_output=True, text=True)
    assert run.returncode == 0, (row['path'], run.returncode, run.stdout, run.stderr)
    results.append({'path': row['path'], 'returncode': run.returncode,
                    'stdout_sha256': hashlib.sha256(run.stdout.encode()).hexdigest()})
for name in ['before-corrections', 'after-corrections']:
    run = subprocess.run([sys.executable, '-B', str(P / 'verify_comparison.py'), str(P / name), '--repo', str(root)],
                         cwd=root, env=env, capture_output=True, text=True)
    assert run.returncode == 0, (name, run.stdout, run.stderr)
    results.append({'snapshot': name, 'returncode': run.returncode,
                    'stdout_sha256': hashlib.sha256(run.stdout.encode()).hexdigest()})
print(json.dumps({'status': 'PASS', 'target_executions': 0,
                  'runtime_signature_reverification': args.runtime_signatures, 'results': results}, indent=2))
