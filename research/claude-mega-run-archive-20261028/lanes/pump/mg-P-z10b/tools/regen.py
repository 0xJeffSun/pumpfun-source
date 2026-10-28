#!/usr/bin/env python3
"""regen.py <file.rs> <spec> <first_line> <last_line>: replace lines first..last (inclusive) of file.rs with the spec,
keeping the total line count. Spec lines: '@N|text' = place text exactly on line N; '|text' = next free line;
'#...' comment ignored. Gaps are filled with a '// layout-pad: ...' header + blank lines (header only if gap>=2)."""
import sys
path, spec, first, last = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
src = open(path).read().split('\n')
items = []
for l in open(spec).read().split('\n'):
    if not l.strip() or l.startswith('#'): continue
    if l.startswith('@'):
        n, t = l[1:].split('|', 1); items.append((int(n), t))
    elif l.startswith('|'): items.append((None, l[1:]))
    else: raise SystemExit('bad spec line: ' + l)
out = {}; cur = first
for n, t in items:
    if n is not None:
        if n < cur: raise SystemExit(f'line {n} already passed (cursor {cur}): {t[:60]}')
        cur = n
    if cur > last: raise SystemExit(f'overflow at {t[:60]}')
    out[cur] = t; cur += 1
region = []
ln = first
while ln <= last:
    if ln in out: region.append(out[ln]); ln += 1; continue
    # gap: find its end
    e = ln
    while e <= last and e not in out: e += 1
    gap = e - ln
    if gap >= 2: region.append('// layout-pad: aligns the next Source site with the original lib.rs line'); region += [''] * (gap - 1)
    else: region += [''] * gap
    ln = e
assert len(region) == last - first + 1, (len(region), last - first + 1)
new = src[:first - 1] + region + src[last:]
assert len(new) == len(src)
open(path, 'w').write('\n'.join(new))
print('ok', path, 'region', first, last, 'items', len(items))
