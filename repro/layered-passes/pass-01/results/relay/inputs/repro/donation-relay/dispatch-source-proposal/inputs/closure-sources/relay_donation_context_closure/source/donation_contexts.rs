//! Review-only replacement for five declarations; use state types from the integrated proposal.
//! RelayError::NativeMintMismatch must bind to6006, not an added enum ordinal.
//! Manual adapter controls precedence; macro expansion remains unverified.
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken,token_interface::{Mint,TokenAccount,TokenInterface}};
use anchor_lang::solana_program::pubkey;
use super::context_adapters::native_pair;
use super::{EpochTrackerV1,DebouncerV1,MintWhitelistV1,RelayError};
// donate_native_pubkey_config_id_v1: parser byte ranges and call edges in instruction-ledger.json; ordered adapter is authoritative.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: Pubkey, tip_bps: u16, message: String, credited_to: Pubkey)]
pub struct DonateNativePubkeyConfigIdV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 90)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 82)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program, init_if_needed, payer = from)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    // Predicate103: preserve native gate before mint owner equality; see adapter.
    #[account(mut, constraint = native_pair(mint.key().to_bytes(), token_program.key().to_bytes()) @ RelayError::NativeMintMismatch, mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(init, payer = from, seeds = [b"donate_native_wsol_tmp_v1",from.key().as_ref(),token_program.key().as_ref()], bump, token::mint = mint, token::authority = from, token::token_program = token_program)]
    pub temp_wsol_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(seeds = [b"mint_whitelist_v1"], bump = mint_whitelist.bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_native_v1: parser byte ranges and call edges in instruction-ledger.json; ordered adapter is authoritative.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: [u8;32], tip_bps: u16, message: String, credited_to: Pubkey)]
pub struct DonateNativeV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 90)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 82)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program, init_if_needed, payer = from)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    // Predicate103: preserve native gate before mint owner equality; see adapter.
    #[account(mut, constraint = native_pair(mint.key().to_bytes(), token_program.key().to_bytes()) @ RelayError::NativeMintMismatch, mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(init, payer = from, seeds = [b"donate_native_wsol_tmp_v1",from.key().as_ref(),token_program.key().as_ref()], bump, token::mint = mint, token::authority = from, token::token_program = token_program)]
    pub temp_wsol_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(seeds = [b"mint_whitelist_v1"], bump = mint_whitelist.bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_pubkey_config_id_v1: parser byte ranges and call edges in instruction-ledger.json; ordered adapter is authoritative.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: Pubkey, tip_bps: u16, message: String, credited_to: Pubkey)]
pub struct DonatePubkeyConfigIdV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 90)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 82)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program, init_if_needed, payer = from)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = from, associated_token::token_program = token_program)]
    pub from_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(seeds = [b"mint_whitelist_v1"], bump = mint_whitelist.bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_pubkey_config_id_with_payer_v1: parser byte ranges and call edges in instruction-ledger.json; ordered adapter is authoritative.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: Pubkey, tip_bps: u16, message: String, credited_to: Pubkey)]
pub struct DonatePubkeyConfigIdWithPayerV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = payer, space = 90)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = payer, space = 82)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program, init_if_needed, payer = payer)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = from, associated_token::token_program = token_program)]
    pub from_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(seeds = [b"mint_whitelist_v1"], bump = mint_whitelist.bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_v1: parser byte ranges and call edges in instruction-ledger.json; ordered adapter is authoritative.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: [u8;32], tip_bps: u16, message: String, credited_to: Pubkey)]
pub struct DonateV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 90)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 82)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program, init_if_needed, payer = from)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = from, associated_token::token_program = token_program)]
    pub from_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(seeds = [b"mint_whitelist_v1"], bump = mint_whitelist.bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

