#!/usr/bin/env python3
"""callargs.py <dis.s> <orig_start>: for each call, print the callee (window symbol) and the last setter of r1..r5 in the
preceding 14 instructions (compact)."""
import sys, re, json, bisect, subprocess
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
inv=json.load(open(W+'/base/L27/inventory.json'))['windows']; starts=sorted(int(k) for k in inv)
def nm(t):
    i=bisect.bisect_right(starts,t)-1; v=inv[str(starts[i])]
    if not v['symbols']: return hex(t)+'?'
    s=subprocess.run(['c++filt'],input=v['symbols'][0],capture_output=True,text=True).stdout.strip()
    s=re.sub(r'::h[0-9a-f]{16}$','',s); s=s.replace('pump_recovered::','').replace('_$LT$','<').replace('$GT$','>').replace('$u20$',' ')
    return s[-60:]
lines=[l.split(':',1) for l in open(sys.argv[1])]
ins=[(int(a.strip(),16),b.strip()) for a,b in lines]
for k,(pc,t) in enumerate(ins):
    m=re.match(r'call (-?0x[0-9a-f]+)',t)
    if not m: continue
    imm=int(m.group(1),16); tgt=pc+8+imm*8
    callee='abort' if tgt==pc else nm(tgt)
    if callee in ('abort',) : continue
    regs={}
    for j in range(k-1,max(-1,k-15),-1):
        tt=ins[j][1]; mm=re.match(r'(mov64|ldxdw|ldxb|ldxw|add64|lddw) (r[1-5]), (.*)',tt)
        if re.match(r'(call|exit|ja |j)',tt): break
        if mm and mm.group(2) not in regs: regs[mm.group(2)]=mm.group(1)[:4]+' '+mm.group(3)
    a=' '.join(f"{r}={regs[r]}" for r in sorted(regs))
    print(f"{(pc-int(sys.argv[2],0))//8:5d} {callee[:52]:52s} | {a[:120]}")
