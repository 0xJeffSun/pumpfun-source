#!/usr/bin/env python3
"""hunks.py <odiff output file>: one line per hunk (counts + first line)."""
import sys
txt=open(sys.argv[1]).read().split('  ...\n')
tm=tp=0
for h in txt[1:]:
    ls=[l for l in h.splitlines() if l[:1] in '-+']
    if not ls: continue
    m=[l for l in ls if l[0]=='-']; p=[l for l in ls if l[0]=='+']; tm+=len(m); tp+=len(p)
    first=(m or p)[0]
    print(f'{len(m):3d}- {len(p):3d}+  at {first[1:7].strip():>5}  {first[7:60]}')
print('total', tm, tp)
