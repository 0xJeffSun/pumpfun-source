# insn.py OBJ SYMSUB FROM TO : print instructions [FROM,TO) of a function in a relocatable .o (or 'orig ADDR FROM TO')
import sys,re,subprocess,types
from pathlib import Path
D=Path(__file__).resolve().parent
OBJ='/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llvm-objdump'
if sys.argv[1]=='orig':
    d=types.ModuleType('d');p=D/'dis.py';src=p.read_text().split("if sys.argv[1]=='orig':")[0]
    d.__file__=str(p);exec(compile(src,str(p),'exec'),d.__dict__)
    o=d.m.Elf(d.ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a)
    ins=[i for _,i in d.lines(d.ORIG,a,z,{})]
else:
    t=subprocess.run([OBJ,'-t',sys.argv[1]],capture_output=True,text=True).stdout.splitlines()
    s=[l.split()[-1] for l in t if ' F ' in l and sys.argv[2] in l.split()[-1]][0]
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j','.text.'+s,sys.argv[1]],capture_output=True,text=True).stdout
    ins=[re.sub(r'\s+',' ',m.group(2).strip()) for m in (re.match(r'\s*([0-9a-f]+):\s+(.*)',l) for l in out.splitlines()) if m]
a,b=int(sys.argv[3]),int(sys.argv[4])
for i in range(a,min(b,len(ins))): print(i,ins[i])
