#!/usr/bin/env python3
"""ofn.py <obj.o> <symregex> : print normalized-insn text of a function in an llc object (one per line)."""
import sys,re,subprocess
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
o,rx=sys.argv[1],sys.argv[2]
txt=subprocess.check_output([OBJ,'-t',o],text=True)
for line in txt.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)): sec,off,size=m.group(2),int(m.group(1),16),int(m.group(3),16)
d=subprocess.check_output([OBJ,'-d','--no-show-raw-insn','-j',sec,o],text=True)
for l in d.splitlines():
    mm=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if mm and off<=int(mm.group(1),16)<off+size:
        t=re.sub(r'\s*<[^>]*>','',mm.group(2)).strip()
        t=re.sub(r'^call .*','call',t); t=re.sub(r'^(lddw r\d+), .*',r'\1, X',t)
        print(t)
