#!/usr/bin/env python3
"""Resolve the single create_v2.rs conflict of c2 = L35 + fz-P-crv2ab-r3-01 (made on L34 = L33 + crv2a-r2-01).
ours (L35) line 100 = fz-P-raw-r2's usize-literal require_gte! line; theirs line 101 = crv2ab's new initialize_metadata(&ctx, ..) call.
Resolution (line-neutral, 2 lines): ours' require line + theirs' call line."""
import sys
from pathlib import Path
merged, out = Path(sys.argv[1]), Path(sys.argv[2])
m = merged.read_text().split('\n')
i = m.index('<<<<<<< ours'); j = m.index('======='); k = next(n for n in range(j, len(m)) if m[n].startswith('>>>>>>> '))
ours, theirs = m[i + 1:j], m[j + 1:k]
assert len(ours) == len(theirs) == 2 and '32usize' in ours[0] and 'require_gte!(32,' in theirs[0], (ours, theirs)
assert theirs[1].strip().startswith('initialize_metadata(&ctx,') and ours[1].strip().startswith('initialize_metadata(a,'), (ours[1], theirs[1])
res = m[:i] + [ours[0], theirs[1]] + m[k + 1:]
assert '<<<<<<<' not in '\n'.join(res)
out.write_text('\n'.join(res)); print('resolved; lines', len(res))
