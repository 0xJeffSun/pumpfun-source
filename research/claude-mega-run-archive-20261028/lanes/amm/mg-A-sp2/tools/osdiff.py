#!/usr/bin/env python3
"""osdiff.py OBJ ADDR SUB [ctx] : exact normalized diff count + structural diff (regs/imms masked) of fn SUB in .o vs orig window ADDR"""
import sys,re,subprocess,difflib
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp2'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
def clean(i):
    i=re.sub(r'\s+',' ',i.strip()); i=re.sub(r' *<[^>]*>','',i); i=re.sub(r'^call .*','call',i); i=re.sub(r'^(lddw r\d+), .*',r'\1, IMM',i); return i
o=[clean(l.split(None,1)[1]) for l in subprocess.run(['python3','-I',L+'/tools/dis.py','orig',sys.argv[2]],capture_output=True,text=True).stdout.splitlines() if l.strip()]
secs=subprocess.run([OBJ,'-h',sys.argv[1]],capture_output=True,text=True).stdout
sec=next(l.split()[1] for l in secs.splitlines() if sys.argv[3] in l and '.text' in l)
out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j',sec,sys.argv[1]],capture_output=True,text=True).stdout
c=[clean(m.group(1)) for m in re.finditer(r'^\s*[0-9a-f]+:\s+(.*)$',out,re.M)]
def mask(i):
    i=re.sub(r'r\d+','r',i); i=re.sub(r'[+-]0x[0-9a-f]+|[+-]\d+','N',i); i=re.sub(r'0x[0-9a-f]+','N',i); return i
d=[l for l in difflib.unified_diff(o,c,n=0,lineterm='') if l[:1] in '+-' and l[:3] not in ('+++','---')]
exact=len(d)
A=[mask(x) for x in o]; B=[mask(x) for x in c]
sm=difflib.SequenceMatcher(None,A,B,autojunk=False); tot=0; hunks=[]
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag=='equal': continue
    tot+=max(i2-i1,j2-j1); hunks.append((tag,i1,i2,j1,j2))
print(f'orig {len(o)} cand {len(c)} | exact-diff {exact} | struct {tot} in {len(hunks)} hunks')
if len(sys.argv)>4:
    for tag,i1,i2,j1,j2 in hunks:
        print(f'{tag} o{i1}:{i2-i1} c{j1}:{j2-j1}')
        if int(sys.argv[4])>1:
            for k in range(i1,i2): print('   -',o[k])
            for k in range(j1,j2): print('   +',c[k])
