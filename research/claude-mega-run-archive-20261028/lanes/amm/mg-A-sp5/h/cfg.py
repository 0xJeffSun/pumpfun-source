# cfg.py orig ADDR | obj OBJ SYMSUB  -> compact block summary (block id, size, landmark imms, terminator)
import sys,subprocess,re,os,types,pathlib
O=os.path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
S=os.path.expanduser('~/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so')
def lines_orig(a):
    T=pathlib.Path.home()/'amm100-run/shared/tools'
    m=types.ModuleType('e');pp=T/'elf_reader_src.py';m.__file__=str(pp);exec(compile(pp.read_bytes(),str(pp),'exec'),m.__dict__)
    E=m.Elf(pathlib.Path(S)).entries;a=int(a,16);z=min(e for e in E if e>a)
    out=subprocess.run([O,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',S],capture_output=True,text=True).stdout
    return [(int(mm.group(1),16),mm.group(2)) for mm in (re.match(r'\s*([0-9a-f]+):\s+(.*)',l) for l in out.splitlines()) if mm]
def lines_obj(obj,sub):
    out=subprocess.run([O,'-d','--no-show-raw-insn',obj],capture_output=True,text=True).stdout
    res=[];keep=False
    for l in out.splitlines():
        mm=re.match(r'^[0-9a-f]+ <(.*)>:',l)
        if mm and not mm.group(1).startswith('LBB'): keep=sub in mm.group(1);continue
        mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if mm and keep: res.append((int(mm.group(1),16),mm.group(2)))
    return res
def summarize(L):
    if not L: print('none');return
    base=L[0][0];idx={a:i for i,(a,_) in enumerate(L)}
    tg=set([0])
    for i,(a,t) in enumerate(L):
        t=re.sub(r'\s+',' ',t.strip());m=re.match(r'(j\w+) .*?([+-]\d+|0x[0-9a-f]+)$',t.split(' <')[0])
        if t.startswith('j'):
            off=int(t.split(' <')[0].split(',')[-1].split()[-1],0) if ',' in t else int(t.split()[1],0)
            tg.add(i+1+off); tg.add(i+1)
        if t.startswith('exit'): tg.add(i+1)
    starts=sorted(x for x in tg if x<len(L));bid={s:k for k,s in enumerate(starts)}
    for k,s in enumerate(starts):
        e=starts[k+1] if k+1<len(starts) else len(L)
        ins=[re.sub(r'\s+',' ',L[i][1].strip()).split(' <')[0] for i in range(s,e)]
        lm=[]
        for x in ins:
            for c in re.findall(r'(?<![\[\w+-])(0x[0-9a-f]+|\d+)$',x):
                v=int(c,0)
                if v not in (0,1) and not x.startswith(('j','call','stx','ldx')): lm.append(hex(v))
            if x.startswith('call'): lm.append('CALL')
        last=ins[-1];term=''
        if last.startswith('j'):
            off=int(last.split(',')[-1].strip(),0) if ',' in last else int(last.split()[1],0)
            tgt=s+(e-s)+off
            term=f"{last.split()[0]}->B{bid.get(tgt,'?')}"
            if last.split()[0]!='ja': term+=f' (cond {",".join(last.split()[1:-1]).strip(",")})'
        elif last.startswith('exit'): term='EXIT'
        else: term='fall'
        print(f'B{k:<3}@{s:<4} n={e-s:<3} {term:<32} {" ".join(lm[:8])}')
if sys.argv[1]=='orig': summarize(lines_orig(sys.argv[2]))
else: summarize(lines_obj(sys.argv[2],sys.argv[3]))
