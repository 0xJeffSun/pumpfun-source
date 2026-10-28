#!/usr/bin/env python3
"""Portable, read-only audit of the saved L32 paired runtime outcomes."""
from pathlib import Path
import base64
import collections
import gzip
import hashlib
import importlib.util
import json
import sys

if not __debug__:
    raise SystemExit('optimized Python disables assertion gates; rerun without -O')
sys.dont_write_bytecode = True

from solders.transaction import VersionedTransaction

HERE = Path(__file__).resolve().parent
P = HERE.parent
ROOT = next(path for path in P.parents if (path / 'evidence/original/pump/deployed.so').is_file())
ORACLE_DIR = ROOT / 'repro/pump/main-contract-round47-20261027/ordinary-logs'
sys.path.insert(0, str(ORACLE_DIR))
spec = importlib.util.spec_from_file_location('ordered_log_audit', ORACLE_DIR / 'audit.py')
oracle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(oracle)


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


doc = json.loads(gzip.decompress((P / 'full.json.gz').read_bytes()))
original = sha(ROOT / 'evidence/original/pump/deployed.so')
candidate = sha(P / 'candidate.so')
require(doc['original_sha256'] == original, 'original executable binding mismatch')
require(doc['candidate_sha256'] == candidate, 'candidate executable binding mismatch')
require(len(doc['suites']) == 44 and doc['case_count'] == 10468, 'unexpected corpus scope')

counts = collections.Counter()
log_families = collections.Counter()
differences = []
state_differences = []
case_transaction_hashes = set()
nested_outcome_transaction_hashes = set()
all_outcome_transaction_hashes = set()
all_corpus_transaction_hashes = set()
PUMP = oracle.PUMP


def normalize(value, key=''):
    if key in ('logs', 'relevant_logs'):
        require(isinstance(value, list) and all(isinstance(line, str) for line in value), 'invalid logs')
        return oracle.norm(value)
    if isinstance(value, dict):
        return {key: normalize(child, key) for key, child in value.items()
                if key not in ('compute_units', 'compute_units_consumed')}
    if isinstance(value, list):
        return [normalize(child) for child in value]
    return value


def verify_transaction(encoded):
    raw = base64.b64decode(encoded, validate=True)
    results = VersionedTransaction.from_bytes(raw).verify_with_results()
    require(bool(results) and all(results), 'transaction signature verification failed')
    return hashlib.sha256(raw).hexdigest()


def outcome_signatures(value, nested=False):
    if isinstance(value, dict):
        for key, child in value.items():
            if key == 'transaction_base64':
                digest = verify_transaction(child)
                counts['outcome_transaction_occurrences'] += 1
                all_outcome_transaction_hashes.add(digest)
                if nested:
                    counts['nested_outcome_transaction_occurrences'] += 1
                    nested_outcome_transaction_hashes.add(digest)
                else:
                    counts['case_transaction_occurrences'] += 1
                    case_transaction_hashes.add(digest)
            else:
                outcome_signatures(child, True)
    elif isinstance(value, list):
        for child in value:
            outcome_signatures(child, True)


def corpus_signatures(value):
    if isinstance(value, dict):
        for key, child in value.items():
            if key == 'transaction_base64':
                counts['corpus_transaction_occurrences'] += 1
                all_corpus_transaction_hashes.add(verify_transaction(child))
            else:
                corpus_signatures(child)
    elif isinstance(value, list):
        for child in value:
            corpus_signatures(child)


def without_logs(value):
    if isinstance(value, dict):
        return {key: without_logs(child) for key, child in value.items()
                if key not in ('logs', 'relevant_logs')}
    if isinstance(value, list):
        return [without_logs(child) for child in value]
    return value


def walk(value, path):
    if isinstance(value, dict):
        if isinstance(value.get('original'), dict) and isinstance(value.get('candidate'), dict):
            original_outcome, candidate_outcome = value['original'], value['candidate']
            counts['pairs'] += 1
            normalized_original = normalize(original_outcome)
            normalized_candidate = normalize(candidate_outcome)
            if 'program_sha256' in normalized_original:
                require(normalized_original['program_sha256'][PUMP] == original,
                        f'{path}: original program binding mismatch')
                require(normalized_candidate['program_sha256'][PUMP] == candidate,
                        f'{path}: candidate program binding mismatch')
                normalized_original['program_sha256'] = dict(normalized_original['program_sha256'])
                normalized_candidate['program_sha256'] = dict(normalized_candidate['program_sha256'])
                normalized_original['program_sha256'][PUMP] = '<checked-pump-artifact>'
                normalized_candidate['program_sha256'][PUMP] = '<checked-pump-artifact>'
                counts['checked_pair_program_maps'] += 1
            if normalized_original != normalized_candidate:
                differences.append({
                    'path': path,
                    'keys': sorted(key for key in normalized_original.keys() | normalized_candidate.keys()
                                   if normalized_original.get(key) != normalized_candidate.get(key)),
                })
            if without_logs(normalized_original) != without_logs(normalized_candidate):
                state_differences.append(path)
            left = oracle.scope(oracle.norm(original_outcome['logs']))
            right = oracle.scope(oracle.norm(candidate_outcome['logs']))
            if left is not None or right is not None:
                counts['main_log_pairs'] += 1
                if left != right:
                    kind, _ = oracle.classify(left or [], right or [])
                    log_families[kind] += 1
            outcome_signatures(original_outcome)
            outcome_signatures(candidate_outcome)
            return
        for key, child in value.items():
            walk(child, path + '/' + key)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            walk(child, path + '/' + str(index))


for suite_name, suite in doc['suites'].items():
    require(suite.get('candidate_sha256', candidate) == candidate,
            f'{suite_name}: candidate hash mismatch')
    require(suite.get('original_sha256', original) == original,
            f'{suite_name}: original hash mismatch')
    walk(suite, suite_name)
corpus_signatures(doc['suites'])

require(counts['pairs'] == 10468, 'paired-case count mismatch')
require(not state_differences, 'state differences found')
require(without_logs(normalize({'after': {'a': {'lamports': 1}}, 'logs': []})) !=
        without_logs(normalize({'after': {'a': {'lamports': 2}}, 'logs': []})),
        'lamport mutation control failed')
require(without_logs(normalize({'events': ['a'], 'logs': []})) !=
        without_logs(normalize({'events': ['b'], 'logs': []})),
        'event mutation control failed')
require(oracle.norm(['Program log: x']) != oracle.norm(['Program log: y']),
        'log mutation control failed')

accounting = {
    'direct_case_outcome_fields': {
        'occurrences': counts['case_transaction_occurrences'],
        'distinct': len(case_transaction_hashes),
        'definition': 'transaction_base64 directly on each paired original/candidate outcome',
    },
    'nested_transactions_inside_outcomes': {
        'occurrences': counts['nested_outcome_transaction_occurrences'],
        'distinct': len(nested_outcome_transaction_hashes),
        'definition': 'nested transaction_base64 fields inside paired outcomes',
    },
    'all_transactions_inside_outcomes': {
        'occurrences': counts['outcome_transaction_occurrences'],
        'distinct': len(all_outcome_transaction_hashes),
        'definition': 'direct plus nested transaction fields inside paired outcomes',
    },
    'all_serialized_transactions_in_corpus': {
        'occurrences': counts['corpus_transaction_occurrences'],
        'distinct': len(all_corpus_transaction_hashes),
        'definition': 'every transaction_base64, including calibration/setup records outside paired outcomes',
    },
}
expected = {
    'direct_case_outcome_fields': (18268, 2407),
    'nested_transactions_inside_outcomes': (16, 2),
    'all_transactions_inside_outcomes': (18284, 2409),
    'all_serialized_transactions_in_corpus': (18343, 2411),
}
for name, (occurrences, distinct) in expected.items():
    require(accounting[name]['occurrences'] == occurrences, f'{name}: occurrence mismatch')
    require(accounting[name]['distinct'] == distinct, f'{name}: distinct mismatch')

report = {
    'status': 'state_equal_with_unresolved_log_differences',
    'scope': 'All saved paired outcomes and serialized signatures independently rechecked; no build or VM replay.',
    'counts': dict(counts),
    'transaction_accounting': accounting,
    'state_differences': state_differences,
    'all_observed_pair_differences': differences,
    'ordered_main_log_difference_families': dict(log_families),
    'non_filename_log_differences': sum(
        value for key, value in log_families.items() if key != 'source_file_path_only'),
    'normalization': [
        'compute-unit fields and consumption lines excluded',
        'source line and column coordinates normalized, filenames preserved',
        'Pump artifact hashes checked separately; all other loaded hashes preserved',
    ],
    'original_sha256': original,
    'candidate_sha256': candidate,
    'full_receipt_sha256': sha(P / 'full.json.gz'),
    'audit_sha256': sha(Path(__file__)),
}
(HERE / 'L32-RUNTIME-REVIEW.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({key: value for key, value in report.items()
                  if key != 'all_observed_pair_differences'}, indent=2))
