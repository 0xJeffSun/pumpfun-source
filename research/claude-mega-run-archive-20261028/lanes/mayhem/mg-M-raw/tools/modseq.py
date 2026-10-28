#!/usr/bin/env python3
"""modseq.py BUILD_DIR [--natural]: run-length sequence of source modules of main-object functions in ORIGINAL order
(or, with --natural, in the build's own .text order). Demangles legacy names roughly (path components)."""
import sys, re
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import elfcmp, gen_ordered as g
b = Path(sys.argv[1])
o = elfcmp.m.Elf(elfcmp.ORIG.resolve()); c = elfcmp.m.Elf((b / 'symbols.so').resolve()); k = elfcmp.Corr(o, c)
main = {s['addr'] for s in g.parse_map(b / 'link.map') if s['out'] == '.text' and 'mayhem_recovered.mayhem_recovered' in s['pattern']}
def path(n):
    n = n[len('.text.'):] if n.startswith('.text.') else n
    if n.startswith('.text.unlikely.'): n = n[15:]
    if not n.startswith('_ZN'): return n[:30]
    parts, i = [], 3
    while i < len(n) and n[i].isdigit():
        j = i
        while n[j].isdigit(): j += 1
        L = int(n[i:j]); parts.append(n[j:j + L]); i = j + L
    s = '::'.join(parts[:-1] if parts and parts[-1].startswith('h') and len(parts[-1]) == 17 else parts)
    s = s.replace('$LT$', '<').replace('$GT$', '>').replace('$u20$', ' ').replace('..', '::').replace('$C$', ',')
    m = re.match(r'<(?:mayhem_recovered::)?([\w:]+?)(?:::\w+)?(?:<.*?>)? as ', s)
    if m: return 'impl ' + m.group(1)
    return re.sub(r'^mayhem_recovered::', '', s).rsplit('::', 1)[0]
seq = []
if '--natural' in sys.argv:
    order = sorted(a for a in k.cstarts if a in main)
else:
    order = [k.o2c[oa] for oa in k.ostarts if oa in k.o2c and k.o2c[oa] in main]
for ca in order:
    m = path(k.cf[ca]['name']); wid = k.id.get(k.c2o.get(ca), '-')
    if seq and seq[-1][0] == m: seq[-1][1] += 1; seq[-1][3] = wid
    else: seq.append([m, 1, wid, wid])
print(len(seq), 'runs')
for m, n, a, z in seq: print('%-60s %3d %s..%s' % (m[:60], n, a, z))
