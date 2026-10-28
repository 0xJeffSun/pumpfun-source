#!/usr/bin/env python3
"""llgrid.py <module.ll> <fnregex> <orig_start> <weights e.g. 1:8,1:1,8:1> <branch-substr> [<branch-substr>...]
For every combination of weights over the given br lines (identified by a unique substring), append !prof and llc+sacmp."""
import sys, re, subprocess, itertools
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06'
LLC = '/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
mod, fn, orig, ws = sys.argv[1:5]; subs = sys.argv[5:]
ws = [tuple(map(int, w.split(':'))) for w in ws.split(',')]
s = open(mod).read()
m = re.search(r'\ndefine [^\n]*' + fn + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
f0 = s[st:en]; lines0 = f0.split('\n')
idx = []
for sub in subs:
    c = [k for k, l in enumerate(lines0) if sub in l and l.strip().startswith('br ')]
    assert len(c) == 1, (sub, len(c)); idx.append(c[0])
for combo in itertools.product(ws, repeat=len(subs)):
    lines = list(lines0); md = ''
    for n, (k, w) in enumerate(zip(idx, combo)):
        lines[k] = re.sub(r', !prof !\d+$', '', lines[k]) + f', !prof !9999{n}'
        md += f'!9999{n} = !{{!"branch_weights", i32 {w[0]}, i32 {w[1]}}}\n'
    out = f'{L}/llx/grid.ll'
    open(out, 'w').write(s[:st] + '\n'.join(lines) + s[en:] + '\n' + md)
    subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/grid.o'], check=True)
    o = subprocess.run(['python3', '-B', f'{L}/../plainbody/tools/sacmp.py', f'{L}/llx/grid.o', orig, fn], capture_output=True, text=True).stdout.strip()
    print(combo, o.split(':', 1)[-1].strip(), flush=True)
