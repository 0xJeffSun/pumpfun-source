#!/usr/bin/env python3
"""ctx.py SO|BIN A B [pattern] [WIN]: print orig window insns and cand fn insns in byte offset range [A,B) side by side (raw text)."""
import sys
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import sc, sbfdis, objsec
p=sys.argv[1]; a0=int(sys.argv[2]); b0=int(sys.argv[3]); pat=sys.argv[4] if len(sys.argv)>4 else 'buy_v2_handler'; win=sys.argv[5] if len(sys.argv)>5 else 'O0083'
S,E=sc.WS[win]; A=[(x['pc']-S,x['text']) for x in sbfdis.window_insns(sc.O,S,E)]
if p.endswith('.so'):
    C=sbfdis.elf(p); f=sbfdis.funcs(C); c=[(a,b) for a,(b,n) in f.items() if pat in n]; assert len(c)==1
    a,b=c[0]; Y=[(x['pc']-a,x['text']) for x in sbfdis.window_insns(C,a,b)]
else:
    code=open(p,'rb').read(); Y=[(pc,sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text']) for pc,r in objsec.insns(code)]
L=[f'{o:6d} {t}' for o,t in A if a0<=o<b0]; R=[f'{o:6d} {t}' for o,t in Y if a0<=o<b0]
for i in range(max(len(L),len(R))):
    l=L[i] if i<len(L) else ''; r=R[i] if i<len(R) else ''
    print(f'{l:42s} | {r}')
