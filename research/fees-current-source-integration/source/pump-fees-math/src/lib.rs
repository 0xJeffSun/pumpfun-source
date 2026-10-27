use crate::types::{Fees, FeeTier};






















impl Fees {
    #[inline(never)]
    pub fn is_valid(&self) -> bool {

        self.lp_fee_bps + self.protocol_fee_bps + self.creator_fee_bps <= 10_000
    }
}

















#[inline(never)] pub(crate) fn select_fee_tier(tiers: &[FeeTier], cap: u128) -> Fees {
             if cap < tiers[0].market_cap_lamports_threshold { return tiers[0].fees.clone(); }
    for tier in tiers.iter().rev() {
        if cap >= tier.market_cap_lamports_threshold { return tier.fees.clone(); }
    }
    tiers[0].fees.clone()
}
