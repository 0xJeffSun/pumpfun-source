#!/usr/bin/env python3
"""st.py <unstripped.so> [win[=symregex] ...]  -> per-window status (N/R) + ratio vs symbol (or best cand)."""
import sys, re, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import Cand, insns, ORIG_SECS, best_candidates, demangle  # noqa
from score import original_windows, score  # noqa
DEF = {0x89258: r'fee_cpi::trade_fees$', 0x8bbd0: r'trade_event', 0xcd3d8: r'SetMayhemVirtualParams.*try_accounts',
       0x1367c0: r'pump_recovered::pump_recovered::set_params$', 0x138b20: r'pump_recovered::pump_recovered::create$',
       0x13b9b8: r'buy_v2::buy_handler$'}
so = sys.argv[1]
args = sys.argv[2:] or [hex(k) for k in DEF]
cand = Cand(so); cur = score(so); W = {w['start']: w for w in original_windows()}
for a in args:
    if '=' in a: s, rx = a.split('=', 1); st = int(s, 16)
    else: st = int(a, 16); rx = DEF.get(st)
    w = W[st]; c = cur[st]; flag = ('N' if c['normalized'] else '-') + ('R' if c['raw'] else '-')
    ot = [x[2] for x in insns(w['raw'], st, ORIG_SECS)]
    res = []
    if rx:
        for s, n, nm in cand.funcs:
            if re.search(rx, nm) or re.search(rx, demangle(nm)):
                ct = [x[2] for x in insns(cand.fn(s, n), s, cand.secs)]
                sm = difflib.SequenceMatcher(None, ot, ct, autojunk=False)
                nd = sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal')
                res.append((sm.ratio(), s, n, demangle(nm), nd))
    if not res:
        res = [(r, s, n, demangle(nm), -1) for r, j, s, n, nm in best_candidates(w, cand, 1)]
    res.sort(reverse=True)
    r, s, n, nm, nd = res[0] if res else (0, 0, 0, '?', -1)
    print(f"{st:#x} {w['bytes']}B {flag} ratio={r:.4f} cand={n}B@{s:#x} diffslots={nd} {nm[:80]}")
