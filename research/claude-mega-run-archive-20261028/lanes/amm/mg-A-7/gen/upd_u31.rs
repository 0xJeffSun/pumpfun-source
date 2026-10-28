//PAD
impl UserVolumeAccumulator {
    // Adds `sol_volume` to the volume traded by the user during the current day.
    fn add_sol_volume(&mut self, sol_volume: u64, now: i64) {
        self.current_sol_volume = self
            .current_sol_volume
            .checked_add(sol_volume)
            .expect("Overflowing user accumulator sol volume");
        self.needs_claim = self.total_unclaimed_tokens > 0 || self.current_sol_volume > 0;
        self.last_update_timestamp = now;
    }
}

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
        let Some(current_day) = self.day_index(now) else {
            return Ok(());
        };
        let result = self.roll_over(user, current_day, now);
        if result.is_err() {
            return result;
        }
        if now > self.end_time {
            return Ok(());
        }
        self.add_sol_volume(current_day, sol_volume);
        user.add_sol_volume(sol_volume, now);
        Ok(())
    }

    fn roll_over(&self, user: &mut UserVolumeAccumulator, current_day: usize, now: i64) -> Result<()> {
        if let Some(last_update_day) = self.day_index(user.last_update_timestamp) {
            let end_day = self.end_day();
            if last_update_day < current_day && last_update_day <= end_day {
                let sol_volume = self.sol_volumes[last_update_day];
                let token_supply = self.total_token_supply[last_update_day];
                if sol_volume > 0 {
                if user.current_sol_volume == 0 {
                    return Ok(());
                }
                let tokens = (user.current_sol_volume as u128) * (token_supply as u128)
                    / (sol_volume as u128);
                let Ok(tokens) = u64::try_from(tokens) else {
                    return err!(PumpAmmError::Truncation); //@104
                };
                user.total_unclaimed_tokens = user
                    .total_unclaimed_tokens
                    .checked_add(tokens)
                    .expect("Unexpected overflow");
                user.needs_claim = user.total_unclaimed_tokens > 0;
                user.last_update_timestamp = now;
                user.current_sol_volume = 0;
                }
            }
        }
        Ok(())
    }

    fn add_sol_volume(&mut self, day: usize, sol_volume: u64) {
        self.sol_volumes[day] = self.sol_volumes[day]
            .checked_add(sol_volume)
            .expect("Overflowing sol volume");
    }
}
