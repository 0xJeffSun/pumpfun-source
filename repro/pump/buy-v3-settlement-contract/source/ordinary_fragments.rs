// UNCOMPILED semantic fragments, NOT original signatures or an integration patch.
// Call-site order and unresolved dependencies are in contract.json / REPORT.md.
// The unit error is an explicit placeholder: no diagnostic/source identity claim.

// 83c90..83ce0. Call after the first-leg reserve mutation helper.
pub fn combined_base(first: u64, residual: Option<u64>) -> Result<u64, ()> {
    first.checked_add(residual.unwrap_or(0)).ok_or(())
}

// Common continuation83fa8, after base transfer AND any whitelist late validation.
// Do not add `if !whitelisted`: 84588 rejoins this block on success.
pub fn initialize_zero_user(stored: &mut [u8; 32], user: &[u8; 32]) {
    if *stored == [0; 32] { *stored = *user; }
}

// a1bd8 ordinary branch ONLY (payload byte+9a == 0). Invoked per leg.
// Protocol store precedes creator arithmetic/store; do not precompute both stores.
pub fn accrue_ordinary(
    protocol_balance: &mut u64, creator_balance: &mut u64,
    protocol: u64, creator: u64, buyback_bps: u64,
) -> Result<u64, ()> {
    let wide = (protocol as u128) * (buyback_bps as u128) / 10_000;
    let buyback = u64::try_from(wide).map_err(|_| ())?;
    let retained = protocol.checked_sub(buyback).ok_or(())?;
    *protocol_balance = protocol_balance.checked_add(retained).ok_or(())?;
    *creator_balance = creator_balance.checked_add(creator).ok_or(())?;
    Ok(buyback)
}

// 841d8->81848; native funding includes both obligations before direct debit.
pub fn native_funding(curve_payment: u64, buyback_payment: u64) -> Result<u64, ()> {
    curve_payment.checked_add(buyback_payment).ok_or(())
}
