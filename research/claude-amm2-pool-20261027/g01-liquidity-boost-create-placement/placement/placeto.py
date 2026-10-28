#!/usr/bin/env python3
"""Whitespace-only placement by anchors: insert blank lines so that each anchor line lands on its target line.
usage: placeto.py <in.rs> <out.rs> <spec.json>
spec: [[anchor, target], ...] in file order; anchor = unique substring (first match after previous anchor) or int line no.
Blank lines are inserted immediately before the anchor line (or before line 'before' if anchor given as [sub, target, before_sub]).
Verifies the token stream (whitespace-stripped) is unchanged."""
import json, re, sys
src = open(sys.argv[1]).read().split('\n')
spec = json.load(open(sys.argv[2 + 1]))
out = list(src)
pos = 0  # index in out after previous anchor
final = []
for item in spec:
    anchor, target = item[0], item[1]
    before = item[2] if len(item) > 2 else None
    if isinstance(anchor, int):
        idx = anchor - 1 + (len(out) - len(src))  # not used with mixed; prefer substrings
    else:
        idx = next(i for i in range(pos, len(out)) if anchor in out[i])
    ins_at = idx
    if before is not None:
        ins_at = max(i for i in range(pos, idx + 1) if before in out[i])
    cur = idx + 1
    need = target - cur
    if need < 0:
        sys.exit(f'anchor {anchor!r} already at {cur} > target {target}')
    out[ins_at:ins_at] = [''] * need
    pos = idx + need + 1
    final.append((pos, target, anchor))
    assert out[pos - 1].find(anchor if isinstance(anchor, str) else '') >= 0
tok = lambda s: re.sub(r'\s+', '', s)
assert tok('\n'.join(out)) == tok('\n'.join(src)), 'token stream changed'
open(sys.argv[2], 'w').write('\n'.join(out))
for ln, t, a in final:
    print(f'{ln:5d} (target {t}) {str(a)[:70]}')
