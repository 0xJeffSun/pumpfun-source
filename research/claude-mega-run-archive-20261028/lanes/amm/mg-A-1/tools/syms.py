#!/usr/bin/env python3
"""syms.py SO SUBSTR... -> list candidate funcs (start,size,name) containing any substring"""
import sys,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
e=m.Elf(Path(sys.argv[1]))
for f in e.funcs:
    if any(s in f['name'] for s in sys.argv[2:]): print(hex(f['start']),f['size'],f['name'][:150])
