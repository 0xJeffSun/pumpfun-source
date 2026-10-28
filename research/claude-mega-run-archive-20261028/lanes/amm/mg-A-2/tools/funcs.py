# funcs.py SO SUBSTR... -> list candidate functions whose name contains any substr (size, start, name)
import sys,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
e=m.Elf(Path(sys.argv[1]))
for f in e.funcs:
    if any(s in f['name'] for s in sys.argv[2:]): print(f['size'], hex(f['start']), f['name'][:150])
