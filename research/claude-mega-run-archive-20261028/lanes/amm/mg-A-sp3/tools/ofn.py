#!/usr/bin/env python3
"""ofn.py OBJ ORIGADDR SYMSUB [full] -> normalized diff counts of a function in a relocatable .o (function-sections) vs orig"""
import sys,re,subprocess,difflib
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
D='/Users/shawwalters/amm100-run/lanes/mg-A-sp3/tools/dis.py'
def norm(i):
    i=re.sub(r'\s+',' ',i.strip()); i=re.sub(r' *<[^>]*>','',i)
    i=re.sub(r'^call .*','call',i); i=re.sub(r'^(lddw r\d+), .*',r'\1, IMM',i)
    return i
o,a,sub=sys.argv[1],sys.argv[2],sys.argv[3]
orig=[norm(l.split(None,1)[1]) for l in subprocess.run(['python3','-I',D,'orig',a],capture_output=True,text=True).stdout.splitlines() if l.strip()]
secs=subprocess.run([OBJ,'-h',o],capture_output=True,text=True).stdout
sec=next(l.split()[1] for l in secs.splitlines() if sub in l and '.text' in l)
out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j',sec,o],capture_output=True,text=True).stdout
cand=[norm(m.group(1)) for m in re.finditer(r'^\s*[0-9a-f]+:\s+(.*)$',out,re.M)]
d=[l for l in difflib.unified_diff(orig,cand,n=0,lineterm='') if l[:1] in '+-' and l[:3] not in ('+++','---')]
print(f'{sec[:60]}.. orig {len(orig)} cand {len(cand)} insns | -{sum(1 for l in d if l[0]=="-")} +{sum(1 for l in d if l[0]=="+")}')
if len(sys.argv)>4:
    for l in difflib.unified_diff(orig,cand,n=1,lineterm=''): print(l)
