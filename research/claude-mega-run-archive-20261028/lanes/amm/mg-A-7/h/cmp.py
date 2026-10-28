# usage: cmp.py OBJ SYMSUB ORIGADDR [-v]
import sys,subprocess,re,os,difflib
O=os.path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
S=os.path.expanduser('~/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so')
def norm(ins):
    ins=re.sub(r'\s+',' ',ins.strip())
    ins=re.sub(r' <[^>]*>','',ins)
    if ins.startswith('call') : return 'call'
    if ins.startswith('lddw'): return ins.split(',')[0]+',K'
    return ins
def objfun(obj,sub):
    out=subprocess.run([O,'-d','--no-show-raw-insn','-r',obj],capture_output=True,text=True).stdout
    funcs={};cur=None
    for l in out.splitlines():
        m=re.match(r'^[0-9a-f]+ <(.*)>:',l)
        if m and not m.group(1).startswith('LBB'): cur=m.group(1);funcs[cur]=[];continue
        if m: continue
        m=re.match(r'\s*[0-9a-f]+:\s+(.*)',l)
        if m and cur: funcs[cur].append(m.group(1))
    ks=[k for k in funcs if sub in k]
    return ks,funcs
def orig(a):
    import types,pathlib
    T=pathlib.Path.home()/'amm100-run/shared/tools'
    m=types.ModuleType('e');pp=T/'elf_reader_src.py';m.__file__=str(pp);exec(compile(pp.read_bytes(),str(pp),'exec'),m.__dict__)
    E=m.Elf(pathlib.Path(S)).entries
    a=int(a,16)
    z=min(e for e in E if e>a)
    out=subprocess.run([O,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',S],capture_output=True,text=True).stdout
    return [m.group(1) for m in (re.match(r'\s*[0-9a-f]+:\s+(.*)',l) for l in out.splitlines()) if m]
ks,funcs=objfun(sys.argv[1],sys.argv[2])
if not ks: print('NOSYM',list(funcs)[:20]);sys.exit()
A=[norm(i) for i in orig(sys.argv[3])]
for k in ks:
    B=[norm(i) for i in funcs[k] if not i.startswith('R_')]
    # relocation lines appear separately; filter
    d=[l for l in difflib.unified_diff(A,B,n=1,lineterm='') ][2:]
    nd=sum(1 for l in d if l[:1] in '+-')
    print(f'{k[:70]} orig={len(A)} cand={len(B)} insns difflines={nd}')
    if '-v' in sys.argv: print('\n'.join(d[:120]))
