#!/usr/bin/env python3
"""Scan every rlib of a recorded link (replay.json) for members naming given symbols (readelf on the archive).
usage: python3 -B rlibscan.py REPLAY_JSON sym1,sym2
"""
import json, subprocess, sys, re
from pathlib import Path
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
rep = json.load(open(sys.argv[1])); syms = set(sys.argv[2].split(','))
for r in [a for a in rep['args'] if a.endswith('.rlib')]:
    out = subprocess.run([RE, '-sW', r], capture_output=True, text=True).stdout
    mem = None; hits = []
    for l in out.splitlines():
        m = re.match(r'File: .*\((.*)\)', l)
        if m: mem = m.group(1); continue
        p = l.split()
        if len(p) >= 8 and p[7] in syms:
            hits.append((mem, p[7], p[6], p[0]))
    if hits:
        print(Path(r).name)
        for h in hits: print('   ', h[0][-70:], h[1], h[2], 'idx', h[3])
