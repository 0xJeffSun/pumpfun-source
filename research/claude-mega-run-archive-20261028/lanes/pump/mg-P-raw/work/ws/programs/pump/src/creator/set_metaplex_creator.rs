use anchor_lang::prelude::*;
use crate::{Global,PumpError,trade_types::BondingCurve};
use crate::set_creator::{METAPLEX,SetMetaplexCreatorEvent};
use anchor_spl::metadata::MetadataAccount as CreatorMetadata;
#[event_cpi]
#[derive(Accounts)]pub struct SetMetaplexCreator<'info>{
 pub mint:Account<'info,anchor_spl::token::Mint>,
 #[account(seeds=[b"metadata",METAPLEX.as_ref(),mint.key().as_ref()],bump,seeds::program=METAPLEX)]pub metadata:Account<'info,CreatorMetadata>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,BondingCurve>,
}































pub fn sync(mut ctx:Context<SetMetaplexCreator>)->Result<()>{let a=&mut ctx.accounts;if a.bonding_curve.creator!=Pubkey::default(){msg!("Bonding curve has creator already set");return Ok(());}match &a.metadata.creators{Some(cs)=>{
                let creator=cs[0].address;a.bonding_curve.creator=creator;let e=SetMetaplexCreatorEvent{timestamp:Clock::get()?.unix_timestamp,mint:a.mint.key(),bonding_curve:a.bonding_curve.key(),metadata:a.metadata.key(),creator};emit!(e);emit_cpi!(e);return Ok(());}None=>{msg!("Missing metaplex creators");}}Ok(())}
