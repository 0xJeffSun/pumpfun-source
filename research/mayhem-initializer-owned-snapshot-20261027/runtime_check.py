"""Verify frozen runtime receipts; optional cryptographic signature recheck."""
import ast
import base64
import gzip
import hashlib
import json
import re

CANDIDATE = '0012957150ef8d4ecc28b3945ed159f544e9f29ef8c64977e2c9c1889c17c13a'
ORIGINAL = 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
MAYHEM = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
PUMP = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
sha = lambda b: hashlib.sha256(b).hexdigest()


def cases(path):
    """Execute only the frozen pure cases() function, avoiding module side effects."""
    tree = ast.parse(path.read_bytes())
    functions = [node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == 'cases']
    assert len(functions) == 1
    class Pubkey:
        @staticmethod
        def default():
            return '11111111111111111111111111111111'
    namespace = {'Pubkey': Pubkey}
    exec(compile(ast.Module(body=functions, type_ignores=[]), str(path), 'exec'), namespace)
    return namespace['cases']()


def verify(root, packet, signatures=False):
    if signatures:
        from solders.transaction import Transaction
    original = root/'evidence/original/mayhem/deployed.so'
    pump = root/'evidence/original/pump/deployed.so'
    assert sha(original.read_bytes()) == ORIGINAL
    pump_hash, pump_size = sha(pump.read_bytes()), pump.stat().st_size
    candidate_size = len(gzip.decompress((packet/'artifacts/ordinary/candidate.so.gz').read_bytes()))
    frozen = packet/'runtime/frozen'
    canonical = {'rejections': cases(frozen/'research/mayhem-initializer-validation/validation_matrix.py'),
                 'pump-cpi': [c for c in cases(frozen/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py') if c['case'] != 'zero-creator-is-rejected']}
    results = []
    for kind in canonical:
        report = json.loads(gzip.decompress((packet/f'runtime/{kind}.json.gz').read_bytes()))
        assert report['schema'] == 'initializer-source-origins-runtime-v1' and report['kind'] == kind
        assert report['candidate_sha256'] == CANDIDATE and report['original_sha256'] == ORIGINAL
        assert report['runner_sha256'] == sha((packet/'runtime/producer.py').read_bytes())
        expected_harness = {'research/mayhem-initializer-validation/validation_matrix.py',
                            'repro/behavioral-recovery/scripts/mayhem_initialize_state_differential.py'} if kind == 'rejections' else {'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py'}
        assert set(report['harness_sha256']) == expected_harness
        for path, digest in report['harness_sha256'].items():
            assert sha((frozen/path).read_bytes()) == digest
        assert [r['case'] for r in report['cases']] == canonical[kind]
        assert report['case_count'] == len(canonical[kind]) and not report['mismatches']
        expected_fields = ['error','anchor_errors','before','after','events','inner','return','signed_transaction_base64'] if kind == 'rejections' else ['before','after','error','events','inner','return']
        assert report['compared_fields'] == expected_fields
        signed = success = 0
        for row in report['cases']:
            assert not row['differences']
            for field in expected_fields:
                assert row['original'][field] == row['candidate'][field]
            # Retain stricter logs than the producer's compared-field subset.
            assert row['original']['logs'] == row['candidate']['logs']
            success += row['original']['error'] is None
            a, b = row['original_executions'], row['candidate_executions']
            count = 1 if kind == 'rejections' or not row['case'].get('init_global_params', True) else 2
            assert len(a) == len(b) == count
            aa = [x['signed_transaction_base64'] for x in a]
            assert aa == [x['signed_transaction_base64'] for x in b] and len(set(aa)) == count
            if kind == 'rejections':
                assert aa == [row['original']['signed_transaction_base64']]
            for records, digest, size in [(a, ORIGINAL, original.stat().st_size), (b, CANDIDATE, candidate_size)]:
                for record in records:
                    raw = base64.b64decode(record['signed_transaction_base64'], validate=True)
                    if signatures:
                        tx = Transaction.from_bytes(raw)
                        assert all(tx.verify_with_results())
                    assert record['program_accounts'][MAYHEM] == {'sha256': digest, 'bytes': size, 'executable': True}
                    if kind == 'pump-cpi':
                        assert record['program_accounts'][PUMP] == {'sha256': pump_hash, 'bytes': pump_size, 'executable': True}
                    signed += 1
        assert success == (0 if kind == 'rejections' else 10)
        results.append({'kind': kind, 'cases': len(canonical[kind]), 'signed_records': signed, 'successes': success, 'raw_log_differences': 0})
    assert sum(r['cases'] for r in results) == 69 and sum(r['signed_records'] for r in results) == 168
    return {'candidate_sha256': CANDIDATE, 'case_pairs': 69, 'signed_records': 168, 'successful_pairs': 10,
            'signature_recheck_performed': signatures, 'results': results,
            'scope': 'Frozen signed offline VM records with actual producer program-account attestations. No new VM execution, exhaustive equivalence or deployment claim.'}
