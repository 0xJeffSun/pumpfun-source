use crate::{GlobalVolumeAccumulator, PumpError, UserVolumeAccumulator};
use anchor_lang::prelude::*;

// Captured main-Pump worker: 0x7bfd8. Claim passes zero new volume, while
// the recovered worker retains the original generic update signature.
#[inline(never)]
pub fn update(
    global: &mut GlobalVolumeAccumulator,
    user: &mut UserVolumeAccumulator,
    now: i64,
    volume: u64,
    key: &Pubkey,
) -> Result<()> {
    user.user = *key;
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
        let end_day = end_day(global);
        if previous_day < current_day && previous_day <= end_day {
            let volume = global.sol_volumes[previous_day];
            if volume > 0 && user.current_sol_volume > 0 {
                let accrued = match u64::try_from(
                    u128::from(user.current_sol_volume)
                        * u128::from(global.total_token_supply[previous_day])
                        / u128::from(volume),
                ) {
                    Ok(amount) => amount,
                    Err(_) => return Err(error!(PumpError::Truncation)),
                };
                user.total_unclaimed_tokens = user
                    .total_unclaimed_tokens
                    .checked_add(accrued)
                    .expect("Unexpected overflow");
                user.last_update_timestamp = now;
                user.needs_claim = user.total_unclaimed_tokens > 0;
                user.current_sol_volume = 0;
            }
        }
    }
    if global.end_time >= now {
        // The original touches the current global day even with zero new volume.
        global.sol_volumes[current_day] = global.sol_volumes[current_day]
            .checked_add(volume)
            .expect("Overflowing sol volume");
        user.current_sol_volume = user
            .current_sol_volume
            .checked_add(volume)
            .expect("Overflowing user accumulator sol volume");
        user.last_update_timestamp = now;
        user.needs_claim = user.total_unclaimed_tokens > 0 || user.current_sol_volume > 0;
    }
    Ok(())
}

#[inline]
fn time_index(value: i64) -> usize {
    usize::try_from(value).expect("SVM is 64-bit")
}

#[inline(never)]
fn end_day(global: &GlobalVolumeAccumulator) -> usize {
    let end = time_index(global.end_time);
    let start = time_index(global.start_time);
    end.checked_sub(start)
        .and_then(|elapsed| elapsed.checked_div(time_index(global.seconds_in_a_day)))
        .expect("end_time should be bigger than start_time")
}

// The captured post-transfer update uses Option::unwrap for its checked sum.
#[inline]
pub fn record_claim(user: &mut UserVolumeAccumulator, timestamp: i64) {
    let claimed = user
        .total_claimed_tokens
        .checked_add(user.total_unclaimed_tokens)
        .unwrap();
    user.last_update_timestamp = timestamp;
    user.has_total_claimed_tokens = claimed > 0;
    user.needs_claim = user.current_sol_volume > 0;
    user.total_claimed_tokens = claimed;
    user.total_unclaimed_tokens = 0;
}
