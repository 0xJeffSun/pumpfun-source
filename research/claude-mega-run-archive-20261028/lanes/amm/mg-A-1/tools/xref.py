#!/usr/bin/env python3
"""xref.py orig|SO ADDR...  -> list callers (window start) of each target address"""
import sys,types,bisect
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
src=sys.argv[1]; e=m.Elf(ORIG if src=='orig' else Path(src))
if src=='orig':
    starts=sorted(e.entries); names={}
else:
    starts=sorted(f['start'] for f in e.funcs); names={f['start']:f['name'].split('17h')[0][-50:] for f in e.funcs}
for t in sys.argv[2:]:
    t=int(t,16) if t.startswith('0x') else None
    if t is None: continue
    cs=[a for a,tt in e.calls.items() if tt==t]
    print(hex(t),'callers:',len(cs))
    for a in sorted(cs):
        i=bisect.bisect_right(starts,a)-1; s=starts[i]
        print('  ',hex(a),'in',hex(s),names.get(s,''))
