#!/usr/bin/env python3
"""ofnm.py OBJ ORIGADDR SUB1 [SUB2 ...] -> normalized diff counts of each function (function-sections .o) vs orig"""
import sys,re,subprocess,difflib,os
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
D='/Users/shawwalters/amm100-run/lanes/mg-A-sp2/tools/dis.py'
def norm(i):
    i=re.sub(r'\s+',' ',i.strip()); i=re.sub(r' *<[^>]*>','',i)
    i=re.sub(r'^call .*','call',i); i=re.sub(r'^(lddw r\d+), .*',r'\1, IMM',i)
    if os.environ.get('MASKLINE'): i=re.sub(r'^(stw \[r10 - 0x[0-9a-f]+\]), .*',r'\1, LINE',i)
    return i
o,a=sys.argv[1],sys.argv[2]
orig=[norm(l.split(None,1)[1]) for l in subprocess.run(['python3','-I',D,'orig',a],capture_output=True,text=True).stdout.splitlines() if l.strip()]
secs=subprocess.run([OBJ,'-h',o],capture_output=True,text=True).stdout
for sub in sys.argv[3:]:
    full=sub.endswith('!'); sub=sub.rstrip('!')
    ss=[l.split()[1] for l in secs.splitlines() if sub in l and '.text' in l]
    if not ss: print(f'{sub}: NOT FOUND'); continue
    sec=ss[0]
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j',sec,o],capture_output=True,text=True).stdout
    cand=[norm(m.group(1)) for m in re.finditer(r'^\s*[0-9a-f]+:\s+(.*)$',out,re.M)]
    d=[l for l in difflib.unified_diff(orig,cand,n=0,lineterm='') if l[:1] in '+-' and l[:3] not in ('+++','---')]
    print(f'{sub}: orig {len(orig)} cand {len(cand)} | -{sum(1 for l in d if l[0]=="-")} +{sum(1 for l in d if l[0]=="+")}')
    if full:
        for l in difflib.unified_diff(orig,cand,n=0,lineterm=''):
            if l[:1] in '+-@' and l[:3] not in ('+++','---'): print('   ',l)
