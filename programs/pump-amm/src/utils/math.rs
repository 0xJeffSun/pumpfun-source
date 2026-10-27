use crate::PumpAmmError;
use anchor_lang::error;

pub(crate) fn ceil_div(numerator: u128, denominator: u128) -> anchor_lang::Result<u128> {
    numerator.checked_add(denominator).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_sub(1).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_div(denominator).ok_or_else(|| error!(PumpAmmError::DivisionByZero))
}



uint::construct_uint! { pub struct U128(2); }
