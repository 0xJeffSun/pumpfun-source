#!/usr/bin/env python3
"""olist.py orig <start> [out] | cand <so> <symregex> [out]
Annotated listing: offset(insn idx) addr insn ; callee names resolved; Source line sites marked; error codes (60xx) marked."""
import sys, re, json, bisect
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W+'/harness')
import win, coords
from score import original_windows, body
inv=json.load(open(W+'/base/L19/inventory.json'))['windows']; starts=sorted(int(k) for k in inv)
def oname(t):
    i=bisect.bisect_right(starts,t)-1; s=starts[i]; sy=inv[str(s)].get('symbols') or []
    nm=(win.demangle(sy[0]) if sy else '?%x'%s)
    parts=nm.split('::')
    short='::'.join(parts[-2:]) if len(parts)>1 else nm
    return short[:60]+('' if s==t else '+%x'%(t-s))
a=sys.argv[1:]
if a[0]=='orig':
    st=int(a[1],0); w=next(x for x in original_windows() if x['start']==st); size=w['bytes']; path=W+'/base/original.so'
    blob=win.ORIG; secs=win.ORIG_SECS; nm=oname; out=a[2] if len(a)>2 else None
else:
    path=a[1]; c=win.Cand(path); f=[x for x in c.funcs if re.search(a[2],x[2]) or re.search(a[2],win.demangle(x[2]))]
    st,size,_=f[0]; blob=c.blob; secs=c.secs; out=a[3] if len(a)>3 else None
    fmap=sorted((s,win.demangle(n)) for s,_,n in c.funcs); ks=[x[0] for x in fmap]
    def nm(t):
        i=bisect.bisect_right(ks,t)-1; s,n=fmap[i]; parts=n.split('::'); short='::'.join(parts[-2:])
        return short[:60]+('' if s==t else '+%x'%(t-s))
raw=body(blob,secs,st,size)
sites={}
for s in coords.sites(blob,secs,st,raw):
    sites[s['slot']]=s['line']; sites.setdefault(s['line_slot'],s['line'])
txt=win.objdump_text(path,st,st+size)
lines=[]
for pc in sorted(txt):
    t=txt[pc]; ann=''
    m=re.match(r'call (-?0x[0-9a-f]+)$',t)
    if m: ann=' ; '+nm((pc//8+1+int(m.group(1),16))*8)
    if pc-st in sites: ann+=' ; L%d'%sites[pc-st]
    for m2 in re.finditer(r'\b(0x[0-9a-f]+|\d+)\b',t.split(',')[-1] if ',' in t else ''):
        v=int(m2.group(1),0)
        if 6000<=v<6200: ann+=' ; E%d'%v
    lines.append('%5d %x  %s%s'%((pc-st)//8,pc,t,ann))
o=open(out,'w') if out else sys.stdout
o.write('\n'.join(lines)+'\n')
