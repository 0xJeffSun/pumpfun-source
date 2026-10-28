#!/usr/bin/env python3
# ccalls.py SO ADDR SIZE : list calls in candidate fn with target symbol names
import sys,subprocess,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import Cand, demangle
so=sys.argv[1]; a=int(sys.argv[2],16); n=int(sys.argv[3])
c=Cand(so); names={s:demangle(nm) for (s,_,nm) in c.funcs}
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
txt=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={a+n:#x}',so],text=True)
for line in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+call\s+(-?0x[0-9a-f]+|-?\d+)',line)
    if m:
        pc=int(m.group(1),16); imm=int(m.group(2),0)
        t=pc+8+imm*8
        print(hex(pc),hex(t),names.get(t,'?')[:150])
