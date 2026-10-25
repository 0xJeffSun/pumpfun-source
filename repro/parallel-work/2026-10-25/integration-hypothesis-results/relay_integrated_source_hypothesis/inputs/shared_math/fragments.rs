// Analytical sketches only. Not historical source, a deployable candidate, or an ABI.
// Not compiled or executed. Error allocation/formatting/panics and account effects omitted.

// Ordinal104 [114032,114488), error construction writes 6009 at114368.
pub fn check_104(length_register: u64) -> Result<(), u32> {
    if length_register < 256 { Ok(()) } else { Err(6009) }
}
// Ordinal107 [118896,119360): only low16 bits are tested.
pub fn check_107(register: u64) -> Result<(), u32> {
    if (register & 0xffff) < 10001 { Ok(()) } else { Err(6018) }
}
// Ordinal105: compared bytes are loaded via *entry_r2, not from entry_r2 itself.
// [114568,114728), fixed bytes [752896,752928); error code at115040.
pub fn check_105(loaded_key: &[u8; 32], retained_key: &[u8; 32]) -> Result<(), u32> {
    if loaded_key == retained_key { Ok(()) } else { Err(6015) }
}
// Ordinal112 arithmetic tail only, conditional on successful surrounding helpers.
// before: stack[-944]; after: stack[-416]; bps: entry_arg3+64 (u16).
// accumulated: *(*entry_arg2+8)+72. Returns derived values, does not mutate accounts.
// [140808,141264). All three failures enter ordinal115 with enum value8 ->6008.
pub fn tail_112(before: u64, after: u64, bps: u16, accumulated: u64)
    -> Result<(u64, u64, u64), u32>
{
    let delta = after.checked_sub(before).ok_or(6008u32)?;
    let product = delta.checked_mul(bps as u64).ok_or(6008u32)?;
    let updated = accumulated.checked_add(delta).ok_or(6008u32)?;
    Ok((delta, updated, product / 10000))
}
// Ordinal113 mathematical core on an explicitly restricted domain:
// n<=20 and all weights<=10000, valid accessible buffers, successful allocations.
// These are MODEL PRECONDITIONS, not additional checks claimed in the binary.
// Retains empty behavior, checked sum, descending remainder and small-sort tie order.
// [141384,143608), sorter58 [35648,36192), multiply483, divide479 special denominator.
// Caller admission, Vec layout, error ABI and n>=21 sorting are outside the sketch.
pub fn core_113_small(total: u64, weights: &[u16]) -> Result<Vec<u64>, u32> {
    assert!(weights.len() <= 20 && weights.iter().all(|&w| w <= 10000));
    if weights.is_empty() { return Ok(Vec::new()); }
    let mut amounts = Vec::new();
    let mut ranked: Vec<(usize, u128)> = Vec::new();
    let mut sum = 0u64;
    for (i, &w) in weights.iter().enumerate() {
        let product = (w as u128) * (total as u128);
        let q = (product / 10000) as u64;
        amounts.push(q);
        ranked.push((i, product - (q as u128) * 10000));
        sum = sum.checked_add(q).ok_or(6008u32)?;
    }
    let leftover = total.checked_sub(sum).ok_or(6008u32)?;
    if leftover == 0 { return Ok(amounts); }
    // Strict movement preserves input order for equal remainders, as sorter58 does.
    for i in 1..ranked.len() {
        let mut j = i;
        while j > 0 && ranked[j-1].1 < ranked[j].1 {
            ranked.swap(j-1, j);
            j -= 1;
        }
    }
    for &(i, _) in ranked.iter().take(leftover.min(weights.len() as u64) as usize) {
        amounts[i] = amounts[i].checked_add(1).ok_or(6008u32)?;
    }
    Ok(amounts)
}
