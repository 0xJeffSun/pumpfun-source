pub(super) fn walk(g: &Global, accounts: &[AccountInfo<'_>]) -> Result<(u64, u8)> {
    // Slicing preserves the original <4 bounds failure. The ordinary caller has
    // already admitted the prefix; exactly four is UnsupportedQuoteMint.
    let mut tail = &accounts[4..];
    let first = tail.first().ok_or_else(|| error!(PumpError::UnsupportedQuoteMint))?;
    let mut mint = *accounts[0].key;
    let mut curve = ancestor(first, &mint)?;
    let depth = curve.depth.checked_add(1).ok_or_else(overflow)?;
    require_gte!(g.max_curve_depth.min(5), depth, PumpError::CurveDepthExceeded);
    require!(!curve.is_mayhem_mode, PumpError::QuoteBondingCurveNotEligible);
    // Five logical slots; inactive storage has no Pool tail interpretation.
    let mut records = [Record::Pool { base: 0, quote: 0 }; 5];
    let mut seed = 0;
    for position in 0..usize::from(depth) {
        if position != 0 {
            mint = curve.quote_mint;
// layout-pad(30): aligns the next Source site with the original line





























            let account = tail.first().ok_or_else(|| error!(PumpError::QuoteChainAccountsRequired))?;
            curve = ancestor(account, &mint)?;
        }
        if position + 1 == usize::from(depth) {
            let control = accounts[3].try_borrow_data()?;
            seed = root_seed(g, &curve.quote_mint, &control)?;
        }
        if curve.virtual_token_reserves == 0 && curve.virtual_quote_reserves == 0
            && curve.real_token_reserves == 0 && curve.real_quote_reserves == 0 {
            require!(tail.len() >= 4, PumpError::QuotePoolAccountsRequired);
            records[position] = pool_record(&mint, &curve.quote_mint, &tail[1], &tail[2], &tail[3])?;
            tail = &tail[4..];
        } else {
            require!(!curve.complete, PumpError::QuoteCurveAwaitingMigration);
            let pool_base = curve.token_total_supply.checked_sub(g.initial_real_token_reserves).ok_or_else(overflow)?;
            records[position] = Record::Curve {
                vt: curve.virtual_token_reserves, vq: curve.virtual_quote_reserves,
                rt: curve.real_token_reserves, rq: curve.real_quote_reserves, pool_base,
                migration_fee: if curve.quote_mint == Pubkey::default() { g.pool_migration_fee } else { 0 },
            };
            tail = &tail[1..];
        }
    }
    // No positional-depth equality, repeated eligibility, or tail-count guard.
    Ok((price(g, seed, &records[..usize::from(depth)])?, depth))
}
