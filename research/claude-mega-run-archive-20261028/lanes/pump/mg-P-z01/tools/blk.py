#!/usr/bin/env python3
"""blk.py orig <start> | cand <so> <symregex> [--ins]: basic-block summary (slot offset, size, Source lines, callees, successors)."""
import sys, re, json, bisect
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W+'/harness')
import win, coords
from score import original_windows, candidate_functions, sections, body
from pathlib import Path
args=[a for a in sys.argv[1:] if not a.startswith('--')]; INS='--ins' in sys.argv
inv=json.load(open(W+'/base/L12/inventory.json'))['windows']; starts=sorted(int(k) for k in inv)
def oname(t):
    i=bisect.bisect_right(starts,t)-1; s=starts[i]; sy=inv[str(s)].get('symbols') or []
    return (win.demangle(sy[0]) if sy else '?%x'%s).split('::')[-1][:28]+('' if s==t else '+%x'%(t-s))
if args[0]=='orig':
    st=int(args[1],0); w=next(x for x in original_windows() if x['start']==st); size=w['bytes']; path=W+'/base/original.so'
    blob=win.ORIG; secs=win.ORIG_SECS; nm=oname
else:
    path=args[1]; c=win.Cand(path); f=[x for x in c.funcs if re.search(args[2],x[2])]
    st,size,_=f[0]; blob=c.blob; secs=c.secs
    fmap=sorted((s,win.demangle(n)) for s,n,_ in [(a,b,0) for a,_,b in c.funcs])
    ks=[x[0] for x in fmap]
    def nm(t):
        i=bisect.bisect_right(ks,t)-1; s,n=fmap[i]; return n.split('::')[-1][:28]+('' if s==t else '+%x'%(t-s))
raw=body(blob,secs,st,size)
sites={s['slot']:s['line'] for s in coords.sites(blob,secs,st,raw)}
txt=win.objdump_text(path,st,st+size)
pcs=sorted(txt)
lead={st}; tgt={}
for pc in pcs:
    t=txt[pc]; m=re.match(r'(j\w+)\s.*?([+-]0x[0-9a-f]+|[+-]\d+)$',t.split('<')[0].strip())
    if t.startswith('j') and m:
        d=pc+8+int(m.group(2),0)*8; tgt[pc]=d; lead.add(d)
        nx=[p for p in pcs if p>pc][:1]; lead.update(nx)
    elif t.startswith('exit'):
        nx=[p for p in pcs if p>pc][:1]; lead.update(nx)
L=sorted(x for x in lead if st<=x<st+size); bi={a:i for i,a in enumerate(L)}
for i,a in enumerate(L):
    e=L[i+1] if i+1<len(L) else st+size
    ps=[p for p in pcs if a<=p<e]; lines=[str(sites[p-st]) for p in ps if p-st in sites]
    calls=[]
    for p in ps:
        m=re.match(r'call (-?0x[0-9a-f]+)$',txt[p])
        if m:
            raw8=blob[0:0]
            calls.append(nm((p//8+1+int(m.group(1),16))*8))
        elif txt[p].startswith('call'): calls.append(txt[p])
    last=txt[ps[-1]]; succ=[]
    if ps[-1] in tgt: succ.append('B%d'%bi.get(tgt[ps[-1]],-1))
    if not last.startswith('ja') and not last.startswith('exit') and i+1<len(L): succ.append('ft')
    term=last.split(',')[0].split()[0] if (last.startswith('j') or last.startswith('exit')) else ''
    print('B%-3d +%-4d n=%-3d %s%s%s %s' % (i,(a-st)//8,len(ps),('L'+','.join(lines)+' ') if lines else '',('C['+';'.join(calls)+'] ') if calls else '',term,'->'+','.join(succ) if succ else ''))
    if INS:
        for p in ps: print('      %x %s'%(p-st,txt[p]))
