#!/bin/bash
# olist.sh OBJ SYMSUB > listing in 'off ins' format (like dis2 output) with call targets annotated from relocs
P=$HOME/.cache/solana/v1.52/platform-tools/llvm/bin
N=$($P/llvm-readelf -sW $1 | awk -v s="$2" '$4=="FUNC" && index($8,s){print $8; exit}')
$P/llvm-objdump -dr --no-show-raw-insn -j .text.$N $1 | python3 -I -c '
import sys,re
last=None
for l in sys.stdin:
    r=re.search(r"R_\w+\s+(\S+)",l)
    if r:
        if last and last[1].startswith("call"): print(f"{last[0]:5x} call <{re.sub(chr(49)+chr(55)+r\"h[0-9a-f]{16}E$\",\"\",r.group(1))[-60:]}>"); last=None
        continue
    m=re.match(r"\s*([0-9a-f]+):\s+(.*)",l)
    if m:
        if last: print(f"{last[0]:5x} {last[1]}")
        ins=re.sub(r"\s*<[^>]*>$","",m.group(2).strip()); ins=re.sub(r"\s+"," ",ins)
        last=(int(m.group(1),16),ins)
if last: print(f"{last[0]:5x} {last[1]}")
'
