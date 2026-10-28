#!/usr/bin/env python3
"""ocalls.py <orig_start> [so=original] [sym]: list call/exit sites in a window with relative offsets and callee names."""
import sys,subprocess,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); so=sys.argv[2] if len(sys.argv)>2 else '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so'
w=next(x for x in original_windows() if x['start']==st)
if len(sys.argv)>3:
    t=subprocess.check_output([OBJ,'-t',so],text=True)
    for line in t.splitlines():
        m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
        if m and re.search(sys.argv[3],m.group(4)): st=int(m.group(1),16); n=int(m.group(3),16)
else: n=w['bytes']
t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+n:#x}',so],text=True)
for l in t.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(call|exit|syscall)(.*)$',l)
    if m: print('%#06x %s%s'%(int(m.group(1),16)-st,m.group(2),m.group(3)[:90]))
