# calls.py (orig ADDR | SO NAME) -> list call sites: idx-ish offset -> target (orig: window addr; cand: symbol)
import sys,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
if sys.argv[1]=='orig':
    e=m.Elf(ORIG);a=int(sys.argv[2],16);z=next(x for x in e.entries+[e.hi] if x>a);names={}
else:
    e=m.Elf(Path(sys.argv[1]));f=[f for f in e.funcs if sys.argv[2] in f['name']][0];a=f['start'];z=a+f['size']
    names={g['start']:g['name'].split('17h')[0][-50:] for g in e.funcs}
for at,t in sorted(e.calls.items()):
    if a<=at<z: print(hex(at-a), hex(t), names.get(t,''))
