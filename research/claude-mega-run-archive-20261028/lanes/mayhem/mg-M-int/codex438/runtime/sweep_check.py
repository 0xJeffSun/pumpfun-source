"""Read-only verification of signed sweep inputs, outcomes and exact diagnostic logs."""
import hashlib
import re
import struct
from solders.transaction import Transaction
from replay_sweeps import fixture, rate_cases

PROGRAM = str(fixture.PROGRAM)
sha = lambda b: hashlib.sha256(b).hexdigest()


def logs(result):
    return [s for s in result['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units', s)]


def attest(receipt, binary_hash, case):
    tx = Transaction.from_bytes(bytes.fromhex(receipt['transaction_hex']))
    assert all(tx.verify_with_results())
    assert len(tx.message.instructions) == 1
    ix = tx.message.instructions[0]
    keys = tx.message.account_keys
    assert str(keys[ix.program_id_index]) == PROGRAM
    assert bytes(ix.data) == hashlib.sha256(('global:'+case['op']).encode()).digest()[:8]
    for phase in ('before', 'after'):
        assert set(receipt[phase]) == set(map(str, keys))
        p = receipt[phase][PROGRAM]
        assert p['executable'] and p['data_sha256'] == binary_hash
    if len(ix.accounts) > 2:
        mint = str(keys[ix.accounts[2]])
        assert mint == str(fixture.WSOL if case.get('native', True) else fixture.OTHER)
    if len(ix.accounts) > 1:
        account = receipt['before'][str(keys[ix.accounts[1]])]
        data = bytearray(fixture.DISC + bytes(246))
        kind = case.get('kind', 'ok')
        data[49:81] = bytes(fixture.OTHER if kind=='wrong_admin' else fixture.ADMIN.pubkey())
        data[81:113] = bytes(fixture.OTHER if kind=='wrong_trader' else fixture.ADMIN.pubkey())
        for offset in (174,246):
            data[offset:offset+8] = case.get('limit',1000000).to_bytes(8,'little')
        if 'global_offset' in case:
            offset = case['global_offset']
            data[offset:offset+8] = case.get('global_value',200000).to_bytes(8,'little')
        assert account['owner'] == PROGRAM and bytes(account['data']) == data
    if 'last' in case and case.get('kind') != 'short':
        fee = receipt['before'][str(keys[ix.accounts[9]])]
        offset = 10 + (0 if case['native'] else 24)
        assert struct.unpack_from('<q', bytes(fee['data']), offset)[0] == case['last']
    return tx


def check(report, suite, binaries, runner_hash):
    cases = fixture.rows if suite == 'sweeps' else rate_cases()
    assert report['count'] == len(report['cases']) == len(cases)
    assert [r['case'] for r in report['cases']] == cases
    assert report['binaries'] == binaries and report['runner_sha256'] == runner_hash
    repaired = []
    categories = dict(account_count=0, rent_underflow=0)
    for index, row in enumerate(report['cases']):
        assert set(row['results']) == set(row['receipts']) == set(binaries)
        a, b, c = [row['results'][s] for s in ('original','control','candidate')]
        assert set(a) == set(b) == set(c) == {'error','accounts','events','inner','return_data','logs'}
        for field in ('error','accounts','events','inner','return_data'):
            assert a[field] == b[field] == c[field], (suite,index,field)
        assert logs(a) == logs(c), (suite,index,'logs')
        if logs(a) != logs(b):
            repaired.append(index)
            if any('AccountTypeNotSupported' in s for s in logs(a)):
                categories['account_count'] += 1
            else:
                assert any('attempt to subtract with overflow' in s for s in logs(a))
                categories['rent_underflow'] += 1
        original = row['receipts']['original']
        for side, receipt in row['receipts'].items():
            attest(receipt, binaries[side], row['case'])
            assert receipt['transaction_hex'] == original['transaction_hex']
            for phase in ('before','after'):
                assert {k:v for k,v in receipt[phase].items() if k!=PROGRAM} == {
                    k:v for k,v in original[phase].items() if k!=PROGRAM}
    assert len(repaired) == 0  # The qualified 434 control already has the diagnostic fixes.
    return dict(suite=suite,cases=len(cases),signed_records=3*len(cases),
                functional_mismatches=0,noncompute_log_mismatches=0,
                repaired_control_diagnostics=len(repaired),categories=categories,
                repaired_case_indices=repaired)
