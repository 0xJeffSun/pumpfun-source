use anchor_lang::prelude::*;

impl AccountDeserialize for BondingCurve {
 fn try_deserialize(buf:&mut &[u8])->Result<Self>{
  if buf.len()<8{return Err(anchor_lang::error::ErrorCode::AccountDiscriminatorNotFound.into());}
  if &buf[..8]!=Self::DISCRIMINATOR {
   return Err(annotate(
       error!(anchor_lang::error::ErrorCode::AccountDiscriminatorMismatch),"BondingCurve"));
  }
  Self::try_deserialize_unchecked(buf)
 }
 fn try_deserialize_unchecked(buf:&mut &[u8])->Result<Self>{let mut data=&buf[8..];AnchorDeserialize::deserialize(&mut data).map_err(|_|anchor_lang::error::ErrorCode::AccountDidNotDeserialize.into())}
}
impl AccountDeserialize for Pool { fn try_deserialize(buf:&mut &[u8])->Result<Self>{if buf.len()<8{return Err(anchor_lang::error::ErrorCode::AccountDiscriminatorNotFound.into());}if &buf[..8]!=Self::DISCRIMINATOR{return Err(annotate(
       error!(anchor_lang::error::ErrorCode::AccountDiscriminatorMismatch),"Pool"));}Self::try_deserialize_unchecked(buf)} fn try_deserialize_unchecked(buf:&mut &[u8])->Result<Self>{let mut data=&buf[8..];AnchorDeserialize::deserialize(&mut data).map_err(|_|anchor_lang::error::ErrorCode::AccountDidNotDeserialize.into())}}
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct BondingCurve {
 pub virtual_token_reserves:u64,pub virtual_sol_reserves:u64,
 pub real_token_reserves:u64,pub real_sol_reserves:u64,
 pub token_total_supply:u64,pub complete:bool,pub creator:Pubkey,
 pub is_mayhem_mode:bool,pub is_cashback_coin:bool,pub quote_mint:Pubkey,
 pub creator_fee_bps:u64,pub can_edit_creator_fee:bool,pub is_holder_reward:bool,
 pub creator_fee:u64,pub protocol_fees:u64,
}
impl Owner for BondingCurve {fn owner()->Pubkey{pubkey!("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P")}}
impl Discriminator for BondingCurve {const DISCRIMINATOR:&'static[u8]=&[23,183,248,55,96,216,172,96];}
impl AccountSerialize for BondingCurve {fn try_serialize<W:std::io::Write>(&self,w:&mut W)->Result<()>{if w.write_all(Self::DISCRIMINATOR).is_err(){return Err(anchor_lang::error::ErrorCode::AccountDidNotSerialize.into());}if AnchorSerialize::serialize(self,w).is_err(){return Err(anchor_lang::error::ErrorCode::AccountDidNotSerialize.into());}Ok(())}}

#[derive(AnchorSerialize,AnchorDeserialize,Clone,Default)]
pub struct Pool {
 pub pool_bump:u8,                  // 8
 pub index:u16,                     // 9
 pub creator:Pubkey,                // 11
 pub base_mint:Pubkey,              // 43
 pub quote_mint:Pubkey,             // 75
 pub lp_mint:Pubkey,                // 107
 pub pool_base_token_account:Pubkey,// 139
 pub pool_quote_token_account:Pubkey,//171
 pub lp_supply:u64,                 // 203
 pub coin_creator:Pubkey,           // 211
 pub is_mayhem_mode:bool,           // 243
 pub is_cashback_coin:bool,         // 244
 pub virtual_quote_reserves:i128,   // 245
 pub creator_fee_bps:u64,           // 261
 pub can_edit_creator_fee:bool,     // 269
 pub is_holder_reward:bool,         // 270
 pub protocol_fees:u64,             // 271
 pub creator_fees:u64,              // 279, end287
}
impl Owner for Pool {fn owner()->Pubkey{pubkey!("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA")}}
impl Discriminator for Pool {const DISCRIMINATOR:&'static[u8]=&[241,154,109,4,17,177,109,188];}
impl AccountSerialize for Pool {fn try_serialize<W:std::io::Write>(&self,w:&mut W)->Result<()>{if w.write_all(Self::DISCRIMINATOR).is_err(){return Err(anchor_lang::error::ErrorCode::AccountDidNotSerialize.into());}if AnchorSerialize::serialize(self,w).is_err(){return Err(anchor_lang::error::ErrorCode::AccountDidNotSerialize.into());}Ok(())}}
#[inline(never)]
fn annotate(error:Error,name:&str)->Error {error.with_account_name(name)}

impl Default for BondingCurve {fn default()->Self{Self{virtual_token_reserves:0,virtual_sol_reserves:0,real_token_reserves:0,real_sol_reserves:0,token_total_supply:0,complete:false,creator:Pubkey::new_from_array([0;32]),is_mayhem_mode:false,is_cashback_coin:false,quote_mint:Pubkey::new_from_array([0;32]),creator_fee_bps:0,can_edit_creator_fee:false,is_holder_reward:false,creator_fee:0,protocol_fees:0}}}

pub static PUMP_ID:Pubkey=pubkey!("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
pub static AMM_ID:Pubkey=pubkey!("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA");
