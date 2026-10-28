pub fn validate_multi_hop_pool(pool: &Pool, charges_creator_fee: bool) -> Result<()> {
    let pool_authority = crate::utils::pool_authority(&pool.base_mint);
    require!(pool.creator == pool_authority, PumpAmmError::OnlyPumpPools);
    require!(!charges_creator_fee || !pool.is_cashback_coin, PumpAmmError::CashbackCoinNotSupported);
    // Mayhem pools route their fees through the Mayhem program, which a
    // multi-hop swap does not forward, so they are rejected even when this
    // hop charges no fees.
    require!(!pool.is_mayhem_mode, PumpAmmError::MayhemPoolNotSupported);
    Ok(())
}
