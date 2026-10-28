fn select_fees_v2<'a>(
    pool: &Pool,
    config: &'a trade::TradeFeeConfig,
    fee_config_len: usize,
    base_supply: u64,
    base_reserve: u64,
    quote_reserve: u64,
) -> Result<&'a trade::TradeFees> {
    let cap = pool.market_cap(base_supply, base_reserve, quote_reserve)?;
    // Only pools migrated from the bonding curve are priced by market cap.
    let canonical = {
        let authority = Pubkey::find_program_address(
            &[b"pool-authority", pool.base_mint.as_ref()],
            &trade::PUMP,
        ).0;
        pool.creator == authority
    };
    require!(fee_config_len >= 2512, PumpAmmError::FeeConfigTooShort);
    if !canonical {
        return Ok(&config.flat_fees);
    }
    let quote = &pool.quote_mint;
    if quote == &anchor_spl::token::spl_token::native_mint::ID || quote == &NORMAL_QUOTE {
        Ok(tier(&config.fee_tiers, cap)?)
    } else if quote == &STABLE_QUOTE {
        let tiers: &[trade::TradeFeeTier] = if fee_config_len >= 4073 { &config.stable_fee_tiers } else { &[] };
        Ok(tier(tiers, cap)?)
    } else if fee_config_len >= 4097 && (config.exotic_flat_fees.lp_fee_bps != 0 || config.exotic_flat_fees.protocol_fee_bps != 0 || config.exotic_flat_fees.creator_fee_bps != 0) {
        Ok(&config.exotic_flat_fees)
    } else {
        Ok(&config.flat_fees)
    }
}

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
    let selected = select_fees_v2(pool, config, fee_config_len, base_supply, base_reserve, quote_reserve)?;
    let mut fees = selected.clone();
    if global_config.creator_fee_configurable && pool.creator_fee_bps != 0 {
        fees.creator_fee_bps = pool.creator_fee_bps;
    }
    apply(pool, quote_amount, fees.lp_fee_bps, fees.protocol_fee_bps, fees.creator_fee_bps)
}
