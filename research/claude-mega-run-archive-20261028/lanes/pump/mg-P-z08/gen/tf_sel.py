#!/usr/bin/env python3
"""tf_sel.py <crate> <sel-key> [cr=ne|eq]: replace trade_fees' selection with SELS[key] from tfv2.py (one line), keep line count."""
import sys
crate, key = sys.argv[1], sys.argv[2]; cr = sys.argv[3] if len(sys.argv) > 3 else 'ne'
ns = {}; exec(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/gen/tfv2.py').read().split('V = {')[0].replace('sys.argv = [sys.argv[0], sys.argv[1]]', ''), ns)
sel = ns['SELS'][key]
p = crate + '/src/fee_cpi.rs'; t = open(p).read()
s = t.index('    let mut creator_fee_bps = fees.creator_fee_bps;'); e = t.index('    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));')
old = t[s:e]
CR = {'ne': "    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;\n    let creator_fee = if curve.creator != Pubkey::default() {\n        fee(quote_amount, creator_fee_bps)?\n    } else {\n        0\n    };\n",
      'eq': "    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;\n    let creator_fee = if curve.creator == Pubkey::default() {\n        0\n    } else {\n        fee(quote_amount, creator_fee_bps)?\n    };\n"}
new = '    ' + sel + '\n\n' + CR[cr]
new += '\n' * (old.count('\n') - new.count('\n'))
assert new.count('\n') == old.count('\n')
open(p, 'w').write(t[:s] + new + t[e:]); print('ok', key, cr)
