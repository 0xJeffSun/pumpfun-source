#!/usr/bin/env python3
"""Diagnostic relink with --why-extract (archive member extraction order). usage: why.py BUILD_DIR OUT_DIR [extra lld args...]"""
from pathlib import Path
import json, subprocess, sys
build, out = Path(sys.argv[1]), Path(sys.argv[2]); extra = sys.argv[3:]
out.mkdir(parents=True, exist_ok=True)
rep = json.loads((build / 'replay.json').read_text())
args = list(rep['args'])
i = args.index('-o'); args[i + 1] = str(out / 'symbols.so')
args = [('-Map=' + str(out / 'link.map')) if a.startswith('-Map=') else a for a in args]
args += ['--why-extract=' + str(out / 'why.txt')] + extra
r = subprocess.run([rep['real'], *args], capture_output=True, text=True)
print('rc', r.returncode, r.stderr[-500:])
D = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/tools/cache-q434/fast-amm-qualified434-20261027/sbpf-solana-solana/release/deps/'
for l in (out / 'why.txt').read_text().splitlines():
    p = l.split('\t')
    p = [x.replace(D, '').replace('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/', 'WM/') for x in p]
    print(' | '.join(x[:90] for x in p))
