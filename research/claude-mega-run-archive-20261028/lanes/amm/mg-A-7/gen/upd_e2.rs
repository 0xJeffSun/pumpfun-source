//PAD
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
        let current_day = match self.day_index(now) {
            Some(day) => day,
            None => return Ok(()),
        };
        if let Some(last_update_day) = self.day_index(user.last_update_timestamp) {
            let end_day = self.end_day();
            if last_update_day < current_day
                && last_update_day <= end_day
                && self.sol_volumes[last_update_day] > 0
                && user.current_sol_volume > 0
            {
                self.roll_over(user, last_update_day, now)?;
            }
        }
        if now <= self.end_time {
            self.sol_volumes[current_day] = self.sol_volumes[current_day]
                .checked_add(sol_volume)
                .expect("Overflowing sol volume");
            user.current_sol_volume = user
                .current_sol_volume
                .checked_add(sol_volume)
                .expect("Overflowing user accumulator sol volume");
            user.last_update_timestamp = now;
            user.needs_claim = user.total_unclaimed_tokens > 0 || user.current_sol_volume > 0;
        }
        Ok(())
    }

    fn roll_over(&self, user: &mut UserVolumeAccumulator, last_update_day: usize, now: i64) -> Result<()> {
        let tokens = (user.current_sol_volume as u128)
            * (self.total_token_supply[last_update_day] as u128)
            / (self.sol_volumes[last_update_day] as u128);
        let Ok(tokens) = u64::try_from(tokens) else {
            return err!(PumpAmmError::Truncation); //@104
        };
        user.total_unclaimed_tokens = user
            .total_unclaimed_tokens
            .checked_add(tokens)
            .expect("Unexpected overflow");
        user.last_update_timestamp = now;
        user.needs_claim = user.total_unclaimed_tokens > 0;
        user.current_sol_volume = 0;
        Ok(())
    }
}
