#!/usr/bin/env python3
"""Reconcile signed-transaction counts in the saved L31 and L32 corpora."""
from pathlib import Path
import argparse
import base64
import gzip
import hashlib
import json
import sys

sys.dont_write_bytecode = True

from solders.transaction import VersionedTransaction

HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
L31 = ROOT / 'research/claude-pump-integration-20261027/r37-layout-31/full.json.gz'
L32 = ROOT / 'research/claude-pump-integration-20261027/r37-layout-32/full.json.gz'
REPORT = HERE / 'runtime/transaction-accounting.json'


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def sha_bytes(value):
    return hashlib.sha256(value).hexdigest()


def sha_file(path):
    return sha_bytes(Path(path).read_bytes())


def canonical_sha(value):
    encoded = json.dumps(value, sort_keys=True, separators=(',', ':')).encode()
    return sha_bytes(encoded)


def verify_transaction(encoded):
    raw = base64.b64decode(encoded, validate=True)
    results = VersionedTransaction.from_bytes(raw).verify_with_results()
    require(bool(results) and all(results), 'transaction signature verification failed')
    return sha_bytes(raw)


def load(path):
    return json.loads(gzip.decompress(Path(path).read_bytes()))


def account(path):
    document = load(path)
    direct = {}
    nested_occurrences = 0
    nested_hashes = set()
    outcome_occurrences = 0
    outcome_hashes = set()
    corpus_occurrences = 0
    corpus_hashes = set()

    def outcome_transactions(value, location, nested=False):
        nonlocal nested_occurrences, outcome_occurrences
        if isinstance(value, dict):
            for key, child in value.items():
                child_location = f'{location}/{key}'
                if key == 'transaction_base64':
                    digest = verify_transaction(child)
                    outcome_occurrences += 1
                    outcome_hashes.add(digest)
                    if nested:
                        nested_occurrences += 1
                        nested_hashes.add(digest)
                    else:
                        require(child_location not in direct, f'duplicate direct path: {child_location}')
                        direct[child_location] = digest
                else:
                    outcome_transactions(child, child_location, True)
        elif isinstance(value, list):
            for index, child in enumerate(value):
                outcome_transactions(child, f'{location}/{index}', True)

    def paired_outcomes(value, location):
        if isinstance(value, dict):
            if isinstance(value.get('original'), dict) and isinstance(value.get('candidate'), dict):
                outcome_transactions(value['original'], f'{location}/original')
                outcome_transactions(value['candidate'], f'{location}/candidate')
                return
            for key, child in value.items():
                paired_outcomes(child, f'{location}/{key}')
        elif isinstance(value, list):
            for index, child in enumerate(value):
                paired_outcomes(child, f'{location}/{index}')

    def all_transactions(value):
        nonlocal corpus_occurrences
        if isinstance(value, dict):
            for key, child in value.items():
                if key == 'transaction_base64':
                    corpus_occurrences += 1
                    corpus_hashes.add(verify_transaction(child))
                else:
                    all_transactions(child)
        elif isinstance(value, list):
            for child in value:
                all_transactions(child)

    paired_outcomes(document['suites'], 'suites')
    all_transactions(document['suites'])
    direct_hashes = set(direct.values())
    return {
        'full_receipt_sha256': sha_file(path),
        'direct_case_outcome_fields': {
            'occurrences': len(direct),
            'distinct': len(direct_hashes),
            'path_digest_map_sha256': canonical_sha(direct),
        },
        'nested_transactions_inside_outcomes': {
            'occurrences': nested_occurrences,
            'distinct': len(nested_hashes),
        },
        'all_transactions_inside_outcomes': {
            'occurrences': outcome_occurrences,
            'distinct': len(outcome_hashes),
        },
        'all_serialized_transactions_in_corpus': {
            'occurrences': corpus_occurrences,
            'distinct': len(corpus_hashes),
        },
        '_direct_map': direct,
    }


def analyze():
    l31 = account(L31)
    l32 = account(L32)
    require(l31.pop('_direct_map') == l32.pop('_direct_map'),
            'L31 and L32 direct transaction path maps differ')
    expected = {
        'direct_case_outcome_fields': (18268, 2407),
        'nested_transactions_inside_outcomes': (16, 2),
        'all_transactions_inside_outcomes': (18284, 2409),
        'all_serialized_transactions_in_corpus': (18343, 2411),
    }
    for label, result in (('L31', l31), ('L32', l32)):
        for scope, (occurrences, distinct) in expected.items():
            require(result[scope]['occurrences'] == occurrences,
                    f'{label} {scope}: occurrence mismatch')
            require(result[scope]['distinct'] == distinct,
                    f'{label} {scope}: distinct mismatch')
    return {
        'status': 'passed',
        'interpretation': {
            '2407': 'distinct transaction_base64 values directly attached to paired outcomes',
            '2409': 'the same outcome scope plus two nested creator-distribution bootstrap transactions',
            '2411': 'every transaction_base64 in the corpus, including two additional setup/calibration transactions outside paired outcomes',
        },
        'direct_case_transactions_identical_between_l31_and_l32': True,
        'L31': l31,
        'L32': l32,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true', help='write the canonical report')
    args = parser.parse_args()
    report = analyze()
    if args.write:
        REPORT.parent.mkdir(parents=True, exist_ok=True)
        REPORT.write_text(json.dumps(report, indent=2, sort_keys=True) + '\n')
    else:
        require(REPORT.is_file(), 'saved transaction accounting report is missing')
        require(report == json.loads(REPORT.read_text()), 'saved transaction accounting report differs')
    print(json.dumps(report, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
