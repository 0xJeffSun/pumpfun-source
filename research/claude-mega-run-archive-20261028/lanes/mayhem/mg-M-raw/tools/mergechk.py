#!/usr/bin/env python3
"""mergechk.py BUILD_DIR : for each merged synthetic .rodata section (<internal>), map its pieces to the original
through lddw anchors and report delta runs (constant delta = same internal layout) and pieces missing/extra."""
import sys, json
from pathlib import Path
from collections import Counter, defaultdict
sys.path.insert(0, str(Path(__file__).resolve().parent))
import datamap, elfcmp
o, c, k, secs = datamap.load(sys.argv[1])
pairs = datamap.anchors(o, c, k)
b = datamap.Binder(o, c, k, secs); b.run(set(pairs))
# include pointer pairs from bound data.rel.ro objects
import struct
for ca, oa in b.bound.items():
    s = b.sec_at(ca)
    if s['out'] != '.data.rel.ro': continue
    for j in range(0, s['size'], 8):
        if o.rel.get(oa + j) and c.rel.get(ca + j):
            pairs.add((datamap.ptr(o.b, oa + j), datamap.ptr(c.b, ca + j)))
ob0 = o.sec['.rodata']['address']; cb0 = c.sec['.rodata']['address']
for s in secs:
    if s['file'] != '<internal>': continue
    ps = sorted((vc, vo) for vo, vc in pairs if s['addr'] <= vc < s['addr'] + s['size'])
    deltas = Counter((vo - ob0) - (vc - s['addr']) for vc, vo in ps)
    data = c.b[s['addr'] - c.sec['.rodata']['address'] + c.sec['.rodata']['offset']:][:s['size']]
    if 'str' in s['section']:
        pieces = [p for p in data.split(b'\0') if p]
    else:
        n = int(s['section'].rsplit('cst', 1)[1]); pieces = [data[i:i + n] for i in range(0, len(data), n)]
    print('%-16s c_off=%d size=%d pieces=%d anchored=%d start-deltas(top)=%s' % (s['section'], s['addr'] - cb0, s['size'],
          len(pieces), len(ps), deltas.most_common(4)))
