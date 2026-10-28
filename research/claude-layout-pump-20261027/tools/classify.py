#!/usr/bin/env python3
"""Explain every normalized-but-not-raw window of one candidate against the original.

For each such window the best normalized candidate body is compared slot by slot
(only masked operands can differ). Differences are attributed to:
  * call displacement: the callee is an unmatched original window, a different
    instance was assigned, or the callee is assigned but the net size of the
    unmatched windows between caller and callee is non-zero (drift); the
    blocking unmatched windows are listed;
  * data address: an lddw value into .rodata/.data.rel.ro/.text differs. The
    referenced bytes are compared (pointer qwords masked) to separate pure
    address shifts from referenced-content differences. While `.text` is
    smaller than the original's, every data section starts at a different
    address, so every data operand differs.
`--layout-plan` supplies the correspondence used for the layout (plan.json).
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import argparse
import bisect
import collections
import gzip
import json
import struct
from pathlib import Path

import correspond as C
import mapfile


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def content(img, secs, value, n=24):
    for name, s in secs.items():
        if s['addr'] and s['addr'] <= value < s['addr'] + s['size']:
            off = s['offset'] + value - s['addr']
            return name, value - s['addr'], img[off:off + min(n, s['addr'] + s['size'] - value)]
    return None, None, b''


def location(img, secs, value):
    """Decode a core::panic::Location-shaped record: {&str ptr (high-half reloc), len u64, line u32, col u32}."""
    name, off, b = content(img, secs, value, 24)
    if name != '.data.rel.ro' or len(b) < 24:
        return None
    ptr, length, line, col = struct.unpack('<QQII', b)
    rod = secs['.rodata']
    if ptr & 0xffffffff or not (rod['addr'] <= ptr >> 32 < rod['addr'] + rod['size']) or not 0 < length < 4096 or not 0 < line < 100000 or col > 1000:
        return None
    s = img[rod['offset'] + (ptr >> 32) - rod['addr']:rod['offset'] + (ptr >> 32) - rod['addr'] + length]
    return {'file': s.decode(errors='replace'), 'line': line, 'column': col}


def classify(inventory, plan, original, candidate, link_map):
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in inventory['windows']]
    orig = C.Image(original, windows)
    cand = C.Image(candidate)
    # locate each planned input section in this candidate through its own link map
    where = {(mapfile.owner_pattern(r), r['section']): r['address'] for r in mapfile.parse(link_map) if r['out'] == '.text'}
    assign = {s['original']: where[s['owner'], s['section']] for s in plan['sections']
              if s['original'] is not None and s['normalized_equal']}
    inv = {c: o for o, c in assign.items()}
    # unmatched windows whose placed content changes the net size (no counterpart, or one of another size)
    neutral = {s['original'] for s in plan['sections'] if s['original'] is not None and not s['normalized_equal']
               and s['bytes'] == s['original_bytes']}
    unmatched = sorted(o for o in orig.order if o not in assign and o not in neutral)
    ocum = {}
    rows, summary = [], collections.Counter()
    for w in inventory['windows']:
        if not w['normalized_matches'] or w['raw_match']:
            continue
        o = w['start']
        of = orig.funcs[o]
        c = assign.get(o, w['normalized_matches'][0]['start'])
        cf = cand.funcs[c]
        calls, data = [], []
        cops = {y['offset']: y for y in cf['ops']}
        for x in of['ops']:
            y = cops.get(x['offset'])
            if y is None or y['kind'] != x['kind']:
                # same bytes on both sides; the value only falls inside a section range in one ELF
                assert x['kind'] == 'elf-pointer' and (y is None or y['kind'] == 'elf-pointer')
                continue
            if x['kind'] == 'direct-call':
                ot = x['target']
                ct = y['target']
                if (ot - o) == (ct - c):
                    continue
                if ot not in assign:
                    calls.append({'offset': x['offset'], 'reason': 'callee window unmatched', 'callee': ot})
                elif assign[ot] != ct:
                    calls.append({'offset': x['offset'], 'reason': 'callee instance differs', 'callee': ot})
                else:
                    lo, hi = sorted((o, ot))
                    block = unmatched[bisect.bisect_right(unmatched, lo):bisect.bisect_left(unmatched, hi)]
                    calls.append({'offset': x['offset'], 'reason': 'drift from unmatched windows between caller and callee',
                                  'callee': ot, 'drift': (ct - c) - (ot - o), 'blocking_windows': block})
            else:
                if x['value'] == y['value']:
                    continue
                on, ooff, ob = content(orig.b, orig.secs, x['value'], 8)
                cn, coff, cb = content(cand.b, cand.secs, y['value'], 8)
                if on == '.data.rel.ro' and len(ob) == len(cb) == 8 and ob[:4] == cb[:4] == bytes(4):
                    same = True  # both are relocated pointers (address in the high half); targets not compared
                else:
                    same = on == cn and len(ob) > 0 and ob == cb
                lo, lc = location(orig.b, orig.secs, x['value']), location(cand.b, cand.secs, y['value'])
                entry = {'offset': x['offset'], 'section': on, 'candidate_section': cn,
                         'section_offset': [ooff, coff], 'referenced_8_byte_prefix_equal': bool(same)}
                if lo and lc:
                    entry['location'] = {'original': lo, 'candidate': lc, 'equal': lo == lc}
                data.append(entry)
        kinds = []
        if calls:
            kinds.append('call')
        if data:
            kinds.append('data')
        key = '+'.join(kinds)
        if key == 'call':
            reasons = sorted({x['reason'] for x in calls})
            key += ' (' + '; '.join(reasons) + ')'
        elif data:
            same = all(d['referenced_8_byte_prefix_equal'] for d in data)
            key += ' (referenced 8-byte prefixes equal)' if same else ' (some referenced prefix differs)'
        summary[key] += 1
        rows.append({'start': o, 'bytes': w['bytes'], 'candidate': c, 'class': key, 'calls': calls, 'data': data})
    loc = collections.Counter()
    for r in rows:
        ls = [d['location'] for d in r['data'] if 'location' in d]
        if ls:
            loc['windows referencing Location records'] += 1
            if any(not x['equal'] for x in ls):
                loc['windows with a differing Location (file/line/column)'] += 1
        loc['data operands'] += len(r['data'])
        loc['data operands into .rodata'] += sum(d['section'] == '.rodata' for d in r['data'])
        loc['data operands into .data.rel.ro'] += sum(d['section'] == '.data.rel.ro' for d in r['data'])
        loc['Location operands'] += sum('location' in d for d in r['data'])
        loc['Location operands with equal file/line/column'] += sum(d.get('location', {}).get('equal', False) for d in r['data'])
    blockers = collections.Counter()
    for r in rows:
        if r['data']:
            continue
        for x in r['calls']:
            for b in x.get('blocking_windows', []):
                blockers[b] += 1
    return {'counts': dict(summary), 'data_operands': dict(loc), 'call_only_blockers': [{'window': b, 'bytes': orig.funcs[b]['bytes'], 'blocked_call_sites': n}
                                                            for b, n in blockers.most_common()],
            'text_size': {'original': orig.text['size'], 'candidate': cand.text['size']},
            'rodata_start': {'original': orig.secs['.rodata']['addr'], 'candidate': cand.secs['.rodata']['addr']},
            'windows': rows}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--inventory', type=Path, required=True)
    ap.add_argument('--layout-plan', type=Path, required=True)
    ap.add_argument('--candidate', type=Path, required=True)
    ap.add_argument('--map', type=Path, required=True, help='lld map of the classified candidate')
    ap.add_argument('--output', type=Path, required=True)
    a = ap.parse_args()
    inv = read(a.inventory)
    r = classify(inv, read(a.layout_plan), C.ROOT / 'evidence/original/pump/deployed.so', a.candidate, a.map)
    a.output.write_bytes(gzip.compress(json.dumps(r, indent=1).encode(), mtime=0) if a.output.suffix == '.gz' else json.dumps(r, indent=1).encode())
    print(json.dumps({k: r[k] for k in ['counts', 'data_operands', 'text_size', 'rodata_start']}, indent=1))
    print('top call-only blockers:', [(hex(x['window']), x['bytes'], x['blocked_call_sites']) for x in r['call_only_blockers'][:12]])


if __name__ == '__main__':
    main()
