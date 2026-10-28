# frame.py SO ORIGADDR NAME : stack offsets used (r10-X) in orig vs cand: max, count, sizes histogram
import sys,types,subprocess,re
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def offs(path,a,z):
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout
    S={}
    for l in out.splitlines():
        for mm in re.finditer(r'\[r10 - (0x[0-9a-f]+)\]',l): S[int(mm.group(1),16)]=S.get(int(mm.group(1),16),0)+1
        for mm in re.finditer(r'mov64 r\d+, r10\s*$',l): pass
    return S
so,oa,nm=sys.argv[1],int(sys.argv[2],16),sys.argv[3]
o=m.Elf(ORIG);z=next(x for x in sorted(o.entries+[o.hi]) if x>oa)
c=m.Elf(Path(so));f=[f for f in c.funcs if nm in f['name'] and 'closure' not in f['name']][0]
A=offs(ORIG,oa,z);B=offs(so,f['start'],f['start']+f['size'])
print('orig max',hex(max(A)),'n',len(A),' cand max',hex(max(B)),'n',len(B))
if len(sys.argv)>4:
    print('orig',' '.join(f'{k:x}' for k in sorted(A)))
    print('cand',' '.join(f'{k:x}' for k in sorted(B)))
