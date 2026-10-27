#!/usr/bin/env python3
"""Show differing instructions between an original window and a candidate symbol (normalized)."""
import sys, argparse, difflib
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from common import *
from sbpf import listing
ap = argparse.ArgumentParser()
ap.add_argument('orig', type=lambda x: int(x, 0))
ap.add_argument('name', help='candidate symbol substring or 0xaddr')
ap.add_argument('--candidate', default=str(FRONT / 'results/build/candidate.so'))
ap.add_argument('--symbols', default=str(FRONT / 'results/build/unstripped.so'))
ap.add_argument('--context', type=int, default=2)
ap.add_argument('--all', action='store_true')
a = ap.parse_args()
o = Elf(ORIG); c = Elf(Path(a.candidate)); s = Elf(Path(a.symbols))
wins = dict(windows(o))
st = a.orig; en = wins[st]
if a.name.startswith('0x'):
    f = next(f for f in s.funcs if f['start'] == int(a.name, 16))
else:
    fs = [f for f in s.funcs if a.name in f['name']]
    fs.sort(key=lambda f: abs(f['size'] - (en - st)))
    f = fs[0]
print('orig %x..%x (%d)  cand %x %d %s' % (st, en, en - st, f['start'], f['size'], f['name'][:120]))
ol = listing(o.normalized, st, en); cl = listing(c.normalized, f['start'], f['start'] + f['size'])
ot = [t for _, _, t in ol]; ct = [t for _, _, t in cl]
sm = difflib.SequenceMatcher(None, ot, ct, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        if a.all:
            for k in range(i1, i2): print('   %5x  %-44s | %s' % (ol[k][0]-st, ot[k], ''))
        else:
            n = i2 - i1
            if n > 2 * a.context:
                for k in range(i1, i1 + a.context): print('   %5x  %s' % (ol[k][0]-st, ot[k]))
                print('   ... %d equal' % (n - 2 * a.context))
                for k in range(i2 - a.context, i2): print('   %5x  %s' % (ol[k][0]-st, ot[k]))
            else:
                for k in range(i1, i2): print('   %5x  %s' % (ol[k][0]-st, ot[k]))
        continue
    L = max(i2 - i1, j2 - j1)
    for k in range(L):
        left = '%5x  %s' % (ol[i1+k][0]-st, ot[i1+k]) if i1 + k < i2 else ''
        right = '%5x  %s' % (cl[j1+k][0]-f['start'], ct[j1+k]) if j1 + k < j2 else ''
        print(' %s %-50s | %s' % ({'replace':'~','delete':'-','insert':'+'}[tag], left, right))
