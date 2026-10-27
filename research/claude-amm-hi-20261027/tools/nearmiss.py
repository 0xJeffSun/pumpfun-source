#!/usr/bin/env python3
"""Near-miss ranking of unmatched original windows vs candidate symbol bodies."""
import sys, json, argparse, difflib, struct
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from common import *
ap = argparse.ArgumentParser()
ap.add_argument('--candidate', default=str(FRONT / 'results/build/candidate.so'))
ap.add_argument('--symbols', default=str(FRONT / 'results/build/unstripped.so'))
ap.add_argument('--measure', default=str(FRONT / 'results/measurement.json.gz'))
ap.add_argument('--ident', default=None, help='identify.json for non-equal-size pairing')
a = ap.parse_args()
o = Elf(ORIG); c = Elf(Path(a.candidate)); s = Elf(Path(a.symbols))
m = load_measure(a.measure)
def toks(elf, start, end, mask_r10=False):
    out = []
    b = elf.normalized
    at = start
    while at < end:
        op = b[at]
        w = bytes(b[at:at+8]) if op != 0x18 else bytes(b[at:at+16])
        if mask_r10:
            regs = b[at+1]
            dst, src = regs & 0xf, regs >> 4
            # stack accesses: stx/st with dst=r10, ldx with src=r10
            if (op & 0x07) in (0x02, 0x03) and dst == 10 or (op & 0x07) == 0x01 and src == 10:
                w = w[:2] + b'\0\0' + w[4:]
            if op == 0x07 and dst == 10:  # add r10
                pass
        out.append(w)
        at += len(w)
    return out
by_size = {}
for f in s.funcs:
    by_size.setdefault(f['size'], []).append(f)
ident = {}
if a.ident:
    for e in json.loads(Path(a.ident).read_text()):
        ident[e['start']] = e['best']
for r in m['rows']:
    if r['matches'] or not (LO <= r['start'] <= HI):
        continue
    st, en = r['start'], r['end']; size = en - st
    ot = toks(o, st, en); otm = toks(o, st, en, True)
    best = []
    cands = list(by_size.get(size, []))
    for b in ident.get(st, [])[:2]:
        f = next((f for f in s.funcs if f['start'] == b['cstart']), None)
        if f and f not in cands:
            cands.append(f)
    for f in cands:
        ct = toks(c, f['start'], f['start'] + f['size']); ctm = toks(c, f['start'], f['start'] + f['size'], True)
        sm = difflib.SequenceMatcher(None, ot, ct, autojunk=False)
        smm = difflib.SequenceMatcher(None, otm, ctm, autojunk=False)
        diff = sum(max(i2-i1, j2-j1) for tag, i1, i2, j1, j2 in sm.get_opcodes() if tag != 'equal')
        diffm = sum(max(i2-i1, j2-j1) for tag, i1, i2, j1, j2 in smm.get_opcodes() if tag != 'equal')
        best.append((diff, diffm, f['size'], f['name']))
    best.sort()
    if best:
        d, dm, cs, n = best[0]
        print('%6x %5d  diff=%4d r10masked=%4d / %4d insns  csize=%5d %s' % (st, size, d, dm, len(ot), cs, n[:100]))
    else:
        print('%6x %5d  (no candidate)' % (st, size))
