import sys,types,json,bisect
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
rows=json.load(open(T.parent/'frontier/rows.json'));names={int(r['original'],16):(r['match'] or '?') for r in rows}
e=m.Elf(ORIG);st=e.entries
for a in sys.argv[1:]:
    t=int(a,16)
    for at,tt in e.calls.items():
        if tt==t:
            s=st[bisect.bisect_right(st,at)-1];z=st[bisect.bisect_right(st,at)] if bisect.bisect_right(st,at)<len(st) else e.hi
            print(a,'<-',hex(s),z-s,names.get(s,'')[-80:])
