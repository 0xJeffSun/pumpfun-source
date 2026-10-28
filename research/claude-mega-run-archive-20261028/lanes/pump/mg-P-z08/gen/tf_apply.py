#!/usr/bin/env python3
"""tf_apply.py <crate dir> <sel form> <creator form>: rewrite trade_fees tail in src/fee_cpi.rs."""
import sys
p = sys.argv[1] + '/src/fee_cpi.rs'; t = open(p).read()
s = t.index('    let mut creator_fee_bps = fees.creator_fee_bps;'); e = t.index('    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));')
SEL = {
 'mut': """    let mut creator_fee_bps = fees.creator_fee_bps;
    if global.creator_fee_configurable && curve.creator_fee_bps > 0 {
        creator_fee_bps = curve.creator_fee_bps;
    }
""",
 'helper': "    let creator_fee_bps = creator_fee_bps(global, curve, fees.creator_fee_bps);\n",
 'helper_ia': "    let creator_fee_bps = creator_fee_bps(global, curve, fees.creator_fee_bps);\n",
 'block': "    let creator_fee_bps = { let mut bps = fees.creator_fee_bps; if global.creator_fee_configurable && curve.creator_fee_bps > 0 { bps = curve.creator_fee_bps; } bps };\n",
 'nested': """    let mut creator_fee_bps = fees.creator_fee_bps;
    if global.creator_fee_configurable { if curve.creator_fee_bps > 0 { creator_fee_bps = curve.creator_fee_bps; } }
""",
 'or': """    let mut creator_fee_bps = fees.creator_fee_bps;
    if !global.creator_fee_configurable || curve.creator_fee_bps == 0 {} else { creator_fee_bps = curve.creator_fee_bps; }
""",
 'ifelse_or': "    let creator_fee_bps = if !global.creator_fee_configurable || curve.creator_fee_bps == 0 { fees.creator_fee_bps } else { curve.creator_fee_bps };\n",
 'ifelse': """    let creator_fee_bps = if global.creator_fee_configurable && curve.creator_fee_bps > 0 { curve.creator_fee_bps } else { fees.creator_fee_bps };
""",
}
CR = {
 'ne': """
    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;
    let creator_fee = if curve.creator != Pubkey::default() {
        fee(quote_amount, creator_fee_bps)?
    } else {
        0
    };
""",
 'eq': """
    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;
    let creator_fee = if curve.creator == Pubkey::default() {
        0
    } else {
        fee(quote_amount, creator_fee_bps)?
    };
""",
}
new = SEL[sys.argv[2]] + CR[sys.argv[3]]
old = t[s:e]
assert old.count('\n') >= new.count('\n'), (old.count('\n'), new.count('\n'))
new += '\n' * (old.count('\n') - new.count('\n'))  # keep line count
tail = ''
if sys.argv[2].startswith('helper'):
    attr = '#[inline(always)]\n' if sys.argv[2] == 'helper_ia' else ''
    tail = f"\n{attr}fn creator_fee_bps(global: &crate::Global, curve: &BondingCurve, default: u64) -> u64 {{\n    let mut bps = default;\n    if global.creator_fee_configurable && curve.creator_fee_bps > 0 {{\n        bps = curve.creator_fee_bps;\n    }}\n    bps\n}}\n"
open(p, 'w').write(t[:s] + new + t[e:] + tail); print('ok', old.count('\n'))
