//! Partial independently compiled Mayhem implementation: twelve recovered admin
//! handlers. Unknown fields are preserved as byte arrays, not guessed names.
//! This is not a complete or byte-identical program reconstruction.
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token_interface::{Mint, TokenAccount, TokenInterface}};

declare_id!("MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e");

#[program]
pub mod mayhem_recovered {
    use super::*;
    pub fn initialize_fee_recipient(ctx: Context<InitializeFeeRecipient>, index: u8) -> Result<()> {
        require!(index < 8, MayhemError::MaxFeeRecipientsExceeded);
        ctx.accounts.fee_recipient.bump = ctx.bumps.fee_recipient;
        ctx.accounts.fee_recipient.index = index;
        Ok(())
    }
    pub fn initialize_global_params(ctx: Context<InitializeGlobalParams>) -> Result<()> {
        ctx.accounts.global_params.admin = ctx.accounts.admin.key();
        Ok(())
    }
    pub fn update_global_params(ctx: Context<Admin>, args: UpdateGlobalParamsArgs) -> Result<()> {
        let state = &mut ctx.accounts.global_params;
        if let Some(v) = args.field_0 { state.reset_prefix[0..4].copy_from_slice(&v.to_le_bytes()); }
        if let Some(v) = args.field_1 { state.reset_prefix[4..8].copy_from_slice(&v.to_le_bytes()); }
        for (value, offset) in [(args.field_2, 8), (args.field_3, 16), (args.field_4, 24), (args.field_5, 32)] {
            if let Some(v) = value { state.reset_prefix[offset..offset+8].copy_from_slice(&v.to_le_bytes()); }
        }
        if let Some(v) = args.field_6 { state.reset_middle[0] = v; }
        if let Some(v) = args.field_7 { state.reset_middle[9..17].copy_from_slice(&v.to_le_bytes()); }
        if let Some(v) = args.field_8 { state.reset_middle[17..25].copy_from_slice(&v.to_le_bytes()); }
        if let Some(v) = args.field_9 { state.preserved_middle_a.copy_from_slice(&v.to_le_bytes()); }
        if let Some(v) = args.field_10 { state.field_10 = v; }
        for (value, offset) in [(args.field_11, 0), (args.field_12, 8), (args.field_13, 16)] {
            if let Some(v) = value { state.reset_stable_prefix[offset..offset+8].copy_from_slice(&v.to_le_bytes()); }
        }
        if let Some(v) = args.field_14 { state.reset_stable_suffix[0..8].copy_from_slice(&v.to_le_bytes()); }
        if let Some(v) = args.field_15 { state.reset_stable_suffix[8..16].copy_from_slice(&v.to_le_bytes()); }
        let old_version = state.version;
        state.version = state.version.checked_add(1).ok_or(MayhemError::MathOverflow)?;
        let event = GlobalParamsUpdateEvent {
            old_version, new_version: state.version,
            field_0: u32::from_le_bytes(state.reset_prefix[0..4].try_into().unwrap()),
            field_1: u32::from_le_bytes(state.reset_prefix[4..8].try_into().unwrap()),
            field_2: u64::from_le_bytes(state.reset_prefix[8..16].try_into().unwrap()),
            field_3: u64::from_le_bytes(state.reset_prefix[16..24].try_into().unwrap()),
            field_4: u64::from_le_bytes(state.reset_prefix[24..32].try_into().unwrap()),
            field_5: u64::from_le_bytes(state.reset_prefix[32..40].try_into().unwrap()),
            field_6: state.reset_middle[0],
            field_7: u64::from_le_bytes(state.reset_middle[9..17].try_into().unwrap()),
            field_8: u64::from_le_bytes(state.reset_middle[17..25].try_into().unwrap()),
            field_9: u64::from_le_bytes(state.preserved_middle_a),
            field_10: state.field_10,
            field_11: u64::from_le_bytes(state.reset_stable_prefix[0..8].try_into().unwrap()),
            field_12: u64::from_le_bytes(state.reset_stable_prefix[8..16].try_into().unwrap()),
            field_13: u64::from_le_bytes(state.reset_stable_prefix[16..24].try_into().unwrap()),
            field_14: u64::from_le_bytes(state.reset_stable_suffix[0..8].try_into().unwrap()),
            field_15: u64::from_le_bytes(state.reset_stable_suffix[8..16].try_into().unwrap()),
        };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }
    pub fn update_admin(ctx: Context<Admin>, new_admin: Pubkey) -> Result<()> {
        ctx.accounts.global_params.admin = new_admin;
        Ok(())
    }
    pub fn update_trader(ctx: Context<Admin>, new_trader: Pubkey) -> Result<()> {
        ctx.accounts.global_params.trader = new_trader;
        Ok(())
    }
    pub fn update_max_sol_per_sweep(ctx: Context<Admin>, value: u64) -> Result<()> {
        ctx.accounts.global_params.max_sol_per_sweep = value;
        Ok(())
    }
    pub fn update_max_stable_per_sweep(ctx: Context<Admin>, value: u64) -> Result<()> {
        ctx.accounts.global_params.max_stable_per_sweep = value;
        Ok(())
    }
    pub fn reset_sol_deployed(ctx: Context<Admin>) -> Result<()> {
        ctx.accounts.global_params.sol_deployed = 0;
        Ok(())
    }
    pub fn reset_stable_deployed(ctx: Context<Admin>) -> Result<()> {
        ctx.accounts.global_params.stable_deployed = 0;
        Ok(())
    }
    pub fn reset_state(ctx: Context<Admin>) -> Result<()> {
        let state = &mut ctx.accounts.global_params;
        state.reset_prefix = [0; 40];
        state.paused = false;
        state.sol_deployed = 0;
        state.reset_middle = [0; 25];
        state.reset_stable_prefix = [0; 24];
        state.stable_deployed = 0;
        state.reset_stable_suffix = [0; 24];
        Ok(())
    }
    pub fn stop_trading(ctx: Context<Admin>) -> Result<()> {
        require_eq!(ctx.accounts.global_params.paused, false, MayhemError::TradingPaused);
        ctx.accounts.global_params.paused = true;
        Ok(())
    }
    pub fn resume_trading(ctx: Context<Admin>) -> Result<()> {
        // The original also uses 6000/TradingPaused when already active.
        require_eq!(ctx.accounts.global_params.paused, true, MayhemError::TradingPaused);
        ctx.accounts.global_params.paused = false;
        Ok(())
    }
}

#[event_cpi]
#[derive(Accounts)]
pub struct Admin<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(mut, seeds = [b"global-params"], bump, has_one = admin)]
    pub global_params: Account<'info, GlobalParams>,
    pub system_program: Program<'info, System>,
}

/// Exact observed Borsh positions; opaque bytes remain named by behavior.
/// This is not an assertion of historical field names or Rust memory layout.
#[account]
pub struct GlobalParams {
    pub reset_prefix: [u8; 40], // serialized offset 8
    pub paused: bool, // 48
    pub admin: Pubkey, // 49
    pub trader: Pubkey, // 81
    pub sol_deployed: i128, // 113
    pub preserved_middle_a: [u8; 8], // 129
    pub reset_middle: [u8; 25], // 137
    pub version: u32, // 162, incremented by update_global_params
    pub field_10: u64, // 166
    pub max_sol_per_sweep: u64, // 174
    pub reset_stable_prefix: [u8; 24], // 182
    pub stable_deployed: i128, // 206
    pub reset_stable_suffix: [u8; 24], // 222
    pub max_stable_per_sweep: u64, // 246
}

#[error_code]
pub enum MayhemError {
    #[msg("Trading is paused")]
    TradingPaused,
    #[msg("Trading is active")]
    TradingActive,
    #[msg("Math overflow")]
    MathOverflow,
    #[msg("Only 8 fee recipients supported")]
    MaxFeeRecipientsExceeded = 17,
}

/// Recovered serialized widths/order. Semantic names remain unresolved.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateGlobalParamsArgs {
    pub field_0: Option<u32>,
    pub field_1: Option<u32>,
    pub field_2: Option<u64>,
    pub field_3: Option<u64>,
    pub field_4: Option<u64>,
    pub field_5: Option<u64>,
    pub field_6: Option<u8>,
    pub field_7: Option<u64>,
    pub field_8: Option<u64>,
    pub field_9: Option<u64>,
    pub field_10: Option<u64>,
    pub field_11: Option<u64>,
    pub field_12: Option<u64>,
    pub field_13: Option<u64>,
    pub field_14: Option<u64>,
    pub field_15: Option<u64>,
}

// The discriminator is observed from original emitted data. Historical event
// type name remains unresolved; overriding it avoids pretending to know it.
#[event(discriminator = [0x63,0xa7,0x5c,0x98,0x98,0xe3,0x26,0x29])]
pub struct GlobalParamsUpdateEvent {
    pub old_version: u32,
    pub new_version: u32,
    pub field_0: u32,
    pub field_1: u32,
    pub field_2: u64,
    pub field_3: u64,
    pub field_4: u64,
    pub field_5: u64,
    pub field_6: u8,
    pub field_7: u64,
    pub field_8: u64,
    pub field_9: u64,
    pub field_10: u64,
    pub field_11: u64,
    pub field_12: u64,
    pub field_13: u64,
    pub field_14: u64,
    pub field_15: u64,
}

#[derive(Accounts)]
pub struct InitializeGlobalParams<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(init, payer = admin, space = 254, seeds = [b"global-params"], bump)]
    pub global_params: Account<'info, GlobalParams>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct FeeRecipient {
    pub bump: u8,
    pub index: u8,
    pub opaque: [u8; 32],
}

#[derive(Accounts)]
#[instruction(index: u8)]
pub struct InitializeFeeRecipient<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(address = anchor_spl::token::spl_token::native_mint::ID)]
    pub wsol_mint: InterfaceAccount<'info, Mint>,
    #[account(init, payer = admin, space = 42, seeds = [b"fee-recipient".as_ref(), &[index]], bump)]
    pub fee_recipient: Account<'info, FeeRecipient>,
    #[account(init, payer = admin, associated_token::mint = wsol_mint, associated_token::authority = fee_recipient, associated_token::token_program = token_program)]
    pub fee_recipient_ata: InterfaceAccount<'info, TokenAccount>,
    #[account(mut, seeds = [b"global-params"], bump)]
    pub global_params: Account<'info, GlobalParams>,
    pub system_program: Program<'info, System>,
    #[account(address = anchor_spl::token::ID)]
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
