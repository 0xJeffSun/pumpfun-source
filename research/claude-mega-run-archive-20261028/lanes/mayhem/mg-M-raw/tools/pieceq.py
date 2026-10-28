#!/usr/bin/env python3
"""pieceq.py BUILD_DIR SECTION: pieces of a merged section whose orig/cand internal offsets disagree with the majority,
with the orig windows / cand functions referencing them; also orig pieces missing in cand."""
import sys, struct
from pathlib import Path
from collections import Counter, defaultdict
sys.path.insert(0, str(Path(__file__).resolve().parent))
import datamap, elfcmp
build, want = sys.argv[1], sys.argv[2]
o, c, k, secs = datamap.load(build)
b = datamap.Binder(o, c, k, secs); pairs = datamap.anchors(o, c, k); b.run(set(pairs))
s = next(x for x in secs if x['file'] == '<internal>' and x['section'] == want)
ob0 = o.sec['.rodata']['address']
ps = b.merged[s['addr']]
maj = Counter((vo - ob0) - (vc - s['addr']) for vo, vc in ps).most_common(1)[0][0]
def refs(e, lo, hi, isorig):
    out = set()
    for r in e.relocations:
        if r['type'] != 8 or not (e.lo <= r['address'] < e.hi): continue
        at = r['address']
        if e.b[at] != 0x18: continue
        v = struct.unpack_from('<I', e.b, at + 4)[0] | struct.unpack_from('<I', e.b, at + 12)[0] << 32
        if lo <= v < hi:
            if isorig: out.add(k.id.get(k.ofunc_at(at)))
            else:
                f = k.cfunc_at(at); out.add(k.id.get(k.c2o.get(f)) or k.cf[f]['name'][30:70] if f else None)
    return sorted(out, key=str)
n = int(want.rsplit('cst', 1)[1]) if 'cst' in want else 1
for vo, vc in sorted(set(ps)):
    d = (vo - ob0) - (vc - s['addr'])
    if d != maj:
        print('piece cand+%d orig@%d delta %+d bytes=%s orig-refs=%s cand-refs=%s' % (vc - s['addr'], vo - ob0, d - maj,
              c.b[vc - c.sec['.rodata']['address'] + c.sec['.rodata']['offset']:][:n].hex(), refs(o, vo, vo + n, 1), refs(c, vc, vc + n, 0)))
