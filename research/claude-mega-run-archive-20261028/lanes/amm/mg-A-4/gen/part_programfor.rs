/// Token program that owns `mint`.
fn program_for<'info>(
    a: &MultiHop<'info>,
    mint: &InterfaceAccount<'info, Mint>,
) -> Result<AccountInfo<'info>> {
    let owner = mint.to_account_info().owner;
    if *owner == anchor_spl::token_2022::ID {
        Ok(a.token_2022_program.to_account_info())
    } else if *owner == anchor_spl::token::ID {
        Ok(a.token_program.to_account_info())
    } else {
        err!(PumpAmmError::AccountTypeNotSupported)
    }
}
