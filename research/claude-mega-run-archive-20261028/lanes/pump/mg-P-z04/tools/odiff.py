#!/usr/bin/env python3
"""odiff.py <obj.o|so> <fn-substring> <win_hex> [--shape] [--n 40]: aligned diff (normalized like scorer: call imm, lddw masked)."""
import sys, re, subprocess, difflib, json
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
a = sys.argv[1:]; shape = '--shape' in a; a = [x for x in a if x != '--shape']
n = 40
if '--n' in a: i = a.index('--n'); n = int(a[i+1]); del a[i:i+2]
skip = 0
if '--skip' in a: i = a.index('--skip'); skip = int(a[i+1]); del a[i:i+2]
obj, fn, win = a[0], a[1], int(a[2], 16)
inv = json.load(open(W + '/base/L20/inventory.json'))['windows']; size = inv[str(win)]['bytes']
def parse(t):
    out = []
    for l in t.splitlines():
        m = re.match(r'\s*([0-9a-f]+):\s+(.*)$', l)
        if m and not m.group(2).startswith('<'): out.append(m.group(2).split('<')[0].strip())
    return out
o = parse(subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={win:#x}', f'--stop-address={win+size:#x}', W + '/base/original.so'], capture_output=True, text=True).stdout)
syms = subprocess.run([OD, '-t', obj], capture_output=True, text=True).stdout
name = next((l.split()[-1] for l in syms.splitlines() if fn in l and ' F ' in l), None) if obj.endswith('.o') else None
if obj.endswith('.o'):
    c = parse(subprocess.run([OD, '-d', '--no-show-raw-insn', f'--section=.text.{name}', obj], capture_output=True, text=True).stdout)
else:
    sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); from symtab import symtab
    st, sz, _ = next(x for x in symtab(obj) if fn in x[2])
    c = parse(subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={st:#x}', f'--stop-address={st+sz:#x}', obj], capture_output=True, text=True).stdout)
def norm(s):
    s = re.sub(r'^call -?0x[0-9a-f]+$', 'call C', s); s = re.sub(r'^lddw (r\d), 0x[0-9a-f]+$', r'lddw \1, K', s)
    if shape:
        s = re.sub(r'\br\d\b', 'R', s); s = re.sub(r'\[r10 - 0x[0-9a-f]+\]', '[S]', s)
    return s
on = [norm(x) for x in o]; cn = [norm(x) for x in c]
sm = difflib.SequenceMatcher(None, on, cn, autojunk=False)
print(f'{len(o)} vs {len(c)} insns ratio={sm.ratio():.4f}')
shown = 0; k = 0
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal': continue
    k += 1
    if k <= skip: continue
    print(f'@{i1}/{j1} {tag}')
    for x in range(i1, i2): print('  -', o[x]); shown += 1
    for x in range(j1, j2): print('  +', c[x]); shown += 1
    if shown > n: break
