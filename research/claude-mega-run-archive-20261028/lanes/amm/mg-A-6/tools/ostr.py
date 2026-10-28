# ostr.py ADDR [SO] : list lddw immediates in window/func at ADDR with string content (len from next mov64 r2/r3 imm)
import sys,subprocess,re,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
so=Path(sys.argv[2]) if len(sys.argv)>2 else ORIG
e=m.Elf(so)
if so==ORIG:
    a=int(sys.argv[1],16);z=next(x for x in e.entries+[e.hi] if x>a)
else:
    f=[f for f in e.funcs if sys.argv[1] in f['name']][0];a=f['start'];z=a+f['size']
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(so)],capture_output=True,text=True).stdout
ins=[(int(mm.group(1),16),mm.group(2).strip()) for mm in (re.match(r'\s*([0-9a-f]+):\s+(.*)',l) for l in out.splitlines()) if mm]
import struct
def rd(addr,n):
    for s in e.sections if hasattr(e,'sections') else []:
        pass
    # fallback: map vaddr->file offset by program headers using raw bytes
    b=e.b
    # assume vaddr == file offset for sbf .so (common)
    return b[addr:addr+n]
for i,(at,s) in enumerate(ins):
    mm=re.match(r'lddw (r\d+), (0x[0-9a-f]+)',s)
    if mm:
        v=int(mm.group(2),16); ln=None
        for _,t in ins[i+1:i+4]:
            m2=re.match(r'mov64 r[23], (0x[0-9a-f]+)$',t)
            if m2: ln=int(m2.group(1),16);break
        txt=rd(v,ln or 24)
        print(hex(at-a),mm.group(1),hex(v),ln,repr(txt[:80]))
