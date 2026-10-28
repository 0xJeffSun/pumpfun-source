#!/usr/bin/env python3
"""[mg-P-raw] per merged piece: original first-use window vs candidate first-use function (default-link order)."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, pdatamap, dem, cst, firstuse
build, es = Path(sys.argv[1]), int(sys.argv[2])
o, c, cp, op, olo, ps = cst.run(build, es)
k = pk.Corr(o, c)
ms = [s for s in pk.parse_map(pdatamap.mapfile(build)) if s['file'] == '<internal>' and s['section'] == '.rodata.cst%d' % es][0]
fmt = lambda p: str(int.from_bytes(p, 'little')) if es <= 8 else p.hex()[:16]
ofirst, cfirst = {}, {}
for a in k.ostarts:
    for p in firstuse.refs(o, a, k.wsize[a], olo, olo + len(op) * es, es): ofirst.setdefault(p, a)
cidx = {a: i for i, a in enumerate(k.cstarts)}
for a in k.cstarts:
    for p in firstuse.refs(c, a, k.cf[a]['size'], ms['addr'], ms['addr'] + ms['size'], es): cfirst.setdefault(p, a)
for sh in range(32):
    oseq = [p for p in op if cst.shard(p) == sh]; cseq = [p for p in cp if cst.shard(p) == sh]
    if [fmt(x) for x in oseq] == [fmt(x) for x in cseq]: continue
    print('shard', sh)
    for p in oseq + [x for x in cseq if x not in oseq]:
        oa = ofirst.get(p); ca = cfirst.get(p)
        print('   %-11s orig %-9s %-55s | cand c#%-4s %s' % (fmt(p), hex(oa) if oa else '-', (dem.dem(k.cf[k.o2c[oa]]['name']) if oa in k.o2c else 'UNM')[:55] if oa else '',
              cidx.get(ca, '-'), dem.dem(k.cf[ca]['name'])[:55] if ca else ''))
