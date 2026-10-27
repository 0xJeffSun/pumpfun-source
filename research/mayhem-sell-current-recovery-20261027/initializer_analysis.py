"""Read original bytes and report the bounded initializer comparison."""
from pathlib import Path
import hashlib
import importlib.util
import json
import struct


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def inspect(root, packet, prior_path, candidate_path):
    reader = module('snapshot_reader', packet/'reader.py')
    original = reader.Elf(root/'evidence/original/mayhem/deployed.so')
    prior, candidate = reader.Elf(prior_path), reader.Elf(candidate_path)
    rows = json.loads((root/'research/mayhem-trade-origins-validator/audit.json').read_bytes())['rows']
    originals = {r['start']: original.window(r['start'], r['end']) for r in rows}
    before = originals[534840]
    key = lambda w: (w['end']-w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'], sort_keys=True))

    def pointer(image, at):
        assert image.rel[at]['type'] == 8
        zero, value = struct.unpack_from('<II', image.b, at)
        assert zero == 0
        return value

    def evaluate(image):
        matches = [s for s in image.symbols if 'state10initialize17' in s['name']]
        assert len(matches) == 1
        symbol = matches[0]
        window = image.window(symbol['value'], symbol['value']+symbol['size'])
        assert symbol['size'] == 960
        functions = {s['value']: image.window(s['value'], s['value']+s['size']) for s in image.symbols
                     if s['info'] & 15 == 2 and s['size'] >= 8 and image.lo <= s['value'] < image.hi}
        assert [key(originals[c['target']]) for c in before['direct']] == [key(functions[c['target']]) for c in window['direct']]
        assert [c['offset'] for c in window['direct']] == [344,752,776,840,952]
        a = original.norm(before['start'], before['end'])[0]
        b = image.norm(window['start'], window['end'])[0]
        diffs = [{'offset': i, 'original': a[i:i+8].hex(), 'candidate': b[i:i+8].hex()}
                 for i in range(0, len(a), 8) if a[i:i+8] != b[i:i+8]]
        sources, source_consumers = [], []
        for ref in window['data_references']:
            p = ref['target']
            if p not in image.rel or image.rel[p]['type'] != 8:
                continue
            zero, address, n, line, column = struct.unpack_from('<IIQII', image.b, p)
            if zero == 0 and n == 37 and image.b[address:address+n] == b'programs/mayhem-program/src/state.rs\0':
                sources.append([line, column])
                op, register = struct.unpack_from('<BB', image.b, window['start']+ref['offset'])
                assert op == 0x18 and register in (1,5)
                expected = (736,532,32) if register == 1 else (936,531,43)
                assert (ref['offset'],line,column) == expected
                consumer = next(c for c in window['direct'] if c['offset'] == ref['offset']+16)
                source_consumers.append({'kind': 'overflow' if register == 1 else 'unwrap',
                                         'offset': ref['offset'], 'call_offset': consumer['offset'],
                                         'line': line, 'column': column})
        assert sorted(sources) == [[531,43],[532,32]]
        original_refs = {x['offset']: x['target'] for x in before['data_references']}
        refs = {x['offset']: x['target'] for x in window['data_references']}
        assert refs.keys() == original_refs.keys() == {736,896,920,936}
        message = b'called `Result::unwrap()` on an `Err` value'
        assert image.b[refs[896]:refs[896]+43] == original.b[original_refs[896]:original_refs[896]+43] == message
        table = refs[920]
        assert struct.unpack_from('<QQQ', image.b, table) == (0,8,4)
        method = pointer(image, table+24)
        original_method = pointer(original, original_refs[920]+24)
        fm, original_fm = functions[method], originals[original_method]
        assert key(fm) == key(original_fm)
        assert len(fm['direct']) == len(original_fm['direct'])
        method_calls = []
        for x, y in zip(original_fm['direct'], fm['direct']):
            assert x['offset'] == y['offset']
            assert key(originals[x['target']]) == key(functions[y['target']])
            method_calls.append({'offset': x['offset'], 'original': x['target'], 'candidate': y['target']})
        overflow = functions[next(x['target'] for x in window['direct'] if x['offset'] == 752)]
        tuple_address = next(x['target'] for x in overflow['data_references'] if x['offset'] == 8)
        text_address = pointer(image, tuple_address)
        count = struct.unpack_from('<Q', image.b, tuple_address+8)[0]
        assert count == 28 and image.b[text_address:text_address+count] == b'attempt to add with overflow'
        return {'start': symbol['value'], 'bytes': symbol['size'], 'exact_eight_byte_slots': 120-len(diffs),
                'total_eight_byte_slots': 120, 'complete_normalized_equal': key(before) == key(window),
                'call_offsets': [c['offset'] for c in window['direct']], 'ordered_callee_shapes_equal': True,
                'sources': sorted(sources), 'source_consumers': source_consumers, 'differences': diffs,
                'typed_data': {'references': 4, 'Source_descriptors': 2, 'unwrap_message_bytes': 43,
                               'vtable_bytes': 32, 'vtable_scalars': [0,8,4],
                               'format_method_original': original_method, 'format_method_candidate': method,
                               'format_method_immediate_calls': method_calls,
                               'overflow_message_bytes': count},
                'normalized_code_after_offset320_equal': a[320:] == b[320:]}
    new = evaluate(candidate)
    assert new['exact_eight_byte_slots'] == 120 and new['complete_normalized_equal']
    assert new['normalized_code_after_offset320_equal']
    assert all(d['offset'] < 320 for d in new['differences'])
    return {'original_sha256': hashlib.sha256(original.b).hexdigest(), 'original_window': [534840,535800],
            'snapshot': new,
            'scope': 'Eight-byte slots include lddw continuation words. The full O0193 body matches under the existing normalization; raw and whole-ELF equality are not implied. Calls are checked by complete normalized callee shape; recursive identity is not asserted.'}
