#!/usr/bin/env python3
"""firstuse.py CAND_SYMBOLS.so MAP ROOT_OBJ [SEC] : for every lld shard of a merged pool whose piece order differs, show
per piece: candidate creation index, first user in the candidate root object (text-section emission order), and the
original's first user (lowest-address original window with an lddw to that piece) with its bound candidate function."""
import sys, struct, bisect, collections, subprocess
sys.path.insert(0, '/Users/shawwalters/amm100-run/lanes/mg-A-raw/tools')
from obj import Obj; from xxh3 import shard
import lay
L = lay.Layout(sys.argv[1], sys.argv[2]); ob = Obj(sys.argv[3]); c, o = L.c, L.o
SECS = [sys.argv[4]] if len(sys.argv) > 4 and not sys.argv[4].startswith('-') else ['.rodata.cst4', '.rodata.cst8', '.rodata.cst16', '.rodata.cst32']
def dem(names):
    out = subprocess.run(['c++filt', '-n'], input='\n'.join(names), capture_output=True, text=True).stdout.split('\n')
    return [x.replace('pump_amm_recovered::', '') for x in out]
textidx = [i for i, n in enumerate(ob.names) if n.startswith('.text')]
rank = {i: k for k, i in enumerate(textidx)}
for sec in SECS:
    ent = int(sec.rsplit('cst', 1)[1])
    si = ob.find(sec)[0]; d = ob.data(si); root = [d[k:k + ent] for k in range(0, len(d), ent)]
    ri = {p: j for j, p in reversed(list(enumerate(root)))}
    # candidate first users in root object
    first = {}
    for ti in textidx:
        tb = ob.data(ti)
        for off, symi, typ, add in ob.rels.get(ti, []):
            sym = ob.syms[symi]
            if sym['shndx'] != si: continue
            imm = struct.unpack_from('<I', tb, off + 4)[0] | (struct.unpack_from('<I', tb, off + 12)[0] << 32 if tb[off] == 0x18 else 0)
            po = sym['value'] + imm
            p = d[po:po + ent]
            if p not in first: first[p] = ti
    # orig users
    i = [k for k, x in enumerate(L.drows) if x['sec'] == sec and x['owner'] == '*'][0]; r = L.drows[i]; base = L.dplace[i]
    cp = [c.b[r['addr'] + k: r['addr'] + k + ent] for k in range(0, r['size'], ent)]
    op = [o.b[base + k: base + k + ent] for k in range(0, r['size'], ent)]
    oaddr = {}
    for k in range(0, r['size'], ent): oaddr.setdefault(o.b[base + k: base + k + ent], base + k)
    ousers = collections.defaultdict(list)
    for at, rr in o.relocations.items():
        if o.lo <= at < o.hi and o.b[at] == 0x18 and rr['type'] == 8:
            v = struct.unpack_from('<I', o.b, at + 4)[0] | struct.unpack_from('<I', o.b, at + 12)[0] << 32
            if base <= v < base + r['size']:
                ousers[o.b[v:v + ent]].append(o.entries[bisect.bisect_right(o.entries, at) - 1])
    bys_o = collections.defaultdict(list); bys_c = collections.defaultdict(list)
    for p in op: bys_o[shard(p)].append(p)
    for p in cp: bys_c[shard(p)].append(p)
    bad = [s for s in sorted(set(bys_o) | set(bys_c)) if bys_o[s] != bys_c[s]]
    names = {}
    for s in bad:
        for p in set(bys_o[s]) | set(bys_c[s]):
            if p in first: names[('c', p)] = ob.names[first[p]][6:]
            ws = sorted(set(ousers.get(p, [])))
            if ws and ws[0] in L.bind: names[('o', p)] = L.cf[L.bind[ws[0]]]['name']
    keys = list(names); dn = dict(zip(keys, dem([names[k] for k in keys])))
    print(f'== {sec}: differing shards {len(bad)}')
    for s in bad:
        print(f' shard {s}: orig order ' + ' '.join(p.hex()[:8] for p in bys_o[s]) + ' | cand ' + ' '.join(p.hex()[:8] for p in bys_c[s]))
        for p in bys_o[s]:
            ws = sorted(set(ousers.get(p, [])))
            cf = first.get(p); cfn = dn.get(('c', p), 'dep/none')[:70]
            ofn = dn.get(('o', p), '?')[:70]
            print(f'   {p.hex()[:8]} #{ri.get(p, "dep"):>3} cand-first[{rank.get(cf, -1):>4}] {cfn:70s} | orig-first {hex(ws[0]) if ws else "-":>8} {ofn}')
