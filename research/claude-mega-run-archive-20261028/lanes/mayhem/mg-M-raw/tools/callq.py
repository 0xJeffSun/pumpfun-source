#!/usr/bin/env python3
"""callq.py CAND_SYMBOLS.so [WIN ...] : wrong calls in windows; --callers SUBSTR: candidate callers of a function."""
import sys, struct
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import elfcmp
a = sys.argv[1:]
o = elfcmp.m.Elf(elfcmp.ORIG.resolve()); c = elfcmp.m.Elf(Path(a[0]).resolve()); k = elfcmp.Corr(o, c)
nm = lambda ca: k.cf[ca]['name'][:110] if ca in k.cf else hex(ca)
if a[1] == '--callers':
    tg = [x for x in k.cstarts if a[2] in k.cf[x]['name']]
    for t in tg:
        callers = []
        for ca in k.cstarts:
            for pc in range(ca, ca + k.cf[ca]['size'], 8):
                if c.b[pc] == 0x85 and c.b[pc + 1] == 0x10 and pc + 8 + 8 * struct.unpack_from('<i', c.b, pc + 4)[0] == t:
                    callers.append((k.id.get(k.c2o.get(ca)), nm(ca)[:80]))
        print(nm(t)[:90], '<-', sorted(set(callers), key=str))
    sys.exit()
for w in a[1:]:
    oa = next(x for x in k.ostarts if k.id[x] == w); ca = k.o2c[oa]
    for i in range(0, k.ow[oa]['end'] - oa, 8):
        po, pc = oa + i, ca + i
        if o.b[po] == 0x85 and o.b[po + 1] == 0x10 and not (o.rel.get(po) and o.rel[po]['type'] == 10):
            to = po + 8 + 8 * struct.unpack_from('<i', o.b, po + 4)[0]; tc = pc + 8 + 8 * struct.unpack_from('<i', c.b, pc + 4)[0]
            if k.c2o_addr(tc) != to:
                ow = k.ofunc_at(to)
                print(w, 'off', i, 'orig->', k.id.get(ow), to - ow if ow else None, '| cand->', nm(k.cfunc_at(tc)), tc - (k.cfunc_at(tc) or 0))
