
pub struct BuyPreviewContext<'a, 'info> {
    pub pool: &'a Box<Account<'info, Pool>>,
    pub global_config: &'a Box<Account<'info, GlobalConfig>>,
    pub quote_transfer_fee: &'a TransferFeeData,
    pub fees: &'a AppliedFees,
}

#[inline(never)]
pub fn preview_total_quote(context: BuyPreviewContext, quote_amount_in: u64) -> Result<u64> {
    let global_config = context.global_config.as_ref();
    let pool = context.pool.as_ref();
    let quote_transfer_fee = context.quote_transfer_fee;
    let result = {
        let fees = context.fees.clone();
        calculate_buy_result(
            global_config.buyback_basis_points,
            pool.is_mayhem_mode as u8,
            quote_transfer_fee,
            0,
            quote_amount_in,
            &fees,
        )
    }?;
    result.total_user_quote()
}

