#!/usr/bin/env python3
"""irsub.py <in.ll> <out.ll> with env FN=<define substring>, SUBS=<json list of [regex, replacement]> applied within FN body (first match each, or all if 3rd elem 'all')."""
import sys, os, re, json
src, dst = sys.argv[1], sys.argv[2]
fn = os.environ['FN']; subs = json.loads(os.environ['SUBS'])
lines = open(src).read().split('\n')
st = next(i for i, l in enumerate(lines) if l.startswith('define') and fn in l)
en = next(i for i in range(st, len(lines)) if lines[i] == '}')
body = '\n'.join(lines[st:en])
for s in subs:
    body, n = re.subn(s[0], s[1], body, count=0 if len(s) > 2 else 1)
    if n == 0: sys.exit('no match: ' + s[0])
lines[st:en] = body.split('\n')
open(dst, 'w').write('\n'.join(lines))
