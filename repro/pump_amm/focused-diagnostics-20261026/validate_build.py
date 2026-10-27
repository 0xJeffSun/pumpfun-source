#!/usr/bin/env python3
"""Validate an actual Darwin source build without claiming the Linux recipe."""
import argparse
import hashlib
import json
from pathlib import Path
import platform
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[3]
BOOST = ROOT / 'repro/pump_amm/boost-burn-diagnostics'
sys.path.insert(0, str(BOOST))
import boost


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--build', required=True, type=Path)
    parser.add_argument('--source', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    build, source, output = args.build.resolve(), args.source.resolve(), args.output.resolve()
    output.mkdir(parents=True, exist_ok=False)
    actual = json.loads((build / 'build-comparison.json').read_text())
    attempt = json.loads((build / 'build-attempt.json').read_text())
    assert attempt['returncode'] == 0 and attempt['source_unchanged']
    assert actual['build_log_sha256'] == sha(build / 'build.log')
    expected = boost.expected_source(ROOT)
    assert {name: sha(source / name) for name in expected} == expected
    prefix = source.relative_to(ROOT).as_posix() + '/'
    assert actual['source_sha256'] == {prefix + name: value for name, value in expected.items()}
    assert attempt['source_sha256'] == attempt['source_after_sha256'] == actual['source_sha256']
    candidate = build / 'artifacts/pump_amm_recovered.so'
    assert actual['comparison']['candidate_sha256'] == sha(candidate)
    record = {
        'kind': 'liquidity-sweep-migration-boost-corrected',
        'accepted_build': True, 'returncode': 0, 'source_unchanged': True,
        'source_sha256': expected, 'source_after_sha256': expected,
        'candidate_sha256': sha(candidate), 'candidate_bytes': candidate.stat().st_size,
        'prior_candidate_sha256': boost.PRIOR_SHA,
        'prior_build_record_sha256': boost.PRIOR_RECORD_SHA,
        'source_patch_sha256': sha(BOOST / 'source.patch'),
        'build_comparison_path': str(build / 'build-comparison.json'),
        'build_comparison_sha256': sha(build / 'build-comparison.json'),
        'build_attempt_sha256': sha(build / 'build-attempt.json'),
        'platform': platform.platform(),
        'scope': 'Actual local Darwin build with authenticated cumulative source. This is not a reproduction of the prior Linux compiler recipe. Accepted build denotes compiler success only; runtime gates follow.'
    }
    path = output / 'build-record.json'
    path.write_text(json.dumps(record, indent=2) + '\n')
    command = [sys.executable, '-B', str(BOOST / 'runtime_probe.py'), '--repo', str(ROOT),
               '--candidate', str(candidate), '--build-record', str(path), '--output', str(output / 'runtime.json')]
    with (output / 'runtime.log').open('w') as log:
        result = subprocess.run(command, cwd=ROOT, stdout=log, stderr=subprocess.STDOUT)
    (output / 'command.json').write_text(json.dumps({'command': command, 'returncode': result.returncode,
        'log_sha256': sha(output / 'runtime.log')}, indent=2) + '\n')
    result.check_returncode()
    print((output / 'runtime.log').read_text())


if __name__ == '__main__':
    main()
