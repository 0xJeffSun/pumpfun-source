#!/usr/bin/env python3
"""Independently audit the fresh 44-suite final L33 creator corpus."""
from collections import Counter
from pathlib import Path
import argparse
import gzip
import json
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from parity_checks import (  # noqa: E402
    FINAL, ORIGINAL, PUMP, classify_logs, load_json, norm_logs, normalize_runtime,
    require, scope_main, sha256, verify_loader_receipt, verify_signed_transaction,
    without_logs,
)

FULL = HERE / 'runtime/full.json.gz'


def analyze(document=None):
    doc = document or load_json(FULL)
    require(doc.get('original_sha256') == ORIGINAL, 'full corpus original hash mismatch')
    require(doc.get('candidate_sha256') == FINAL, 'full corpus candidate hash mismatch')
    require(doc.get('case_count') == 10468 and len(doc.get('suites', {})) == 44,
            'full corpus scope mismatch')
    require(doc.get('mismatches') == [], 'runner reported mismatches')
    require(doc.get('diagnostics', {}).get('mismatches') == [], 'diagnostic mismatches present')
    counts, families, state_differences, differences = Counter(), Counter(), [], []
    transaction_hashes = set()

    def signatures(value):
        if isinstance(value, dict):
            for key, child in value.items():
                if key == 'transaction_base64':
                    transaction_hashes.add(verify_signed_transaction(child))
                    counts['signed_transaction_occurrences'] += 1
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
                left, right = normalize_runtime(original), normalize_runtime(candidate)
                if 'program_sha256' in left:
                    require(left['program_sha256'].get(PUMP) == ORIGINAL,
                            f'{path}: original program binding mismatch')
                    require(right['program_sha256'].get(PUMP) == FINAL,
                            f'{path}: candidate program binding mismatch')
                    left['program_sha256'] = dict(left['program_sha256'])
                    right['program_sha256'] = dict(right['program_sha256'])
                    left['program_sha256'][PUMP] = '<verified>'
                    right['program_sha256'][PUMP] = '<verified>'
                    counts['checked_pair_program_maps'] += 1
                if without_logs(left) != without_logs(right):
                    state_differences.append(path)
                original_logs = scope_main(norm_logs(original['logs']))
                candidate_logs = scope_main(norm_logs(candidate['logs']))
                if original_logs is not None or candidate_logs is not None:
                    counts['main_log_pairs'] += 1
                    if original_logs != candidate_logs:
                        family, changes = classify_logs(original_logs or [], candidate_logs or [])
                        families[family] += 1
                        differences.append({'path': path, 'family': family, 'changes': changes})
                signatures(original)
                signatures(candidate)
                return
            for key, child in value.items():
                walk(child, f'{path}/{key}' if path else key)
        elif isinstance(value, list):
            for index, child in enumerate(value):
                walk(child, f'{path}/{index}')

    for name, suite in doc['suites'].items():
        require(suite.get('original_sha256', ORIGINAL) == ORIGINAL,
                f'{name}: original hash mismatch')
        require(suite.get('candidate_sha256', FINAL) == FINAL,
                f'{name}: candidate hash mismatch')
        walk(suite, name)

    require(counts['pairs'] == 10468, 'paired-case count mismatch')
    require(counts['main_log_pairs'] == 10456, 'main-log scope changed')
    require(counts['signed_transaction_occurrences'] == 18284,
            'signed transaction occurrence count changed')
    require(len(transaction_hashes) == 2409, 'distinct signed transaction count changed')
    require(not state_differences, f'structured runtime mismatch: {state_differences[:3]}')
    require(dict(families) == {'source_file_path_only': 27},
            f'unexpected ordered-log matrix: {dict(families)}')

    receipts = doc.get('loader_receipts', {})
    require(set(receipts) == set(doc['suites']), 'loader receipt suite inventory mismatch')
    loader_counts = 0
    for suite, record in receipts.items():
        path = HERE / 'runtime/full-loader-receipts' / f'{suite}.loader.json'
        require(sha256(path) == record['sha256'], f'{suite}: loader receipt hash mismatch')
        result = verify_loader_receipt(path, record['load_count'], FINAL)
        loader_counts += result['loads']

    return {
        'status': 'verified_with_filename_only_limitations',
        'counts': dict(counts),
        'distinct_signed_transactions': len(transaction_hashes),
        'state_differences': state_differences,
        'ordered_main_log_difference_families': dict(families),
        'non_filename_log_differences': 0,
        'filename_only_log_differences': 27,
        'remaining_differences': differences,
        'loader_receipts': 44,
        'loader_load_records': loader_counts,
        'normalization': [
            'compute-unit fields and consumption lines excluded',
            'numeric source line and column values normalized; filenames preserved',
            'Pump artifact hashes checked before replacing only that program-map entry',
        ],
        'original_sha256': ORIGINAL,
        'candidate_sha256': FINAL,
        'full_receipt_sha256': sha256(FULL),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    report = analyze()
    compact = dict(report)
    differences = compact.pop('remaining_differences')
    summary = HERE / 'runtime/full-summary.json'
    mismatches = HERE / 'runtime/ordered-log-mismatches.json.gz'
    if args.write:
        summary.write_text(json.dumps(compact, indent=2, sort_keys=True) + '\n')
        mismatches.write_bytes(gzip.compress(
            (json.dumps(differences, indent=2, sort_keys=True) + '\n').encode(), mtime=0))
    else:
        require(summary.is_file() and load_json(summary) == compact, 'full summary changed')
        require(mismatches.is_file() and load_json(mismatches) == differences,
                'ordered-log evidence changed')
    print(json.dumps(compact, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
