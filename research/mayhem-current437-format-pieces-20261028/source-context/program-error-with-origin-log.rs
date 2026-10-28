impl ProgramErrorWithOrigin {
    pub fn log(&self) {
        match &self.error_origin {
            None => {
                anchor_lang::solana_program::msg!(
                    "ProgramError occurred. Error Code: {:?}. Error Number: {}. Error Message: {}.",
                    self.program_error,
                    u64::from(self.program_error.clone()),
                    self.program_error
                );
            }
            Some(ErrorOrigin::Source(source)) => {
                anchor_lang::solana_program::msg!(
                    "ProgramError thrown in {}:{}. Error Code: {:?}. Error Number: {}. Error \
                     Message: {}.",
                    source.filename,
                    source.line,
                    self.program_error,
                    u64::from(self.program_error.clone()),
                    self.program_error
                );
            }
            Some(ErrorOrigin::AccountName(account_name)) => {
                // using sol_log because msg! wrongly interprets 5 inputs as u64
                anchor_lang::solana_program::log::sol_log(&format!(
                    "ProgramError caused by account: {}. Error Code: {:?}. Error Number: {}. \
                     Error Message: {}.",
                    account_name,
                    self.program_error,
                    u64::from(self.program_error.clone()),
                    self.program_error
                ));
            }
        }
        match &self.compared_values {
            Some(ComparedValues::Pubkeys((left, right))) => {
                anchor_lang::solana_program::msg!("Left:");
                left.log();
                anchor_lang::solana_program::msg!("Right:");
                right.log();
            }
            Some(ComparedValues::Values((left, right))) => {
                anchor_lang::solana_program::msg!("Left: {}", left);
                anchor_lang::solana_program::msg!("Right: {}", right);
            }
            None => (),
        }
    }
