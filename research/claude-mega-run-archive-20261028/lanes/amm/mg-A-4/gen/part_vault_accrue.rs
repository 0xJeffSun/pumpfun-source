/// Pool vault holding `mint` in the next AMM hop's accounts.
#[inline(never)]
fn vault_for_mint<'info>(
    accounts: &[AccountInfo<'info>],
    mint: &Pubkey,
) -> Result<AccountInfo<'info>> {
    let account = if accounts[1].key() == *mint {
        &accounts[4]
    } else if accounts[0].key() == *mint {
        &accounts[3]
    } else {
        return err!(PumpAmmError::MultiHopDiscontinuousPath);
    };
    Ok(account.clone())
}

/// Apply this AMM hop's fee accounting before its optional endpoint payout.
pub fn accrue_hop_fees<'info>(
    global_config: &Account<'info, GlobalConfig>,
    recipient: &AccountInfo<'info>,
    hop: &mut AmmHop<'info>,
    token_program: &AccountInfo<'info>,
    protocol_fee: u64,
    creator_fee: u64,
    gates: HopFeeGates,
) -> Result<u64> {
    let buyback_fee = hop.pool.accrue_fees(global_config, protocol_fee, creator_fee)?;
    if gates.protocol {
        crate::utils::token::transfer_from_pool_to_raw(
            token_program, &hop.quote_mint, &hop.pool_quote_token_account,
            &hop.pool, recipient, buyback_fee,
        )?;
    }
    Ok(buyback_fee)
}
