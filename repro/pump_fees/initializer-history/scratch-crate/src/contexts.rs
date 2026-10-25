//! IDL-derived account order/flags only; business constraints are open.
use anchor_lang::prelude::*;
use crate::types::{FeeConfig, FeeProgramGlobal};
use crate::FeeError;

#[derive(Accounts)]
pub struct AdminCtoSharingConfig<'info> {
    pub pool_authority: Signer<'info>,
    pub authority: Signer<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub global: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub mint: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub sharing_config: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub program: UncheckedAccount<'info>,
}


#[event_cpi]
#[derive(Accounts)]
pub struct ExtendFeeConfig<'info> {
    /// CHECK: owner, discriminator, stored bump and PDA are validated by handler.
    #[account(mut)]
    pub fee_config: UncheckedAccount<'info>,
    pub user: Signer<'info>,
    /// CHECK: used only as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetFees<'info> {
    #[account(seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump)]
    pub fee_config: Account<'info, FeeConfig>,
    /// CHECK: Exact deployed constraint not recovered.
    pub config_program_id: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct GetFeesWithQuoteMint<'info> {
    #[account(seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump)]
    pub fee_config: Account<'info, FeeConfig>,
    /// CHECK: Exact deployed constraint not recovered.
    pub config_program_id: UncheckedAccount<'info>,
}


#[event_cpi]
#[derive(Accounts)]
pub struct InitializeFeeConfig<'info> {
    #[account(mut, address = anchor_lang::solana_program::pubkey!("8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8") @ FeeError::InvalidAdmin)]
    pub admin: Signer<'info>,
    #[account(init, payer = admin, space = 2512,
              seeds = [b"fee_config", config_program_id.key().as_ref()], bump)]
    pub fee_config: Account<'info, FeeConfig>,
    pub system_program: Program<'info, System>,
    /// CHECK: Key is the FeeConfig PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct InitializeFeeProgramGlobal<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(seeds = [b"global"], bump, seeds::program = crate::pump_global::PUMP_ID,
              has_one = authority @ FeeError::NotAuthorized)]
    pub pump_global: Box<Account<'info, crate::pump_global::Global>>,
    #[account(init, payer = authority, space = 338, seeds = [b"fee-program-global"], bump)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevokeFeeSharingAuthority {}

#[event_cpi]
#[derive(Accounts)]
pub struct SetAuthority<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct SetClaimRateLimit<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct SetDisableFlags<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct SetExoticFlatFees<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    #[account(mut)]
    pub admin: Signer<'info>,
    /// CHECK: only used as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct SetSocialClaimAuthority<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}


#[derive(Accounts)]
pub struct TransferFeeSharingAuthority {}

#[event_cpi]
#[derive(Accounts)]
pub struct UpdateAdmin<'info> {
    pub admin: Signer<'info>,
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    /// CHECK: accepted as the next authority key; zero and nonsigner keys are allowed.
    pub new_admin: UncheckedAccount<'info>,
    /// CHECK: configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}



#[event_cpi]
#[derive(Accounts)]
pub struct UpdateFeeConfig<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: only used as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct UpdateFeeShares<'info> {
    /// CHECK: Exact deployed constraint not recovered.
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub program: UncheckedAccount<'info>,
    pub authority: Signer<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub global: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub mint: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub sharing_config: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub bonding_curve: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_creator_vault: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_program: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_amm_program: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub amm_event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub wsol_mint: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub token_program: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub associated_token_program: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub coin_creator_vault_authority: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub coin_creator_vault_ata: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct UpdateFeeSharesV2<'info> {
    /// CHECK: Exact deployed constraint not recovered.
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub program: UncheckedAccount<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub global: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub mint: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub sharing_config: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub bonding_curve: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_creator_vault: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_creator_vault_ata: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_program: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub pump_amm_program: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub amm_event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub quote_mint: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub token_program: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub associated_token_program: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub coin_creator_vault_authority: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub coin_creator_vault_ata: UncheckedAccount<'info>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct UpdateStableFeeConfig<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: only used as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct UpsertFeeTiers<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}

#[event_cpi]
#[derive(Accounts)]
pub struct UpsertStableFeeTiers<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
