#!/usr/bin/env python3
"""Compare two measure.py outputs: normalized/raw gains and losses."""
import json, sys
a = json.load(open(sys.argv[1])); b = json.load(open(sys.argv[2]))
def sets(m):
    n = {r['start'] for r in m['rows'] if r['matches']}
    r = {r['start'] for r in m['rows'] if r['raw_match']}
    size = {r['start']: r['end'] - r['start'] for r in m['rows']}
    return n, r, size
an, ar, sz = sets(a); bn, br, _ = sets(b)
print(f"norm {len(an)} -> {len(bn)}   raw {len(ar)} -> {len(br)}")
print('  norm gained:', [f'{x:#x}/{sz[x]}' for x in sorted(bn - an)])
print('  norm LOST  :', [f'{x:#x}/{sz[x]}' for x in sorted(an - bn)])
print('  raw gained :', [f'{x:#x}' for x in sorted(br - ar)])
print('  raw LOST   :', [f'{x:#x}' for x in sorted(ar - br)])
