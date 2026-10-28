#[allow(clippy::too_many_arguments)]
fn cashback<'info>(
    remaining_accounts: &'info [AccountInfo<'info>],
    user: &Signer<'info>,
    pool_quote_token_account: &InterfaceAccount<'info, TokenAccount>,
    quote_mint: &InterfaceAccount<'info, Mint>,
    quote_token_program: &Interface<'info, TokenInterface>,
    system_program: &Program<'info, System>,
    associated_token_program: &Program<'info, AssociatedToken>,
    amount: u64,
    pool: &Account<'info, Pool>,
    base_mint: &Pubkey,
) -> Result<()> {
    let ata = remaining_accounts
        .get(0)
        .ok_or_else(|| error!(PumpAmmError::MissingCashbackAccounts))?;
    let user_volume_accumulator = remaining_accounts
        .get(1)
        .ok_or_else(|| error!(PumpAmmError::MissingCashbackAccounts))?;
    let user_key = user.key();
    let (expected_accumulator, bump) = Pubkey::find_program_address(
        &[b"user_volume_accumulator", user_key.as_ref()],
        &crate::ID,
    );
    if user_volume_accumulator.key() != expected_accumulator {
        return err!(PumpAmmError::InvalidCashbackAccumulator);
    }
    require!(user_volume_accumulator.is_writable, PumpAmmError::InvalidCashbackAccumulator);
    if user_volume_accumulator.data_is_empty() {
        let rent = Rent::get()?;
        let rent = rent.minimum_balance(137);
        let bump = [bump];
        let seeds: &[&[u8]] = &[b"user_volume_accumulator", user_key.as_ref(), &bump];
        let signer_seeds = &[seeds];
        let lamports = user_volume_accumulator.lamports();
        if rent > lamports {
            anchor_lang::system_program::transfer(
                CpiContext::new(
                    system_program.to_account_info(),
                    anchor_lang::system_program::Transfer {
                        from: user.to_account_info(),
                        to: user_volume_accumulator.clone(),
                    },
                ),
                rent.saturating_sub(lamports),
            )?;
        }
        anchor_lang::solana_program::program::invoke_signed(
            &anchor_lang::solana_program::system_instruction::allocate(user_volume_accumulator.key, 137),
            &[user_volume_accumulator.clone()],
            signer_seeds,
        )?;
        anchor_lang::solana_program::program::invoke_signed(
            &anchor_lang::solana_program::system_instruction::assign(user_volume_accumulator.key, &crate::ID),
            &[user_volume_accumulator.clone()],
            signer_seeds,
        )?;
        let mut data = user_volume_accumulator.try_borrow_mut_data()?;
        data[..8].copy_from_slice(UserVolumeAccumulator::DISCRIMINATOR);
        data[8..40].copy_from_slice(user_key.as_ref());
    } else {
        require!(*user_volume_accumulator.owner == crate::ID, PumpAmmError::InvalidCashbackAccumulator);
        let data = user_volume_accumulator.try_borrow_data()?;
        if data.len() < 8 || data[..8] != *UserVolumeAccumulator::DISCRIMINATOR {
            return err!(PumpAmmError::InvalidCashbackAccumulator);
        }
    }
    let expected_ata = anchor_spl::associated_token::get_associated_token_address_with_program_id(
        &user_volume_accumulator.key(),
        &quote_mint.key(),
        &quote_token_program.key(),
    );
    require!(ata.key() == expected_ata, PumpAmmError::InvalidCashbackAccumulatorAta);
    require!(ata.is_writable, PumpAmmError::InvalidCashbackAccumulatorAta);
    if ata.data_is_empty() {
        anchor_spl::associated_token::create(CpiContext::new(
            associated_token_program.to_account_info(),
            anchor_spl::associated_token::Create {
                payer: user.to_account_info(),
                associated_token: ata.clone(),
                authority: user_volume_accumulator.clone(),
                mint: quote_mint.to_account_info(),
                system_program: system_program.to_account_info(),
                token_program: quote_token_program.to_account_info(),
            },
        ))?;
    }
    let ata = InterfaceAccount::<TokenAccount>::try_from_unchecked(ata)?;
    let mut accumulator = Account::<UserVolumeAccumulator>::try_from_unchecked(user_volume_accumulator)?;
    crate::utils::token::transfer_from_pool(
        quote_token_program,
        quote_mint,
        pool_quote_token_account,
        &ata,
        amount,
        pool,
    )?;
    accumulator.user = user.key();
    accumulator.cashback_earned = accumulator
        .cashback_earned
        .checked_add(amount)
        .ok_or(error!(PumpAmmError::Overflow))?;
    accumulator.exit(&crate::ID)?;
    validate_pool_v2(remaining_accounts, &base_mint.key(), 2)?;
    Ok(())
}
