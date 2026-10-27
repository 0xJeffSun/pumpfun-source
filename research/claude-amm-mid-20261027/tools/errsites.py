#!/usr/bin/env python3
"""Catalog error-construction sites: for every window/function, find
(filename string, filename length, line imm, error code imm) tuples as stored by
anchor's error!/require! expansions: lddw <filename>; ... stw [r10-X]=code ... stw line; stdw len."""
import argparse, json, struct, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from sbf import load, insns, windows
from refs import addr_to_off


def fname(e, addr, ln):
    off, sec = addr_to_off(e, addr)
    if off is None:
        return None
    return e.b[off:off + ln].decode('latin1', 'replace')


def sites(e, start, end):
    ins = list(insns(e, start, end))
    out = []
    for i, (at, op, dst, src, off, imm, w) in enumerate(ins):
        if op != 0x18:
            continue
        # look ahead up to 12 insns for a stdw len (imm 20..90) paired with stw line
        look = ins[i + 1:i + 14]
        lens = [x for x in look if x[1] == 0x7a and 20 <= x[5] <= 100]
        if not lens:
            continue
        ln = lens[0][5]
        s = fname(e, imm, ln)
        if not s or not s.startswith('programs/') and not s.startswith('src/'):
            continue
        if not s.endswith('.rs'):
            continue
        lines = [x[5] for x in look if x[1] == 0x62 and 1 <= x[5] < 5000]
        codes = [x[5] for x in look if x[1] == 0x62 and 2000 <= x[5] < 7000] + \
                [x[5] for x in ins[max(0, i - 6):i] if x[1] in (0x62, 0xb4, 0xb7) and 2000 <= x[5] < 7000]
        out.append({'off': at - start, 'file': s, 'line_candidates': lines, 'codes': codes})
    return out


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--candidate'); p.add_argument('--symbols'); p.add_argument('--measure', required=True)
    p.add_argument('--size', type=int, default=520)
    a = p.parse_args()
    o, c, s = load(a.candidate, a.symbols)
    m = json.load(open(a.measure))
    matched = {r['start']: r['matches'] for r in m['rows']}
    claimed = {mm['start'] for r in m['rows'] for mm in r['matches']}
    print('ORIGINAL windows of size', a.size)
    for st, en in windows(o):
        if en - st == a.size:
            print(' %06x %s %s' % (st, 'M' if matched.get(st) else 'U', sites(o, st, en)))
    print('CANDIDATE functions of size', a.size)
    for f in sorted(s.funcs, key=lambda f: f['start']):
        if f['size'] == a.size:
            print(' %06x %s %s %s' % (f['start'], 'C' if f['start'] in claimed else 'u', f['name'][-70:], sites(s, f['start'], f['start'] + f['size'])))


if __name__ == '__main__':
    main()
