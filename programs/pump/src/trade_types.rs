use anchor_lang::prelude::*;
#[account]
pub struct BondingCurve {
    pub virtual_token_reserves: u64,
    pub virtual_quote_reserves: u64,
    pub real_token_reserves: u64,
    pub real_quote_reserves: u64,
    pub token_total_supply: u64,
    pub complete: bool,
    pub creator: Pubkey,
    pub is_mayhem_mode: bool,
    pub is_cashback_coin: bool,
    pub quote_mint: Pubkey,
    pub creator_fee_bps: u64,
    pub can_edit_creator_fee: bool,
    pub is_holder_reward: bool,
    pub creator_fee: u64,
    pub protocol_fees: u64,
    pub depth: u8,
    pub initial_virtual_quote_reserves: u64,
    pub post_complete_base_out: u64,
    pub post_complete_quote_in: u64,
}
#[event]
#[derive(Clone)]
pub struct TradeEvent {
    pub mint: Pubkey,
    pub sol_amount: u64,
    pub token_amount: u64,
    pub is_buy: bool,
    pub user: Pubkey,
    pub timestamp: i64,
    pub virtual_sol_reserves: u64,
    pub virtual_token_reserves: u64,
    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,
    pub fee_recipient: Pubkey,
    pub fee_basis_points: u64,
    pub fee: u64,
    pub creator: Pubkey,
    pub creator_fee_basis_points: u64,
    pub creator_fee: u64,
    pub track_volume: bool,
    pub total_unclaimed_tokens: u64,
    pub total_claimed_tokens: u64,
    pub current_sol_volume: u64,
    pub last_update_timestamp: i64,
    pub ix_name: String,
    pub mayhem_mode: bool,
    pub cashback_fee_basis_points: u64,
    pub cashback: u64,
    pub buyback_fee_basis_points: u64,
    pub buyback_fee: u64,
    pub shareholders: Vec<Shareholder>,
    pub quote_mint: Pubkey,
    pub quote_amount: u64,
    pub virtual_quote_reserves: u64,
    pub real_quote_reserves: u64,
    pub holder_rewards_bps: u64,
    pub holder_rewards: u64,
    pub creator_fee_unclaimed: u64,
    pub unparsed_trailing_field: u64,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Shareholder {
    pub address: Pubkey,
    pub share_bps: u16,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct FeeConfig {
    pub bump: u8,
    pub admin: Pubkey,
    pub flat_fees: Fees,
    pub fee_tiers: Vec<FeeTier>,
    pub stable_fee_tiers: Vec<FeeTier>,
    pub exotic_flat_fees: Fees,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct FeeTier {
    pub market_cap_lamports_threshold: u128,
    pub fees: Fees,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Fees {
    pub lp_fee_bps: u64,
    pub protocol_fee_bps: u64,
    pub creator_fee_bps: u64,
}
