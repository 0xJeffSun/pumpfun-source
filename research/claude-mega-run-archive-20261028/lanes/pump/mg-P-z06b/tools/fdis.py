#!/usr/bin/env python3
"""fdis.py <obj.o> <symregex> [from_idx] [to_idx]: disassemble one function from a relocatable object, numbered by instruction slot."""
import sys,re,subprocess
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
o,rx=sys.argv[1],sys.argv[2]; a=int(sys.argv[3]) if len(sys.argv)>3 else 0; b=int(sys.argv[4]) if len(sys.argv)>4 else 1<<30
t=subprocess.check_output([OD,'-t',o],text=True); sec=None
for line in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)): sec=m.group(2)
d=subprocess.check_output([OD,'-dr','--no-show-raw-insn','-j',sec,o],text=True)
base=None
last=-1
for line in d.splitlines():
    m=re.match(r'^\s+([0-9a-f]+):\s+(\S.*)$',line)
    if not m: continue
    if m.group(2).startswith('R_'):
        if a<=last<b: print('        ',re.sub(r'::h[0-9a-f]{16}$','',m.group(2))[:90])
        continue
    x=int(m.group(1),16)
    if base is None: base=x
    i=(x-base)//8; last=i
    if a<=i<b: print(f'{i:5d}  {re.sub(r"\s*<[^>]*>","",m.group(2))}')
