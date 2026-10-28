#!/usr/bin/env python3
"""List an object's sections in order with relocations against selected symbols; and the symtab order of them.
usage: python3 -B objrefs.py OBJ sym1,sym2 [--all]
"""
import subprocess, sys, re
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
obj, syms = sys.argv[1], sys.argv[2].split(',')
allsec = '--all' in sys.argv
out = subprocess.run([RE, '-rW', obj], capture_output=True, text=True).stdout
sec = None
hits = []  # (section, sym, offset)
order = []
for l in out.splitlines():
    m = re.match(r"Relocation section '(.+)' at offset", l)
    if m:
        sec = m.group(1); order.append(sec); continue
    p = l.split()
    if len(p) >= 5 and sec:
        name = p[4]
        if name in syms:
            hits.append((sec, name, p[0]))
print('reloc sections:', len(order))
first = {}
for i, s in enumerate(order):
    hs = [h for h in hits if h[0] == s]
    for h in hs:
        first.setdefault(h[1], (i, s))
    if hs or allsec:
        print('%4d %-120s %s' % (i, s[:120], ','.join(sorted(set(h[1] for h in hs)))))
print('first:', {k: (v[0], v[1][:100]) for k, v in first.items()})
