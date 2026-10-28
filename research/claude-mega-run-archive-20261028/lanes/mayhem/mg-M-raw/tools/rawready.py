#!/usr/bin/env python3
"""rawready.py BUILD_DIR [--json OUT]: end-state raw prediction (lane mg-M-raw).
For every normalized-matched window, each call / relocated lddw immediate is translated to original coordinates
(text: window correspondence; data: datamap object binding; merged pieces: anchored piece map) and classified:
  ok            translates to the original target (only an address shift separates them)
  call_unmatched callee is an unmatched window (consequence of O0083/O0084)
  merge_order   target is a merged-section piece whose position inside its merged section differs from the
                original beyond the section's consequence shift (independent layout residual)
  wrong         anything else (independent)
A window is raw-ready when all its immediates are ok/call_unmatched."""
import sys, json, struct
from pathlib import Path
from collections import Counter, defaultdict
sys.path.insert(0, str(Path(__file__).resolve().parent))
import datamap, elfcmp
o, c, k, secs = datamap.load(sys.argv[1])
pairs = datamap.anchors(o, c, k)
b = datamap.Binder(o, c, k, secs); b.run(set(pairs))
for ca, oa in list(b.bound.items()):  # pointer pairs of bound data.rel.ro objects
    s = b.sec_at(ca)
    if s['out'] == '.data.rel.ro':
        for j in range(0, s['size'], 8):
            if o.rel.get(oa + j) and c.rel.get(ca + j): pairs.add((datamap.ptr(o.b, oa + j), datamap.ptr(c.b, ca + j)))
ob0 = o.sec['.rodata']['address']
piece = {}; badpiece = set(); merged_report = {}
for s in secs:
    if s['file'] != '<internal>': continue
    ps = [(vo, vc) for vo, vc in pairs if s['addr'] <= vc < s['addr'] + s['size']]
    if not ps: continue
    # consequence shift = per-piece delta of the majority within runs; a piece is out of order if its delta differs
    # from both neighbours' deltas (isolated) -- swapped pieces show +/-entsize against an otherwise constant run
    ps = sorted(set(ps), key=lambda t: t[1])
    for vo, vc in ps: piece[vc] = vo
    # piece sequences by content: cand section vs the original range spanned by its anchored pieces
    n = int(s['section'].rsplit('cst', 1)[1]) if 'cst' in s['section'] else 0
    def split(e, lo, hi):
        rs = e.sec['.rodata']; raw = e.b[rs['offset'] + lo - rs['address']:rs['offset'] + hi - rs['address']]
        if n: return [(lo + i, raw[i:i + n]) for i in range(0, len(raw) - n + 1, n)]
        out, i = [], 0
        for part in raw.split(b'\0')[:-1]:
            out.append((lo + i, part)); i += len(part) + 1
        return out
    cp = split(c, s['addr'], s['addr'] + s['size'])
    olo = min(vo for vo, vc in ps); last = max(ps)
    ohi = last[0] + (n or (len(dict(cp)[last[1]]) + 1 if last[1] in dict(cp) else 1))
    op = split(o, olo, ohi)
    cset = [x for a, x in cp]; oset = [x for a, x in op]
    common = [x for x in cset if x in oset]; ocommon = [x for x in oset if x in cset]
    keep = elfcmp.lis([ocommon.index(x) for x in common]) if common == list(dict.fromkeys(common)) else set()
    moved = {common[i] for i in range(len(common)) if i not in keep}
    # both members of a swap: a common piece is misplaced if its rank among common pieces differs
    moved |= {x for i, x in enumerate(common) if ocommon[i] != x}
    for a, x in cp:
        if x in moved: badpiece.add(a)
    merged_report[s['section']] = dict(cand_only=[x.hex()[:24] for x in cset if x not in oset],
                                       orig_only=[x.hex()[:24] for x in oset if x not in cset], misplaced=len(moved))
def tr_data(vc):
    if vc in piece: return piece[vc], vc in badpiece
    s = b.sec_at(vc)
    if s and s['addr'] in b.bound: return b.bound[s['addr']] + (vc - s['addr']), False
    return None, False
unm = {oa for oa in k.ostarts if oa not in k.o2c}
per = {}; cnt = Counter()
for oa, ca in k.o2c.items():
    cl = Counter(); size = k.ow[oa]['end'] - oa; i = 0
    while i < size:
        po, pc = oa + i, ca + i
        if o.b[po] == 0x18:
            r = o.rel.get(po)
            if r and r['type'] == 8:
                vo = struct.unpack_from('<I', o.b, po + 4)[0] | struct.unpack_from('<I', o.b, po + 12)[0] << 32
                vc = struct.unpack_from('<I', c.b, pc + 4)[0] | struct.unpack_from('<I', c.b, pc + 12)[0] << 32
                if o.lo <= vo < o.hi: cl['ok' if k.c2o_addr(vc) == vo else 'wrong'] += 1
                else:
                    t, bad = tr_data(vc)
                    cl['merge_order' if (t == vo and bad) else 'ok' if t == vo else 'wrong'] += 1
            i += 16; continue
        if o.b[po] == 0x85 and o.b[po + 1] == 0x10 and not (o.rel.get(po) and o.rel[po]['type'] == 10):
            to = po + 8 + 8 * struct.unpack_from('<i', o.b, po + 4)[0]; tc = pc + 8 + 8 * struct.unpack_from('<i', c.b, pc + 4)[0]
            if k.c2o_addr(tc) == to: cl['ok'] += 1
            elif k.ofunc_at(to) in unm and to == k.ofunc_at(to): cl['call_unmatched'] += 1
            else: cl['wrong'] += 1
        i += 8
    per[k.id[oa]] = dict(cl)
ready = [w for w, cl in per.items() if not (set(cl) - {'ok', 'call_unmatched'})]
res = [w for w in per if w not in ready]
print('matched %d raw-ready %d not-ready %d %s' % (len(per), len(ready), len(res), {w: {x: n for x, n in per[w].items() if x not in ('ok',)} for w in res}))
print('merged:', merged_report)
if '--json' in sys.argv: Path(sys.argv[sys.argv.index('--json') + 1]).write_text(json.dumps(dict(per=per, ready=ready, not_ready=res), indent=1))
