#!/usr/bin/env python3
"""Compare normalized function bodies of two unstripped builds by hash-stripped symbol name (order-aware for dups)."""
import sys, re, collections
sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent))
from sbf import elf
from pathlib import Path
A = elf.Elf(Path(sys.argv[1])); B = elf.Elf(Path(sys.argv[2]))
strip = lambda n: re.sub(r'17h[0-9a-f]{16}E$', '', n)
def group(e):
    g = collections.defaultdict(list)
    for f in sorted(e.funcs, key=lambda f: f['start']):
        g[strip(f['name'])].append(f)
    return g
ga, gb = group(A), group(B)
def key(e, f): return (f['size'], e.normalized[f['start']:f['start'] + f['size']], str(e.pattern(f['start'], f['size'])))
diff = []
for n in sorted(set(ga) | set(gb)):
    ka = collections.Counter(key(A, f) for f in ga.get(n, []))
    kb = collections.Counter(key(B, f) for f in gb.get(n, []))
    if ka != kb:
        diff.append((n, [f['size'] for f in ga.get(n, [])], [f['size'] for f in gb.get(n, [])]))
print('names', len(ga), len(gb), 'differing groups', len(diff))
for n, sa, sb in diff[:60]:
    print(sa, sb, n[:150])
