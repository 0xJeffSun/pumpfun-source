#!/usr/bin/env python3
"""Apply line-level moves inside one function of base.ll; write exp.ll."""
import sys, re
src, out, fn = sys.argv[1], sys.argv[2], sys.argv[3]
moves = sys.argv[4:]  # each "LINEPATTERN=>AFTERPATTERN" (move the matching line after the anchor line)
lines = open(src).read().split('\n')
start = next(i for i, l in enumerate(lines) if l.startswith('define') and fn in l)
end = next(i for i in range(start, len(lines)) if lines[i] == '}')
body = lines[start:end + 1]
for mv in moves:
    pat, anchor = mv.split('=>')
    idx = [i for i, l in enumerate(body) if l.strip().startswith(pat)]
    assert len(idx) == 1, (pat, idx)
    line = body.pop(idx[0])
    aidx = [i for i, l in enumerate(body) if l.strip().startswith(anchor)]
    assert len(aidx) == 1, (anchor, aidx)
    body.insert(aidx[0] + 1, line)
lines[start:end + 1] = body
open(out, 'w').write('\n'.join(lines))
