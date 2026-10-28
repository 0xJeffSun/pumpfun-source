/// Initial exact-input quote and its fee amounts, before buyback/transfer-fee preview.
#[inline(never)]
pub fn estimate_buy_quote(pool: &Pool, selected: &AppliedFees, available: u64) -> Result<(u64, AppliedFees)> {
    let creator_bps = if pool.coin_creator == Pubkey::default() { 0 } else { selected.creator_fee_bps };
    let fee_bps = selected.protocol_fee_bps.saturating_add(selected.lp_fee_bps).saturating_add(creator_bps);
    let estimate = if fee_bps == 0 { available } else if available == 0 { 0 } else {
        // The denominator is at least 10_000, so this quotient is <= available.
        ((available as u128) * 10_000 / ((fee_bps as u128) + 10_000)) as u64
    };
    require_gt!(estimate, 0, PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees); //@328
    let lp_fee = crate::curve::fees::fee(estimate, selected.lp_fee_bps)?;
    let protocol_fee = crate::curve::fees::fee(estimate, selected.protocol_fee_bps)?;
    let creator_fee = crate::curve::fees::fee(estimate, creator_bps)?;
    let required = total_quote(&[estimate, lp_fee, protocol_fee, creator_fee])?;
    let quote = estimate.checked_sub(required.saturating_sub(available))
        .ok_or(PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees)?;
    require_gt!(quote, 0, PumpAmmError::BuySlippageBelowMinBaseAmountOut); //@346
    Ok((quote, AppliedFees { lp_fee_bps: selected.lp_fee_bps, protocol_fee_bps: selected.protocol_fee_bps,
        creator_fee_bps: selected.creator_fee_bps, lp_fee, protocol_fee, creator_fee }))
}
