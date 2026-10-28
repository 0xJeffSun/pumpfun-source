use crate::*;

// Global token incentives schedule.
//
// One account per incentive mint, seeded with `global_volume_accumulator`.
// Tracks, for each of the 30 days of the incentive range, the token supply
// that will be distributed and the total SOL volume traded on that day.
#[account]
#[derive(Debug)]
pub struct GlobalVolumeAccumulator {
    pub start_time:i64,
    pub end_time:i64,
    pub seconds_in_a_day:i64,
    pub mint:Pubkey,
    pub total_token_supply:[u64;30],
    pub sol_volumes:[u64;30],
}

// Per-user volume tracking used to compute token incentives and cashback.
//
// Created lazily on the first trade of a user and updated on every buy and
// sell. Unclaimed tokens are moved to `total_unclaimed_tokens` when a day
// rolls over, and are paid out by `claim_token_incentives`.
// Cashback is accumulated separately and paid out by `claim_cashback`.
#[account]
pub struct UserVolumeAccumulator {
    pub user: Pubkey,
    pub needs_claim: bool,
    pub total_unclaimed_tokens: u64,
    pub total_claimed_tokens: u64,
    pub current_sol_volume: u64,
    pub last_update_timestamp: i64,
    pub has_total_claimed_tokens: bool,
    pub cashback_earned: u64,
    pub total_cashback_claimed: u64,
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
impl GlobalVolumeAccumulator {
    // Rolls the user's volume of a finished day into unclaimed tokens and
    // records `sol_volume` for the current day of the incentive range.
    pub fn update_user_volume_accumulator(
        &mut self,
        user: &mut UserVolumeAccumulator,
        now: i64,
        sol_volume: u64,
    ) -> Result<()> {
        if user.last_update_timestamp < self.start_time && now < self.start_time {
            user.total_claimed_tokens = 0;
            user.has_total_claimed_tokens = false;
        }
        let now_index = to_usize(now);
        let start_index = to_usize(self.start_time);
        if now_index < start_index || self.seconds_in_a_day == 0 {
            return Ok(());
        }
        let period = to_usize(self.seconds_in_a_day);
        let last_update_index = to_usize(user.last_update_timestamp);
        let current_day = (now_index - start_index) / period;
        if last_update_index >= start_index {
            let last_update_day = (last_update_index - start_index) / period;
            if last_update_day <= self.end_day()
                && last_update_day < current_day
                && self.sol_volumes[last_update_day] > 0
                && user.current_sol_volume > 0
            {
                let tokens = (user.current_sol_volume as u128)
                    * (self.total_token_supply[last_update_day] as u128)
                    / (self.sol_volumes[last_update_day] as u128);
                let tokens = u64::try_from(tokens).ok().ok_or(error!(PumpAmmError::Truncation))?;
                user.total_unclaimed_tokens = user.total_unclaimed_tokens.checked_add(tokens).expect("Unexpected overflow");
                user.last_update_timestamp = now;
                user.needs_claim = user.total_unclaimed_tokens > 0;
                user.current_sol_volume = 0;
            }
        }
        if now <= self.end_time {
            self.sol_volumes[current_day] = self.sol_volumes[current_day].checked_add(sol_volume).expect("Overflowing sol volume");
            user.current_sol_volume = user.current_sol_volume.checked_add(sol_volume).expect("Overflowing user accumulator sol volume");
            user.last_update_timestamp = now;
            user.needs_claim = user.total_unclaimed_tokens > 0 || user.current_sol_volume > 0;
        }
        Ok(())
    }
}

impl UserVolumeAccumulator {
    // Moves every unclaimed token to the claimed total after a successful
    // `claim_token_incentives` transfer.
    pub fn claim_tokens(&mut self, now: i64) {
        self.total_claimed_tokens = self
            .total_claimed_tokens
            .checked_add(self.total_unclaimed_tokens)
            .unwrap();
        self.total_unclaimed_tokens = 0;
        self.has_total_claimed_tokens = self.total_claimed_tokens > 0;
        self.needs_claim = self.current_sol_volume > 0;
        self.last_update_timestamp = now;
    }
}

impl GlobalVolumeAccumulator {
    pub fn update_token_incentives(
        &mut self,
        start_time:i64,
        end_time:i64,
        seconds_in_a_day:i64,
        mint:&Pubkey,
        day_number:u64,
        token_supply_per_day:u64,
        current_timestamp:i64,
    )->Result<()> {
        self.seconds_in_a_day=seconds_in_a_day;
        self.mint=*mint;
        if start_time!=0 && end_time!=0 {
            if start_time!=self.start_time {
                require_gt!(start_time,current_timestamp,PumpAmmError::StartTimeInThePast);
                self.start_time=start_time;
                self.total_token_supply=[0;30];
                self.sol_volumes=[0;30];
            }
            require_gt!(end_time,current_timestamp,PumpAmmError::EndTimeInThePast);
            require_gt!(end_time,start_time,PumpAmmError::EndTimeBeforeStartTime);
            require_gte!(seconds_in_a_day.checked_mul(30).expect("Unexpected overflow")-1,end_time-start_time,PumpAmmError::TimeRangeTooLarge);
            self.end_time=end_time;
            if current_timestamp>self.start_time {
                let current=to_usize(current_timestamp)
                    .checked_sub(to_usize(self.start_time))
                    .and_then(|value| value.checked_div(to_usize(self.seconds_in_a_day)))
                    .expect("current_timestamp should be bigger than start_time");
                let end=self.end_day();
                require_gt!(end,current,PumpAmmError::EndTimeBeforeCurrentDay);
                for i in current+1..=end {self.sol_volumes[i]=0;}
            }
        }
        if token_supply_per_day>0 {
            if current_timestamp>=self.start_time {require!(current_timestamp<=self.end_time,PumpAmmError::SupplyUpdateForFinishedRange);}
            let current=if current_timestamp<self.start_time {0}else{
                to_usize(current_timestamp)
                    .checked_sub(to_usize(self.start_time))
                    .and_then(|value| value.checked_div(to_usize(self.seconds_in_a_day)))
                    .expect("current_timestamp should be bigger than start_time")
            };
            let end=self.end_day();
            if day_number<30 {
                require_gte!(end,day_number as usize,PumpAmmError::DayIndexAfterEndIndex);
                require_gte!(day_number as usize,current,PumpAmmError::DayInActiveRange);
                self.total_token_supply[day_number as usize]=token_supply_per_day;
            }else{for i in current..=end {self.total_token_supply[i]=token_supply_per_day;}}
        }
        Ok(())
    }

    pub fn end_day(&self)->usize {
        to_usize(self.end_time)
            .checked_sub(to_usize(self.start_time))
            .and_then(|value| (self.seconds_in_a_day != 0).then(|| value / to_usize(self.seconds_in_a_day)))
            .expect("end_time should be bigger than start_time")
    }
}

fn to_usize(value: i64) -> usize {
    usize::try_from(value).expect("SVM is 64-bit")
}
