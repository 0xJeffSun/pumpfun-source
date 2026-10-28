#!/usr/bin/env python3
"""ho.py SO WIN pattern : numeric hunk summary (orig offset, orig len, cand len) of masked diff; no instruction text."""
import sys, difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/tools')
import sc, sbfdis
p,win,pat=sys.argv[1:4]; regs=len(sys.argv)<=4
S,E=sc.WS[win]; A=sbfdis.window_insns(sc.O,S,E)
C=sbfdis.elf(p); f=sbfdis.funcs(C); c=[(a,b) for a,(b,n) in f.items() if pat in n]; assert len(c)==1; a,b=c[0]
Y=sbfdis.window_insns(C,a,b)
x=[sc.mask(t['text'],regs) for t in A]; y=[sc.mask(t['text'],regs) for t in Y]
sm=difflib.SequenceMatcher(a=x,b=y,autojunk=False); out=[]; tot=0
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t=='equal': continue
    tot+=max(i2-i1,j2-j1); out.append(f'{A[min(i1,len(A)-1)]["pc"]-S}:{i2-i1}/{j2-j1}')
print(f'{win} masked {tot} hunks {len(out)}:', ' '.join(out[:40]))
