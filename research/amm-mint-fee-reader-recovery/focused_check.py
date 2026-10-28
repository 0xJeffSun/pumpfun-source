"""Read-only verification of focused signed triples retained in focused.tar.gz."""
from collections import Counter
from pathlib import Path
import base64
import gzip
import hashlib
import importlib.util
import json
import re
import struct

if not __debug__:
    raise SystemExit('Verification requires Python without -O')

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
COMPUTE = re.compile(r'Program \S+ consumed \d+ of \d+ compute units')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def normalized_logs(logs):
    return [line for line in logs if not COMPUTE.fullmatch(line)]


def classification(error, logs):
    if error is None:
        return 'success'
    if any('Error Number: 6007' in line and 'UnsupportedQuoteMint' in line for line in logs):
        assert 'InstructionErrorCustom(6007)' in error
        return 'target-UnsupportedQuoteMint-6007'
    if any('invoke [2]' in line for line in logs):
        return 'dependency-CPI-or-later-rejection'
    if any(('AnchorError caused by account:' in line or 'ProgramError caused by account:' in line)
           for line in logs):
        return 'account-validation-before-helper'
    return 'other-rejection-review-logs'


def comparable(receipt):
    metadata = dict(receipt['metadata'])
    metadata.pop('compute_units_consumed')
    metadata['logs'] = normalized_logs(metadata['logs'])
    return {key: receipt[key] for key in ('before', 'after', 'transaction_sha256', 'clock', 'error')} | dict(metadata=metadata)


def verify(evidence, images):
    from solders.pubkey import Pubkey
    from solders.transaction import Transaction

    runtime = module('mint_focused_runtime_check', HERE / 'runtime_check.py')
    files = runtime.archive(HERE / 'focused.tar.gz')
    assert set(files) == {'result.json', 'raw-transactions.jsonl.gz', 'signed-transactions.json.gz',
                          'summary.json', 'run.log', 'verify-receipts.py', 'launch.json', 'materialized-inputs.json'}
    report = json.loads(files['result.json'])
    summary = json.loads(files['summary.json'])
    observer = json.loads(gzip.decompress(files['signed-transactions.json.gz']))
    receipts = [json.loads(line) for line in gzip.decompress(files['raw-transactions.jsonl.gz']).splitlines()]
    original = (ROOT / 'evidence/original/pump_amm/deployed.so').read_bytes()
    known_images = dict(original=digest(original), control=digest(images['parent']['candidate']),
                        candidate=digest(images['proposal']['candidate']))
    assert known_images['original'] == runtime.ORIGINAL
    assert report['image_sha256'] == summary['image_sha256'] == known_images
    assert report['fresh_vm_environment'] == '1'
    assert report['counts'] == dict(vms=288, transactions=288, signature_fields=288)
    assert report['case_count'] == summary['case_count'] == len(report['cases']) == 96
    assert len(receipts) == len(observer['transactions']) == 288
    assert [row['vm'] for row in receipts] == list(range(288))
    assert summary['fresh_vm_count'] == summary['signed_transactions'] == summary['independent_signature_fields'] == 288
    assert summary['full_message_state_and_metadata_mismatches'] == 0
    assert summary['compute_units_compared'] is False
    assert report['mismatches'] == []
    labels = {'legacy-82', 'no-fee-envelope-167', 'zero-kind-terminator', 'other-known-extension',
              'unknown-extension', 'unknown-before-fee', 'unknown-after-fee', 'terminator-before-fee',
              'terminator-after-fee', 'older-epoch', 'newer-epoch-at', 'newer-epoch-after',
              'short-83', 'short-165', 'short-166', 'bad-padding', 'bad-account-type',
              'partial-header-two', 'partial-header-three', 'value-overrun', 'short-fee-config',
              'duplicate-fee-config', 'fee-before-malformed-header', 'terminator-before-malformed-header'}
    assert {(row['case']['instruction'], row['case']['mint'], row['case']['label']) for row in report['cases']} == {
        (instruction, mint, label) for instruction in ('deposit', 'withdraw')
        for mint in ('base', 'quote') for label in labels}
    assert set(summary['files']) == {'result.json', 'raw-transactions.jsonl.gz', 'signed-transactions.json.gz'}
    for name, expected in summary['files'].items():
        assert name in files and digest(files[name]) == expected
    assert summary['verification_script_sha256'] == digest(files['verify-receipts.py'])
    assert report['transaction_receipts']['sha256'] == digest(files['raw-transactions.jsonl.gz'])
    assert report['transaction_receipts']['path'].endswith('/focused-runtime/raw-transactions.jsonl.gz')
    for path, expected in report['input_sha256'].items():
        local = HERE / 'focused.py' if path == 'work/amm-transfer-fee-20261028/focused.py' else ROOT / path
        assert local.is_file() and digest(local.read_bytes()) == expected, path
        if path in evidence['harnesses']:
            assert evidence['harnesses'][path] == expected
    script_hash = digest((HERE / 'focused.py').read_bytes())
    assert report['input_sha256']['work/amm-transfer-fee-20261028/focused.py'] == script_hash
    assert observer['observer_sha256'] == evidence['harnesses']['repro/pump_amm/owner6048-v144/runtime/observe_suite.py']
    n, signatures, seen, _ = runtime.transactions(files['signed-transactions.json.gz'], set(known_images.values()), script_hash)
    assert n == signatures == 288 and seen == Counter({value: 96 for value in known_images.values()})

    fixture = json.loads((ROOT / 'research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json').read_bytes())
    mint_keys = {side: fixture['keys'][side + '_mint'] for side in ('base', 'quote')}
    user_quote = str(Pubkey.from_bytes(bytes([71]) * 32))
    token22 = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
    failed = 0
    for index, (receipt, observed) in enumerate(zip(receipts, observer['transactions'])):
        assert receipt['sequence'] == observed['sequence'] == index
        case_index, image_index = divmod(index, 3)
        image = ('original', 'control', 'candidate')[image_index]
        case = report['cases'][case_index]['case']
        assert receipt['context'] == dict(index=case_index, image=image, instruction=case['instruction'],
                                         mint=case['mint'], label=case['label'])
        raw = base64.b64decode(receipt['transaction_base64'], validate=True)
        tx = Transaction.from_bytes(raw)
        checks = tx.verify_with_results()
        assert checks and all(checks) and len(checks) == receipt['signature_fields'] == 1
        assert receipt['all_signatures_verified'] is True
        assert raw == bytes(tx) and receipt['transaction_base64'] == observed['transaction_base64']
        assert digest(raw) == receipt['transaction_sha256'] == observed['transaction_sha256']
        assert [str(signature) for signature in tx.signatures] == receipt['signatures']
        assert observed['amm_program_sha256'] == known_images[image]
        assert observed['error'] == receipt['error']
        assert observed['logs_sha256'] == digest(json.dumps(receipt['metadata']['logs'], separators=(',', ':')).encode())
        assert receipt['clock']['epoch'] == case.get('epoch', 0)
        mint = receipt['before'][mint_keys[case['mint']]]
        assert mint['owner'] == token22
        data = bytearray(base64.b64decode(fixture['accounts'][case['mint'] + '_mint']['data_base64'])[:82])
        if 'size' in case:
            data += bytes(max(0, case['size'] - len(data)))
            data = data[:case['size']]
        else:
            data += bytes(83) + bytes([case.get('account_type', 1)]) + bytes.fromhex(case['tlv'])
        if 'padding' in case:
            data[82] = case['padding']
        assert mint['data_hex'] == data.hex()
        result = report['cases'][case_index][image]
        assert result['error'] == receipt['error'] and result['logs'] == receipt['metadata']['logs']
        assert result['inner_instructions'] == receipt['metadata']['inner_instructions']
        for key, state in result['accounts'].items():
            assert state == {field: receipt['after'][key][field] for field in ('owner', 'lamports', 'data_hex')}
        if receipt['error'] is None:
            assert receipt['rollback_except_payer_fee'] is None and receipt['payer_fee_lamports'] is None
        else:
            failed += 1
            payer = str(tx.message.account_keys[0])
            assert receipt['before'].keys() == receipt['after'].keys()
            assert all(receipt['before'][key] == receipt['after'][key] for key in receipt['before'] if key != payer)
            before, after = dict(receipt['before'][payer]), dict(receipt['after'][payer])
            assert before.pop('lamports') - after.pop('lamports') == 5000
            assert before == after and receipt['rollback_except_payer_fee'] is True
            assert receipt['payer_fee_lamports'] == 5000
    assert failed == summary['failed_transactions_with_verified_rollback'] == 96
    assert summary['verified_payer_fee_lamports'] == 5000

    counts = Counter()
    selected = {}
    for index, row in enumerate(report['cases']):
        a, b, c = receipts[index * 3:index * 3 + 3]
        assert comparable(a) == comparable(b) == comparable(c), index
        assert row['original_candidate_equal'] is row['control_candidate_equal'] is True
        assert row['original_candidate_raw_logs_equal'] == (a['metadata']['logs'] == c['metadata']['logs'])
        assert row['control_candidate_raw_logs_equal'] == (b['metadata']['logs'] == c['metadata']['logs'])
        actual = classification(a['error'], a['metadata']['logs'])
        assert row['classification'] == actual
        counts[actual] += 1
        case = row['case']
        if actual == 'target-UnsupportedQuoteMint-6007':
            assert case['mint'] == 'quote' and case['malformed'] is True
            assert any('utils/transfer_fee.rs:32.' in line for line in a['metadata']['logs'])
        if case['mint'] == 'quote' and case['label'] in ('older-epoch', 'newer-epoch-at', 'newer-epoch-after'):
            assert actual == 'success'
            selected[(case['instruction'], case['label'])] = (a, b, c)
    assert dict(counts) == report['classifications'] == summary['classifications'] == {
        'success': 64, 'account-validation-before-helper': 20, 'target-UnsupportedQuoteMint-6007': 12}

    epochs = []
    for instruction in ('deposit', 'withdraw'):
        for index, image in enumerate(('original', 'control', 'candidate')):
            older = selected[(instruction, 'older-epoch')][index]
            at = selected[(instruction, 'newer-epoch-at')][index]
            later = selected[(instruction, 'newer-epoch-after')][index]
            mint = bytes.fromhex(older['before'][mint_keys['quote']]['data_hex'])
            assert struct.unpack_from('<HH', mint, 166) == (1, 108)
            assert struct.unpack_from('<QQH', mint, 170 + 72) == (0, 7, 100)
            assert struct.unpack_from('<QQH', mint, 170 + 90) == (5, 23, 1000)
            assert [receipt['clock']['epoch'] for receipt in (older, at, later)] == [4, 5, 6]
            amounts = [struct.unpack_from('<Q', bytes.fromhex(receipt['after'][user_quote]['data_hex']), 64)[0]
                       for receipt in (older, at, later)]
            assert amounts[0] - amounts[1] == 16 and amounts[1] == amounts[2]
            recipient = fixture['keys']['pool_quote_token_account'] if instruction == 'deposit' else user_quote
            for receipt, cap in ((older, 7), (at, 23), (later, 23)):
                before = bytes.fromhex(receipt['before'][recipient]['data_hex'])
                after = bytes.fromhex(receipt['after'][recipient]['data_hex'])
                assert struct.unpack_from('<HHQ', before, 166) == (2, 8, 0)
                assert struct.unpack_from('<HHQ', after, 166) == (2, 8, cap)
            epochs.append(dict(instruction=instruction, image=image, older_user_quote=amounts[0],
                               newer_at_user_quote=amounts[1], newer_after_user_quote=amounts[2],
                               expected_cap_difference=16))
    assert epochs == report['epoch_selection_evidence'] == summary['epoch_selection']
    return dict(cases=96, transactions=288, signatures=288, fresh_vms=288,
                classifications=dict(counts), failed_rollbacks=failed, full_receipt_mismatches=0)
