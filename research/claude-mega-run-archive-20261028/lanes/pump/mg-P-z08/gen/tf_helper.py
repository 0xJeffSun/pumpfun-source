#!/usr/bin/env python3
"""tf_helper.py <crate> <form>: rewrite trade_fees body (fee_cpi.rs) to call a fees helper (forms n1/n2), keeping line count."""
import sys
p = sys.argv[1] + '/src/fee_cpi.rs'; t = open(p).read()
s = t.index('    let fees = get_fees_with_quote_mint(CpiContext::new('); e = t.index('    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));\n}') + len('    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));\n}')
old = t[s:e]
CPI = """get_fees_with_quote_mint(CpiContext::new(
        fee_program.to_account_info(),
        GetFeesWithQuoteMint {
            fee_config: fee_config.to_account_info(),
            config_program_id: program.clone(),
        },
    ),
    true, crate::buy_fee_market_cap(curve, mint)?, curve.quote_mint)?.get()"""
ARGS = "global, curve, mint, fee_config, fee_program, program"
SIG = """<'info>(
    global: &Account<'info, crate::Global>,
    curve: &Account<'info, BondingCurve>,
    mint: &InterfaceAccount<'info, Mint>,
    fee_config: &Account<'info, super::LegacyFeeConfig>,
    fee_program: &Program<'info, super::LegacyFeesProgram>,
    program: &AccountInfo<'info>,
) -> Result<Fees> {"""
form = sys.argv[2]
if form == 'n1':
    body = f"""    let fees = trade_fee_rates({ARGS})?;
    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;
    let creator_fee = if curve.creator != Pubkey::default() {{
        fee(quote_amount, fees.creator_fee_bps)?
    }} else {{
        0
    }};
    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, fees.creator_fee_bps));
}}"""
    helper = f"""
fn trade_fee_rates{SIG}
    let mut fees = {CPI};
    if global.creator_fee_configurable && curve.creator_fee_bps > 0 {{
        fees.creator_fee_bps = curve.creator_fee_bps;
    }}
    Ok(fees)
}}
"""
elif form == 'n2':
    body = f"""    let fees = trade_fee_rates({ARGS})?;
    let mut creator_fee_bps = fees.creator_fee_bps;
    if global.creator_fee_configurable && curve.creator_fee_bps > 0 {{
        creator_fee_bps = curve.creator_fee_bps;
    }}
    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;
    let creator_fee = if curve.creator != Pubkey::default() {{
        fee(quote_amount, creator_fee_bps)?
    }} else {{
        0
    }};
    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));
}}"""
    helper = f"""
fn trade_fee_rates{SIG}
    Ok({CPI})
}}
"""
body += '\n' * max(0, old.count('\n') - body.count('\n'))
open(p, 'w').write(t[:s] + body + t[e:] + helper); print('ok', old.count('\n'), body.count('\n'))
