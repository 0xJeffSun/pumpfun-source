use crate::*;
use crate::curve::fees::AppliedFees;
use crate::utils::transfer_fee::{self, TransferFeeData};

pub struct BuyResult {
    pub fees: AppliedFees,
    pub base_amount_out: u64,
    pub quote_amount_in: u64,
    pub user_quote_amount_in: u64,
    pub buyback_fee: u64,
    pub pool_quote_amount_in: u64,
    pub quote_transfer_fee: u64,
}

#[inline(never)]
fn total_quote(amounts: &[u64; 4]) -> Result<u64> {
    let amount = amounts[0].checked_add(amounts[1])
        .ok_or_else(|| error!(PumpAmmError::Overflow))?;
    let amount = amount.checked_add(amounts[2])
        .ok_or_else(|| error!(PumpAmmError::Overflow))?;
    amount.checked_add(amounts[3])
        .ok_or_else(|| error!(PumpAmmError::Overflow))
}

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
    let buyback_fee = if is_mayhem_mode == 0 {
        let buyback_fee = u64::try_from(
            (fees.protocol_fee as u128) * (buyback_basis_points as u128) / 10_000,
        ).expect("buyback fee is at most protocol_fee");
        fees.protocol_fee.checked_sub(buyback_fee)
            .expect("buyback_fee never exceeds protocol_fee");
        buyback_fee
    } else { 0 };
    let net_pool_quote = user_quote_amount_in.checked_sub(buyback_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?;
    let pool_quote_amount_in = transfer_fee::amount_before_fee(quote_transfer_fee, net_pool_quote)?;
    let quote_transfer_fee = pool_quote_amount_in.checked_sub(net_pool_quote)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?;
    Ok(BuyResult {
        fees: fees.clone(),
        base_amount_out,
        quote_amount_in,
        user_quote_amount_in,
        buyback_fee,
        pool_quote_amount_in,
        quote_transfer_fee,
    })
}

impl BuyResult {
    pub fn total_user_quote(&self) -> Result<u64> {
        self.buyback_fee.checked_add(self.pool_quote_amount_in)
            .ok_or_else(|| error!(PumpAmmError::Overflow))
    }
}

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
