#!/usr/bin/env python3
"""ocalls.py ADDR [SO SUB] : list calls (offset, target name) in orig window ADDR, or in cand function SUB of SO"""
import sys,types,json,bisect
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
rows=json.load(open('/Users/shawwalters/amm100-run/lanes/mg-A-sp2/base/base756w-rows.json'))
nm={int(r['original'],16):(r['match'] or 'UNMATCHED@'+r['original']) for r in rows}
def short(n): 
    n=n.split('17h')[0]; return n[-70:]
if len(sys.argv)==2:
    o=m.Elf(Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so')
    a=int(sys.argv[1],16); z=next(x for x in o.entries+[o.hi] if x>a)
    for at,t in sorted(o.calls.items()):
        if a<=at<z: print(f'{at-a:5x}', short(nm.get(t,hex(t))))
else:
    e=m.Elf(Path(sys.argv[2])); f=[f for f in e.funcs if sys.argv[3] in f['name']][0]
    names={g['start']:g['name'] for g in e.funcs}
    for at,t in sorted(e.calls.items()):
        if f['start']<=at<f['start']+f['size']: print(f'{at-f["start"]:5x}', short(names.get(t,hex(t))))
