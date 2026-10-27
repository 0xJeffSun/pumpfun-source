#!/usr/bin/env python3
"""Side-by-side listing of original window and candidate symbol over an offset range."""
import argparse, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from sbf import load, insns, windows
from wdiff import fmt
p = argparse.ArgumentParser()
p.add_argument('--candidate', required=True); p.add_argument('--symbols', required=True)
p.add_argument('--orig', type=lambda x: int(x, 0), required=True); p.add_argument('--cand', required=True)
p.add_argument('--lo', type=lambda x: int(x, 0), default=0); p.add_argument('--hi', type=lambda x: int(x, 0), default=1 << 30)
a = p.parse_args()
o, c, s = load(a.candidate, a.symbols)
en = dict(windows(o))[a.orig]
f = [f for f in s.funcs if (a.cand.startswith('0x') and f['start'] == int(a.cand, 16)) or (not a.cand.startswith('0x') and a.cand in f['name'])][0]
oi = [x for x in insns(o, a.orig, en) if a.lo <= x[0] - a.orig < a.hi]
ci = [x for x in insns(s, f['start'], f['start'] + f['size']) if a.lo <= x[0] - f['start'] < a.hi]
n = max(len(oi), len(ci))
for k in range(n):
    l = fmt(o, *oi[k], a.orig) if k < len(oi) else ''
    r = fmt(s, *ci[k], f['start']) if k < len(ci) else ''
    mark = ' ' if l.split()[1:] == r.split()[1:] else '*'
    print('%s %-62.62s | %-62.62s' % (mark, l, r))
