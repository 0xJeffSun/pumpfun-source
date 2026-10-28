#!/usr/bin/env python3
"""seg.py <orig_start> <cand.so> <symregex> : align original vs candidate by call sequence (callee-name agnostic) and
print per-segment instruction counts (instructions between consecutive aligned calls), flagging size differences.
Also reports error-site (E60xx) block counts. Uses layout order."""
import sys, re, difflib
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W + '/harness')
import win
from score import original_windows
st = int(sys.argv[1], 0); cpath = sys.argv[2]; rx = sys.argv[3]
w = next(x for x in original_windows() if x['start'] == st)
c = win.Cand(cpath)
cs = [(s, n, nm) for (s, n, nm) in c.funcs if re.search(rx, nm) or re.search(rx, win.demangle(nm))]
s, n, nm = max(cs, key=lambda x: x[1])
def calls(path, a, b):
    t = win.objdump_text(path, a, b); pcs = sorted(t); out = []
    for i, pc in enumerate(pcs):
        x = t[pc]
        if x.startswith('call'):
            m = re.match(r'call (-?0x[0-9a-f]+)', x)
            tgt = (pc // 8 + 1 + int(m.group(1), 16)) * 8 if m else x
            out.append((i, tgt))
    return out, len(pcs)
oc, on = calls(win.BASE / 'original.so', st, st + w['bytes']); cc, cn = calls(c.path, s, s + n)
# map call targets to names via candidate symbol table for cand; for orig via inventory symbols if any
import json, bisect
inv = json.load(open(W + '/base/L27/inventory.json'))['windows']; starts = sorted(int(k) for k in inv)
def oname(t):
    i = bisect.bisect_right(starts, t) - 1; sy = inv[str(starts[i])].get('symbols') or []
    return win.demangle(sy[0]).split('::')[-1] if sy else '?%x' % t
fm = {a: win.demangle(b).split('::')[-1] for a, _, b in c.funcs}
def cname(t): return fm.get(t, '?%x' % t) if isinstance(t, int) else str(t)
on_ = [oname(t) if isinstance(t, int) else t for _, t in oc]; cn_ = [cname(t) for _, t in cc]
canon = lambda x: re.sub(r'admit_associated_token_account|\?14910', 'ADMIT', re.sub(r'transfer_to_user|transfer_to_recipient', 'XFER', re.sub(r'prepare_bonding_curve|\?3cd50', 'PREP', x)))
sm = difflib.SequenceMatcher(None, [canon(x) for x in on_], [canon(x) for x in cn_], autojunk=False)
prev_o = prev_c = 0; tot = 0
print('orig %d insns, cand %d insns (delta %+d)' % (on, cn, cn - on))
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        for k in range(i2 - i1):
            oi, ci = oc[i1 + k][0], cc[j1 + k][0]
            do, dc = oi - prev_o, ci - prev_c
            if do != dc: print('  seg before call#%d %-34s o=%4d c=%4d (%+d)  [o@%d c@%d]' % (i1 + k, on_[i1 + k][:34], do, dc, dc - do, oi, ci))
            prev_o, prev_c = oi, ci
    else:
        print('  %s orig %s | cand %s' % (tag, on_[i1:i2], cn_[j1:j2]))
print('  tail o=%d c=%d (%+d)' % (on - prev_o, cn - prev_c, (cn - prev_c) - (on - prev_o)))
