# ocmp.py OBJ|SO SYMSUB ORIGADDR [minhunk] : normalized diff of a function in a .o (function-sections) or .so vs orig window
import sys,types,subprocess,re,difflib
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
BIN=Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin'
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def norm(s,reloc,iscall):
    s=re.sub(r'\s+',' ',s.strip());s=re.sub(r' <[^>]*>','',s)
    if s.startswith('call') and iscall: s='call F'
    if reloc and s.startswith('lddw'): s=re.sub(r', 0x[0-9a-f]+$',', R',s)
    s=re.sub(r'([+-]0x[0-9a-f]+)$',lambda q:'J' if s.startswith('j') else q.group(1),s)
    return s
def orig_ins(a):
    o=m.Elf(ORIG);z=next(x for x in sorted(o.entries+[o.hi]) if x>a)
    out=subprocess.run([str(BIN/'llvm-objdump'),'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(ORIG)],capture_output=True,text=True).stdout
    res=[]
    for l in out.splitlines():
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if not mm: continue
        at=int(mm.group(1),16); res.append(norm(mm.group(2),at in o.relocations,at in o.calls))
    return res
def obj_ins(path,sub):
    st=subprocess.run([str(BIN/'llvm-readelf'),'-sW',path],capture_output=True,text=True).stdout.splitlines()
    cands=[l.split() for l in st if sub in l and ' FUNC ' in l and 'closure' not in l]
    f=cands[0]; sym=f[7]
    out=subprocess.run([str(BIN/'llvm-objdump'),'-d','-r','--no-show-raw-insn',f'--section=.text.{sym}',path],capture_output=True,text=True).stdout.splitlines()
    rows=[]
    for l in out:
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if not mm: continue
        if mm.group(2).startswith('R_'):
            if rows: rows[-1][1]=True
            continue
        rows.append([mm.group(2),False])
    res=[]
    for s,r in rows:
        s2=s.strip()
        res.append(norm(s2, r, s2.startswith('call')))
    return res
def so_ins(path,sub):
    c=m.Elf(Path(path));f=[f for f in c.funcs if sub in f['name'] and 'closure' not in f['name']][0]
    out=subprocess.run([str(BIN/'llvm-objdump'),'-d','--no-show-raw-insn',f"--start-address={f['start']}",f"--stop-address={f['start']+f['size']}",path],capture_output=True,text=True).stdout
    res=[]
    for l in out.splitlines():
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if not mm: continue
        at=int(mm.group(1),16); res.append(norm(mm.group(2),at in c.relocations,at in c.calls))
    return res
if __name__=='__main__':
    path,sub,oa=sys.argv[1],sys.argv[2],int(sys.argv[3],16)
    B=obj_ins(path,sub) if path.endswith('.o') else so_ins(path,sub)
    A=orig_ins(oa)
    sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
    eq=sum(i2-i1 for t,i1,i2,j1,j2 in sm.get_opcodes() if t=='equal')
    print(f'orig {len(A)}i cand {len(B)}i equal {eq} ratio {sm.ratio():.4f}')
    if len(sys.argv)>4:
        for t,i1,i2,j1,j2 in sm.get_opcodes():
            if t!='equal' and (i2-i1)+(j2-j1)>=int(sys.argv[4]): print(f'{t:7s} o[{i1}:{i2}] c[{j1}:{j2}] {i2-i1}/{j2-j1}')
