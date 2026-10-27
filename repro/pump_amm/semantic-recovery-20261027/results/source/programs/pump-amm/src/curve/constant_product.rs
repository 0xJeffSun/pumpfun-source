use crate::*;

pub(crate) fn quote_for_base(base_amount_out: u64, base_reserve: u64, quote_reserve: u64) -> Result<u64> {
    let denominator = base_reserve.checked_sub(base_amount_out)
        .ok_or_else(|| error!(PumpAmmError::BuyMoreBaseAmountThanPoolReserves))?;
    let numerator = (quote_reserve as u128) * (base_amount_out as u128);
    let quote = crate::utils::math::ceil_div(numerator, denominator as u128)?;
    u64::try_from(quote).map_err(|_| error!(PumpAmmError::Truncation))
}

/// Constant-product quote paid for a gross base input, before AMM fees.
#[inline(never)]
pub(crate) fn quote_for_sell(base_amount_in: u64, base_reserve: u64, quote_reserve: u64) -> Result<u64> {
    let denominator = (base_reserve as u128) + (base_amount_in as u128);
    let numerator = (quote_reserve as u128) * (base_amount_in as u128);
    let quote = numerator.checked_div(denominator)
        .ok_or_else(|| error!(PumpAmmError::DivisionByZero))?;
    u64::try_from(quote).map_err(|_| error!(PumpAmmError::Truncation))
}
