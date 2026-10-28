#!/usr/bin/env python3
"""rs.py SO|BIN [pattern]: numeric-only region scores for O0083 (masked regs+stack+targets): total and per region
(P=price <1900, C=cap 1900-3300, M=mid 3300-15000, E=event >=15000). Prints no instructions."""
import sys, difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/tools')
import sc, sbfdis, objsec
def lst_so(p,pat):
    C=sbfdis.elf(p); f=sbfdis.funcs(C); c=[(a,b) for a,(b,n) in f.items() if pat in n]; assert len(c)==1
    a,b=c[0]; return [x['text'] for x in sbfdis.window_insns(C,a,b)]
def lst_bin(p):
    code=open(p,'rb').read(); return [sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text'] for pc,r in objsec.insns(code)]
def regions(Y, regs=True):
    S,E=sc.WS['O0083']; A=sbfdis.window_insns(sc.O,S,E); off=[x['pc']-S for x in A]
    x=[sc.mask(t['text'],regs) for t in A]; y=[sc.mask(t,regs) for t in Y]
    sm=difflib.SequenceMatcher(a=x,b=y,autojunk=False); r={'P':0,'C':0,'M':0,'E':0}; tot=0
    for t,i1,i2,j1,j2 in sm.get_opcodes():
        if t=='equal': continue
        n=max(i2-i1,j2-j1); tot+=n; o=off[min(i1,len(off)-1)]
        k='P' if o<1900 else 'C' if o<3300 else 'M' if o<15000 else 'E'; r[k]+=n
    return tot,r
if __name__=='__main__':
    p=sys.argv[1]; pat=sys.argv[2] if len(sys.argv)>2 else 'buy_v2_handler'
    Y=lst_so(p,pat) if p.endswith('.so') else lst_bin(p)
    t,r=regions(Y); t2,r2=regions(Y,False)
    print(f'size {len(Y)*8} masked {t} {r} | stackmasked {t2} {r2}')
