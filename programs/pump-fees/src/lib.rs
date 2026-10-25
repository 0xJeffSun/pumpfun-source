//! Partial reconstruction: eighteen handlers implemented; remaining handlers unsupported.
//! It is not the deployed program source.
use anchor_lang::prelude::*;

mod contexts;
mod donation;
use donation::*;
mod pump_global;
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
    pub fn crank_donation_fee_pda(ctx: Context<CrankDonationFeePda>) -> Result<()> {
        donation::crank(ctx)
    }

    #[allow(unused_variables)]
    pub fn create_donation_fee_pda(ctx: Context<CreateDonationFeePda>) -> Result<()> {
        donation::create(ctx)
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
    pub fn extend_fee_config(ctx: Context<ExtendFeeConfig>) -> Result<()> {
        let info = ctx.accounts.fee_config.to_account_info();
        let data = info.try_borrow_data()?;
        require!(info.owner == &ID && data.len() >= 9 && data[..8] == [143,52,146,187,219,123,76,155], FeeError::InvalidFeeConfigAccount);
        let bump = [data[8]];
        let config_program = ctx.accounts.config_program_id.key();
        let expected = Pubkey::create_program_address(&[b"fee_config", config_program.as_ref(), &bump], &ID)
            .map_err(|_| error!(FeeError::InvalidFeeConfigAccount))?;
        require_keys_eq!(expected, info.key(), FeeError::InvalidFeeConfigAccount);
        let current_size = data.len();
        drop(data);
        if current_size >= 4097 { return Ok(()); }
        let rent = Rent::get()?;
        let amount = rent.minimum_balance(4097) - rent.minimum_balance(current_size);
        anchor_lang::system_program::transfer(CpiContext::new(
            ctx.accounts.system_program.to_account_info(), anchor_lang::system_program::Transfer {
                from: ctx.accounts.user.to_account_info(), to: info.clone(),
            }), amount)?;
        info.realloc(4097, true)?;
        let event = ExtendFeeConfigEvent { fee_config: info.key(), user: ctx.accounts.user.key(),
            current_size: current_size as u64, new_size: 4097, timestamp: Clock::get()?.unix_timestamp };
        emit!(event); emit_cpi!(event); Ok(())
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
    pub fn initialize_fee_program_global(ctx: Context<InitializeFeeProgramGlobal>, social_claim_authority: Pubkey, disable_flags: u8, claim_rate_limit: u64) -> Result<()> {
        let state = &mut ctx.accounts.fee_program_global;
        state.bump = ctx.bumps.fee_program_global;
        state.authority = ctx.accounts.authority.key();
        state.social_claim_authority = social_claim_authority;
        state.disable_flags = disable_flags;
        state.claim_rate_limit = claim_rate_limit;
        let event = InitializeFeeProgramGlobalEvent {
            timestamp: Clock::get()?.unix_timestamp, authority: ctx.accounts.authority.key(),
            social_claim_authority, disable_flags, claim_rate_limit,
        };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }

    #[allow(unused_variables)]
    pub fn revoke_fee_sharing_authority(_ctx: Context<RevokeFeeSharingAuthority>) -> Result<()> {
        Err(error!(FeeError::DeprecatedInstruction))
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
    pub fn set_exotic_flat_fees(ctx: Context<SetExoticFlatFees>, exotic_flat_fees: Fees) -> Result<()> {
        validate_fees(&exotic_flat_fees)?;
        let info = ctx.accounts.fee_config.to_account_info();
        if info.data_len() < 4097 {
            let rent = Rent::get()?.minimum_balance(4097);
            let extra = rent.saturating_sub(info.lamports());
            if extra > 0 {
                anchor_lang::system_program::transfer(CpiContext::new(
                    ctx.accounts.system_program.to_account_info(), anchor_lang::system_program::Transfer {
                        from: ctx.accounts.admin.to_account_info(), to: info.clone(),
                    }), extra)?;
            }
            info.realloc(4097, true)?;
        }
        ctx.accounts.fee_config.exotic_flat_fees = exotic_flat_fees.clone();
        let event = SetExoticFlatFeesEvent { timestamp: Clock::get()?.unix_timestamp,
            admin: ctx.accounts.admin.key(), fee_config: ctx.accounts.fee_config.key(), exotic_flat_fees };
        emit!(event.clone()); emit_cpi!(event); Ok(())
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
        Err(error!(FeeError::DeprecatedInstruction))
    }

    #[allow(unused_variables)]
    pub fn update_admin(ctx: Context<UpdateAdmin>) -> Result<()> {
        let old_admin = ctx.accounts.admin.key();
        let new_admin = ctx.accounts.new_admin.key();
        ctx.accounts.fee_config.admin = new_admin;
        let event = UpdateAdminEvent { timestamp: Clock::get()?.unix_timestamp, old_admin, new_admin };
        emit!(event); emit_cpi!(event); Ok(())
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
    pub fn update_fee_config(ctx: Context<UpdateFeeConfig>, fee_tiers: Vec<FeeTier>, flat_fees: Fees) -> Result<()> {
        validate_fees(&flat_fees)?;
        validate_tiers(&fee_tiers)?;
        ctx.accounts.fee_config.fee_tiers = fee_tiers.clone();
        ctx.accounts.fee_config.flat_fees = flat_fees.clone();
        let event = UpdateFeeConfigEvent { timestamp: Clock::get()?.unix_timestamp,
            admin: ctx.accounts.admin.key(), fee_config: ctx.accounts.fee_config.key(), fee_tiers, flat_fees };
        emit!(event.clone()); emit_cpi!(event); Ok(())
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
    pub fn update_stable_fee_config(ctx: Context<UpdateStableFeeConfig>, fee_tiers: Vec<FeeTier>) -> Result<()> {
        validate_tiers(&fee_tiers)?;
        ctx.accounts.fee_config.stable_fee_tiers = fee_tiers.clone();
        let event = UpdateStableFeeConfigEvent { timestamp: Clock::get()?.unix_timestamp,
            admin: ctx.accounts.admin.key(), fee_config: ctx.accounts.fee_config.key(),
            stable_fee_tiers: fee_tiers, flat_fees: ctx.accounts.fee_config.flat_fees.clone() };
        emit!(event.clone()); emit_cpi!(event); Ok(())
    }

    #[allow(unused_variables)]
    pub fn upsert_fee_tiers(ctx: Context<UpsertFeeTiers>, fee_tiers: Vec<FeeTier>, offset: u8) -> Result<()> {
        upsert_tiers(&mut ctx.accounts.fee_config.fee_tiers, &fee_tiers, offset)?;
        let event = UpsertFeeTiersEvent { timestamp: Clock::get()?.unix_timestamp,
            admin: ctx.accounts.admin.key(), fee_config: ctx.accounts.fee_config.key(), fee_tiers, offset };
        emit!(event.clone()); emit_cpi!(event); Ok(())
    }

    #[allow(unused_variables)]
    pub fn upsert_stable_fee_tiers(ctx: Context<UpsertStableFeeTiers>, fee_tiers: Vec<FeeTier>, offset: u8) -> Result<()> {
        upsert_tiers(&mut ctx.accounts.fee_config.stable_fee_tiers, &fee_tiers, offset)?;
        let event = UpsertStableFeeTiersEvent { timestamp: Clock::get()?.unix_timestamp,
            admin: ctx.accounts.admin.key(), fee_config: ctx.accounts.fee_config.key(), stable_fee_tiers: fee_tiers, offset };
        emit!(event.clone()); emit_cpi!(event); Ok(())
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
    #[msg("No fee tiers provided")]
    NoFeeTiers = 2,
    #[msg("Too many fee tiers")]
    TooManyFeeTiers = 3,
    #[msg("The offset should be <= fee_config.fee_tiers.len()")]
    OffsetNotContinuous = 4,
    #[msg("Fee tiers must be sorted by market cap threshold (ascending)")]
    FeeTiersNotSorted = 5,
    #[msg("Fee total must not exceed 10_000bps")]
    InvalidFeeTotal = 6,
    #[msg("Invalid Sharing Config")]
    InvalidSharingConfig = 7,
    #[msg("Invalid Pool")]
    InvalidPool = 8,
    #[msg("Sharing config authority has been revoked - sharing config can only be updated once")]
    SharingConfigAdminRevoked = 9,
    #[msg("Share calculation overflow")]
    ShareCalculationOverflow = 15,
    #[msg("The given account is not authorized to execute this instruction.")]
    NotAuthorized = 16,
    #[msg("Fee sharing config is not active")]
    SharingConfigNotActive = 18,
    #[msg("Feature is currently deactivated")]
    FeatureDeactivated = 21,
    #[msg("Instruction is deprecated")]
    DeprecatedInstruction = 23,
    #[msg("Account is not a valid FeeConfig for this instruction")]
    InvalidFeeConfigAccount = 28,
}

fn validate_fees(fees: &Fees) -> Result<()> {
    // The original aborts on addition overflow before comparing the total.
    let total = fees.lp_fee_bps.checked_add(fees.protocol_fee_bps).unwrap()
        .checked_add(fees.creator_fee_bps).unwrap();
    require!(total <= 10_000, FeeError::InvalidFeeTotal);
    Ok(())
}
fn validate_tiers(tiers: &[FeeTier]) -> Result<()> {
    require!(!tiers.is_empty(), FeeError::NoFeeTiers);
    require!(tiers.len() <= 50, FeeError::TooManyFeeTiers);
    for tier in tiers { validate_fees(&tier.fees)?; }
    require!(tiers.windows(2).all(|pair| pair[0].market_cap_lamports_threshold < pair[1].market_cap_lamports_threshold), FeeError::FeeTiersNotSorted);
    Ok(())
}

fn upsert_tiers(current: &mut Vec<FeeTier>, incoming: &[FeeTier], offset: u8) -> Result<()> {
    require!(!incoming.is_empty(), FeeError::NoFeeTiers);
    let offset = offset as usize;
    require!(offset <= current.len(), FeeError::OffsetNotContinuous);
    require!(current.len().max(offset + incoming.len()) <= 50, FeeError::TooManyFeeTiers);
    for (index, tier) in incoming.iter().enumerate() {
        if offset + index < current.len() { current[offset + index] = tier.clone(); }
        else { current.push(tier.clone()); }
    }
    validate_tiers(current)
}
