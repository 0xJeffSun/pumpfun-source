//PAD
pub fn execute<'info>(
    ctx: Context<'_, '_, 'info, 'info, LegacySell<'info>>,
    base_amount_in: u64,
    min_quote_amount_out: u64,
) -> Result<()> {
//PAD
    require!(ctx.accounts.global_config.disable_flags & 16 == 0, PumpAmmError::DisabledSell); //@101
//PAD
    super::prepare_pool(&ctx.accounts.pool, &ctx.accounts.system_program, &ctx.accounts.user)?;
    super::validate_protocol_fee_recipient(
        &ctx.accounts.global_config,
        &ctx.accounts.protocol_fee_recipient,
        ctx.accounts.pool.is_mayhem_mode as u8,
    )?;
//PAD
    require_gt!(base_amount_in, 0, PumpAmmError::ZeroBaseAmount); //@110
//PAD
    let user_base_token_reserves = ctx.accounts.user_base_token_account.amount;
    let user_quote_token_reserves = ctx.accounts.user_quote_token_account.amount;
    let pool_base_token_reserves = ctx.accounts.pool_base_token_account.amount;
    let pool_quote_token_reserves = ctx.accounts.pool_quote_token_account.amount;
    let quote_reserves = ctx
        .accounts
        .pool
        .effective_quote_reserves(pool_quote_token_reserves)?;
    let quote_amount_out = crate::curve::constant_product::quote_for_sell(
        base_amount_in,
        pool_base_token_reserves,
        quote_reserves,
    )?;
    let fees = crate::curve::fees::select_and_apply(
        &ctx.accounts.pool,
        &ctx.accounts.global_config,
        &ctx.accounts.fee_config,
        &ctx.accounts.fee_program,
        &ctx.accounts.program,
        &ctx.accounts.base_mint,
        pool_base_token_reserves,
        quote_reserves,
        quote_amount_out,
    )?;
    let fees = if ctx.accounts.global_config.whitelist_pda == ctx.accounts.user.key() {
        crate::curve::fees::AppliedFees::default()
    } else {
        fees
    };
//PAD
    let quote_amount_out_without_lp_fee = quote_amount_out
        .checked_sub(fees.lp_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@167
//PAD
    require_gte!( //@171
        ctx.accounts.pool.available_quote_reserves(pool_quote_token_reserves)?,
        quote_amount_out_without_lp_fee,
        PumpAmmError::InsufficientRealQuoteReserves
    );
//PAD
    let quote_amount_out_without_creator_fee = quote_amount_out_without_lp_fee
        .checked_sub(fees.creator_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@179
//PAD
    let user_quote_amount_out = quote_amount_out_without_creator_fee
        .checked_sub(fees.protocol_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@183
    let quote_fee =
        crate::utils::transfer_fee::from_mint(&ctx.accounts.quote_mint.to_account_info())?;
    let user_quote_amount_out_after_fee =
        crate::utils::transfer_fee::amount_after_fee(&quote_fee, user_quote_amount_out)?;
//PAD
    require_gte!( //@189
        user_quote_amount_out_after_fee,
        min_quote_amount_out,
        PumpAmmError::ExceededSlippage
    );
//PAD
    let quote_transfer_fee = user_quote_amount_out
        .checked_sub(user_quote_amount_out_after_fee)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@196
    crate::utils::token::transfer_checked(
        &ctx.accounts.base_token_program,
        &ctx.accounts.base_mint,
        &ctx.accounts.user_base_token_account,
        &ctx.accounts.pool_base_token_account,
        &ctx.accounts.user,
        base_amount_in,
        &[],
    )?;
    crate::utils::token::transfer_from_pool(
        &ctx.accounts.quote_token_program,
        &ctx.accounts.quote_mint,
        &ctx.accounts.pool_quote_token_account,
        &ctx.accounts.user_quote_token_account,
        user_quote_amount_out,
        &ctx.accounts.pool,
    )?;
    let (buyback_fee, protocol_fee) = ctx
        .accounts
        .global_config
        .split_buyback(fees.protocol_fee, ctx.accounts.pool.is_mayhem_mode);
    crate::utils::token::transfer_from_pool(
        &ctx.accounts.quote_token_program,
        &ctx.accounts.quote_mint,
        &ctx.accounts.pool_quote_token_account,
        &ctx.accounts.protocol_fee_recipient_token_account,
        protocol_fee,
        &ctx.accounts.pool,
    )?;
    let mut buyback_index = 0;
    let mut is_cashback = false;
    if fees.creator_fee > 0 {
        if ctx.accounts.pool.is_cashback_coin {
            cashback(
                ctx.remaining_accounts,
                &ctx.accounts.user,
                &ctx.accounts.pool_quote_token_account,
                &ctx.accounts.quote_mint,
                &ctx.accounts.quote_token_program,
                &ctx.accounts.system_program,
                &ctx.accounts.associated_token_program,
                fees.creator_fee,
                &ctx.accounts.pool,
                &ctx.accounts.base_mint.key(),
            )?;
            is_cashback = true;
            buyback_index = 3;
        } else {
            validate_pool_v2(ctx.remaining_accounts, &ctx.accounts.base_mint.key(), 0)?;
            crate::utils::token::transfer_from_pool(
                &ctx.accounts.quote_token_program,
                &ctx.accounts.quote_mint,
                &ctx.accounts.pool_quote_token_account,
                &ctx.accounts.coin_creator_vault_ata,
                fees.creator_fee,
                &ctx.accounts.pool,
            )?;
            buyback_index = 1;
        }
    }
    let (buyback_authority, buyback_token_account) =
        crate::instructions::swap::buy::get_buyback_accounts(
            ctx.remaining_accounts,
            &ctx.accounts.global_config,
            buyback_index,
            &ctx.accounts.quote_mint.key(),
            &ctx.accounts.quote_token_program.key(),
        )?;
    if buyback_fee > 0 {
        crate::utils::token::create_ata_if_empty(
            &ctx.accounts.quote_token_program,
            &ctx.accounts.quote_mint,
            buyback_authority,
            buyback_token_account,
            &ctx.accounts.user,
            &ctx.accounts.system_program,
            &ctx.accounts.associated_token_program,
        )?;
        crate::utils::token::transfer_from_pool_to_raw(
            &ctx.accounts.quote_token_program,
            &ctx.accounts.quote_mint,
            &ctx.accounts.pool_quote_token_account,
            &ctx.accounts.pool,
            buyback_token_account,
            buyback_fee,
        )?;
    }
    let event = trade::SellEvent {
        timestamp: Clock::get()?.unix_timestamp,
        base_amount_in,
        min_quote_amount_out,
        user_base_token_reserves,
        user_quote_token_reserves,
        pool_base_token_reserves,
        pool_quote_token_reserves,
        quote_amount_out,
        lp_fee_basis_points: fees.lp_fee_bps,
        lp_fee: fees.lp_fee,
        protocol_fee_basis_points: fees.protocol_fee_bps,
        protocol_fee: fees.protocol_fee,
        quote_amount_out_without_lp_fee,
        user_quote_amount_out,
        pool: ctx.accounts.pool.key(),
        user: ctx.accounts.user.key(),
        user_base_token_account: ctx.accounts.user_base_token_account.key(),
        user_quote_token_account: ctx.accounts.user_quote_token_account.key(),
        protocol_fee_recipient: ctx.accounts.protocol_fee_recipient.key(),
        protocol_fee_recipient_token_account: ctx
            .accounts
            .protocol_fee_recipient_token_account
            .key(),
        coin_creator: ctx.accounts.pool.coin_creator,
        coin_creator_fee_basis_points: if is_cashback { 0 } else { fees.creator_fee_bps },
        coin_creator_fee: if is_cashback { 0 } else { fees.creator_fee },
        cashback_fee_basis_points: if is_cashback { fees.creator_fee_bps } else { 0 },
        cashback: if is_cashback { fees.creator_fee } else { 0 },
        holder_rewards_bps: if ctx.accounts.pool.is_holder_reward {
            fees.creator_fee_bps
        } else {
            0
        },
        holder_rewards: if ctx.accounts.pool.is_holder_reward {
            fees.creator_fee
        } else {
            0
        },
        buyback_fee_basis_points: if ctx.accounts.pool.is_mayhem_mode {
            0
        } else {
            ctx.accounts.global_config.buyback_basis_points
        },
        buyback_fee: crate::utils::transfer_fee::amount_after_fee(&quote_fee, buyback_fee)?,
        virtual_quote_reserves: ctx.accounts.pool.virtual_quote_reserves,
        can_boost: ctx.accounts.pool.can_boost(),
        base_supply: if ctx.accounts.pool.is_mayhem_mode {
            1_000_000_000_000_000
        } else {
            ctx.accounts.base_mint.supply
        },
        creator_fee_unclaimed: ctx.accounts.pool.creator_fees,
        quote_transfer_fee,
    };
    emit!(event);
    emit_cpi!(event);
    Ok(())
}
