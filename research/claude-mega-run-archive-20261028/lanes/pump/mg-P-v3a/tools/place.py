#!/usr/bin/env python3
"""place.py <file.rs> <start_line> <codefile> : overwrite blank lines start..start+n-1 of file.rs with the n lines of codefile
(line-neutral: every target line must be blank). --undo not supported; keep copies."""
import sys
f, start, code = sys.argv[1], int(sys.argv[2]), open(sys.argv[3]).read().rstrip('\n').split('\n')
lines = open(f).read().split('\n')
for i, c in enumerate(code):
    k = start - 1 + i
    assert lines[k].strip() == '', f'line {k+1} not blank: {lines[k][:60]}'
    lines[k] = c
open(f, 'w').write('\n'.join(lines))
print(f'placed {len(code)} lines at {start}..{start+len(code)-1}')
