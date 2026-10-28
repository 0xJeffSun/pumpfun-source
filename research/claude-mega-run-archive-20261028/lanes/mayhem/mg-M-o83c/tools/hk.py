#!/usr/bin/env python3
"""hk.py SO|BIN WIN pattern [maxhunks] [regs]: masked diff hunks (stack+targets masked; regs masked if 5th arg) of candidate fn vs original window."""
import sys, difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import sc, sbfdis, objsec
p,win,pat=sys.argv[1:4]; mx=int(sys.argv[4]) if len(sys.argv)>4 else 20; regs=len(sys.argv)>5
S,E=sc.WS[win]; A=[(x['pc']-S,x['text']) for x in sbfdis.window_insns(sc.O,S,E)]
if p.endswith('.so'):
    C=sbfdis.elf(p); f=sbfdis.funcs(C); c=[(a,b) for a,(b,n) in f.items() if pat in n]; assert len(c)==1
    a,b=c[0]; Y=[(x['pc']-a,x['text']) for x in sbfdis.window_insns(C,a,b)]
else:
    code=open(p,'rb').read(); Y=[(pc,sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text']) for pc,r in objsec.insns(code)]
x=[sc.mask(t,regs) for _,t in A]; y=[sc.mask(t,regs) for _,t in Y]
sm=difflib.SequenceMatcher(a=x,b=y,autojunk=False); n=0
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t=='equal': continue
    n+=1
    if n>mx: continue
    print(f'@@ {t} O+{A[i1][0] if i1<len(A) else "end"}({i2-i1}) C+{Y[j1][0] if j1<len(Y) else "end"}({j2-j1})')
    for k in range(i1,min(i2,i1+6)): print('  -',A[k][1])
    for k in range(j1,min(j2,j1+6)): print('  +',Y[k][1])
print('hunks',n)
