#!/usr/bin/env python3
"""skel.py [from_off] [to_off]: block-level skeleton of the ORIGINAL hop body (offsets in bytes from 0x5b3b0).
Per block: offset, calls (callee names from the L30 inventory), error-code stores, sret stores, terminator targets."""
import sys, re, json, bisect, subprocess
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
S='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-hop/tools/hop_orig.s'
B=0x5b3b0
inv=json.load(open(W+'/base/L30/inventory.json'))['windows']; starts=sorted(int(k) for k in inv)
cache={}
def nm(t):
    if t in cache: return cache[t]
    i=bisect.bisect_right(starts,t)-1; v=inv[str(starts[i])]
    if not v['symbols']: r=hex(starts[i])+'?'
    else:
        s=subprocess.run(['c++filt'],input=v['symbols'][0],capture_output=True,text=True).stdout.strip()
        s=re.sub(r'::h[0-9a-f]{16}$','',s); s=s.replace('pump_recovered::','').replace('_$LT$','<').replace('$GT$','>').replace('$u20$',' ')
        s=re.sub(r'.*::(\w+)$',r'\1',s) if '::' in s and '<' not in s else s[-40:]
        r=s
    cache[t]=r; return r
ins=[]
for l in open(S):
    a,t=l.split(':',1); ins.append((int(a,16)-B,t.strip()))
lo=int(sys.argv[1],0) if len(sys.argv)>1 else 0; hi=int(sys.argv[2],0) if len(sys.argv)>2 else 10**9
lead={0}
def tgt(off,t):
    m=re.search(r'([+-]0x[0-9a-f]+)\s*<',t) or re.search(r', ([+-]0x[0-9a-f]+)$',t) or re.search(r'^ja ([+-]0x[0-9a-f]+)',t)
    if not m: return None
    return off+8+int(m.group(1),16)*8
for k,(off,t) in enumerate(ins):
    if t.startswith('j'):
        g=tgt(off,t)
        if g is not None: lead.add(g)
        if k+1<len(ins): lead.add(ins[k+1][0])
    if t.startswith('exit') and k+1<len(ins): lead.add(ins[k+1][0])
out=[]; cur=None
for k,(off,t) in enumerate(ins):
    if off in lead:
        if cur: out.append(cur)
        cur={'off':off,'ev':[],'term':''}
    m=re.match(r'call (-?0x[0-9a-f]+)',t)
    if m:
        g=off+B+8+int(m.group(1),16)*8; cur['ev'].append('C:'+nm(g))
    elif re.match(r'syscall|call \w',t): cur['ev'].append('S:'+t)
    m=re.match(r'stw \[r10 - 0x638\], (0x[0-9a-f]+)',t)
    if m: cur['ev'].append('E%d'%int(m.group(1),16))
    if t.startswith('j'):
        g=tgt(off,t); c=t.split()[0]
        cur['term']=(f"{c} {t.split(' ',1)[1].split('<')[0].strip()}->{g:x}" if c!='ja' else f"ja->{g:x}")
    if t.startswith('exit'): cur['term']='EXIT'
if cur: out.append(cur)
for b in out:
    if lo<=b['off']<=hi: print(f"{b['off']:5x} {' '.join(b['ev'])[:150]} | {b['term']}")
