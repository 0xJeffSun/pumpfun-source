#!/usr/bin/env python3
"""[mg-P-raw] original vs candidate codegen order of the main object's functions (candidate default link = codegen order).
Prints the original address order with candidate codegen index, LIS membership, and runs."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, dem
build = Path(sys.argv[1]); lo_only = '--local' in sys.argv
o = pk.Elf(pk.ORIG); c = pk.Elf(build / 'unstripped.so'); k = pk.Corr(o, c)
secs = {s['addr']: s for s in pk.parse_map(build / 'link/link.map') if s['out'] == '.text' and s['size'] > 0}
mainobj = lambda ca: '-cgu.0.rcgu.o' in secs[ca]['pattern'] and 'pump_recovered.pump_recovered' in secs[ca]['pattern']
cidx = {a: i for i, a in enumerate(k.cstarts)}
seq = [(oa, k.o2c[oa]) for oa in k.ostarts if oa in k.o2c and mainobj(k.o2c[oa])]
if lo_only:
    seq = [(oa, ca) for oa, ca in seq if dem.dem(k.cf[ca]['name']).startswith(('pump_recovered::', '<pump_recovered::'))]
keep = pk.lis([cidx[ca] for oa, ca in seq])
print('main-object matched', len(seq), 'LIS', len(keep))
for i, (oa, ca) in enumerate(seq):
    print('%s %#8x c#%-4d %s' % (' ' if i in keep else '*', oa, cidx[ca], dem.dem(k.cf[ca]['name'])[:100]))
