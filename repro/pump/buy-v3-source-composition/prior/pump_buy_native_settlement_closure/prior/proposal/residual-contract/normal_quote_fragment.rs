// New explanatory source, not recovered historical source or an integration patch.
// Domain: admitted buy_v3, non-Mayhem, non-whitelisted signer; ordinary amount
// adapters; successful selector/runtime premises stated in REPORT.md.
// Call fees against UNMODIFIED pre-trade accounts on BOTH invocations.
#[derive(Clone, Copy)]
pub struct Fees { pub protocol: u64, pub creator: u64 }
pub struct Leg { pub base: u64, pub quote: u64, pub fees: Fees, pub buyback: u64 }
pub struct Plan {
    pub first: Leg, pub residual: Option<Leg>,
    pub pool_base_before: u64, pub pool_quote_before: u64,
    pub curve_payment: u64, pub recipient_payment: u64, pub total: u64,
}
#[derive(Debug)]
pub enum Boundary { Arithmetic, ZeroSelected, ExhaustedPool, Narrow, MaxCost }
fn add(a: u64, b: u64) -> Result<u64, Boundary> {
    a.checked_add(b).ok_or(Boundary::Arithmetic)
}
fn narrow(x: u128) -> Result<u64, Boundary> {
    u64::try_from(x).map_err(|_| Boundary::Narrow)
}
// The callback preserves exact selector errors; Boundary is explanatory only.
pub fn quote_normal(
    requested: u64, virtual_base: u64, virtual_quote: u64, real_base: u64,
    real_quote: u64, actual_base_vault: u64, native_quote: bool,
    migration_fee: u64, buyback_bps: u64, max_cost: u64,
    mut fees: impl FnMut(u64) -> Result<Fees, Boundary>,
) -> Result<Plan, Boundary> {
    // Precondition buyback_bps <= 10000. Original exceptional terminal paths
    // for excessive buyback rates are deliberately not replaced with errors.
    let selected = requested.min(real_base);
    let remaining = requested - selected;
    if selected == 0 { return Err(Boundary::ZeroSelected); }
    let denom = virtual_base.checked_sub(selected).ok_or(Boundary::Arithmetic)?;
    if denom == 0 { return Err(Boundary::Arithmetic); }
    let q1 = narrow((selected as u128 * virtual_quote as u128) / denom as u128 + 1)?;
    let f1 = fees(q1)?;
    let (mut pb, mut pq) = (0, 0);
    let residual = if remaining == 0 { None } else {
        pb = actual_base_vault.checked_sub(selected).ok_or(Boundary::Arithmetic)?;
        pq = add(real_quote, q1)?;
        if native_quote { pq = pq.checked_sub(migration_fee).ok_or(Boundary::Arithmetic)?; }
        if pb == 0 { return Err(Boundary::ZeroSelected); }
        if pq == 0 { return Err(Boundary::Arithmetic); }
        if remaining >= pb { return Err(Boundary::ExhaustedPool); }
        let d = (pb - remaining) as u128;
        let q2 = narrow((remaining as u128 * pq as u128 + d - 1) / d)?;
        let f2 = fees(q2)?;
        Some(Leg { base: remaining, quote: q2, fees: f2, buyback: 0 })
    };
    let bb = |f: Fees| ((f.protocol as u128 * buyback_bps as u128) / 10000) as u64;
    let b1 = bb(f1);
    let mut residual = residual;
    let b2 = match &mut residual { Some(l) => { l.buyback = bb(l.fees); l.buyback }, None => 0 };
    let recipient_payment = add(b1, b2)?;
    // Preserve per-leg checked gross sums before combining/subtracting buyback.
    let g1 = add(add(q1, f1.protocol)?, f1.creator)?;
    let g2 = match &residual { Some(l) => add(add(l.quote, l.fees.protocol)?, l.fees.creator)?, None => 0 };
    let gross = add(g1, g2)?;
    let curve_payment = gross.checked_sub(recipient_payment).ok_or(Boundary::Arithmetic)?;
    let total = add(curve_payment, recipient_payment)?;
    if total > max_cost { return Err(Boundary::MaxCost); }
    Ok(Plan { first: Leg { base: selected, quote: q1, fees: f1, buyback: b1 },
        residual, pool_base_before: pb, pool_quote_before: pq,
        curve_payment, recipient_payment, total })
}
