#!/usr/bin/env python3
"""odiff.py <obj.o|so> <orig_start> <symregex> [ctx]: short aligned diff (normalized text) of a function in an object vs the original window."""
import sys, re, subprocess, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
o, st, rx = sys.argv[1], int(sys.argv[2], 0), sys.argv[3]; ctx = int(sys.argv[4]) if len(sys.argv) > 4 else 2
w = next(x for x in original_windows() if x['start'] == st)
def dis_bytes(raw):
    out = []; i = 0
    import struct
    while i < len(raw):
        op = raw[i]; n = 16 if op == 0x18 else 8
        out.append(raw[i:i+n]); i += n
    return out
def fmt(tok):
    # use objdump-like simple decoding via llvm-objdump on a temp file is heavy; print hex with masked imm
    op = tok[0]; dst = tok[1] & 15; src = tok[1] >> 4; off = int.from_bytes(tok[2:4], 'little', signed=True); imm = int.from_bytes(tok[4:8], 'little', signed=True)
    if op == 0x18: return f'lddw r{dst}, <sec>'
    if op == 0x85: return f'call <fn>'
    return f'op{op:02x} r{dst} r{src} off={off} imm={imm}'
txt = subprocess.check_output([OD, '-t', o], text=True)
best = None
for line in txt.splitlines():
    m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
    if m and re.search(rx, m.group(4)): best = (m.group(2), int(m.group(1), 16), int(m.group(3), 16), m.group(4))
sec, off, size, name = best
d = subprocess.check_output([OD, '-d', '--no-show-raw-insn', '-j', sec, o], text=True)
# get text listing of candidate fn
cl = []
started = False
for line in d.splitlines():
    mm = re.match(r'^\s+([0-9a-f]+):\s+(.*)$', line)
    if mm:
        a = int(mm.group(1), 16)
        if off <= a < off + size: cl.append(re.sub(r'\s+<[^>]*>', '', mm.group(2)).strip())
# original listing via win.py orig
ol = subprocess.check_output(['python3', '-B', '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/win.py', 'orig', hex(st)], text=True).splitlines()
ol = [re.sub(r'^0x[0-9a-f]+\s+', '', l).strip() for l in ol if l.startswith('0x')]
def nrm(x):
    x = re.sub(r'^call .*', 'call', x); x = re.sub(r'^lddw (r\d+), .*', r'lddw \1', x); x = re.sub(r'^(j\w+ .*), [+-]?0x[0-9a-f]+$', r'\1, J', x); x = re.sub(r'^ja [+-]?0x[0-9a-f]+$', 'ja J', x)
    return x
a = [nrm(x) for x in ol]; b = [nrm(x) for x in cl]
sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
print(f'{name[:60]} size {size} orig {w["bytes"]}  (jump offsets masked in this view)')
for t, i1, i2, j1, j2 in sm.get_opcodes():
    if t == 'equal': continue
    for k in range(max(0, i1-ctx), i1): print(f'  {k:4d} {ol[k]}')
    for k in range(i1, i2): print(f'- {k:4d} {ol[k]}')
    for k in range(j1, j2): print(f'+ {k:4d} {cl[k]}')
    print('  ...')
