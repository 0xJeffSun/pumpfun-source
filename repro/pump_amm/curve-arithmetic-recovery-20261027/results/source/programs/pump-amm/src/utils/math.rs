use crate::*;

pub(crate) fn ceil_div(numerator: u128, denominator: u128) -> Result<u128> {
    numerator.checked_add(denominator).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_sub(1).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_div(denominator).ok_or_else(|| error!(PumpAmmError::DivisionByZero))
}
