# irs2.py IN.ll FUNCSUB ORIGADDR [greedy_rounds] : single-process block-move search (moves b>a); greedy
import sys,subprocess,re,os,difflib,types,pathlib
src,sub,oa=sys.argv[1:4]; rounds=int(sys.argv[4]) if len(sys.argv)>4 else 1
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
A=dis(S,a,z)
txt=open(src).read();i=txt.index('define')
while sub not in txt[i:txt.index('\n',i)]: i=txt.index('\ndefine',i)+1
j=txt.index('\n}\n',i);head,body,tail=txt[:i],txt[i:j],txt[j:];body=re.sub(r'%(\d+)\b',r'%v\1',body)
lines=body.split('\n');defl=lines[0];blocks=[];cur=None
for l in lines[1:]:
    mm=re.match(r'^([\w.$-]+):',l)
    if mm: cur=[mm.group(1),[l]];blocks.append(cur)
    elif cur is None: cur=['__entry',[l]];blocks.append(cur)
    else: cur[1].append(l)
tmp=f'{H}/irs{os.getpid()}'
def score(bl):
    open(tmp+'.ll','w').write(head+defl+'\n'+'\n'.join('\n'.join(x[1]) for x in bl)+tail)
    subprocess.run([PT+'/llvm/bin/llc','-O3','-filetype=obj','-relocation-model=pic','-function-sections','-mattr=+store-imm,+jmp-ext',tmp+'.ll','-o',tmp+'.o'],capture_output=True)
    B=dis(tmp+'.o',fsub=sub)
    return sum(1 for l in difflib.unified_diff(A,B,n=0,lineterm='') if l[:1] in '+-' and not l.startswith(('+++','---'))),len(B)
best=score(blocks);print('start',best,flush=True);hist=[]
for r in range(rounds):
    res=[]
    names=[x[0] for x in blocks]
    for b in names[1:]:
        for t in names:
            if t==b: continue
            bl=[x for x in blocks if x[0]!=b];k=[x for x in blocks if x[0]==b][0]
            idx=[x[0] for x in bl].index(t)+1;bl.insert(idx,k)
            s=score(bl);res.append((s,f'{b}>{t}',bl))
    res.sort(key=lambda x:x[0]);print('round',r,[(x[0],x[1]) for x in res[:6]],flush=True)
    if res[0][0][0]>=best[0]: break
    best=res[0][0];blocks=res[0][2];hist.append(res[0][1])
print('best',best,hist)
open(f'{H}/irs_best.ll','w').write(head+defl+'\n'+'\n'.join('\n'.join(x[1]) for x in blocks)+tail)
os.remove(tmp+'.ll');os.remove(tmp+'.o')
