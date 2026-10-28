#!/usr/bin/env python3
"""ccallees.py <cand.so> <symregex> : callee histogram of a candidate function."""
import sys,re,bisect,collections
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
import win
c=win.Cand(sys.argv[1]); f=[x for x in c.funcs if re.search(sys.argv[2],x[2])][0]
fm=sorted((s,win.demangle(n)) for s,_,n in c.funcs); ks=[x[0] for x in fm]
t=win.objdump_text(c.path,f[0],f[0]+f[1]); cnt=collections.Counter()
for pc in sorted(t):
    m=re.match(r'call (-?0x[0-9a-f]+)$',t[pc])
    if m:
        a=(pc//8+1+int(m.group(1),16))*8; i=bisect.bisect_right(ks,a)-1; s,n=fm[i]
        cnt[('%x'%a if s==a else '%x+%x'%(s,a-s))+' '+n[:70]]+=1
    elif t[pc].startswith('call'): cnt[t[pc]]+=1
print(f[2][:80],f[1])
for k,v in cnt.most_common(): print(v,k)
