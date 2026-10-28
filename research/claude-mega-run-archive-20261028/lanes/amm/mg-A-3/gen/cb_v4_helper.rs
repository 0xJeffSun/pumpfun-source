
fn create_cashback_ata<'info>(
    ata: &AccountInfo<'info>,
    payer: &AccountInfo<'info>,
    user_volume: &Account<'info, UserVolumeAccumulator>,
    quote_mint: &AccountInfo<'info>,
    quote_token_program: &AccountInfo<'info>,
    system_program: &AccountInfo<'info>,
    associated_token_program: &AccountInfo<'info>,
) -> Result<()> {
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

    Ok(())
}
