#!/usr/bin/env python3
"""Check whether an object's global symtab order equals first-reference/definition order over its sections.
usage: python3 -B symorder.py OBJ [N]   prints UND symbols in symtab order with index of first referencing section
"""
import subprocess, sys, re
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
obj = sys.argv[1]
N = int(sys.argv[2]) if len(sys.argv) > 2 else 40
syms = []
for l in subprocess.run([RE, '-sW', obj], capture_output=True, text=True).stdout.splitlines():
    p = l.split()
    if len(p) >= 8 and p[0].rstrip(':').isdigit() and p[4] in ('GLOBAL', 'WEAK'):
        syms.append((int(p[0].rstrip(':')), p[6], p[7]))
rel = subprocess.run([RE, '-rW', obj], capture_output=True, text=True).stdout
sec = None; secs = []; first = {}
for l in rel.splitlines():
    m = re.match(r"Relocation section '(.+)' at offset", l)
    if m:
        sec = m.group(1); secs.append(sec); continue
    p = l.split()
    if len(p) >= 5 and sec:
        first.setdefault(p[4], len(secs) - 1)
und = [(i, n) for i, nd, n in syms if nd == 'UND']
print('globals', len(syms), 'undefined', len(und))
prev = -1; inv = 0
for i, n in und:
    f = first.get(n, None)
    flag = ''
    if f is not None:
        if f < prev: inv += 1; flag = '  <-- earlier section than previous'
        prev = max(prev, f)
    if n.startswith('sol_') or n in ('abort', 'memcpy', 'memset', 'memmove', 'memcmp') or flag:
        print('%5d firstsec=%-5s %s%s' % (i, f, n[:90], flag))
print('inversions', inv)
