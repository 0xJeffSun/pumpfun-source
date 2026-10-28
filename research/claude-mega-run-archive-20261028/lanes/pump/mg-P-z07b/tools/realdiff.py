#!/usr/bin/env python3
"""realdiff.py <odiff output>: drop -/+ line pairs that differ only in branch offsets; print remaining hunks compactly."""
import sys,re
L=open(sys.argv[1]).read().splitlines()
def norm(s): return re.sub(r'([+-]0x[0-9a-f]+)$','OFF',s) if re.match(r'[-+ ]?(j\w+|ja)\b',s[1:] if s[:1] in '-+ ' else s) else s
out=[];i=0
hunk=[]
for l in L:
    if l.startswith('@@'):
        if hunk: out.append(hunk)
        hunk=[l]; continue
    if hunk: hunk.append(l)
if hunk: out.append(hunk)
n=0
for h in out:
    minus=[norm(x[1:]) for x in h[1:] if x.startswith('-')]
    plus=[norm(x[1:]) for x in h[1:] if x.startswith('+')]
    if minus==plus: continue
    n+=1
    print('\n'.join(h[:40]))
print('real hunks:',n,'of',len(out))
