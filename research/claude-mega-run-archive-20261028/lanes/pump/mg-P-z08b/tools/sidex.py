#!/usr/bin/env python3
"""sidex.py <obj|so> <symregex> <orig_start> <call_k> [before] [after]: side-by-side around the k-th call (0-based) of orig and cand."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08b/tools')
from mr_lib import load
o, c = load(sys.argv[1], sys.argv[2], int(sys.argv[3], 16))
k = int(sys.argv[4]); bef = int(sys.argv[5]) if len(sys.argv) > 5 else 40; aft = int(sys.argv[6]) if len(sys.argv) > 6 else 3
def callidx(x): return [i for i, t in enumerate(x) if t.startswith('call')]
oi, ci = callidx(o)[k], callidx(c)[k]
for d in range(-bef, aft + 1):
    x = o[oi + d] if 0 <= oi + d < len(o) else ''; y = c[ci + d] if 0 <= ci + d < len(c) else ''
    print(f'{oi+d:5d} {x[:40]:40s} {"  " if x == y else "**"} {ci+d:5d} {y[:40]}')
