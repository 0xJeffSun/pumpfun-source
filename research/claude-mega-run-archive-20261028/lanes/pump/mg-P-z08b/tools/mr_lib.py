#!/usr/bin/env python3
"""mr.py <obj|so> <symregex> <orig_start> [--diff N]: size, exact ratio (offsets kept, calls/lddw masked) and masked ratio
(stack offsets + branch targets masked) of the largest symbol matching symregex vs the original window."""
import sys, re, subprocess, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import Cand
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
import csv
rows = {int(r['original_start']): r for r in csv.DictReader(open(W + '/base/functions.tsv'), delimiter='\t') if r['program'] == 'pump' and r['variant'] == 'selected'}
def dis_so(so, a, n):
    out = []
    for line in subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={a+n:#x}', so], text=True).splitlines():
        m = re.match(r'^\s*[0-9a-f]+:\s+(.*)$', line)
        if m: out.append(m.group(1).split('<')[0].strip())
    return out
def dis_sym(o, rx):
    txt = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', o], text=True)
    best = []; cur = None; name = None
    for line in txt.splitlines():
        m = re.match(r'^[0-9a-f]+ <(.*)>:$', line)
        if m and (m.group(1).startswith('LBB') or m.group(1).startswith('.L')): continue
        if m:
            if cur is not None and re.search(rx, name) and len(cur) > len(best): best = cur
            cur = []; name = m.group(1); continue
        m = re.match(r'^\s*[0-9a-f]+:\s+(.*)$', line)
        if m and cur is not None: cur.append(m.group(1).split('<')[0].strip())
    if cur is not None and re.search(rx, name) and len(cur) > len(best): best = cur
    return best

def load(f, rx, st):
    o = dis_so(W + '/base/original.so', st, int(rows[st]['original_end']) - st)
    if f.endswith('.so'):
        c = Cand(f); fs = [(s, n, nm) for (s, n, nm) in c.funcs if re.search(rx, nm)]
        s0, n0, _ = max(fs, key=lambda t: t[1]); cd = dis_so(f, s0, n0)
    else: cd = dis_sym(f, rx)
    return o, cd
