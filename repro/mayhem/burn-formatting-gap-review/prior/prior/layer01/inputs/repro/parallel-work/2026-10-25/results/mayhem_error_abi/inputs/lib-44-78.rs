    pub fn withdraw_quote_admin(ctx: Context<WithdrawQuoteAdmin>, amount: u64) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;
        let state = &mut ctx.accounts.global_params;
        let last = i64::from_le_bytes(state.reset_stable_suffix[16..24].try_into().unwrap());
        let interval = i64::from_le_bytes(state.reset_stable_suffix[8..16].try_into().unwrap());
        if last != 0 && interval != 0 { require_gte!(now, last + interval, MayhemError::WithdrawRateLimit); }
        state.reset_stable_suffix[16..24].copy_from_slice(&now.to_le_bytes());
        let bump = [ctx.bumps.sol_vault];
        let seeds: &[&[u8]] = &[b"sol-vault", &bump];
        anchor_spl::token::transfer(CpiContext::new_with_signer(
            ctx.accounts.token_program.key(), anchor_spl::token::Transfer {
                from: ctx.accounts.vault_quote_ata.to_account_info(),
                to: ctx.accounts.admin_quote_ata.to_account_info(),
                authority: ctx.accounts.sol_vault.to_account_info(),
            }, &[seeds]), amount)
    }
    pub fn withdraw_admin(ctx: Context<WithdrawAdmin>, amount: u64) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;
        let state = &mut ctx.accounts.global_params;
        let last = i64::from_le_bytes(state.reset_middle[1..9].try_into().unwrap());
        let interval = i64::from_le_bytes(state.reset_middle[17..25].try_into().unwrap());
        if last != 0 && interval != 0 {
            // The captured original panics on signed-add overflow here.
            require_gte!(now, last + interval, MayhemError::WithdrawRateLimit);
        }
        state.reset_middle[1..9].copy_from_slice(&now.to_le_bytes());
        let bump = [ctx.bumps.sol_vault];
        let seeds: &[&[u8]] = &[b"sol-vault", &bump];
        anchor_lang::system_program::transfer(
            CpiContext::new_with_signer(ctx.accounts.system_program.key(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.sol_vault.to_account_info(),
                    to: ctx.accounts.admin.to_account_info(),
                }, &[seeds]), amount)
    }
