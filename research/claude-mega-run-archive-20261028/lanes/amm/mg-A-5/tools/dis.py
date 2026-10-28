#!/usr/bin/env python3
"""dis.py orig ADDR            -> disassemble original window at ADDR (hex)
   dis.py cand SO NAME_SUBSTR  -> disassemble candidate function(s) whose symbol contains NAME_SUBSTR
   dis.py diff SO ADDR NAME    -> side-by-side normalized diff original window vs candidate function
Call targets are annotated with known names (frontier matches for original)."""
import sys,subprocess,json,re,types,difflib
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools';R=T.parent
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def onames():
    rows=json.load(open(Path.home()/'amm100-run/lanes/mg-base733/out/rows.json'));return {int(r['original'],16):(r['match'] or '?').split('17h')[0][-60:] for r in rows}
def lines(path,a,z,names):
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout
    res=[]
    for l in out.splitlines():
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if not mm:continue
        at=int(mm.group(1),16);ins=mm.group(2).strip()
        c=re.match(r'call (-?0x[0-9a-f]+|-?\d+)$',ins)
        if c and ins.strip()!='call -0x1':
            t=at+8+int(c.group(1),0)*8;ins=f'call <{names.get(t,hex(t))}>'
        elif ins.startswith('call'):ins=ins
        res.append((at-a,re.sub(r'\s+',' ',ins)))
    return res
def cand(so,sub):
    e=m.Elf(Path(so));fs=[f for f in e.funcs if sub in f['name']];return e,fs
def cnames(e):return {f['start']:f['name'].split('17h')[0][-60:] for f in e.funcs}
if sys.argv[1]=='orig':
    o=m.Elf(ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a)
    for off,i in lines(ORIG,a,z,onames()):print(f'{off:5x} {i}')
elif sys.argv[1]=='cand':
    e,fs=cand(sys.argv[2],sys.argv[3])
    for f in fs:
        print('==',f['name'],f['size'],hex(f['start']))
        for off,i in lines(sys.argv[2],f['start'],f['start']+f['size'],cnames(e)):print(f'{off:5x} {i}')
elif sys.argv[1]=='diff':
    o=m.Elf(ORIG);a=int(sys.argv[3],16);z=next(x for x in o.entries+[o.hi] if x>a)
    e,fs=cand(sys.argv[2],sys.argv[4]);f=fs[0]
    A=[i for _,i in lines(ORIG,a,z,onames())];B=[i for _,i in lines(sys.argv[2],f['start'],f['start']+f['size'],cnames(e))]
    print(f'orig {z-a} bytes, cand {f["size"]} bytes ({f["name"]})')
    for l in difflib.unified_diff(A,B,'orig','cand',n=2,lineterm=''):print(l)
