#!/usr/bin/env python3
"""usage: wscore.py OBJ.o -- score windows O0081..O0084 (by symbol pattern) in an llc object vs original (masked lines)."""
import sys, difflib, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import irx, objsec
O = irx.O
WINS = [('O0081', 113672, 127520, 'legacy_buy_handler'), ('O0082', 127520, 140512, 'legacy_sell_handler'),
        ('O0083', 140512, 159160, 'buy_v27handler'), ('O0084', 159160, 177256, 'sell_v2_handler')]
def score_code(code, s, e):
    a = irx.masked_lines(O.b[s:e], 0); b = irx.masked_lines(code, 0)
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    nd = sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal')
    eq = objsec.norm(code) == objsec.norm(O.b[s:e])
    return len(code), nd, eq
if __name__ == '__main__':
    secs = objsec.sections(sys.argv[1])
    for wid, s, e, pat in WINS:
        ks = [k for k in secs if pat in k and k.startswith('.text')]
        for k in ks[:2]:
            print(wid, k[:90], *score_code(secs[k], s, e))
