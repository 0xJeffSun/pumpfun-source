#!/usr/bin/env python3
"""For each dynsym undefined symbol, min/max r_offset of .rel.dyn relocations against it + count; sorted by min offset.
usage: python3 -B firstref.py SO"""
import subprocess, sys
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
so = sys.argv[1]
d = {}
for l in subprocess.run([RE, '-rW', so], capture_output=True, text=True).stdout.splitlines():
    p = l.split()
    if len(p) >= 5 and p[2] in ('R_BPF_64_32','R_SBF_64_32'):
        off = int(p[0], 16); s = p[4]
        d.setdefault(s, []).append(off)
dyn = [l.split()[7] for l in subprocess.run([RE, '--dyn-syms', '-W', so], capture_output=True, text=True).stdout.splitlines()[3:] if len(l.split()) >= 8]
print('dynsym order:', ' '.join(dyn))
for s, offs in sorted(d.items(), key=lambda kv: min(kv[1])):
    print('%-32s n=%4d first=0x%06x last=0x%06x dynidx=%s' % (s, len(offs), min(offs), max(offs), dyn.index(s) + 1 if s in dyn else '-'))
