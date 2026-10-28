# sbs.py SO ORIGADDR NAME OI0 OI1 : print normalized diff hunks (with insns) whose orig index lies in [OI0,OI1)
import sys,types,subprocess,re,difflib
from pathlib import Path
sys.argv_saved=list(sys.argv)
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
so,oa,nm=sys.argv[1],int(sys.argv[2],16),sys.argv[3]
o0=int(sys.argv[4]) if len(sys.argv)>4 else 0; o1=int(sys.argv[5]) if len(sys.argv)>5 else 10**9
o=m.Elf(ORIG);z=next(x for x in sorted(o.entries+[o.hi]) if x>oa)
c=m.Elf(Path(so));f=[f for f in c.funcs if nm in f['name'] and 'closure' not in f['name']][0]
A=ins(ORIG,o,oa,z);B=ins(so,c,f['start'],f['start']+f['size'])
sm=difflib.SequenceMatcher(None,[x for _,x in A],[x for _,x in B],autojunk=False)
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t=='equal' or i2<o0 or i1>=o1: continue
    print(f'--{t} o[{i1}:{i2}] c[{j1}:{j2}]')
    for k in range(max(i2-i1,j2-j1)):
        a=A[i1+k][1] if i1+k<i2 else ''; b=B[j1+k][1] if j1+k<j2 else ''
        print(f'   {a:38s} | {b}')
