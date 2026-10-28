#!/usr/bin/env python3
"""Score functions (by symbol substring) of a symbols.so against original O0083 (or other window) with sdiff masking.
usage: sc.py SO [pattern ...]   (default pattern buy_v2_handler); env WIN=O0083|O0081|O0084 ; prints size, masked slots (regs+stack+targets), stack-masked-only slots
"""
import sys, re, difflib, os
B='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build'
sys.path.insert(0,B)
import sbfdis
O=sbfdis.elf(B+'/../wt/evidence/original/mayhem/deployed.so')
WS={'O0083':(140512,159160),'O0081':(113672,127520),'O0084':(159160,177256),'O0082':(127520,140512)}
def mask(t,regs=True):
    t=re.sub(r'\[r10-\d+\]','[r10-S]',t)
    t=re.sub(r'add64 (r\d), -\d+$',r'add64 \1, -K',t)
    t=re.sub(r'(j\w+ .*), 0x[0-9a-f]+$',r'\1, T',t)
    t=re.sub(r'^ja 0x[0-9a-f]+$','ja T',t)
    t=re.sub(r'^call .*','call',t)
    t=re.sub(r'^lddw (r\d+), 0x[0-9a-f]{5,6}$',r'lddw \1, A',t)
    t=re.sub(r'^lddw (r\d+), 0x0$',r'lddw \1, A',t)
    if regs: t=re.sub(r'r\d','rX',t)
    return t
def slots(x,y):
    sm=difflib.SequenceMatcher(a=x,b=y,autojunk=False)
    return sum(max(i2-i1,j2-j1) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal')
def lst(E,a,b): return [x['text'] for x in sbfdis.window_insns(E,a,b)]
def score(path,pats,win='O0083'):
    S,E_=WS[win]; A=lst(O,S,E_)
    C=sbfdis.elf(path); f=sbfdis.funcs(C); out=[]
    for a,(b,n) in sorted(f.items()):
        if any(p in n for p in pats):
            Y=lst(C,a,b)
            m=slots([mask(t) for t in A],[mask(t) for t in Y]); s=slots([mask(t,False) for t in A],[mask(t,False) for t in Y])
            out.append((m,s,b-a,n))
    return out
if __name__=='__main__':
    pats=sys.argv[2:] or ['buy_v2_handler']
    for m,s,sz,n in score(sys.argv[1],pats,os.environ.get('WIN','O0083')):
        print(f'{m:5d} {s:5d} {sz:6d} {n[:90]}')
