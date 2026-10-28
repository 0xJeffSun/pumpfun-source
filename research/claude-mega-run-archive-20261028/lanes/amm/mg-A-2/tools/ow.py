# ow.py (orig ADDR | SO NAME) FROM TO  -> print instructions [FROM,TO] (1-based idx as in nd.py diffs) with byte offsets
import sys,types,re
from pathlib import Path
D=Path(__file__).resolve().parent
d=types.ModuleType('d');p=D/'dis.py'
src=p.read_text().split("if sys.argv[1]=='orig':")[0]
d.__file__=str(p);exec(compile(src,str(p),'exec'),d.__dict__)
if sys.argv[1]=='orig':
    o=d.m.Elf(d.ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a);L=d.lines(d.ORIG,a,z,d.onames())
else:
    e,fs=d.cand(sys.argv[1],sys.argv[2]);f=fs[0];L=d.lines(sys.argv[1],f['start'],f['start']+f['size'],d.cnames(e))
f,t=int(sys.argv[3]),int(sys.argv[4])
for i,(off,ins) in enumerate(L,1):
    if f<=i<=t: print(f'{i:5d} {off:5x} {ins}')
