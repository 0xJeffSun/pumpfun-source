#!/usr/bin/env python3
# ndiff.py SO ORIGADDR NAME_SUBSTR [ctx] : normalized instruction diff using measure's normalization
import sys,types,subprocess,re,difflib,json
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def ins(path,e,a,z):
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout
    res=[]
    for l in out.splitlines():
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if not mm:continue
        at=int(mm.group(1),16);s=re.sub(r'\s+',' ',mm.group(2).strip())
        s=re.sub(r' <[^>]*>','',s)
        if s.startswith('call') and at in e.calls: s='call F'
        if at in e.relocations and s.startswith('lddw'): s=re.sub(r', 0x[0-9a-f]+$',', R',s)
        res.append(s)
    return res
o=m.Elf(ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a)
c=m.Elf(Path(sys.argv[1]));fs=[f for f in c.funcs if sys.argv[3] in f['name']]
n=int(sys.argv[4]) if len(sys.argv)>4 else 2
A=ins(ORIG,o,a,z)
best=None
for f in fs:
    B=ins(sys.argv[1],c,f['start'],f['start']+f['size'])
    r=difflib.SequenceMatcher(None,A,B,autojunk=False).ratio()
    if best is None or r>best[0]: best=(r,f,B)
r,f,B=best
print(f'orig {z-a}B {len(A)}i, cand {f["size"]}B {len(B)}i ratio {r:.4f} {f["name"][-60:]}')
for l in difflib.unified_diff(A,B,'orig','cand',n=n,lineterm=''):print(l)
