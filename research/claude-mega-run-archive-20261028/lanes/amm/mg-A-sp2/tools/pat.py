#!/usr/bin/env python3
"""pat.py SO : find functions where a conditional branch target block is 'ldxdw rA, [r10 - X]; ja' (sunk payload load err block)"""
import sys,re,subprocess,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
so=sys.argv[1]; e=m.Elf(Path(so))
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',so],capture_output=True,text=True).stdout
ins={}
for l in out.splitlines():
    mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if mm: ins[int(mm.group(1),16)]=re.sub(r'\s+',' ',mm.group(2).strip())
hits={}
for f in e.funcs:
    a=f['start'];z=a+f['size']
    for at in range(a,z,8):
        i=ins.get(at,'')
        mm=re.match(r'(ja|j\w+ r\d+, (?:r\d+|0x[0-9a-f]+|\d+),) ([+-]0x[0-9a-f]+|[+-]\d+)$',i)
        if not mm: continue
        off=int(mm.group(2),0); t=at+8+off*8
        if a<=t<z and re.match(r'ldxdw r\d, \[r10 - 0x[0-9a-f]+\]$',ins.get(t,'')) and ins.get(t+8,'').startswith('ja '):
            # previous insn before branch should be part of tag check
            hits.setdefault(f['name'],0); hits[f['name']]+=1
for n,c in sorted(hits.items(),key=lambda x:-x[1]): print(c,n[:150])
