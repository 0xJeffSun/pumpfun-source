impl AnchorError {
    pub fn log(&self) {
        match &self.error_origin {
            None => {
                anchor_lang::solana_program::log::sol_log(&format!(
                    "AnchorError occurred. Error Code: {}. Error Number: {}. Error Message: {}.",
                    self.error_name, self.error_code_number, self.error_msg
                ));
            }
            Some(ErrorOrigin::Source(source)) => {
                anchor_lang::solana_program::msg!(
                    "AnchorError thrown in {}:{}. Error Code: {}. Error Number: {}. Error \
                     Message: {}.",
                    source.filename,
                    source.line,
                    self.error_name,
                    self.error_code_number,
                    self.error_msg
                );
            }
            Some(ErrorOrigin::AccountName(account_name)) => {
                anchor_lang::solana_program::log::sol_log(&format!(
                    "AnchorError caused by account: {}. Error Code: {}. Error Number: {}. Error \
                     Message: {}.",
                    account_name, self.error_name, self.error_code_number, self.error_msg
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
