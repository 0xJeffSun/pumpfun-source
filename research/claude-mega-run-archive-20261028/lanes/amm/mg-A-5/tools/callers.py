import sys,types,re
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
e=m.Elf(Path(sys.argv[1]));fs=sorted(e.funcs,key=lambda f:f['start'])
tg=[f['start'] for f in fs if sys.argv[2] in f['name']]
import bisect
st=[f['start'] for f in fs]
for at,t in e.calls.items():
    if t in tg:
        i=bisect.bisect_right(st,at)-1;print(hex(fs[i]['start']),fs[i]['size'],re.sub(r'17h[0-9a-f]{16}E$','',fs[i]['name'])[-100:])
