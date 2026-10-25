//! Static source hypothesis for original Fees [231576,234096).
//! Bound to inputs/source-map.json (8ff12 candidate); not compiled or integrated.
//! Names are descriptive. The raw data word below is not a token extension.
use anchor_lang::prelude::*;
use crate::donation::{BondingCurve, AMM, PUMP};
use crate::FeeError;

pub fn preprocess_remaining<'remaining, 'info>(
    remaining: &'remaining [AccountInfo<'info>],
    curve: &BondingCurve,
    base_mint: &Pubkey,
    quote_mint: &Pubkey,
) -> Result<&'remaining [AccountInfo<'info>]> {
    if !curve.complete {
        return Ok(remaining);
    }
    require!(!remaining.is_empty(), FeeError::NotEnoughRemainingAccounts);

    let (authority, _) = Pubkey::find_program_address(
        &[b"pool-authority", base_mint.as_ref()], &PUMP,
    );
    let (expected, _) = Pubkey::find_program_address(
        &[b"pool", &0u16.to_le_bytes(), authority.as_ref(),
          base_mint.as_ref(), quote_mint.as_ref()], &AMM,
    );

    // The nonempty check dominates this subtraction and both slice accesses.
    let last_index = remaining.len() - 1;
    let last = &remaining[last_index];
    require_keys_eq!(*last.key, expected, anchor_lang::error::ErrorCode::ConstraintSeeds);

    // A different owner is deliberately accepted after the key check.
    if last.owner == &AMM {
        let data = last.try_borrow_data()?;
        if data.len() >= 287 {
            let word = u64::from_le_bytes(data[279..287].try_into().unwrap());
            require!(word == 0, FeeError::PoolCreatorFeesNotSwept);
        }
    }
    Ok(&remaining[..last_index])
}
