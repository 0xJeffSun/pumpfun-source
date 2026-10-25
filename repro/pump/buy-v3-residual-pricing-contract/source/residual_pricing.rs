// Uncompiled source hypothesis. No account admission, CPI, mutation or event is
// implemented here. Types are explanatory, not the original Rust or Anchor ABI.
// Caller supplies S and D from the unchanged amount-selection contract. It must
// use the same immutable pretrade fee context on q1 and q2, in that order.
// Captured historical source coordinates belong only in the evidence ledger.
#[derive(Clone, Copy, Debug)]
pub enum Fault { Overflow, Truncation, DivisionByZero, NotEnoughTokensToBuy, TooMuchSolRequired }
#[derive(Clone, Copy, Debug)]
pub struct ArithmeticFailure {
    pub kind: Fault,
    pub compared_values: Option<(u128, u128)>,
}
fn failure(kind: Fault) -> ArithmeticFailure {
    ArithmeticFailure { kind, compared_values: None }
}
fn compared(kind: Fault, left: u128, right: u128) -> ArithmeticFailure {
    ArithmeticFailure { kind, compared_values: Some((left, right)) }
}
fn add(a: u64, b: u64) -> Result<u64, ArithmeticFailure> {
    a.checked_add(b).ok_or_else(|| failure(Fault::Overflow))
}
fn narrow(n: u128) -> Result<u64, ArithmeticFailure> {
    u64::try_from(n).map_err(|_| failure(Fault::Truncation))
}
#[derive(Clone, Copy)]
pub struct Pool { pub base: u64, pub quote: u64 }
#[derive(Clone, Copy)]
pub struct Fees {
    pub protocol: u64, pub creator: u64,
    pub protocol_rate: u64, pub creator_rate: u64,
}
#[derive(Clone, Copy)]
pub struct FirstLeg { pub base: u64, pub quote: u64, pub fees: Fees }
#[derive(Clone, Copy)]
pub struct ResidualLeg {
    pub base: u64, pub quote: u64, pub pool_before: Pool, pub fees: Fees,
}

// First quote is floor+1, including exact division. The caller has already
// rejected zero S and applied the exact optional-fill/mode selection rules.
pub fn first_quote(x: u64, y: u64, selected: u64) -> Result<u64, ArithmeticFailure> {
    let numerator = selected as u128 * y as u128;
    let denominator = x.checked_sub(selected).ok_or_else(|| failure(Fault::Overflow))?;
    if denominator == 0 { return Err(failure(Fault::DivisionByZero)); }
    narrow(numerator / denominator as u128 + 1)
}

// Pure preparation: the original writes only its stack result here. This does
// not debit the vault, charge the migration fee or update any curve reserve.
pub fn residual_pool(
    real_quote: u64, migration_fee: u64, actual_base_vault: u64,
    native_quote: bool, selected: u64, first_quote: u64,
) -> Result<Pool, ArithmeticFailure> {
    let base = actual_base_vault.checked_sub(selected)
        .ok_or_else(|| failure(Fault::Overflow))?;
    let mut quote = add(real_quote, first_quote)?;
    if native_quote {
        quote = quote.checked_sub(migration_fee).ok_or_else(|| failure(Fault::Overflow))?;
    }
    if base == 0 { return Err(compared(Fault::NotEnoughTokensToBuy, 0, 0)); }
    if quote == 0 { return Err(compared(Fault::Overflow, 0, 0)); }
    Ok(Pool { base, quote })
}

// Preserve the actual checked (n+d)-1 ordering. Replacing this with n+(d-1),
// quotient/remainder, or floor+1 changes some overflow/zero-denominator behavior.
fn checked_ceil(n: u128, d: u128) -> Result<u128, ArithmeticFailure> {
    let sum = n.checked_add(d).ok_or_else(|| failure(Fault::Overflow))?;
    let rounded = sum.checked_sub(1).ok_or_else(|| failure(Fault::Overflow))?;
    if d == 0 { return Err(failure(Fault::DivisionByZero)); }
    Ok(rounded / d)
}
pub fn residual_quote(pool: Pool, remaining: u64) -> Result<u64, ArithmeticFailure> {
    if pool.base <= remaining {
        return Err(compared(Fault::NotEnoughTokensToBuy, pool.base as u128, remaining as u128));
    }
    let numerator = remaining as u128 * pool.quote as u128;
    let q = checked_ceil(numerator, (pool.base - remaining) as u128)?;
    narrow(q)
}

// Required external implementation, not a successful fee stub. A real adapter
// must preserve the 0x7fde8 fee routine's errors and pretrade context identity.
pub trait PretradeFees {
    type Error;
    fn fees(&self, quote: u64) -> Result<Fees, Self::Error>;
}
pub enum ResidualFailure<E> { Arithmetic(ArithmeticFailure), Fee(E) }
pub fn price_residual<F: PretradeFees>(
    pool: Pool, remaining: u64, pretrade: &F,
) -> Result<ResidualLeg, ResidualFailure<F::Error>> {
    let quote = residual_quote(pool, remaining).map_err(ResidualFailure::Arithmetic)?;
    let fees = pretrade.fees(quote).map_err(ResidualFailure::Fee)?;
    Ok(ResidualLeg { base: remaining, quote, pool_before: pool, fees })
}

// Restricted source-domain witnesses, not new original-program guards. The
// caller must already prove ordinary mode, b<=10000, and descriptor ABSENT.
// There is intentionally no entry point accepting a present descriptor.
pub struct OrdinaryRate(u64);
impl OrdinaryRate {
    pub fn from_proved_ordinary_rate(b: u64) -> Option<Self> {
        if b <= 10_000 { Some(Self(b)) } else { None }
    }
}
pub struct AbsentQuoteAdjustment;
pub struct Cost {
    pub curve_payment: u64,
    pub total_buyback: u64,
    pub adaptation_difference: u64,
}
fn gross(quote: u64, fees: Fees) -> Result<u64, ArithmeticFailure> {
    add(add(quote, fees.protocol)?, fees.creator)
}
pub fn cost_absent_adjustment(
    first: FirstLeg, residual: Option<&ResidualLeg>,
    rate: &OrdinaryRate, _absent: AbsentQuoteAdjustment,
) -> Result<Cost, ArithmeticFailure> {
    // In the proved domain, the original high-limb and <=protocol assertions
    // hold. Their exceptional panic paths remain outside this function's scope.
    let b1 = ((first.fees.protocol as u128 * rate.0 as u128) / 10_000) as u64;
    let b2 = match residual {
        Some(r) => ((r.fees.protocol as u128 * rate.0 as u128) / 10_000) as u64,
        None => 0,
    };
    let total_buyback = add(b1, b2)?; // Checked BEFORE either gross leg.
    let first_gross = gross(first.quote, first.fees)?;
    let residual_gross = match residual { Some(r) => gross(r.quote, r.fees)?, None => 0 };
    let total_gross = add(first_gross, residual_gross)?;
    let curve_payment = total_gross.checked_sub(total_buyback)
        .ok_or_else(|| failure(Fault::Overflow))?;
    // Only descriptor-absent identity is implemented. This zero is NOT the B7
    // trailing adjustment, or any descriptor-present B6 amount.
    Ok(Cost { curve_payment, total_buyback, adaptation_difference: 0 })
}
pub fn checked_total(cost: &Cost) -> Result<u64, ArithmeticFailure> {
    add(cost.curve_payment, cost.total_buyback)
}
// The body's max-cost error has additional original metadata; this helper
// models only its known strict comparison, not its complete rich error ABI.
pub fn enforce_max(total: u64, max: u64) -> Result<(), ArithmeticFailure> {
    if total > max { return Err(compared(Fault::TooMuchSolRequired, max as u128, total as u128)); }
    Ok(())
}
