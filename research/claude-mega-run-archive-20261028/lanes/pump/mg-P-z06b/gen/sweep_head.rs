use anchor_lang::prelude::*;
use crate::{Global,PumpError};
use crate::trade_types::BondingCurve;
#[event_cpi]
#[derive(Accounts)]
pub struct SweepFees<'info>{
 #[account(mut)]pub payer:Signer<'info>,
 #[account(seeds=[b"global"],bump)]pub global:Box<Account<'info,Global>>,
 pub base_mint:Box<InterfaceAccount<'info,anchor_spl::token_interface::Mint>>,
 pub quote_mint:Box<InterfaceAccount<'info,anchor_spl::token_interface::Mint>>,
 pub quote_token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 pub system_program:Program<'info,System>,
 #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,constraint=quote_mint.key()==bonding_curve.quote_mint || (bonding_curve.quote_mint==Pubkey::default() && quote_mint.key()==anchor_spl::token::spl_token::native_mint::ID) @ PumpError::MintDoesNotMatchBondingCurve)]pub bonding_curve:Box<Account<'info,BondingCurve>>,
 /// CHECK: checked as token data only in the positive token branch.
 #[account(mut,seeds=[bonding_curve.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=anchor_spl::associated_token::ID)]pub associated_quote_bonding_curve:UncheckedAccount<'info>,
 /// CHECK: handler verifies fee recipient or creator vault.
 #[account(mut)]pub recipient:UncheckedAccount<'info>,
 /// CHECK: address checked; token branch creates or parses.
 #[account(mut,seeds=[recipient.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=anchor_spl::associated_token::ID)]pub associated_quote_recipient:UncheckedAccount<'info>,
}
#[event]
#[derive(Clone)]pub struct SweepBondingCurveFeeEvent{pub timestamp:i64,pub mint:Pubkey,pub bonding_curve:Pubkey,pub quote_mint:Pubkey,pub recipient:Pubkey,pub amount:u64,pub bucket:u8}
