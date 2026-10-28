use crate::*;
#[event_cpi]
#[derive(Accounts)]
pub struct ExtendAccount<'info> {
    /// CHECK: this instruction handles raw supported account discriminators.
    #[account(mut,owner=crate::ID)]
    pub account: AccountInfo<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
pub fn execute(ctx: Context<ExtendAccount>) -> Result<()> {
    let info = ctx.accounts.account.to_account_info();
    let current = info.data_len();
    let size = {
        let data = info.try_borrow_data()?;
        match data.get(..8) {
            Some(d) if d == [23,183,248,55,96,216,172,96] => 166,
            Some(d) if d == [167,232,232,177,200,108,114,127] => 1088,
            Some(d) if d == [86,255,112,14,102,53,154,250] => 137,
            Some(d) if d == [202, 42, 246, 43, 142, 190, 30, 255] => 600,
            _ => return err!(PumpError::AccountTypeNotSupported),
        }
    };
    if current == size {
        msg!("Account already has the correct size");
        return Ok(());
    }
    if current > size {
        msg!("Account already has more than {} bytes: {}", size, current);
        return Ok(());
    }
    let rent = Rent::get()?;
    let delta = rent
        .minimum_balance(size)
        .checked_sub(rent.minimum_balance(current))
        .ok_or(PumpError::Overflow)?;
    if delta > 0 {
        anchor_lang::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.user.to_account_info(),
                    to: info.clone(),
                },
            ),
            delta,
        )?;
    }
    info.realloc(size, false)?;
    let event = ExtendAccountEvent {
        timestamp: Clock::get()?.unix_timestamp,
        account: info.key(),
        user: ctx.accounts.user.key(),
        current_size: current as u64,
        new_size: size as u64,
    };
    emit!(event.clone());
    emit_cpi!(event);
    Ok(())
}
#[event]
#[derive(Clone)]
pub struct ExtendAccountEvent {
    pub account: Pubkey,
    pub user: Pubkey,
    pub current_size: u64,
    pub new_size: u64,
    pub timestamp:i64,
}
// layout-pad: aligns the next Source site with the original line




























































#[inline(never)]
pub fn fund_bonding_curve_rent<'info>(
    curve: &Account<'info, crate::trade_types::BondingCurve>,
    system_program: &Program<'info, System>,
    payer: &Signer<'info>,
    size: usize,
) -> Result<()> {
    let native = curve.quote_mint == Pubkey::default(); let reserved = if !native { 0 } else {
        curve.real_quote_reserves.checked_add(crate::reserved_bonding_curve_fees(curve)?)
            .ok_or_else(|| error!(crate::PumpError::Overflow))?
    };


    let minimum = Rent::get()?.minimum_balance(size);
    let available = curve.to_account_info().lamports().saturating_sub(reserved);
    if minimum > available {
        let lamports = minimum.saturating_sub(available);
        anchor_lang::system_program::transfer(
            CpiContext::new(
                system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: payer.to_account_info(),
                    to: curve.to_account_info(),
                },
            ),
            lamports,
        )?;
    }
    Ok(())
}
