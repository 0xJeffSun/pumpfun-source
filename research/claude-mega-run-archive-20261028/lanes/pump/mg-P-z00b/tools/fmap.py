#!/usr/bin/env python3
"""fmap.py <orig_start> [obj.o|so] [symregex]: frame map: every r10 offset (direct access or address-taken via add -X),
with count, first relative position, kinds. Orig if only start given."""
import sys,subprocess,re,collections
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); w=next(x for x in original_windows() if x['start']==st)
def lines_of(path,args):
    t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn']+args+[path],text=True); res=[]
    for l in t.splitlines():
        m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
        if m: res.append((int(m.group(1),16),re.sub(r'\s+<.*>','',m.group(2).strip())))
    return res
if len(sys.argv)>2:
    p=sys.argv[2]; rx=sys.argv[3]
    t=subprocess.check_output([OBJ,'-t',p],text=True); sec=None
    for line in t.splitlines():
        m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
        if m and re.search(rx,m.group(4)): a0=int(m.group(1),16); n=int(m.group(3),16); sec=m.group(2)
    if p.endswith('.o'): L=[(a-a0,x) for a,x in lines_of(p,['-j',sec]) if a0<=a<a0+n]
    else: L=[(a-a0,x) for a,x in lines_of(p,[f'--start-address={a0:#x}',f'--stop-address={a0+n:#x}'])]
else:
    L=[(a-st,x) for a,x in lines_of('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so',[f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}'])]
D=collections.OrderedDict(); prev={}
for i,(a,x) in enumerate(L):
    for m in re.finditer(r'\[r10 - 0x([0-9a-f]+)\]',x):
        off=int(m.group(1),16); k=x.split()[0]
        d=D.setdefault(off,[0,a,collections.Counter()]); d[0]+=1; d[2][k]+=1
    m=re.match(r'^add64 (r\d), -0x([0-9a-f]+)$',x)
    if m and i>0 and L[i-1][1]==f'mov64 {m.group(1)}, r10':
        off=int(m.group(2),16); d=D.setdefault(off,[0,a,collections.Counter()]); d[0]+=1; d[2]['&']+=1
for off in sorted(D):
    c,a,k=D[off]; print('-%#05x n=%-3d first=%#06x %s'%(off,c,a,' '.join('%s%d'%(kk,v) for kk,v in sorted(k.items()))))
