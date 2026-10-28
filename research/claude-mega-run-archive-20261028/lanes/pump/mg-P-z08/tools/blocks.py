#!/usr/bin/env python3
"""blocks.py <in.ll> <fnregex> [from_label]: list blocks of fn in order: label, #insns, calls (short), terminator."""
import re, sys
t = open(sys.argv[1]).read(); m = re.search(r'\ndefine [^\n]*' + sys.argv[2] + r'[^\n]*\{', t)
f = t[m.end():t.index('\n}\n', m.end())]
blocks = re.split(r'\n\n', f.strip('\n'))
for b in blocks:
    ls = [l for l in b.split('\n') if l.strip() and not l.strip().startswith(';')]
    if not ls: continue
    lab = ls[0].split(':')[0] if ':' in ls[0] and not ls[0].startswith(' ') else 'entry'
    calls = [re.sub(r'.*call [^@]*@"?([^"(]*)"?\(.*', r'\1', l)[-40:] for l in ls if ' call ' in l and 'lifetime' not in l]
    term = ls[-1].strip()
    term = re.sub(r', !prof !\d+', '', term)
    print(f"{lab:28s} n={len(ls)-1:3d} {' '.join(c.split('17h')[0][-28:] for c in calls)[:70]:70s} | {term[:90]}")
