#!/usr/bin/env python3
"""ctargets.py orig|<cand.so> [symregex]: distinct call targets of the window/fn: addr, count, L27-inventory name (summary)."""
import sys, re, json, bisect, collections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W+'/harness')
import win
from score import original_windows
inv=json.load(open(W+'/base/L27/inventory.json'))['windows']; starts=sorted(int(k) for k in inv)
def iname(t):
    i=bisect.bisect_right(starts,t)-1; s=starts[i]; e=inv[str(s)]; sy=e.get('symbols') or []
    return ('0x%x'%s)+(' '+win.demangle(sy[0])[:90] if sy else ' <unmatched>')+('' if s==t else ' +0x%x'%(t-s))
if sys.argv[1]=='orig':
    st=int(sys.argv[2],0) if len(sys.argv)>2 and sys.argv[2].startswith("0x") else 0x22a10; w=next(x for x in original_windows() if x['start']==st); size=w['bytes']; path=W+'/base/original.so'; nm=iname
else:
    path=sys.argv[1]; c=win.Cand(path); rx=sys.argv[2] if len(sys.argv)>2 else r'admin_cto.*execute'
    st,size,_=[x for x in c.funcs if re.search(rx,x[2])][0]
    fm=sorted((a,win.demangle(b)) for a,_,b in c.funcs); ks=[x[0] for x in fm]
    def nm(t):
        i=bisect.bisect_right(ks,t)-1; s,n=fm[i]; return ('0x%x '%t)+n[:90]+('' if s==t else ' +off')
txt=win.objdump_text(path,st,st+size); cnt=collections.Counter()
for pc in sorted(txt):
    m=re.match(r'call (-?0x[0-9a-f]+)$',txt[pc])
    if m:
        imm=int(m.group(1),16); cnt['SYSCALL(-1)' if imm==-1 else nm((pc//8+1+imm)*8)]+=1
flt=sys.argv[3] if len(sys.argv)>3 else None
for k,v in sorted(cnt.items(), key=lambda x:-x[1]):
    if flt and not re.search(flt,k): continue
    print(v, k)
