#[inline(never)]
pub fn calculate_buy_result(
    buyback_basis_points: u64,
    is_mayhem_mode: u8,
    quote_transfer_fee: &TransferFeeData,
    base_amount_out: u64,
    quote_amount_in: u64,
    fees: &AppliedFees,
) -> Result<BuyResult> {
    let user_quote_amount_in = total_quote(&[
        quote_amount_in, fees.lp_fee, fees.protocol_fee, fees.creator_fee,
    ])?;
    let (buyback_fee, _) = GlobalConfig::split_buyback_fee(buyback_basis_points, fees.protocol_fee, is_mayhem_mode != 0);
    let net_pool_quote = user_quote_amount_in
        .checked_sub(buyback_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@283
    let pool_quote_amount_in = transfer_fee::amount_before_fee(quote_transfer_fee, net_pool_quote)?;
    Ok(BuyResult {
        fees: fees.clone(),
        base_amount_out,
        quote_amount_in,
        user_quote_amount_in,
        buyback_fee,
        pool_quote_amount_in,
        quote_transfer_fee: pool_quote_amount_in
            .checked_sub(net_pool_quote)
            .ok_or_else(|| error!(PumpAmmError::Overflow))?, //@294
    })
}
