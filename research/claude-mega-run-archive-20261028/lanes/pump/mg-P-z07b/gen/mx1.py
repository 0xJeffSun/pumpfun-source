#!/usr/bin/env python3
"""mx1: multiplex variants of update_schedule into one build. usage: mx1.py BASE_SRC_DIR OUT_SRC_DIR"""
import sys, os, shutil, subprocess
base, out = sys.argv[1], sys.argv[2]
if os.path.exists(out): shutil.rmtree(out)
subprocess.run(['cp', '-c', '-R', base, out], check=True)
CUR = "time_index(timestamp).checked_sub(time_index(accumulator.start_time)).and_then(|elapsed| (accumulator.seconds_in_a_day != 0).then(|| elapsed / time_index(accumulator.seconds_in_a_day))).expect(\"current_timestamp should be bigger than start_time\")"
HDR = """
#[inline(never)]
pub fn update_schedule_{S}(accumulator: &mut GlobalVolumeAccumulator, start_time: i64, end_time: i64, seconds_in_a_day: i64, mint: &Pubkey, day_number: u64, token_supply_per_day: u64, timestamp: i64) -> Result<()> {
    accumulator.seconds_in_a_day = seconds_in_a_day;
    accumulator.mint = *mint;
    if start_time != 0 && end_time != 0 {
        update_time_range_{S}(accumulator, start_time, end_time, timestamp)?;
    }
    if token_supply_per_day > 0 {
        update_token_supply_{S}(accumulator, day_number, token_supply_per_day, timestamp)?;
    }
    Ok(())
}
"""
SUPPLY1 = """
#[inline]
fn update_token_supply_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64, timestamp: i64) -> Result<()> {
    require!(timestamp < accumulator.start_time || timestamp <= accumulator.end_time, PumpError::SupplyUpdateForFinishedRange);
    if timestamp < accumulator.start_time {
        let end = end_day(accumulator);
        if day_number < 30 {
            require_gte!(end, day_number as usize, PumpError::DayIndexAfterEndIndex);
            accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
        } else {
            for index in 0..=end {
                accumulator.total_token_supply[index] = token_supply_per_day;
            }
        }
        return Ok(());
    }
    let current = CURRENT;
    let end = end_day(accumulator);
    if day_number < 30 {
        require_gte!(end, day_number as usize, PumpError::DayIndexAfterEndIndex);
        require_gte!(day_number as usize, current, PumpError::DayInActiveRange);
        accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
    } else {
        for index in current..=end {
            accumulator.total_token_supply[index] = token_supply_per_day;
        }
    }
    Ok(())
}
"""
TIME1 = """
#[inline]
fn update_time_range_{S}(accumulator: &mut GlobalVolumeAccumulator, start_time: i64, end_time: i64, timestamp: i64) -> Result<()> {
    if start_time != accumulator.start_time {
        require_gt!(start_time, timestamp, PumpError::StartTimeInThePast);
        accumulator.start_time = start_time;
        accumulator.total_token_supply = [0; 30];
        accumulator.sol_volumes = [0; 30];
    }
    require_gt!(end_time, timestamp, PumpError::EndTimeInThePast);
    require_gt!(end_time, start_time, PumpError::EndTimeBeforeStartTime);
    require_gte!(accumulator.seconds_in_a_day.checked_mul(30).expect("Unexpected overflow") - 1, end_time.checked_sub(start_time).expect("Unexpected overflow"), PumpError::TimeRangeTooLarge);
    accumulator.end_time = end_time;
    if timestamp > accumulator.start_time {
        TAIL
    }
    Ok(())
}
"""
TAIL1 = """let current = CURRENT;
        let end = end_day(accumulator);
        require_gt!(end, current, PumpError::EndTimeBeforeCurrentDay);
        for index in current + 1..=end {
            accumulator.sol_volumes[index] = 0;
        }"""
V = {}
# va: single supply fn, inline current, B tail
V['va'] = HDR + SUPPLY1.replace('CURRENT', CUR) + TIME1.replace('TAIL', TAIL1.replace('CURRENT', CUR))
# vb: day_index helper + expect at call sites
DI = """
#[inline]
fn day_index_{S}(accumulator: &GlobalVolumeAccumulator, timestamp: i64) -> Option<usize> {
    time_index(timestamp).checked_sub(time_index(accumulator.start_time)).and_then(|elapsed| (accumulator.seconds_in_a_day != 0).then(|| elapsed / time_index(accumulator.seconds_in_a_day)))
}
"""
CURB = "day_index_{S}(accumulator, timestamp).expect(\"current_timestamp should be bigger than start_time\")"
V['vb'] = HDR + DI + SUPPLY1.replace('CURRENT', CURB) + TIME1.replace('TAIL', TAIL1.replace('CURRENT', CURB))
# vc: AMM uti6 port (not-started inline + set_token_supply helper, day_index)
V['vc'] = HDR + DI + """
#[inline]
fn update_token_supply_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64, timestamp: i64) -> Result<()> {
    require!(timestamp < accumulator.start_time || timestamp <= accumulator.end_time, PumpError::SupplyUpdateForFinishedRange);
    if timestamp < accumulator.start_time {
        let end = end_day(accumulator);
        if day_number < 30 {
            require_gte!(end, day_number as usize, PumpError::DayIndexAfterEndIndex);
            accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
        } else {
            for index in 0..=end {
                accumulator.total_token_supply[index] = token_supply_per_day;
            }
        }
        return Ok(());
    }
    let current = CURB;
    set_token_supply_{S}(accumulator, day_number, token_supply_per_day, current)
}
#[inline]
fn set_token_supply_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64, current: usize) -> Result<()> {
    let end = end_day(accumulator);
    if day_number < 30 {
        require_gte!(end, day_number as usize, PumpError::DayIndexAfterEndIndex);
        require_gte!(day_number as usize, current, PumpError::DayInActiveRange);
        accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
    } else {
        for index in current..=end {
            accumulator.total_token_supply[index] = token_supply_per_day;
        }
    }
    Ok(())
}
""".replace('CURB', CURB) + TIME1.replace('TAIL', TAIL1.replace('CURRENT', CURB))
# vd: main tail in a helper with ?
V['vd'] = HDR + SUPPLY1.replace('CURRENT', CUR) + TIME1.replace('TAIL', 'reset_future_volumes_{S}(accumulator, timestamp)?;') + """
#[inline]
fn reset_future_volumes_{S}(accumulator: &mut GlobalVolumeAccumulator, timestamp: i64) -> Result<()> {
    TAIL
    Ok(())
}
""".replace('TAIL', TAIL1.replace('CURRENT', CUR))
# ve: loop in a helper
V['ve'] = HDR + SUPPLY1.replace('CURRENT', CUR) + TIME1.replace('TAIL', """let current = CURRENT;
        let end = end_day(accumulator);
        require_gt!(end, current, PumpError::EndTimeBeforeCurrentDay);
        clear_sol_volumes_{S}(accumulator, current + 1, end);""".replace('CURRENT', CUR)) + """
#[inline]
fn clear_sol_volumes_{S}(accumulator: &mut GlobalVolumeAccumulator, from: usize, to: usize) {
    for index in from..=to {
        accumulator.sol_volumes[index] = 0;
    }
}
"""
# vf: va with explicit if/else for 394 (loop in then-branch)
V['vf'] = HDR + SUPPLY1.replace('CURRENT', CUR) + TIME1.replace('TAIL', """let current = CURRENT;
        let end = end_day(accumulator);
        if end > current {
            for index in current + 1..=end {
                accumulator.sol_volumes[index] = 0;
            }
        } else {
            return Err(error!(PumpError::EndTimeBeforeCurrentDay).with_values((end, current)));
        }""".replace('CURRENT', CUR))
code = '\n'.join(v.replace('{S}', k) for k, v in V.items())
p = out + '/src/token_incentives/volume_accumulator.rs'
open(p, 'a').write('\n// ---- multiplex variants (experiment only) ----\n' + code)
# dispatch in incentives.rs
q = out + '/src/incentives.rs'
s = open(q).read()
call = 'crate::token_incentives::volume_accumulator::update_schedule('
assert s.count(call) == 1
args = "&mut ctx.accounts.global_volume_accumulator, start_time, end_time, seconds_in_a_day, &mint, day_number, token_supply_per_day, timestamp"
pre = ''.join(f"if day_number == {1001+i} {{ crate::token_incentives::volume_accumulator::update_schedule_{k}({args})?; }} else " for i, k in enumerate(V))
s = s.replace('    ' + call, '    ' + pre + '{ ' + call, 1)
# close the brace after the call's `)?;`
i = s.index(call); j = s.index(')?;', i) + 3
s = s[:j] + ' }' + s[j:]
open(q, 'w').write(s)
print('variants:', list(V))
