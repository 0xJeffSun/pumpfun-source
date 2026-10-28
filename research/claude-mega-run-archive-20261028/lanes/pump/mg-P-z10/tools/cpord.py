#!/usr/bin/env python3
"""cpord.py <obj> [symregex]: find runs of >=4 (ldxdw rA,[rB+off]; stxdw [r10-X],rA) pairs with the same rB and offsets
{0,8,16,24} in the function; print their offset order (A = ascending, D = descending)."""
import sys, re, subprocess
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
o=sys.argv[1]; rx=sys.argv[2] if len(sys.argv)>2 else '.'
txt=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',o],text=True)
cur=None; ins=[]
fns={}
for l in txt.splitlines():
    m=re.match(r'^[0-9a-f]+ <(.*)>:$',l)
    if m: cur=m.group(1); fns.setdefault(cur,[]); continue
    m=re.match(r'^\s*[0-9a-f]+:\s+(.*)$',l)
    if m and cur: fns[cur].append(re.sub(r'\s+',' ',m.group(1).strip()))
for name,ins in fns.items():
    if not re.search(rx,name): continue
    i=0
    while i<len(ins)-1:
        run=[]; j=i; base=None
        while j<len(ins)-1:
            a=re.match(r'ldxdw (r\d+), \[(r\d+) \+ 0x([0-9a-f]+)\]',ins[j]); b=re.match(r'stxdw \[r10 - 0x([0-9a-f]+)\], (r\d+)',ins[j+1])
            if a and b and a.group(1)==b.group(2) and (base is None or base==a.group(2)):
                base=a.group(2); run.append(int(a.group(3),16)); j+=2
            else: break
        if len(run)>=4 and sorted(run)[:4]==[0,8,16,24]:
            print(name[:60], i, run, 'A' if run==sorted(run) else ('D' if run==sorted(run,reverse=True) else 'X'))
            i=j
        else: i+=1
