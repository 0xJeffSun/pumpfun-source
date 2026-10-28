#!/usr/bin/env python3
"""ocalls.py <orig_start> : list call targets of an original window with the matched L27 symbol names (if matched)."""
import json, re, subprocess, sys
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W + '/harness')
from score import original_windows
from win import insns, ORIG_SECS
inv = json.load(open(W + '/base/L27/inventory.json'))['windows']
st = int(sys.argv[1], 0)
w = next(x for x in original_windows() if x['start'] == st)
ws = {x['start']: x for x in original_windows()}
def name(a):
    k = hex(a)
    e = inv.get(k) or inv.get(k.replace('0x', '0x0'))
    if e and e.get('symbols'):
        s = subprocess.run(['c++filt'], input=e['symbols'][0], capture_output=True, text=True).stdout.strip()
        return ('M ' if e.get('normalized') else 'U ') + s[:110]
    return '?'
for pc, raw, txt in insns(w['raw'], st, ORIG_SECS):
    if raw[0] == 0x85 and (raw[1] >> 4) == 1:
        imm = int.from_bytes(raw[4:8], 'little', signed=True)
        t = pc + 8 + imm * 8
        print(hex(pc), hex(t), name(t))
