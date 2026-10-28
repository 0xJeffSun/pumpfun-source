#!/usr/bin/env python3
"""cfgsk.py <orig_start> <obj_or_so> <symregex> [lo hi]: side-by-side skeleton (jumps/calls/exit + jump targets) of the
original window and a candidate function, offsets relative to function start. Range lo..hi (hex offsets) optional."""
import sys, re, subprocess
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st = int(sys.argv[1], 0); f = sys.argv[2]; rx = sys.argv[3]
lo = int(sys.argv[4], 16) if len(sys.argv) > 4 else 0; hi = int(sys.argv[5], 16) if len(sys.argv) > 5 else 1 << 30
w = next(x for x in original_windows() if x['start'] == st)
def dis(path, start, size):
    out = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={start}', f'--stop-address={start+size}', path], text=True)
    res = []
    for l in out.splitlines():
        m = re.match(r'^\s*([0-9a-f]+):\s+(.*)$', l)
        if m: res.append((int(m.group(1), 16) - start, m.group(2).split('<')[0].strip()))
    return res
o = dis('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so', st, len(w['raw']))
# candidate
t = subprocess.check_output([OBJ, '-t', f], text=True); best = None
for line in t.splitlines():
    m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
    if m and re.search(rx, m.group(4)): best = (int(m.group(1), 16), int(m.group(3), 16), m.group(2))
cs, cn, sec = best
if f.endswith('.o'):
    out = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--section={sec}', f], text=True)
    c = []
    for l in out.splitlines():
        m = re.match(r'^\s*([0-9a-f]+):\s+(.*)$', l)
        if m: c.append((int(m.group(1), 16) - cs, m.group(2).split('<')[0].strip()))
    c = [x for x in c if 0 <= x[0] < cn]
else:
    c = dis(f, cs, cn)
def sk(lst):
    tg = set()
    for off, ins in lst:
        m = re.match(r'(j\w+|ja)\b.*?([+-]0x[0-9a-f]+)$', ins)
        if m: tg.add(off + 8 + 8 * int(m.group(2), 16))
    r = []
    for off, ins in lst:
        if not (lo <= off < hi): continue
        mark = 'L' if off in tg else ' '
        if re.match(r'(j\w+|ja|call|exit)', ins) or mark == 'L':
            m = re.match(r'(j\w+|ja)\b(.*?)([+-]0x[0-9a-f]+)$', ins)
            if m: ins = f'{m.group(1)}{m.group(2)}->{off + 8 + 8*int(m.group(3),16):#x}'
            r.append(f'{mark}{off:#06x} {ins}')
    return r
a, b = sk(o), sk(c)
n = max(len(a), len(b))
for i in range(n):
    x = a[i] if i < len(a) else ''; y = b[i] if i < len(b) else ''
    print(f'{x:<44} | {y}')
