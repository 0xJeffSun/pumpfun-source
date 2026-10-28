#!/usr/bin/env python3
"""ocalls.py <orig_window_start> [score.json]: list internal calls in the ORIGINAL window (offset, target, matched symbol of target window)."""
import sys, struct, json, re
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
st = int(sys.argv[1], 0)
sc = json.load(open(sys.argv[2] if len(sys.argv) > 2 else '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03/runs/m02/score.json'))['windows']
wins = {w['start']: w for w in original_windows()}
w = wins[st]; raw = w['raw']; i = 0
def name(t):
    v = sc.get(str(t))
    if not v: return '?'
    s = v['symbols'][0] if v['symbols'] else ('UNMATCHED' if not v['normalized'] else '?')
    s = re.sub(r'17h[0-9a-f]{16}E$', '', s); return s[-70:]
while i < len(raw):
    op = raw[i]
    if op == 0x85:
        imm = struct.unpack('<i', raw[i+4:i+8])[0]
        if (raw[i+1] >> 4) == 1:
            t = st + i + 8 + imm * 8
            print(hex(st + i), hex(t), name(t) if t in wins else 'not-a-window')
        else:
            print(hex(st + i), 'syscall', hex(imm & 0xffffffff))
    i += 16 if op == 0x18 else 8
