//! Partial reconstruction: six handlers implemented; remaining handlers unsupported.
//! It is not the deployed program source.
use anchor_lang::prelude::*;

mod contexts;
mod types;
use contexts::*;
use types::*;

declare_id!("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ");

#[program]
pub mod pump_fees_candidate {
    use super::*;

    #[allow(unused_variables)]
    pub fn admin_cto_sharing_config(_ctx: Context<AdminCtoSharingConfig>, new_admin: Option<Pubkey>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn claim_social_fee_pda(_ctx: Context<ClaimSocialFeePda>, user_id: String, platform: u8) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn claim_social_fee_pda_v2(_ctx: Context<ClaimSocialFeePdaV2>, user_id: String, platform: u8) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn crank_donation_fee_pda(_ctx: Context<CrankDonationFeePda>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn create_donation_fee_pda(_ctx: Context<CreateDonationFeePda>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn create_fee_sharing_config(_ctx: Context<CreateFeeSharingConfig>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn create_social_fee_pda(_ctx: Context<CreateSocialFeePda>, user_id: String, platform: u8) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn extend_fee_config(_ctx: Context<ExtendFeeConfig>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn get_fees(ctx: Context<GetFees>, is_pump_pool: bool, market_cap_lamports: u128, trade_size_lamports: u64, is_new_quote_mint: OptionBool) -> Result<Fees> {
        let config = &ctx.accounts.fee_config;
        if !is_pump_pool { return Ok(config.flat_fees.clone()); }
        Ok(select_fee_tier(if is_new_quote_mint.0 { &config.stable_fee_tiers } else { &config.fee_tiers }, market_cap_lamports))
    }

    #[allow(unused_variables)]
    pub fn get_fees_with_quote_mint(ctx: Context<GetFeesWithQuoteMint>, is_pump_pool: bool, market_cap_lamports: u128, quote_mint: Pubkey) -> Result<Fees> {
        let config = &ctx.accounts.fee_config;
        if !is_pump_pool { return Ok(config.flat_fees.clone()); }
        let quote = quote_mint.to_bytes();
        if quote == [0; 32] || quote == WRAPPED_SOL || quote == OTHER_NORMAL_QUOTE {
            Ok(select_fee_tier(&config.fee_tiers, market_cap_lamports))
        } else if quote == USDC {
            Ok(select_fee_tier(&config.stable_fee_tiers, market_cap_lamports))
        } else if config.exotic_flat_fees.lp_fee_bps == 0 && config.exotic_flat_fees.protocol_fee_bps == 0 && config.exotic_flat_fees.creator_fee_bps == 0 {
            Ok(config.flat_fees.clone())
        } else { Ok(config.exotic_flat_fees.clone()) }
    }

    #[allow(unused_variables)]
    pub fn initialize_buyback(_ctx: Context<InitializeBuyback>, index: u8) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn initialize_fee_config(_ctx: Context<InitializeFeeConfig>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn initialize_fee_program_global(_ctx: Context<InitializeFeeProgramGlobal>, social_claim_authority: Pubkey, disable_flags: u8, claim_rate_limit: u64) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn revoke_fee_sharing_authority(_ctx: Context<RevokeFeeSharingAuthority>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn set_authority(ctx: Context<SetAuthority>, new_authority: Pubkey) -> Result<()> {
        require_keys_neq!(new_authority, Pubkey::default(), FeeError::InvalidAdmin);
        let old_authority = ctx.accounts.fee_program_global.authority;
        ctx.accounts.fee_program_global.authority = new_authority;
        let event = SetAuthorityEvent { timestamp: Clock::get()?.unix_timestamp, old_authority, new_authority };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }

    #[allow(unused_variables)]
    pub fn set_claim_rate_limit(ctx: Context<SetClaimRateLimit>, claim_rate_limit: u64) -> Result<()> {
        ctx.accounts.fee_program_global.claim_rate_limit = claim_rate_limit;
        let event = SetClaimRateLimitEvent { timestamp: Clock::get()?.unix_timestamp, claim_rate_limit };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }

    #[allow(unused_variables)]
    pub fn set_disable_flags(ctx: Context<SetDisableFlags>, disable_flags: u8) -> Result<()> {
        ctx.accounts.fee_program_global.disable_flags = disable_flags;
        let event = SetDisableFlagsEvent { timestamp: Clock::get()?.unix_timestamp, disable_flags };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }

    #[allow(unused_variables)]
    pub fn set_exotic_flat_fees(_ctx: Context<SetExoticFlatFees>, exotic_flat_fees: Fees) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn set_social_claim_authority(ctx: Context<SetSocialClaimAuthority>, social_claim_authority: Pubkey) -> Result<()> {
        ctx.accounts.fee_program_global.social_claim_authority = social_claim_authority;
        let event = SetSocialClaimAuthorityEvent { timestamp: Clock::get()?.unix_timestamp, social_claim_authority };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }

    #[allow(unused_variables)]
    pub fn sweep_buyback(_ctx: Context<SweepBuyback>, index: u8) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn transfer_fee_sharing_authority(_ctx: Context<TransferFeeSharingAuthority>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn update_admin(_ctx: Context<UpdateAdmin>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn update_buyback_authority(_ctx: Context<UpdateBuybackAuthority>, index: u8, new_authority: Pubkey) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn update_buyback_claim_rate_limit(_ctx: Context<UpdateBuybackClaimRateLimit>, index: u8, claim_rate_limit: i64) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn update_fee_config(_ctx: Context<UpdateFeeConfig>, fee_tiers: Vec<FeeTier>, flat_fees: Fees) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn update_fee_shares(_ctx: Context<UpdateFeeShares>, shareholders: Vec<Shareholder>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn update_fee_shares_v2(_ctx: Context<UpdateFeeSharesV2>, shareholders: Vec<Shareholder>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn update_stable_fee_config(_ctx: Context<UpdateStableFeeConfig>, fee_tiers: Vec<FeeTier>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn upsert_fee_tiers(_ctx: Context<UpsertFeeTiers>, fee_tiers: Vec<FeeTier>, offset: u8) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn upsert_stable_fee_tiers(_ctx: Context<UpsertStableFeeTiers>, fee_tiers: Vec<FeeTier>, offset: u8) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

    #[allow(unused_variables)]
    pub fn withdraw(_ctx: Context<Withdraw>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }

}

#[error_code]
pub enum CandidateError {
    #[msg("Research candidate handler not reconstructed")]
    Unsupported,
}

fn select_fee_tier(tiers: &[FeeTier], cap: u128) -> Fees {
    if cap < tiers[0].market_cap_lamports_threshold { return tiers[0].fees.clone(); }
    for tier in tiers.iter().rev() {
        if cap >= tier.market_cap_lamports_threshold { return tier.fees.clone(); }
    }
    tiers[0].fees.clone()
}
pub const WRAPPED_SOL: [u8; 32] = [6,155,136,87,254,171,129,132,251,104,127,99,70,24,192,53,218,196,57,220,26,235,59,85,152,160,240,0,0,0,0,1];
pub const OTHER_NORMAL_QUOTE: [u8; 32] = [131,13,252,159,222,95,230,184,170,124,4,164,118,233,30,138,198,187,38,74,173,144,250,25,201,223,73,216,92,62,91,94];
pub const USDC: [u8; 32] = [198,250,122,243,190,219,173,58,61,101,243,106,171,201,116,49,177,187,228,194,210,246,224,228,124,166,2,3,69,47,93,97];

#[error_code]
pub enum FeeError {
    #[msg("Invalid admin")]
    InvalidAdmin = 1,
    #[msg("The given account is not authorized to execute this instruction.")]
    NotAuthorized = 16,
}
