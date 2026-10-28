#!/usr/bin/env python3
"""sdiff.py ADDR SO SUB [ctx]: structural diff (registers/offsets/imms masked) orig window vs cand fn; prints hunks with orig offsets"""
import sys,re,subprocess,difflib
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp2'
def get(args):
    out=subprocess.run(['python3','-I',L+'/tools/dis.py']+args,capture_output=True,text=True).stdout
    res=[]
    for l in out.splitlines():
        m=re.match(r'\s*([0-9a-f]+) (.*)',l)
        if m: res.append((int(m.group(1),16),m.group(2)))
    return res
def mask(i):
    i=re.sub(r'r\d+','r',i); i=re.sub(r'[+-]0x[0-9a-f]+|[+-]\d+','N',i); i=re.sub(r'0x[0-9a-f]+','N',i); i=re.sub(r'call .*','call',i)
    return i
o=get(['orig',sys.argv[1]]); c=get(['cand',sys.argv[2],sys.argv[3]])
A=[mask(x) for _,x in o]; B=[mask(x) for _,x in c]
ctx=int(sys.argv[4]) if len(sys.argv)>4 else 0
sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
tot=0
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag=='equal': continue
    tot+=max(i2-i1,j2-j1)
    print(f'{tag} orig[{o[i1][0] if i1<len(o) else -1:x}:{i2-i1}] cand[{c[j1][0] if j1<len(c) else -1:x}:{j2-j1}]')
    if ctx:
        for k in range(i1,i2): print('   -',o[k][1])
        for k in range(j1,j2): print('   +',c[k][1])
print('struct-diff size',tot)
