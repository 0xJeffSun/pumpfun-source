#!/usr/bin/env python3
"""place.py <orig file> <template> <first line> <last line> <out file>
Replace lines [first..last] of <orig file> with the template, keeping every other line in place.
Template lines starting with '@N ' must land exactly on line N (pads '// layout-pad(k): ...' + blanks inserted before);
other lines are placed sequentially. The region is padded at the end to keep the file's line count."""
import sys
src, tpl, first, last, out = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
L = open(src).read().split('\n')
head, tail = L[:first - 1], L[last:]
res = []; cur = first
def pad(k):
    global cur
    if k <= 0: return
    res.append('// layout-pad(%d): aligns the next Source site with the original line' % k); res.extend([''] * (k - 1)); cur += k
for t in open(tpl).read().rstrip('\n').split('\n'):
    if t.startswith('@'):
        n, _, body = t[1:].partition(' ')
        n = int(n)
        if n < cur: sys.exit('line %d already passed (cur %d): %s' % (n, cur, body[:60]))
        pad(n - cur); res.append(body); cur += 1
    else:
        res.append(t); cur += 1
if cur > last + 1: sys.exit('region overflow: ends at %d > %d' % (cur - 1, last))
pad(last + 1 - cur)
open(out, 'w').write('\n'.join(head + res + tail))
print('ok', len(head + res + tail), 'lines')
