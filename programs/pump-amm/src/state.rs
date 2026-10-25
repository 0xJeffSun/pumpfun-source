use anchor_lang::Discriminator;
use anchor_lang::prelude::*;
#[event]
#[derive(Clone)]
pub struct DisableEvent {
    pub timestamp: i64,
    pub admin: Pubkey,
    pub disable_create_pool: bool,
    pub disable_deposit: bool,
    pub disable_withdraw: bool,
    pub disable_buy: bool,
    pub disable_sell: bool,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct GlobalConfig {
    pub admin: Pubkey,
    pub lp_fee_basis_points: u64,
    pub protocol_fee_basis_points: u64,
    pub disable_flags: u8,
    pub protocol_fee_recipients: [Pubkey; 8],
    pub coin_creator_fee_basis_points: u64,
    pub admin_set_coin_creator_authority: Pubkey,
    pub whitelist_pda: Pubkey,
    pub reserved_fee_recipient: Pubkey,
    pub mayhem_mode_enabled: bool,
    pub reserved_fee_recipients: [Pubkey; 7],
    pub is_cashback_enabled: bool,
    pub buyback_fee_recipients: [Pubkey; 8],
    pub buyback_basis_points: u64,
    pub boost_authority: Pubkey,
    pub boost_enabled: bool,
    pub creator_fee_configurable: bool,
    pub max_configurable_creator_fee_bps: u64,
}
#[event]
#[derive(Clone)]
pub struct UpdateAdminEvent {
    pub timestamp: i64,
    pub admin: Pubkey,
    pub new_admin: Pubkey,
}

impl Owner for GlobalConfig { fn owner() -> Pubkey { crate::ID } }
impl Discriminator for GlobalConfig { const DISCRIMINATOR: &'static [u8] = &[149, 8, 156, 202, 160, 252, 176, 217]; }
impl AccountDeserialize for GlobalConfig {
    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {
        if buf.len() < 8 || &buf[..8] != Self::DISCRIMINATOR {
            return Err(anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into());
        }
        Self::try_deserialize_unchecked(buf)
    }
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        if buf.len() < 907 { return Err(anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into()); }
        // Original selects legacy layouts at 907/940/949 total account bytes.
        let version_len = if buf.len() >= 949 { 949 } else if buf.len() >= 940 { 940 } else { 907 };
        let mut padded = [0u8; 949];
        padded[..version_len].copy_from_slice(&buf[..version_len]);
        Self::deserialize(&mut &padded[8..]).map_err(|err| anchor_lang::solana_program::program_error::ProgramError::BorshIoError(err.to_string()).into())
    }
}
impl AccountSerialize for GlobalConfig {
    fn try_serialize<W: std::io::Write>(&self, writer: &mut W) -> Result<()> {
        writer.write_all(Self::DISCRIMINATOR).map_err(|err| anchor_lang::solana_program::program_error::ProgramError::BorshIoError(err.to_string()))?;
        self.serialize(writer).map_err(|err| anchor_lang::solana_program::program_error::ProgramError::BorshIoError(err.to_string()).into())
    }
}

#[event]
#[derive(Clone)]
pub struct UpdateFeeConfigEvent {
    pub timestamp: i64,
    pub admin: Pubkey,
    pub lp_fee_basis_points: u64,
    pub protocol_fee_basis_points: u64,
    pub protocol_fee_recipients: [Pubkey; 8],
    pub coin_creator_fee_basis_points: u64,
    pub admin_set_coin_creator_authority: Pubkey,
}

#[event]
#[derive(Clone)]
pub struct SetBoostAuthorityEvent {
    pub timestamp: i64,
    pub admin: Pubkey,
    pub old_boost_authority: Pubkey,
    pub new_boost_authority: Pubkey,
}

#[event]
#[derive(Clone)]
pub struct UpdateCreatorFeeConfigEvent {
    pub timestamp: i64,
    pub admin: Pubkey,
    pub creator_fee_configurable: bool,
    pub max_configurable_creator_fee_bps: u64,
}

#[event]
#[derive(Clone)]
pub struct ReservedFeeRecipientsEvent {
    pub timestamp: i64,
    pub reserved_fee_recipient: Pubkey,
    pub reserved_fee_recipients: [Pubkey; 7],
}

#[event]
#[derive(Clone)]
pub struct CloseUserVolumeAccumulatorEvent {
    pub user: Pubkey,
    pub timestamp: i64,
    pub total_unclaimed_tokens: u64,
    pub total_claimed_tokens: u64,
    pub current_sol_volume: u64,
    pub last_update_timestamp: i64,
}
#[event]
#[derive(Clone)]
pub struct InitUserVolumeAccumulatorEvent {
    pub payer: Pubkey,
    pub user: Pubkey,
    pub timestamp: i64,
}
#[account]
pub struct UserVolumeAccumulator {
    pub user: Pubkey,
    pub needs_claim: bool,
    pub total_unclaimed_tokens: u64,
    pub total_claimed_tokens: u64,
    pub current_sol_volume: u64,
    pub last_update_timestamp: i64,
    pub has_total_claimed_tokens: bool,
    pub cashback_earned: u64,
    pub total_cashback_claimed: u64,
}
