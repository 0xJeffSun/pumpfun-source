#!/usr/bin/env python3
"""irfirst.py MODULE.ll PATTERN... : for constant globals whose initializer contains PATTERN (LLVM c"..." text),
print global name, its index among globals, and the first defined functions (module order) referencing it."""
import re, sys
ll = open(sys.argv[1], encoding='utf-8', errors='replace').read().split('\n')
gdef = {}; gorder = []
for i, l in enumerate(ll):
    if l.startswith('@'):
        n = l.split(' ', 1)[0]; gdef[n] = (len(gorder), l); gorder.append(n)
funcs = []; cur = None
for i, l in enumerate(ll):
    if l.startswith('define '):
        m = re.search(r'@("[^"]+"|[\w.$]+)\(', l); cur = [m.group(1) if m else l[:60], []]; funcs.append(cur)
    elif cur is not None and l.startswith('}'): cur = None
    elif cur is not None: cur[1].append(l)
for pat in sys.argv[2:]:
    hits = [n for n, (j, l) in gdef.items() if pat in l]
    for n in hits:
        users = [f for f, body in funcs if any(n + ',' in x or n + ')' in x or n + ' ' in x or x.endswith(n) for x in body)]
        print(pat, n, 'gidx', gdef[n][0], 'users', len(users), [u[:80] for u in users[:3]])
