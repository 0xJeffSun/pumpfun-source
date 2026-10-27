//! Bounded claim of Token-2022 incentives from a local daily-volume fixture.
use anchor_lang::prelude::*;
use anchor_lang::Event;
use anchor_lang::solana_program::{instruction::{AccountMeta, Instruction},
    program::invoke_signed};
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token_interface::{self, Mint, TokenAccount, TokenInterface,
    TransferChecked};

use crate::{GlobalVolumeAccumulator, PumpError, UserVolumeAccumulator};

const EVENT_CPI_DISCRIMINATOR: [u8; 8] = [228, 69, 165, 46, 81, 203, 154, 29];

#[derive(Accounts)]
pub struct ClaimTokenIncentives<'info> {
    /// CHECK: The user key names its ATA and volume PDA; it is not a signer.
    pub user: UncheckedAccount<'info>,
    #[account(init_if_needed, payer = payer, associated_token::mint = mint,
        associated_token::authority = user,
        associated_token::token_program = token_program)]
    pub user_ata: InterfaceAccount<'info, TokenAccount>,
    #[account(seeds = [b"global_volume_accumulator"], bump,
        has_one = mint)]
    pub global_volume_accumulator: Account<'info, GlobalVolumeAccumulator>,
    #[account(mut, associated_token::mint = mint,
        associated_token::authority = global_volume_accumulator,
        associated_token::token_program = token_program)]
    pub global_incentive_token_account: InterfaceAccount<'info, TokenAccount>,
    #[account(mut, seeds = [b"user_volume_accumulator", user.key().as_ref()], bump)]
    pub user_volume_accumulator: Account<'info, UserVolumeAccumulator>,
    pub mint: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    /// CHECK: This is the program's event CPI signer PDA.
    #[account(seeds = [b"__event_authority"], bump)]
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: The pinned program account is the event CPI target.
    #[account(address = crate::ID @ anchor_lang::error::ErrorCode::InvalidProgramId)]
    pub program: UncheckedAccount<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
}

#[event]
#[derive(Clone)]
pub struct ClaimTokenIncentivesEvent {
    pub user: Pubkey,
    pub mint: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
    pub total_claimed_tokens: u64,
    pub current_sol_volume: u64,
}

pub fn claim(ctx: Context<ClaimTokenIncentives>) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let global = &ctx.accounts.global_volume_accumulator;
    let user = &mut ctx.accounts.user_volume_accumulator;
    user.user = ctx.accounts.user.key();
    accrue(global, user, now)?;
    let amount = user.total_unclaimed_tokens;
    if amount == 0 {
        return Ok(());
    }
    let bump = [ctx.bumps.global_volume_accumulator];
    let signer: &[&[u8]] = &[b"global_volume_accumulator", &bump];
    let transfer = TransferChecked {
        from: ctx.accounts.global_incentive_token_account.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.user_ata.to_account_info(),
        authority: global.to_account_info(),
    };
    token_interface::transfer_checked(
        CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(),
                                    transfer, &[signer]),
        amount, ctx.accounts.mint.decimals)?;
    user.total_unclaimed_tokens = 0;
    user.total_claimed_tokens += amount;
    user.needs_claim = user.current_sol_volume > 0;
    user.last_update_timestamp = now;
    user.has_total_claimed_tokens = true;
    let event = ClaimTokenIncentivesEvent {
        user: ctx.accounts.user.key(), mint: ctx.accounts.mint.key(),
        amount, timestamp: now,
        total_claimed_tokens: user.total_claimed_tokens,
        current_sol_volume: user.current_sol_volume,
    };
    emit!(event.clone());
    let mut data = EVENT_CPI_DISCRIMINATOR.to_vec();
    data.extend_from_slice(&event.data());
    let ix = Instruction {
        program_id: crate::ID,
        accounts: vec![AccountMeta::new_readonly(
            ctx.accounts.event_authority.key(), true)],
        data,
    };
    let event_bump = [ctx.bumps.event_authority];
    let event_signer: &[&[u8]] = &[b"__event_authority", &event_bump];
    invoke_signed(&ix, &[
        ctx.accounts.event_authority.to_account_info(),
        ctx.accounts.program.to_account_info(),
    ], &[event_signer])?;
    Ok(())
}

// This shared-worker behavior is observed at original 0x7bfd8. The caller pays
// pending tokens even when this worker has no new eligible day to accrue.
fn accrue(global: &GlobalVolumeAccumulator, user: &mut UserVolumeAccumulator, now: i64) -> Result<()> {
    if user.last_update_timestamp < global.start_time && now < global.start_time {
        user.total_claimed_tokens = 0;
        user.has_total_claimed_tokens = false;
    }
    let timestamp = time_index(now);
    let start = time_index(global.start_time);
    if timestamp < start {
        return Ok(());
    }
    let seconds = time_index(global.seconds_in_a_day);
    if seconds == 0 {
        return Ok(());
    }
    let previous = time_index(user.last_update_timestamp);
    let current_day = (timestamp - start) / seconds;
    if previous >= start {
        let previous_day = (previous - start) / seconds;
        let end = time_index(global.end_time);
        let end_day = end.checked_sub(start)
            .and_then(|elapsed| elapsed.checked_div(seconds))
            .expect("end_time should be bigger than start_time");
        if previous_day < current_day && previous_day <= end_day {
            let volume = global.sol_volumes[previous_day];
            if volume > 0 && user.current_sol_volume > 0 {
                let accrued = u64::try_from(
                    u128::from(user.current_sol_volume)
                        * u128::from(global.total_token_supply[previous_day])
                        / u128::from(volume))
                    .map_err(|_| error!(PumpError::Truncation))?;
                user.total_unclaimed_tokens += accrued;
                user.last_update_timestamp = now;
                user.needs_claim = user.total_unclaimed_tokens > 0;
                user.current_sol_volume = 0;
            }
        }
    }
    if global.end_time >= now {
        // The original touches the current global day even with zero new volume.
        let _ = global.sol_volumes[current_day];
        user.last_update_timestamp = now;
        user.needs_claim = user.total_unclaimed_tokens > 0 || user.current_sol_volume > 0;
    }
    Ok(())
}

#[inline]
fn time_index(value: i64) -> usize {
    usize::try_from(value).expect("SVM is 64-bit")
}
