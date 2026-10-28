#!/usr/bin/env python3
"""cfgsum.py <so> <orig_start|symregex> [inventory] [--from i] [--to j] [--all]: compact basic-block summary.
Per block: index range, field loads/stores (non-r10 bases), calls (named), ERR codes / line imm stores, cond branch + succs."""
import sys, re, json, subprocess, bisect
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
from win import demangle
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
args=[x for x in sys.argv[1:] if not x.startswith('--')]
opts={}
av=sys.argv[1:]
for i,x in enumerate(av):
    if x in('--from','--to'): opts[x]=int(av[i+1])
SHOWALL='--all' in av
so=args[0]; a=args[1]; inv=args[2] if len(args)>2 and args[2].endswith('.json') else W+'/base/L25/inventory.json'
wins=sorted(original_windows(), key=lambda w:w['start']); starts=[w['start'] for w in wins]
sc=json.load(open(inv))['windows']
def short(n):
    n=demangle(n); n=re.sub(r'::h[0-9a-f]{16}$','',n); n=n.replace('pump_recovered::','')
    n=n.replace('_<anchor_lang::error::Error as core::convert::From<','From<').replace('_<solana_account_info::AccountInfo as core::clone::Clone>::clone','AI::clone')
    return n[:70]
isorig = so.endswith('original.so')
t=subprocess.check_output([OBJ,'-t',so],text=True); syms={}; best=None
for l in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',l)
    if m:
        ad=int(m.group(1),16); syms.setdefault(ad,m.group(3))
        if not re.match(r'0x[0-9a-f]+$',a) and re.search(a,re.sub(r'::h[0-9a-f]{16}$','',demangle(m.group(3)))) and (best is None or int(m.group(2),16)>best[1]): best=(ad,int(m.group(2),16))
if re.match(r'0x[0-9a-f]+$',a):
    st=int(a,16); w=wins[starts.index(st)]; size=w['bytes']
else: st,size=best
out=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+size:#x}',so],text=True)
ins=[]
for l in out.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if m: ins.append((int(m.group(1),16),re.sub(r'\s+',' ',re.sub(r'\s+<[^>]*>','',m.group(2).strip()))))
base=ins[0][0]; idx={ad:(ad-base)//8 for ad,_ in ins}
def cname(ad,t):
    m=re.match(r'call (-?0x[0-9a-f]+)$',t)
    if not m: return t
    tgt=ad+8+int(m.group(1),16)*8
    if isorig:
        i=bisect.bisect_right(starts,tgt)-1; s=sc.get(str(wins[i]['start']),{})
        return 'call '+(short(s['symbols'][0]) if s.get('normalized') and s.get('symbols') else f'UNM@{wins[i]["start"]:#x}')
    return 'call '+short(syms.get(tgt,f'@{tgt:#x}'))
I=[]
for ad,t in ins:
    i=idx[ad]; tgt=None
    m=re.match(r'^(j\w+)( .*?)?,? ?([+-]0x[0-9a-f]+)$',t)
    if t.startswith('j'):
        m=re.match(r'^(j\w+) (?:(.*), )?([+-]0x[0-9a-f]+)$',t)
        if m: tgt=idx.get(ad+8+int(m.group(3),16)*8)
    I.append((i,t,tgt,ad))
leaders={0}
for i,t,tgt,ad in I:
    if tgt is not None: leaders.add(tgt); leaders.add(i+1)
    if t.startswith('exit') or t.startswith('ja'): leaders.add(i+1)
    if t.startswith('lddw'): pass
L=sorted(x for x in leaders if x<=I[-1][0])
bstart={x:k for k,x in enumerate(L)}
blocks=[]
cur=None
for i,t,tgt,ad in I:
    if i in bstart: cur=[i,[]]; blocks.append(cur)
    cur[1].append((i,t,tgt,ad))
def bname(i): return f'B{i}'
lo=opts.get('--from',0); hi=opts.get('--to',10**9)
for b0,body in blocks:
    if b0<lo or b0>hi: continue
    ops=[]; last=body[-1]
    for i,t,tgt,ad in body:
        if t.startswith('call'): ops.append(cname(ad,t)); continue
        m=re.match(r'^ldx(\w+) (r\d+), \[(r\d+) ([+-]) (0x[0-9a-f]+)\]$',t)
        if m:
            if m.group(3)!='r10' or SHOWALL: ops.append(f'{m.group(2)}={m.group(1)[0]}[{m.group(3)}{m.group(4)}{m.group(5)}]')
            continue
        m=re.match(r'^(stx|st)(\w+) \[(r\d+) ([+-]) (0x[0-9a-f]+)\], (\S+)$',t)
        if m:
            v=m.group(6)
            if m.group(3)!='r10' or SHOWALL: ops.append(f'[{m.group(3)}{m.group(4)}{m.group(5)}]{m.group(2)}={v}')
            elif m.group(1)=='st' and m.group(2)=='w' and re.match(r'0x17[0-9a-f]{2}$',v): ops.append(f'ERR{int(v,16)}')
            elif m.group(1)=='st' and m.group(2)=='w' and int(v,16)>100 and int(v,16)<3000: ops.append(f'ln{int(v,16)}')
            continue
        if t.startswith('exit'): ops.append('EXIT'); continue
        if tgt is not None:
            if t.startswith('ja'): ops.append(f'->B{tgt}')
            else: ops.append(t.split(' ')[0]+' '+t.split(' ',1)[1].rsplit(',',1)[0]+f' ->B{tgt}')
            continue
        if SHOWALL: ops.append(t)
    print(f'B{b0}[{len(body)}]: '+' ; '.join(ops))
