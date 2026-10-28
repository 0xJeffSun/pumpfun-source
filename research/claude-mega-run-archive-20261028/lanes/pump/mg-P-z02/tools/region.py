#!/usr/bin/env python3
# region.py <orig_start> <cand.so> <cand_start> <call_i> <call_j> [width]: side-by-side insns between call #i and call #j
import sys, re, subprocess, difflib
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows, BASE
st=int(sys.argv[1],0); so=sys.argv[2]; cs=int(sys.argv[3],0); ci=int(sys.argv[4]); cj=int(sys.argv[5]); W=int(sys.argv[6]) if len(sys.argv)>6 else 44
w=next(x for x in original_windows() if x['start']==st)
def ins(path,a,n):
    t=subprocess.run([OD,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={a+n:#x}',path],capture_output=True,text=True).stdout
    out=[]
    for l in t.split('\n'):
        m=re.match(r'\s*([0-9a-f]+):\s+(.*)$',l)
        if m: out.append((int(m.group(1),16)-a, re.sub(r'\s*<.*>','',m.group(2).strip())))
    return out
def cut(L):
    idx=[k for k,(o,t) in enumerate(L) if t.startswith('call') or t=='exit']
    return L[idx[ci]:idx[cj]+1]
o=cut(ins(str(BASE/'original.so'),st,w['bytes'])); c=cut(ins(so,cs,w['bytes']+4096))
n=lambda s: re.sub(r'r\d','r',s)
sm=difflib.SequenceMatcher(None,[n(x[1]) for x in o],[n(x[1]) for x in c],autojunk=False)
print('orig',len(o),'cand',len(c),'ratio %.3f'%sm.ratio())
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag=='equal':
        print(f'   = {i2-i1} equal ({o[i1][1][:30]} .. {o[i2-1][1][:30]})'); continue
    for k in range(max(i2-i1,j2-j1)):
        a=o[i1+k][1] if i1+k<i2 else ''; b=c[j1+k][1] if j1+k<j2 else ''
        print(f'{tag[0]} {a[:W]:<{W}} | {b[:W]}')
