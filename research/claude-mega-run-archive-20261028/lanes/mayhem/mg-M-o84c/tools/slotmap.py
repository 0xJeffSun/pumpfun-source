#!/usr/bin/env python3
"""slotmap.py SYMBOLS.so|OBJ.o [lo hi] -- for positional pairs with same opcode+regs but different off16 on an r10-based
access, print the cand-slot -> orig-slot mapping (numbers only) with counts."""
import sys, struct
from collections import defaultdict
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import irx, objsec
p = sys.argv[1]
if p.endswith('.o'):
    secs = objsec.sections(p); key = [k for k in secs if irx.PAT in k and k.startswith('.text')][0]; code = secs[key]
else:
    code = irx.elf_code(p)
lo = int(sys.argv[2]) if len(sys.argv) > 2 else 0; hi = int(sys.argv[3]) if len(sys.argv) > 3 else 1 << 30
A = irx.ORIG; B = objsec.norm(code)
apc = [pc for pc, raw in objsec.insns(irx.O.b[irx.W[1]:irx.W[2]])]
m = defaultdict(lambda: defaultdict(int)); other = 0
for k, (a, b) in enumerate(zip(A, B)):
    if a == b or not (lo <= apc[k] < hi): continue
    if a[0] == b[0] and a[1] == b[1] and a[4:8] == b[4:8] and a[2:4] != b[2:4]:
        cls = a[0] & 7; regs = a[1]; dst = regs & 15; src = regs >> 4
        base = src if cls == 1 else dst
        if base == 10:
            m[struct.unpack('<h', b[2:4])[0]][struct.unpack('<h', a[2:4])[0]] += 1; continue
    other += 1
for c in sorted(m): print(f'cand {c:6d} -> ' + ', '.join(f'orig {o}x{n}' for o, n in sorted(m[c].items())))
print('non-slot diffs:', other)
