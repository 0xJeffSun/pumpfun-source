#!/usr/bin/env python3
"""frame.py <module.ll> <fnregex>: llc -stop-after=prologepilog, print frame objects (id name offset size) of the fn."""
import sys, re, subprocess
LLC='/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
mod, rx = sys.argv[1], sys.argv[2]
out = mod + '.mir'
subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-stop-after=prologepilog', mod, '-o', out], check=True)
s = open(out).read()
for blk in s.split('\n---\n'):
    m = re.search(r'^name:\s+(\S+)', blk, re.M)
    if not m or not re.search(rx, m.group(1)): continue
    st = blk.index('stack:')
    objs = re.findall(r"- \{ id: (\d+), name: '?([^,']*)'?, type: (\w+), offset: (-?\d+), size: (\d+)", blk[st:])
    for o in objs: print(f'{o[0]:>3} {o[1][:34]:34s} off={int(o[3]):5d} ({hex(-int(o[3]))}) size={o[4]}')
    break
