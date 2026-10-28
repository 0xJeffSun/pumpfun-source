#!/usr/bin/env python3
"""lldiff.py <obj.o|so> <orig_start> <symregex> [maxlines]: aligned diff hunks (disassembled) of a function vs the original window."""
import sys, re, subprocess, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
from win import demangle
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
o, st, rx = sys.argv[1], int(sys.argv[2], 0), sys.argv[3]; mx = int(sys.argv[4]) if len(sys.argv) > 4 else 60
w = next(x for x in original_windows() if x['start'] == st)
def dis(path, start=None, stop=None, sec=None):
    a = [OBJ, '-d', '--no-show-raw-insn', '--no-leading-addr']
    if start is not None: a += [f'--start-address={start:#x}', f'--stop-address={stop:#x}']
    if sec: a += ['-j', sec]
    out = subprocess.check_output(a + [path], text=True)
    res = []
    for l in out.splitlines():
        l = l.strip()
        if not l or l.endswith(':') or l.startswith('Disassembly') or 'file format' in l: continue
        l = re.sub(r'\s+<[^>]*>', '', l); l = re.sub(r'\s+', ' ', l)
        l = re.sub(r'^call -?0x[0-9a-f]+$', 'call X', l); l = re.sub(r'^call \S+$', 'call X', l)
        l = re.sub(r'^lddw (r\d+), 0x[0-9a-f]+$', r'lddw \1, X', l)
        res.append(l)
    return res
a = dis('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so', st, st + w['bytes'])
txt = subprocess.check_output([OBJ, '-t', o], text=True)
best = None
for line in txt.splitlines():
    m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
    if m and (re.search(rx, m.group(4)) or re.search(rx, re.sub(r'::h[0-9a-f]{16}$','',demangle(m.group(4))))) and (best is None or int(m.group(3),16)>best[2]): best = (m.group(2), int(m.group(1), 16), int(m.group(3), 16))
sec, off, size = best
if o.endswith('.o'):
    b = dis(o, off, off + size, sec)
else:
    b = dis(o, off, off + size)
sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
n = 0
for t, i1, i2, j1, j2 in sm.get_opcodes():
    if t == 'equal': continue
    print(f'@{i1} ({st + 8*i1:#x}) {t}')
    for k in range(i1, i2): print('  -', a[k]); n += 1
    for k in range(j1, j2): print('  +', b[k]); n += 1
    if n > mx: print('...'); break
print(f'size {size} vs {w["bytes"]}, ratio {sm.ratio():.4f}')
