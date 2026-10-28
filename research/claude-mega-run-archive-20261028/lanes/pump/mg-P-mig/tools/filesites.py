#!/usr/bin/env python3
"""filesites.py <path-substr> [inventory.json] : every ORIGINAL window with a Source site in a file (line list, matched?, symbol)."""
import sys, json, re
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
import coords
from score import original_windows
sub = sys.argv[1]
inv = json.load(open(sys.argv[2] if len(sys.argv) > 2 else '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L27/inventory.json'))['windows']
for w in original_windows():
    st = w['start']
    ss = coords.sites(coords.ORIG, coords.OS, st, w['raw'])
    ls = [s['line'] for s in ss if s.get('path', '').endswith(sub)]
    if ls:
        v = inv.get(str(st), {})
        sym = (v.get('symbols') or ['-'])[0]
        sym = re.sub(r'17h[0-9a-f]{16}E$', '', sym)[-60:]
        print(hex(st), len(w['raw']), 'M' if v.get('normalized') else '-', ls, sym)
