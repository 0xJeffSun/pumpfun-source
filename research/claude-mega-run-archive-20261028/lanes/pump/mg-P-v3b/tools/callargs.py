#!/usr/bin/env python3
"""callargs.py <so> <start_hex> <len|orig> [names.json]: for each call in [start,start+len), print the defining insn of r1..r5
(searched backwards inside the basic block) - a compact ABI summary of call sites."""
import sys,re,subprocess,json
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so=sys.argv[1]; s=int(sys.argv[2],16)
if sys.argv[3]=='orig':
    from score import original_windows
    n=next(x for x in original_windows() if x['start']==s)['bytes']
else: n=int(sys.argv[3],0)
names=json.load(open(sys.argv[4])) if len(sys.argv)>4 else {}
txt=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={s:#x}',f'--stop-address={s+n:#x}',so],text=True)
ins=[]
for l in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if m: ins.append((int(m.group(1),16),m.group(2).strip()))
tgts=set()
for a,t in ins:
    m=re.search(r'<\.text\+(0x[0-9a-f]+)>',t)
    if m: tgts.add(int(m.group(1),16))
def defs(i):
    want={'r1','r2','r3','r4','r5'}; got={}
    j=i-1
    while j>=0 and want-set(got):
        a,t=ins[j]
        if t.startswith(('ja ','j')) and not t.startswith('call'): break
        m=re.match(r'^(\w+)\s+(r\d+)',t)
        if m and m.group(2) in want and m.group(2) not in got and not m.group(1).startswith('st'):
            got[m.group(2)]=t.replace(m.group(1)+' '+m.group(2)+', ',m.group(1)[:5]+' ')
        if a in tgts: break
        j-=1
    return got
for i,(a,t) in enumerate(ins):
    if t.startswith('call'):
        m=re.match(r'call (-?0x[0-9a-f]+)',t)
        nm=t
        if m:
            tg=a+8+int(m.group(1),16)*8; nm=names.get(hex(tg),hex(tg))
        d=defs(i)
        print(f"{a-s:#6x} {nm[:48]:48s} "+' '.join(f"{k}={d[k]}" for k in sorted(d)))
