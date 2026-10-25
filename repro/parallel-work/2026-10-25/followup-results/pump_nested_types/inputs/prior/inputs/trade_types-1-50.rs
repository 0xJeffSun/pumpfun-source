use anchor_lang::prelude::*;
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct BondingCurve {
    pub virtual_token_reserves: u64,
    pub virtual_quote_reserves: u64,
    pub real_token_reserves: u64,
    pub real_quote_reserves: u64,
    pub token_total_supply: u64,
    pub complete: bool,
    pub creator: Pubkey,
    pub is_mayhem_mode: bool,
    pub is_cashback_coin: bool,
    pub quote_mint: Pubkey,
    pub creator_fee_bps: u64,
    pub can_edit_creator_fee: bool,
    pub is_holder_reward: bool,
    pub creator_fee: u64,
    pub protocol_fees: u64,
    pub depth: u8,
    pub initial_virtual_quote_reserves: u64,
    pub post_complete_base_out: u64,
    pub post_complete_quote_in: u64,
}
impl anchor_lang::Discriminator for BondingCurve {
    const DISCRIMINATOR: &'static [u8] = &[23, 183, 248, 55, 96, 216, 172, 96];
}
impl anchor_lang::Owner for BondingCurve {
    fn owner() -> Pubkey { crate::ID }
}
impl anchor_lang::AccountSerialize for BondingCurve {
    fn try_serialize<W: std::io::Write>(&self, writer: &mut W) -> Result<()> {
        writer.write_all(Self::DISCRIMINATOR)?;
        AnchorSerialize::serialize(self, writer)?;
        Ok(())
    }
}
impl anchor_lang::AccountDeserialize for BondingCurve {
    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {
        if buf.len() < Self::DISCRIMINATOR.len() {
            return Err(anchor_lang::error::ErrorCode::AccountDiscriminatorNotFound.into());
        }
        let given_disc = &buf[..Self::DISCRIMINATOR.len()];
        if Self::DISCRIMINATOR != given_disc {
            return Err(anchor_lang::error!(anchor_lang::error::ErrorCode::AccountDiscriminatorMismatch).with_account_name("BondingCurve"));
        }
        Self::try_deserialize_unchecked(buf)
    }
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        let mut data: &[u8] = &buf[Self::DISCRIMINATOR.len()..];
        AnchorDeserialize::deserialize(&mut data)
