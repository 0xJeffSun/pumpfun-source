#!/usr/bin/env python3
"""irmove.py <in.ll> <out.ll>  with env FN=<substring of define line>, OPS=<json list of [move_regex, anchor_regex, 'before'|'after']>
Moves (within FN's body) the first line matching move_regex to before/after the first line matching anchor_regex."""
import sys, os, re, json
src, dst = sys.argv[1], sys.argv[2]
fn = os.environ['FN']; ops = json.loads(os.environ['OPS'])
lines = open(src).read().split('\n')
st = next(i for i, l in enumerate(lines) if l.startswith('define') and fn in l)
en = next(i for i in range(st, len(lines)) if lines[i] == '}')
body = lines[st:en]
for mv, an, pos in ops:
    i = next(k for k, l in enumerate(body) if re.search(mv, l)); line = body.pop(i)
    j = next(k for k, l in enumerate(body) if re.search(an, l))
    body.insert(j if pos == 'before' else j + 1, line)
lines[st:en] = body
open(dst, 'w').write('\n'.join(lines))
