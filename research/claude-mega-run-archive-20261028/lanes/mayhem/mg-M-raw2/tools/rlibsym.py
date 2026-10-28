#!/usr/bin/env python3
"""For each rlib given, list members and the symtab index of selected undefined symbols in each member.
usage: python3 -B rlibsym.py SYMS(comma) rlib...
"""
import subprocess, sys, tempfile, os, hashlib
from pathlib import Path
AR = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-ar'
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
syms = sys.argv[1].split(',')
seen = set()
for rl in sys.argv[2:]:
    h = hashlib.sha256(Path(rl).read_bytes()).hexdigest()[:12]
    key = (Path(rl).name, h)
    if key in seen:
        continue
    seen.add(key)
    with tempfile.TemporaryDirectory() as td:
        mem = subprocess.run([AR, 't', rl], capture_output=True, text=True).stdout.split()
        objs = [m for m in mem if m.endswith('.o')]
        subprocess.run([AR, 'x', rl, *objs], cwd=td, check=True)
        out = []
        for m in objs:
            st = subprocess.run([RE, '-sW', os.path.join(td, m)], capture_output=True, text=True).stdout.splitlines()
            idx = {}
            for l in st:
                p = l.split()
                if len(p) >= 8 and p[7] in syms and p[6] == 'UND':
                    idx[p[7]] = int(p[0].rstrip(':'))
            if idx:
                out.append((m.split('.')[-3] if m.count('.') > 3 else m, idx))
        print(Path(rl).name, h, 'members=%d' % len(objs), out)
