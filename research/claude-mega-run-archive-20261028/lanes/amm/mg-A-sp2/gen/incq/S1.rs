pub fn handler(
    ctx: Context<AdminUpdateTokenIncentives>,
    start_time: i64,
    end_time: i64,
    seconds_in_a_day: i64,
    day_number: u64,
    token_supply_per_day: u64,
) -> Result<()> {
    let mint = ctx.accounts.mint.key();
    let timestamp = Clock::get()?.unix_timestamp;
    let event = AdminUpdateTokenIncentivesEvent {
        start_time,
        end_time,
        day_number,
        token_supply_per_day,
        mint,
        seconds_in_a_day,
        timestamp,
    };
    ctx.accounts.global_volume_accumulator.update_token_incentives(
        start_time,
        end_time,
        seconds_in_a_day,
        &mint,
        day_number,
        token_supply_per_day,
        timestamp,
    )?;
    emit!(event.clone());
    emit_cpi!(event);

    msg!("GlobalVolumeAccumulator={:?}", ctx.accounts.global_volume_accumulator);

    Ok(())
}
