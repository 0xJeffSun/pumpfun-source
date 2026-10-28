use anchor_lang::prelude::*;
use crate::PumpError;
use crate::trade_types::BondingCurve;
pub fn process_cashback<'info>(
    remaining_accounts: &'info [AccountInfo<'info>], user: &AccountInfo<'info>, system_program: &AccountInfo<'info>,
    bonding_curve: &Account<'info, BondingCurve>, amount: u64, mint: Pubkey,
) -> Result<()> {
// layout-pad(15): aligns the next Source site with the original line














    let user_volume_accumulator = remaining_accounts.first().ok_or_else(|| error!(PumpError::MissingCashbackAccounts))?;
    let user_key = user.key();
    let (expected, bump) = Pubkey::find_program_address(&[b"user_volume_accumulator", user_key.as_ref()], &crate::ID);
// layout-pad(7): aligns the next Source site with the original line






    require!(user_volume_accumulator.key() == expected, PumpError::InvalidCashbackAccumulator);
    if user_volume_accumulator.data_is_empty() {
        let rent = Rent::get()?;
        let space = 137;
        let lamports = rent.minimum_balance(space);
        let signer_seeds: &[&[&[u8]]] = &[&[b"user_volume_accumulator", user_key.as_ref(), &[bump]]];
        let required_lamports = lamports.saturating_sub(user_volume_accumulator.lamports());
        if required_lamports > 0 {
            anchor_lang::system_program::transfer(
                CpiContext::new(
                    system_program.clone(),
                    anchor_lang::system_program::Transfer { from: user.clone(), to: user_volume_accumulator.clone() },
                ),
                required_lamports,
            )?;
        }
        anchor_lang::solana_program::program::invoke_signed(
            &anchor_lang::solana_program::system_instruction::allocate(user_volume_accumulator.key, space as u64),
            &[user_volume_accumulator.clone()],
            signer_seeds,
        )?;
        anchor_lang::solana_program::program::invoke_signed(
            &anchor_lang::solana_program::system_instruction::assign(user_volume_accumulator.key, &crate::ID),
            &[user_volume_accumulator.clone()],
            signer_seeds,
        )?;
        let mut data = user_volume_accumulator.try_borrow_mut_data()?;
        data[..8].copy_from_slice(crate::UserVolumeAccumulator::DISCRIMINATOR);
        data[8..40].copy_from_slice(user_key.as_ref());
    } else {
        check_existing(user_volume_accumulator)?;
    }
// layout-pad(15): aligns the next Source site with the original line














    #[inline(always)] fn check_existing(user_volume_accumulator: &AccountInfo) -> Result<()> {
        require!(user_volume_accumulator.owner == &crate::ID, PumpError::InvalidCashbackAccumulator);
        let data = user_volume_accumulator.try_borrow_data();
        let data = data?;
// layout-pad(1): aligns the next Source site with the original line
        if data.len() < 8 || &data[..8] != crate::UserVolumeAccumulator::DISCRIMINATOR { return err!(PumpError::InvalidCashbackAccumulator); }
        Ok(())
    }
    crate::trade::quote_payments::transfer_native(bonding_curve, user_volume_accumulator, amount)?;
    let mut user_volume_accumulator = Account::<crate::UserVolumeAccumulator>::try_from_unchecked(user_volume_accumulator)?;
    if user_volume_accumulator.user == Pubkey::default() {
        user_volume_accumulator.user = user_key;
    }
// layout-pad(9): aligns the next Source site with the original line








    user_volume_accumulator.cashback_earned = user_volume_accumulator.cashback_earned.checked_add(amount).ok_or(error!(PumpError::Overflow))?;
    user_volume_accumulator.exit(&crate::ID)?;
// layout-pad(3): aligns the next Source site with the original line


    require!(remaining_accounts.len() > 1, PumpError::InvalidBondingCurveV2);
    let bonding_curve_v2 = &remaining_accounts[1];
    let (expected, _) = Pubkey::find_program_address(&[b"bonding-curve-v2", mint.as_ref()], &crate::ID);
// layout-pad(4): aligns the next Source site with the original line



    require!(bonding_curve_v2.key() == expected, PumpError::InvalidBondingCurveV2);
    Ok(())
}
