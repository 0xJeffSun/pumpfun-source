#!/usr/bin/env python3
"""Extract and authenticate the 17 creator notices missing from saved L32 outcomes."""
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
FULL = ROOT / 'research/claude-pump-integration-20261027/r37-layout-32/full.json.gz'
OUTPUT = HERE / 'runtime/original-affected-cases.json'
MESSAGES = {
    'non_system_creator': 'Program log: Creator is not a system-owned wallet; fees left in the vaults',
    'frozen_quote_account': 'Program log: Creator quote token account is frozen; fees left in the vaults',
    'missing_canonical_pool': 'Program log: No canonical pump pool for this mint; curve only',
}


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def sha_bytes(value):
    return hashlib.sha256(value).hexdigest()


def walk(value, path, rows):
    if isinstance(value, dict):
        if isinstance(value.get('original'), dict) and isinstance(value.get('candidate'), dict):
            original, candidate = value['original'], value['candidate']
            for family, message in MESSAGES.items():
                if message in original.get('logs', []) and message not in candidate.get('logs', []):
                    encoded = original['transaction_base64']
                    raw = base64.b64decode(encoded, validate=True)
                    signatures = VersionedTransaction.from_bytes(raw).verify_with_results()
                    require(bool(signatures) and all(signatures), f'{path}: invalid signature')
                    before = original.get('before', {})
                    creator = before.get('current_creator') or {}
                    quote = before.get('current_creator_quote_token_account') or {}
                    pool = before.get('pool') or {}
                    rows.append({
                        'path': path,
                        'family': family,
                        'message': message,
                        'case': value.get('case'),
                        'transaction_sha256': sha_bytes(raw),
                        'original_error': original.get('error'),
                        'candidate_error': candidate.get('error'),
                        'creator_owner': creator.get('owner'),
                        'creator_executable': creator.get('executable', False),
                        'creator_writable_requested': bool((value.get('case') or {}).get('current_writable')),
                        'quote_account_data_bytes': len(quote.get('data', '')) // 2,
                        'pool_owner': pool.get('owner'),
                        'pool_data_bytes': len(pool.get('data', '')) // 2,
                        'original_logs': original.get('logs', []),
                        'candidate_logs': candidate.get('logs', []),
                    })
            return
        for key, child in value.items():
            walk(child, f'{path}/{key}' if path else str(key), rows)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            walk(child, f'{path}/{index}', rows)


def analyze():
    document = json.loads(gzip.decompress(FULL.read_bytes()))
    rows = []
    walk(document['suites'], '', rows)
    counts = {family: sum(row['family'] == family for row in rows) for family in MESSAGES}
    require(counts == {
        'non_system_creator': 5,
        'frozen_quote_account': 9,
        'missing_canonical_pool': 3,
    }, f'unexpected affected counts: {counts}')
    require(len(rows) == 17 and len({row['path'] for row in rows}) == 17,
            'affected case identity mismatch')
    return {
        'status': 'verified',
        'scope': 'Saved L32 outcomes rechecked against exact original messages and signed transactions; not a fresh VM replay.',
        'l32_full_sha256': sha_bytes(FULL.read_bytes()),
        'counts': counts,
        'case_count': len(rows),
        'cases': rows,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    report = analyze()
    if args.write:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(json.dumps(report, indent=2, sort_keys=True) + '\n')
    else:
        require(OUTPUT.is_file(), 'saved affected-case report missing')
        require(report == json.loads(OUTPUT.read_text()), 'affected-case report changed')
    print(json.dumps({'status': report['status'], 'counts': report['counts'],
                      'case_count': report['case_count']}, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
