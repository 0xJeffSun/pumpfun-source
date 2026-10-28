import sys,types,re
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
e=m.Elf(Path(sys.argv[1]))
pat=sys.argv[2] if len(sys.argv)>2 else ''
for f in sorted(e.funcs,key=lambda f:f['start']):
    if pat in f['name']:
        n=f['name']
        try:
            import subprocess
        except: pass
        print(hex(f['start']), f['size'], n.split('17h')[0][-90:])
