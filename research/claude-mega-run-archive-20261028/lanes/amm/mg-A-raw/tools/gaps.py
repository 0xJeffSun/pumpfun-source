#!/usr/bin/env python3
"""gaps.py SYMBOLS.so MAP [--sec .rodata|.data.rel.ro] [--min N] : coverage of the ORIGINAL data sections by bound
candidate atoms (lay.py placement). Reports gaps (original bytes no candidate atom is placed on), overlaps, and
size mismatches, with who references each gap in the original (windows: m=matched/U=unmatched; D=data pointer)."""
import sys, struct, bisect, collections
sys.path.insert(0, '/Users/shawwalters/amm100-run/lanes/mg-A-raw/tools')
import lay
L = lay.Layout(sys.argv[1], sys.argv[2]); o = L.o
secs = [sys.argv[sys.argv.index('--sec') + 1]] if '--sec' in sys.argv else ['.rodata', '.data.rel.ro']
mn = int(sys.argv[sys.argv.index('--min') + 1]) if '--min' in sys.argv else 1
rep = L.report(); unm = set(int(x, 16) for x in rep['bound_body_differs'] + rep['unbound_windows'])
# original references: lddw from windows + data pointers
refs = collections.defaultdict(set)
for at, r in o.relocations.items():
    if r['type'] != 8: continue
    if o.lo <= at < o.hi and o.b[at] == 0x18:
        v = struct.unpack_from('<I', o.b, at + 4)[0] | struct.unpack_from('<I', o.b, at + 12)[0] << 32
        w = o.entries[bisect.bisect_right(o.entries, at) - 1]; refs[v].add(('U' if w in unm else 'm') + hex(w))
    elif not (o.lo <= at < o.hi):
        v = struct.unpack_from('<Q', o.b, at)[0] >> 32; refs[v].add('D' + hex(at))
rk = sorted(refs)
def who(a, z):
    out = set()
    for v in rk[bisect.bisect_left(rk, a):bisect.bisect_left(rk, z)]: out |= refs[v]
    return sorted(out)
for n in secs:
    a0 = o.secs[n][3]; z0 = a0 + o.secs[n][5]
    pl = sorted((t, i) for i, t in L.dplace.items() if L.drows[i]['out'] == n)
    cur = a0; tot_gap = 0; ng = 0
    print(f'== {n} orig [{hex(a0)},{hex(z0)}) placed atoms {len(pl)}')
    for t, i in pl:
        r = L.drows[i]
        if t > cur:
            g = t - cur; tot_gap += g
            if g >= mn:
                ng += 1; ws = who(cur, t)
                print(f'  GAP  {hex(cur)}+{g:<5} {o.b[cur:cur+min(g,24)]!r:60.60s} refs {len(ws)}: {" ".join(ws[:6])}')
        elif t < cur:
            print(f'  OVERLAP {hex(t)} by {cur - t} : {r["sec"][:60]} size {r["size"]}')
        cur = max(cur, t + r['size'])
    if z0 > cur:
        ws = who(cur, z0); print(f'  TAIL GAP {hex(cur)}+{z0 - cur} refs {len(ws)}: {" ".join(ws[:6])}')
    print(f'  total gap bytes {tot_gap}; unplaced cand atoms: {sum(1 for i, r in enumerate(L.drows) if r["out"] == n and i not in L.dplace)}')
