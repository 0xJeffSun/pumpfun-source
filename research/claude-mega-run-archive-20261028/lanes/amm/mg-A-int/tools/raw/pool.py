#!/usr/bin/env python3
"""pool.py CAND_SYMBOLS.so MAP SEC [--all] : merged pool (e.g. .rodata.cst4) piece order, candidate vs original.
Pairs come from lddw slots of bound windows (same offset). Prints orig-order table: orig_off value cand_off windows."""
import sys, collections, struct
sys.path.insert(0, '/Users/shawwalters/amm100-run/lanes/mg-A-raw/tools')
import lay
L = lay.Layout(sys.argv[1], sys.argv[2]); sec = sys.argv[3]
o, c = L.o, L.c
idx = [i for i, r in enumerate(L.drows) if r['sec'] == sec and r['owner'] == '*']
assert len(idx) == 1, idx
i = idx[0]; r = L.drows[i]; base = L.dplace[i]; ent = int(sec.rsplit('cst', 1)[1]) if 'cst' in sec else 1
print('cand atom', hex(r['addr']), 'size', r['size'], 'placed at orig', hex(base), 'votes', dict(list(L.votes[i].items())[:4]))
pairs = collections.defaultdict(collections.Counter); refs_o = collections.defaultdict(set); refs_c = collections.defaultdict(set)
for w, s in L.bind.items():
    if L.okey[w] != L.ckey[s]: continue
    for (off, ov), (_, cv) in zip(lay.lddw_targets(o, w, L.wsize[w]), lay.lddw_targets(c, s, L.cf[s]['size'])):
        if r['addr'] <= cv < r['addr'] + r['size']:
            pairs[cv - r['addr']][ov - base] += 1; refs_o[ov - base].add(hex(w)); refs_c[cv - r['addr']].add(hex(w))
# orig pool extent: all orig lddw targets near base
ooffs = set()
for at in o.relocations:
    if o.lo <= at < o.hi and o.b[at] == 0x18:
        v = struct.unpack_from('<I', o.b, at + 4)[0] | struct.unpack_from('<I', o.b, at + 12)[0] << 32
        if base - 64 <= v < base + r['size'] + 64: ooffs.add(v - base)
inv = {}
for co, cnt in pairs.items():
    for oo in cnt: inv.setdefault(oo, set()).add(co)
rows = []
for oo in sorted(set(list(range(0, r['size'], ent))) | ooffs):
    ov = o.b[base + oo: base + oo + ent].hex()
    co = sorted(inv.get(oo, []))
    cv = c.b[r['addr'] + oo: r['addr'] + oo + ent].hex() if oo < r['size'] else ''
    flag = '' if (co == [oo]) else ' <-- cand ' + ','.join(map(str, co)) if co else (' (unref in pairs)' if ov != cv else '')
    rows.append(f'{oo:5d} orig {ov} cand {cv}{" ==" if ov == cv else " !="}{flag}  {",".join(sorted(refs_o.get(oo, []))[:3])}')
show_all = '--all' in sys.argv
for x in rows:
    if show_all or '!=' in x or '<--' in x: print(x)
