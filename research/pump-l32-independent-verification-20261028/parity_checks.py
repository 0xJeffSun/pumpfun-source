#!/usr/bin/env python3
"""Fail-closed helpers for L32 independent verification controls."""
from pathlib import Path
import base64
import hashlib
import json
import re

SWEEP = 'Program log: Nothing to sweep for fee bucket {}'
CASHBACK = 'Program log: No cashback to claim'
COMPUTE = re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')


def require(condition, message='evidence validation failed'):
    if not condition:
        raise RuntimeError(message)


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def normalized_logs(lines):
    return [line for line in lines if not COMPUTE.fullmatch(line)]


def structured_view(outcome):
    result = {
        key: value for key, value in outcome.items()
        if key not in (
            'logs', 'relevant_logs', 'transaction_base64', 'compute_units',
            'compute_units_consumed', 'program_sha256',
        )
    }
    if 'metadata' in result:
        result['metadata'] = {
            key: value for key, value in result['metadata'].items()
            if key not in ('logs', 'compute_units_consumed')
        }
    return result


def case_digest(case):
    raw = json.dumps(case, sort_keys=True, separators=(',', ':')).encode()
    return hashlib.sha256(raw).hexdigest()


def verify_signed_transaction(encoded):
    from solders.transaction import VersionedTransaction
    raw = base64.b64decode(encoded, validate=True)
    results = VersionedTransaction.from_bytes(raw).verify_with_results()
    require(bool(results) and all(results), 'transaction signature verification failed')


def require_digest(blob, expected):
    require(hashlib.sha256(blob).hexdigest() == expected, 'digest mismatch')


def verify_manifest(folder, manifest):
    folder = Path(folder)
    actual = {
        str(path.relative_to(folder)) for path in folder.rglob('*')
        if path.is_file() and path.name != 'MANIFEST.json'
    }
    require(actual == set(manifest), f'unexpected files: {sorted(actual ^ set(manifest))}')
    require(all(not path.is_symlink() for path in folder.rglob('*')), 'symlink rejected')
    for relative, expected in manifest.items():
        path = folder / relative
        require(path.is_file() and not path.is_symlink(), f'missing file: {relative}')
        require(sha256(path) == expected, f'digest mismatch: {relative}')


def validate_case_identities(rows):
    require(len({row['path'] for row in rows}) == len(rows), 'duplicate path')
    require(len({(row['suite'], row['index']) for row in rows}) == len(rows),
            'duplicate suite/index')
    for row in rows:
        require(row['path'] == f"{row['suite']}/cases/{row['index']}", 'path mismatch')
        require(row['case_sha256'] == case_digest(row['case']), 'case digest mismatch')


def validate_synthetic_matrix(rows):
    """Validate small controls for message placement and structured parity."""
    validate_case_identities(rows)
    for row in rows:
        case = row['case']
        original = row['original']
        baseline = row['baseline']
        candidate = row['candidate']
        require(structured_view(candidate) == structured_view(original), row['path'])
        require(structured_view(baseline) == structured_view(original), row['path'])
        original_logs = normalized_logs(original['logs'])
        baseline_logs = normalized_logs(baseline['logs'])
        candidate_logs = normalized_logs(candidate['logs'])
        require(candidate_logs == original_logs, row['path'])
        sweep_messages = {SWEEP.format(0), SWEEP.format(1)}
        if case['kind'] == 'sweep-zero':
            message = SWEEP.format(case['bucket'])
            require(original_logs.count(message) == 1, 'missing or duplicate sweep notice')
            require(not any(other in original_logs for other in sweep_messages - {message}),
                    'wrong sweep bucket notice')
            reduced = list(original_logs)
            reduced.remove(message)
            require(baseline_logs == reduced, 'baseline sweep logs differ')
            require(original_logs.index(message) > original_logs.index('Program log: validated'),
                    'sweep notice precedes validation')
        elif case['kind'] == 'cashback-v2-zero':
            require(original_logs.count(CASHBACK) == 1, 'missing or duplicate cashback notice')
            reduced = list(original_logs)
            reduced.remove(CASHBACK)
            require(baseline_logs == reduced, 'baseline V2 cashback logs differ')
        elif case['kind'] == 'cashback-v1-zero':
            require(original_logs.count(CASHBACK) == 1, 'V1 cashback notice missing')
            require(baseline_logs == original_logs, 'V1 cashback baseline regression')
        elif case['kind'] in ('sweep-positive', 'cashback-positive', 'sweep-unauthorized'):
            require(not sweep_messages.intersection(original_logs), 'unexpected sweep notice')
            require(CASHBACK not in original_logs, 'unexpected cashback notice')
            require(baseline_logs == original_logs, 'unexpected baseline log difference')
        else:
            raise RuntimeError(f"unknown case kind: {case['kind']}")


def validate_repeated_build(first, second, expected):
    require(first == second, 'repeated artifacts differ')
    require(hashlib.sha256(first).hexdigest() == expected, 'artifact digest mismatch')
