// Uncompiled Anchor-style declaration hypothesis. Names/types are chosen from IDL;
// generated instruction ordering, diagnostics and dependency versions are NOT claimed.
// Use with corresponding Anchor account structs defined by the retained IDL.
// See REPORT for the exact parser schedule, which takes precedence over macro guesses.
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface}};

#[derive(Accounts)]
pub struct UpsertMintWhitelistV1<'info> {
    #[account(init_if_needed, payer = signer, space = 1037,
        seeds = [b"mint_whitelist_v1"], bump)]
    pub mint_whitelist: Account<'info, MintWhitelistV1>,
    #[account(mut, address = RELAYER)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[event_cpi]
#[derive(Accounts)]
#[instruction(config_id: [u8;32], epoch: u128)]
pub struct CloseDonationEpochV1<'info> {
    #[account(init, payer = signer, space = 98,
        seeds = [b"distribution_v1", config_id.as_ref(), mint.key().as_ref(),
                 &epoch.to_le_bytes()], bump)]
    pub distribution: Account<'info, DistributionV1>,
    #[account(init, payer = signer,
        associated_token::mint = mint, associated_token::authority = distribution,
        associated_token::token_program = token_program)]
    pub distribution_token_account: InterfaceAccount<'info, TokenAccount>,
    #[account(mut, seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()],
        bump = epoch_tracker.bump)]
    pub epoch_tracker: Account<'info, EpochTrackerV1>,
    #[account(mut, seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()],
        bump = debouncer.bump)]
    pub debouncer: Account<'info, DebouncerV1>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = debouncer,
        associated_token::token_program = token_program)]
    pub debouncer_token_account: InterfaceAccount<'info, TokenAccount>,
    #[account(mut, address = debouncer.mint, mint::token_program = token_program)]
    pub mint: Box<InterfaceAccount<'info, Mint>>,
    pub token_program: Interface<'info, TokenInterface>,
    #[account(mut, address = RELAYER)]
    pub signer: Signer<'info>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    // event_cpi adds event_authority PDA and an unchecked program AccountInfo.
}
// RELAYER and all Account types above must be supplied from the retained IDL.
// A historical macro source/version/layout match has not been established.
// In particular do not add has_one=config_id, state==Initialized, an epoch bound,
// balance==recorded_amount, or a distribution-state guard without new evidence.
