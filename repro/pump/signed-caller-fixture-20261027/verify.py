#!/usr/bin/env python3
"""Verify the exact synthetic caller and bounded signed Pump evidence."""
from pathlib import Path
import base64
import gzip
import hashlib
import json
from solders.transaction import VersionedTransaction

P = Path(__file__).resolve().parent
ROOT = P.parents[2]
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    manifest = json.loads((P / 'MANIFEST.json').read_text())
    for name, expected in manifest.items():
        assert sha(P / name) == expected, name
    record = json.loads((P / 'PROVENANCE.json').read_text())
    assert sha(P / 'caller.so') == record['fixture_sha256']
    assert sha(ROOT / 'scripts/fixtures/signer_stub.so') == record['fixture_sha256']
    assert (P / 'caller.so').read_bytes()[:4] == b'\x7fELF'
    for name, expected in record['fixture_source_sha256'].items():
        assert sha(P / name) == expected
    data = json.loads(gzip.decompress((P / 'signed-cases.json.gz').read_bytes()))
    assert data['case_count'] == len(data['cases']) == record['case_count'] == 192
    assert not data['mismatches']
    signatures = set()
    negatives = 0
    for row in data['cases']:
        for field in ['error', 'before', 'after', 'events', 'inner', 'return_data']:
            assert row['original'][field] == row['candidate'][field]
        if row['case'].get('direct'):
            negatives += 1
            assert row['original']['error'] is not None
        for side in ['original', 'candidate']:
            raw = row[side]['transaction_base64']
            assert all(VersionedTransaction.from_bytes(base64.b64decode(raw)).verify_with_results())
            signatures.add(raw)
    assert len(signatures) == record['distinct_signed_transactions_verified']
    assert negatives == record['direct_without_pda_signer_negative_cases']
    print(json.dumps({'verified': True, 'cases': 192, 'distinct_signed_transactions': len(signatures),
                      'direct_unsigned_pda_rejections': negatives,
                      'synthetic_caller_only': True, 'historical_build_identity': False}))


if __name__ == '__main__':
    main()
