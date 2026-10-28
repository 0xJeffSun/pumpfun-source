# jto.py ADDR IMM : in orig window ADDR, find block containing 'stw ..., IMM' and print the jumps targeting that block (with 6 preceding insns)
import sys,subprocess,re,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
e=m.Elf(ORIG);a=int(sys.argv[1],16);z=next(x for x in e.entries+[e.hi] if x>a)
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(ORIG)],capture_output=True,text=True).stdout
ins=[(int(mm.group(1),16)-a,re.sub(r'\s*<[^>]*>','',re.sub(r'\s+',' ',mm.group(2)).strip())) for mm in (re.match(r'\s*([0-9a-f]+):\s+(.*)',l) for l in out.splitlines()) if mm]
off={o:i for i,(o,_) in enumerate(ins)}
def tgt(i):
    o,s=ins[i];mm=re.match(r'j\w+ .*?([+-]0x[0-9a-f]+)$',s)
    if not mm: return None
    nxt=ins[i+1][0] if i+1<len(ins) else o+8
    return nxt+int(mm.group(1),16)*8
imm=sys.argv[2]
k=next(i for i,(o,s) in enumerate(ins) if re.match(r'stw \[r10 - 0x[0-9a-f]+\], '+imm+'$',s))
# block start: walk back to after a terminator (ja/exit/jcc) or a jump target
targets={tgt(i) for i in range(len(ins)) if tgt(i) is not None}
b=k
while b>0 and not (ins[b-1][1].startswith(('ja ','exit')) or ins[b][0] in targets): b-=1
print('block start',hex(ins[b][0]),'error insn',hex(ins[k][0]))
for i in range(len(ins)):
    if tgt(i)==ins[b][0]:
        print('--- from',hex(ins[i][0]))
        for j in range(max(0,i-6),i+1): print('  ',hex(ins[j][0]),ins[j][1])
