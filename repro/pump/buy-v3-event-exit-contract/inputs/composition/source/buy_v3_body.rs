// PARTIAL PATCH ONLY: inherited ordinary-domain fence remains unresolved.
// Rejects the retained Token2022 rows; MUST NOT replace current BuyV3.
pub fn buy(ctx:Context<BuyV3>,amount:u64,max_sol_cost:u64,partial_fill:bool)->Result<()> {
    let a=&mut *ctx.accounts;
    // Explicit proposal-domain fence. These are not historical Pump checks.
    buy_domain(a)?;
    buy_prepare_curve(a)?;
    if a.bonding_curve.complete { return Err(PumpError::BondingCurveComplete.into()); }
    if a.bonding_curve.is_cashback_coin { return Err(PumpError::CashbackCoinNotSupported.into()); }
    let selected=body_amounts::amounts(
        amount,a.bonding_curve.real_token_reserves,partial_fill,
        a.bonding_curve.is_mayhem_mode,
        &a.user.key().to_bytes(),&a.global.whitelist_pda.to_bytes(),
    )?;
    let amount=selected.curve_amount;
    let residual_base=selected.residual_amount;
    let quote_decimals=check_quote_buy(a)?;
    let is_sol=quote_decimals.is_none();
    let curve=&a.bonding_curve;
    let denominator=(curve.virtual_token_reserves as u128).checked_sub(amount as u128).ok_or_else(||anchor_lang::error::Error::from(PumpError::Overflow))?;
    let quotient=(amount as u128*curve.virtual_quote_reserves as u128).checked_div(denominator).ok_or_else(||anchor_lang::error::Error::from(PumpError::DivisionByZero))?;
    let quote=buy_narrow(quotient.checked_add(1).ok_or_else(||anchor_lang::error::Error::from(PumpError::Overflow))?)?;
    let pretrade=fee_selection::Pretrade {
        mint_supply:a.base_mint.supply, virtual_base:curve.virtual_token_reserves,
        virtual_quote:curve.virtual_quote_reserves, quote_key:curve.quote_mint.to_bytes(),
        creator_key:curve.creator.to_bytes(), creator_configurable:a.global.creator_fee_configurable,
        curve_creator_bps:curve.creator_fee_bps,
    };
    // Account<FeeConfig> decoded both vectors and exotic tail during parsing.
    // AccountInfo length is re-read at each selector invocation, like 0x7fff8.
    let fees=fee_selection::ordinary_leg(&a.fee_config,&pretrade,quote,
        a.fee_config.to_account_info().data_len()).map_err(fee_selection::anchor_error)?;
    let protocol_fee=fees.protocol_amount;
    let creator_fee=fees.creator_amount;
    let mut residual_fees=None;
    // Both legs use the pretrade fee selection; neither sees mutated reserves.
    let (pool_base,pool_quote,residual_quote,residual_protocol,residual_creator)=if residual_base>0 {
        let base=buy_sub(a.associated_base_bonding_curve.amount,amount)?;
        let funded=buy_add(curve.real_quote_reserves,quote)?;
        let quote_pool=if is_sol{buy_sub(funded,a.global.pool_migration_fee)?}else{funded};
        if base==0 { return Err(anchor_lang::error::Error::from(PumpError::NotEnoughTokensToBuy).with_values((base,0))); }
        if quote_pool==0 { return Err(anchor_lang::error::Error::from(PumpError::Overflow).with_values((quote_pool,0))); }
        if base<=residual_base { return Err(anchor_lang::error::Error::from(PumpError::NotEnoughTokensToBuy).with_values((base,residual_base))); }
        let denominator=(base-residual_base) as u128;
        let product=residual_base as u128*quote_pool as u128;
        let residual_quote=buy_narrow(product/denominator+u128::from(product%denominator!=0))?;
        // residual_base>0 implies normal in this proposal. The exact same
        // pretrade snapshot feeds F2; no post-first reserves enter selection.
        let second=fee_selection::ordinary_leg(&a.fee_config,&pretrade,residual_quote,
            a.fee_config.to_account_info().data_len()).map_err(fee_selection::anchor_error)?;
        residual_fees=Some(second);
        (base,quote_pool,residual_quote,second.protocol_amount,second.creator_amount)
    }else{(0,0,0,0,0)};
    let buyback_bps=a.global.buyback_basis_points;
    let buyback_fee=buy_narrow(protocol_fee as u128*buyback_bps as u128/10000)?;
    let residual_buyback=buy_narrow(residual_protocol as u128*buyback_bps as u128/10000)?;
    let first_gross=buy_add(buy_add(quote,protocol_fee)?,creator_fee)?;
    let second_gross=buy_add(buy_add(residual_quote,residual_protocol)?,residual_creator)?;
    let combined_buyback=buy_add(buyback_fee,residual_buyback)?;
    let curve_payment=buy_sub(buy_add(first_gross,second_gross)?,combined_buyback)?;
    let user_output=buy_add(curve_payment,combined_buyback)?;
    if user_output>max_sol_cost { return Err(anchor_lang::error::Error::from(PumpError::TooMuchSolRequired).with_values((max_sol_cost,user_output))); }
    let retained=buy_sub(protocol_fee,buyback_fee)?;
    // First-leg reserves only, original store order; fee accrual is later.
    {
        let curve=&mut a.bonding_curve;
        curve.virtual_token_reserves=buy_sub(curve.virtual_token_reserves,amount)?;
        curve.real_token_reserves=buy_sub(curve.real_token_reserves,amount)?;
        curve.virtual_quote_reserves=buy_add(curve.virtual_quote_reserves,quote)?;
        curve.real_quote_reserves=buy_add(curve.real_quote_reserves,quote)?;
    }
    let mint_key=a.base_mint.key();let bump=[ctx.bumps.bonding_curve];
    let seeds:&[&[u8]]=&[b"bonding-curve",mint_key.as_ref(),&bump];
    token_interface::transfer_checked(CpiContext::new_with_signer(a.base_token_program.to_account_info(),TransferChecked{
        from:a.associated_base_bonding_curve.to_account_info(),mint:a.base_mint.to_account_info(),to:a.associated_base_user.to_account_info(),authority:a.bonding_curve.to_account_info()
    },&[seeds]),buy_add(amount,residual_base)?,a.base_mint.decimals)?;
    // After base CPI, before accrual. Existing nonzero user is preserved.
    if a.user_volume_accumulator.user == Pubkey::default() {
        a.user_volume_accumulator.user = a.user.key();
    }
    {
        let curve=&mut a.bonding_curve;
        curve.protocol_fees=buy_add(curve.protocol_fees,retained)?;
        curve.creator_fee=buy_add(curve.creator_fee,creator_fee)?;
        if residual_base>0 {
            curve.post_complete_base_out=residual_base;
            curve.post_complete_quote_in=residual_quote;
            curve.protocol_fees=buy_add(curve.protocol_fees,buy_sub(residual_protocol,residual_buyback)?)?;
            curve.creator_fee=buy_add(curve.creator_fee,residual_creator)?;
        }
    }
    if let Some(decimals)=quote_decimals {
      for (to,amount) in [(a.associated_quote_bonding_curve.to_account_info(),curve_payment),(a.buyback_fee_recipient.to_account_info(),combined_buyback)] {
        if amount==0{continue}
        token_interface::transfer_checked(CpiContext::new(a.quote_token_program.to_account_info(),TransferChecked{from:a.associated_quote_user.to_account_info(),mint:a.quote_mint.to_account_info(),to,authority:a.user.to_account_info()}),amount,decimals)?;
      }
    }else {
      // Ordinary native BuyV3: 0x841d8 sums both obligations; 0x979b8
      // calls the System input helper. Native buyback then debits the curve.
      let native_input=buy_add(curve_payment,combined_buyback)?;
      if native_input!=0 {
        anchor_lang::system_program::transfer(CpiContext::new(a.system_program.to_account_info(),anchor_lang::system_program::Transfer{
          from:a.user.to_account_info(),to:a.bonding_curve.to_account_info()
        }),native_input)?;
      }
      // Clone destination before the zero gate, as at 0x84730.
      let native_recipient=a.buyback_fee_recipient.to_account_info();
      if combined_buyback!=0 {
        let native_curve=a.bonding_curve.to_account_info();
        // Natural ProgramError mapping is a framework premise; see REPORT.md.
        let remaining=native_curve.lamports().checked_sub(combined_buyback)
          .ok_or(anchor_lang::solana_program::program_error::ProgramError::ArithmeticOverflow)?;
        { **native_curve.try_borrow_mut_lamports()?=remaining; }
        // Read only after the source store and release, including for aliases.
        let credited=native_recipient.lamports().checked_add(combined_buyback)
          .ok_or(anchor_lang::solana_program::program_error::ProgramError::ArithmeticOverflow)?;
        { **native_recipient.try_borrow_mut_lamports()?=credited; }
      }
    }
    let curve=&mut a.bonding_curve;
    let next_base=curve.virtual_token_reserves;
    let next_quote=curve.virtual_quote_reserves;
    let next_real_base=curve.real_token_reserves;
    let next_real_quote=curve.real_quote_reserves;
    let event=TradeEvent{
        mint:a.base_mint.key(),sol_amount:if is_sol{quote}else{0},token_amount:amount,is_buy:true,user:a.user.key(),timestamp:Clock::get()?.unix_timestamp,
        virtual_sol_reserves:if is_sol{next_quote}else{0},virtual_token_reserves:next_base,real_sol_reserves:if is_sol{next_real_quote}else{0},real_token_reserves:next_real_base,
        fee_recipient:Pubkey::default(),fee_basis_points:fees.protocol_fee_bps,fee:protocol_fee,creator:curve.creator,creator_fee_basis_points:fees.creator_fee_bps,creator_fee,
        track_volume:false,total_unclaimed_tokens:a.user_volume_accumulator.total_unclaimed_tokens,
        total_claimed_tokens:a.user_volume_accumulator.total_claimed_tokens,current_sol_volume:a.user_volume_accumulator.current_sol_volume,
        last_update_timestamp:a.user_volume_accumulator.last_update_timestamp,ix_name:"buy".into(),mayhem_mode:curve.is_mayhem_mode,
        cashback_fee_basis_points:0,cashback:0,buyback_fee_basis_points:buyback_bps,buyback_fee,shareholders:vec![],quote_mint:curve.quote_mint,
        quote_amount:quote,virtual_quote_reserves:next_quote,real_quote_reserves:next_real_quote,holder_rewards_bps:if curve.is_holder_reward{fees.creator_fee_bps}else{0},holder_rewards:if curve.is_holder_reward{creator_fee}else{0},creator_fee_unclaimed:curve.creator_fee,
        unparsed_trailing_field:0,
    };
    let timestamp=event.timestamp;
    emit!(event.clone());buy_emit_cpi(&a.event_authority,ctx.bumps.event_authority,&event)?;
    if next_real_base==0 {
        a.bonding_curve.complete=true;
        let completion=crate::trade_types::CompleteEvent{user:a.user.key(),mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),timestamp,quote_mint:a.bonding_curve.quote_mint};
        emit!(completion.clone());buy_emit_cpi(&a.event_authority,ctx.bumps.event_authority,&completion)?;
        if residual_base>0 {
            // Preserve the late event-constructor checks after CompleteEvent CPI.
            if pool_base < residual_base {
                return Err(PumpError::Overflow.into());
            }
            let pool_base_after=pool_base-residual_base;
            let pool_quote_after=buy_add(pool_quote,residual_quote)?;
            let second=residual_fees.as_ref().unwrap();
            let post=PostCompleteBuyEvent{user:a.user.key(),mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),quote_mint:a.bonding_curve.quote_mint,timestamp,
                base_out:residual_base,quote_in:residual_quote,fee_basis_points:second.protocol_fee_bps,fee:residual_protocol,
                creator_fee_basis_points:second.creator_fee_bps,creator_fee:residual_creator,buyback_fee:residual_buyback,
                pool_base_reserves_before:pool_base,pool_quote_reserves_before:pool_quote,pool_base_reserves_after:pool_base_after,pool_quote_reserves_after:pool_quote_after};
            emit!(post.clone());buy_emit_cpi(&a.event_authority,ctx.bumps.event_authority,&post)?;
        }
    }
    Ok(())
}

