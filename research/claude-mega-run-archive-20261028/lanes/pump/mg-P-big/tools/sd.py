#!/usr/bin/env python3
"""sd.py <orig_start> <cand.so> <symregex> [--stack] [--regs] [--from IDX] [--to IDX] [--hunks K] [--lines H] [--quiet]
Structural diff of a candidate function vs an original window on objdump text.
Default masks: branch offsets, call immediates, lddw section pointers (value), r10 frame offsets
(use --stack to KEEP frame offsets). --regs also masks register numbers.
Prints ratio of the masked text diff and the first K differing hunks (H lines each side), orig slot index first."""
import sys, re, difflib
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W + '/harness')
import win
from score import original_windows
args = [a for a in sys.argv[1:] if not a.startswith('--')]
opt = {}
av = sys.argv[1:]
for i, a in enumerate(av):
    if a.startswith('--'):
        if a in ('--stack', '--regs', '--quiet', '--allhunks'): opt[a[2:]] = True
        else: opt[a[2:]] = int(av[i + 1])
st = int(args[0], 0); cpath = args[1]; rx = args[2]
w = next(x for x in original_windows() if x['start'] == st)
c = win.Cand(cpath)
cs = [(s, n, nm) for (s, n, nm) in c.funcs if re.search(rx, nm) or re.search(rx, win.demangle(nm))]
s, n, nm = max(cs, key=lambda x: x[1]) if len(cs) > 1 else cs[0]
def lst(path, a, b):
    t = win.objdump_text(path, a, b); out = []
    prev = ''
    for pc in sorted(t):
        x = re.sub(r'\s*<[^>]*>', '', t[pc]).strip()
        x = re.sub(r'^(j\w+ [^,]+(, [^,]+)?), [+-]0x[0-9a-f]+$', r'\1, J', x)
        x = re.sub(r'^ja [+-]0x[0-9a-f]+$', 'ja J', x)
        x = re.sub(r'^call -?0x[0-9a-f]+$', 'call F', x)
        if x.startswith('lddw'):
            m = re.match(r'lddw (r\d+), (0x[0-9a-f]+)$', x)
            if m and int(m.group(2), 16) >= 0x100000: x = 'lddw %s, P' % m.group(1)
        if not opt.get('stack'):
            x = re.sub(r'\[r10 - 0x[0-9a-f]+\]', '[r10-S]', x)
            m = re.match(r'add64 (r\d+), -0x([0-9a-f]+)$', x)
            if m and re.match(r'mov64 %s, r10$' % m.group(1), prev): x = 'add64 %s, -S' % m.group(1)
        if opt.get('regs'): x = re.sub(r'\br\d\b', 'R', x)
        prev = t[pc]
        out.append(x)
    return out
o = lst(win.BASE / 'original.so', st, st + w['bytes']); k = lst(c.path, s, s + n)
sm = difflib.SequenceMatcher(None, o, k, autojunk=False)
ops = [x for x in sm.get_opcodes() if x[0] != 'equal']
lo, hi = opt.get('from', 0), opt.get('to', 10 ** 9)
ops = [x for x in ops if x[2] > lo and x[1] < hi]
print('%s %dB vs orig %dB  ratio=%.4f  hunks=%d  diffslots o=%d c=%d' % (win.demangle(nm)[-40:], n, w['bytes'], sm.ratio(), len(ops),
      sum(i2 - i1 for _, i1, i2, _, _ in ops), sum(j2 - j1 for _, _, _, j1, j2 in ops)))
if opt.get('quiet'): sys.exit()
K = opt.get('hunks', 12); H = opt.get('lines', 6)
for tag, i1, i2, j1, j2 in ops[:K]:
    print('@o%d c%d %s -%d +%d' % (i1, j1, tag, i2 - i1, j2 - j1))
    for x in o[i1:min(i2, i1 + H)]: print('  - ' + x)
    if i2 - i1 > H: print('  - ...')
    for x in k[j1:min(j2, j1 + H)]: print('  + ' + x)
    if j2 - j1 > H: print('  + ...')
