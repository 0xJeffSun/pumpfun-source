use crate::{Pool, PumpAmmError};
use anchor_lang::error;

pub(crate) fn ceil_div(numerator: u128, denominator: u128) -> anchor_lang::Result<u128> {
    numerator.checked_add(denominator).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_sub(1).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_div(denominator).ok_or_else(|| error!(PumpAmmError::DivisionByZero))
}

pub fn market_cap(pool: &Pool, base_supply: u64, base_reserve: u64, quote_reserve: u64) -> anchor_lang::Result<u128> {
    let supply = if pool.is_mayhem_mode { 1_000_000_000_000_000 } else { base_supply };
    (supply as u128).checked_mul(quote_reserve as u128).ok_or(PumpAmmError::Overflow)?
        .checked_div(base_reserve as u128).ok_or_else(|| error!(PumpAmmError::DivisionByZero))
}


uint::construct_uint! { pub struct U128(2); }
