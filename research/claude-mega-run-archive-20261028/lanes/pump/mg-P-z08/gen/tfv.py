#!/usr/bin/env python3
"""tfv.py <src_crate_dir> : append trade_fees variants (unused pub fns) to src/fee_cpi.rs (IR analysis only)."""
import sys
p = sys.argv[1] + '/src/lib.rs'; t = open(p).read()
SIG = """<'info>(
    global: &Account<'info, crate::Global>,
    curve: &Account<'info, BondingCurve>,
    mint: &InterfaceAccount<'info, Mint>,
    fee_config: &Account<'info, crate::legacy_sell::LegacyFeeConfig>,
    fee_program: &Program<'info, crate::legacy_sell::LegacyFeesProgram>,
    program: &AccountInfo<'info>,
    quote_amount: u64,
) -> Result<(u64, u64, u64, u64)> {"""
HEAD = """
    let fees = get_fees_with_quote_mint(CpiContext::new(
        fee_program.to_account_info(),
        GetFeesWithQuoteMint {
            fee_config: fee_config.to_account_info(),
            config_program_id: program.clone(),
        },
    ),
    true, crate::buy_fee_market_cap(curve, mint)?, curve.quote_mint)?.get();
"""
SEL = """
    let mut creator_fee_bps = fees.creator_fee_bps;
    if global.creator_fee_configurable && curve.creator_fee_bps > 0 {
        creator_fee_bps = curve.creator_fee_bps;
    }
"""
V = {
 't0': SEL + """
    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;
    let creator_fee = if curve.creator == Pubkey::default() { 0 } else { fee(quote_amount, creator_fee_bps)? };
    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));
""",
 't1': SEL + """
    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;
    let creator_fee = if curve.creator != Pubkey::default() { fee(quote_amount, creator_fee_bps)? } else { 0 };
    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));
""",
}
if len(sys.argv) > 2 and sys.argv[2] != "-":
    exec(open(sys.argv[2]).read())  # may redefine/extend V
out = t + "\npub mod tfv {\nuse anchor_lang::prelude::*;\nuse crate::trade_types::BondingCurve;\nuse anchor_spl::token_interface::Mint;\nuse crate::legacy_sell::fee_cpi::{fee,get_fees_with_quote_mint,GetFeesWithQuoteMint};\n" + ''.join(f"\n#[inline(never)]\npub fn trade_fees_{k}{SIG}{HEAD}{v}}}\n" for k, v in V.items()) + "}\n"
open(p, 'w').write(out); print('appended', len(V))
