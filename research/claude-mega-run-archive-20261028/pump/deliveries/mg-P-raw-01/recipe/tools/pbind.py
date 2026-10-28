#!/usr/bin/env python3
"""[mg-P-raw] bind unmatched original windows to candidate functions through matched callers:
a call (or .text lddw) at offset i of a matched window targets orig X and cand Y at the same offset => X <-> Y
(entry offsets only). Returns {orig_start: cand_start} plus conflicts."""
import struct, sys
from collections import defaultdict
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk


def edges(o, c, k):
    """(orig target, cand target, kind, caller orig start) for every internal call / text lddw of matched windows"""
    out = []
    for oa, ca in k.o2c.items():
        size = k.wsize[oa]; i = 0
        while i < size:
            po, pc = oa + i, ca + i
            op = o.b[po]
            if op == 0x18:
                r = o.rel.get(po)
                if r and r['type'] == 8:
                    vo, vc = o.lddw(po), c.lddw(pc)
                    if o.lo <= vo < o.hi: out.append((vo, vc, 'fnptr', oa))
                i += 16; continue
            if op == 0x85 and o.b[po + 1] == 0x10:
                io = struct.unpack_from('<i', o.b, po + 4)[0]; ic = struct.unpack_from('<i', c.b, pc + 4)[0]
                if io != -1:
                    out.append((po + 8 + 8 * io, pc + 8 + 8 * ic, 'call', oa))
            i += 8
    return out


def bind_unmatched(o, c, k):
    votes = defaultdict(lambda: defaultdict(int))
    for to, tc, kind, src in edges(o, c, k):
        if to in k.wsize and to not in k.o2c and tc in k.cf and tc not in k.c2o:
            votes[to][tc] += 1
    res, conf = {}, {}
    for to, v in votes.items():
        best = sorted(v.items(), key=lambda t: -t[1])
        res[to] = best[0][0]
        if len(best) > 1: conf[to] = best
    return res, conf


if __name__ == '__main__':
    o = pk.Elf(pk.ORIG); c = pk.Elf(sys.argv[1]); k = pk.Corr(o, c)
    res, conf = bind_unmatched(o, c, k)
    unm = [a for a in k.ostarts if a not in k.o2c]
    print('unmatched', len(unm), 'bound via callers', len(res), 'conflicts', len(conf))
    for a in unm:
        ca = res.get(a)
        print('  %#8x %6d -> %s' % (a, k.wsize[a], ('%#x %d %s' % (ca, k.cf[ca]['size'], k.cf[ca]['name'][:80])) if ca else '-'))
    for a, b in conf.items(): print('  conflict', hex(a), [(hex(x), n) for x, n in b])
