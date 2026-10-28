"""3-level scorer vs orig O0083 for a llc .bin or symbols.so: (masked, regexact, full) slot counts.
masked = regs+stack masked; regexact = stack masked only; full = only addresses masked (jump/call/lddw)."""
import sys, re, difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import sc, sbfdis, objsec
def m3(t,lvl):
    t=re.sub(r'(j\w+ .*), 0x[0-9a-f]+$',r'\1, T',t); t=re.sub(r'^ja 0x[0-9a-f]+$','ja T',t)
    t=re.sub(r'^call .*','call',t); t=re.sub(r'^lddw (r\d+), 0x[0-9a-f]{5,6}$',r'lddw \1, A',t); t=re.sub(r'^lddw (r\d+), 0x0$',r'lddw \1, A',t)
    if lvl<=1:
        t=re.sub(r'\[r10-\d+\]','[r10-S]',t); t=re.sub(r'add64 (r\d), -\d+$',r'add64 \1, -K',t)
    if lvl==0: t=re.sub(r'r\d','rX',t)
    return t
_A=None
def orig():
    global _A
    if _A is None:
        S,E=sc.WS['O0083']; _A=[x['text'] for x in sbfdis.window_insns(sc.O,S,E)]
    return _A
def lst(p,pat='buy_v2_handler'):
    if isinstance(p,bytes): code=p
    elif p.endswith('.so'):
        C=sbfdis.elf(p); f=sbfdis.funcs(C); c=[(a,b) for a,(b,n) in f.items() if pat in n]; assert len(c)==1
        a,b=c[0]; return [x['text'] for x in sbfdis.window_insns(C,a,b)]
    else: code=open(p,'rb').read()
    return [sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text'] for pc,r in objsec.insns(code)]
def score(Y):
    A=orig(); return tuple(sc.slots([m3(t,l) for t in A],[m3(t,l) for t in Y]) for l in (0,1,2))
if __name__=='__main__':
    print(score(lst(sys.argv[1])))
