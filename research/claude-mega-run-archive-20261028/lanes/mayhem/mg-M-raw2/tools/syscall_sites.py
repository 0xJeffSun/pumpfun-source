#!/usr/bin/env python3
"""Map each dynamic relocation against a named syscall to the containing function (needs unstripped symbols.so).
usage: python3 -B syscall_sites.py SYMBOLS_SO sym1 [sym2...]
"""
import subprocess, sys, re, bisect
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
so, syms = sys.argv[1], sys.argv[2:]
rel = subprocess.run([RE, '-r', so], capture_output=True, text=True).stdout
fn = []
for l in subprocess.run([RE, '-sW', so], capture_output=True, text=True).stdout.splitlines():
    p = l.split()
    if len(p) >= 8 and p[3] == 'FUNC' and p[6] != 'UND':
        fn.append((int(p[1], 16), int(p[2]), p[7]))
fn.sort()
starts = [f[0] for f in fn]
for s in syms:
    hits = []
    for l in rel.splitlines():
        p = l.split()
        if len(p) >= 5 and p[-1] == s or (len(p) >= 5 and p[4] == s):
            off = int(p[0], 16)
            i = bisect.bisect_right(starts, off) - 1
            hits.append((off, fn[i][2] if i >= 0 else '?', off - fn[i][0] if i >= 0 else 0))
    print(s, len(hits))
    seen = {}
    for off, f, d in hits:
        seen.setdefault(f, []).append(off)
    for f, offs in seen.items():
        print('   %-110s n=%d first=0x%x' % (f[:110], len(offs), offs[0]))
