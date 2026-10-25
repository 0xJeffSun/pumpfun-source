// Uncompiled source proposal for the frozen dedicated BuyV3 context.
// Insert after successful combined base CPI, before common volume-user init
// and fee accrual. This does not remove any existing admission/domain fence.
// Uses real typed reloads; no cached-amount substitution or successful callback.
fn buy_whitelist_after_base_transfer(a: &mut BuyV3<'_>) -> Result<()> {
    if a.user.key() == a.global.whitelist_pda {
        // The original reloads even if the inner function will immediately
        // return because the curve is complete or alternate mode is disabled.
        a.associated_base_bonding_curve.reload()?;
        a.associated_base_user.reload()?;
        let quote_mint = a.bonding_curve.quote_mint;
        update_whitelist_virtual_quote(
            &mut a.bonding_curve,
            a.associated_base_bonding_curve.amount,
            a.associated_base_user.amount,
            &quote_mint,
        )?;
    }
    // Common zero-user-volume initialization follows for both caller paths.
    Ok(())
}

fn update_whitelist_virtual_quote(
    curve: &mut BondingCurve,
    reloaded_curve_base: u64,
    reloaded_user_base: u64,
    quote_mint: &Pubkey,
) -> Result<()> {
    if curve.complete || !curve.is_mayhem_mode {
        return Ok(());
    }
    let twice_supply = curve.token_total_supply.checked_mul(2)
        .ok_or(PumpError::Overflow)?;
    let outside_curve = twice_supply.checked_sub(reloaded_curve_base)
        .ok_or(PumpError::Overflow)?;
    let circulating = outside_curve.checked_sub(reloaded_user_base)
        .ok_or(PumpError::Overflow)?;
    let real_quote = curve.real_quote_reserves;
    let minimum_quote = if *quote_mint == Pubkey::default() { 10_000_000 } else { 1_000_000 };
    if real_quote < minimum_quote || circulating < 1_000_000_000_000 {
        return Ok(());
    }
    // Widen BEFORE addition. The original carries this possible 65th bit into
    // the checked u128 product; a checked u64 sum would add a false rejection.
    let expanded_base = u128::from(circulating) + u128::from(curve.virtual_token_reserves);
    let numerator = expanded_base.checked_mul(u128::from(real_quote))
        .ok_or(PumpError::Overflow)?;
    let quotient = numerator.checked_div(u128::from(circulating))
        .ok_or(PumpError::Overflow)?;
    // Deliberately use the existing From<TryFromIntError> for Anchor Error:
    // this is InvalidNumericConversion (4102), NOT Pump Truncation (6025).
    // Conversion precedes the cap. No captured source coordinates are forged.
    let virtual_quote: u64 = quotient.try_into()?;
    let cap = if *quote_mint == Pubkey::default() { 2_000_000_000_000 } else { 160_000_000_000 };
    curve.virtual_quote_reserves = virtual_quote.min(cap);
    Ok(())
}
