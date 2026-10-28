#!/usr/bin/env python3
"""wd.py <orig_start> <cand.so> [symregex] [-k LINES_PER_HUNK] [-n MAX_HUNKS] [-q]
Compact normalized diff: ratio, sizes, #diff slots, hunks (each truncated to K lines)."""
import sys, re, difflib, argparse
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
import win
from win import Cand, insns, ORIG_SECS, objdump_text, BASE, demangle, best_candidates
from score import original_windows
ap = argparse.ArgumentParser(); ap.add_argument('start'); ap.add_argument('cand'); ap.add_argument('sym', nargs='?')
ap.add_argument('-k', type=int, default=4); ap.add_argument('-n', type=int, default=12); ap.add_argument('-q', action='store_true')
a = ap.parse_args()
st = int(a.start, 0); w = next(x for x in original_windows() if x['start'] == st); cand = Cand(a.cand)
ot = [x[2] for x in insns(w['raw'], st, ORIG_SECS)]
if a.sym:
    best = []
    for s, n, nm in cand.funcs:
        if re.search(a.sym, nm) or re.search(a.sym, demangle(nm)):
            ct = [x[2] for x in insns(cand.fn(s, n), s, cand.secs)]
            best.append((difflib.SequenceMatcher(None, ot, ct, autojunk=False).ratio(), 0, s, n, nm))
    best.sort(reverse=True)
    if not best: sys.exit('no sym')
else:
    best = best_candidates(w, cand, 1)
r, j, s, n, nm = best[0]
oi = insns(w['raw'], st, ORIG_SECS); ci = insns(cand.fn(s, n), s, cand.secs)
sm = difflib.SequenceMatcher(None, [x[2] for x in oi], [x[2] for x in ci], autojunk=False)
ops = sm.get_opcodes(); nd = sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in ops if t != 'equal')
nh = sum(1 for o in ops if o[0] != 'equal')
print(f"{st:#x} orig {w['bytes']}B vs {demangle(nm)[:70]} @{s:#x} {n}B ratio={sm.ratio():.4f} hunks={nh} diffslots={nd}" + (' MATCH' if ot == [x[2] for x in ci] else ''))
if a.q: sys.exit()
otx = objdump_text(BASE / 'original.so', st, st + w['bytes']); ctx = objdump_text(cand.path, s, s + n)
def clean(t): return re.sub(r'\s*<[^>]*>', '', t)
h = 0
for tag, i1, i2, j1, j2 in ops:
    if tag == 'equal': continue
    h += 1
    if h > a.n: print('  ...more hunks'); break
    oa = oi[i1][0] if i1 < len(oi) else st + w['bytes']; ca = ci[j1][0] if j1 < len(ci) else s + n
    print(f"@@ {tag} o{oa:#x}(+{oa-st:#x})x{i2-i1} c{ca:#x}(+{ca-s:#x})x{j2-j1}")
    for k in range(i1, min(i2, i1 + a.k)): print(f"- {clean(otx.get(oi[k][0], ''))}")
    if i2 - i1 > a.k: print(f"-   ...{i2-i1-a.k} more")
    for k in range(j1, min(j2, j1 + a.k)): print(f"+ {clean(ctx.get(ci[k][0], ''))}")
    if j2 - j1 > a.k: print(f"+   ...{j2-j1-a.k} more")
