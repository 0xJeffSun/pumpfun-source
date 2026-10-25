// Source contract recovered from original BuyV3 callers; not historical text.
// This fragment does not remove the surrounding reconstruction domain fence.
fn buy_check_mode(a: &BuyV3<'_>) -> Result<()> {
    // BuyV3 supplies allow_cashback=false to original 0x7e0b0.
    require!(!a.bonding_curve.complete, PumpError::BondingCurveComplete);
    require!(!a.bonding_curve.is_cashback_coin, PumpError::CashbackCoinNotSupported);
    Ok(())
}

fn buy_ordinary_fees(a: &BuyV3<'_>, amount: u64) -> Result<fee_selection::FeeTuple> {
    // Name retained for compatibility with the frozen partial composition.
    // The selected threshold supply now follows the actual mode branch.
    // Surrounding admission/domain fences remain unchanged.
    // FeeConfig has already been checked/decoded by the typed Accounts parser.
    if a.user.key() == a.global.whitelist_pda {
        return Ok(fee_selection::FeeTuple {
            protocol_amount: 0, creator_amount: 0,
            protocol_fee_bps: 0, creator_fee_bps: 0,
        });
    }
    // 0x7fde8 keeps the AccountInfo clone alive through both fallible stages.
    // No vector/Account<FeeConfig> clone or lazy account re-deserialization.
    let info = a.fee_config.to_account_info();
    let serialized_len = info.data_len();
    let curve = &a.bonding_curve;
    // This guard precedes reading either supply, and carries a natural
    // source origin. The selector's same scalar guard is then unreachable.
    require!(curve.virtual_token_reserves != 0, PumpError::DivisionByZero);
    let selected_supply = if curve.is_mayhem_mode {
        curve.token_total_supply
    } else {
        a.base_mint.supply
    };
    let pretrade = fee_selection::Pretrade {
        mint_supply: selected_supply,
        virtual_base: curve.virtual_token_reserves,
        virtual_quote: curve.virtual_quote_reserves,
        quote_key: curve.quote_mint.to_bytes(),
        creator_key: curve.creator.to_bytes(),
        creator_configurable: a.global.creator_fee_configurable,
        curve_creator_bps: curve.creator_fee_bps,
    };
    // Existing selector is byte-for-byte unchanged. It computes the ordinary
    // threshold before serialized-length gates, and rounds each leg separately.
    // Pretrade.mint_supply is the selected supply, not always the mint field.
    let result = fee_selection::ordinary_leg(
        &a.fee_config, &pretrade, amount, serialized_len,
    ).map_err(fee_selection::anchor_error);
    drop(info);
    result
}
