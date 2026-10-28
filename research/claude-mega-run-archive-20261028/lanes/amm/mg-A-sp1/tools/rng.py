# rng.py orig ADDR LO HI | cand SO NAME LO HI : print instructions with offset in [LO,HI) (hex offsets within fn)
import sys,subprocess,re
from pathlib import Path
D=str(Path(__file__).parent/'dis.py')
a=sys.argv[1:]
args,lo,hi=(a[:3],a[3],a[4]) if a[0]=='cand' else (a[:2],a[2],a[3])
for l in subprocess.run(['python3','-I',D]+args,capture_output=True,text=True).stdout.splitlines():
    m=re.match(r'\s*([0-9a-f]+) (.*)',l)
    if m and int(lo,16)<=int(m.group(1),16)<int(hi,16): print(l[:150])
