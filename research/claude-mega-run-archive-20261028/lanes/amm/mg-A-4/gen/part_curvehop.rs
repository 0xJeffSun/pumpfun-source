/// Classify a hop by its pool account owner: PumpSwap pools are AMM hops,
/// Pump bonding curves are curve hops.
fn is_curve_hop(accounts: &[AccountInfo]) -> Result<bool> {
    let owner = accounts[2].owner;
    if *owner == crate::ID {
        Ok(false)
    } else if *owner == PUMP {
        Ok(true)
    } else {
        err!(PumpAmmError::AccountTypeNotSupported)
    }
}

fn hop_direction(group: &[AccountInfo], current_mint: &mut Pubkey) -> Result<bool> {
    if *current_mint == group[1].key() {
        *current_mint = group[0].key();
        Ok(false)
    } else if *current_mint == group[0].key() {
        *current_mint = group[1].key();
        Ok(true)
    } else {
        err!(PumpAmmError::MultiHopDiscontinuousPath)
    }
}
