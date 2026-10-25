fn check_quote(a:&SellV3)->Result<Option<u8>>{
 if a.quote_mint.key()==WSOL||a.quote_mint.key()==Pubkey::default(){
  require!(a.bonding_curve.quote_mint==WSOL||a.bonding_curve.quote_mint==Pubkey::default(),PumpError::ReconstructionBranchUnsupported);return Ok(None)
 }
 require!(a.quote_mint.key()==USDC && a.bonding_curve.quote_mint==USDC,PumpError::ReconstructionBranchUnsupported);
 require!(a.quote_mint.owner==&a.quote_token_program.key(),anchor_lang::error::ErrorCode::AccountOwnedByWrongProgram);
 let mint=Mint::try_deserialize(&mut &a.quote_mint.try_borrow_data()?[..])?;
 for (role,info) in [(0,a.associated_quote_bonding_curve.to_account_info()),(1,a.associated_quote_user.to_account_info()),(2,a.buyback_fee_recipient.to_account_info())]{
  require!(info.owner==&a.quote_token_program.key(),PumpError::AccountTypeNotSupported);
  let token=TokenAccount::try_deserialize(&mut &info.try_borrow_data()?[..])?;
  require_keys_eq!(token.mint,USDC,PumpError::MintDoesNotMatchBondingCurve);
  if role==1{require_keys_eq!(token.owner,a.user.key(),PumpError::AccountTypeNotSupported)}
  if role==2{require!(a.global.buyback_fee_recipients.contains(&token.owner),PumpError::BuybackFeeRecipientNotAuthorized)}
  if role!=1 {
   let authority=if role==0{a.bonding_curve.key()}else{token.owner};
   let expected=anchor_spl::associated_token::get_associated_token_address_with_program_id(&authority,&USDC,&a.quote_token_program.key());
   require_keys_eq!(info.key(),expected,anchor_lang::error::ErrorCode::ConstraintSeeds);
  }
 }
 Ok(Some(mint.decimals))
}