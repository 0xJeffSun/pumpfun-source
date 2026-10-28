#!/usr/bin/env python3
"""shape.py <win_hex> <cand.so> <symregex> [--hunks N] [--ctx K] : structural diff (registers->R, stack offs->S,
branch offsets->B, call imms->C). Prints ratio and the first N differing hunks (compact)."""
import sys, re, subprocess, difflib, json
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
args = sys.argv[1:]; hunks = 6; ctx = 1
if '--hunks' in args: i = args.index('--hunks'); hunks = int(args[i+1]); del args[i:i+2]
if '--ctx' in args: i = args.index('--ctx'); ctx = int(args[i+1]); del args[i:i+2]
win = int(args[0], 16); so = args[1]; sym = args[2]
inv = json.load(open(W + '/base/L20/inventory.json'))['windows']
size = inv[str(win)]['bytes']
def dis(path, start, stop):
    t = subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={start:#x}', f'--stop-address={stop:#x}', path], capture_output=True, text=True).stdout
    out = []
    for l in t.splitlines():
        m = re.match(r'\s*([0-9a-f]+):\s+(.*)$', l)
        if m and not m.group(2).startswith('<'): out.append((int(m.group(1), 16), m.group(2).split('<')[0].strip()))
    return out
def norm(ins):
    s = re.sub(r'\br10\b', 'FP', ins)
    s = re.sub(r'\br\d\b', 'R', s)
    s = re.sub(r'\[FP - 0x[0-9a-f]+\]', '[S]', s)
    s = re.sub(r'(j\w+ .*)[+-]0x[0-9a-f]+$', r'\1B', s)
    s = re.sub(r'^call -?0x[0-9a-f]+$', 'call C', s)
    return s
o = dis(W + '/base/original.so', win, win + size)
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); from symtab import symtab
cands = [x for x in symtab(so) if re.search(sym, x[2])]
if not cands: print('no symbol', sym); sys.exit(1)
a, sz, name = cands[0]
c = dis(so, a, a + sz)
on = [norm(x[1]) for x in o]; cn = [norm(x[1]) for x in c]
sm = difflib.SequenceMatcher(None, on, cn, autojunk=False)
print(f'{win:#x} {size}B vs {name[:60]} {sz}B  shape-ratio={sm.ratio():.4f}')
k = 0
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal': continue
    k += 1
    if k > hunks: continue
    print(f'@{tag} orig[{i1}:{i2}] {o[i1][0] if i1 < len(o) else 0:#x} cand[{j1}:{j2}]')
    for x in range(max(0, i1 - ctx), i1): print('   ', o[x][1])
    for x in range(i1, min(i2, i1 + 8)): print('  -', o[x][1])
    if i2 - i1 > 8: print(f'  - ... ({i2-i1} total)')
    for x in range(j1, min(j2, j1 + 8)): print('  +', c[x][1])
    if j2 - j1 > 8: print(f'  + ... ({j2-j1} total)')
print(f'{k} hunks')
