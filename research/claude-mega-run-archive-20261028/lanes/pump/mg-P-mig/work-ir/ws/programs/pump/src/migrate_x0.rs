use super::*;










































































































































































































































pub fn execute<'info>(ctx:Context<'_, '_, '_, 'info,MigrateV2<'info>>)->Result<()>{
 let a=&ctx.accounts;
 crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.user)?;
 let (expected_event_authority,_)=Pubkey::find_program_address(&[b"__event_authority"],&pump_amm::ID);



 require_keys_eq!(a.pump_amm_event_authority.key(),expected_event_authority,anchor_lang::error::ErrorCode::ConstraintSeeds);





 require!(a.bonding_curve.complete,PumpError::BondingCurveNotComplete);
 if a.bonding_curve.real_quote_reserves==0&&a.bonding_curve.virtual_quote_reserves==0&&a.bonding_curve.real_token_reserves==0&&a.bonding_curve.virtual_token_reserves==0{msg!("Bonding curve already migrated");return Ok(());}
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 let fee=a.global.pool_migration_fee;
 if native{a.bonding_curve.sub_lamports(fee)?;a.pool_authority.add_lamports(fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,fee)?;}
 let bump=ctx.bumps.pool_authority;
 create_token_account_v2(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;
 create_token_account_v2(a,bump,&a.pool_quote_token_account,&a.pool,&a.quote_mint,native,&a.quote_token_program)?;
 create_token_account_v2(a,bump,&a.pool_authority_mint_account,&a.pool_authority,&a.base_mint,native,&a.base_token_program)?;
 let quote_account_created=a.pool_authority_quote_account.owner==&anchor_lang::system_program::ID;
 create_token_account_v2(a,bump,&a.pool_authority_quote_account,&a.pool_authority,&a.quote_mint,native,&a.quote_token_program)?;
 transfer_base_to_pool_authority(a,ctx.bumps.bonding_curve)?;
 let base=pool_authority_mint_token_account(a)?.amount;














































 let quote=a.bonding_curve.real_quote_reserves.checked_add(a.bonding_curve.post_complete_quote_in)
  .ok_or_else(||error!(PumpError::Overflow))?;



 let quote=if native{quote.checked_sub(fee).ok_or_else(||error!(PumpError::Overflow))?}else{quote};
 let quote_before=quote_amount(&a.pool_authority_quote_account)?;
 fund_quote_token_account_v2(&ctx,quote,native)?;










 let quote=quote_amount(&a.pool_authority_quote_account)?.checked_sub(quote_before).ok_or_else(||error!(PumpError::Overflow))?;
 create_pool(&ctx,base,quote)?;
 init_pump_amm_boost_v2(&ctx)?;
 close_pool_authority_account(a,bump,&a.pool_authority_mint_account,&a.base_token_program)?;
 if quote_account_created{
  if crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?.is_some(){



   require!(a.quote_mint.to_account_info().is_writable,PumpError::QuoteMintNotWritable);
   harvest_withheld_tokens_to_mint(&a.quote_token_program.to_account_info(),&a.quote_mint.to_account_info(),&a.pool_authority_quote_account)?;
  }
  close_pool_authority_account(a,bump,&a.pool_authority_quote_account,&a.quote_token_program)?;
 }
 burn_lp_tokens(&ctx,bump)?;
 close_lp_account(a,bump,&a.user_pool_token_account)?;
 refund_pool_authority(a,bump,&a.withdraw_authority,a.pool_authority.lamports())?;
 {let c=&mut ctx.accounts.bonding_curve;c.real_quote_reserves=0;c.real_token_reserves=0;c.virtual_quote_reserves=0;c.virtual_token_reserves=0;}
 let a=&ctx.accounts;
 let event=CompletePumpAmmMigrationEvent{user:a.user.key(),mint:a.base_mint.key(),mint_amount:base,sol_amount:quote,pool_migration_fee:fee,bonding_curve:a.bonding_curve.key(),timestamp:Clock::get()?.unix_timestamp,pool:a.pool.key(),quote_mint:a.bonding_curve.quote_mint};
 emit!(event);emit_cpi!(event);
 Ok(())
}

