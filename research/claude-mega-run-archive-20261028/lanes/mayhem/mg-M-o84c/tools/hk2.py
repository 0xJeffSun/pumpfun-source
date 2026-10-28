#!/usr/bin/env python3
"""hk2.py OBJ.o|SYMBOLS.so -- numeric hunk summary only: orig offset, cand offset, #orig lines, #cand lines, op classes."""
import sys, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import irx, objsec
p = sys.argv[1]
if p.endswith('.o'):
    secs = objsec.sections(p); key = [k for k in secs if irx.PAT in k and k.startswith('.text')][0]; code = secs[key]
else:
    code = irx.elf_code(p)
def cls(t):
    m = t.split()[0]
    for k, v in (('ldx', 'L'), ('st', 'S'), ('mov', 'M'), ('j', 'J'), ('call', 'C'), ('lddw', 'D')):
        if m.startswith(k): return v
    return 'A'
a = irx.ORIG_LINES; b = irx.masked_lines(code, 0)
apc = [pc for pc, raw in objsec.insns(irx.O.b[irx.W[1]:irx.W[2]])]; bpc = [pc for pc, raw in objsec.insns(code)]
sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False); out = []
for t, i1, i2, j1, j2 in sm.get_opcodes():
    if t == 'equal': continue
    out.append(f'O+{apc[i1] if i1 < len(apc) else "end"}/C+{bpc[j1] if j1 < len(bpc) else "end"} o{"".join(cls(a[k]) for k in range(i1,i2))} c{"".join(cls(b[k]) for k in range(j1,j2))}')
print(irx.score(code), ' | '.join(out))
