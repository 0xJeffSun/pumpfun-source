#!/usr/bin/env python3
"""Verify the selected AMM checkpoint or a fresh replay of that exact artifact."""
from pathlib import Path
import argparse
import hashlib
import importlib.util
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = 'repro/pump_amm/error-order-recovery-20261027/results/build/candidate.so'
CANDIDATE = '8e69bb1b3d95dab5fb398f7842efbb9d2234075ec206fa447060bdd92714f328'
MANIFEST = '527d3ea27c4710bab497b38de651db75f057a0712d5109e0a6dda8ca3c1aace2'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify(root=ROOT, runtime=None):
    root = Path(root).resolve()
    selected = json.loads((root / 'repro/status.json').read_text())['pump_amm']
    assert selected['candidate_artifact'] == ARTIFACT
    assert selected['candidate_sha256'] == CANDIDATE
    candidate = root / ARTIFACT
    checkpoint = candidate.parents[2]
    assert sha(candidate) == CANDIDATE
    assert sha(checkpoint / 'results/manifest.json') == MANIFEST
    record = json.loads((checkpoint / 'results/build/build-comparison.json').read_text())
    for name, digest in record['source_sha256'].items():
        relative = 'programs/pump-amm/' + name.split('programs/pump-amm/', 1)[1]
        assert sha(root / relative) == digest, relative
    if runtime is None:
        result = subprocess.run(
            [sys.executable, '-B', str(checkpoint / 'verify_saved.py'), '--current-source'],
            cwd=root, text=True, capture_output=True, check=True,
        )
        report = json.loads(result.stdout.strip().splitlines()[-1])
        assert report['current_source_checked'] and report['candidate_sha256'] == CANDIDATE
        return {'status': 'PASS', 'program': 'pump_amm', **report}
    runtime = Path(runtime).resolve()
    inputs = json.loads((runtime / 'inputs.json').read_text())
    assert inputs['candidate_sha256'] == CANDIDATE
    for name, digest in inputs['harness_sha256'].items():
        assert sha(root / name) == digest, name
    assert inputs['observer_sha256'] == sha(root / 'repro/pump_amm/owner6048-v144/runtime/observe_suite.py')
    spec = importlib.util.spec_from_file_location('selected_amm_audit', checkpoint / 'compare_direct_cached.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    report = module.audit(runtime, CANDIDATE)
    assert report['cases'] == 17462 and not report['mismatches']
    return {'status': 'PASS', 'program': 'pump_amm', 'candidate_sha256': CANDIDATE, **report}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=ROOT)
    parser.add_argument('--runtime', type=Path)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo, args.runtime), indent=2))
