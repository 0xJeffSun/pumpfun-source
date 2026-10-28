#!/usr/bin/env python3
"""skel.py <so> <start_hex> <len|orig> [--names json] [--from off] [--to off] [--keep-err]
Condensed CFG listing: error-construction regions (PumpError::name/fmt/with_values/... and blocks reachable only from them)
are collapsed into one line; other blocks printed tersely with offsets relative to start."""
import sys,re,subprocess,json,argparse
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
ap=argparse.ArgumentParser(); ap.add_argument('so'); ap.add_argument('start'); ap.add_argument('len')
ap.add_argument('--names'); ap.add_argument('--from',dest='frm',default='0'); ap.add_argument('--to',default='0xffffff'); ap.add_argument('--keep-err',action='store_true')
a=ap.parse_args(); s=int(a.start,16)
if a.len=='orig':
    from score import original_windows
    n=next(x for x in original_windows() if x['start']==s)['bytes']
else: n=int(a.len,0)
names=json.load(open(a.names)) if a.names else {}
txt=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={s:#x}',f'--stop-address={s+n:#x}',a.so],text=True)
ins=[]
for l in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if m: ins.append([int(m.group(1),16)-s,m.group(2).strip()])
def tgt(t):
    m=re.search(r'<\.text\+(0x[0-9a-f]+)>',t); return int(m.group(1),16)-s if m else None
ERRF=('PumpError::name','Display>::fmt','unwrap_failed','AnchorError>>::from','with_values','ToString>::to_string','drop_in_place<anchor_lang::error::Error>','From<PumpError>','ProgramError>>::from','ErrorCode>>::from','handle_alloc_error','handle_error','panic')
for x in ins:
    t=x[1]
    if t.startswith('call'):
        m=re.match(r'call (-?0x[0-9a-f]+)',t)
        if m:
            tg=s+x[0]+8+int(m.group(1),16)*8; nm=names.get(hex(tg),hex(tg)); x[1]='CALL '+nm.replace('pump_recovered::','')[:70]
    t=x[1]
    t=re.sub(r'<\.text\+0x[0-9a-f]+>','',t)
    t=re.sub(r'\s+',' ',t).strip()
    x[1]=t
# blocks
starts={0}
for i,(o,t) in enumerate(ins):
    tg=tgt_v=None
for i,(o,t) in enumerate(ins):
    pass
raw=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={s:#x}',f'--stop-address={s+n:#x}',a.so],text=True)
jt={}
for l in raw.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(j\w+|ja)\b[^<]*?([+-]0x[0-9a-f]+)\s*(<.*)?$',l)
    if m: jt[int(m.group(1),16)-s]=int(m.group(1),16)-s+8+int(m.group(3),16)*8
for o,t in ins:
    if o in jt:
        starts.add(jt[o]); starts.add(o+8)
    if t.startswith('exit'): starts.add(o+8)
starts=sorted(x for x in starts if 0<=x<n)
idx={o:i for i,(o,t) in enumerate(ins)}
blocks=[]
for k,b in enumerate(starts):
    e=starts[k+1] if k+1<len(starts) else n
    blocks.append((b,[x for x in ins if b<=x[0]<e]))
bstart=[b for b,_ in blocks]
succ={};pred={b:set() for b in bstart}
for k,(b,body) in enumerate(blocks):
    if not body: continue
    lo,lt=body[-1]; ss=[]
    if lo in jt: ss.append(jt[lo])
    if not (lt.startswith('ja ') or lt.startswith('exit')) and k+1<len(blocks): ss.append(blocks[k+1][0])
    succ[b]=ss
    for x in ss:
        if x in pred: pred[x].add(b)
err=set(b for b,body in blocks if any(x[1].startswith('CALL') and any(f in x[1] for f in ERRF) for x in body))
ch=True
while ch:
    ch=False
    for b,_ in blocks:
        if b not in err and b!=0 and pred[b] and all(p in err for p in pred[b]): err.add(b); ch=True
fr=int(a.frm,0); to=int(a.to,0)
pend=[]
for b,body in blocks:
    if not (fr<=b<=to): continue
    if b in err and not a.keep_err:
        pend.append(b); continue
    if pend:
        print(f'  [ERR {len(pend)} blks @{pend[0]:#x}..]'); pend=[]
    ps=','.join(f'{p:#x}' for p in sorted(pred[b]) if p!=b and p!=(bstart[bstart.index(b)-1] if bstart.index(b)>0 else -1))
    print(f'{b:#x}:' + (f'  <-{ps}' if ps else ''))
    for o,t in body:
        if o in jt: t=re.sub(r'(,\s*)?[+-]0x[0-9a-f]+$','',t)+f' ->{jt[o]:#x}'+(' (E)' if jt[o] in err else '')
        print('   '+t)
if pend: print(f'  [ERR {len(pend)} blks @{pend[0]:#x}..]')
