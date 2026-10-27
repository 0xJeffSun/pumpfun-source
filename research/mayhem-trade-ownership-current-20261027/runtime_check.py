"""Check frozen bounded receipts; optional cryptography never executes a VM."""
from pathlib import Path, PurePosixPath
import base64
import gzip
import hashlib
import json
import re
import struct
import subprocess
import sys
import tempfile

P = Path(__file__).resolve().parent
MAY = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
sha = lambda b: hashlib.sha256(b).hexdigest()


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def within(root, name):
    path = PurePosixPath(name)
    assert name and str(path) == name and not path.is_absolute() and '..' not in path.parts
    assert '\\' not in name
    return Path(root).joinpath(*path.parts)


def logs(record):
    return [line for line in record['metadata']['logs']
            if not re.search(r' consumed \d+ of \d+ compute units', line)]


def check_group(report, cases, role, family, candidate, original):
    expected = [dict(c, token_quote=family != 'native', quote_token22=family == 'token22') for c in cases]
    assert len(cases) == 8 and report['case_count'] == 8
    assert [r['case'] for r in report['cases']] == expected
    assert report['candidate_sha256'] == candidate and report['original_sha256'] == original
    assert not report['mismatches'] and not report['normalized_log_differences']
    assert report['signed_transactions'] == 16 and report['successful_original_cases'] == 2
    for pair, case in zip(report['cases'], expected):
        a, b = pair['original'], pair['candidate']
        assert a['case'] == b['case'] == case
        assert a['transaction_base64'] == b['transaction_base64']
        assert a['error'] == b['error'] and not pair['different_fields']
        assert not pair['normalized_log_difference'] and logs(a) == logs(b)
        assert a['metadata']['inner_instructions'] == b['metadata']['inner_instructions']
        assert a['metadata']['return_data'] == b['metadata']['return_data']
        for phase in ['before', 'after']:
            assert {k:v for k,v in a[phase].items() if k != MAY} == {k:v for k,v in b[phase].items() if k != MAY}
        for name, record, digest in [('original', a, original), ('candidate', b, candidate)]:
            assert record['signature_verified'] is True
            assert record['signature'] == record['metadata']['signature']
            assert record['before'].keys() == record['after'].keys()
            for phase in ['before', 'after']:
                program = record[phase][MAY]
                assert program['executable'] is True and program['data_sha256'] == digest
                for account in record[phase].values():
                    if account is not None and not account['executable']:
                        assert sha(base64.b64decode(account['data_base64'], validate=True)) == account['data_sha256']
    return dict(role=role, family=family, cases=8, saved_signed_records=16,
                program_bindings=16, successes=2, exact_noncompute_log_pairs=8)


def crypto_record(record, case, role, family):
    from solders.transaction import Transaction
    tx = Transaction.from_bytes(base64.b64decode(record['transaction_base64'], validate=True))
    assert all(tx.verify_with_results())
    assert str(tx.signatures[0]) == record['signature'] == record['metadata']['signature']
    ix = tx.message.instructions[-1]
    assert str(tx.message.account_keys[ix.program_id_index]) == MAY
    vt, vs, *_ = record['inputs']['curve']
    reference = case.get('reference', vs * 10**15 // vt if vt else 0)
    expected = hashlib.sha256(f'global:{role}_v2'.encode()).digest()[:8]
    expected += reference.to_bytes(16, 'little') + struct.pack('<HH', case.get('tolerance', 2400), case.get('retained', 9000))
    assert bytes(ix.data) == expected
    keys = [tx.message.account_keys[i] for i in ix.accounts]
    quote = ('So11111111111111111111111111111111111111112' if family == 'native'
             else 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    assert str(keys[4]) == quote
    token = ('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' if family == 'token22'
             else 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    assert record['before'][quote]['owner'] == token


def verify(root, metadata, signatures=False):
    root = Path(root)
    candidate = metadata['roles']['q18']['candidate_sha256']
    original = metadata['original_sha256']
    frozen = metadata['frozen_runtime_files']
    payloads = {}
    for item in metadata['runtime_dependencies'].values():
        assert sha(within(root, item['path']).read_bytes()) == item['sha256']
    for name, item in frozen.items():
        payload = raw(within(P, item['path']))
        assert sha(payload) == item['sha256']
        payloads[name] = payload
    groups = []
    with tempfile.TemporaryDirectory(prefix='trade-owned-receipts-') as td:
        temp = Path(td)
        if signatures:
            original_path = temp/'evidence/original/mayhem/deployed.so'
            original_path.parent.mkdir(parents=True)
            original_path.write_bytes((root/'evidence/original/mayhem/deployed.so').read_bytes())
            candidate_path = temp/'candidate.so'
            candidate_path.write_bytes(raw(P/'artifacts/q18/candidate.so.gz'))
            for name, payload in payloads.items():
                target = within(temp, name)
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(payload)
        assert set(metadata['runtime']) == {f'{r}-{f}' for r in ['buy', 'sell'] for f in ['native', 'token', 'token22']}
        for name, item in metadata['runtime'].items():
            role, family = item['role'], item['family']
            assert name == f'{role}-{family}'
            payload = raw(within(P, item['path']))
            assert sha(payload) == item['json_sha256']
            report = json.loads(payload)
            case_path = f'work/mayhem-priority-20261027/{role}v2-body-audit/bounded-cases.json'
            cases = json.loads(payloads[case_path])['cases']
            group = check_group(report, cases, role, family, candidate, original)
            for pair in report['cases']:
                for label in ['original', 'candidate']:
                    for phase in ['before', 'after']:
                        required = set(metadata['runtime_dependencies'])
                        if family == 'token22':
                            required.remove('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
                        assert required <= pair[label][phase].keys()
                        for address, dependency in metadata['runtime_dependencies'].items():
                            if address not in pair[label][phase]:
                                continue
                            account = pair[label][phase][address]
                            assert account['executable'] is True and account['data_sha256'] == dependency['sha256']
            for path, digest in report['harness_sha256'].items():
                assert path in payloads and sha(payloads[path]) == digest
            saved = json.loads((P/f'runtime/{name}-verification.json').read_bytes())
            assert saved['receipt_sha256'] == sha(payload)
            assert saved['candidate_sha256'] == candidate and saved['original_sha256'] == original
            assert saved['case_count'] == 8 and saved['verified_signed_transactions'] == 16
            assert saved['successful_cases'] == 2 and saved['rejection_cases'] == 6 and not saved['mismatches']
            if signatures:
                for pair in report['cases']:
                    for key in ['original', 'candidate']:
                        crypto_record(pair[key], pair['case'], role, family)
                receipt = temp/f'{name}.json'
                receipt.write_bytes(payload)
                output = temp/f'{name}-verification.json'
                checker = temp/f'scripts/verify_mayhem_{role}_v2.py'
                run = subprocess.run([sys.executable, '-B', str(checker), '--receipts', str(receipt),
                                      '--candidate', str(candidate_path), '--output', str(output)],
                                     capture_output=True, text=True)
                assert run.returncode == 0, (name, run.stdout, run.stderr)
                assert json.loads(output.read_bytes()) == saved
            groups.append(group)
    result = dict(cases=sum(g['cases'] for g in groups), saved_signed_records=sum(g['saved_signed_records'] for g in groups),
                  program_bindings=sum(g['program_bindings'] for g in groups), successes=sum(g['successes'] for g in groups),
                  exact_noncompute_log_pairs=sum(g['exact_noncompute_log_pairs'] for g in groups),
                  cryptographically_rechecked_records=96 if signatures else 0, groups=groups,
                  scope='Frozen synthetic local V2 receipts only; no VM/RPC executed by this verifier.')
    assert (result['cases'], result['saved_signed_records'], result['program_bindings'], result['successes']) == (48, 96, 96, 12)
    return result
