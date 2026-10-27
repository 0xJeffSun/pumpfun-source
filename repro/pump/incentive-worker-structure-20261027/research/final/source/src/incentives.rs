//! Bounded reconstruction of Pump admin token-incentive scheduling.
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::{Global, GlobalVolumeAccumulator, PumpError};

#[event_cpi]
#[derive(Accounts)]
pub struct AdminUpdateTokenIncentives<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(seeds = [b"global"], bump, has_one = authority @ PumpError::NotAuthorized)]
    pub global: Box<Account<'info, Global>>,
    #[account(mut, seeds = [b"global_volume_accumulator"], bump)]
    pub global_volume_accumulator: Box<Account<'info, GlobalVolumeAccumulator>>,
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = global_volume_accumulator,
        associated_token::token_program = token_program
    )]
    pub global_incentive_token_account: InterfaceAccount<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
}

#[event]
#[derive(Clone)]
pub struct AdminUpdateTokenIncentivesEvent {
    pub start_time: i64,
    pub end_time: i64,
    pub day_number: u64,
    pub token_supply_per_day: u64,
    pub mint: Pubkey,
    pub seconds_in_a_day: i64,
    pub timestamp: i64,
}

pub fn execute(
    ctx: Context<AdminUpdateTokenIncentives>,
    start_time: i64,
    end_time: i64,
    seconds_in_a_day: i64,
    day_number: u64,
    token_supply_per_day: u64,
) -> Result<()> {
    let timestamp = Clock::get()?.unix_timestamp;
    let accumulator = &mut ctx.accounts.global_volume_accumulator;
    accumulator.mint = ctx.accounts.mint.key();
    accumulator.seconds_in_a_day = seconds_in_a_day;
    if start_time != 0 && end_time != 0 {
        if start_time != accumulator.start_time {
            require!(start_time > timestamp, PumpError::StartTimeInThePast);
            accumulator.start_time = start_time;
            accumulator.total_token_supply = [0; 30];
            accumulator.sol_volumes = [0; 30];
        }
        require!(end_time > timestamp, PumpError::EndTimeInThePast);
        require!(end_time > start_time, PumpError::EndTimeBeforeStartTime);
        require!(end_time - start_time < seconds_in_a_day * 30,
                 PumpError::TimeRangeTooLarge);
        accumulator.end_time = end_time;
        if timestamp > accumulator.start_time {
            let current = current_day(accumulator, timestamp);
            let end = end_day(accumulator);
            require!(end > current, PumpError::EndTimeBeforeCurrentDay);
            for index in current + 1..=end {
                accumulator.sol_volumes[index] = 0;
            }
        }
    }
    if token_supply_per_day > 0 {
        require!(timestamp <= accumulator.end_time,
                 PumpError::SupplyUpdateForFinishedRange);
        let current = current_day(accumulator, timestamp);
        let end = end_day(accumulator);
        if day_number < 30 {
            require!(day_number as usize <= end, PumpError::DayIndexAfterEndIndex);
            require!(day_number as usize >= current, PumpError::DayInActiveRange);
            accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
        } else {
            for index in current..=end {
                accumulator.total_token_supply[index] = token_supply_per_day;
            }
        }
    }
    let event = AdminUpdateTokenIncentivesEvent {
        start_time,
        end_time,
        day_number,
        token_supply_per_day,
        mint: ctx.accounts.mint.key(),
        seconds_in_a_day,
        timestamp,
    };
    emit!(event.clone());
    emit_cpi!(event);
    msg!("GlobalVolumeAccumulator={:?}", ctx.accounts.global_volume_accumulator);
    Ok(())
}

// The captured scheduler converts the individual time fields before doing
// unsigned day arithmetic. Converting only their signed difference incorrectly
// accepts negative stored times and changes rejection precedence.
fn current_day(accumulator: &GlobalVolumeAccumulator, timestamp: i64) -> usize {
    if timestamp < accumulator.start_time {
        return 0;
    }
    let timestamp = time_index(timestamp);
    let start = time_index(accumulator.start_time);
    let seconds = time_index(accumulator.seconds_in_a_day);
    (timestamp - start) / seconds
}

#[inline(never)]
fn end_day(accumulator: &GlobalVolumeAccumulator) -> usize {
    let end = time_index(accumulator.end_time);
    let start = time_index(accumulator.start_time);
    let seconds = time_index(accumulator.seconds_in_a_day);
    end.checked_sub(start)
        .and_then(|duration| duration.checked_div(seconds))
        .expect("end_time should be bigger than start_time")
}

#[inline]
fn time_index(value: i64) -> usize {
    usize::try_from(value).expect("SVM is 64-bit")
}
