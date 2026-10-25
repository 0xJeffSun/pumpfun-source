fn move_lamports(from:&AccountInfo,to:&AccountInfo,amount:u64)->Result<()>{
 if amount==0{return Ok(())}
 let a=sub(from.lamports(),amount)?;let b=add(to.lamports(),amount)?;
 **from.try_borrow_mut_lamports()?=a;**to.try_borrow_mut_lamports()?=b;Ok(())
}
fn native_buyback<'info>(a:&MultiHopCurve<'info>,curve:AccountInfo<'info>,amount:u64)->Result<()>{
 if amount==0{return Ok(())}
 let to=a.buyback_fee_recipient.to_account_info();move_lamports(&curve,&to,amount)?;
 // The original flushes the writable native balances through a genuine self CPI
 // before SyncNative. This signs only this program's own event-authority PDA.
 let bump=Pubkey::find_program_address(&[b"__event_authority"],&crate::ID).1;
 invoke_signed(&Instruction{program_id:crate::ID,accounts:vec![AccountMeta::new_readonly(a.event_authority.key(),true),AccountMeta::new(curve.key(),false),AccountMeta::new(to.key(),false)],data:vec![228,69,165,46,81,203,154,29]},&[a.event_authority.to_account_info(),curve,to.clone(),a.program.to_account_info()],&[&[b"__event_authority",&[bump]]])?;
 anchor_spl::token::sync_native(CpiContext::new(a.token_program.to_account_info(),SyncNative{account:to}))
}
