# calltgt.py ADDR(window) : list call targets of an orig window with frontier match names
import sys,types,json
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
rows={int(r['original'],16):r for r in json.load(open(Path.home()/'amm100-run/lanes/mg-A-3/out/base744-rows.json'))}
o=m.Elf(ORIG);a=int(sys.argv[1],16);z=next(x for x in sorted(o.entries+[o.hi]) if x>a)
for at,t in sorted(o.calls.items()):
    if a<=at<z:
        r=rows.get(t);print(hex(at-a),hex(t),(r['bytes'] if r else '?'),((r['match'] or 'UNMATCHED').split('17h')[0][-70:] if r else '-'))
