# locs.py orig ADDR | cand SO NAME : list (path,line,col?) error-origin constant groups
import sys,re,subprocess,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
d=types.ModuleType('d');p=T/'dis.py';src=p.read_text().split("if sys.argv[1]=='orig':")[0];d.__file__=str(p);exec(compile(src,str(p),'exec'),d.__dict__)
def run(path,a,z):
    b=Path(path).read_bytes()
    L=d.lines(path,a,z,{})
    for k,(off,i) in enumerate(L):
        mm=re.match(r'lddw (r\d+), 0x([0-9a-f]+)',i)
        if not mm: continue
        v=int(mm.group(2),16)
        if v+40>len(b): continue
        s=b[v:v+120]
        if s.startswith(b'programs/'):
            nm=re.match(rb'[A-Za-z0-9_/.\-]*',s).group().decode()
            ctx=[x for _,x in L[k+1:k+8] if re.match(r'(stw|stdw|mov64 r\d, 0x)',x)]
            print(f'{off:5x} {nm[22:]}  {ctx[:5]}')
if sys.argv[1]=='orig':
    o=d.m.Elf(d.ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a);run(d.ORIG,a,z)
else:
    e,fs=d.cand(sys.argv[2],sys.argv[3]);f=fs[0];run(sys.argv[2],f['start'],f['start']+f['size'])
