#!/usr/bin/env python3
"""Compare two measurement.json files window by window."""
import sys, json, gzip
from pathlib import Path
def load(p):
    b = Path(p).read_bytes()
    if p.endswith('.gz'): b = gzip.decompress(b)
    return json.loads(b)
a, b = load(sys.argv[1]), load(sys.argv[2])
LO, HI = 0x73ef0, 0xf6eb0
ra = {r['start']: r for r in a['rows']}; rb = {r['start']: r for r in b['rows']}
print('A: norm %d raw %d | B: norm %d raw %d' % (a['normalized_matches'], a['raw_matches'], b['normalized_matches'], b['raw_matches']))
for st in sorted(set(ra) | set(rb)):
    x, y = ra.get(st), rb.get(st)
    nx, ny = bool(x and x['matches']), bool(y and y['matches'])
    rx, ry = bool(x and x['raw_match']), bool(y and y['raw_match'])
    if nx != ny or rx != ry:
        nm = ((x or {}).get('matches') or (y or {}).get('matches') or [{'name': '?'}])[0]['name']
        print('%s %6x %5d  norm %d->%d raw %d->%d  %s' % ('R' if LO <= st <= HI else ' ', st, (x or y)['end'] - st, nx, ny, rx, ry, nm[:100]))
