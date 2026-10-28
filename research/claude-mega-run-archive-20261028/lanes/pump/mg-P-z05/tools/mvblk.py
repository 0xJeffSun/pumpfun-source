#!/usr/bin/env python3
"""mvblk.py <in.ll> <fnregex> <out.ll> BLOCK [after=OTHER|end]: move a basic block (label BLOCK) after block OTHER or to fn end."""
import re, sys
src, rx, out, blk = sys.argv[1:5]; where = sys.argv[5] if len(sys.argv) > 5 else 'end'
t = open(src).read()
m = re.search(r'\ndefine [^\n]*' + sys.argv[2] + r'[^\n]*\{', t); fs = m.start(); fe = t.index('\n}\n', fs)
f = t[fs:fe]
def span(f, name):
    s = f.index('\n' + name + ':')
    m2 = re.compile(r'\n\n[^\s;][^\n]*:').search(f, s + 1)
    e = m2.start() + 1 if m2 else len(f)
    return s, e
s, e = span(f, blk); b = f[s:e].rstrip('\n'); f2 = f[:s] + f[e:]
if where == 'end':
    f2 = f2.rstrip('\n') + '\n' + b
else:
    o = where.split('=', 1)[1]; s2, e2 = span(f2, o)
    f2 = f2[:e2].rstrip('\n') + '\n' + b + '\n\n' + f2[e2:].lstrip('\n')
open(out, 'w').write(t[:fs] + f2 + t[fe:])
