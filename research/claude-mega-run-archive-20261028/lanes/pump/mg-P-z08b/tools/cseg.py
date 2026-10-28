#!/usr/bin/env python3
"""cseg.py <obj|so> <symregex> <orig_start>: instruction counts between consecutive calls, orig vs cand (+diff)."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08b/tools')
from mr_lib import load
o, c = load(sys.argv[1], sys.argv[2], int(sys.argv[3], 16))
def segs(x):
    out = []; n = 0
    for i in x:
        n += 1
        if i.startswith('call'): out.append(n); n = 0
    out.append(n); return out
a, b = segs(o), segs(c)
print('orig', a); print('cand', b); print('diff', [p - q for p, q in zip(a, b)], len(a), len(b))
