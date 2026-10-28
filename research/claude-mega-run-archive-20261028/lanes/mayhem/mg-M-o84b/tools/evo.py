#!/usr/bin/env python3
"""evo.py (orig|SO) [fnpattern]: event store emission order in the final event block of the O0084 handler (or variant fn)."""
import sys, re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import irx, objsec, sbfdis
OFF = {0:'sv',32:'mint',64:'sa',72:'ta',80:'svb',88:'tvb',96:'ssd',112:'stn',128:'vs',136:'vt',144:'gsd',160:'ts',168:'et',176:'rs',184:'rt',192:'qa',200:'qvb',208:'sqd',224:'vq',232:'gqd',248:'rq',256:'qm',288:'ver',292:'rrb',294:'side'}
def code_of(p, pat='sell_v2_handler'):
    if p=='orig': return irx.O.b[irx.W[1]:irx.W[2]]
    C = sbfdis.elf(p); cf = sbfdis.funcs(C)
    a = [a for a, (b, n) in cf.items() if pat in n][0]
    return C.b[a:cf[a][0]]
def order(code):
    T=[sbfdis.decode(code,None,pc,pc+len(raw),None,None)[0]['text'] for pc,raw in objsec.insns(code)]
    k=[j for j,t in enumerate(T) if re.match(r'stb \[r10-\d+\], 1$',t)]
    j=k[-1]; side=-int(re.search(r'r10-(\d+)',T[j]).group(1)); ev=side-294
    st=j
    while st>0 and not T[st-1].startswith('ja') and not T[st-1].startswith('call'): st-=1
    en=j
    while en<len(T) and not T[en].startswith('mov64 r1, r10'): en+=1
    seq=[]
    for t in T[st:en]:
        m=re.match(r'st(?:x?)(dw|w|h|b) \[r10-(\d+)\]',t)
        if m:
            o=-int(m.group(2))-ev
            if 0<=o<296:
                f=max(k2 for k2 in OFF if k2<=o); seq.append(OFF[f]+('' if o==f else f'+{o-f}'))
    return ev,seq
if __name__=='__main__':
    ev,s=order(code_of(sys.argv[1], sys.argv[2] if len(sys.argv)>2 else 'sell_v2_handler'))
    print(ev,' '.join(s))
