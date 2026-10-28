//! Token-2022 transfer-fee decoding and arithmetic for PumpSwap.
//!
//! The native transfer-fee crate owns the decoded fee value and its arithmetic
//! methods. Keeping that ownership boundary preserves the reference ABI used
//! by the captured program, while this module owns PumpSwap error conversion.
//!
//! A Token-2022 mint can carry older and newer fee schedules. `from_mint`
//! selects the schedule active at the current epoch; a mint without the
//! extension maps to `None`. The remaining helpers calculate net and gross
//! transfer amounts and translate arithmetic failure into `Overflow`.
//!
//! This separation also keeps mint decoding independent from the instruction
//! handlers that consume it, so all callers share the same validation order.
//! Error construction stays here so diagnostics name the public PumpSwap module.

use crate::*;
pub use native_transfer_fee::DecodedTransferFee;
use native_transfer_fee::decode_transfer_fees;

/// The fee schedule selected for the current epoch.
///
/// `None` represents a mint without the Token-2022 transfer-fee extension.
pub type TransferFeeData = Option<DecodedTransferFee>;

/// Reads the Token-2022 transfer-fee configuration that applies in the current epoch.
pub fn from_mint(mint: &AccountInfo) -> Result<TransferFeeData> {
    if mint.owner != &anchor_spl::token_2022::ID {
        return const { Ok(None) };
    }
    let data = mint.try_borrow_data()?;
    let fees = decode_transfer_fees(&data)
        .map_err(|_| error!(PumpAmmError::UnsupportedQuoteMint))?;
    let epoch = Clock::get()?.epoch;
    Ok(fees.map(|(older, newer)| if epoch >= newer.epoch { newer } else { older }))
}

/// Fee withheld by Token-2022 when `amount` is transferred.
///
/// Mints without a transfer-fee extension charge nothing.
///
/// For configured mints, the epoch-selected schedule determines the basis
/// points charged, with the result limited by that schedule's maximum fee.
/// Arithmetic failure is reported through PumpSwap's public error type.
pub fn calculate_fee(data: &TransferFeeData, amount: u64) -> Result<u64> {
    match *data {
        None => Ok(0),
        Some(fee) => fee
            .calculate_fee(amount)
            .ok_or_else(|| error!(PumpAmmError::Overflow)),
    }
}

/// Amount received after the transfer fee is withheld.
pub fn amount_after_fee(data: &TransferFeeData, amount: u64) -> Result<u64> {
    amount
        .checked_sub(calculate_fee(data, amount)?)
        .ok_or_else(|| error!(PumpAmmError::Overflow))
}

/// Gross amount to send so that `amount` arrives after the transfer fee.
/// Mints without a transfer-fee extension return `amount` unchanged.
pub fn amount_before_fee(data: &TransferFeeData, amount: u64) -> Result<u64> {
    match *data {
        None => Ok(amount),
        Some(fee) => fee
            .calculate_pre_fee_amount(amount)
            .ok_or_else(|| error!(PumpAmmError::Overflow)),
    }
}
