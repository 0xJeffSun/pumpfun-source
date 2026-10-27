use anchor_spl::{associated_token::AssociatedToken,token_interface::{Mint,TokenAccount,TokenInterface}};
pub use crate::codec::wire::{Share,ShareType};
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub enum DaasEventDiscriminator {DonationV1,DonationEpochClosedV1,DonationEpochProcessedV1,DonationEpochJustSwappedV1}
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct Receipt {pub share_type:ShareType,pub address:Pubkey,pub amount:u64,pub bps:u16}
include!("anchor_helpers.rs");
include!("events/v1/donation_epoch_closed.rs");
include!("events/v1/donation_epoch_just_swapped.rs");
include!("events/v1/donation_epoch_processed.rs");
include!("events/v1/donation_made.rs");
include!("instructions/v1/public_api/donate/donate.rs");
include!("instructions/v1/public_api/donate/donate_native.rs");
include!("instructions/v1/public_api/donate/donate_native_pubkey_config_id.rs");
include!("instructions/v1/public_api/donate/donate_pubkey_config_id.rs");
include!("instructions/v1/public_api/donate/donate_pubkey_config_id_with_payer.rs");
include!("instructions/v1/relayer_only/close_donation_epoch.rs");
include!("instructions/v1/relayer_only/distribute/distribute_after_just_swapping.rs");
include!("instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rs");
include!("instructions/v1/relayer_only/distribute/just_swap.rs");
include!("instructions/v1/relayer_only/distribute/swap_then_distribute.rs");
include!("instructions/v1/relayer_only/upsert_mint_whitelist.rs");
include!("state/v1/debouncer.rs");
include!("state/v1/distribution.rs");
include!("state/v1/epoch_tracker.rs");
include!("state/v1/mint_whitelist.rs");
include!("state/v1/swap_receipt.rs");
