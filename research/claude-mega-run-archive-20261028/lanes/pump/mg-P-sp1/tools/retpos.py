#!/usr/bin/env python3
"""retpos.py <print-after-all dump>: per pass dump: number of blocks, index of the block(s) holding `ret`, name."""
import sys,re
txt=open(sys.argv[1]).read()
dumps=re.split(r'\n(?=; \*\*\* IR Dump After )',txt)
prev=None
for d in dumps:
    m=re.match(r'; \*\*\* IR Dump After (.*?) \*\*\*',d)
    if not m: continue
    name=m.group(1)
    if 'define' not in d: continue
    body=d[d.index('define'):]
    blocks=re.split(r'\n(?=[A-Za-z0-9_.$"\-]+:)',body)
    names=[]; rets=[]
    for k,b in enumerate(blocks):
        nm='start' if k==0 else b.split(':')[0]
        names.append(nm)
        if re.search(r'\n\s+ret ',b) or b.strip().startswith('ret') : rets.append((k,nm[:14]))
    sig=(len(blocks),tuple(rets))
    if sig!=prev: print(f'{name[:60]:60s} nblk={len(blocks):3d} ret@{rets}')
    prev=sig
