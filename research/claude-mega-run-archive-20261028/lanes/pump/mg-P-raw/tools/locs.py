#!/usr/bin/env python3
"""[mg-P-raw] panic Location requirements: for every relocated lddw in matched windows whose ORIGINAL target is a
Location-like object {&str file (ptr,len), u32 line, u32 col} (24 B, .data.rel.ro), compare orig vs cand (file,line,col).
usage: locs.py BUILD_OUT [--json OUT]  -> mismatches grouped by candidate file."""
import sys, json, struct
from pathlib import Path
from collections import defaultdict
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, pdatamap, dem


def loc(e, a):
    if not e.rel.get(a): return None
    p = pdatamap.ptr(e.b, a); n, = struct.unpack_from('<Q', e.b, a + 8)
    if not (0 < n < 200) or e.secname(p) != '.rodata': return None
    f = e.b[p:p + n]
    if not f.startswith(b'programs/') and not f.endswith(b'.rs'): return None
    line, col = struct.unpack_from('<II', e.b, a + 16)
    return f.decode('latin1'), line, col


build = Path(sys.argv[1])
o = pk.Elf(pk.ORIG); c = pk.Elf(build / 'unstripped.so'); k = pk.Corr(o, c)
rows = []; ok = 0
for oa, ca in sorted(k.o2c.items()):
    size = k.wsize[oa]; i = 0
    while i < size:
        po, pc = oa + i, ca + i
        if o.b[po] == 0x18 and o.rel.get(po) and o.rel[po]['type'] == 8:
            vo, vc = o.lddw(po), c.lddw(pc)
            if o.secname(vo) == '.data.rel.ro':
                lo, lc = loc(o, vo), loc(c, vc)
                if lo:
                    if lo == lc: ok += 1
                    else: rows.append(dict(win=hex(oa), fn=dem.dem(k.cf[ca]['name'])[:70], off=i, orig=lo, cand=lc))
            i += 16; continue
        i += 8
print('Location refs equal %d, differing %d (windows %d)' % (ok, len(rows), len({r['win'] for r in rows})))
by = defaultdict(list)
for r in rows: by[(r['cand'] or ('?',))[0]].append(r)
for f, rs in sorted(by.items()):
    print(f)
    for r in rs: print('   %s %-50s cand %s:%s  orig %s %s:%s' % (r['win'], r['fn'][:50], r['cand'][1] if r['cand'] else '?', r['cand'][2] if r['cand'] else '?',
                                                             '' if r['cand'] and r['orig'][0] == r['cand'][0] else r['orig'][0], r['orig'][1], r['orig'][2]))
if '--json' in sys.argv: Path(sys.argv[sys.argv.index('--json') + 1]).write_text(json.dumps(rows, indent=1))
