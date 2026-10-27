use anchor_lang::prelude::*;
pub const ID: Pubkey = pubkey!("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");





#[account("account")]
#[derive(Copy,Default)]
pub struct BondingCurve {
 pub virtual_token_reserves:u64,pub virtual_sol_reserves:u64,
 pub real_token_reserves:u64,pub real_sol_reserves:u64,
 pub token_total_supply:u64,pub complete:bool,pub creator:Pubkey,
 pub is_mayhem_mode:bool,pub is_cashback_coin:bool,pub quote_mint:Pubkey,
 pub creator_fee_bps:u64,pub can_edit_creator_fee:bool,pub is_holder_reward:bool,
 pub creator_fee:u64,pub protocol_fees:u64,
}
impl Owner for BondingCurve {fn owner()->Pubkey {ID}}
