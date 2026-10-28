#!/usr/bin/env python3
"""Compact hunk summary (offsets, counts, mnemonics only; no operands). usage: hk.py SYMBOLS.so [variant_idx|-1]"""
import sys, re, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build')
import irx, sc, sbfdis
idx = int(sys.argv[2]) if len(sys.argv) > 2 else -1
C = sbfdis.elf(sys.argv[1]); cf = sbfdis.funcs(C); code = None
for a, (b, n) in cf.items():
    if (idx < 0 and 'sell_v2_handler' in n) or (idx >= 0 and re.search(rf'o84hv_{idx}17h', n)): code = C.b[a:b]
ml = irx.masked_lines(code, 0); mn = lambda t: t.split()[0]
sm = difflib.SequenceMatcher(a=irx.ORIG_LINES, b=ml, autojunk=False)
for t, i1, i2, j1, j2 in sm.get_opcodes():
    if t == 'equal': continue
    print(f'O+{sc.APC[i1] if i1 < len(sc.APC) else "end"} {t} -{i2-i1}[{" ".join(mn(x) for x in irx.ORIG_LINES[i1:i2])}] +{j2-j1}[{" ".join(mn(x) for x in ml[j1:j2])}]')
