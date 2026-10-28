# irs2.py IN.ll FUNCSUB ORIGADDR [greedy_rounds] : single-process block-move search (moves b>a); greedy
import sys,subprocess,re,os,difflib,types,pathlib
src,sub,oa=sys.argv[1:4]
H=os.path.dirname(os.path.abspath(__file__)); PT=os.path.expanduser('~/.cache/solana/v1.44/platform-tools')
OBJ=os.path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
S=os.path.expanduser('~/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so')
T=pathlib.Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');pp=T/'elf_reader_src.py';m.__file__=str(pp);exec(compile(pp.read_bytes(),str(pp),'exec'),m.__dict__)
E=m.Elf(pathlib.Path(S)).entries;a=int(oa,16);z=min(e for e in E if e>a)
def norm(ins):
    ins=re.sub(r'\s+',' ',ins.strip());ins=re.sub(r' <[^>]*>','',ins)
    if ins.startswith('call'): return 'call'
    if ins.startswith('lddw'): return ins.split(',')[0]+',K'
    return ins
def dis(path,a=None,z=None,fsub=None):
    args=[OBJ,'-d','--no-show-raw-insn']+([f'--start-address={a}',f'--stop-address={z}'] if a is not None else [])+[path]
    out=subprocess.run(args,capture_output=True,text=True).stdout;res=[];cur=None;keep=a is not None
    for l in out.splitlines():
        mm=re.match(r'^[0-9a-f]+ <(.*)>:',l)
        if mm and not mm.group(1).startswith('LBB'): keep=(a is not None) or (fsub in mm.group(1));continue
        mm=re.match(r'\s*[0-9a-f]+:\s+(.*)',l)
        if mm and keep: res.append(norm(mm.group(1)))
    return res

# irprof.py IN.ll FUNCSUB : try branch_weights on each conditional branch (both directions); report best
A=dis(S,a,z)
txt=open(src).read();i=txt.index('define')
while sub not in txt[i:txt.index('\n',i)]: i=txt.index('\ndefine',i)+1
j=txt.index('\n}\n',i);head,body,tail=txt[:i],txt[i:j],txt[j:]
tmp='prof%d'%os.getpid()
def score(b,extra=''):
    open(tmp+'.ll','w').write(head+b+tail+extra)
    r=subprocess.run([PT+'/llvm/bin/llc','-O3','-filetype=obj','-relocation-model=pic','-function-sections','-mattr=+store-imm,+jmp-ext',tmp+'.ll','-o',tmp+'.o'],capture_output=True,text=True)
    if r.returncode: print(r.stderr[:200]); return (9999,0)
    B=dis(tmp+'.o',fsub=sub)
    return sum(1 for l in difflib.unified_diff(A,B,n=0,lineterm='') if l[:1] in '+-' and not l.startswith(('+++','---'))),len(B)
base=score(body);print('base',base)
lines=body.split('\n');res=[]
for k,l in enumerate(lines):
    if re.match(r'\s+br i1 ',l) and '!prof' not in l:
        for w in ['1, i32 2000','2000, i32 1']:
            nl=lines[:];nl[k]=l+', !prof !99999'
            s=score('\n'.join(nl),'\n!99999 = !{!"branch_weights", i32 %s}\n'%w)
            res.append((s,k,w,l.strip()[:60]))
res.sort();[print(r) for r in res[:8]]
os.remove(tmp+'.ll');os.remove(tmp+'.o')
