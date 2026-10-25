// UNCOMPILED partial Anchor source hypothesis for965b8, not a whole Buy handler.
// Caller has already cloned recipient (84730->10c78) before the zero gate.
// Framework lowering, diagnostics and destructor identity are NOT proved.
use anchor_lang::prelude::*;
pub fn native_debit<'info>(curve: &AccountInfo<'info>, recipient: AccountInfo<'info>, amount: u64) -> Result<()> {
    if amount != 0 {
        let remaining = curve.lamports().checked_sub(amount)
            .ok_or(anchor_lang::solana_program::program_error::ProgramError::ArithmeticOverflow)?;
        { **curve.try_borrow_mut_lamports()? = remaining; }
        let credited = recipient.lamports().checked_add(amount)
            .ok_or(anchor_lang::solana_program::program_error::ProgramError::ArithmeticOverflow)?;
        { **recipient.try_borrow_mut_lamports()? = credited; }
    }
    Ok(())
}
