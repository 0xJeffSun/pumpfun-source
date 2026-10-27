use crate::*;

pub(crate) fn fee(amount: u64, basis_points: u64) -> Result<u64> {
    let numerator = (amount as u128) * (basis_points as u128);
    let value = crate::utils::math::ceil_div(numerator, 10000)?;
    u64::try_from(value).map_err(|_| error!(PumpAmmError::Truncation))
}
