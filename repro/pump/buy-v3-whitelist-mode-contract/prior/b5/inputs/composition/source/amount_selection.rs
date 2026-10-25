//! Uncompiled source hypothesis for the scalar BuyV3 merge only.
//! Preconditions: authentic parser and curve preparation/mode preflight succeeded.
//! Inputs are decoded original fields; this is not an account classifier.
//! Does not implement settlement, account admission, errors' historical origins,
//! allocation failure behavior, or the opaque mode preflight.

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct BuyAmounts {
    pub curve_amount: u64,
    pub residual_amount: u64,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum AmountSelectionError {
    // Original code 6020, name BuyZeroAmount, message "Buy zero amount".
    // Original compared values are (0u64, 0i32), in that order.
    BuyZeroAmount,
    // Original code 6021, message "Not enough tokens to buy".
    // Compared values are (available, requested), both u64, in that order.
    NotEnoughTokensToBuy { available: u64, requested: u64 },
}

pub fn select_buy_amounts(
    requested: u64,
    real_token_reserves: u64,
    partial_fill: bool,
    mode_a2: bool,
    user_key: &[u8; 32],
    whitelist_key: &[u8; 32],
) -> Result<BuyAmounts, AmountSelectionError> {
    let mut amount = requested;
    let mut residual_amount = 0;
    // 147ce0 -> 147e10; memcmp at 147e30 compares exactly these 32 bytes.
    if !mode_a2 && user_key != whitelist_key && requested > real_token_reserves {
        residual_amount = requested - real_token_reserves;
        amount = real_token_reserves; // 147e70 -> 147d00, bypassing flag test
    } else if partial_fill {
        amount = requested.min(real_token_reserves);
    }
    if amount == 0 {
        return Err(AmountSelectionError::BuyZeroAmount);
    }
    if amount > real_token_reserves {
        return Err(AmountSelectionError::NotEnoughTokensToBuy {
            available: real_token_reserves,
            requested: amount,
        });
    }
    Ok(BuyAmounts { curve_amount: amount, residual_amount })
}
