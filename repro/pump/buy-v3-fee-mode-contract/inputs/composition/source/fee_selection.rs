// Partial ordinary fee selector; typed FeeConfig decoded once in Accounts.
// Mode-dependent threshold selection and diagnostic identity remain open.
use super::fee_account::{FeeConfig, Rates, Tier};
use anchor_lang::prelude::Error;
pub type FeeResult<T> = core::result::Result<T, u32>;
#[derive(Clone, Copy)]
pub struct FeeTuple {
    pub protocol_amount: u64, pub creator_amount: u64,
    pub protocol_fee_bps: u64, pub creator_fee_bps: u64,
}
#[derive(Clone, Copy)]
pub struct Pretrade {
    pub mint_supply: u64, pub virtual_base: u64, pub virtual_quote: u64,
    pub quote_key: [u8; 32], pub creator_key: [u8; 32],
    pub creator_configurable: bool, pub curve_creator_bps: u64,
}
fn table(tiers: &[Tier], threshold: u128) -> FeeResult<Rates> {
    let first = tiers.first().ok_or(6096u32)?;
    if threshold < first.threshold { return Ok(first.rates.clone()); }
    Ok(tiers.iter().rev().find(|t| t.threshold <= threshold)
        .unwrap_or(first).rates.clone())
}
fn ceiling_fee(amount: u64, rate: u64) -> FeeResult<u64> {
    // (2^64-1)^2 + 10000 < 2^128: original checked ceil intermediates
    // cannot overflow here. Narrow each leg after division, never before.
    let value = (amount as u128 * rate as u128 + 9999) / 10000;
    if value > u64::MAX as u128 { return Err(6025); }
    Ok(value as u64)
}
pub const QUOTE_1: [u8; 32] = [6,155,136,87,254,171,129,132,251,104,127,99,70,24,192,53,218,196,57,220,26,235,59,85,152,160,240,0,0,0,0,1];
pub const QUOTE_2: [u8; 32] = [131,13,252,159,222,95,230,184,170,124,4,164,118,233,30,138,198,187,38,74,173,144,250,25,201,223,73,216,92,62,91,94];
pub const QUOTE_SECOND: [u8; 32] = [198,250,122,243,190,219,173,58,61,101,243,106,171,201,116,49,177,187,228,194,210,246,224,228,124,166,2,3,69,47,93,97];
pub fn ordinary_leg(c: &FeeConfig, s: &Pretrade, amount: u64, serialized_len: usize) -> FeeResult<FeeTuple> {
    // Called twice with identical pretrade inputs; this division precedes L gate.
    if s.virtual_base == 0 { return Err(6026); }
    let threshold = s.mint_supply as u128 * s.virtual_quote as u128 / s.virtual_base as u128;
    if serialized_len < 2512 { return Err(6097); }
    let mut rates = if s.quote_key == [0; 32] || s.quote_key == QUOTE_1 || s.quote_key == QUOTE_2 {
        table(&c.first, threshold)?
    } else if s.quote_key == QUOTE_SECOND {
        if serialized_len <= 4072 { return Err(6096); }
        table(&c.second, threshold)?
    } else if serialized_len > 4096 && (c.exotic.lp != 0 || c.exotic.protocol != 0 || c.exotic.creator != 0) {
        c.exotic.clone()
    } else { c.flat.clone() };
    if s.creator_configurable && s.curve_creator_bps != 0 { rates.creator = s.curve_creator_bps; }
    let protocol_amount = ceiling_fee(amount, rates.protocol)?;
    let creator_amount = if s.creator_key == [0; 32] { 0 } else { ceiling_fee(amount, rates.creator)? };
    Ok(FeeTuple { protocol_amount, creator_amount, protocol_fee_bps: rates.protocol, creator_fee_bps: rates.creator })
}

pub fn anchor_error(code:u32)->Error {
    use anchor_lang::error::ErrorCode as E;
    // No raw ProgramError::Custom adapter: these remain AnchorError objects.
    match code {
        3001=>E::AccountDiscriminatorNotFound.into(),
        3002=>Error::from(E::AccountDiscriminatorMismatch).with_account_name("FeeConfig"),
        3003=>E::AccountDidNotDeserialize.into(),
        6025=>crate::PumpError::Truncation.into(),
        6026=>crate::PumpError::DivisionByZero.into(),
        6096=>crate::PumpError::FeeTiersEmpty.into(),
        6097=>crate::PumpError::FeeConfigTooShort.into(),
        _=>unreachable!("closed numeric fee contract"),
    }
}
