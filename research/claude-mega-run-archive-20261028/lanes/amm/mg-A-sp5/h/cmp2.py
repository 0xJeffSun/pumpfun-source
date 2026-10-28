# cmp2.py OBJ SYMSUB ORIGADDR [-v]: difflines, multiset diff, reg-agnostic multiset diff, insn counts
import sys,subprocess,re,os,difflib,collections,types,pathlib
O=os.path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
S=os.path.expanduser('~/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so')
def norm(ins):
    ins=re.sub(r'\s+',' ',ins.strip());ins=re.sub(r' <[^>]*>','',ins)
    if ins.startswith('call'): return 'call'
    if ins.startswith('lddw'): return ins.split(',')[0]+',K'
    return ins
_E={}
def orig(a):
    if 'E' not in _E:
        T=pathlib.Path.home()/'amm100-run/shared/tools'
        m=types.ModuleType('e');pp=T/'elf_reader_src.py';m.__file__=str(pp);exec(compile(pp.read_bytes(),str(pp),'exec'),m.__dict__)
        _E['E']=m.Elf(pathlib.Path(S)).entries
    E=_E['E'];a=int(a,16);z=min(e for e in E if e>a)
    out=subprocess.run([O,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',S],capture_output=True,text=True).stdout
    return [norm(m.group(1)) for m in (re.match(r'\s*[0-9a-f]+:\s+(.*)',l) for l in out.splitlines()) if m]
def objfun(obj,sub):
    out=subprocess.run([O,'-d','--no-show-raw-insn',obj],capture_output=True,text=True).stdout
    funcs={};cur=None
    for l in out.splitlines():
        m=re.match(r'^[0-9a-f]+ <(.*)>:',l)
        if m and not m.group(1).startswith('LBB'): cur=m.group(1);funcs[cur]=[];continue
        if m: continue
        m=re.match(r'\s*[0-9a-f]+:\s+(.*)',l)
        if m and cur: funcs[cur].append(norm(m.group(1)))
    return {k:v for k,v in funcs.items() if sub in k}
def noreg(x):
    if x.startswith('j'): x=re.sub(r'[+-](0x[0-9a-f]+|\d+)$','J',x)
    return re.sub(r'\br\d+\b','r',x)
def score(A,B):
    d=sum(1 for l in difflib.unified_diff(A,B,n=0,lineterm='') if l[:1] in '+-' and not l.startswith(('+++','---')))
    ca,cb=collections.Counter(A),collections.Counter(B);ms=sum(((ca-cb)+(cb-ca)).values())
    na,nb=collections.Counter(map(noreg,A)),collections.Counter(map(noreg,B));mr=sum(((na-nb)+(nb-na)).values())
    return d,ms,mr
if __name__=='__main__':
    A=orig(sys.argv[3])
    for k,B in objfun(sys.argv[1],sys.argv[2]).items():
        d,ms,mr=score(A,B)
        print(f'{k[:60]} orig={len(A)} cand={len(B)} diff={d} ms={ms} msnr={mr}')
        if '-m' in sys.argv:
            na,nb=collections.Counter(map(noreg,A)),collections.Counter(map(noreg,B))
            print(' orig-only:',dict(na-nb));print(' cand-only:',dict(nb-na))
        if '-v' in sys.argv:
            print('\n'.join([l for l in difflib.unified_diff(A,B,n=1,lineterm='')][2:][:int(os.environ.get('NV','60'))]))
