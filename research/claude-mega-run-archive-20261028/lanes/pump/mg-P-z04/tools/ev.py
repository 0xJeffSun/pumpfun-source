#!/usr/bin/env python3
"""ev.py <so> <win>[:symregex] ... : similarity of candidate fn(s) vs original windows (short)."""
import sys, subprocess, re
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
so = sys.argv[1]
for spec in sys.argv[2:]:
    win, _, sym = spec.partition(':')
    cmd = ['python3', '-B', W + '/harness/win.py', 'show', win, '--cand', so, '--full']
    if sym: cmd += ['--sym', sym]
    out = subprocess.run(cmd, capture_output=True, text=True, cwd=W + '/harness').stdout
    hdr = [l for l in out.splitlines() if l.startswith('--- diff vs')]
    m = re.search(r'diff vs (.*) @ (0x[0-9a-f]+) \(ratio ([0-9.]+)', hdr[0]) if hdr else None
    body = out.splitlines()
    minus = sum(1 for l in body if l.startswith('-') and not l.startswith('---'))
    plus = sum(1 for l in body if l.startswith('+'))
    first = body[1] if len(body) > 1 else ''
    if m: print(f'{win} ratio={m.group(3)} -{minus} +{plus} {m.group(1)[:70]} @{m.group(2)} | {first.strip()[:60]}')
    else: print(win, 'NO-CAND', (out.strip().splitlines() or ['?'])[-1][:120])
