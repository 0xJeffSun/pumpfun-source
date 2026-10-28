#!/usr/bin/env python3
"""filesites.py <substr>: every original window with Source sites in a file matching substr -> (window, size, lines, matched?, cand sym)."""
import sys, json
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W+'/harness')
import coords
from score import original_windows
inv=json.load(open(W+'/base/L30/inventory.json'))['windows']
sub=sys.argv[1]
for w in original_windows():
    try: ss=coords.orig_sites(w['start'])
    except Exception as e: continue
    ls=[s['line'] for s in ss if sub in s['path']]
    if ls:
        v=inv[str(w['start'])]; print(hex(w['start']), w['bytes'], ls, 'N' if v['normalized'] else '-', (v['symbols'] or [''])[0][-70:])
