#!/usr/bin/env python3
"""callers.py <target_addr> [so]: list original call sites (pc-relative call imm) to target, with containing window + matched flag."""
import sys, struct, json, subprocess
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
tgt = int(sys.argv[1], 0)
wins = original_windows()
inv = json.load(open(W + '/base/L13/inventory.json'))['windows']
m = {x['start']: bool(x['normalized_matches']) for x in inv} if isinstance(inv, list) else {int(k): v['normalized'] for k, v in inv.items()}
for w in wins:
    raw = w['raw'] if 'raw' in w else None
    if raw is None: continue
    i = 0
    while i < len(raw):
        op = raw[i]
        if op == 0x85 and (raw[i+1] >> 4) == 1:
            imm = struct.unpack('<i', raw[i+4:i+8])[0]
            if w['start'] + i + 8 + imm * 8 == tgt:
                print(hex(w['start']), hex(w['start'] + i), 'matched' if m.get(w['start']) else 'UNMATCHED')
        i += 16 if op == 0x18 else 8
