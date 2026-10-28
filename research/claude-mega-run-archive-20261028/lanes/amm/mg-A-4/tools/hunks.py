# hunks.py SO ORIGADDR NAME_SUBSTR : summary of normalized diff hunks (orig idx range, cand idx range, sizes)
import sys,types,subprocess,re,difflib
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
        at=int(mm.group(1),16);s=re.sub(r'\s+',' ',mm.group(2).strip());s=re.sub(r' <[^>]*>','',s)
        if s.startswith('call') and at in e.calls: s='call F'
        if at in e.relocations and s.startswith('lddw'): s=re.sub(r', 0x[0-9a-f]+$',', R',s)
        s=re.sub(r'([+-]0x[0-9a-f]+)$',lambda q:'J' if s.startswith('j') else q.group(1),s)
        res.append((at-a,s))
    return res
o=m.Elf(ORIG);a=int(sys.argv[2],16);z=next(x for x in sorted(o.entries+[o.hi]) if x>a)
c=m.Elf(Path(sys.argv[1]));f=[f for f in c.funcs if sys.argv[3] in f['name'] and 'closure' not in f['name']][0]
A=ins(ORIG,o,a,z);B=ins(sys.argv[1],c,f['start'],f['start']+f['size'])
sm=difflib.SequenceMatcher(None,[x for _,x in A],[x for _,x in B],autojunk=False)
eq=sum(i2-i1 for t,i1,i2,j1,j2 in sm.get_opcodes() if t=='equal')
print(f'orig {len(A)}i cand {len(B)}i equal {eq} ratio {sm.ratio():.4f}')
if len(sys.argv)>4:
    for t,i1,i2,j1,j2 in sm.get_opcodes():
        if t!='equal' and (i2-i1)+(j2-j1)>=int(sys.argv[4]): print(f'{t:7s} o[{i1}:{i2}] @{A[i1][0] if i1<len(A) else -1:x} c[{j1}:{j2}] @{B[j1][0] if j1<len(B) else -1:x}  {i2-i1}/{j2-j1}')
