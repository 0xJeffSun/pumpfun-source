"""Explicit local static comparison. No network, compiler, VM or receipt reader."""
if not __debug__:
    raise RuntimeError('Optimized Python disables integrity assertions; refusing to load parsers or ELF inputs')

from pathlib import Path
import argparse
import hashlib
import importlib.util
import json
import struct
from source_tools import read_under, verify

P = Path(__file__).resolve().parent
H = lambda b: hashlib.sha256(b).hexdigest()
ORIGINAL = '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
LITERALS = {152:14, 592:4, 736:4, 784:55, 1432:47, 2696:4, 2840:4, 5048:47, 7248:32, 7432:17}
VTABLES = {640:48, 808:32, 2744:48}


def load_parser(root, pins):
    root = Path(root)
    for name, expected in pins.items():
        assert H(read_under(root, name)) == expected, name
    path = root / 'research/fees-crank-relay-rejection/window_map.py'
    spec = importlib.util.spec_from_file_location('withdraw_pinned_windows', path)
    w = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(w)
    return w


def audit(w, original, candidate, symbols):
    assert H(original) == ORIGINAL
    ol, cl, sl = [w.m.elf_layout(b) for b in (original, candidate, symbols)]
    for section in cl['sections']:
        if section['flags'] & 2 and section['type'] != 8:
            other, = [x for x in sl['sections'] if x['name'] == section['name']]
            assert section['address'] == other['address']
            assert w.m.section_data(candidate, section['name']) == w.m.section_data(symbols, section['name'])
    ow, cw = w.windows(original), w.windows(symbols)
    oi, ci = ({x['address']:x for x in rows} for rows in (ow, cw))
    wrapper, = [x for x in cw if x['signature'] == oi[657672]['signature']]
    def rows(image, body):
        return w.m.instructions(image, body['address'], body['bytes'])
    def target(image, body, offset):
        r, = [x for x in rows(image, body) if x['offset'] == offset]
        assert dict(w.m.relocations(image)).get(body['address']+offset, 0) & 0xffffffff != 10
        return r['call_target']
    assert target(original, oi[657672], 440) == 249264
    body = ci[target(candidate, wrapper, 440)]
    assert oi[249264]['bytes'] == body['bytes'] == 8000
    assert oi[249264]['signature'] == body['signature']
    x, y = rows(original, oi[249264]), rows(candidate, body)
    assert len(x) == len(y) == 967
    assert not any(r['opcode'] == 0x8d for r in x+y)
    def calls(image, body, rr):
        rel = dict(w.m.relocations(image)); dyn = w.dynamic_symbols(image)
        inner, external = [], []
        for r in rr:
            info = rel.get(body['address']+r['offset'], 0)
            if info & 0xffffffff == 10:
                external.append((r['offset'], dyn[info >> 32]['name']))
            elif 'call_target' in r:
                inner.append((r['offset'], r['call_target']))
        return inner, external
    oc, oe = calls(original, oi[249264], x)
    cc, ce = calls(candidate, body, y)
    assert oe == ce and len(oc) == len(cc) == 25
    call_proof = []
    for (off, a), (coff, b) in zip(oc, cc):
        assert off == coff and oi[a]['bytes'] == ci[b]['bytes'] and oi[a]['signature'] == ci[b]['signature']
        call_proof.append({'offset':off, 'original_target':a, 'candidate_target':b,
                           'bytes':oi[a]['bytes'], 'complete_callee_shape':oi[a]['signature']})
    def references(image, body, rr):
        rel = dict(w.m.relocations(image))
        return {r['offset']:r['lddw_value'] for r in rr if rel.get(body['address']+r['offset'],0)&0xffffffff == 8}
    left, right = references(original, oi[249264], x), references(candidate, body, y)
    assert set(left) == set(right) == set(LITERALS) | set(VTABLES) | {824}
    def vtable(image, index, address, extent):
        rel = dict(w.m.relocations(image)); result = []
        for off in range(0, extent, 8):
            value, = struct.unpack('<Q', w.m.at_address(image, address+off, 8))
            if off in (8, 16):
                result.append(('metadata', value))
            else:
                assert rel.get(address+off,0)&0xffffffff == 8
                t = index[value >> 32]
                result.append(('function', t['bytes'], t['signature']))
        return result
    def location(image, address):
        assert dict(w.m.relocations(image)).get(address,0)&0xffffffff == 8
        low, ptr, length, line, column = struct.unpack('<IIQII', w.m.at_address(image,address,24))
        assert low == 0 and 0 < length <= 300
        ro, = [s for s in w.m.elf_layout(image)['sections'] if s['name'] == '.rodata']
        assert ro['address'] <= ptr and ptr+length <= ro['address']+ro['size']
        path = w.m.at_address(image, ptr, length)
        assert path.endswith(b'.rs')
        return {'path':path.decode('utf8'), 'path_bytes':length, 'line':line, 'column':column}
    objects = []
    for off in sorted(left):
        a, b = left[off], right[off]
        if off in LITERALS:
            extent = LITERALS[off]
            value = w.m.at_address(original,a,extent)
            assert value == w.m.at_address(candidate,b,extent)
            detail = {'kind':'complete used literal/tag extent', 'bytes':extent, 'sha256':H(value)}
        elif off in VTABLES:
            extent = VTABLES[off]; value = vtable(original,oi,a,extent)
            assert value == vtable(candidate,ci,b,extent)
            detail = {'kind':'trait-vtable fields and callback shapes', 'bytes':extent, 'entries':value}
        else:
            value = location(original,a); assert value == location(candidate,b)
            detail = {'kind':'Rust Location and bounded path', 'bytes':24, 'value':value}
        objects.append({'offset':off, 'original_target':a, 'candidate_target':b, **detail})
    for rr in (x, y):
        index = {r['offset']:r for r in rr}
        for off, line in [(1432,91), (5048,125)]:
            for relative, opcode, immediate in [(24,0x62,6036),(32,0x72,2),(40,0x62,line),(48,0x7a,47),(56,0x7a,0)]:
                r = index[off+relative]
                assert (r['opcode'],r['destination'],r['immediate']) == (opcode,10,immediate)
    sig = {r['signature'] for r in cw}; raw = {r['raw_sha256'] for r in cw}
    return {'candidate_sha256':H(candidate), 'symbols_sha256':H(symbols),
        'body_original':249264, 'body_candidate':body['address'], 'body_bytes':8000,
        'body_normalized_equal':True, 'body_raw_equal':w.m.at_address(original,249264,8000)==w.m.at_address(candidate,body['address'],8000),
        'wrapper_original':657672, 'wrapper_candidate':wrapper['address'], 'wrapper_call_offset':440,
        'actual_callees':call_proof, 'direct_operands':objects,
        'normalized':sum(r['signature'] in sig for r in ow), 'raw':sum(r['raw_sha256'] in raw for r in ow),
        'whole_capture_equal':original==candidate,
        'whole_meaningful_elf_equal':original[:ol['elf_extent']]==candidate,
        'runtime_verified':False, 'native_build_verified':False,
        'scope':'Full normalized body, actual incoming call,25 same-offset callee shapes,14 used data operands and Source fields only. No transitive, indirect, arbitrary-state or whole-file identity proof.'}


def mutations(w, original, candidate, symbols, proof):
    def alter(address, value):
        out = []
        for image in (candidate, symbols):
            section, = [s for s in w.m.elf_layout(image)['sections'] if s['type']!=8 and s['flags']&2 and s['address']<=address and address+len(value)<=s['address']+s['size']]
            offset = section['offset']+address-section['address']; data = bytearray(image)
            data[offset:offset+len(value)] = value; out.append(bytes(data))
        assert out[0] != candidate
        return out
    body = proof['body_candidate']; refs = {r['offset']:r['candidate_target'] for r in proof['direct_operands']}
    cases = [('business opcode',body,b'\xb7'), ('actual callee',body+324,struct.pack('<i',0)),
        ('source path extent',refs[1432]+46,b'X'), ('error discriminant',refs[592],struct.pack('<I',35)),
        ('vtable callback',refs[640],struct.pack('<Q',proof['actual_callees'][0]['candidate_target']<<32)),
        ('Source line',body+1432+44,struct.pack('<i',90)), ('Source length',body+1432+52,struct.pack('<i',46)),
        ('wrapper actual target',proof['wrapper_candidate']+444,struct.pack('<i',0)),
        ('Location column',refs[824]+20,struct.pack('<I',15))]
    results = []
    for name, address, value in cases:
        a, b = alter(address,value)
        try:
            audit(w,original,a,b)
        except (AssertionError, KeyError, ValueError, IndexError, StopIteration, struct.error):
            results.append({'name':name,'rejected':True})
        else:
            raise AssertionError(('accepted mutation',name))
    return results


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--original',type=Path,required=True)
    p.add_argument('--candidate',type=Path,required=True)
    p.add_argument('--symbols',type=Path,required=True)
    p.add_argument('--parser-root',type=Path,required=True)
    p.add_argument('--stage',choices=['historical','union25'],required=True)
    p.add_argument('--mutations',action='store_true')
    a = p.parse_args(); m, _ = verify(P)
    o, c, s = [path.read_bytes() for path in [a.original,a.candidate,a.symbols]]
    expected = m['local_static_images'][a.stage]
    assert H(c)==expected['candidate_sha256'] and H(s)==expected['symbols_sha256']
    w = load_parser(a.parser_root,m['parsers']); proof = audit(w,o,c,s)
    assert proof['normalized']==expected['normalized'] and proof['raw']==expected['raw']
    if a.mutations:
        proof['in_memory_rejection_tests'] = mutations(w,o,c,s,proof)
    print(json.dumps(proof,indent=2,sort_keys=True))
