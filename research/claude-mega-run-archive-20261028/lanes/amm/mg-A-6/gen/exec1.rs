pub struct BuyPreviewContext<'a, 'info> {
    pub pool: &'a Box<Account<'info, Pool>>,
    pub global_config: &'a Box<Account<'info, GlobalConfig>>,
    pub quote_transfer_fee: &'a TransferFeeData,
    pub fees: &'a AppliedFees,
}

#[inline(never)]
pub fn preview_total_quote(context: BuyPreviewContext, quote_amount_in: u64) -> Result<u64> {
    let global_config = context.global_config.as_ref();
    let pool = context.pool.as_ref();
    let quote_transfer_fee = context.quote_transfer_fee;
    let result = {
        let fees = context.fees.clone();
        calculate_buy_result(
            global_config.buyback_basis_points,
            pool.is_mayhem_mode as u8,
            quote_transfer_fee,
            0,
            quote_amount_in,
            &fees,
        )
    }?;
    result.total_user_quote()
}

#[inline(never)]
pub fn execute_buy(ctx: Context<TradeV2>, amount: u64, limit: u64) -> Result<()> {
    let a = &mut *ctx.accounts;
    require!(a.global_config.disable_flags & 8 == 0, PumpAmmError::DisabledBuy); //@660
    validate_cashback_coin(a.pool.is_cashback_coin as u8)?;
    crate::instructions::swap::prepare_pool(&a.pool, a.system_program.as_ref(), a.user.as_ref())?;
    require_gt!(amount, 0, PumpAmmError::ZeroBaseAmount); //@671
    require_gt!(limit, 0, PumpAmmError::ZeroQuoteAmount); //@672
    validate_buyback_token_account(
        &a.global_config, a.buyback_fee_recipient.as_ref(), &a.quote_mint.key(), &a.quote_token_program.key(),
    )?;
    let user_base_reserves = a.user_base_token_account.amount;
    let user_quote_reserves = a.user_quote_token_account.amount;
    let b = a.pool_base_token_account.amount;
    let raw_quote_reserves = a.pool_quote_token_account.amount;
    crate::liquidity_quote_reserves(&a.pool, raw_quote_reserves)?;
    let q = a.pool.effective_quote_reserves(raw_quote_reserves)?;
    let old_virtual = a.pool.virtual_quote_reserves;
    let quote = crate::curve::constant_product::quote_for_base(amount, b, q)?;
    let selected = fees(a, b, q, quote)?;
    let quote_fee_data = transfer_fee::from_mint(&a.quote_mint.to_account_info())?;
    let result = calculate_buy_result(a.global_config.buyback_basis_points, a.pool.is_mayhem_mode as u8,
        &quote_fee_data, amount, quote, &selected)?;
    require_gte!(limit, result.total_user_quote()?, PumpAmmError::ExceededSlippage); //@706
    let buyback_fee = buy_transfers(a, &result)?;
    let buyback_received = transfer_fee::amount_after_fee(&quote_fee_data, buyback_fee)?;
    let event = create_buy_event(
        TradeEventContext {
            pool: &a.pool, global_config: &a.global_config,
            user_volume_accumulator: &a.user_volume_accumulator,
            base_supply: a.base_mint.supply, user: a.user.key(),
            user_base_token_account: a.user_base_token_account.key(),
            user_quote_token_account: a.user_quote_token_account.key(),
        }, &result, limit, amount, result.quote_amount_in, result.user_quote_amount_in,
        user_base_reserves, user_quote_reserves, b, raw_quote_reserves,
        old_virtual, buyback_received, "buy_v2",
    )?;
    emit!(event);
    emit_cpi!(event);
    Ok(())
}

#[inline(never)]
pub fn execute_buy_exact_quote(ctx: Context<TradeV2>, amount: u64, limit: u64) -> Result<()> {
    let a = &mut *ctx.accounts;
    require!(a.global_config.disable_flags & 8 == 0, PumpAmmError::DisabledBuy); //@740
    validate_cashback_coin(a.pool.is_cashback_coin as u8)?;
    crate::instructions::swap::prepare_pool(&a.pool, a.system_program.as_ref(), a.user.as_ref())?;
    require_gt!(limit, 0, PumpAmmError::ZeroBaseAmount); //@752
    require_gt!(amount, 0, PumpAmmError::ZeroQuoteAmount); //@753
    validate_buyback_token_account(
        &a.global_config, a.buyback_fee_recipient.as_ref(), &a.quote_mint.key(), &a.quote_token_program.key(),
    )?;
    let user_base_reserves = a.user_base_token_account.amount;
    let user_quote_reserves = a.user_quote_token_account.amount;
    let b = a.pool_base_token_account.amount;
    let raw_quote_reserves = a.pool_quote_token_account.amount;
    crate::liquidity_quote_reserves(&a.pool, raw_quote_reserves)?;
    let q = a.pool.effective_quote_reserves(raw_quote_reserves)?;
    let old_virtual = a.pool.virtual_quote_reserves;
    let quote_fee_data = transfer_fee::from_mint(&a.quote_mint.to_account_info())?;
    let available = transfer_fee::amount_after_fee(&quote_fee_data, amount)?;
    require_gt!(available, 0, PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees); //@770
    let selected = fees(a, b, q, available)?;
    let (estimate, exact_fees) = estimate_buy_quote(&a.pool, &selected, available)?;
    let preview = preview_total_quote(BuyPreviewContext { pool: &a.pool, global_config: &a.global_config,
        quote_transfer_fee: &quote_fee_data, fees: &exact_fees }, estimate)?;
    let quote = estimate.checked_sub(preview.saturating_sub(amount))
        .ok_or(PumpAmmError::BuyNotEnoughQuoteTokensToCoverFees)?;
    require_gt!(quote, 0, PumpAmmError::BuySlippageBelowMinBaseAmountOut); //@804
    let out = crate::curve::constant_product::base_for_quote(quote, b, q)?;
    require_gte!(out, limit, PumpAmmError::BuySlippageBelowMinBaseAmountOut); //@816
    require_gte!(b, out, PumpAmmError::TooLittlePoolTokenLiquidity); //@821
    let result = calculate_buy_result(a.global_config.buyback_basis_points, a.pool.is_mayhem_mode as u8,
        &quote_fee_data, out, quote, &exact_fees)?;
    let buyback_fee = buy_transfers(a, &result)?;
    let buyback_received = transfer_fee::amount_after_fee(&quote_fee_data, buyback_fee)?;
    let event = create_buy_event(
        TradeEventContext {
            pool: &a.pool, global_config: &a.global_config,
            user_volume_accumulator: &a.user_volume_accumulator,
            base_supply: a.base_mint.supply, user: a.user.key(),
            user_base_token_account: a.user_base_token_account.key(),
            user_quote_token_account: a.user_quote_token_account.key(),
        }, &result, amount, limit, amount, result.quote_amount_in,
        user_base_reserves, user_quote_reserves, b, raw_quote_reserves,
        old_virtual, buyback_received, "buy_exact_quote_in_v2",
    )?;
    emit!(event);
    emit_cpi!(event);
    Ok(())
}

/// V2 sell execution follows the original transfer and state-update order.
#[inline(never)]
pub fn execute_sell(ctx: Context<TradeV2>, base_amount: u64, limit: u64) -> Result<()> {
    let a = &mut *ctx.accounts;
    require!(a.global_config.disable_flags & 16 == 0, PumpAmmError::DisabledSell); //@865
    validate_cashback_coin(a.pool.is_cashback_coin as u8)?;
    crate::instructions::swap::prepare_pool(&a.pool, a.system_program.as_ref(), a.user.as_ref())?;
    require_gt!(base_amount, 0, PumpAmmError::ZeroBaseAmount); //@876
    validate_buyback_token_account(
        &a.global_config, a.buyback_fee_recipient.as_ref(), &a.quote_mint.key(), &a.quote_token_program.key(),
    )?;
    let user_base_reserves = a.user_base_token_account.amount;
    let user_quote_reserves = a.user_quote_token_account.amount;
    let b = a.pool_base_token_account.amount;
    let raw_quote_reserves = a.pool_quote_token_account.amount;
    let real_quote_reserves = crate::liquidity_quote_reserves(&a.pool, raw_quote_reserves)?;
    let q = a.pool.effective_quote_reserves(raw_quote_reserves)?;
    let old_virtual = a.pool.virtual_quote_reserves;
    let curve_quote = crate::curve::constant_product::quote_for_sell(base_amount, b, q)?;
    let selected = fees(a, b, q, curve_quote)?;
    let (quote_without_lp_fee, total_quote) = calculate_sell_quote(curve_quote, &selected, real_quote_reserves)?;
    let quote_fee_data = transfer_fee::from_mint(&a.quote_mint.to_account_info())?;
    let quote_received = transfer_fee::amount_after_fee(&quote_fee_data, total_quote)?;
    require_gte!(quote_received, limit, PumpAmmError::ExceededSlippage); //@906
    let quote_transfer_fee = total_quote.checked_sub(quote_received)
        .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@913
    crate::utils::token::transfer_checked(
        a.base_token_program.as_ref(), &a.base_mint, &a.user_base_token_account,
        &a.pool_base_token_account, a.user.as_ref(), base_amount, &[],
    )?;
    crate::utils::token::transfer_from_pool(
        a.quote_token_program.as_ref(), &a.quote_mint, &a.pool_quote_token_account,
        &a.user_quote_token_account, total_quote, &a.pool,
    )?;
    let buyback_fee = a.pool.accrue_fees(
        &a.global_config, selected.protocol_fee, selected.creator_fee,
    )?;
    crate::utils::token::transfer_from_pool_to_raw(
        a.quote_token_program.as_ref(), &a.quote_mint, &a.pool_quote_token_account,
        &a.pool, a.buyback_fee_recipient.as_ref(), buyback_fee,
    )?;
    if a.user_volume_accumulator.user == Pubkey::default() {
        a.user_volume_accumulator.user.as_mut().copy_from_slice(a.user.key.as_ref());
    }
    let buyback_received = transfer_fee::amount_after_fee(&quote_fee_data, buyback_fee)?;
    let event = create_sell_event(
        TradeEventContext {
            pool: &a.pool,
            global_config: &a.global_config,
            user_volume_accumulator: &a.user_volume_accumulator,
            base_supply: a.base_mint.supply,
            user: a.user.key(),
            user_base_token_account: a.user_base_token_account.key(),
            user_quote_token_account: a.user_quote_token_account.key(),
        },
        base_amount, limit, user_base_reserves, user_quote_reserves, b,
        raw_quote_reserves, curve_quote, &selected, quote_without_lp_fee, total_quote,
        old_virtual, buyback_received, quote_transfer_fee,
    )?;
    emit!(event);
    emit_cpi!(event);
    Ok(())
}
