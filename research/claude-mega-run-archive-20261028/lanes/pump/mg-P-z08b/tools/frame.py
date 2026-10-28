#!/usr/bin/env python3
"""frame.py <ir.ll|module.ll> <fn-substring> [llc extra args]: extract fn (xfn), llc -stop-after=prologepilog, print frame objects
sorted by offset (shallow first): offset size name.  Use to map IR allocas -> r10 offsets."""
import sys, re, subprocess, os, tempfile
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
LLC = os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin/llc')
ir, pat = sys.argv[1], sys.argv[2]
d = tempfile.mkdtemp(dir=W + '/lanes/mg-P-z08b/llx')
x = d + '/x.ll'
subprocess.run([sys.executable, '-B', W + '/lanes/mg-P-z06/tools/xfn.py', ir, pat, x], check=True, capture_output=True)
subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-stop-after=prologepilog', x, '-o', d + '/x.mir'] + sys.argv[3:], check=True)
txt = open(d + '/x.mir').read()
st = txt[txt.index('\nstack:'):]
st = st[:st.index('\ncallSites:') if '\ncallSites:' in st else len(st)]
objs = []
for m in re.finditer(r'- \{ id: (\d+), name: ([^,]*), type: (\w[\w-]*), offset: (-?\d+), size: (\d+)', st):
    objs.append((int(m.group(4)), int(m.group(5)), m.group(2) or '<spill>', m.group(3), int(m.group(1))))
for off, sz, nm, ty, i in sorted(objs, key=lambda t: -t[0]):
    print(f'{-off:#6x} {sz:4d} {nm:28s} {ty} id{i}')
