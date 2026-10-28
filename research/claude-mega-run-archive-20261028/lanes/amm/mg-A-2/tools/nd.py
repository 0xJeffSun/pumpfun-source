# nd.py SO ADDR NAME_SUBSTR [ctx]  -> masked diff orig window vs cand fn (lddw imm + call targets masked)
# env MS=1 mask stack offsets, MR=1 mask registers, MJ=1 mask jump offsets
import os,sys,re,difflib,types,collections
from pathlib import Path
D=Path(__file__).resolve().parent
d=types.ModuleType('d');p=D/'dis.py'
src=p.read_text().split("if sys.argv[1]=='orig':")[0]
d.__file__=str(p);exec(compile(src,str(p),'exec'),d.__dict__)
def mask(i):
    i=re.sub(r'<[^>]*>','<>',i)
    i=re.sub(r'^lddw (r\d+), .*',r'lddw \1, IMM',i)
    if os.environ.get('MJ'): i=re.sub(r'([+-]0x[0-9a-f]+|[+-]\d+) <>$','J',i); i=re.sub(r'^(ja|j\w+ .*), [+-]?(0x)?[0-9a-f]+$',r'\1 J',i)
    if os.environ.get('MS'):
        i=re.sub(r'r10 - 0x[0-9a-f]+','r10-S',i); i=re.sub(r'^add64 (r\d+), -0x[0-9a-f]+$',r'add64 \1, -S',i)
    if os.environ.get('MR'): i=re.sub(r'\br\d\b','r',i)
    return i
o=d.m.Elf(d.ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a)
e,fs=d.cand(sys.argv[1],sys.argv[3])
if not fs: print('NO FUNC',sys.argv[3]); sys.exit(1)
f=fs[0]
A=[mask(i) for _,i in d.lines(d.ORIG,a,z,{})];B=[mask(i) for _,i in d.lines(sys.argv[1],f['start'],f['start']+f['size'],{})]
sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
nd=sum(max(i2-i1,j2-j1) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal')
ca,cb=collections.Counter(A),collections.Counter(B);ms=sum(((ca-cb)+(cb-ca)).values())
print(f'{sys.argv[2]} orig {len(A)} ins {z-a}B, cand {len(B)} ins {f["size"]}B, diff {nd} mset {ms} ({f["name"][-60:]})')
if len(sys.argv)>4:
    for l in difflib.unified_diff(A,B,'orig','cand',n=int(sys.argv[4]),lineterm=''):print(l)
