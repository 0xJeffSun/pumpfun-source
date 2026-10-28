#!/usr/bin/env python3
"""wsearch.py <module.ll> <fnregex> <orig_start> <tag> [--passes N] [--init i=a:b,...] [--only i,j]
Coordinate-descent over branch_weights on every `br i1` of the function (llc + sacmp), minimizing diffslots.
Prints the best assignment. Weights are (true,false) pairs."""
import sys, re, subprocess, os, itertools, argparse
from concurrent.futures import ThreadPoolExecutor
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-res2'
LLC = '/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
ap = argparse.ArgumentParser(); ap.add_argument('mod'); ap.add_argument('fn'); ap.add_argument('orig'); ap.add_argument('tag')
ap.add_argument('--passes', type=int, default=2); ap.add_argument('--init', default=''); ap.add_argument('--only', default='')
ap.add_argument('--opts', default='1:1,1:2000,2000:1,12:20,20:12,1:4,4:1,1:64,64:1')
a = ap.parse_args()
s = open(a.mod).read()
m = re.search(r'\ndefine [^\n]*' + a.fn + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
f = s[st:en].split('\n')
bidx = [i for i, l in enumerate(f) if re.match(r'^\s+br i1 ', l)]
OPTS = [None] + [tuple(int(x) for x in o.split(':')) for o in a.opts.split(',')]
os.makedirs(f'{L}/llx/ws', exist_ok=True)
def run(assign, k):
    ff = list(f); md = []
    for j, w in assign.items():
        if w is None: continue
        i = bidx[j]; mid = 900000 + j
        ff[i] = ff[i] + f', !prof !{mid}'
        md.append(f'!{mid} = !{{!"branch_weights", i32 {w[0]}, i32 {w[1]}}}')
    out = f'{L}/llx/ws/{a.tag}_{k}.ll'
    open(out, 'w').write(s[:st] + '\n'.join(ff) + s[en:] + '\n' + '\n'.join(md) + '\n')
    r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', out[:-3] + '.o'], capture_output=True, text=True)
    if r.returncode: return (10**6, 'llcfail')
    o = subprocess.run(['python3', '-B', f'{L}/tools/sacmp.py', out[:-3] + '.o', a.orig, a.fn], capture_output=True, text=True).stdout.strip().splitlines()[-1]
    d = int(re.search(r'diffslots=(\d+)', o).group(1)); sz = re.search(r'size (\d+) \(orig (\d+)\)', o)
    pen = 0 if sz.group(1) == sz.group(2) else 1000
    return (d + pen, o)
assign = {j: None for j in range(len(bidx))}
for kv in filter(None, a.init.split(',')):
    j, w = kv.split('='); assign[int(j)] = tuple(int(x) for x in w.split(':'))
only = [int(x) for x in a.only.split(',')] if a.only else list(range(len(bidx)))
best = run(assign, 'base'); print('start', best[1], flush=True)
for p in range(a.passes):
    improved = False
    for j in only:
        cands = []
        for w in OPTS:
            if w == assign[j]: continue
            t = dict(assign); t[j] = w; cands.append((w, t))
        with ThreadPoolExecutor(4) as ex:
            res = list(ex.map(lambda c: run(c[1], f'{j}_{OPTS.index(c[0])}'), cands))
        for (w, t), r in zip(cands, res):
            if r[0] < best[0]:
                best = r; assign = t; improved = True
                print(f'pass{p} br{j} -> {w}: {r[1]}', flush=True)
    if not improved: break
print('BEST', best[1]); print('ASSIGN', {j: w for j, w in assign.items() if w is not None})
