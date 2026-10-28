#!/usr/bin/env python3
"""mx3: multiplex variants (B dispatcher base + day_index + inline 373) differing in the 394 tail and supply dispatch."""
import sys, os, shutil, subprocess
base, out = sys.argv[1], sys.argv[2]
if os.path.exists(out): shutil.rmtree(out)
subprocess.run(['cp', '-c', '-R', base, out], check=True)
DI = """
#[inline]
fn day_index_{S}(accumulator: &GlobalVolumeAccumulator, timestamp: i64) -> Option<usize> {
    time_index(timestamp).checked_sub(time_index(accumulator.start_time)).and_then(|elapsed| (accumulator.seconds_in_a_day != 0).then(|| elapsed / time_index(accumulator.seconds_in_a_day)))
}
"""
CUR = "day_index_{S}(accumulator, timestamp).expect(\"current_timestamp should be bigger than start_time\")"
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
DISPATCH = """
#[inline]
fn update_token_supply_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64, timestamp: i64) -> Result<()> {
    if timestamp < accumulator.start_time {
        return update_token_supply_before_start_{S}(accumulator, day_number, token_supply_per_day);
    }
    require!(timestamp <= accumulator.end_time, PumpError::SupplyUpdateForFinishedRange);
    update_token_supply_after_start_{S}(accumulator, day_number, token_supply_per_day, timestamp)
}
"""
DISPATCH_Q = """
#[inline]
fn update_token_supply_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64, timestamp: i64) -> Result<()> {
    if timestamp < accumulator.start_time {
        update_token_supply_before_start_{S}(accumulator, day_number, token_supply_per_day)?;
        return Ok(());
    }
    require!(timestamp <= accumulator.end_time, PumpError::SupplyUpdateForFinishedRange);
    update_token_supply_after_start_{S}(accumulator, day_number, token_supply_per_day, timestamp)?;
    Ok(())
}
"""
HELPERS = """
#[inline]
fn update_token_supply_before_start_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64) -> Result<()> {
    let end = end_day(accumulator);
    if day_number < 30 {
        require_gte!(end, day_number as usize, PumpError::DayIndexAfterEndIndex);
        accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
    } else {
        for index in 0..=end {
            accumulator.total_token_supply[index] = token_supply_per_day;
        }
    }
    Ok(())
}
#[inline]
fn update_token_supply_after_start_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64, timestamp: i64) -> Result<()> {
    let current = CUR;
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
TIME = """
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
TAILS = {
 'w1': """let current = CUR;
        let end = end_day(accumulator);
        require_gt!(end, current, PumpError::EndTimeBeforeCurrentDay);
        for index in current + 1..=end {
            accumulator.sol_volumes[index] = 0;
        }""",
 'w2': """let current = CUR;
        let next = current + 1;
        let end = end_day(accumulator);
        require_gt!(end, current, PumpError::EndTimeBeforeCurrentDay);
        for index in next..=end {
            accumulator.sol_volumes[index] = 0;
        }""",
 'w3': """let current = CUR;
        let end = end_day(accumulator);
        let next = current + 1;
        require_gt!(end, current, PumpError::EndTimeBeforeCurrentDay);
        for index in next..=end {
            accumulator.sol_volumes[index] = 0;
        }""",
 'w4': """let current = CUR;
        let end = end_day(accumulator);
        require_gt!(end, current, PumpError::EndTimeBeforeCurrentDay);
        for index in current.saturating_add(1)..=end {
            accumulator.sol_volumes[index] = 0;
        }""",
}
V = {}
W2 = TIME.replace('TAIL', TAILS['w2'])
HELPERS_RET = HELPERS.replace("""        require_gte!(end, day_number as usize, PumpError::DayIndexAfterEndIndex);
        accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
    } else {
        for index in 0..=end {
            accumulator.total_token_supply[index] = token_supply_per_day;
        }
    }
    Ok(())""", """        require_gte!(end, day_number as usize, PumpError::DayIndexAfterEndIndex);
        accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
        return Ok(());
    }
    for index in 0..=end {
        accumulator.total_token_supply[index] = token_supply_per_day;
    }
    Ok(())""").replace("""        require_gte!(day_number as usize, current, PumpError::DayInActiveRange);
        accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
    } else {
        for index in current..=end {
            accumulator.total_token_supply[index] = token_supply_per_day;
        }
    }
    Ok(())""", """        require_gte!(day_number as usize, current, PumpError::DayInActiveRange);
        accumulator.total_token_supply[day_number as usize] = token_supply_per_day;
        return Ok(());
    }
    for index in current..=end {
        accumulator.total_token_supply[index] = token_supply_per_day;
    }
    Ok(())""")
assert HELPERS_RET != HELPERS
V['x1'] = HDR + DI + DISPATCH + HELPERS_RET + W2
V['x2'] = HDR + DI + DISPATCH + HELPERS.replace('#[inline]\nfn update_token_supply_before_start', '#[inline(always)]\nfn update_token_supply_before_start').replace('#[inline]\nfn update_token_supply_after_start', '#[inline(always)]\nfn update_token_supply_after_start') + W2
DISPATCH_E = """
#[inline]
fn update_token_supply_{S}(accumulator: &mut GlobalVolumeAccumulator, day_number: u64, token_supply_per_day: u64, timestamp: i64) -> Result<()> {
    if timestamp < accumulator.start_time {
        update_token_supply_before_start_{S}(accumulator, day_number, token_supply_per_day)
    } else {
        require!(timestamp <= accumulator.end_time, PumpError::SupplyUpdateForFinishedRange);
        update_token_supply_after_start_{S}(accumulator, day_number, token_supply_per_day, timestamp)
    }
}
"""
V['x3'] = HDR + DI + DISPATCH_E + HELPERS + W2
V['x4'] = HDR + DI + DISPATCH.replace('#[inline]\nfn update_token_supply_{S}', '#[inline(always)]\nfn update_token_supply_{S}') + HELPERS + W2
V['x5'] = HDR + DI + DISPATCH + HELPERS + W2.replace('#[inline]\nfn update_time_range', '#[inline(always)]\nfn update_time_range')
code = '\n'.join(v.replace('CUR', CUR).replace('{S}', k) for k, v in V.items())
p = out + '/src/token_incentives/volume_accumulator.rs'
open(p, 'a').write('\n// ---- multiplex variants (experiment only) ----\n' + code)
q = out + '/src/incentives.rs'
s = open(q).read()
call = 'crate::token_incentives::volume_accumulator::update_schedule('
args = "&mut ctx.accounts.global_volume_accumulator, start_time, end_time, seconds_in_a_day, &mint, day_number, token_supply_per_day, timestamp"
pre = ''.join(f"if day_number == {1001+i} {{ crate::token_incentives::volume_accumulator::update_schedule_{k}({args})?; }} else " for i, k in enumerate(V))
s = s.replace('    ' + call, '    ' + pre + '{ ' + call, 1)
i = s.index(call); j = s.index(')?;', i) + 3
s = s[:j] + ' }' + s[j:]
open(q, 'w').write(s)
print('variants:', list(V))
