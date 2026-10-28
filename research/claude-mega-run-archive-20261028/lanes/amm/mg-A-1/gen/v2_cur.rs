pub fn select_and_apply_v2(
    pool: &Pool,
    global_config: &GlobalConfig,
    config: &trade::TradeFeeConfig,
    fee_config_len: usize,
    base_supply: u64,
    base_reserve: u64,
    quote_reserve: u64,
    quote_amount: u64,
) -> Result<AppliedFees> {
    let cap = pool.market_cap(base_supply, base_reserve, quote_reserve)?;
    let authority = Pubkey::find_program_address(&[b"pool-authority", pool.base_mint.as_ref()], &trade::PUMP).0;
    let canonical = pool.creator == authority;
    require!(fee_config_len >= 2512, PumpAmmError::FeeConfigTooShort);
    let selected = if !canonical {
        &config.flat_fees
    } else {
        let quote = pool.quote_mint;
        if quote == anchor_spl::token::spl_token::native_mint::ID || quote == NORMAL_QUOTE {
            tier(&config.fee_tiers, cap)?
        } else if quote == STABLE_QUOTE {
            let tiers: &[trade::TradeFeeTier] = if fee_config_len >= 4073 { &config.stable_fee_tiers } else { &[] };
            tier(tiers, cap)?
        } else if fee_config_len >= 4097 && (config.exotic_flat_fees.lp_fee_bps != 0 || config.exotic_flat_fees.protocol_fee_bps != 0 || config.exotic_flat_fees.creator_fee_bps != 0) {
            &config.exotic_flat_fees
        } else {
            &config.flat_fees
        }
    };
    let creator_fee_bps = if global_config.creator_fee_configurable && pool.creator_fee_bps != 0 { pool.creator_fee_bps } else { selected.creator_fee_bps };
    apply(pool, quote_amount, selected.lp_fee_bps, selected.protocol_fee_bps, creator_fee_bps)
}
