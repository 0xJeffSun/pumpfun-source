"""Recheck signed local differential receipts against this exact candidate."""
import base64
import hashlib
import json
import lzma
from pathlib import Path
import re

HERE = Path(__file__).resolve().parent
PROGRAM = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
ORIGINAL = 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'


def require(condition, message):
    if not condition:
        raise ValueError(message)


def check_pair(row, candidate_hash, signatures=False):
    first, second = row['original'], row['candidate']
    require(first['transaction_base64'] == second['transaction_base64'], 'paired transactions differ')
    for record, digest in [(first, ORIGINAL), (second, candidate_hash)]:
        payload = base64.b64decode(record['transaction_base64'], validate=True)
        if signatures:
            from solders.transaction import Transaction
            tx = Transaction.from_bytes(payload)
            checks = tx.verify_with_results()
            require(bool(checks) and all(checks), 'signature verification failed')
            require(str(tx.signatures[0]) == record['signature'], 'recorded signature differs')
        for phase in ['before', 'after']:
            snapshot = record[phase][PROGRAM]
            require(snapshot['executable'] and snapshot['data_sha256'] == digest,
                    'executed program account binding differs')
            for account in record[phase].values():
                if account is not None and account.get('data_base64') is not None:
                    data = base64.b64decode(account['data_base64'], validate=True)
                    require(hashlib.sha256(data).hexdigest() == account['data_sha256'], 'account data hash differs')
    for phase in ['before', 'after']:
        a = {k: v for k, v in first[phase].items() if k != PROGRAM}
        b = {k: v for k, v in second[phase].items() if k != PROGRAM}
        require(a == b, 'account state comparison differs')
    require(first['error'] == second['error'], 'error comparison differs')
    for field in ['inner_instructions', 'return_data']:
        require(first['metadata'][field] == second['metadata'][field], field + ' comparison differs')
    logs = lambda r: [line for line in r['metadata']['logs'] if not re.search(r' consumed \d+ of \d+ compute units', line)]
    require(logs(first) == logs(second), 'complete non-compute logs differ')
    require(not row['different_fields'] and not row['normalized_log_difference'], 'retained comparison failed')
    return int(first['error'] is None)


def verify(candidate_hash, signatures=False):
    commands = json.loads((HERE / 'runtime/commands.json').read_bytes())
    require(commands['candidate_sha256'] == candidate_hash, 'runtime command binding differs')
    total = successful = 0
    counts = {}
    for run in commands['runs']:
        name = run['family']
        data = json.loads(lzma.decompress((HERE / 'runtime' / (name + '.json.xz')).read_bytes()))
        require(data['candidate_sha256'] == candidate_hash and data['original_sha256'] == ORIGINAL,
                'runtime artifact binding differs')
        require(run['returncode'] == 0 and run['inputs_unchanged'] and not run['mismatches'] and not data['mismatches'],
                'runtime run failed')
        require(len(data['cases']) == run['cases'] == data['case_count'], 'case count differs')
        require(data['signed_transactions'] == 2 * len(data['cases']), 'signed record count differs')
        for row in data['cases']:
            successful += check_pair(row, candidate_hash, signatures)
        total += len(data['cases'])
        counts[name] = len(data['cases'])
    require(total == 6636 and len(counts) == 14, 'retained corpus differs')
    return {'case_pairs': total, 'signed_records': total * 2, 'successful_original_cases': successful,
            'families': counts, 'signature_recheck': signatures, 'non_compute_log_differences': 0}
