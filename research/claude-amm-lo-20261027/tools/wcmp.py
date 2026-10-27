#!/usr/bin/env python3
"""Compare one original window against candidate function(s) whose name contains a substring.
usage: wcmp.py <unstripped.so> <orig_start_hex> <name-substring> [--full]"""
import sys, json, hashlib
from sbfdis import *
so, start, sub = sys.argv[1], int(sys.argv[2], 16), sys.argv[3]
full = '--full' in sys.argv
o = load(); c = cand(so)
ents = sorted(set(o.entries) | {o.lo}); i = ents.index(start); end = ents[i+1] if i+1 < len(ents) else o.hi
fs = [f for f in c.funcs if sub in f['name']]
for f in fs:
    s, n = f['start'], f['size']
    eq = (n == end - start and c.normalized[s:s+n] == o.normalized[start:end]
          and json.dumps(c.pattern(s, n), sort_keys=True) == json.dumps(o.pattern(start, end-start), sort_keys=True))
    a = lines(o, start, end); b = lines(c, s, s+n)
    nd = sum(1 for x, y in zip(a, b) if x != y) + abs(len(a) - len(b))
    print(f"{'MATCH' if eq else 'diff '} {hex(s)} size {n} vs {end-start} slotdiffs={nd} {f['name'][:100]}")
    if full or (not eq and nd < 400):
        diff(o, start, end, c, s, s+n)
