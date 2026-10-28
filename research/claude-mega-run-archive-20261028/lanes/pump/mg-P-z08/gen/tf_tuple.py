#!/usr/bin/env python3
"""tf_tuple.py <crate> <variant>: get_fees-style tuple selection in trade_fees (line count kept)."""
import sys
crate, var = sys.argv[1], sys.argv[2]
p = crate + '/src/fee_cpi.rs'; t = open(p).read()
s = t.index('    let mut creator_fee_bps = fees.creator_fee_bps;')
end_marker = '    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));\n'
e = t.index(end_marker) + len(end_marker)
old = t[s:e]
cmp = '> 0' if var == 'r3' else '!= 0'
ret = '    Ok((protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps))\n' if var == 'r2' else '    return Ok((protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps));\n'
new = f"""    let (protocol_fee_bps, creator_fee_bps) = (fees.protocol_fee_bps, fees.creator_fee_bps);
    let creator_fee_bps = if global.creator_fee_configurable && curve.creator_fee_bps {cmp} {{ curve.creator_fee_bps }} else {{ creator_fee_bps }};
    let protocol_fee = fee(quote_amount, protocol_fee_bps)?;
    let creator_fee = if curve.creator != Pubkey::default() {{ fee(quote_amount, creator_fee_bps)? }} else {{ 0 }};
"""
new += '\n' * (old.count('\n') - new.count('\n') - 1) + ret
assert new.count('\n') == old.count('\n'), (new.count('\n'), old.count('\n'))
open(p, 'w').write(t[:s] + new + t[e:]); print('ok', var)
