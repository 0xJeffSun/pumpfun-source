#!/usr/bin/env python3
"""cfg.py orig <start> | obj <o> <symregex> : basic blocks: idx start(+off) ninsn calls -> succs (by block idx)."""
import sys,re,subprocess,struct,json,bisect
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
from score import original_windows
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L24/inventory.json'))['windows']
ks=sorted(int(x) for x in inv)
ALIAS={'0x3cd50':'prepare_bc','0x14910':'admit'}
def oname(t):
    k=ks[bisect.bisect_right(ks,t)-1]; v=inv[str(k)]
    n=demangle(v['symbols'][0]) if v['symbols'] else hex(k)
    n=re.sub(r'::h[0-9a-f]{16}$','',n) if k==t else f'{hex(k)}+{t-k:#x}'
    return ALIAS.get(n,n)
def short(n): return re.sub(r'^(_<)?([A-Za-z_0-9]+::)*','',n).replace(' as core::convert::From<','From<')[:22]
def decode_orig(st):
    w=next(x for x in original_windows() if x['start']==st); raw=w['raw']; out=[]; i=0
    while i<len(raw):
        op=raw[i]; regs=raw[i+1]; off=struct.unpack_from('<h',raw,i+2)[0]; imm=struct.unpack_from('<i',raw,i+4)[0]
        pc=i//8; n=2 if op==0x18 else 1
        if op==0x85: out.append((pc,'call','syscall' if imm==-1 else short(oname(st+i+8+imm*8)),None))
        elif op==0x95: out.append((pc,'exit',None,None))
        elif op==0x05: out.append((pc,'ja',None,pc+1+off))
        elif (op&7)==5 and op not in (0x85,0x95,0x05): out.append((pc,'jcc',None,pc+1+off))
        else: out.append((pc,'op',None,None))
        if n==2: out.append((pc+1,'cont',None,None))
        i+=16 if op==0x18 else 8
    return out
def decode_obj(o,rx):
    t=subprocess.check_output([OD,'-t',o],text=True)
    for line in t.splitlines():
        m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
        if m and re.search(rx,m.group(4)): sec=m.group(2)
    d=subprocess.check_output([OD,'-dr','--no-show-raw-insn','-j',sec,o],text=True)
    out=[]; base=None
    for line in d.splitlines():
        m=re.match(r'^\s+([0-9a-f]+):\s+(\S+)\s*(.*)$',line)
        if m and not m.group(2).startswith('R_'):
            a=int(m.group(1),16)
            if base is None: base=a
            pc=(a-base)//8; mn=m.group(2); args=re.sub(r'\s*<[^>]*>','',m.group(3))
            if mn=='call': out.append((pc,'call','?',None))
            elif mn=='exit': out.append((pc,'exit',None,None))
            elif mn=='ja': out.append((pc,'ja',None,pc+1+int(args,16) if not args.startswith('-') else pc+1-int(args[1:],16)))
            elif mn.startswith('j'):
                x=args.split(',')[-1].strip(); v=int(x[1:],16)*(1 if x[0]=='+' else -1); out.append((pc,'jcc',None,pc+1+v))
            else: out.append((pc,'op',None,None))
            if mn=='lddw': out.append((pc+1,'cont',None,None))
            continue
        m=re.match(r'^\s+[0-9a-f]+:\s+R_\w+\s+(\S+)',line)
        if m and out and out[-1][1]=='call':
            n=re.sub(r'::h[0-9a-f]{16}$','',demangle(m.group(1))); out[-1]=(out[-1][0],'call','syscall' if n.startswith('sol_') or n=='abort' else short(n),None)
    return out
def blocks(ins):
    lead={0}
    for pc,k,c,t in ins:
        if k in('ja','jcc','exit'): lead.add(pc+1)
        if t is not None: lead.add(t)
    lead=sorted(x for x in lead if x<=ins[-1][0])
    idx={p:i for i,p in enumerate(lead)}
    res=[]
    for bi,s in enumerate(lead):
        e=lead[bi+1] if bi+1<len(lead) else ins[-1][0]+1
        body=[x for x in ins if s<=x[0]<e and x[1]!='cont']
        calls=[x[2] for x in body if x[1]=='call']
        last=body[-1] if body else None; succ=[]
        if last and last[1]=='jcc': succ=[idx.get(last[3],'?'),bi+1]
        elif last and last[1]=='ja': succ=[idx.get(last[3],'?')]
        elif last and last[1]=='exit': succ=['RET']
        else: succ=[bi+1]
        res.append((bi,s,len([x for x in ins if s<=x[0]<e]),calls,succ))
    return res
if sys.argv[1]=='orig': ins=decode_orig(int(sys.argv[2],16))
else: ins=decode_obj(sys.argv[2],sys.argv[3])
for bi,s,n,calls,succ in blocks(ins):
    print(f'{bi:3d} @{s:4d} n{n:3d} {",".join(calls)[:70]:70s} -> {succ}')
