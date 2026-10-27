#!/usr/bin/env python3
"""Whitespace-only line placement (token stream must be unchanged).
spec: {"file": path, "ops": [...], "expect": [[orig_line, target_line, "substring"], ...]}
ops (ORIGINAL 1-based line numbers):
  ["blank", L, n]      insert n blank lines before original line L
  ["split", L, "sub"]  break original line L before first occurrence of sub (continuation gets indent+4)
  ["join", L]          join original line L+1 onto line L"""
import sys, json, re

def apply(src, ops):
    blanks, splits, joins = {}, {}, set()
    for op in ops:
        if op[0] == 'blank': blanks[op[1]] = blanks.get(op[1], 0) + op[2]
        elif op[0] == 'split': splits[op[1]] = op[2]
        elif op[0] == 'join': joins.add(op[1])
    out, origin = [], []   # origin[k] = set of original lines contributing to output line k+1
    i, n = 1, len(src)
    while i <= n:
        for _ in range(blanks.get(i, 0)):
            out.append(''); origin.append(set())
        text = src[i-1]; contrib = {i}; j = i
        while j in joins:
            text = text.rstrip() + ' ' + src[j].lstrip(); j += 1; contrib.add(j)
        if i in splits:
            sub = splits[i]; k = text.index(sub)
            indent = re.match(r'\s*', text).group(0)
            out.append(text[:k].rstrip()); origin.append(set(contrib))
            out.append(indent + '    ' + text[k:].lstrip()); origin.append(set(contrib))
        else:
            out.append(text); origin.append(contrib)
        i = j + 1
    return out, origin

def tok(s): return re.sub(r'\s+', '', s)

if __name__ == '__main__':
    spec = json.load(open(sys.argv[1]))
    src = open(spec['file']).read().split('\n')
    out, origin = apply(src, spec['ops'])
    assert tok('\n'.join(out)) == tok('\n'.join(src)), 'token stream changed'
    bad = 0
    for L, want, sub in spec.get('expect', []):
        got = [k+1 for k, o in enumerate(origin) if L in o and sub in out[k]]
        ok = got == [want]; bad += not ok
        print(f"{'ok ' if ok else 'BAD'} orig {L:4d} want {want:4d} got {got} : {sub}")
    if bad and not spec.get('force'):
        sys.exit('placement mismatch; file not written')
    open(spec['file'], 'w').write('\n'.join(out))
    print('written', spec['file'], len(out), 'lines')
