"""Recompute the complete selector body, actual callees, and typed referents."""
from pathlib import Path
from functools import lru_cache
from collections import Counter
import gzip, hashlib, importlib.util, json, struct, sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
spec = importlib.util.spec_from_file_location('w', ROOT / 'research/fees-composed-frontier188/window_map.py')
w = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w)
w.m.elf_layout = lru_cache(maxsize=4)(w.m.elf_layout)
w.m.relocations = lru_cache(maxsize=4)(w.m.relocations)
blobs = {'original': (ROOT / 'evidence/original/pump_amm/deployed.so').read_bytes()}
blobs.update({k: gzip.decompress((HERE / 'builds' / k / 'symbols.so.gz').read_bytes()) for k in ['baseline', 'candidate']})
maps = {k: {f['address']: f for f in w.windows(b)} for k, b in blobs.items()}
targets = {'original': maps['original'][0x14088]}
for k in ['baseline', 'candidate']:
    targets[k] = next(f for f in maps[k].values() if f['name'] and '19select_and_apply_v217h' in f['name'])
assert targets['candidate']['signature'] == targets['original']['signature'] != targets['baseline']['signature']
assert targets['original']['bytes'] == 1656 and targets['original']['instructions'] == 195
counts = {k: [Counter(f[field] for f in maps['original'].values()) & Counter(f[field] for f in fs.values()) for field in ['signature', 'raw_sha256']] for k, fs in maps.items()}
assert [sum(x.values()) for x in counts['baseline']] == [736, 159]
assert [sum(x.values()) for x in counts['candidate']] == [737, 159]
assert not counts['baseline'][0] - counts['candidate'][0] and not counts['baseline'][1] - counts['candidate'][1]
assert counts['candidate'][0] - counts['baseline'][0] == Counter({targets['original']['signature']: 1})
rows = {k: w.m.instructions(blobs[k], f['address'], f['bytes']) for k, f in targets.items()}
rel = {k: dict(w.m.relocations(b)) for k, b in blobs.items()}

def ptr(k, address):
    assert rel[k].get(address, 0) & 0xffffffff == 8
    raw = int.from_bytes(w.m.at_address(blobs[k], address, 8), 'little')
    assert raw & 0xffffffff == 0
    return raw >> 32

calls, data = [], []
for left, right in zip(rows['original'], rows['candidate']):
    offset = left['offset']
    assert offset == right['offset']
    if 'call_target' in left:
        a, b = maps['original'][left['call_target']], maps['candidate'][right['call_target']]
        assert a['signature'] == b['signature']
        calls.append({'offset': offset, 'original': a, 'candidate': b})
    if 'lddw_value' not in left:
        continue
    aa, bb = left['lddw_value'], right['lddw_value']
    assert rel['original'].get(targets['original']['address'] + offset, 0) & 0xffffffff == 8
    assert rel['candidate'].get(targets['candidate']['address'] + offset, 0) & 0xffffffff == 8
    row = {'offset': offset, 'original': aa, 'candidate': bb}
    if offset in [496, 664]:
        size = 48 if offset == 496 else 32
        layout = w.m.at_address(blobs['original'], aa + 8, 16)
        assert layout == w.m.at_address(blobs['candidate'], bb + 8, 16)
        assert struct.unpack('<QQ', layout) == ((24, 8) if offset == 496 else (0, 1))
        methods = []
        for slot in ([0, 24, 32, 40] if size == 48 else [0, 24]):
            a, b = maps['original'][ptr('original', aa + slot)], maps['candidate'][ptr('candidate', bb + slot)]
            assert a['signature'] == b['signature']
            methods.append({'slot': slot, 'original': a, 'candidate': b})
        row.update(kind='vtable', bytes=size, layout=list(struct.unpack('<QQ', layout)), methods=methods)
    elif offset == 680:
        tail = w.m.at_address(blobs['original'], aa + 8, 16)
        assert tail == w.m.at_address(blobs['candidate'], bb + 8, 16)
        length, line, column = struct.unpack('<QII', tail)
        value = w.m.at_address(blobs['original'], ptr('original', aa), length)
        assert value == w.m.at_address(blobs['candidate'], ptr('candidate', bb), length)
        row.update(kind='panic Location', bytes=24, filename=value.decode(), line=line, column=column)
    else:
        sizes = {208: 14, 288: 32, 448: 4, 592: 4, 640: 55, 816: 35, 1176: 32, 1240: 32, 1304: 32}
        size = sizes[offset]
        value = w.m.at_address(blobs['original'], aa, size)
        assert value == w.m.at_address(blobs['candidate'], bb, size)
        if offset in [448, 592]:
            assert value == struct.pack('<I', 83)
        row.update(kind='value', bytes=size, hex=value.hex())
    data.append(row)
assert len(calls) == 13 and len(data) == 12
for k in ['original', 'candidate']:
    by_offset = {r['offset']: r for r in rows[k]}
    for offset, opcode, dest, source, displacement, immediate in [(832, 0x7b, 10, 1, -240, 0), (840, 0x62, 10, 0, -96, 6083), (848, 0x72, 10, 0, -168, 2), (856, 0x62, 10, 0, -224, 184), (864, 0x7a, 10, 0, -232, 35), (872, 0x7a, 10, 0, -248, 0)]:
        r = by_offset[offset]
        assert (r['opcode'], r['destination'], r['source'], r['displacement'], r['immediate']) == (opcode, dest, source, displacement, immediate)
hop = maps['original'][0x44ab0]
candidate_hop = next(f for f in maps['candidate'].values() if f['name'] and '14apply_hop_fees17h' in f['name'])
assert candidate_hop['signature'] == hop['signature']
edge = next(r for r in w.m.instructions(blobs['candidate'], candidate_hop['address'], candidate_hop['bytes']) if r['offset'] == 208)
assert edge['call_target'] == targets['candidate']['address']
out = {'symbols_sha256': {k: hashlib.sha256(b).hexdigest() for k, b in blobs.items()}, 'counts': {k: [sum(x.values()) for x in v] for k, v in counts.items()}, 'targets': targets, 'direct_calls': calls, 'typed_references': data, 'source_record': {'filename': 'programs/pump-amm/src/curve/fees.rs', 'line': 184, 'error': 6083}, 'preserved_hop': candidate_hop, 'hop_call_offset': 208, 'whole_elf_equal': False}
if '--write' in sys.argv:
    (HERE / 'static.json').write_bytes((json.dumps(out, indent=2) + '\n').encode())
else:
    assert out == json.loads((HERE / 'static.json').read_bytes())
print('PASS: 736 -> 737,159raw retained; whole1656B selector;13callee bodies;12typed referents;6vtable methods;Source184/6083')
