#!/usr/bin/env python3
"""L15 hygiene on the compose3 tree: z06 (mg-P-z06-01) replaced the only use of CONTROL_DISC -> blank it (line-neutral)."""
import sys
from pathlib import Path
S = Path(sys.argv[1]).resolve() / 'src'
p = S / 'quote_control/state.rs'; x = p.read_text().split('\n')
if any('CONTROL_DISC' in l for l in x):  # mg-P-z06-01 was rewritten in place at 02:14 without it
    assert x[122].strip() == 'const CONTROL_DISC: [u8; 8] = [56, 244, 35, 238, 193, 213, 162, 201];' and sum('CONTROL_DISC' in l for l in x) == 1
    x[122] = ''; p.write_text('\n'.join(x))
print('l15 fixes applied')
