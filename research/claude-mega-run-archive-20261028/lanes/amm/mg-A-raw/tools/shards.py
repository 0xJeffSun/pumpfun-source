#!/usr/bin/env python3
"""shards.py CAND_SYMBOLS.so MAP ROOT_OBJ : per merged pool (cst4/8/16/32): original vs candidate piece order per lld shard.
Original pool extent = candidate pool size at the bound original address (lay.py votes). Prints shards whose order differs,
with the candidate root-object creation index of each piece (lower = created earlier by rustc codegen)."""
import sys, collections
sys.path.insert(0, '/Users/shawwalters/amm100-run/lanes/mg-A-raw/tools')
from obj import Obj; from xxh3 import shard
import lay
L = lay.Layout(sys.argv[1], sys.argv[2]); ob = Obj(sys.argv[3]); c, o = L.c, L.o
quiet = '--quiet' in sys.argv
tot = 0
for sec, ent in [('.rodata.cst4', 4), ('.rodata.cst8', 8), ('.rodata.cst16', 16), ('.rodata.cst32', 32)]:
    i = [k for k, x in enumerate(L.drows) if x['sec'] == sec and x['owner'] == '*'][0]; r = L.drows[i]; base = L.dplace[i]
    cp = [c.b[r['addr'] + k: r['addr'] + k + ent] for k in range(0, r['size'], ent)]
    op = [o.b[base + k: base + k + ent] for k in range(0, r['size'], ent)]
    d = ob.data(ob.find(sec)[0]); root = [d[k:k + ent] for k in range(0, len(d), ent)]
    ri = {p: j for j, p in reversed(list(enumerate(root)))}
    osh = [shard(p) for p in op]; mono = all(osh[k] <= osh[k + 1] for k in range(len(osh) - 1))
    same_set = collections.Counter(op) == collections.Counter(cp)
    bys_o = collections.defaultdict(list); bys_c = collections.defaultdict(list)
    for p in op: bys_o[shard(p)].append(p)
    for p in cp: bys_c[shard(p)].append(p)
    bad = [s for s in sorted(set(bys_o) | set(bys_c)) if bys_o[s] != bys_c[s]]
    tot += len(bad)
    print(f'{sec}: pieces {len(cp)} orig-monotone {mono} same-set {same_set} shards {len(bys_c)} differing {len(bad)}')
    if quiet: continue
    for s in bad:
        fmt = lambda ps: ' '.join(f'{p.hex() if ent <= 8 else p[:6].hex()}#{ri.get(p, "dep")}' for p in ps)
        print(f'  shard {s:2d} orig: {fmt(bys_o[s])}')
        print(f'           cand: {fmt(bys_c[s])}')
print('total differing shards', tot)
