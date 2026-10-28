#!/usr/bin/env python3
"""blkperm.py <module.ll> <fnregex> <orig_start> [--list] [--move]: split fn into basic blocks; --list prints blocks;
default: try moving each block (except entry) to every other position; prints best results."""
import sys, re, subprocess
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
LLC = '/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
mod, fn, orig = sys.argv[1:4]; opts = sys.argv[4:]
s = open(mod).read()
m = re.search(r'\ndefine [^\n]*' + fn + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
f = s[st:en]; lines = f.split('\n')
head = lines[:2]  # '' + define line
body = lines[2:]
blocks = []; cur = None
for l in body:
    mm = re.match(r'^("[^"]+"|[\w.$-]+):', l)
    if mm and not l.startswith(' '):
        cur = [mm.group(1), [l]]; blocks.append(cur); continue
    if cur is None:
        cur = ['start', []]; blocks.append(cur)
    cur[1].append(l)
def short(n): return n if len(n) < 40 else n[:18] + '..' + n[-18:]
if '--list' in opts:
    for k, (n, ls) in enumerate(blocks): print(k, short(n), len(ls))
    sys.exit()
def run(order, tag='perm'):
    out = f'{L}/llx/{tag}.ll'
    nb = []
    for k in order: nb.extend(blocks[k][1])
    open(out, 'w').write(s[:st] + '\n'.join(head + nb) + s[en:])
    r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/{tag}.o'], capture_output=True, text=True)
    if r.returncode: return 'LLC FAIL'
    o = subprocess.run(['python3', '-B', f'{L}/../plainbody/tools/sacmp.py', f'{L}/llx/{tag}.o', orig, fn], capture_output=True, text=True).stdout.strip()
    return o.split(':', 1)[-1].strip()
if '--order' in opts:
    order = list(map(int, opts[opts.index('--order') + 1].split(',')))
    print(run(order, 'perm_sel')); sys.exit()
N = len(blocks); res = []
for b in range(1, N):
    for p in range(1, N):
        if p == b: continue
        order = [k for k in range(N) if k != b]; order.insert(p, b)
        o = run(order)
        d = int(re.search(r'diffslots=(\d+)', o).group(1)) if 'diffslots' in o else 9999
        res.append((d, b, p, o))
res.sort()
for r in res[:12]: print(r[0], 'move', r[1], short(blocks[r[1]][0]), 'to', r[2], '|', r[3])
