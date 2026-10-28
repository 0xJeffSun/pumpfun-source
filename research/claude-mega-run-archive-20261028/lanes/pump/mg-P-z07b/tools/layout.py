#!/usr/bin/env python3
"""layout.py: replace lines [A,B] of a file with a block laid out on target lines.
Block spec: list of lines; a line starting with '@NNN ' must land on line NNN (pad block inserted before it).
The region is padded at the end so it ends exactly on line B (file length unchanged).
usage: from layout import relayout; relayout(path_in, path_out, A, B, spec_text)"""
import sys

def pad(n):
    if n <= 0: return []
    return ['// layout-pad(%d): aligns the next Source site with the original line' % n] + [''] * (n - 1)

def relayout(src_lines, A, B, spec):
    out = []
    cur = A
    for raw in spec.split('\n'):
        if raw.startswith('@'):
            num, _, text = raw[1:].partition(' ')
            t = int(num)
            if cur > t: raise SystemExit(f'cannot place line {t}: already at {cur}: {text!r}')
            p = pad(t - cur); out += p; cur += len(p)
            out.append(text); cur += 1
        else:
            out.append(raw); cur += 1
    if cur > B + 1: raise SystemExit(f'region overflow: ends at {cur - 1} > {B}')
    out += pad(B + 1 - cur)
    return src_lines[:A - 1] + out + src_lines[B:]

if __name__ == '__main__':
    path_in, path_out, A, B, spec_file = sys.argv[1:6]
    lines = open(path_in).read().split('\n')
    spec = open(spec_file).read().rstrip('\n')
    new = relayout(lines, int(A), int(B), spec)
    assert len(new) == len(lines), (len(new), len(lines))
    open(path_out, 'w').write('\n'.join(new))
