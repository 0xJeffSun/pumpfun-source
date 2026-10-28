#!/usr/bin/env python3
"""odis.py <orig_start> <relfrom> <relto> [obj.o|so symregex]: short disassembly slice (relative offsets) of the original window or a candidate fn."""
import sys,subprocess,re
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); a,b=int(sys.argv[2],0),int(sys.argv[3],0)
if len(sys.argv)>4:
    p,rx=sys.argv[4],sys.argv[5]
    t=subprocess.check_output([OBJ,'-t',p],text=True)
    for line in t.splitlines():
        m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
        if m and re.search(rx,m.group(4)): a0=int(m.group(1),16); sec=m.group(2)
    args=['-j',sec] if p.endswith('.o') else []
else: p='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so'; a0=st; args=[]
t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={a0+a:#x}',f'--stop-address={a0+b:#x}']+args+[p],text=True)
for l in t.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if m: print('%#06x %s'%(int(m.group(1),16)-a0,re.sub(r'\s+<.*>','',m.group(2).strip())))
