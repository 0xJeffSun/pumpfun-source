#!/usr/bin/env python3
"""Audit the three fresh 363-case AdminCto stages and signed inputs."""
from pathlib import Path
import argparse
import json
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from parity_checks import (  # noqa: E402
    CANONICAL, FINAL, FROZEN, L33, NON_SYSTEM, ORIGINAL, STAGE_B,
    load_json, norm_logs, require, scope_main, sha256, structured,
    verify_loader_receipt, verify_signed_transaction,
)

EXPECTED = {
    'stage-a': [41, 56, 231, 232, 233, 241, 270, 271, 272, 273, 274, 275,
                338, 344, 345, 348, 349, 350, 351, 352, 353, 354, 355],
    'stage-b': [270, 271, 272, 273, 274, 275],
    'stage-c': [],
}
MESSAGE_CASES = {
    NON_SYSTEM: [41, 56, 241, 344, 345],
    FROZEN: [338, 348, 349, 350, 351, 352, 353, 354, 355],
    CANONICAL: [231, 232, 233],
}


def main_logs(outcome):
    scoped = scope_main(norm_logs(outcome['logs']))
    require(scoped is not None, 'AdminCto case has no Pump invocation')
    return scoped


def analyze(documents=None):
    paths = {name: HERE / f'runtime/focused/{name}-admin.json.gz'
             for name in ('stage-a', 'stage-b', 'stage-c')}
    docs = documents or {name: load_json(path) for name, path in paths.items()}
    hashes = {'stage-a': L33, 'stage-b': STAGE_B, 'stage-c': FINAL}
    transaction_hashes, stage_rows = set(), {}
    reference_cases = None
    for stage, doc in docs.items():
        require(doc.get('original_sha256') == ORIGINAL, f'{stage}: original hash mismatch')
        require(doc.get('candidate_sha256') == hashes[stage], f'{stage}: candidate hash mismatch')
        require(doc.get('case_count') == 363 and len(doc.get('cases', [])) == 363,
                f'{stage}: focused scope mismatch')
        require(doc.get('mismatches') == [], f'{stage}: runner mismatches present')
        cases = [row['case'] for row in doc['cases']]
        if reference_cases is None:
            reference_cases = cases
        require(cases == reference_cases, f'{stage}: case identities changed')
        differing = []
        for index, row in enumerate(doc['cases']):
            original, candidate = row['original'], row['candidate']
            require(structured(original) == structured(candidate),
                    f'{stage}:{index}: structured mismatch')
            require(original['transaction_base64'] == candidate['transaction_base64'],
                    f'{stage}:{index}: transaction changed across pair')
            transaction_hashes.add(verify_signed_transaction(original['transaction_base64']))
            if main_logs(original) != main_logs(candidate):
                differing.append(index)
        require(differing == EXPECTED[stage], f'{stage}: unexpected log differences {differing}')
        stage_rows[stage] = {'cases': 363, 'non_filename_log_differences': len(differing),
                             'affected_indices': differing, 'structured_mismatches': 0}

    for index in range(363):
        originals = [structured(docs[stage]['cases'][index]['original']) for stage in docs]
        transactions = [docs[stage]['cases'][index]['original']['transaction_base64'] for stage in docs]
        require(all(value == originals[0] for value in originals), f'{index}: original outcome changed')
        require(all(value == transactions[0] for value in transactions), f'{index}: input changed')

    stage_b = docs['stage-b']['cases']
    for message, expected_cases in MESSAGE_CASES.items():
        original_cases = [index for index, row in enumerate(stage_b)
                          if message in main_logs(row['original'])]
        candidate_cases = [index for index, row in enumerate(stage_b)
                           if message in main_logs(row['candidate'])]
        require(original_cases == candidate_cases == expected_cases,
                f'diagnostic branch mismatch for {message}')

    for index in range(270, 276):
        baseline_original = main_logs(docs['stage-a']['cases'][index]['original'])
        baseline_candidate = main_logs(docs['stage-a']['cases'][index]['candidate'])
        final_original = main_logs(docs['stage-c']['cases'][index]['original'])
        final_candidate = main_logs(docs['stage-c']['cases'][index]['candidate'])
        require(baseline_original == final_original, f'{index}: original trace changed')
        require(baseline_original != baseline_candidate, f'{index}: control is not sensitive')
        require(final_original == final_candidate, f'{index}: collection order remains different')

    loader = {}
    for stage, expected_hash in hashes.items():
        loader[stage] = verify_loader_receipt(
            HERE / f'runtime/focused/{stage}-admin.loader.json', 726, expected_hash)
    return {
        'status': 'verified',
        'stages': stage_rows,
        'diagnostic_notices_restored': 17,
        'collection_order_cases_corrected': 6,
        'distinct_signed_transactions': len(transaction_hashes),
        'signed_transaction_occurrences': 1089,
        'loader_receipts': loader,
        'structured_mismatches': 0,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    result = analyze()
    target = HERE / 'runtime/focused-summary.json'
    if args.write:
        target.write_text(json.dumps(result, indent=2, sort_keys=True) + '\n')
    else:
        require(target.is_file() and load_json(target) == result, 'focused summary changed')
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
