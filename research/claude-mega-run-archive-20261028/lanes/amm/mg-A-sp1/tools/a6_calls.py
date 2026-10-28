import sys,json,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
rows=json.load(open('/Users/shawwalters/amm100-run/lanes/mg-A-sp1/out-base-rows.json'));names={int(r['original'],16):(r['match'] or '?'+r['original']) for r in rows}
which=sys.argv[1]
if which=='orig':
    e=m.Elf(ORIG);a=int(sys.argv[2],16);z=next(x for x in e.entries+[e.hi] if x>a)
    nm=lambda t:names.get(t,hex(t))
else:
    e=m.Elf(Path(sys.argv[2]));f=[f for f in e.funcs if sys.argv[3] in f['name']][0];a=f['start'];z=a+f['size']
    cn={f['start']:f['name'] for f in e.funcs};nm=lambda t:cn.get(t,hex(t))
import re
def short(n):
    n=re.sub(r'17h[0-9a-f]{16}E$','',n);return n[-90:]
for at,t in sorted(e.calls.items()):
    if a<=at<z: print(hex(at-a),short(nm(t)))
for at,r in sorted(e.relocations.items()):
    if a<=at<z and r['type']==10: print(hex(at-a),'SYSCALL',r['symbol'])
