"""Proposed pure receipt assertions; no VM, signing or network code."""
import base64
import copy
import hashlib
import re

COMPUTE = re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')
ORIGIN = re.compile(r'(AnchorError thrown in ).+?(:\d+)(\. Error Code:)')

def semantic_logs(logs):
    # Deliberately retain direct-vs-origin errors and every Left/Right value.
    return [ORIGIN.sub(r'\1<SOURCE_COORDINATE>\3', s)
            for s in logs if not COMPUTE.fullmatch(s)]

def comparable(row, program):
    result = {k: row[k] for k in ('error', 'events', 'inner_instructions', 'return_data')}
    result['semantic_logs'] = semantic_logs(row['logs'])
    for stage in ('before', 'after'):
        state = copy.deepcopy(row[stage])
        if state.get(program):
            for key in ('data_base64', 'data_sha256', 'data_length'):
                state[program].pop(key, None)
            state[program]['lamports'] -= row['before'][program]['lamports']
        result[stage] = state
    return result

def rollback_failures(row, payer):
    failures = []
    for key, before in row['before'].items():
        after = row['after'][key]
        if key == payer:
            before, after = copy.deepcopy(before), copy.deepcopy(after)
            before.pop('lamports'); after.pop('lamports')
        if before != after:
            failures.append('rollback:' + key)
    return failures

def check_expected(row, case, roles):
    expected = case['expected']; failures = []
    def check(value, message):
        if not value: failures.append(message)
    # Metadata serializes short-vector length bytes as a leading list.
    self_cpis = [entry for group in row['inner_instructions'] for entry in group
                 if row['message_account_keys'][entry['instruction']['programIdIndex']] == roles['PROGRAM']['str']]
    error_code = expected.get('error_code')
    if error_code is not None:
        check(row['error'] is not None and f'InstructionErrorCustom({error_code})' in row['error'], 'expected error code')
        check(not row['events'], 'rejection emitted event')
        check(not self_cpis, 'rejection emitted self CPI')
        failures += rollback_failures(row, roles['PAYER']['str'])
        return failures
    check(row['error'] is None, 'expected success')
    state = row['after'][roles['DONATION']['str']]
    check(state is not None, 'missing donation state')
    if state is None: return failures
    if expected.get('no_op'):
        check(state == row['before'][roles['DONATION']['str']], 'no-op changed donation')
        check(not row['events'], 'no-op emitted event')
        check(not self_cpis, 'no-op emitted self CPI')
        check('Program log: donation_fee_pda already exists' in row['logs'], 'missing no-op log')
        return failures
    quote = bytes.fromhex(roles[expected['quote']]['hex'])
    creator = bytes.fromhex(roles[expected['creator']]['hex'])
    encoded = (hashlib.sha256(b'account:DonationFeePda').digest()[:8]
        + bytes([roles['DONATION_BUMP'], 1]) + bytes.fromhex(roles['CONFIG']['hex'])
        + bytes.fromhex(roles['MINT']['hex']) + quote + creator + bytes(16 + 64))
    check(base64.b64decode(state['data_base64']) == encoded, 'complete donation encoding')
    check(state['owner'] == roles['PROGRAM']['str'], 'donation owner')
    event = (hashlib.sha256(b'event:DonationFeePdaCreated').digest()[:8]
        + (1700000000).to_bytes(8, 'little', signed=True)
        + b''.join(bytes.fromhex(roles[k]['hex']) for k in ['AUTH','DONATION','CONFIG','MINT'])
        + quote + creator)
    check(row['events'] == ['Program data: ' + base64.b64encode(event).decode()], 'complete creation event')
    check(len(self_cpis) == 1, 'one event self CPI')
    if len(self_cpis) == 1:
        cpi = self_cpis[0]; ix = cpi['instruction']
        check(ix['data'][0] == [216, 1], 'event CPI short-vector length')
        check(bytes(ix['data'][1:]) == bytes([228,69,165,46,81,203,154,29]) + event, 'event CPI full payload')
        check(ix['accounts'][0] == [1] and len(ix['accounts']) == 2
              and row['message_account_keys'][ix['accounts'][1]] == roles['EVENT']['str'], 'event CPI authority account')
        check(cpi['stackHeight'] == 2, 'event CPI stack height')
    # Complete compiled inner instruction lists and return data are compared
    # between original and candidate in comparable(); do not infer signer bits
    # that compiled inner metadata does not represent.
    return failures
