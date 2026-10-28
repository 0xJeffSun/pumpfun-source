#!/usr/bin/env python3
"""cseq.py <orig_start> [cand.so symregex] -> callee sequence of the original window (names from origsym.json);
with a candidate, a diff of callee sequences. Short output (one line per call)."""
import json,subprocess,sys,re,difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import candidate_functions, original_windows
from win import demangle
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-v3b'
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
m=json.load(open(L+'/tools/origsym.json'))
def short(n): return re.sub(r'::h[0-9a-f]{16}$','',n).replace('pump_recovered::','')[:80]
def seq(path,s,e,names):
    txt=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={s:#x}',f'--stop-address={e:#x}',path],text=True)
    out=[]
    for l in txt.splitlines():
        mm=re.match(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',l)
        if mm:
            a=int(mm.group(1),16);t=a+8+int(mm.group(2),16)*8
            out.append((a-s,(names(t) or hex(t))+("" if not names(t) or "closure" not in names(t) else "@"+hex(t))))
        mm=re.match(r'^\s*([0-9a-f]+):\s+call (\w+)$',l)
        if mm and not mm.group(2).startswith('0x'): out.append((int(mm.group(1),16)-s,'sys:'+mm.group(2)))
    return out
st=int(sys.argv[1],16); w=next(x for x in original_windows() if x['start']==st)
O=seq(W+'/base/original.so',st,st+w['bytes'],lambda t:m.get(hex(t)))
if len(sys.argv)<3:
    for a,n in O: print(f'{a:#6x} {n}')
    sys.exit()
fs=candidate_functions(sys.argv[2]); byaddr={s:short(demangle(nm)) for s,_,nm in fs}
cs=[(s,n,nm) for s,n,nm in fs if re.search(sys.argv[3],demangle(nm))]
c=cs[0]; print('cand',short(demangle(c[2])),c[1],'B  orig',w['bytes'],'B')
C=seq(sys.argv[2],c[0],c[0]+c[1],lambda t:byaddr.get(t))
for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,[x[1] for x in O],[x[1] for x in C],autojunk=False).get_opcodes():
    if op=='equal':
        for k in range(i2-i1): print(f'   {O[i1+k][0]:#6x} {C[j1+k][0]:#6x} {O[i1+k][1]}')
    else:
        for k in range(i1,i2): print(f' - {O[k][0]:#6x}        {O[k][1]}')
        for k in range(j1,j2): print(f' +        {C[k][0]:#6x} {C[k][1]}')
