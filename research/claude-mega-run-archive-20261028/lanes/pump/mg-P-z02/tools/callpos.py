#!/usr/bin/env python3
# callpos.py <orig_start> <cand.so> <cand_start>: compare call offsets (from fn start) orig vs cand, in order
import sys, re, subprocess
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows, BASE
st=int(sys.argv[1],0); so=sys.argv[2]; cs=int(sys.argv[3],0)
w=next(x for x in original_windows() if x['start']==st)
def calls(path,a,n):
    t=subprocess.run([OD,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={a+n:#x}',path],capture_output=True,text=True).stdout
    out=[]
    for l in t.split('\n'):
        m=re.match(r'\s*([0-9a-f]+):\s+(call|exit)',l)
        if m: out.append((int(m.group(1),16)-a,m.group(2)))
    return out
o=calls(str(BASE/'original.so'),st,w['bytes']); c=calls(so,cs,w['bytes']+4096)
for i,(x,y) in enumerate(zip(o,c)):
    print(i,hex(x[0]),hex(y[0]),x[0]-y[0],x[1] if x[1]==y[1] else x[1]+'/'+y[1])
print(len(o),len(c))
