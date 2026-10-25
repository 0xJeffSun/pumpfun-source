use anchor_lang::prelude::*;
use crate::{PumpError,distribution::{DistributionCurve,SharingConfig,FEES}};
#[derive(Clone)]pub struct MigratingCurve{pub creator:Pubkey,pub holder:bool,pub creator_fee:u64,pub bytes:[u8;166]}
impl Owner for MigratingCurve{fn owner()->Pubkey{crate::ID}}
impl AccountDeserialize for MigratingCurve{
 fn try_deserialize(buf:&mut &[u8])->Result<Self>{Self::try_deserialize_unchecked(buf)}
 fn try_deserialize_unchecked(buf:&mut &[u8])->Result<Self>{
  let view=DistributionCurve::try_deserialize(buf)?;let mut bytes=[0u8;166];bytes[..49].copy_from_slice(&buf[..49]);
  for (start,len) in [(49,32),(81,1),(82,1),(83,32),(115,8),(123,1),(124,1),(125,8),(133,8),(141,1),(142,8),(150,8),(158,8)]{if buf.len()>=start+len{bytes[start..start+len].copy_from_slice(&buf[start..start+len]);}}
  Ok(Self{creator:view.creator,holder:bytes[124]!=0,creator_fee:if buf.len()>=141{u64::from_le_bytes(bytes[125..133].try_into().unwrap())}else{0},bytes})
 }
}
impl AccountSerialize for MigratingCurve{fn try_serialize<W:std::io::Write>(&self,writer:&mut W)->Result<()>{let mut bytes=self.bytes;bytes[49..81].copy_from_slice(self.creator.as_ref());writer.write_all(&bytes)?;Ok(())}}
#[derive(Accounts)]
pub struct MigrateBondingCurveCreator<'info>{
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,MigratingCurve>,
 #[account(seeds=[b"sharing-config",mint.key().as_ref()],bump,seeds::program=FEES,has_one=mint @ PumpError::MintDoesNotMatchBondingCurve,constraint=bonding_curve.creator==sharing_config.admin @ PumpError::BondingCurveAndSharingConfigCreatorMismatch)]pub sharing_config:Account<'info,SharingConfig>,
 /// CHECK: canonical event authority.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: original validates this only through event CPI invocation.
 pub program:UncheckedAccount<'info>,
}
#[event]
#[derive(Clone)]pub struct MigrateBondingCurveCreatorEvent{pub timestamp:i64,pub mint:Pubkey,pub bonding_curve:Pubkey,pub sharing_config:Pubkey,pub old_creator:Pubkey,pub new_creator:Pubkey}
pub fn execute(mut ctx:Context<MigrateBondingCurveCreator>)->Result<()>{
 let a=&mut ctx.accounts;require!(!a.bonding_curve.holder,PumpError::HolderRewardCreatorImmutable);require!(a.bonding_curve.creator_fee==0,PumpError::CreatorFeesNotSwept);
 let event=MigrateBondingCurveCreatorEvent{timestamp:Clock::get()?.unix_timestamp,mint:a.mint.key(),bonding_curve:a.bonding_curve.key(),sharing_config:a.sharing_config.key(),old_creator:a.bonding_curve.creator,new_creator:a.sharing_config.key()};a.bonding_curve.creator=a.sharing_config.key();emit!(event.clone());emit_cpi!(event);Ok(())
}
