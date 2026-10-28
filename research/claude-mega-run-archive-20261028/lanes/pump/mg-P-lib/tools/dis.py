#!/usr/bin/env python3
"""dis.py START [END|+LEN] [--so path]  compact disasm with absolute jump targets (orig by default)."""
import sys, subprocess, re
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
a=sys.argv[1:]; so=W+'/base/original.so'
if '--so' in a: i=a.index('--so'); so=a[i+1]; del a[i:i+2]
s=int(a[0],16); e=a[1] if len(a)>1 else '+0x400'
e=s+int(e[1:],16) if e.startswith('+') else int(e,16)
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={s:#x}',f'--stop-address={e:#x}',so],capture_output=True,text=True).stdout
for l in out.splitlines():
    m=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if not m: continue
    ad,ins=m.groups(); ins=re.sub(r'\s+',' ',ins.strip())
    ins=re.sub(r'<\.text\+0x([0-9a-f]+)>',lambda mm:'@'+hex(int(mm.group(1),16)+0x120),ins)
    ins=re.sub(r' [+-]0x[0-9a-f]+ @',' @',ins) if ins.startswith(('j','ja')) else ins
    print(ad,ins)
