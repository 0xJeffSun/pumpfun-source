import sys,subprocess,json,re,types,difflib
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def onames():
    rows=json.load(open(Path.home()/'amm100-run/lanes/mg-base733/out/rows.json'));return {int(r['original'],16):(r['match'] or '?').split('17h')[0][-50:] for r in rows}
def lines(path,a,z,names):
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout
    res=[]
    for l in out.splitlines():
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if not mm:continue
        at=int(mm.group(1),16);ins=re.sub(r'\s+',' ',mm.group(2).strip())
        c=re.match(r'call (-?0x[0-9a-f]+|-?\d+)$',ins)
        if c:
            imm=int(c.group(1),0)
            if imm==-1: ins='call EXT'
            else:
                t=at+8+imm*8;ins=f'call <{names.get(t,hex(t)) if names.get(t,"?")!="?" else "?"+hex(t)}>'
        ins=re.sub(r"^(j[a-z]+ .*?) <[^>]*>$",r"\1",ins)
        ins=re.sub(r'lddw (r\d+), 0x[0-9a-f]+',r'lddw \1, K',ins)
        res.append((at-a,ins))
    return res
def cnames(e):return {f['start']:f['name'].split('17h')[0][-50:] for f in e.funcs}
mode=sys.argv[1]
o=m.Elf(ORIG)
def ow(a):
    z=next(x for x in o.entries+[o.hi] if x>a); return lines(ORIG,a,z,onames())
def cf(so,sub,idx=0):
    e=m.Elf(Path(so));fs=[f for f in e.funcs if sub in f['name']]
    f=fs[idx]; return f,lines(so,f['start'],f['start']+f['size'],cnames(e))
if mode=='orig':
    for off,i in ow(int(sys.argv[2],16)):print(f'{off:5x} {i}')
elif mode=='cand':
    f,L=cf(sys.argv[2],sys.argv[3],int(sys.argv[4]) if len(sys.argv)>4 else 0);print('==',f['name'],f['size'])
    for off,i in L:print(f'{off:5x} {i}')
elif mode=='diff':
    A=[i for _,i in ow(int(sys.argv[3],16))]
    f,L=cf(sys.argv[2],sys.argv[4],int(sys.argv[5]) if len(sys.argv)>5 else 0);B=[i for _,i in L]
    print(f'orig {len(A)*8}, cand {f["size"]} ({f["name"][:120]})')
    for l in difflib.unified_diff(A,B,'orig','cand',n=int(sys.argv[6]) if len(sys.argv)>6 else 2,lineterm=''):print(l)
elif mode in ('score','sdiff'):
    def ab(i):
        i=re.sub(r'r\d+','R',i); i=re.sub(r'^call <.*>$','call',i); i=re.sub(r'^add64 R, -0x[0-9a-f]+$','add64 R, -S',i); i=re.sub(r'\[R - 0x[0-9a-f]+\]','[S]',i); i=re.sub(r'([+-])0x[0-9a-f]+$',r'\1J',i) if i.startswith('j') else i
        return i
    A=[ab(i) for _,i in ow(int(sys.argv[3],16))]
    f,L=cf(sys.argv[2],sys.argv[4],0);B=[ab(i) for _,i in L]
    sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
    d=sum(max(i2-i1,j2-j1) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal')
    if mode=='score': print(f'{sys.argv[3]} orig={len(A)} cand={len(B)} shape_diff={d}')
    else:
        for l in difflib.unified_diff(A,B,'orig','cand',n=int(sys.argv[5]) if len(sys.argv)>5 else 2,lineterm=''):print(l)
