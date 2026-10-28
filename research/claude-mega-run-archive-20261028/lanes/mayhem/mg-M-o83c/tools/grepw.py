#!/usr/bin/env python3
"""grepw.py SO|BIN REGEX [pattern] [WIN]: list offsets+text of insns matching REGEX in orig window and cand fn."""
import sys, re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import sc, sbfdis, objsec
p=sys.argv[1]; rx=re.compile(sys.argv[2]); pat=sys.argv[3] if len(sys.argv)>3 else 'buy_v2_handler'; win=sys.argv[4] if len(sys.argv)>4 else 'O0083'
S,E=sc.WS[win]; A=[(x['pc']-S,x['text']) for x in sbfdis.window_insns(sc.O,S,E)]
if p.endswith('.so'):
    C=sbfdis.elf(p); f=sbfdis.funcs(C); c=[(a,b) for a,(b,n) in f.items() if pat in n]; assert len(c)==1
    a,b=c[0]; Y=[(x['pc']-a,x['text']) for x in sbfdis.window_insns(C,a,b)]
else:
    code=open(p,'rb').read(); Y=[(pc,sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text']) for pc,r in objsec.insns(code)]
print('orig:', ' ; '.join(f'{o}:{t}' for o,t in A if rx.search(t))[:1500])
print('cand:', ' ; '.join(f'{o}:{t}' for o,t in Y if rx.search(t))[:1500])
