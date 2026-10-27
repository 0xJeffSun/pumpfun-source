//! External AMM codecs recovered from original Mayhem decoding routines.
use anchor_lang::prelude::*;
use anchor_lang::Discriminator;
pub const AMM_ID:Pubkey=pubkey!("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA");
// 0x17d8 computes current serialized size 287 from the default struct, allocates a
// ZERO-filled 287-byte buffer for every shorter input, copies ALL available input
// bytes, then calls 0x8eb78. No version-boundary truncation is used in Mayhem.
#[derive(Clone)]
pub struct SwapPool(pub curve_accounts::Pool);
impl std::ops::Deref for SwapPool {type Target=curve_accounts::Pool;fn deref(&self)->&Self::Target{&self.0}}
impl std::ops::DerefMut for SwapPool {fn deref_mut(&mut self)->&mut Self::Target{&mut self.0}}
impl Owner for SwapPool {fn owner()->Pubkey{curve_accounts::AMM_ID}}
impl Discriminator for SwapPool {const DISCRIMINATOR:&'static[u8]=curve_accounts::Pool::DISCRIMINATOR;}
impl AccountDeserialize for SwapPool {
 fn try_deserialize(buf:&mut &[u8])->Result<Self>{Self::try_deserialize_unchecked(buf)}
 fn try_deserialize_unchecked(buf:&mut &[u8])->Result<Self>{
  let mut default=Vec::new();curve_accounts::Pool::default().try_serialize(&mut default)?;
  if buf.len()<default.len(){let mut padded=vec![0;default.len()];padded[..buf.len()].copy_from_slice(buf);let value=curve_accounts::Pool::try_deserialize(&mut padded.as_slice())?;*buf=&buf[buf.len()..];Ok(Self(value))}else{curve_accounts::Pool::try_deserialize(buf).map(Self)}
 }
}
impl AccountSerialize for SwapPool {fn try_serialize<W:std::io::Write>(&self,w:&mut W)->Result<()>{self.0.try_serialize(w)}}

























// 0x744a8 checks discriminator; 0x74890 consumes exactly the old418-byte prefix.
// Unlike Pool this has no padding and no optional historical layout selector.
pub use crate::pump_amm::accounts::GlobalConfig as SwapGlobalConfig;





























// Keep the published module path while using the shared error namespace.
pub use crate::MayhemError as PumpSwapError;
