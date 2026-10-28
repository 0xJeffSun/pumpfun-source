#!/usr/bin/env python3
"""call graph helper. cg.py callers ADDR [--cand so] | cg.py callees ADDR [--cand so]
For original uses windows; for candidate uses symbols."""
import sys, struct, bisect
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import sections, candidate_functions, original_windows, BASE
from win import demangle
import argparse
ap=argparse.ArgumentParser(); ap.add_argument('cmd'); ap.add_argument('addr'); ap.add_argument('--cand'); a=ap.parse_args()
if a.cand:
    path=a.cand; fns=sorted((s,sz,demangle(n)) for s,sz,n in candidate_functions(path))
else:
    path=str(BASE/'original.so'); import json; inv=json.load(open(str(BASE/'L12/inventory.json')))['windows']
    nm=lambda s: (('M ' if inv.get(str(s),{}).get('normalized') else 'U ')+(demangle(inv[str(s)]['symbols'][0]) if inv.get(str(s),{}).get('symbols') else '')) 
    fns=sorted((w['start'],w['bytes'],nm(w['start'])) for w in original_windows())
img=open(path,'rb').read(); secs=sections(img); t=secs['.text']
def calls(s,sz):
    o=s-t['addr']+t['offset']; i=0; out=[]
    while i<sz:
        op,regs,off,imm=struct.unpack_from('<BBhi',img,o+i)
        if op==0x85 and regs>>4==1 and imm!=-1:
            out.append((s+i, s+i+8+imm*8))
        i+= 16 if op==0x18 else 8
    return out
starts=[f[0] for f in fns]
def fnof(x):
    k=bisect.bisect_right(starts,x)-1; return fns[k] if k>=0 else None
X=int(a.addr,16)
if a.cmd=='callees':
    f=fnof(X)
    for pc,tg in calls(f[0],f[1]):
        g=fnof(tg); print(hex(pc), '->', hex(tg), (hex(g[0])+' '+str(g[1])+' '+g[2]) if g else '?')
else:
    for f in fns:
        for pc,tg in calls(f[0],f[1]):
            if tg==X: print(hex(f[0]),f[1],f[2],'@',hex(pc))
