use crate::*;

pub fn validate_self_transfer(
    source: &Pubkey,
    source_owner: &Pubkey,
    destination: &Pubkey,
    authority: &Pubkey,
) -> Result<()> {
    require!(source != destination || source_owner == authority, PumpAmmError::SelfTransferNotAllowed);
    Ok(())
}

pub fn transfer_checked<'info>(
    token_program: &AccountInfo<'info>,
    mint: &InterfaceAccount<'info, Mint>,
    source: &InterfaceAccount<'info, TokenAccount>,
    destination: &InterfaceAccount<'info, TokenAccount>,
    authority: &AccountInfo<'info>,
    amount: u64,
    signer_seeds: &[&[&[u8]]],
) -> Result<()> {
    if amount == 0 {
        return Ok(());
    }
    validate_self_transfer(&source.key(), &source.owner, &destination.key(), authority.key)?;
    token_interface::transfer_checked(CpiContext::new_with_signer(
        token_program.clone(),
        token_interface::TransferChecked {
            from: source.to_account_info(),
            mint: mint.to_account_info(),
            to: destination.to_account_info(),
            authority: authority.clone(),
        },
        signer_seeds,
    ), amount, mint.decimals)
}
