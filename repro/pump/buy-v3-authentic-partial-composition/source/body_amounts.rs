// Partial body dependency. Call only after parser, preparation and mode checks.
// Numeric codes and compared values are supported; historical origins are open.
use anchor_lang::prelude::*;
use crate::PumpError;
use super::amount_selection::{select_buy_amounts, AmountSelectionError, BuyAmounts};
pub fn amounts(requested: u64, reserve: u64, partial_fill: bool, mode: bool,
    user: &[u8; 32], whitelist: &[u8; 32]) -> Result<BuyAmounts> {
    select_buy_amounts(requested, reserve, partial_fill, mode, user, whitelist)
        .map_err(|e| match e {
            AmountSelectionError::BuyZeroAmount =>
                Error::from(PumpError::BuyZeroAmount).with_values((0u64, 0i32)),
            AmountSelectionError::NotEnoughTokensToBuy { available, requested } =>
                Error::from(PumpError::NotEnoughTokensToBuy)
                    .with_values((available, requested)),
        })
}
