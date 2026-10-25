//! Bounded reconstruction of a Pump handler. Validation uses a synthetic local
//! Mayhem-ID CPI caller; no deployed Mayhem invocation path is established.
use crate::{create_v2::MAYHEM_ID, trade_types::BondingCurve, Global, PumpError};
use anchor_lang::prelude::*;
use anchor_spl::{token_2022::Token2022,
                 token_interface::{Mint, TokenAccount}};
use std::{io::Write, ops::{Deref, DerefMut}};

// The target converts a malformed curve discriminator to InvalidAccountData,
// whereas Anchor's generated parser emits AccountDiscriminatorMismatch (3002).
// Keep the same typed owner/exit handling while matching that observed parser edge.
#[derive(Clone)]
pub struct MayhemCurve(pub BondingCurve);
impl AccountDeserialize for MayhemCurve {
    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {
        BondingCurve::try_deserialize(buf).map(Self).map_err(|_| {
            anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into()
        })
    }
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        BondingCurve::try_deserialize_unchecked(buf).map(Self).map_err(|_| {
            anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into()
        })
    }
}
impl AccountSerialize for MayhemCurve {
    fn try_serialize<W: Write>(&self, writer: &mut W) -> Result<()> { self.0.try_serialize(writer) }
}
impl Owner for MayhemCurve {
    fn owner() -> Pubkey { crate::ID }
}
impl Deref for MayhemCurve {
    type Target = BondingCurve;
    fn deref(&self) -> &BondingCurve { &self.0 }
}
impl DerefMut for MayhemCurve {
    fn deref_mut(&mut self) -> &mut BondingCurve { &mut self.0 }
}

#[event_cpi]
#[derive(Accounts)]
pub struct SetMayhemVirtualParams<'info> {
    /// CHECK: the account must be Mayhem's sol-vault PDA and must sign the CPI.
    #[account(mut, signer, seeds = [b"sol-vault"], bump, seeds::program = MAYHEM_ID)]
    pub sol_vault_authority: UncheckedAccount<'info>,
    #[account(mut, associated_token::mint = mint,
        associated_token::authority = sol_vault_authority,
        associated_token::token_program = token_program)]
    pub mayhem_token_vault: InterfaceAccount<'info, TokenAccount>,
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(seeds = [b"global"], bump)]
    pub global: Box<Account<'info, Global>>,
    #[account(mut, seeds = [b"bonding-curve", mint.key().as_ref()], bump)]
    pub bonding_curve: Box<Account<'info, MayhemCurve>>,
    pub token_program: Program<'info, Token2022>,
}

#[event]
#[derive(Clone)]
pub struct UpdateMayhemVirtualParamsEvent {
    pub timestamp: i64,
    pub mint: Pubkey,
    pub virtual_token_reserves: u64,
    pub virtual_sol_reserves: u64,
    pub new_virtual_token_reserves: u64,
    pub new_virtual_sol_reserves: u64,
    pub real_token_reserves: u64,
    pub real_sol_reserves: u64,
}

pub fn execute(ctx: Context<SetMayhemVirtualParams>) -> Result<()> {
    let curve = &mut ctx.accounts.bonding_curve;
    let old_virtual_token_reserves = curve.virtual_token_reserves;
    let old_virtual_quote_reserves = curve.virtual_quote_reserves;
    if !curve.complete && curve.is_mayhem_mode {
        let d = curve.token_total_supply
            .checked_mul(2).ok_or_else(|| error!(PumpError::Overflow))?
            .checked_sub(ctx.accounts.global.initial_real_token_reserves)
            .ok_or_else(|| error!(PumpError::Overflow))?
            .checked_sub(ctx.accounts.mayhem_token_vault.amount)
            .ok_or_else(|| error!(PumpError::Overflow))?;
        let is_sol = curve.quote_mint == Pubkey::default();
        let min_real = if is_sol { 10_000_000 } else { 1_000_000 };
        if curve.real_quote_reserves >= min_real && d >= 1_000_000_000_000 {
            let numerator = (u128::from(d) + u128::from(curve.virtual_token_reserves))
                .checked_mul(u128::from(curve.real_quote_reserves))
                .ok_or_else(|| error!(PumpError::Overflow))?;
            let quotient = numerator.checked_div(u128::from(d))
                .ok_or_else(|| error!(PumpError::Overflow))?;
            let as_u64 = u64::try_from(quotient).map_err(|_| {
                anchor_lang::error::Error::from(anchor_lang::solana_program::program_error::ProgramError::Custom(4102))
            })?;
            let cap = if is_sol { 2_000_000_000_000 } else { 160_000_000_000 };
            curve.virtual_quote_reserves = as_u64.min(cap);
        }
    }
    let event = UpdateMayhemVirtualParamsEvent {
        timestamp: Clock::get()?.unix_timestamp,
        mint: ctx.accounts.mint.key(),
        virtual_token_reserves: old_virtual_token_reserves,
        virtual_sol_reserves: old_virtual_quote_reserves,
        new_virtual_token_reserves: curve.virtual_token_reserves,
        new_virtual_sol_reserves: curve.virtual_quote_reserves,
        real_token_reserves: curve.real_token_reserves,
        real_sol_reserves: curve.real_quote_reserves,
    };
    emit!(event.clone());
    emit_cpi!(event);
    Ok(())
}
