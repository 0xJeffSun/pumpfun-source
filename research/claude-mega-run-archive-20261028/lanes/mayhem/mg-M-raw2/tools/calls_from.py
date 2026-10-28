#!/usr/bin/env python3
"""List pc-relative call targets from functions in [lo,hi) of an SBF .so (unstripped), grouped by target symbol.
usage: python3 -B calls_from.py SO lo hi"""
import subprocess, sys, struct, bisect
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
so, lo, hi = sys.argv[1], int(sys.argv[2], 16), int(sys.argv[3], 16)
b = open(so, 'rb').read()
fn = []
for l in subprocess.run([RE, '-sW', so], capture_output=True, text=True).stdout.splitlines():
    p = l.split()
    if len(p) >= 8 and p[3] == 'FUNC' and p[6] != 'UND':
        fn.append((int(p[1], 16), int(p[2]), p[7]))
fn = sorted(set(fn)); starts = [f[0] for f in fn]
def name(a):
    i = bisect.bisect_right(starts, a) - 1
    return fn[i][2] if i >= 0 and a < fn[i][0] + max(fn[i][1], 8) else '?%x' % a
# .text file offset == vaddr here (sections at same addr/off)
tgt = {}
a = lo
while a < hi:
    op = b[a]; src = b[a+1] >> 4; imm = struct.unpack('<i', b[a+4:a+8])[0]
    if op == 0x85 and src == 1:
        t = a + 8 + imm * 8
        tgt.setdefault(name(t), []).append(a)
    a += 16 if op == 0x18 else 8
for k, v in sorted(tgt.items(), key=lambda kv: -len(kv[1])):
    print('%4d %s' % (len(v), k[:140]))
