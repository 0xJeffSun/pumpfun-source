#!/usr/bin/env python3
"""smap.py <orig_start> <obj.o|so> <symregex> [--lines]: structural alignment (regs/stack offs/branch offs masked) of orig window vs
candidate fn; prints match ratio of masked streams, and the stack-offset map orig->cand (with counts) from aligned pairs.
--lines prints masked-different hunks (short)."""
import sys,subprocess,re,collections,difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); p=sys.argv[2]; rx=sys.argv[3]; show='--lines' in sys.argv
w=next(x for x in original_windows() if x['start']==st)
def lines_of(path,args):
    t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn']+args+[path],text=True); res=[]
    for l in t.splitlines():
        m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
        if m:
            x=re.sub(r'\s+<.*>','',m.group(2).strip()); x=re.sub(r'^call .*','call',x); x=re.sub(r'^(lddw r\d+), .*',r'\1, X',x)
            res.append((int(m.group(1),16),x))
    return res
t=subprocess.check_output([OBJ,'-t',p],text=True)
for line in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)): a0=int(m.group(1),16); n=int(m.group(3),16); sec=m.group(2)
C=[(a-a0,x) for a,x in lines_of(p,(['-j',sec] if p.endswith('.o') else [f'--start-address={a0:#x}',f'--stop-address={a0+n:#x}'])) if a0<=a<a0+n]
O=[(a-st,x) for a,x in lines_of('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so',[f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}'])]
def mk(x): return re.sub(r'^(j\w+ .*?)[+-]0x[0-9a-f]+$',r'\1L',re.sub(r'r10 - 0x[0-9a-f]+','S',re.sub(r'\br\d\b','R',x)))
mo=[mk(x) for _,x in O]; mc=[mk(x) for _,x in C]
sm=difflib.SequenceMatcher(None,mo,mc,autojunk=False)
print('masked ratio %.4f  orig %d insns, cand %d insns'%(sm.ratio(),len(O),len(C)))
M=collections.Counter(); R=collections.Counter()
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t=='equal':
        for k in range(i2-i1):
            a=O[i1+k][1]; b=C[j1+k][1]
            for x,y in zip(re.findall(r'r10 - (0x[0-9a-f]+)',a),re.findall(r'r10 - (0x[0-9a-f]+)',b)): M[(int(x,16),int(y,16))]+=1
            m1=re.match(r'^(mov64|add64) (r\d), (-?0x[0-9a-f]+)$',a); m2=re.match(r'^(mov64|add64) (r\d), (-?0x[0-9a-f]+)$',b)
            if a.startswith('add64') and b.startswith('add64') and m1 and m2 and m1.group(3).startswith('-0x') : M[(int(m1.group(3)[3:],16),int(m2.group(3)[3:],16))]+=1
    elif show:
        for a,x in O[i1:i2][:10]: print('-%#06x %s'%(a,x))
        for a,x in C[j1:j2][:10]: print('+%#06x %s'%(a,x))
        print('~')
if not show:
    by=collections.defaultdict(list)
    for (a,b),c in M.items(): by[a].append((b,c))
    for a in sorted(by):
        print('-%#05x -> %s'%(a,' '.join('-%#05x x%d'%(b,c) for b,c in sorted(by[a],key=lambda z:-z[1]))))
