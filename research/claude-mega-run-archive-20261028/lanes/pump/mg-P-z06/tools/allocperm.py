#!/usr/bin/env python3
"""allocperm.py <module.ll> <fnregex> <orig_start> [--top N]: try moving each entry-block alloca to every other alloca position."""
import sys, re, subprocess
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06'
LLC = '/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
mod, fn, orig = sys.argv[1:4]; top = int(sys.argv[sys.argv.index('--top')+1]) if '--top' in sys.argv else 10
s = open(mod).read()
m = re.search(r'\ndefine [^\n]*' + fn + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
f = s[st:en]; lines = f.split('\n')
idx = [k for k, l in enumerate(lines) if re.match(r'^  %\S+ = alloca ', l)]
assert idx == list(range(idx[0], idx[0] + len(idx)))
A = [lines[k] for k in idx]
def run(order, tag='ap'):
    nl = lines[:idx[0]] + [A[k] for k in order] + lines[idx[-1]+1:]
    out = f'{L}/llx/{tag}.ll'; open(out, 'w').write(s[:st] + '\n'.join(nl) + s[en:])
    r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/{tag}.o'], capture_output=True, text=True)
    if r.returncode: return 9999, 'FAIL'
    o = subprocess.run(['python3', '-B', f'{L}/../plainbody/tools/sacmp.py', f'{L}/llx/{tag}.o', orig, fn], capture_output=True, text=True).stdout.strip()
    d = int(re.search(r'diffslots=(\d+)', o).group(1)); return d, o.split(':', 1)[1].strip()
if '--order' in sys.argv:
    order = list(map(int, sys.argv[sys.argv.index('--order')+1].split(','))); print(run(order, 'ap_sel')); sys.exit()
N = len(A); res = []
base = run(list(range(N)))
print('base', base[1])
for a in range(N):
    for p in range(N):
        if p == a: continue
        order = [k for k in range(N) if k != a]; order.insert(p, a)
        d, o = run(order); res.append((d, a, p, o))
res.sort()
for r in res[:top]: print(r[0], 'move', r[1], A[r[1]].split('=')[0].strip(), 'to', r[2], '|', r[3])
