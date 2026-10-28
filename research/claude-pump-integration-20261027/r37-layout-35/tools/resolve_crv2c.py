#!/usr/bin/env python3
"""Resolve the single lib.rs tail conflict of c4 = c3u + fz-P-crv2c-r2-01.
ours (c3u/L33) = blank lines where L32 had the TradeEvent struct (L33 moved it to its original line);
theirs (crv2c on L32) = the TradeEvent struct + 28 helper lines appended at EOF (crv2c lib.rs lines 3188-3215).
Resolution = ours + the 28 appended helper lines (no TradeEvent duplicate)."""
import sys
from pathlib import Path
merged, crv2c, out = map(Path, sys.argv[1:4])
m = merged.read_text().split('\n'); c = crv2c.read_text().split('\n')
helpers = c[3187:3215]  # crv2c lines 3188..3215 (1-based)
assert helpers[0].startswith('fn create_event'), helpers[0][:40]
i = m.index('<<<<<<< ours'); j = m.index('======='); k = next(n for n in range(j, len(m)) if m[n].startswith('>>>>>>> '))
ours = m[i + 1:j]; theirs = m[j + 1:k]
assert all(x == '' for x in ours), 'ours not blank'
assert theirs[-len(helpers):] == helpers, 'theirs tail != helpers'
res = m[:i] + ours + helpers + m[k + 1:]
out.write_text('\n'.join(res))
print('ours', len(ours), 'theirs', len(theirs), 'helpers', len(helpers), 'lines', len(res))
# Step 2 (07:4x): git merge-file placed crv2c's 7 '// layout-pad' lines after the legacy-buy prologue (c3u 360-365, matched
# 0x14c038 in L33, which L32 did not match), shifting that prologue up 7 lines. Keep every line after create at its L33 position:
# move the 7 pads to directly after create's closing brace.
lines = out.read_text().split('\n')
pads = [n for n in range(len(lines)) if lines[n] == '// layout-pad' and 355 <= n <= 370]
assert len(pads) == 7 and pads == list(range(pads[0], pads[0] + 7)), pads
close = next(n for n in range(333, 345) if lines[n] == '    }' and lines[n + 1].startswith('    pub fn create_v2'))
del lines[pads[0]:pads[0] + 7]
lines[close + 1:close + 1] = ['// layout-pad'] * 7
out.write_text('\n'.join(lines))
print('moved 7 pads to after line', close + 1)
