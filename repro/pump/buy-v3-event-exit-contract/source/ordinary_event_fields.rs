// Source-only ordinary event field contract. Not a complete BuyV3 body.
// Host imports: BuyV3, TradeEvent, Pubkey and the fixed fee_selection::FeeTuple.
// Preconditions: genuine admitted context, ordinary mode, settlement success;
// timestamp is obtained once at the event boundary, not before settlement.
// All adjustments below must come from their actual upstream producers.
pub struct OrdinaryEventInputs<'a> {
    pub first_base: u64,
    pub first_quote: u64,
    pub first_fees: &'a fee_selection::FeeTuple,
    pub timestamp: i64,
    pub adapted_first_buyback: u64,
    pub trailing_cost_adjustment: u64,
}

fn ordinary_trade_event(a: &BuyV3<'_>, i: OrdinaryEventInputs<'_>) -> TradeEvent {
    let curve = &a.bonding_curve;
    let volume = &a.user_volume_accumulator;
    // Native masking is determined by the stored curve quote key.
    let native = curve.quote_mint == Pubkey::default();
    TradeEvent {
        mint: a.base_mint.key(),
        sol_amount: if native { i.first_quote } else { 0 },
        token_amount: i.first_base,
        is_buy: true,
        user: a.user.key(),
        timestamp: i.timestamp,
        virtual_sol_reserves: if native { curve.virtual_quote_reserves } else { 0 },
        virtual_token_reserves: curve.virtual_token_reserves,
        real_sol_reserves: if native { curve.real_quote_reserves } else { 0 },
        real_token_reserves: curve.real_token_reserves,
        fee_recipient: Pubkey::default(),
        fee_basis_points: i.first_fees.protocol_fee_bps,
        fee: i.first_fees.protocol_amount,
        creator: curve.creator,
        creator_fee_basis_points: i.first_fees.creator_fee_bps,
        creator_fee: i.first_fees.creator_amount,
        track_volume: false,
        total_unclaimed_tokens: volume.total_unclaimed_tokens,
        total_claimed_tokens: volume.total_claimed_tokens,
        current_sol_volume: volume.current_sol_volume,
        last_update_timestamp: volume.last_update_timestamp,
        ix_name: "buy".into(),
        mayhem_mode: curve.is_mayhem_mode,
        cashback_fee_basis_points: 0,
        cashback: 0,
        // Ordinary mode precondition; no alternate-mode implementation here.
        buyback_fee_basis_points: a.global.buyback_basis_points,
        buyback_fee: i.adapted_first_buyback,
        shareholders: vec![],
        quote_mint: curve.quote_mint,
        quote_amount: i.first_quote,
        virtual_quote_reserves: curve.virtual_quote_reserves,
        real_quote_reserves: curve.real_quote_reserves,
        holder_rewards_bps: if curve.is_holder_reward { i.first_fees.creator_fee_bps } else { 0 },
        holder_rewards: if curve.is_holder_reward { i.first_fees.creator_amount } else { 0 },
        // Both accrual legs have already completed before this read.
        creator_fee_unclaimed: curve.creator_fee,
        // Deliberately required: no invented zero or extension interpretation.
        unparsed_trailing_field: i.trailing_cost_adjustment,
    }
}

// Emission, completion mutation, PostComplete construction and AccountsExit
// remain the ordered contracts in REPORT.md. This builder does not emit,
// reload, initialize, serialize accounts or make any CPI succeed by default.
