#!/usr/bin/env python3
"""side.py OBJ ADDR SUB START END : side-by-side orig window vs .o function instructions [START,END) (instruction indices)"""
import sys,re,subprocess
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp2'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
def clean(i): return re.sub(r'\s+',' ',re.sub(r' *<[^>]*>','',i).strip())
o=[clean(l.split(None,1)[1]) for l in subprocess.run(['python3','-I',L+'/tools/dis.py','orig',sys.argv[2]],capture_output=True,text=True).stdout.splitlines() if l.strip()]
secs=subprocess.run([OBJ,'-h',sys.argv[1]],capture_output=True,text=True).stdout
sec=next(l.split()[1] for l in secs.splitlines() if sys.argv[3] in l and l.split()[1].startswith('.text'))
out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j',sec,sys.argv[1]],capture_output=True,text=True).stdout
c=[clean(m.group(1)) for m in re.finditer(r'^\s*[0-9a-f]+:\s+(.*)$',out,re.M)]
a,b=int(sys.argv[4]),int(sys.argv[5])
for k in range(a,b):
    x=o[k] if k<len(o) else ''; y=c[k] if k<len(c) else ''
    print(f'{k:4d} {"  " if x==y else "!="} {x:34s} | {y}')
