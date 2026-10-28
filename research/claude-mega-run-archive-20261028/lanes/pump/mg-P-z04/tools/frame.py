#!/usr/bin/env python3
"""frame.py <orig|obj|so> <win|fn>: list distinct stack offsets (r10-X) with first-use index and access sizes."""
import sys, re, subprocess
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
from clones import get
ins = get(sys.argv[1], sys.argv[2])
offs = {}
for i, s in enumerate(ins):
    for m in re.finditer(r'\[r10 - (0x[0-9a-f]+)\]', s):
        o = int(m.group(1), 16); offs.setdefault(o, []).append(i)
    m = re.match(r'add64 (r\d), (-0x[0-9a-f]+)$', s)
    if m and i > 0 and re.match(rf'mov64 {m.group(1)}, r10$', ins[i-1]):
        o = -int(m.group(2), 16); offs.setdefault(o, []).append(i)
print(len(offs), 'slots; deepest', hex(max(offs)))
print(' '.join(f'{o:#x}@{v[0]}' for o, v in sorted(offs.items())))
