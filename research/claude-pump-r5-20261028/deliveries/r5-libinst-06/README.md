# r5-libinst-06 (base L12): 916 normalized / 165 raw

Cumulative on r5-libinst-05 (915). New gain: **0x89ec8** (util/fee.rs `get_fees`, Source site fee.rs:183).

## Change (util/fee.rs lines 171-204, line-neutral; the FeeConfigTooShort require stays on line 183)
```
fn is_sol_quote(quote_mint: &Pubkey) -> bool { *quote_mint == Pubkey::default() || *quote_mint == WSOL_QUOTE || *quote_mint == QUOTE_2 }
fn get_fee_basis_points(fee_config, fee_config_len, quote_mint, market_cap) -> Result<(u64, u64)> {
    require!(fee_config_len >= 2512, FeeConfigTooShort);            // line 183
    if is_sol_quote(quote_mint) { calculate_fee_tier(&fee_config.fee_tiers, market_cap) }
    else if USDC == *quote_mint { calculate_fee_tier(if fee_config_len > 4072 { &fee_config.stable_fee_tiers } else { &[] }, market_cap) }
    else { let exotic = &fee_config.exotic_flat_fees;
           let use_exotic = fee_config_len > 4096 && (exotic.lp_fee_bps != 0 || exotic.protocol_fee_bps != 0 || exotic.creator_fee_bps != 0);
           let fees = if use_exotic { exotic } else { &fee_config.flat_fees }; Ok((fees.protocol_fee_bps, fees.creator_fee_bps)) }
}
pub fn get_fees(..) {
    let (protocol_fee_bps, creator_fee_bps) = get_fee_basis_points(..)?;
    let creator_fee_bps = if global.creator_fee_configurable && bonding_curve.creator_fee_bps != 0 { bonding_curve.creator_fee_bps } else { creator_fee_bps };
    let protocol_fee = fee(amount, protocol_fee_bps)?;
    let creator_fee = if bonding_curve.creator != Pubkey::default() { fee(amount, creator_fee_bps)? } else { 0 };
    Ok((protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps))
}
```
Same semantics as before (pure restatement: same tier selection, same exotic/flat choice, same creator override and creator==default gate).
Mechanisms (each verified by an isolated variant, see lane PROGRESS): calculate_fee_tier called inside each arm (register assignment
fee_config r7 / len r9 + result-slot stores), separate bool for the SOL-quote test (block order), `let use_exotic` (flat block falls
through), let-if creator override (protocol fee `?` polarity), `creator != default` first (creator fee `?` polarity).
Binary evidence: original 0x89ec8 now byte-matches (normalized) legacy_sell::fee_math::get_fees (1640 B). No losses, runtime_valid,
no stack warnings.
