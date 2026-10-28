use anchor_lang::prelude::*;
use crate::PumpError;
use crate::sweep::{SweepFees,SweepBondingCurveFeeEvent};
pub fn execute(ctx:Context<SweepFees>,creator:bool)->Result<()>{
 let a=&mut *ctx.accounts;
 crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.payer)?;
// layout-pad(116): aligns the next Source site with the original line



















































































































 require_keys_neq!(a.recipient.key(),Pubkey::default(),PumpError::NotAuthorized);
 let amount=if creator{
  let expected=Pubkey::find_program_address(&[b"creator-vault",a.bonding_curve.creator.as_ref()],&crate::ID).0;
// layout-pad(19): aligns the next Source site with the original line


















  require_keys_eq!(a.recipient.key(),expected,anchor_lang::error::ErrorCode::ConstraintSeeds);
  core::mem::take(&mut a.bonding_curve.creator_fee)
 }else{crate::legacy_sell::fee_recipient::validate_fee_recipient(&a.recipient,&a.global,&a.bonding_curve)?;
  core::mem::take(&mut a.bonding_curve.protocol_fees)
 };
 if amount==0{msg!("Nothing to sweep for fee bucket {}",creator as u8);return Ok(());}
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 if native{if creator{let minimum=Rent::get()?.minimum_balance(0);if a.recipient.lamports()<minimum{crate::legacy_buy::native_payments::transfer(a.system_program.as_ref(),&a.payer,a.recipient.as_ref(),minimum)?;}}
  crate::trade::quote_payments::transfer_to_owned(native,a.base_mint.as_ref().as_ref(),&a.bonding_curve,a.recipient.to_account_info(),amount,&a.quote_token_program,a.quote_mint.decimals,a.quote_mint.as_ref().as_ref(),None,None,ctx.bumps.bonding_curve)?;
 }else{
  let mint=a.quote_mint.key();let token_program=a.quote_token_program.key();let mint_info=a.quote_mint.to_account_info();let token_program_info=a.quote_token_program.to_account_info();
  crate::buy_v2::admit_associated_token_account(a.associated_quote_bonding_curve.as_ref(),&a.bonding_curve.to_account_info(),mint,token_program,&mint_info,&token_program_info,false,a.payer.as_ref(),a.system_program.as_ref())?;
  crate::buy_v2::admit_associated_token_account(a.associated_quote_recipient.as_ref(),a.recipient.as_ref(),mint,token_program,&mint_info,&token_program_info,true,a.payer.as_ref(),a.system_program.as_ref())?;
  crate::trade::quote_payments::transfer_to_owned(native,a.base_mint.as_ref().as_ref(),&a.bonding_curve,a.recipient.to_account_info(),amount,&a.quote_token_program,a.quote_mint.decimals,a.quote_mint.as_ref().as_ref(),Some(a.associated_quote_bonding_curve.as_ref()),Some(a.associated_quote_recipient.as_ref()),ctx.bumps.bonding_curve)?;
 }
 let event=SweepBondingCurveFeeEvent{timestamp:Clock::get()?.unix_timestamp,mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),quote_mint:a.bonding_curve.quote_mint,recipient:a.recipient.key(),amount,bucket:creator as u8};
 emit!(event);emit_cpi!(event);Ok(())
}
