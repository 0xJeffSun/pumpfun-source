#!/usr/bin/env python3
"""Diagnostic link-only replay with --trace-symbol for given symbols (no compile, no lock needed).
usage: python3 -B trace.py BUILD_DIR OUT_DIR sym1 [sym2 ...]
"""
from pathlib import Path
import json, subprocess, sys
build, out, syms = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3:]
out.mkdir(parents=True, exist_ok=True)
rep = json.loads((build / 'replay.json').read_text())
args = list(rep['args'])
i = args.index('-o'); args[i + 1] = str(out / 'symbols.so')
args = [('-Map=' + str(out / 'link.map')) if a.startswith('-Map=') else a for a in args]
for s in syms:
    args += ['--trace-symbol=' + s]
r = subprocess.run([rep['real'], *args], capture_output=True, text=True)
print('rc', r.returncode)
for l in (r.stdout + r.stderr).splitlines():
    l = l.replace('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/tools/cache-q434/fast-amm-qualified434-20261027/sbpf-solana-solana/release/deps/', '')
    print(l[:220])
