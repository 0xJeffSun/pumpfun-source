#!/usr/bin/env python3
"""irprof.py <in.ll> <out.ll> env FN, BR=<json list of [branch_line_regex, w_true, w_false]>: add branch_weights to matching br lines in FN."""
import sys, os, re, json
src, dst = sys.argv[1], sys.argv[2]
fn = os.environ['FN']; brs = json.loads(os.environ['BR'])
lines = open(src).read().split('\n')
st = next(i for i, l in enumerate(lines) if l.startswith('define') and fn in l)
en = next(i for i in range(st, len(lines)) if lines[i] == '}')
md = []
for k, (rx, wt, wf) in enumerate(brs):
    idx = next(i for i in range(st, en) if re.search(rx, lines[i]))
    mid = 9990000 + k
    lines[idx] = lines[idx] + f', !prof !{mid}'
    md.append(f'!{mid} = !{{!"branch_weights", i32 {wt}, i32 {wf}}}')
lines += md
open(dst, 'w').write('\n'.join(lines))
