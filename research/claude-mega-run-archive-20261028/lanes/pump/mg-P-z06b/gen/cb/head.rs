#[path = "fee_recipient.rs"]
pub(crate) mod fee_recipient;
use anchor_lang::prelude::*;
use anchor_spl::token_interface::{self,Mint,TokenAccount,TokenInterface,TransferChecked};
use crate::{Global,PumpError};
use crate::trade_types::{BondingCurve,TradeEvent};

#[derive(Clone)]pub struct LegacyCurve(pub BondingCurve,pub usize);
impl std::ops::Deref for LegacyCurve{type Target=BondingCurve;fn deref(&self)->&BondingCurve{&self.0}}
impl std::ops::DerefMut for LegacyCurve{fn deref_mut(&mut self)->&mut BondingCurve{&mut self.0}}
impl Owner for LegacyCurve{fn owner()->Pubkey{crate::ID}}
impl AccountDeserialize for LegacyCurve{fn try_deserialize(buf:&mut &[u8])->Result<Self>{let len=buf.len();Ok(Self(BondingCurve::try_deserialize(buf)?,len))}fn try_deserialize_unchecked(buf:&mut &[u8])->Result<Self>{Self::try_deserialize(buf)}}
impl AccountSerialize for LegacyCurve{fn try_serialize<W:std::io::Write>(&self,w:&mut W)->Result<()>{let mut b=Vec::new();self.0.try_serialize(&mut b)?;w.write_all(&b[..self.1.min(b.len())])?;Ok(())}}
pub use crate::pump_fees::{
    accounts::FeeConfig as LegacyFeeConfig,
    program::PumpFees as LegacyFeesProgram,
};
