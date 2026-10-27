"""Strict, offline decoding of the retained Mayhem RPC JSON payloads.

This checks internal capture consistency, not RPC authenticity or ledger history.
No network, Solana client, virtual machine or program execution is used.
"""
import base64
import hashlib
import re

PROGRAM = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
GLOBAL = '13ec7XdrjF3h3YcqBTFDSReRcUFwbCnJaAQspM4j6DDJ'
EVENT_AUTHORITY = '8FoNgzmjuSmiy86EPCWxvv1q7oJSu2WGA7wPymwki2LJ'
SYSTEM = '11111111111111111111111111111111'
ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
WIDTHS = [4,4,8,8,8,8,1,8,8,8,8,8,8,8,8,8]
OFFSETS = [8,12,16,24,32,40,137,146,154,129,166,182,190,198,222,230]
EVENT = bytes.fromhex('63a75c9898e32629')  # Observed; historical type name unknown.
CARRIER = bytes.fromhex('e445a52e51cb9a1d')
ACCOUNT = hashlib.sha256(b'account:GlobalParams').digest()[:8]
NAMES = ['initialize_global_params','update_global_params','update_max_sol_per_sweep',
         'update_max_stable_per_sweep','update_trader','initialize_fee_recipient']
DISCRIMINATORS = {hashlib.sha256(('global:'+n).encode()).digest()[:8]:n for n in NAMES}


def require(ok, message):
    if not ok:
        raise ValueError(message)


def b58decode(value):
    require(isinstance(value,str) and len(value) <= 10000, 'Invalid base58 value')
    number = 0
    for char in value:
        require(char in ALPHABET, 'Invalid base58 character')
        number = number*58+ALPHABET.index(char)
    zeros = len(value)-len(value.lstrip('1'))
    return b'\0'*zeros+number.to_bytes((number.bit_length()+7)//8,'big')


def b58encode(raw):
    number = int.from_bytes(raw,'big'); text = ''
    while number:
        number, remainder = divmod(number,58)
        text = ALPHABET[remainder]+text
    return '1'*(len(raw)-len(raw.lstrip(b'\0')))+text


class Cursor:
    def __init__(self, raw):
        self.raw = raw; self.pos = 0

    def uint(self, width):
        require(self.pos+width <= len(self.raw), 'Truncated field')
        value = int.from_bytes(self.raw[self.pos:self.pos+width],'little')
        self.pos += width
        return value

    def end(self):
        require(self.pos == len(self.raw), 'Trailing bytes')


def arguments(raw):
    variants = []
    for count in (11,16):
        cursor = Cursor(raw); fields = {}
        try:
            for i, width in enumerate(WIDTHS[:count]):
                tag = cursor.uint(1)
                require(tag in (0,1), 'Invalid Option tag')
                fields['field_'+str(i)] = cursor.uint(width) if tag else None
            cursor.end()
        except ValueError:
            continue
        for i in range(count,16):
            fields['field_'+str(i)] = 'not_in_schema'
        fields['_bytes_consumed'] = cursor.pos
        variants.append((count,fields))
    require(len(variants) == 1, 'No unique complete 11/16-field Option schema')
    return variants[0]


def event(raw):
    require(raw[:8] == EVENT, 'Wrong event discriminator')
    require(len(raw) in (89,129), 'Unexpected event length')
    count = 11 if len(raw) == 89 else 16
    cursor = Cursor(raw[8:])
    old, new = cursor.uint(4), cursor.uint(4)
    require(new == old+1, 'Version must increment exactly once')
    fields = {'field_'+str(i):cursor.uint(width) for i,width in enumerate(WIDTHS[:count])}
    cursor.end()
    return dict(old_version=old,new_version=new,fields=fields,event_len=len(raw),fields_present=count)


def key_at(keys, index):
    require(type(index) is int and 0 <= index < len(keys), 'Account index out of range')
    return keys[index]


def invocation_rows(result):
    message = result['transaction']['message']
    loaded = result['meta']['loadedAddresses']
    keys = message['accountKeys']+loaded['writable']+loaded['readonly']
    require(keys and all(isinstance(k,str) and len(b58decode(k)) == 32 for k in keys), 'Invalid account keys')
    groups = {}
    for group in result['meta']['innerInstructions']:
        index = group['index']
        require(type(index) is int and 0 <= index < len(message['instructions']) and index not in groups,
                'Invalid inner-instruction group')
        groups[index] = group['instructions']
    rows = []
    for index, outer in enumerate(message['instructions']):
        ancestors = {}
        for subindex, instruction in [(-1,outer)]+list(enumerate(groups.get(index,[]))):
            height = 1 if subindex == -1 else instruction.get('stackHeight')
            require(type(height) is int and height >= 1 and (subindex == -1 or height >= 2),
                    'Missing/invalid invocation stack height')
            ancestors = {h:r for h,r in ancestors.items() if h < height}
            require(height == 1 or height-1 in ancestors, 'Invocation stack skips a parent')
            row = dict(program=key_at(keys,instruction['programIdIndex']),
                       accounts=[key_at(keys,i) for i in instruction['accounts']],
                       raw=b58decode(instruction['data']), height=height,
                       outer_index=index, inner_index=subindex,
                       parent=ancestors.get(height-1))
            rows.append(row); ancestors[height] = row
    return keys, rows


def log_events(logs):
    stack = []; events = []
    for line in logs:
        if line == 'Log truncated':
            return events, False
        match = re.fullmatch(r'Program (\w+) invoke \[(\d+)\]',line)
        if match:
            require(int(match[2]) == len(stack)+1, 'Log invocation depth differs')
            stack.append(match[1]); continue
        match = re.fullmatch(r'Program (\w+) (?:success|failed:.*)',line)
        if match:
            require(stack and stack[-1] == match[1], 'Log return differs')
            stack.pop(); continue
        if line.startswith('Program data: '):
            require(stack, 'Program data without invoking program')
            raw = base64.b64decode(line.removeprefix('Program data: '),validate=True)
            if stack[-1] == PROGRAM and raw[:8] == EVENT:
                event(raw); events.append(raw)
    require(not stack, 'Incomplete invocation logs')
    return events, True


def transaction(capture, filename):
    request = capture['request']; result = capture['response']['result']
    require(capture['capture_kind'] == request['method'] == 'getTransaction', 'Wrong capture kind')
    require(request['params'][1]['encoding'] == 'json' and request['params'][1]['commitment'] == 'finalized',
            'Unexpected transaction capture request')
    signature = result['transaction']['signatures'][0]
    require(request['params'][0] == signature and len(b58decode(signature)) == 64, 'Signature binding differs')
    require(result['meta']['err'] is None, 'Failed transaction')
    keys, calls = invocation_rows(result)
    instructions = []; events = []; pairs = []; updates = {}; carriers = []
    for call in calls:
        if call['program'] != PROGRAM:
            continue
        raw = call['raw']; disc = raw[:8]
        name = 'event_cpi_carrier:GlobalParamsUpdateEvent' if disc == CARRIER else DISCRIMINATORS.get(disc)
        require(name is not None, 'Unknown Mayhem instruction in retained cohort')
        row = dict(instruction=name,level='top' if call['height'] == 1 else 'inner',
                   accounts=call['accounts'],data_len=len(raw),data_hex=raw.hex())
        if name == 'update_global_params':
            count, args = arguments(raw[8:]); row['args'] = args
            require(len(call['accounts']) == 5 and call['accounts'][1:] ==
                    [GLOBAL,SYSTEM,EVENT_AUTHORITY,PROGRAM], 'Wrong update accounts')
            updates[id(call)] = dict(args=args,count=count,call=call,events=[])
        elif name.startswith('event_cpi_carrier:'):
            require(call['accounts'] == [EVENT_AUTHORITY], 'Wrong event authority')
            parent = updates.get(id(call['parent']))
            require(parent is not None, 'Event not nested directly under a decoded update')
            value = event(raw[8:])
            require(value['fields_present'] == parent['count'], 'Argument/event schemas differ')
            for field, observed in value['fields'].items():
                proposed = parent['args'][field]
                require(proposed is None or proposed == observed, 'Some argument differs from emitted value')
            parent['events'].append(value); events.append(value); carriers.append(raw[8:])
            pairs.append(dict(event=value,args=parent['args'],admin=parent['call']['accounts'][0],
                              outer_index=call['outer_index'],update_inner_index=parent['call']['inner_index'],
                              carrier_inner_index=call['inner_index']))
        elif name == 'initialize_global_params':
            require(len(raw) == 8 and len(call['accounts']) == 3 and
                    call['accounts'][1:] == [GLOBAL,SYSTEM], 'Initializer shape differs')
            row['raw_args_hex'] = ''
        elif name.startswith('update_max_'):
            require(len(raw) == 16, 'Sweep argument width differs')
            row['arg_u64'] = int.from_bytes(raw[8:],'little')
        elif name == 'update_trader':
            require(len(raw) == 40, 'Trader argument width differs')
        elif name == 'initialize_fee_recipient':
            require(len(raw) == 9, 'Recipient argument width differs')
        instructions.append(row)
    require(all(len(v['events']) == 1 for v in updates.values()), 'Update/event cardinality differs')
    logged, complete = log_events(result['meta']['logMessages'])
    require(not updates or complete, 'Update transaction has truncated logs')
    require(logged == carriers, 'Log and carrier payloads differ')
    row = dict(signature=signature,slot=result['slot'],block_time=result['blockTime'],error=None,
               fee_payer=keys[0],capture_file=filename,instructions=instructions,update_events=events)
    return row, pairs, dict(capture_file=filename,complete=complete,
                           decoded_update_log_events=len(logged))


def account(capture):
    request = capture['request']; result = capture['response']['result']; value = result['value']
    require(capture['capture_kind'] == request['method'] == 'getAccountInfo' and
            request['params'][0] == GLOBAL and capture.get('address',GLOBAL) == GLOBAL, 'Wrong account binding')
    require(request['params'][1]['commitment'] == 'finalized' and value['owner'] == PROGRAM and
            value['executable'] is False and value['data'][1] == 'base64', 'Wrong account owner/encoding')
    raw = base64.b64decode(value['data'][0],validate=True)
    require(len(raw) == value['space'] == 318 and raw[:8] == ACCOUNT and not any(raw[254:]),
            'Account discriminator, length or zero tail differs')
    fields = {'field_'+str(i):int.from_bytes(raw[offset:offset+width],'little')
              for i,(offset,width) in enumerate(zip(OFFSETS,WIDTHS))}
    return dict(slot=result['context']['slot'],version=int.from_bytes(raw[162:166],'little'),fields=fields,
                admin=b58encode(raw[49:81]),trader=b58encode(raw[81:113]),
                sol_deployed=int.from_bytes(raw[113:129],'little',signed=True),
                stable_deployed=int.from_bytes(raw[206:222],'little',signed=True),
                max_sol_per_sweep=int.from_bytes(raw[174:182],'little'),
                max_stable_per_sweep=int.from_bytes(raw[246:254],'little'),raw_sha256=hashlib.sha256(raw).hexdigest())


def derive(captures, accounts, expected):
    transactions = []; pairs = []; logs = []
    for name, capture in sorted(captures.items(),key=lambda kv:kv[1]['response']['result']['slot']):
        row, bindings, log_status = transaction(capture,name)
        transactions.append(row)
        logs.append(log_status)
        pairs.extend(dict(signature=row['signature'],slot=row['slot'],**p) for p in bindings)
    actual = dict(program=PROGRAM,global_params_account=GLOBAL,transactions=transactions)
    require(actual == expected, 'Raw captures do not reproduce the retained time series')
    require(pairs, 'No update events')
    previous = None; history = []
    for pair in pairs:
        value, args = pair['event'], pair['args']
        require(value['old_version'] == (previous['new_version'] if previous else 0), 'Version chain gap')
        if previous:
            require(value['fields_present'] >= previous['fields_present'], 'Schema shrank in retained cohort')
        unchanged = []
        for field, observed in value['fields'].items():
            if args[field] is None:
                require(previous is not None and field in previous['fields'], 'Omitted field has no prior state')
                require(previous['fields'][field] == observed, 'None field changed between events')
                unchanged.append(field)
        changed = [f for f,v in args.items() if f.startswith('field_') and v is not None and v != 'not_in_schema']
        history.append(dict(version=value['new_version'],fields_present=value['fields_present'],
                            some_fields=changed,none_fields_checked=unchanged,
                            fields=value['fields'],signature=pair['signature'],slot=pair['slot']))
        previous = value
    snapshots = {name:account(cap) for name,cap in accounts.items()}
    require(len(snapshots) == 2, 'Expected both retained account captures')
    for snap in snapshots.values():
        require(snap['slot'] > pairs[-1]['slot'] and snap['version'] == previous['new_version'] and
                snap['fields'] == previous['fields'], 'Current account differs from final event')
        require(all(p['admin'] == snap['admin'] for p in pairs), 'Captured update admin differs')
    return dict(transaction_count=len(transactions),mayhem_instruction_count=sum(len(t['instructions']) for t in transactions),
                update_count=len(pairs),version_range=[pairs[0]['event']['old_version'],previous['new_version']],
                independently_decoded_series_equal=True,update_carrier_log_payloads_equal=True,
                update_event_parentage_checked=True,history=history,accounts=snapshots,log_completeness=logs)
