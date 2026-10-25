//! Uncompiled Anchor declaration hypothesis; NOT wired into lib.rs.
//! Constraints supported by actual parser studies, with unresolved macro/init ordering.
//! These declarations do not discharge parse_context or account_exit gaps.
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token_interface::{Mint,TokenAccount,TokenInterface}};
use anchor_lang::solana_program::pubkey;
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub enum DaasEventDiscriminator { DonationV1, DonationEpochClosedV1, DonationEpochProcessedV1, DonationEpochJustSwappedV1 }
#[account]
pub struct DebouncerV1 { pub bump: u8, pub state: DebouncerV1State, pub config_id: [u8;32], pub mint: Pubkey, pub total_amount: u64 }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub enum DebouncerV1State { Uninitialized, Initialized }
#[account]
pub struct DistributionV1 { pub bump: u8, pub state: DistributionV1State, pub config_id: [u8;32], pub mint: Pubkey, pub epoch: u128, pub total_amount: u64 }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub enum DistributionV1State { Uninitialized, Initialized }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct DonationEpochClosedV1Event { pub daas_event_discriminator: DaasEventDiscriminator, pub config_id: [u8;32], pub mint: Pubkey, pub epoch: u128, pub gross_epoch_amount: u64 }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct DonationEpochJustSwappedV1Event { pub daas_event_discriminator: DaasEventDiscriminator, pub config_id: [u8;32], pub mint: Pubkey, pub epoch: u128, pub distribution: Pubkey, pub swap_receipt: Pubkey, pub output_token_account: Pubkey, pub swap_output_amount: u64, pub settlement_mint: Pubkey }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct DonationEpochProcessedV1Event { pub daas_event_discriminator: DaasEventDiscriminator, pub config_id: [u8;32], pub mint: Pubkey, pub epoch: u128, pub settled_amount: u64, pub settlement_mint: Pubkey, pub transfers: Vec<Receipt> }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct DonationMadeV1Event { pub daas_event_discriminator: DaasEventDiscriminator, pub config_id: [u8;32], pub mint: Pubkey, pub epoch: u128, pub gross_amount: u64, pub tip: u64, pub message: String, pub credited_to: Pubkey }
#[account]
pub struct EpochTrackerV1 { pub bump: u8, pub state: EpochTrackerV1State, pub config_id: [u8;32], pub mint: Pubkey, pub current_epoch: u128 }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub enum EpochTrackerV1State { Uninitialized, Initialized }
#[account]
pub struct MintWhitelistV1 { pub bump: u8, pub mints: Vec<Pubkey> }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct Receipt { pub share_type: ShareType, pub address: Pubkey, pub amount: u64, pub bps: u16 }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct Share { pub share_type: ShareType, pub address: Pubkey, pub bps: u16 }
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub enum ShareType { Beneficiary, Fee, Tip }
#[account]
pub struct SwapReceiptV1 { pub bump: u8, pub distribution: Pubkey, pub swap_output_amount: u64 }

// close_donation_epoch_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
#[instruction(config_id: [u8;32], epoch: u128)]
pub struct CloseDonationEpochV1<'info> {
    #[account(init, payer = signer, space = 98, seeds = [b"distribution_v1",config_id.as_ref(),mint.key().as_ref(),&epoch.to_le_bytes()], bump)]
    pub distribution: Account<'info,DistributionV1>,
    #[account(associated_token::mint = mint, associated_token::authority = distribution, associated_token::token_program = token_program, init, payer = signer)]
    pub distribution_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump = epoch_tracker.bump)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(mut, seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump = debouncer.bump)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, mint::token_program = token_program, address = debouncer.mint)]
    pub mint: InterfaceAccount<'info,Mint>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(mut, address = pubkey!("RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc"))]
    pub signer: Signer<'info>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// distribute_after_just_swapping_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
pub struct DistributeAfterJustSwappingV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", distribution.config_id.as_ref(), distribution.mint.as_ref()], bump = epoch_tracker.bump)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", distribution.config_id.as_ref(), distribution.mint.as_ref()], bump = debouncer.bump)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(mut, seeds = [b"distribution_v1",distribution.config_id.as_ref(),distribution.mint.as_ref(),&distribution.epoch.to_le_bytes()], bump = distribution.bump, close = signer)]
    pub distribution: Account<'info,DistributionV1>,
    #[account(mut, seeds = [b"swap_receipt_v1",distribution.key().as_ref()], bump = swap_receipt.bump, constraint = swap_receipt.distribution == distribution.key() @ RelayError::SwapReceiptMismatch, close = signer)]
    pub swap_receipt: Account<'info,SwapReceiptV1>,
    #[account(mut, associated_token::mint = output_mint, associated_token::authority = distribution, associated_token::token_program = output_mint_program)]
    pub output_distribution_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, address = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), mint::token_program = output_mint_program)]
    pub output_mint: InterfaceAccount<'info,Mint>,
    pub output_mint_program: Interface<'info,TokenInterface>,
    #[account(mut, address = pubkey!("RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc"))]
    pub signer: Signer<'info>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// distribute_non_swap_output_mint_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
pub struct DistributeNonSwapOutputMintV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", distribution.config_id.as_ref(), mint.key().as_ref()], bump = epoch_tracker.bump)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", distribution.config_id.as_ref(), mint.key().as_ref()], bump = debouncer.bump)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(mut, seeds = [b"distribution_v1",distribution.config_id.as_ref(),distribution.mint.as_ref(),&distribution.epoch.to_le_bytes()], bump = distribution.bump, close = signer)]
    pub distribution: Account<'info,DistributionV1>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = distribution, associated_token::token_program = token_program)]
    pub distribution_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, address = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(mut, address = pubkey!("RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc"))]
    pub signer: Signer<'info>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_native_pubkey_config_id_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: Pubkey)]
pub struct DonateNativePubkeyConfigIdV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 90)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 82)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program, init_if_needed, payer = from)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    // Native mint/program predicate103 (6006) remains explicit parse_context gap.
    #[account(mut, mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(init, payer = from, seeds = [b"donate_native_wsol_tmp_v1",from.key().as_ref(),token_program.key().as_ref()], bump, token::mint = mint, token::authority = from, token::token_program = token_program)]
    pub temp_wsol_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(seeds = [b"mint_whitelist_v1"], bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_native_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: [u8;32])]
pub struct DonateNativeV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 90)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", config_id.as_ref(), mint.key().as_ref()], bump, init_if_needed, payer = from, space = 82)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(associated_token::mint = mint, associated_token::authority = debouncer, associated_token::token_program = token_program, init_if_needed, payer = from)]
    pub debouncer_token_account: InterfaceAccount<'info,TokenAccount>,
    // Native mint/program predicate103 (6006) remains explicit parse_context gap.
    #[account(mut, mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(init, payer = from, seeds = [b"donate_native_wsol_tmp_v1",from.key().as_ref(),token_program.key().as_ref()], bump, token::mint = mint, token::authority = from, token::token_program = token_program)]
    pub temp_wsol_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(seeds = [b"mint_whitelist_v1"], bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_pubkey_config_id_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: Pubkey)]
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
    #[account(seeds = [b"mint_whitelist_v1"], bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_pubkey_config_id_with_payer_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: Pubkey)]
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
    #[account(seeds = [b"mint_whitelist_v1"], bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// donate_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
#[instruction(amount: u64, config_id: [u8;32])]
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
    #[account(seeds = [b"mint_whitelist_v1"], bump)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// just_swap_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
pub struct JustSwapV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", distribution.config_id.as_ref(), distribution.mint.as_ref()], bump = epoch_tracker.bump)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", distribution.config_id.as_ref(), distribution.mint.as_ref()], bump = debouncer.bump)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(mut, seeds = [b"distribution_v1",distribution.config_id.as_ref(),distribution.mint.as_ref(),&distribution.epoch.to_le_bytes()], bump = distribution.bump)]
    pub distribution: Account<'info,DistributionV1>,
    // INCOMPLETE: parser150 -> constructor151 creates receipt49 before body.
    // Exact init mode/transitive errors unresolved; no invented init_if_needed.
    #[account(mut, seeds = [b"swap_receipt_v1",distribution.key().as_ref()], bump)]
    pub swap_receipt: Account<'info,SwapReceiptV1>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = distribution, associated_token::token_program = token_program)]
    pub distribution_token_account: InterfaceAccount<'info,TokenAccount>,
    // INCOMPLETE: constructor152 output ATA creation/existing-account policy.
    // No guessed init attribute; full parser remains disabled.
    #[account(mut, associated_token::mint = output_mint, associated_token::authority = distribution, associated_token::token_program = output_mint_program)]
    pub output_distribution_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, mint::token_program = token_program, address = distribution.mint)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(mut, address = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), mint::token_program = output_mint_program)]
    pub output_mint: InterfaceAccount<'info,Mint>,
    pub output_mint_program: Interface<'info,TokenInterface>,
    #[account(mut, address = pubkey!("RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc"))]
    pub signer: Signer<'info>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"))]
    /// Address constrained by parser; executable policy is not invented.
    pub jupiter_program: AccountInfo<'info>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// swap_then_distribute_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[event_cpi]
#[derive(Accounts)]
pub struct SwapThenDistributeV1<'info> {
    #[account(seeds = [b"epoch_tracker_v1", distribution.config_id.as_ref(), distribution.mint.as_ref()], bump = epoch_tracker.bump)]
    pub epoch_tracker: Account<'info,EpochTrackerV1>,
    #[account(seeds = [b"debouncer_v1", distribution.config_id.as_ref(), distribution.mint.as_ref()], bump = debouncer.bump)]
    pub debouncer: Account<'info,DebouncerV1>,
    #[account(mut, seeds = [b"distribution_v1",distribution.config_id.as_ref(),distribution.mint.as_ref(),&distribution.epoch.to_le_bytes()], bump = distribution.bump, close = signer)]
    pub distribution: Account<'info,DistributionV1>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = distribution, associated_token::token_program = token_program)]
    pub distribution_token_account: InterfaceAccount<'info,TokenAccount>,
    // INCOMPLETE: constructor152 output ATA creation/existing-account policy.
    // No guessed init attribute; full parser remains disabled.
    #[account(mut, associated_token::mint = output_mint, associated_token::authority = distribution, associated_token::token_program = output_mint_program)]
    pub output_distribution_token_account: InterfaceAccount<'info,TokenAccount>,
    #[account(mut, mint::token_program = token_program, address = distribution.mint)]
    pub mint: InterfaceAccount<'info,Mint>,
    #[account(mut, address = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), mint::token_program = output_mint_program)]
    pub output_mint: InterfaceAccount<'info,Mint>,
    pub output_mint_program: Interface<'info,TokenInterface>,
    #[account(mut, address = pubkey!("RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc"))]
    pub signer: Signer<'info>,
    pub token_program: Interface<'info,TokenInterface>,
    #[account(address = pubkey!("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"))]
    /// Address constrained by parser; executable policy is not invented.
    pub jupiter_program: AccountInfo<'info>,
    #[account(address = pubkey!("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"))]
    pub associated_token_program: Program<'info,AssociatedToken>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}

// upsert_mint_whitelist_v1: parser ordinal/ranges and unimplemented branches in instruction-ledger.json.
#[derive(Accounts)]
pub struct UpsertMintWhitelistV1<'info> {
    #[account(seeds = [b"mint_whitelist_v1"], bump, init_if_needed, payer = signer, space = 1037)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(mut, address = pubkey!("RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc"))]
    pub signer: Signer<'info>,
    #[account(address = pubkey!("11111111111111111111111111111111"))]
    pub system_program: Program<'info,System>,
}
#[error_code]
pub enum RelayError {
    #[msg("Swap receipt does not match this distribution")]
    SwapReceiptMismatch = 33,
}
