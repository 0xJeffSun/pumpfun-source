use anchor_spl::{associated_token::AssociatedToken,token_interface::{Mint,TokenAccount,TokenInterface}};
include!("state/v1/epoch_tracker.rs");
include!("state/v1/debouncer.rs");
include!("instructions/v1/public_api/donate/donate.rs");
include!("instructions/v1/public_api/donate/donate_pubkey_config_id.rs");
include!("instructions/v1/public_api/donate/donate_pubkey_config_id_with_payer.rs");
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub enum DaasEventDiscriminator {DonationV1,DonationEpochClosedV1,DonationEpochProcessedV1,DonationEpochJustSwappedV1}
include!("events/v1/donation_made.rs");




pub use crate::tools::checks::{native_program_supported,native_mint_pair};










include!("instructions/v1/public_api/donate/donate_native.rs");
include!("instructions/v1/public_api/donate/donate_native_pubkey_config_id.rs");


include!("state/v1/distribution.rs");
include!("instructions/v1/relayer_only/close_donation_epoch.rs");
include!("events/v1/donation_epoch_closed.rs");


include!("state/v1/swap_receipt.rs");
include!("instructions/v1/relayer_only/distribute/just_swap.rs");
include!("events/v1/donation_epoch_just_swapped.rs");


pub use crate::codec::wire::{Share,ShareType};
include!("instructions/v1/relayer_only/distribute/distribute_after_just_swapping.rs");
include!("instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rs");
#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct Receipt {pub share_type:ShareType,pub address:Pubkey,pub amount:u64,pub bps:u16}
include!("events/v1/donation_epoch_processed.rs");


include!("instructions/v1/relayer_only/distribute/swap_then_distribute.rs");
