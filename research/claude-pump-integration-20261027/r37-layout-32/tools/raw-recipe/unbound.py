#!/usr/bin/env python3
"""[mg-P-raw] explain unbound data objects referenced by matched windows: for each (orig, cand) lddw pair whose
candidate object is unbound, show both contents (pointers resolved to section+offset / strings)."""
import sys, struct
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, pdatamap, dem


def show(e, a, n, k=None, side='o'):
    out = []
    for j in range(0, n, 8):
        if e.rel.get(a + j):
            p = pdatamap.ptr(e.b, a + j); s = e.secname(p)
            if s in pdatamap.DATA:
                bs = e.b[p:p + 40]
                out.append('P->%s+%#x"%s"' % (s, p - e.sec[s]['addr'], bs.split(b'\0')[0][:40].decode('latin1')))
            else: out.append('P->%s %#x' % (s, p))
        else:
            out.append(e.b[a + j:a + j + 8].hex())
    return ' '.join(out)


o, c, k, secs, allsecs = pdatamap.load(sys.argv[1])
b = pdatamap.Binder(o, c, k, secs); pairs = pdatamap.anchors(o, c, k); b.run(set(pairs))
seen = set()
for vo, vc in sorted(pairs, key=lambda t: t[1]):
    s = b.sec_at(vc)
    if s is None or s['file'] == '<internal>' or s['addr'] in b.bound or s['addr'] in seen: continue
    seen.add(s['addr'])
    users = sorted({hex(oa) for oa, ca in k.o2c.items() if any(c.b[ca + i] == 0x18 and c.lddw(ca + i) == vc for i in range(0, k.wsize[oa], 8))})[:4]
    n = s['size']
    print('%s %s size %d  users %s' % (s['out'], s['section'][-24:], n, users))
    print('   cand:', show(c, s['addr'], n if s['out'] == '.data.rel.ro' else 0) if s['out'] == '.data.rel.ro' else c.b[s['addr']:s['addr'] + n][:48])
    print('   orig:', show(o, vo - (vc - s['addr']), n) if s['out'] == '.data.rel.ro' else o.b[vo - (vc - s['addr']):vo - (vc - s['addr']) + n][:48])
