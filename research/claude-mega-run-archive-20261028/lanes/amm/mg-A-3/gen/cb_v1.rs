fn distribute_cashback<'info>(
    remaining_accounts: &[AccountInfo<'info>],
    payer: &AccountInfo<'info>,
    user_volume: &mut Account<'info, UserVolumeAccumulator>,
    user_quote: &InterfaceAccount<'info, TokenAccount>,
    quote_decimals: u8,
    quote_mint: &AccountInfo<'info>,
    quote_token_program: &AccountInfo<'info>,
    system_program: &AccountInfo<'info>,
    associated_token_program: &AccountInfo<'info>,
    amount: u64,
    base_mint: &Pubkey,
) -> Result<()> {
    let ata = remaining_accounts
        .get(0)
        .ok_or_else(|| error!(PumpAmmError::MissingCashbackAccounts))?; //@44

    let expected = anchor_spl::associated_token::get_associated_token_address_with_program_id(
        &user_volume.key(),
        &quote_mint.key(),
        &quote_token_program.key(),
    );
//PAD
    require!(ata.key() == expected, PumpAmmError::InvalidCashbackAccumulatorAta); //@54

//PAD
    require!(ata.is_writable, PumpAmmError::InvalidCashbackAccumulatorAta); //@57

    if ata.data_is_empty() {
        anchor_spl::associated_token::create_idempotent(CpiContext::new(
            associated_token_program.clone(),
            anchor_spl::associated_token::Create {
                payer: payer.clone(),
                associated_token: ata.clone(),
                authority: user_volume.to_account_info(),
                mint: quote_mint.clone(),
                system_program: system_program.clone(),
                token_program: quote_token_program.clone(),
            },
        ))?;
    }

    crate::utils::token::validate_self_transfer(
        &user_quote.key(),
        &user_quote.owner,
        ata.key,
        payer.key,
    )?;

    token_interface::transfer_checked(
        CpiContext::new(
            quote_token_program.clone(),
            token_interface::TransferChecked {
                from: user_quote.to_account_info(),
                mint: quote_mint.clone(),
                to: ata.clone(),
                authority: payer.clone(),
            },
        ),
        amount,
        quote_decimals,
    )?;

//PAD
    user_volume.cashback_earned = user_volume
        .cashback_earned
        .checked_add(amount)
        .ok_or(error!(PumpAmmError::Overflow))?; //@98
    user_volume.exit(&crate::ID)?;
    crate::instructions::swap::sell::validate_pool_v2(remaining_accounts, base_mint, 1)
}
