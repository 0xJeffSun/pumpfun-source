// Natural wire-type hypothesis, not historical source or a binary-identity claim.
// Read-only in BuyV3. Borsh vectors have no invented 102-item acceptance cap.
use anchor_lang::prelude::*;
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Rates { pub lp: u64, pub protocol: u64, pub creator: u64 }
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Tier { pub threshold: u128, pub rates: Rates }
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct FeeConfig {
    pub bump: u8,
    pub admin: Pubkey,
    pub flat: Rates,
    pub first: Vec<Tier>,
    pub second: Vec<Tier>,
    pub exotic: Rates,
}
impl Owner for FeeConfig { fn owner() -> Pubkey { super::FEE_PROGRAM } }
impl Discriminator for FeeConfig {
    const DISCRIMINATOR: &'static [u8] = &[0x8f,0x34,0x92,0xbb,0xdb,0x7b,0x4c,0x9b];
}
impl AccountDeserialize for FeeConfig {
    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {
        if buf.len() < Self::DISCRIMINATOR.len() {
            return Err(anchor_lang::error::ErrorCode::AccountDiscriminatorNotFound.into());
        }
        if &buf[..Self::DISCRIMINATOR.len()] != Self::DISCRIMINATOR {
            return Err(anchor_lang::error!(anchor_lang::error::ErrorCode::AccountDiscriminatorMismatch)
                .with_account_name("FeeConfig"));
        }
        Self::try_deserialize_unchecked(buf)
    }
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        // Same precondition as locked account derive: at least discriminator bytes.
        // This account is checked-only in BuyV3, never an init target.
        let mut data = &buf[Self::DISCRIMINATOR.len()..];
        AnchorDeserialize::deserialize(&mut data)
            .map_err(|_| anchor_lang::error::ErrorCode::AccountDidNotDeserialize.into())
    }
}
impl AccountSerialize for FeeConfig {
    fn try_serialize<W: std::io::Write>(&self, writer: &mut W) -> Result<()> {
        if writer.write_all(Self::DISCRIMINATOR).is_err() {
            return Err(anchor_lang::error::ErrorCode::AccountDidNotSerialize.into());
        }
        if AnchorSerialize::serialize(self, writer).is_err() {
            return Err(anchor_lang::error::ErrorCode::AccountDidNotSerialize.into());
        }
        Ok(())
    }
}
