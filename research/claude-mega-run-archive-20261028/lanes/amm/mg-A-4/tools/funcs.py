import sys,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
c=m.Elf(Path(sys.argv[1]))
for f in c.funcs:
  if sys.argv[2] in f['name']: print(hex(f['start']), f['size'], f['name'][-110:])
