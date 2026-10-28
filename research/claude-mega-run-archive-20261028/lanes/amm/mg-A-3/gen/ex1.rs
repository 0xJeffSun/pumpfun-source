pub fn buy_exact_quote_in<'info>(
    ctx: Context<'_, '_, '_, 'info, LegacyBuy<'info>>,
    spendable_quote_in: u64,
    min_base_amount_out: u64,
    track_volume: bool,
) -> Result<()> {
    let a = &mut *ctx.accounts;
    require!( //@625
        a.global_config.disable_flags & 8 == 0,
        PumpAmmError::DisabledBuy
    );
    crate::instructions::swap::prepare_pool(&a.pool, a.system_program.as_ref(), a.user.as_ref())?;
    crate::instructions::swap::validate_protocol_fee_recipient(
        &a.global_config, &a.protocol_fee_recipient, a.pool.is_mayhem_mode as u8,
    )?;
//PAD
    require_gt!(min_base_amount_out, 0, PumpAmmError::ZeroBaseAmount); //@636

    require_gt!(spendable_quote_in, 0, PumpAmmError::ZeroQuoteAmount); //@638
    let quote_fee_data = crate::utils::transfer_fee::from_mint(&a.quote_mint.to_account_info())?;
    let available = crate::utils::transfer_fee::amount_after_fee(&quote_fee_data, spendable_quote_in)?;
//PAD
    require_gt!(available, 0, PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees); //@646
    a.pool.available_quote_reserves(a.pool_quote_token_account.amount)?;
    let q = a.pool.effective_quote_reserves(a.pool_quote_token_account.amount)?;
    let old_virtual = a.pool.virtual_quote_reserves;
    let b = a.pool_base_token_account.amount;
    let supply = if a.pool.is_mayhem_mode { 1_000_000_000_000_000 } else { a.base_mint.supply };
    let mut selected = crate::curve::fees::select_and_apply(
        &a.pool, &a.global_config, &a.fee_config, &a.fee_program, &a.program,
        &a.base_mint, b, q, available,
    )?;
    let mut creator_bps = if a.pool.coin_creator == Pubkey::default() { 0 } else { selected.creator_fee_bps };
    if a.global_config.whitelist_pda == a.user.key() {
        selected.lp_fee_bps = 0;
        selected.protocol_fee_bps = 0;
        selected.creator_fee_bps = 0;
        creator_bps = 0;
    }
    let total_fee_bps = selected.lp_fee_bps
        .saturating_add(selected.protocol_fee_bps)
        .saturating_add(creator_bps);
    let estimate = if total_fee_bps == 0 {
        available
    } else {
        let sum = (total_fee_bps as u128) + 10000;
        number((available as u128) * 10000 / sum)?
    };
//PAD
    require_gt!(estimate, 0, PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees); //@700
    let l = fee(estimate, selected.lp_fee_bps)?;
    let p = fee(estimate, selected.protocol_fee_bps)?;
    let c = if a.pool.coin_creator == Pubkey::default() {
        0
    } else {
        fee(estimate, creator_bps)?
    };
    estimate
        .checked_add(l)
        .and_then(|n| n.checked_add(p))
        .and_then(|n| n.checked_add(c))
        .ok_or(PumpAmmError::Overflow)?;
    let mut curve = available
        .checked_sub(l)
        .and_then(|n| n.checked_sub(p))
        .and_then(|n| n.checked_sub(c))
        .ok_or(PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees)?
        .min(estimate);
//PAD
    require_gt!(curve, 0, PumpAmmError::BuySlippageBelowMinBaseAmountOut); //@733
    let gross_pool_quote = |quote: u64| {
        crate::utils::transfer_fee::amount_before_fee(
            &quote_fee_data,
            quote.checked_add(l).ok_or(PumpAmmError::Overflow)?,
        )
    };
    let gross_total = gross_pool_quote(curve)?
        .checked_add(p)
        .and_then(|n| n.checked_add(c))
        .ok_or(PumpAmmError::Overflow)?;
    if gross_total > spendable_quote_in {
        curve = curve
            .checked_sub(gross_total.saturating_sub(spendable_quote_in))
            .ok_or(PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees)?;
//PAD
        require_gt!(curve, 0, PumpAmmError::BuySlippageBelowMinBaseAmountOut); //@754
    }
    let pool_quote = curve.checked_add(l).ok_or(PumpAmmError::Overflow)?;
    let gross_pool_quote = gross_pool_quote(curve)?;
    let quote_transfer_fee = gross_pool_quote
        .checked_sub(pool_quote)
        .ok_or(PumpAmmError::Overflow)?;
    let total = pool_quote
        .checked_add(p)
        .and_then(|n| n.checked_add(c))
        .ok_or(PumpAmmError::Overflow)?;
    let lp_fee = l;
    let protocol_fee = p;
    let creator_fee = c;
    let curve = curve;
    let base_out = crate::curve::constant_product::base_for_quote(curve, b, q)?;
//PAD
    require_gte!(base_out, min_base_amount_out, PumpAmmError::BuySlippageBelowMinBaseAmountOut); //@776

//PAD
    require_gte!(b, base_out, PumpAmmError::TooLittlePoolTokenLiquidity); //@781
    crate::utils::token::transfer_from_pool(
        a.base_token_program.as_ref(),
        &a.base_mint,
        &a.pool_base_token_account,
        &a.user_base_token_account,
        base_out,
        &a.pool,
    )?;
    crate::utils::token::transfer_checked(
        a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account,
        &a.pool_quote_token_account, a.user.as_ref(), gross_pool_quote, &[],
    )?;
    let buyback_bps = if a.pool.is_mayhem_mode {
        0
    } else {
        a.global_config.buyback_basis_points
    };
    let (buyback_fee, net_protocol) = a.global_config.split_buyback(
        protocol_fee,
        a.pool.is_mayhem_mode,
    );
    crate::utils::token::transfer_checked(
        a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account,
        &a.protocol_fee_recipient_token_account, a.user.as_ref(), net_protocol, &[],
    )?;
    let mut next = 0;
    if creator_fee > 0 {
        if a.pool.is_cashback_coin {
            pay_cashback_exact(
                ctx.remaining_accounts,
                &mut a.user_volume_accumulator,
                &a.user_quote_token_account,
                &a.quote_mint,
                &a.base_mint.key(),
                &a.user,
                &a.quote_token_program,
                &a.system_program,
                &a.associated_token_program,
                creator_fee,
            )?;
            next = 2;
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
    let event = BuyEvent {
        timestamp: Clock::get()?.unix_timestamp,
        base_amount_out: base_out,
        max_quote_amount_in: spendable_quote_in,
        user_base_token_reserves: a.user_base_token_account.amount,
        user_quote_token_reserves: a.user_quote_token_account.amount,
        pool_base_token_reserves: a.pool_base_token_account.amount,
        pool_quote_token_reserves: a.pool_quote_token_account.amount,
        quote_amount_in: spendable_quote_in,
        lp_fee_basis_points: selected.lp_fee_bps,
        lp_fee,
        protocol_fee_basis_points: selected.protocol_fee_bps,
        protocol_fee,
        quote_amount_in_with_lp_fee: pool_quote,
        user_quote_amount_in: curve,
        pool: a.pool.key(),
        user: a.user.key(),
        user_base_token_account: a.user_base_token_account.key(),
        user_quote_token_account: a.user_quote_token_account.key(),
        protocol_fee_recipient: a.protocol_fee_recipient.key(),
        protocol_fee_recipient_token_account: a.protocol_fee_recipient_token_account.key(),
        coin_creator: a.pool.coin_creator,
        coin_creator_fee_basis_points: if a.pool.is_cashback_coin && creator_fee > 0 {
            0
        } else {
            selected.creator_fee_bps
        },
        coin_creator_fee: if a.pool.is_cashback_coin && creator_fee > 0 {
            0
        } else {
            creator_fee
        },
        track_volume,
        total_unclaimed_tokens: a.user_volume_accumulator.total_unclaimed_tokens,
        total_claimed_tokens: a.user_volume_accumulator.total_claimed_tokens,
        current_sol_volume: a.user_volume_accumulator.current_sol_volume,
        last_update_timestamp: a.user_volume_accumulator.last_update_timestamp,
        min_base_amount_out,
        ix_name: "buy_exact_quote_in".to_string(),
        cashback_fee_basis_points: if a.pool.is_cashback_coin && creator_fee > 0 {
            selected.creator_fee_bps
        } else {
            0
        },
        cashback: if a.pool.is_cashback_coin && creator_fee > 0 {
            creator_fee
        } else {
            0
        },
        buyback_fee_basis_points: buyback_bps,
        buyback_fee: crate::utils::transfer_fee::amount_after_fee(&quote_fee_data, buyback_fee)?,
        virtual_quote_reserves: old_virtual,
        can_boost: a.pool.can_boost(),
        base_supply: supply,
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
        creator_fee_unclaimed: a.pool.creator_fees,
        quote_transfer_fee,
    };
    emit!(event);
    emit_cpi!(event);
    Ok(())
}

fn pay_cashback_exact<'info>(
    remaining_accounts: &[AccountInfo<'info>],
    user_volume_accumulator: &mut Account<'info, UserVolumeAccumulator>,
    user_quote_token_account: &InterfaceAccount<'info, TokenAccount>,
    quote_mint: &InterfaceAccount<'info, Mint>,
    base_mint: &Pubkey,
    user: &Signer<'info>,
    quote_token_program: &Interface<'info, TokenInterface>,
    system_program: &Program<'info, System>,
    associated_token_program: &Program<'info, AssociatedToken>,
    amount: u64,
) -> Result<()> {
    distribute_cashback(
        remaining_accounts,
        user.as_ref(),
        user_volume_accumulator,
        user_quote_token_account,
        quote_mint.decimals,
        quote_mint.as_ref(),
        quote_token_program.as_ref(),
        system_program.as_ref(),
        associated_token_program.as_ref(),
        amount,
        base_mint,
    )
}
