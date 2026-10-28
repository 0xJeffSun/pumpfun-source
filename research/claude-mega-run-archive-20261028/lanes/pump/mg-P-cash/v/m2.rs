 pub fn claim_g(ctx:Context<ClaimCashback>)->Result<()>{
  let user_volume_accumulator=&mut ctx.accounts.user_volume_accumulator;
  let timestamp=Clock::get()?.unix_timestamp;
  let min=Rent::get()?.minimum_balance(user_volume_accumulator.to_account_info().data_len());
  let amount=user_volume_accumulator.get_lamports().saturating_sub(min);
  if amount==0{msg!("No cashback to claim");return Ok(());}
  user_volume_accumulator.sub_lamports(amount)?;
  ctx.accounts.user.add_lamports(amount)?;
  user_volume_accumulator.total_cashback_claimed=user_volume_accumulator.total_cashback_claimed.checked_add(amount).ok_or(error!(PumpError::Overflow))?;
  let total_cashback_earned=user_volume_accumulator.cashback_earned;
  let event=ClaimCashbackEvent{user:ctx.accounts.user.key(),amount,timestamp,total_claimed:user_volume_accumulator.total_cashback_claimed,total_cashback_earned};
  emit!(event);emit_cpi!(event);Ok(())
 }
 pub fn claim_h(ctx:Context<ClaimCashback>)->Result<()>{
  let a=&mut *ctx.accounts;let timestamp=Clock::get()?.unix_timestamp;let uva=&mut a.user_volume_accumulator;
  let min=Rent::get()?.minimum_balance(uva.to_account_info().data_len());let amount=uva.get_lamports().saturating_sub(min);if amount==0{msg!("No cashback to claim");return Ok(());}
  uva.sub_lamports(amount)?;a.user.add_lamports(amount)?;
  uva.total_cashback_claimed=uva.total_cashback_claimed.checked_add(amount).ok_or(error!(PumpError::Overflow))?;
  let total_cashback_earned=uva.cashback_earned;
  let event=ClaimCashbackEvent{user:a.user.key(),amount,timestamp,total_claimed:uva.total_cashback_claimed,total_cashback_earned};emit!(event);emit_cpi!(event);Ok(())
 }
 pub fn claim_i(ctx:Context<ClaimCashback>)->Result<()>{
  let user_volume_accumulator=&mut ctx.accounts.user_volume_accumulator;
  let timestamp=Clock::get()?.unix_timestamp;
  let min=Rent::get()?.minimum_balance(user_volume_accumulator.to_account_info().data_len());
  let amount=user_volume_accumulator.get_lamports().saturating_sub(min);
  if amount==0{msg!("No cashback to claim");return Ok(());}
  user_volume_accumulator.sub_lamports(amount)?;
  ctx.accounts.user.add_lamports(amount)?;
  let total_claimed=user_volume_accumulator.total_cashback_claimed.checked_add(amount).ok_or(error!(PumpError::Overflow))?;
  let total_cashback_earned=user_volume_accumulator.cashback_earned;
  user_volume_accumulator.total_cashback_claimed=total_claimed;
  let event=ClaimCashbackEvent{user:ctx.accounts.user.key(),amount,timestamp,total_claimed,total_cashback_earned};
  emit!(event);emit_cpi!(event);Ok(())
 }
 pub fn claim_j(ctx:Context<ClaimCashback>)->Result<()>{
  let timestamp=Clock::get()?.unix_timestamp;
  let user_volume_accumulator=&mut ctx.accounts.user_volume_accumulator;
  let min=Rent::get()?.minimum_balance(user_volume_accumulator.to_account_info().data_len());
  let amount=user_volume_accumulator.get_lamports().saturating_sub(min);
  if amount==0{msg!("No cashback to claim");return Ok(());}
  user_volume_accumulator.sub_lamports(amount)?;
  ctx.accounts.user.add_lamports(amount)?;
  user_volume_accumulator.total_cashback_claimed=user_volume_accumulator.total_cashback_claimed.checked_add(amount).ok_or(error!(PumpError::Overflow))?;
  let total_cashback_earned=user_volume_accumulator.cashback_earned;
  let event=ClaimCashbackEvent{user:ctx.accounts.user.key(),amount,timestamp,total_claimed:user_volume_accumulator.total_cashback_claimed,total_cashback_earned};
  emit!(event);emit_cpi!(event);Ok(())
 }
