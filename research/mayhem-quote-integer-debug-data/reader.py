"""Read one bounded nested Debug-data route; never execute or modify an ELF."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import struct
import sys

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('integer_debug_windows', P / 'window_map.py')
wm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wm)
sha = lambda b: hashlib.sha256(b).hexdigest()


def inputs():
    return ((ROOT / 'evidence/original/mayhem/deployed.so').read_bytes(),
            gzip.decompress((ROOT / 'research/mayhem-quotes-current-recovery-20261027/builds/current/symbols.so.gz').read_bytes()))


def file_offset(image, address, size=1):
    section = next(s for s in wm.m.elf_layout(image)['sections']
                   if s['type'] != 8 and s['address'] <= address
                   and address + size <= s['address'] + s['size'])
    return section['offset'] + address - section['address']


def inspect(original, candidate):
    images = [original, candidate]
    tables = [{x['address']: x for x in wm.windows(b)} for b in images]
    rels = [dict(wm.m.relocations(b)) for b in images]
    get = lambda k, at, size: wm.m.at_address(images[k], at, size)
    instructions = lambda k, row: {x['offset']: x for x in wm.m.instructions(images[k], row['address'], row['bytes'])}

    def shape(row):
        return [row['bytes'], row['signature']]

    def pair(at, other):
        a, b = tables[0][at], tables[1][other]
        assert shape(a) == shape(b), ('complete body', at, other)
        return [dict(address=r['address'], bytes=r['bytes'], signature=r['signature']) for r in [a, b]]

    def pointer(k, at):
        assert rels[k].get(at, 0) & 0xffffffff == 8, ('pointer relocation', at)
        low, target = struct.unpack('<II', get(k, at, 8))
        assert low == 0 and target in tables[k], ('function pointer', at)
        return target

    def vtable(k, at, header):
        assert struct.unpack('<QQQ', get(k, at, 24)) == header, ('scalar vtable header', at)
        assert not any(at + off in rels[k] for off in [0, 8, 16])
        return pointer(k, at + 24)

    roots = []
    formatters = [set(), set()]
    unwraps = [set(), set()]
    for name, start, offsets in [('buy_quote', 185296, [1112, 1192]),
                                  ('sell_quote', 186552, [976, 1056])]:
        before = tables[0][start]
        after = [r for r in tables[1].values() if r['name'] and name + '17' in r['name']]
        assert len(after) == 1
        after = after[0]
        body_pair = pair(start, after['address'])
        selected = []
        for k, body in enumerate([before, after]):
            code = instructions(k, body)
            for offset in offsets:
                site = code[offset]
                assert site['opcode'] == 0x18 and site['destination'] == 4
                assert rels[k].get(body['address'] + offset, 0) & 0xffffffff == 8
                at = site['lddw_value']
                fmt = vtable(k, at, (0, 0, 1))
                call = code[offset + 32]
                assert call['opcode'] == 0x85 and call['source'] == 1
                assert body['address'] + offset + 32 not in rels[k]
                unwrap = call['call_target']
                assert unwrap in tables[k]
                formatters[k].add(fmt)
                unwraps[k].add(unwrap)
                selected.append(dict(side=k, offset=offset, vtable=at, bytes=32,
                                     formatter=fmt, unwrap_call_offset=offset + 32,
                                     unwrap=unwrap))
        roots.append(dict(helper=name, bodies=body_pair, sites=selected))
    assert list(map(len, formatters)) == [1, 1]
    assert list(map(len, unwraps)) == [1, 1]
    fmt = [next(iter(x)) for x in formatters]
    unwrap = [next(iter(x)) for x in unwraps]
    assert fmt[0] == 38200 and unwrap[0] == 674280
    top_pair = pair(*fmt)
    assert top_pair[0]['bytes'] == 88
    unwrap_pair = pair(*unwrap)
    assert unwrap_pair[0]['bytes'] == 232

    data, tuples, units = [], [], []
    for k, at in enumerate(fmt):
        body = tables[k][at]
        code = instructions(k, body)
        assert code[0]['raw'] == '7b1af8ff00000000'
        assert code[8]['raw'] == 'bfa4000000000000'
        assert code[16]['raw'] == '07040000f8ffffff'
        assert code[24]['raw'] == 'bf21000000000000'
        assert code[32]['opcode'] == 0x18 and code[32]['destination'] == 2
        assert code[48]['raw'] == 'b70300000f000000'
        assert code[56]['opcode'] == 0x18 and code[56]['destination'] == 5
        for offset in [32, 56]:
            assert rels[k].get(at + offset, 0) & 0xffffffff == 8
        name = code[32]['lddw_value']
        assert get(k, name, 15) == b'TryFromIntError', 'counted error name'
        vt = code[56]['lddw_value']
        unit = vtable(k, vt, (0, 8, 8))
        call = code[72]
        assert call['opcode'] == 0x85 and call['source'] == 1 and at + 72 not in rels[k]
        tuples.append(call['call_target'])
        units.append(unit)
        data.append(dict(name_pointer=name, name_bytes=15, name='TryFromIntError',
                         nested_vtable=vt, nested_vtable_bytes=32,
                         nested_header=[0, 8, 8], nested_formatter=unit))
    tuple_pair, unit_pair = pair(*tuples), pair(*units)
    assert tuple_pair[0]['address'] == 682832 and tuple_pair[0]['bytes'] == 720
    assert unit_pair[0]['address'] == 32184 and unit_pair[0]['bytes'] == 48

    pads = []
    for k, (tu, unit) in enumerate(zip(tuples, units)):
        code = instructions(k, tables[k][tu])
        # Both actual routes reload argument five, read an eight-byte fmt
        # pointer at +24, and call that register. No generic callx closure.
        markers = {0: '7b5ab8ff00000000', 8: '7b4ac0ff00000000',
                   160: '79a1b8ff00000000', 168: '7913180000000000',
                   176: '79a1c0ff00000000', 184: 'bf62000000000000',
                   192: '8d00000003000000',
                   384: '79a1b8ff00000000', 392: '7913180000000000',
                   424: '8d00000003000000'}
        for offset, raw in markers.items():
            assert code[offset]['raw'] == raw, ('nested vtable consumer', offset)
        code = instructions(k, tables[k][unit])
        assert code[0]['raw'] == 'bf21000000000000'
        assert code[8]['opcode'] == 0x18 and code[8]['destination'] == 2
        assert rels[k].get(unit + 8, 0) & 0xffffffff == 8
        assert code[24]['raw'] == 'b703000002000000'
        text = code[8]['lddw_value']
        assert get(k, text, 2) == b'()', 'counted nested literal'
        call = code[32]
        assert call['opcode'] == 0x85 and call['source'] == 1 and unit + 32 not in rels[k]
        pads.append(call['call_target'])
        data[k].update(nested_literal_pointer=text, nested_literal_bytes=2,
                       nested_literal='()', consumer_call_offsets=[192, 424])
    pad_pair = pair(*pads)
    assert pad_pair[0]['address'] == 680824 and pad_pair[0]['bytes'] == 1320
    return dict(original_sha256=sha(original), candidate_symbols_sha256=sha(candidate),
                roots=roots, integer_debug=top_pair, unwrap=unwrap_pair,
                tuple_consumer=tuple_pair, nested_debug=unit_pair, padding=pad_pair,
                selected_data=data, counted_name_equal=True, nested_header_equal=True,
                nested_literal_equal=True, selected_routes=4,
                scope='Four existing quote unwrap vtable sites, one shared 15-byte name, '
                      'one 32-byte nested vtable, its complete 48-byte formatter, two actual '
                      '+24 pointer-load/callx sites, and its counted 2-byte literal. '
                      'Complete immediate tuple/padding body shapes agree. '
                      'No new function match, runtime execution, formatter-output equivalence, '
                      'arbitrary data extent, or recursive/generic indirect-dispatch closure.')
