#!/usr/bin/env python3
"""allocas.py <ir.ll> <fn-name-substring> : list allocas of the (first) matching define, in IR order: idx name type align."""
import sys, re
ir, pat = sys.argv[1], sys.argv[2]
inside = False; n = 0
for line in open(ir):
    if not inside:
        if line.startswith('define') and pat in line:
            inside = True; print(line[:160].strip())
        continue
    if line.startswith('}'): break
    m = re.match(r'\s+(%\S+) = alloca (.*?)(, align (\d+))?(, !\S+ !\d+)?$', line.rstrip())
    if m:
        print(f'{n:3d} {m.group(1):40s} {m.group(2):30s} a{m.group(4)}'); n += 1
