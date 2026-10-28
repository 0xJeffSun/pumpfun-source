#!/usr/bin/env python3
"""sitecodes.py <orig_start>|<so> <sym>: for each Source site in the window/function, show line and nearby error-code immediates (6000-6200, 2000-4100)."""
import sys, json, subprocess, re
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0, W + '/harness')
from win import Cand
import csv
rows = {int(r['original_start']): r for r in csv.DictReader(open(W + '/base/functions.tsv'), delimiter='\t') if r['program'] == 'pump' and r['variant'] == 'selected'}
if len(sys.argv) == 2:
    st = int(sys.argv[1], 16); so = W + '/base/original.so'; n = int(rows[st]['original_end']) - st
    js = json.loads(subprocess.check_output([sys.executable, '-B', W + '/harness/coords.py', 'window', sys.argv[1]], text=True))
else:
    so = sys.argv[1]; c = Cand(so); fs = [(s, n, nm) for (s, n, nm) in c.funcs if re.search(sys.argv[2], nm)]; st, n, _ = max(fs, key=lambda t: t[1])
    js = json.loads(subprocess.check_output([sys.executable, '-B', W + '/harness/coords.py', 'fn', hex(st), '--cand', so], text=True))
lines = []
for line in subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={st:#x}', f'--stop-address={st+n:#x}', so], text=True).splitlines():
    m = re.match(r'^\s*([0-9a-f]+):\s+(.*)$', line)
    if m: lines.append((int(m.group(1), 16) - st, m.group(2).split('<')[0].strip()))
for s in js:
    k = next(i for i, (p, _) in enumerate(lines) if p >= s['slot'])
    codes = []
    for p, t in lines[max(0, k - 40):k + 40]:
        for v in re.findall(r'0x([0-9a-f]+)$', t):
            x = int(v, 16)
            if 6000 <= x <= 6200 or 2000 <= x <= 4100: codes.append(x)
    print(s['path'].split('/')[-1], s['line'], 'insn', k, 'codes', sorted(set(codes)))
