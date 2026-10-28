#[inline(never)]
pub fn buy<'info>(
    ctx: Context<'_, '_, '_, 'info, LegacyBuy<'info>>,
    base_amount_out: u64,
    max_quote_amount_in: u64,
    track_volume: bool,
) -> Result<()> {
    let a = &mut *ctx.accounts;
//PAD
    require!( //@317
        a.global_config.disable_flags & 8 == 0,
        PumpAmmError::DisabledBuy
    );
    crate::instructions::swap::prepare_pool(&a.pool, a.system_program.as_ref(), a.user.as_ref())?;
    crate::instructions::swap::validate_protocol_fee_recipient(
        &a.global_config, &a.protocol_fee_recipient, a.pool.is_mayhem_mode as u8,
    )?;
//PAD
    require_gt!(base_amount_out, 0, PumpAmmError::ZeroBaseAmount); //@326
    require_gt!(max_quote_amount_in, 0, PumpAmmError::ZeroQuoteAmount); //@327
    let user_base_token_reserves = a.user_base_token_account.amount;
    let user_quote_token_reserves = a.user_quote_token_account.amount;
    let pool_base_token_reserves = a.pool_base_token_account.amount;
    let pool_quote_token_reserves = a.pool_quote_token_account.amount;
    a.pool.available_quote_reserves(pool_quote_token_reserves)?;
    let q = a.pool.effective_quote_reserves(pool_quote_token_reserves)?;
    let b = pool_base_token_reserves;
    let curve_initial = crate::curve::constant_product::quote_for_base(base_amount_out, b, q)?;
    let selected = crate::curve::fees::select_and_apply(
        &a.pool, &a.global_config, &a.fee_config, &a.fee_program, &a.program,
        &a.base_mint, b, q, curve_initial,
    )?;
    let mut selected = selected;
    if a.global_config.whitelist_pda == a.user.key() {
        selected.lp_fee_bps = 0;
        selected.protocol_fee_bps = 0;
        selected.creator_fee_bps = 0;
        selected.lp_fee = 0;
        selected.protocol_fee = 0;
        selected.creator_fee = 0;
    }
    let curve = curve_initial;
    let lp_fee = selected.lp_fee;
    let protocol_fee = selected.protocol_fee;
    let creator_fee = selected.creator_fee;
//PAD
    let pool_quote = curve
        .checked_add(lp_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@387
//PAD
    let total = pool_quote
        .checked_add(creator_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@391
//PAD
    let total = total
        .checked_add(protocol_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@395
    let quote_fee_data = crate::utils::transfer_fee::from_mint(&a.quote_mint.to_account_info())?;
    let gross_pool_quote = crate::utils::transfer_fee::amount_before_fee(&quote_fee_data, pool_quote)?;
//PAD
    let quote_transfer_fee = gross_pool_quote
        .checked_sub(pool_quote)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@404
    require_gte!( //@405
        max_quote_amount_in,
        total
            .checked_add(quote_transfer_fee)
            .ok_or_else(|| error!(PumpAmmError::Overflow))?, //@409
        PumpAmmError::ExceededSlippage
    );
    crate::utils::token::transfer_from_pool(
        a.base_token_program.as_ref(),
        &a.base_mint,
        &a.pool_base_token_account,
        &a.user_base_token_account,
        base_amount_out,
        &a.pool,
    )?;
    crate::utils::token::transfer_checked(
        a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account,
        &a.pool_quote_token_account, a.user.as_ref(), gross_pool_quote, &[],
    )?;
    let (buyback_fee, net_protocol) = a.global_config.split_buyback(
        protocol_fee,
        a.pool.is_mayhem_mode,
    );
    crate::utils::token::transfer_checked(
        a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account,
        &a.protocol_fee_recipient_token_account, a.user.as_ref(), net_protocol, &[],
    )?;
    let mut is_cashback = false;
    let mut next = 0;
    if creator_fee > 0 {
        if a.pool.is_cashback_coin {
            distribute_cashback(
                ctx.remaining_accounts,
                a.user.as_ref(),
                &mut *a.user_volume_accumulator,
                &a.user_quote_token_account,
                a.quote_mint.decimals,
                a.quote_mint.as_ref().as_ref(),
                a.quote_token_program.as_ref(),
                a.system_program.as_ref(),
                a.associated_token_program.as_ref(),
                creator_fee,
                &a.base_mint.key(),
            )?;
            next = 2;
            is_cashback = true;
        } else {
            crate::instructions::swap::sell::validate_pool_v2(ctx.remaining_accounts, &a.base_mint.key(), 0)?;
            next = 1;
            crate::utils::token::transfer_checked(
                a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account,
                &a.coin_creator_vault_ata, a.user.as_ref(), creator_fee, &[],
            )?;
        }
    }
    let (owner, dest) = get_buyback_accounts(
        ctx.remaining_accounts, &a.global_config, next, &a.quote_mint.key(), &a.quote_token_program.key(),
    )?;
    if buyback_fee > 0 {
        crate::utils::token::transfer_checked_with_ata(
            a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account,
            owner, dest, a.user.as_ref(), &a.system_program, &a.associated_token_program,
            buyback_fee, &[],
        )?;
    }
    a.user_volume_accumulator.user = a.user.key();
    let total_unclaimed_tokens = a.user_volume_accumulator.total_unclaimed_tokens;
    let total_claimed_tokens = a.user_volume_accumulator.total_claimed_tokens;
    let current_sol_volume = a.user_volume_accumulator.current_sol_volume;
    let last_update_timestamp = a.user_volume_accumulator.last_update_timestamp;
    let event = BuyEvent {
        timestamp: Clock::get()?.unix_timestamp,
        base_amount_out,
        max_quote_amount_in,
        user_base_token_reserves,
        user_quote_token_reserves,
        pool_base_token_reserves,
        pool_quote_token_reserves,
        quote_amount_in: curve,
        lp_fee_basis_points: selected.lp_fee_bps,
        lp_fee,
        protocol_fee_basis_points: selected.protocol_fee_bps,
        protocol_fee,
        quote_amount_in_with_lp_fee: pool_quote,
        user_quote_amount_in: total,
        pool: a.pool.key(),
        user: a.user.key(),
        user_base_token_account: a.user_base_token_account.key(),
        user_quote_token_account: a.user_quote_token_account.key(),
        protocol_fee_recipient: a.protocol_fee_recipient.key(),
        protocol_fee_recipient_token_account: a.protocol_fee_recipient_token_account.key(),
        coin_creator: a.pool.coin_creator,
        coin_creator_fee_basis_points: if is_cashback {
            0
        } else {
            selected.creator_fee_bps
        },
        coin_creator_fee: if is_cashback {
            0
        } else {
            creator_fee
        },
        holder_rewards_bps: if a.pool.is_holder_reward {
            selected.creator_fee_bps
        } else {
            0
        },
        holder_rewards: if a.pool.is_holder_reward {
            creator_fee
        } else {
            0
        },
        track_volume,
        total_unclaimed_tokens,
        total_claimed_tokens,
        current_sol_volume,
        last_update_timestamp,
        min_base_amount_out: base_amount_out,
        ix_name: "buy".to_string(),
        cashback_fee_basis_points: if is_cashback {
            selected.creator_fee_bps
        } else {
            0
        },
        cashback: if is_cashback {
            creator_fee
        } else {
            0
        },
        buyback_fee_basis_points: if a.pool.is_mayhem_mode { 0 } else { a.global_config.buyback_basis_points },
        buyback_fee: crate::utils::transfer_fee::amount_after_fee(&quote_fee_data, buyback_fee)?,
        virtual_quote_reserves: a.pool.virtual_quote_reserves,
        can_boost: a.pool.can_boost(),
        base_supply: if a.pool.is_mayhem_mode { 1_000_000_000_000_000 } else { a.base_mint.supply },
        creator_fee_unclaimed: a.pool.creator_fees,
        quote_transfer_fee,
    };
    emit!(event);
    emit_cpi!(event);
    Ok(())
}
