#!/usr/bin/env python3
"""Rank big-lo windows by similarity to the best candidate function (win.py best_candidates)."""
import json, sys
from pathlib import Path
H = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
sys.path.insert(0, str(H))
import win  # noqa
cand_path = Path(sys.argv[1]); targets = json.loads(Path(sys.argv[2]).read_text())
starts = {int(w['start'], 16) for w in targets['windows']}
cand = win.Cand(cand_path)
rows = []
for w in win.original_windows():
    if w['start'] not in starts:
        continue
    bc = win.best_candidates(w, cand, 3)
    rows.append((w['start'], w['bytes'], [(round(r, 4), hex(s), n, win.demangle(nm)[:110]) for r, j, s, n, nm in bc]))
    print(hex(w['start']), w['bytes'], rows[-1][2][:2], flush=True)
Path(sys.argv[3]).write_text(json.dumps(rows, indent=1))
