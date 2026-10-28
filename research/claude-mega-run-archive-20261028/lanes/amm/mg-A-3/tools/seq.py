# seq.py orig ADDR | cand SO NAME : print ordered events: inline error lines and closure calls (with closure line)
import sys,subprocess,re,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def dis(path,a,z):
    return subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout.splitlines()
def cl_line(path,t,z):
    ln=None
    for l in dis(path,t,t+520):
        mm=re.search(r'stw \[r10 - 0xf8\], (0x[0-9a-f]+)',l)
        if mm: ln=int(mm.group(1),16)
    return ln
if sys.argv[1]=='orig':
    path=ORIG;o=m.Elf(ORIG);a=int(sys.argv[2],16);z=next(x for x in sorted(o.entries+[o.hi]) if x>a)
    sizes={x:(y-x) for x,y in zip(sorted(o.entries),sorted(o.entries)[1:])}
else:
    path=sys.argv[2];e=m.Elf(Path(path));f=[f for f in e.funcs if sys.argv[3] in f['name'] and 'closure' not in f['name']][0];a=f['start'];z=a+f['size']
    sizes={f['start']:f['size'] for f in e.funcs}
prev=None
for l in dis(path,a,z):
    mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if not mm: continue
    at=int(mm.group(1),16);ins=mm.group(2).strip()
    c=re.match(r'call (-?0x[0-9a-f]+|-?\d+)$',ins)
    if c and ins!='call -0x1':
        t=at+8+int(c.group(1),0)*8
        if sizes.get(t)==520: print(f'{at-a:6x} CLOSURE line {cl_line(path,t,0)}')
    mm2=re.search(r'stw \[r10 - 0x[0-9a-f]+\], (0x[0-9a-f]+)$',ins)
    if mm2: prev=(at,int(mm2.group(1),16))
    mm3=re.search(r'stdw \[r10 - 0x[0-9a-f]+\], (0x[0-9a-f]+)$',ins)
    if mm3 and prev and at-prev[0]<=8 and int(mm3.group(1),16)==int(sys.argv[-1],0) : print(f'{at-a:6x} inline line {prev[1]}')
