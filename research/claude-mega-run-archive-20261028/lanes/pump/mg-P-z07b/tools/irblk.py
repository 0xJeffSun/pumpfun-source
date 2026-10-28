#!/usr/bin/env python3
"""irblk.py: block-level IR edits of one function.
  irblk.py IN OUT FNSUB list                       -> print block order
  irblk.py IN OUT FNSUB move LAB[,LAB2..] after|before TARGET
  irblk.py IN OUT FNSUB end LAB[,LAB..]            -> move blocks to function end
Numbered values are renamed (%N -> %vN) first so blocks can be moved."""
import sys,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b/tools')
from irfn import load, fn_span
src,dst,fn,op=sys.argv[1:5]; rest=sys.argv[5:]
t=load(src); s,e=fn_span(t,fn); b=t[s:e]
b=re.sub(r'%(\d+)\b', r'%v\1', b)
i=b.index('{\n')+2; head=b[:i]; body=b[i:-2]
parts=re.split(r'\n(?=[\w."$\-]+:)', body)
# numeric labels like "12:" -> v12:
parts=[re.sub(r'^(\d+):', r'v\1:', p) for p in parts]
def lab(p): return p.split(':')[0]
labs=[lab(p) for p in parts]
if op=='list':
    for k,l in enumerate(labs): print(k,l[:70])
    sys.exit()
parts0=list(parts)
if op in ('move','end'):
    names=[labs[int(n[1:])] if n.startswith('#') else n for n in rest[0].split(',')]
    blks=[parts[labs.index(n)] for n in names]
    parts=[p for p in parts if lab(p) not in names]
    labs=[lab(p) for p in parts]
    if op=='end': parts=parts+blks
    else:
        where,tg=rest[1],rest[2]; tg=[lab(p) for p in parts0][int(tg[1:])] if tg.startswith('#') else tg; k=labs.index(tg)+(1 if where=='after' else 0)
        parts=parts[:k]+blks+parts[k:]
nb=head+'\n'.join(parts)+'\n}\n'
open(dst,'w').write(t[:s]+nb+t[e:])
