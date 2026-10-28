#!/usr/bin/env python3
"""frame.py <listing.txt>: map stack offsets [r10 - X] -> first instruction index using it (listing lines 'ADDR  insn')."""
import sys, re
first = {}
for i, l in enumerate(open(sys.argv[1])):
    for m in re.finditer(r'r10 - (0x[0-9a-f]+)\]', l):
        o = int(m.group(1), 16); first.setdefault(o, i)
    m = re.search(r'add64 r\d, -(0x[0-9a-f]+)$', l.strip())
    if m and 'mov64' not in l:
        pass
print(' '.join(f"-{o:#x}@{first[o]}" for o in sorted(first)))
