#!/usr/bin/env python3
"""xfn.py <in.ll> <fnregex> <out.ll>: keep the body of functions whose define line matches fnregex; turn every other
definition into a declaration (module otherwise unchanged)."""
import re, sys
src, rx, out = sys.argv[1], re.compile(sys.argv[2]), sys.argv[3]
lines = open(src).read().split('\n')
res = []; i = 0; kept = 0
LINK = r'\b(internal|private|linkonce_odr|linkonce|weak_odr|weak|available_externally|dso_local|hidden|protected)\s+'
while i < len(lines):
    l = lines[i]
    if l.startswith('define '):
        j = i
        while lines[j] != '}': j += 1
        if rx.search(l):
            res.extend(lines[i:j+1]); kept += 1
        else:
            d = l[:-2] if l.endswith(' {') else l
            d = 'declare ' + d[len('define '):]
            d = re.sub(LINK, '', d)
            d = re.sub(r'\s+personality\s+ptr\s+@\S+', '', d)
            d = re.sub(r'\s+comdat(\([^)]*\))?', '', d)
            d = re.sub(r'\s+!prof\s+!\d+', '', d)
            res.append(d)
        i = j + 1; continue
    if re.match(r'^@\S+ = .*\balias\b', l): i += 1; continue
    res.append(l); i += 1
open(out, 'w').write('\n'.join(res))
print('kept', kept, file=sys.stderr)
