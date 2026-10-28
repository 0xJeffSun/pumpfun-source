#!/usr/bin/env python3
"""side.py <orig_start> <obj.o|so> <symregex> <orel_from> <orel_to>: aligned side-by-side listing (full text, branch offs masked)
of the original window range vs candidate (structural alignment)."""
import sys,subprocess,re,difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); p=sys.argv[2]; rx=sys.argv[3]; fr=int(sys.argv[4],0); to=int(sys.argv[5],0)
w=next(x for x in original_windows() if x['start']==st)
def lines_of(path,args):
    t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn']+args+[path],text=True); res=[]
    for l in t.splitlines():
        m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
        if m:
            x=re.sub(r'\s+<.*>','',m.group(2).strip()); x=re.sub(r'^call .*','call',x); x=re.sub(r'^(lddw r\d+), .*',r'\1, X',x)
            x=re.sub(r'^(j\w+ .*?)[+-]0x[0-9a-f]+$',r'\1L',x); res.append((int(m.group(1),16),x))
    return res
t=subprocess.check_output([OBJ,'-t',p],text=True)
for line in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)): a0=int(m.group(1),16); n=int(m.group(3),16); sec=m.group(2)
C=[(a-a0,x) for a,x in lines_of(p,(['-j',sec] if p.endswith('.o') else [f'--start-address={a0:#x}',f'--stop-address={a0+n:#x}'])) if a0<=a<a0+n]
O=[(a-st,x) for a,x in lines_of('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so',[f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}'])]
mk=lambda x: re.sub(r'r10 - 0x[0-9a-f]+','S',re.sub(r'\br\d\b','R',x))
sm=difflib.SequenceMatcher(None,[mk(x) for _,x in O],[mk(x) for _,x in C],autojunk=False)
for t,i1,i2,j1,j2 in sm.get_opcodes():
    for k in range(max(i2-i1,j2-j1)):
        a=O[i1+k] if i1+k<i2 else None; b=C[j1+k] if j1+k<j2 else None
        oa=a[0] if a else None
        if oa is not None and not (fr<=oa<to): continue
        if oa is None and not (b and C[j1][0]>=0 and any(fr<=O[min(i1,len(O)-1)][0]<to for _ in [0])): continue
        sa='%#06x %-30s'%(a[0],a[1]) if a else ' '*37
        sb='%#06x %s'%(b[0],b[1]) if b else ''
        mark=' ' if (a and b and a[1]==b[1]) else '*'
        print(mark,sa,'|',sb)
