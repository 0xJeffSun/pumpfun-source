#!/usr/bin/env python3
"""selchk.py <ir.ll> <fn-substr>...: for each fn, print #selects and the order of blocks between the Return::get exit and the first fee call block."""
import re, sys
t = open(sys.argv[1]).read()
for fs in sys.argv[2:]:
    m = re.search(r'\ndefine [^\n]*' + fs + r'[^\n]*\{', t)
    if not m: print(fs, 'MISSING'); continue
    f = t[m.end():t.index('\n}\n', m.end())]
    nsel = len(re.findall(r'= select ', f))
    blocks = re.split(r'\n\n', f.strip('\n')); order = []
    for b in blocks:
        ls = [l for l in b.split('\n') if l.strip() and not l.strip().startswith(';')]
        lab = ls[0].split(':')[0] if ':' in ls[0] and not ls[0].startswith(' ') else 'entry'
        hasfee = any('8fee_math3fee' in l for l in ls); hasld = any('i64 112' in l for l in ls)
        order.append(lab[:14] + ('[FEE]' if hasfee else '') + ('[ld112]' if hasld else ''))
    # show the window around the first ld112 / FEE
    idx = [i for i, o in enumerate(order) if 'FEE' in o or 'ld112' in o]
    lo = max(0, (idx[0] if idx else 0) - 2); hi = (idx[1] if len(idx) > 1 else lo + 4) + 3
    print(f"{fs:28s} sel={nsel} :: {' '.join(order[lo:hi])}")
