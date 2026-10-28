#!/usr/bin/env python3
"""irname.py <in.ll> <fnregex> <out.ll>: rename numbered values/labels (%N -> %vN, 'N:' -> 'vN:') inside matched defines."""
import re, sys
src, rx, out = sys.argv[1], re.compile(sys.argv[2]), sys.argv[3]
lines = open(src).read().split('\n'); i = 0; n = 0
while i < len(lines):
    if lines[i].startswith('define ') and rx.search(lines[i]):
        j = i + 1
        while lines[j] != '}':
            l = lines[j]
            l = re.sub(r'^(\d+):', r'v\1:', l)
            l = re.sub(r'%(\d+)\b', r'%v\1', l)
            lines[j] = l; j += 1
        n += 1; i = j
    i += 1
open(out, 'w').write('\n'.join(lines)); print('renamed', n, file=sys.stderr)
