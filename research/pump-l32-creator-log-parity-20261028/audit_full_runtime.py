#!/usr/bin/env python3
"""Audit the freshly executed 44-suite L32 creator candidate corpus."""
from pathlib import Path
from collections import Counter
import argparse
import base64
import gzip
import hashlib
import importlib.util
import json
import sys

if not __debug__:
    raise RuntimeError('optimized Python disables dependency assertions; refusing audit')

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0, str(HERE))
import parity_checks as checks

ORACLE_DIR = ROOT / 'repro/pump/main-contract-round47-20261027/ordinary-logs'
sys.path.insert(0, str(ORACLE_DIR))
spec = importlib.util.spec_from_file_location('ordered_log_audit', ORACLE_DIR / 'audit.py')
oracle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(oracle)

ORIGINAL = '7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
CANDIDATE = '3461cd9b1878083bb3af3d30ec5765de6392072acf38184c96a7ca9c5c857d36'
FULL = HERE / 'runtime/full.json.gz'


def normalize(value, key=''):
    if key in ('logs', 'relevant_logs'):
        checks.require(isinstance(value, list) and all(isinstance(x, str) for x in value),
                       'invalid log sequence')
        return oracle.norm(value)
    if isinstance(value, dict):
        return {k: normalize(v, k) for k, v in value.items()
                if k not in ('compute_units', 'compute_units_consumed')}
    if isinstance(value, list):
        return [normalize(v) for v in value]
    return value


def without_logs(value):
    if isinstance(value, dict):
        return {k: without_logs(v) for k, v in value.items()
                if k not in ('logs', 'relevant_logs')}
    if isinstance(value, list):
        return [without_logs(v) for v in value]
    return value


def analyze():
    document = checks.load_json(FULL)
    checks.require(document['original_sha256'] == ORIGINAL, 'full corpus original hash mismatch')
    checks.require(document['candidate_sha256'] == CANDIDATE, 'full corpus candidate hash mismatch')
    checks.require(document['case_count'] == 10468 and len(document['suites']) == 44,
                   'full corpus scope mismatch')
    counts, families, state_differences, differences = Counter(), Counter(), [], []
    transaction_hashes = set()

    def signatures(value):
        if isinstance(value, dict):
            for key, child in value.items():
                if key == 'transaction_base64':
                    raw = base64.b64decode(child, validate=True)
                    transaction_hashes.add(checks.verify_signed_transaction(child))
                    counts['signed_transaction_occurrences_reverified'] += 1
                else:
                    signatures(child)
        elif isinstance(value, list):
            for child in value:
                signatures(child)

    def walk(value, path):
        if isinstance(value, dict):
            if isinstance(value.get('original'), dict) and isinstance(value.get('candidate'), dict):
                original, candidate = value['original'], value['candidate']
                counts['pairs'] += 1
                left, right = normalize(original), normalize(candidate)
                if 'program_sha256' in left:
                    checks.require(left['program_sha256'][oracle.PUMP] == ORIGINAL,
                                   f'{path}: original program binding mismatch')
                    checks.require(right['program_sha256'][oracle.PUMP] == CANDIDATE,
                                   f'{path}: candidate program binding mismatch')
                    left['program_sha256'] = dict(left['program_sha256'])
                    right['program_sha256'] = dict(right['program_sha256'])
                    left['program_sha256'][oracle.PUMP] = right['program_sha256'][oracle.PUMP] = '<verified>'
                    counts['checked_pair_program_maps'] += 1
                if without_logs(left) != without_logs(right):
                    state_differences.append(path)
                original_logs = oracle.scope(oracle.norm(original['logs']))
                candidate_logs = oracle.scope(oracle.norm(candidate['logs']))
                if original_logs is not None or candidate_logs is not None:
                    counts['main_log_pairs'] += 1
                    if original_logs != candidate_logs:
                        kind, changes = oracle.classify(original_logs or [], candidate_logs or [])
                        families[kind] += 1
                        differences.append({'path': path, 'family': kind, 'changes': changes})
                signatures(original)
                signatures(candidate)
                return
            for key, child in value.items():
                walk(child, f'{path}/{key}' if path else key)
        elif isinstance(value, list):
            for index, child in enumerate(value):
                walk(child, f'{path}/{index}')

    for name, suite in document['suites'].items():
        checks.require(suite.get('original_sha256', ORIGINAL) == ORIGINAL,
                       f'{name}: suite original hash mismatch')
        checks.require(suite.get('candidate_sha256', CANDIDATE) == CANDIDATE,
                       f'{name}: suite candidate hash mismatch')
        walk(suite, name)
    checks.require(counts['pairs'] == 10468, 'paired-case count mismatch')
    checks.require(not state_differences, f'structured runtime changes: {state_differences[:3]}')
    expected = {'ordinary_message_order': 6, 'source_file_path_only': 52}
    checks.require(dict(families) == expected, f'unexpected log matrix: {dict(families)}')
    return {
        'status': 'verified_with_known_log_limitations',
        'counts': dict(counts),
        'distinct_signed_transactions': len(transaction_hashes),
        'state_differences': state_differences,
        'ordered_main_log_difference_families': dict(families),
        'non_filename_log_differences': sum(value for key, value in families.items()
                                                if key != 'source_file_path_only'),
        'filename_only_log_differences': families['source_file_path_only'],
        'remaining_differences': differences,
        'normalization': [
            'compute-unit fields and consumption lines excluded',
            'source line and column numbers normalized; filenames preserved',
            'Pump artifact hashes checked before replacing only that map entry',
        ],
        'original_sha256': ORIGINAL,
        'candidate_sha256': CANDIDATE,
        'full_receipt_sha256': checks.sha256(FULL),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    report = analyze()
    summary = HERE / 'runtime/full-summary.json'
    mismatches = HERE / 'runtime/ordered-log-mismatches.json.gz'
    if args.write:
        compact = dict(report)
        rows = compact.pop('remaining_differences')
        summary.write_text(json.dumps(compact, indent=2, sort_keys=True) + '\n')
        mismatches.write_bytes(gzip.compress((json.dumps(rows, indent=2, sort_keys=True) + '\n').encode(), mtime=0))
    else:
        checks.require(summary.is_file() and mismatches.is_file(), 'saved full audit outputs missing')
        compact = dict(report)
        rows = compact.pop('remaining_differences')
        checks.require(compact == json.loads(summary.read_text()), 'saved full summary changed')
        checks.require(rows == json.loads(gzip.decompress(mismatches.read_bytes())),
                       'saved ordered-log differences changed')
    print(json.dumps({key: value for key, value in report.items()
                      if key != 'remaining_differences'}, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
