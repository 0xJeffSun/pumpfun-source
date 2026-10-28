# errs.py ADDR|SO NAME : list (line, code) of anchor error sites: stw LINE next to stdw filelen 0x33, code = nearby stw 0x17xx
import sys,subprocess,re,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
if len(sys.argv)==2:
    so=ORIG;e=m.Elf(so);a=int(sys.argv[1],16);z=next(x for x in e.entries+[e.hi] if x>a)
else:
    so=Path(sys.argv[1]);e=m.Elf(so);f=[f for f in e.funcs if sys.argv[2] in f['name']][0];a=f['start'];z=a+f['size']
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(so)],capture_output=True,text=True).stdout
ins=[re.sub(r'\s+',' ',mm.group(2)).strip() for mm in (re.match(r'\s*([0-9a-f]+):\s+(.*)',l) for l in out.splitlines()) if mm]
res=[]
for i,s in enumerate(ins):
    mm=re.match(r'stdw \[r10 - (0x[0-9a-f]+)\], 0x33$',s)
    if not mm: continue
    off=int(mm.group(1),16);line=code=None
    for t in ins[max(0,i-8):i+8]:
        m1=re.match(r'stw \[r10 - (0x[0-9a-f]+)\], (0x[0-9a-f]+)$',t)
        if m1:
            v=int(m1.group(2),16)
            if int(m1.group(1),16)==off-8: line=v
            elif 6000<=v<6200: code=v-6000
    res.append((line,code))
print(res)
