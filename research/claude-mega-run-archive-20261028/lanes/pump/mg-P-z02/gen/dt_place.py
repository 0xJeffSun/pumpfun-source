#!/usr/bin/env python3
"""dt_place.py <v2.rs in> <out> <body.rs>: keep lines 1-334 of distribute_creator_fee_v2.rs, then place body.rs
(the distribute_tokens fn; lines tagged '//@340' '//@346' '//@378' must land on those lines) from line 335, padding
with '// layout-pad' lines."""
import sys, re
L = open(sys.argv[1]).read().split('\n')
assert L[334].startswith('pub fn distribute_tokens'), L[334][:40]
body = open(sys.argv[3]).read().rstrip('\n').split('\n')
out = L[:334]
for b in body:
    m = re.search(r'//@(\d+)\s*$', b)
    if m:
        tgt = int(m.group(1)); b = b[:m.start()].rstrip()
        assert len(out) + 1 <= tgt, (tgt, len(out) + 1, b[:40])
        while len(out) + 1 < tgt: out.append('// layout-pad')
    out.append(b)
open(sys.argv[2], 'w').write('\n'.join(out) + '\n')
print('lines', len(out))
