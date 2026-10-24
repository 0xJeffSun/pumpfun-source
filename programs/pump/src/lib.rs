use anchor_lang::prelude::*;

declare_id!("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");

#[program]
pub mod pump_recovered {
    use super::*;
    pub fn toggle_create_v2(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global.create_v2_enabled, enabled, PumpError::NotAuthorized);
        ctx.accounts.global.create_v2_enabled = enabled;
        Ok(())
    }
    pub fn toggle_mayhem_mode(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global.mayhem_mode_enabled, enabled, PumpError::NotAuthorized);
        ctx.accounts.global.mayhem_mode_enabled = enabled;
        Ok(())
    }
    pub fn toggle_cashback_enabled(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global.is_cashback_enabled, enabled, PumpError::NotAuthorized);
        ctx.accounts.global.is_cashback_enabled = enabled;
        Ok(())
    }
    pub fn set_max_curve_depth(ctx: Context<AdminGlobal>, max_curve_depth: u8) -> Result<()> {
        ctx.accounts.global.max_curve_depth = max_curve_depth;
        Ok(())
    }
}

#[event_cpi]
#[derive(Accounts)]
pub struct AdminGlobal<'info> {
    #[account(mut, seeds = [b"global"], bump, has_one = authority @ PumpError::NotAuthorized)]
    pub global: Account<'info, Global>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
pub struct Global {
    pub initialized: bool,
    pub authority: Pubkey,
    pub fee_recipient: Pubkey,
    pub initial_virtual_token_reserves: u64,
    pub initial_virtual_sol_reserves: u64,
    pub initial_real_token_reserves: u64,
    pub token_total_supply: u64,
    pub fee_basis_points: u64,
    pub withdraw_authority: Pubkey,
    pub enable_migrate: bool,
    pub pool_migration_fee: u64,
    pub creator_fee_basis_points: u64,
    pub fee_recipients: [Pubkey; 7],
    pub set_creator_authority: Pubkey,
    pub admin_set_creator_authority: Pubkey,
    pub create_v2_enabled: bool,
    pub whitelist_pda: Pubkey,
    pub reserved_fee_recipient: Pubkey,
    pub mayhem_mode_enabled: bool,
    pub reserved_fee_recipients: [Pubkey; 7],
    pub is_cashback_enabled: bool,
    pub buyback_fee_recipients: [Pubkey; 8],
    pub buyback_basis_points: u64,
    pub initial_virtual_quote_reserves: u64,
    pub whitelisted_quote_mints: [Pubkey; 1],
    pub creator_fee_configurable: bool,
    pub max_configurable_creator_fee_bps: u64,
    pub holder_reward_claim_authority: Pubkey,
    pub is_holder_reward_enabled: bool,
    pub max_curve_depth: u8,
}

#[error_code]
pub enum PumpError {
    #[msg("The given account is not authorized to execute this instruction.")]
    NotAuthorized,
}
