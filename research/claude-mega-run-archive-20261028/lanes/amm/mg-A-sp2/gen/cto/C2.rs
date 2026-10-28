pub fn handler(
    ctx: Context<AdminCtoPool>,
    coin_creator: Pubkey,
    is_holder_reward: bool,
    creator_fee_bps: Option<u64>,
) -> Result<()> {
    let global_config = &ctx.accounts.global_config;

    // Only canonical pools created by Pump migrations (pool creator is the
    // Pump pool-authority PDA of the base mint) have a coin creator.
    // (see `crate::utils::pool_authority`).

    require!(
        ctx.accounts.pool.creator == crate::utils::pool_authority(&ctx.accounts.pool.base_mint),
        PumpAmmError::OnlyCanonicalPumpPoolsCanHaveCoinCreator
    );
    require!(
        !ctx.accounts.pool.is_mayhem_mode,
        PumpAmmError::CtoNotAllowedForMayhemPool
    );

    let (holder_rewards, _) =
        Pubkey::find_program_address(&[b"holder-rewards", ctx.accounts.pool.base_mint.as_ref()], &trade::PUMP);

    if ctx.accounts.pool.is_holder_reward {
        require!(
            is_holder_reward && coin_creator == holder_rewards,
            PumpAmmError::HolderRewardCreatorImmutable
        );
    }
    if is_holder_reward {
        require_keys_eq!(
            coin_creator,
            holder_rewards,
            PumpAmmError::InvalidHolderRewardCoinCreator
        );
    }

    let is_cashback_coin = if is_holder_reward {
        false
    } else {
        ctx.accounts.pool.is_cashback_coin
    };

    if let Some(creator_fee_bps) = creator_fee_bps {
        // Creator fees are not configurable for SOL / USDC quoted pools, nor
        // for cashback coins.
        require!(
            !is_native_or_usdc(&ctx.accounts.pool.quote_mint),
            PumpAmmError::CreatorFeeNotConfigurableForQuote
        );
        require!(
            !is_cashback_coin,
            PumpAmmError::CreatorFeeNotAllowedForCashbackCoin
        );
        require!(
            global_config.creator_fee_configurable,
            PumpAmmError::CreatorFeeNotConfigurable
        );
        require!(
            creator_fee_bps > 0
                && creator_fee_bps <= global_config.max_configurable_creator_fee_bps,
            PumpAmmError::CreatorFeeBpsOutOfRange
        );
    }

    // The coin creator fees accrued so far belong to the old coin creator
    // and must be collected before it is replaced (see
    // `collect_coin_creator_fee`).
    require!(
        ctx.accounts.pool.creator_fees == 0,
        PumpAmmError::CreatorFeesNotSwept
    );

    crate::instructions::swap::prepare_pool(
        &ctx.accounts.pool,
        ctx.accounts.system_program.as_ref(),
        ctx.accounts.payer.as_ref(),
    )?;

    let old_coin_creator = ctx.accounts.pool.coin_creator;
    ctx.accounts.pool.coin_creator = coin_creator;
    ctx.accounts.pool.is_holder_reward = is_holder_reward;
    ctx.accounts.pool.is_cashback_coin = is_cashback_coin;

    let old_creator_fee_bps = ctx.accounts.pool.creator_fee_bps;
    if let Some(creator_fee_bps) = creator_fee_bps {
        ctx.accounts.pool.creator_fee_bps = creator_fee_bps;
    }
    ctx.accounts.pool.can_edit_creator_fee = false;

    let event = AdminCtoPoolEvent {
        timestamp: Clock::get()?.unix_timestamp,
        base_mint: ctx.accounts.pool.base_mint,
        pool: ctx.accounts.pool.key(),
        old_coin_creator,
        new_coin_creator: coin_creator,
        is_holder_reward,
        is_cashback_coin,
        old_creator_fee_bps,
        new_creator_fee_bps: ctx.accounts.pool.creator_fee_bps,
    };
    emit!(event);
    emit_cpi!(event);

    Ok(())
}
