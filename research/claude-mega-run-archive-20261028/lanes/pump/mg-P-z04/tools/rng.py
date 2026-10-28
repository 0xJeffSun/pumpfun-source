#!/usr/bin/env python3
"""rng.py orig <win_hex> <i0> <i1> [grep]  |  rng.py <so> <symregex> <i0> <i1> [grep]: instructions by index (short)."""
import sys, re, subprocess
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
a1, a2, i0, i1 = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]); pat = sys.argv[5] if len(sys.argv) > 5 else None
if a1 == 'orig':
    import json; inv = json.load(open(W + '/base/L20/inventory.json'))['windows']
    start = int(a2, 16); stop = start + inv[str(start)]['bytes']; so = W + '/base/original.so'
else:
    from symtab import symtab
    so = a1; start, sz, _ = next(x for x in symtab(so) if re.search(a2, x[2])); stop = start + sz
t = subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={start:#x}', f'--stop-address={stop:#x}', so], capture_output=True, text=True).stdout
ins = [l.split('<')[0].strip() for l in t.splitlines() if re.match(r'\s*[0-9a-f]+:\s', l)]
for i in range(i0, min(i1, len(ins))):
    s = re.sub(r'^[0-9a-f]+:\s+', '', ins[i])
    if pat is None or re.search(pat, s): print(i, s)
