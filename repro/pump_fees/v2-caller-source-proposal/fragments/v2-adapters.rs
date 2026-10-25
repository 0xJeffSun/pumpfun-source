// [212344,213328): data_len and infallible borrow, not try_borrow_data.
fn v2_expected_quote(info: &AccountInfo<'_>) -> Pubkey {
    let stored = if info.data_len() < 115 { Pubkey::default() } else {
        let data = info.data.borrow();
        Pubkey::new_from_array(data[83..115].try_into().unwrap())
    };
    if stored == Pubkey::default() {
        anchor_spl::token::spl_token::native_mint::ID
    } else { stored }
}

fn v2_transfer_creator_fees_to_pump<'info>(
    curve: &BondingCurve,
    accounts: crate::pump_amm::cpi::accounts::TransferCreatorFeesToPumpV2<'info>,
) -> Result<()> {
    if curve.real_sol_reserves == 0
        && curve.virtual_sol_reserves == 0
        && curve.real_token_reserves == 0
        && curve.virtual_token_reserves == 0
        && accounts.coin_creator_vault_ata.owner != &System::id()
    {
        let program = accounts.program.clone();
        crate::pump_amm::cpi::transfer_creator_fees_to_pump_v2(
            CpiContext::new(program, accounts),
        )?;
    }
    Ok(())
}

fn v2_distribute_creator_fees<'info>(
    accounts: crate::pump::cpi::accounts::DistributeCreatorFeesV2<'info>,
    remaining: Vec<AccountInfo<'info>>,
) -> Result<()> {
    let program = accounts.program.clone();
    crate::pump::cpi::distribute_creator_fees_v2(
        CpiContext::new(program, accounts).with_remaining_accounts(remaining), true,
    )?;
    Ok(())
}

// [225920,231576): scalar errors, then total, then duplicate count.
fn v2_validate_shares(shares: &[Shareholder]) -> Result<()> {
    require!(!shares.is_empty(), FeeError::NoShareholders);
    require!(shares.len() <= 10, FeeError::TooManyShareholders);
    let mut sum = 0u16;
    let mut keys = Vec::with_capacity(shares.len());
    for share in shares {
        require!(share.share_bps > 0, FeeError::ZeroShareNotAllowed);
        sum = sum.checked_add(share.share_bps).ok_or(FeeError::ShareCalculationOverflow)?;
        keys.push(share.address);
    }
    keys.sort_unstable();
    keys.dedup();
    require!(sum == 10_000, FeeError::InvalidShareTotal);
    require!(keys.len() == shares.len(), FeeError::DuplicateShareholder);
    Ok(())
}
