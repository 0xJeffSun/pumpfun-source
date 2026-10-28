# ndo.py OBJ ADDR SYMSUB [ctx] -> masked diff orig window vs function in relocatable .o (llc -function-sections)
# env MS/MR/MJ as nd.py
import os,sys,re,difflib,types,subprocess,collections
from pathlib import Path
D=Path(__file__).resolve().parent
d=types.ModuleType('d');p=D/'dis.py'
src=p.read_text().split("if sys.argv[1]=='orig':")[0]
d.__file__=str(p);exec(compile(src,str(p),'exec'),d.__dict__)
OBJ=d.OBJ
def mask(i):
    i=re.sub(r'^call .*','call <>',i)
    i=re.sub(r'<[^>]*>','<>',i)
    i=re.sub(r'^lddw (r\d+), .*',r'lddw \1, IMM',i)
    if os.environ.get('MJ'): i=re.sub(r'([+-]0x[0-9a-f]+|[+-]\d+) <>$','J',i); i=re.sub(r'^(ja|j\w+ .*), [+-]?(0x)?[0-9a-f]+$',r'\1 J',i)
    if os.environ.get('MS'):
        i=re.sub(r'r10 - 0x[0-9a-f]+','r10-S',i); i=re.sub(r'^add64 (r\d+), -0x[0-9a-f]+$',r'add64 \1, -S',i)
    if os.environ.get('MR'): i=re.sub(r'\br\d\b','r',i)
    return i
def objfn(o,sub):
    t=subprocess.run([OBJ,'-t',o],capture_output=True,text=True).stdout.splitlines()
    names=[l.split()[-1] for l in t if ' F ' in l and sub in l.split()[-1]]
    if not names: print('NO SYM',sub); sys.exit(1)
    s=names[0]
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j','.text.'+s,o],capture_output=True,text=True).stdout
    res=[]
    for l in out.splitlines():
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if mm: res.append(re.sub(r'\s+',' ',mm.group(2).strip()))
    return s,res
o=d.m.Elf(d.ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a)
s,Bl=objfn(sys.argv[1],sys.argv[3])
A=[mask(i) for _,i in d.lines(d.ORIG,a,z,{})];B=[mask(i) for i in Bl]
sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
nd=sum(max(i2-i1,j2-j1) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal')
ca,cb=collections.Counter(A),collections.Counter(B);ms=sum(((ca-cb)+(cb-ca)).values())
print(f'{sys.argv[2]} orig {len(A)} ins, cand {len(B)} ins, diff {nd} mset {ms} ({s[-50:]})')
if len(sys.argv)>4:
    for l in difflib.unified_diff(A,B,'orig','cand',n=int(sys.argv[4]),lineterm=''):print(l)
