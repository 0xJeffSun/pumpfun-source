#!/usr/bin/env python3
"""[mg-P-raw] end-state raw prediction (port of mg-M-raw rawready.py).
usage: prawready.py BUILD_OUT [--json OUT] [--quiet]
Every call / relocated lddw immediate of each normalized-matched window is translated to original coordinates
(text: window correspondence; data: pdatamap object binding; merged constant pieces: anchored piece map):
  ok             translates to the original target (only an address shift separates them)
  call_unmatched callee is an unmatched window (consequence of a still-unmatched window)
  data_unbound   data target is an object that is not bound (yet) to an original object
  merge_order    target is a merged-section piece misplaced inside its merged section (independent)
  wrong          anything else (independent)
raw-ready = only ok/call_unmatched/data_unbound(*) (*reported separately: unbound objects may be consequences)."""
import sys, json, struct
from pathlib import Path
from collections import Counter
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, pdatamap


def predict(build):
    o, c, k, secs, allsecs = pdatamap.load(build)
    pairs = pdatamap.anchors(o, c, k)
    b = pdatamap.Binder(o, c, k, secs); b.run(set(pairs))
    for ca, oa in list(b.bound.items()):
        s = b.sec_at(ca)
        if s['out'] == '.data.rel.ro':
            for j in range(0, s['size'], 8):
                if o.rel.get(oa + j) and c.rel.get(ca + j): pairs.add((pdatamap.ptr(o.b, oa + j), pdatamap.ptr(c.b, ca + j)))
    piece, badpiece, merged_report = {}, set(), {}
    for s in secs:
        if s['file'] != '<internal>': continue
        ps = sorted({(vo, vc) for vo, vc in pairs if s['addr'] <= vc < s['addr'] + s['size']}, key=lambda t: t[1])
        if not ps: continue
        for vo, vc in ps: piece[vc] = vo
        n = int(s['section'].rsplit('cst', 1)[1]) if 'cst' in s['section'] else 0
        def split(e, lo, hi):
            raw = e.b[lo:hi]
            if n: return [(lo + i, raw[i:i + n]) for i in range(0, len(raw) - n + 1, n)]
            out, i = [], 0
            for part in raw.split(b'\0')[:-1]:
                out.append((lo + i, part)); i += len(part) + 1
            return out
        cp = split(c, s['addr'], s['addr'] + s['size'])
        olo = min(vo for vo, vc in ps); last = max(ps)
        ohi = last[0] + (n or 1)
        op = split(o, olo, ohi)
        cset = [x for a, x in cp]; oset = [x for a, x in op]
        common = [x for x in cset if x in oset]; ocommon = [x for x in oset if x in cset]
        keep = pk.lis([ocommon.index(x) for x in common]) if common == list(dict.fromkeys(common)) else set()
        moved = {common[i] for i in range(len(common)) if i not in keep}
        moved |= {x for i, x in enumerate(common) if i < len(ocommon) and ocommon[i] != x}
        for a, x in cp:
            if x in moved: badpiece.add(a)
        merged_report[s['section']] = dict(cand_pieces=len(cset), orig_pieces=len(oset), cand_only=[x.hex()[:24] for x in cset if x not in oset],
                                           orig_only=[x.hex()[:24] for x in oset if x not in cset], misplaced=len(moved),
                                           misplaced_pieces=[x.hex()[:32] for x in common if x in moved][:12])
    def tr_data(vc):
        if vc in piece: return piece[vc], vc in badpiece, True
        s = b.sec_at(vc)
        if s and s['addr'] in b.bound: return b.bound[s['addr']] + (vc - s['addr']), False, True
        return None, False, bool(s and s['file'] != '<internal>')
    unm = {oa for oa in k.ostarts if oa not in k.o2c}
    per = {}
    for oa, ca in k.o2c.items():
        cl = Counter(); size = k.wsize[oa]; i = 0
        while i < size:
            po, pc = oa + i, ca + i
            if o.b[po] == 0x18:
                r = o.rel.get(po)
                if r and r['type'] == 8:
                    vo, vc = o.lddw(po), c.lddw(pc)
                    if o.lo <= vo < o.hi: cl['ok' if k.c2o_addr(vc) == vo else 'wrong_fnptr'] += 1
                    else:
                        t, bad, isobj = tr_data(vc)
                        if t is None: cl['data_unbound' if isobj else 'wrong_data'] += 1
                        else: cl['merge_order' if (t == vo and bad) else 'ok' if t == vo else 'wrong_data'] += 1
                i += 16; continue
            if o.b[po] == 0x85 and o.b[po + 1] == 0x10:
                io = struct.unpack_from('<i', o.b, po + 4)[0]
                if io != -1:
                    to = po + 8 + 8 * io; tc = pc + 8 + 8 * struct.unpack_from('<i', c.b, pc + 4)[0]
                    if k.c2o_addr(tc) == to: cl['ok'] += 1
                    elif to in unm: cl['call_unmatched'] += 1
                    else: cl['wrong_call'] += 1
            i += 8
        per[oa] = dict(cl)
    return per, merged_report, k


if __name__ == '__main__':
    a = sys.argv[1:]
    per, merged, k = predict(a[0])
    strict = [w for w, cl in per.items() if not (set(cl) - {'ok', 'call_unmatched'})]
    loose = [w for w, cl in per.items() if not (set(cl) - {'ok', 'call_unmatched', 'data_unbound'})]
    bad = {w: {x: n for x, n in cl.items() if x not in ('ok', 'call_unmatched')} for w, cl in per.items() if w not in strict}
    cls = Counter(x for d in bad.values() for x in d)
    print('matched %d raw-ready %d (+%d with only unbound-data refs) not-ready %d; raw now %d; classes(windows) %s' % (
        len(per), len(strict), len(loose) - len(strict), len(per) - len(strict), len(k.raw), dict(cls)))
    if '--quiet' not in a:
        for w in sorted(bad)[:40]: print('   %#x %s' % (w, bad[w]))
        for n, m in merged.items(): print('merged', n, m)
    if '--json' in a: Path(a[a.index('--json') + 1]).write_text(json.dumps(dict(per={hex(w): v for w, v in per.items()}, ready=[hex(w) for w in strict],
                                                                                   merged=merged), indent=1))
