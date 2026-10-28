# ccalls.py SO SYMSUB : list call targets (names) of a cand function in order
import sys,types,json
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
e=m.Elf(Path(sys.argv[1]));f=[f for f in e.funcs if sys.argv[2] in f['name']][0]
nm={g['start']:g['name'] for g in e.funcs}
skip=('PumpAmmError4name','AnchorError','to_string','Display','unwrap_failed','drop_in_place')
for at,t in sorted(e.calls.items()):
    if f['start']<=at<f['start']+f['size']:
        n=nm.get(t,hex(t)).split('17h')[0][-60:]
        if not any(s in n for s in skip): print(hex(at-f['start']),n)
