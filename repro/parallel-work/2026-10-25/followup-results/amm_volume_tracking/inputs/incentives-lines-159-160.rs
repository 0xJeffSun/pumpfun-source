#[derive(Clone)]
pub struct ClaimTokenIncentivesEvent{pub user:Pubkey,pub mint:Pubkey,pub amount:u64,pub timestamp:i64,pub total_claimed_tokens:u64,pub current_sol_volume:u64}
