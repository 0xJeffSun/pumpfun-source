#!/usr/bin/env python3
"""hunks.py <win.py show output file> [orig_start]: summarize diff hunks: orig slot index range, #-, #+, first lines.
A hunk whose -/+ lines differ only by register names is tagged REG."""
import sys, re
lines = open(sys.argv[1]).read().split('\n')
st = int(sys.argv[2], 16) if len(sys.argv) > 2 else None
hunks = []; cur = None; last_o = None
for l in lines:
    m = re.match(r'^([-+ ]) (?:(0x[0-9a-f]+)\s+)?(?:(0x[0-9a-f]+)\s+)?\s*(.*)$', l)
    if not l or l[0] not in '-+ ' or l.startswith('---'): continue
    if l.startswith('  ...'): 
        if cur: hunks.append(cur); cur = None
        continue
    tag = l[0]
    parts = l[2:].split()
    if tag == ' ':
        if cur: hunks.append(cur); cur = None
        try: last_o = int(parts[0], 16)
        except: pass
        continue
    if cur is None: cur = {'o': last_o, '-': [], '+': []}
    txt = re.sub(r'^\s*0x[0-9a-f]+\s+', '', l[2:]).strip()
    txt = re.sub(r'\s*<[^>]*>', '', txt)
    cur[tag].append(txt)
if cur: hunks.append(cur)
def norm(x): return [re.sub(r'r\d+', 'r', re.sub(r'[+-]0x[0-9a-f]+$', '', t)) for t in x]
tot_m = sum(len(h['-']) for h in hunks); tot_p = sum(len(h['+']) for h in hunks)
print(f'hunks={len(hunks)} minus={tot_m} plus={tot_p}')
for h in hunks:
    idx = (h['o'] - st) // 8 if (st and h['o']) else h['o']
    reg = 'REG' if sorted(norm(h['-'])) == sorted(norm(h['+'])) else ''
    print(f"@{idx} -{len(h['-'])} +{len(h['+'])} {reg} | {' ; '.join(h['-'][:3])[:110]} || {' ; '.join(h['+'][:3])[:110]}")
