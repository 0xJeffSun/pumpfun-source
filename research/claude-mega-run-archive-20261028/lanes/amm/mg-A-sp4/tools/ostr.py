# ostr.py ADDR LEN | pieces ADDR N : read rodata string / fmt pieces array from the original .so (vaddr == file offset assumed via Elf)
import sys,struct,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
o=m.Elf(Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so');b=o.b
if sys.argv[1]=='pieces':
    a=int(sys.argv[2],16)
    for k in range(int(sys.argv[3])):
        ptr,ln=struct.unpack_from('<QQ',b,a+16*k); print(k,hex(ptr),ln,repr(b[ptr:ptr+ln].decode(errors='replace')))
else:
    a=int(sys.argv[1],16);n=int(sys.argv[2],0);print(repr(b[a:a+n].decode(errors='replace')))
