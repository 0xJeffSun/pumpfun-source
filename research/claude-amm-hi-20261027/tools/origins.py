#!/usr/bin/env python3
"""Extract anchor Source{filename,line} origin immediates per function (orig windows and candidate symbols)."""
import sys, json, argparse, struct, collections
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from common import *

def strat(elf, v, n):
    name, sec = section_of(elf, v)
    if not sec: return None
    off = sec[4] + (v - sec[3])
    return elf.b[off:off+n]

def origins(elf, start, end):
    b = elf.b
    ins = []
    at = start
    while at < end:
        op = b[at]; regs = b[at+1]; dst = regs & 0xf; src = regs >> 4
        off = struct.unpack_from('<h', b, at+2)[0]; imm = struct.unpack_from('<i', b, at+4)[0]
        if op == 0x18:
            v = (imm & 0xffffffff) | (struct.unpack_from('<I', b, at+12)[0] << 32)
            ins.append((at, op, dst, src, off, v)); at += 16; continue
        ins.append((at, op, dst, src, off, imm)); at += 8
    out = []
    W = 14
    for i, (at, op, dst, src, off, imm) in enumerate(ins):
        if not (op == 0x62 and dst == 10):
            continue
        lo, hi = max(0, i - W), min(len(ins), i + W)
        ln = None; ptr = None
        for j in range(lo, hi):
            a2, o2, d2, s2, f2, i2 = ins[j]
            if o2 == 0x7a and d2 == 10 and f2 == off - 8:
                ln = i2
            if o2 == 0x7b and d2 == 10 and f2 == off - 16:
                # find lddw into s2 before j
                for k in range(j - 1, max(-1, j - W), -1):
                    if ins[k][1] == 0x18 and ins[k][2] == s2:
                        ptr = ins[k][5]; break
                    if ins[k][2] == s2 and ins[k][1] in (0xbf, 0xb7, 0x07, 0x0f, 0x79):
                        break
        if ln is None or ptr is None or not (8 <= ln <= 120):
            continue
        s = strat(elf, ptr, ln)
        if s and s.startswith((b'programs/', b'src/')):
            out.append((at - start, s.decode(errors='replace'), imm))
    return out

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--candidate', default=str(FRONT / 'results/build/candidate.so'))
    ap.add_argument('--symbols', default=str(FRONT / 'results/build/unstripped.so'))
    ap.add_argument('--measure', default=str(FRONT / 'results/measurement.json.gz'))
    ap.add_argument('--out', required=True)
    a = ap.parse_args()
    o = Elf(ORIG); s = Elf(Path(a.symbols))
    m = load_measure(a.measure)
    res = {'orig': [], 'cand': []}
    for r in m['rows']:
        og = origins(o, r['start'], r['end'])
        if og:
            res['orig'].append({'start': r['start'], 'size': r['end'] - r['start'], 'matched': bool(r['matches']),
                                'names': [mm['name'] for mm in r['matches']][:2], 'origins': og})
    for f in s.funcs:
        og = origins(s, f['start'], f['start'] + f['size'])
        if og:
            res['cand'].append({'start': f['start'], 'size': f['size'], 'name': f['name'], 'origins': og})
    Path(a.out).write_text(json.dumps(res, indent=1))
    # summary by file:line
    oc = collections.Counter(); cc = collections.Counter()
    for e in res['orig']:
        for _, f, l in e['origins']: oc[(f, l)] += 1
    for e in res['cand']:
        for _, f, l in e['origins']: cc[(f, l)] += 1
    print('orig windows with origins:', len(res['orig']), ' cand funcs:', len(res['cand']))
    files = sorted(set(f for f, _ in oc) | set(f for f, _ in cc))
    for fl in files:
        ol = sorted(l for (f, l) in oc if f == fl); cl = sorted(l for (f, l) in cc if f == fl)
        print('%-75s orig=%s cand=%s' % (fl, ol, cl))
