#!/usr/bin/env python3
"""Verify four freshly executed 363-case admin_cto staged replays."""
from pathlib import Path
import argparse
import json
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import parity_checks as checks

EXPECTED = {
    'B-non-system': ('a91a5c2d0908c546cbddc875e49f67cfc31fd549c96bb8e49dcb1dd32292eeaf', {'non_system_creator': 5}),
    'C-frozen': ('d57f94a11f700391269d017feb6e05cf3bc75ad85f4652615090cb3d89df5bf2', {'frozen_quote_account': 9}),
    'D-canonical': ('0dbdcf74a7783ae071f1348461be7c390dc43818a680f726fa8f4a5a037c8329', {'missing_canonical_pool': 3}),
    'E-combined': ('3461cd9b1878083bb3af3d30ec5765de6392072acf38184c96a7ca9c5c857d36', {
        'non_system_creator': 5, 'frozen_quote_account': 9, 'missing_canonical_pool': 3,
    }),
}
ORIGINAL = '7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'


def analyze():
    affected = checks.load_json(HERE / 'runtime/original-affected-cases.json')['cases']
    family_by_index = {int(row['path'].rsplit('/', 1)[1]): row['family'] for row in affected}
    reports = {}
    all_signatures = set()
    for name, (candidate_hash, expected_families) in EXPECTED.items():
        document = checks.load_json(HERE / f'runtime/focused/{name}.json.gz')
        checks.require(document['case_count'] == 363 and len(document['cases']) == 363,
                       f'{name}: replay scope mismatch')
        checks.require(document['original_sha256'] == ORIGINAL, f'{name}: original hash mismatch')
        checks.require(document['candidate_sha256'] == candidate_hash, f'{name}: candidate hash mismatch')
        checks.require(document['mismatches'] == [], f'{name}: structured harness mismatches')
        restored = {family: 0 for family in checks.MESSAGES}
        exact_log_differences = compute_normalized = source_normalized = 0
        for index, row in enumerate(document['cases']):
            original, candidate = row['original'], row['candidate']
            checks.require(row['case'] == original['case'] == candidate['case'], f'{name}/{index}: case mismatch')
            checks.require(checks.structured(original) == checks.structured(candidate),
                           f'{name}/{index}: structured outcome changed')
            checks.require(original['transaction_base64'] == candidate['transaction_base64'],
                           f'{name}/{index}: transaction bytes changed')
            digest = checks.verify_signed_transaction(original['transaction_base64'])
            checks.require(original['signatures_verified'] and candidate['signatures_verified'],
                           f'{name}/{index}: harness signature flag false')
            all_signatures.add(digest)
            if original['logs'] != candidate['logs']:
                exact_log_differences += 1
            if checks.normalize_logs(original['logs']) != checks.normalize_logs(candidate['logs']):
                compute_normalized += 1
            if checks.normalize_logs(original['logs'], source_sites=True) != checks.normalize_logs(candidate['logs'], source_sites=True):
                source_normalized += 1
            for family, message in checks.MESSAGES.items():
                if message in candidate['logs']:
                    checks.require(message in original['logs'], f'{name}/{index}: spurious {family} notice')
                    checks.require(family_by_index.get(index) == family,
                                   f'{name}/{index}: notice outside authenticated case family')
                    restored[family] += 1
        restored = {key: value for key, value in restored.items() if value}
        checks.require(restored == expected_families, f'{name}: staged isolation mismatch: {restored}')

        loader = checks.load_json(HERE / f'runtime/focused/{name}.loader.json')
        load_hashes = [row['elf_sha256'] for row in loader['loads']]
        checks.require(load_hashes.count(ORIGINAL) == 363 and load_hashes.count(candidate_hash) == 363,
                       f'{name}: loader binding mismatch')
        reports[name] = {
            'paired_cases': 363,
            'restored_notices': restored,
            'structured_mismatches': 0,
            'exact_log_difference_cases': exact_log_differences,
            'compute_normalized_log_difference_cases': compute_normalized,
            'source_site_normalized_log_difference_cases': source_normalized,
        }
    checks.require(reports['E-combined']['source_site_normalized_log_difference_cases'] == 6,
                   'combined replay did not leave exactly six known order differences')
    return {
        'status': 'verified',
        'configurations': reports,
        'paired_case_executions': 363 * 4,
        'distinct_signed_transactions_verified': len(all_signatures),
        'combined_restored_notices': 17,
        'combined_remaining_message_order_cases': 6,
        'structured_mismatches': 0,
        'normalization': {
            'compute': 'Program consumed ... compute units lines excluded',
            'source_sites': 'only numeric line/column suffixes in AnchorError .rs paths replaced; filenames retained',
        },
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    report = analyze()
    output = HERE / 'runtime/focused-summary.json'
    if args.write:
        output.write_text(json.dumps(report, indent=2, sort_keys=True) + '\n')
    else:
        checks.require(output.is_file(), 'focused summary missing')
        checks.require(report == json.loads(output.read_text()), 'focused summary changed')
    print(json.dumps(report, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
