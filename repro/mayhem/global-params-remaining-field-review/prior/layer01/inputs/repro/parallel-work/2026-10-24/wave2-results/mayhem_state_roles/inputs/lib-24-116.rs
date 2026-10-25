    pub fn buy_pump_swap(ctx: Context<BuyPumpSwap>, reference: u128, tolerance_bps: u16, retained_reserve_bps: u16) -> Result<()> { instructions::buy_pump_swap::handler(ctx, reference, tolerance_bps, retained_reserve_bps) }
    pub fn sell_pump_swap(ctx: Context<SellPumpSwap>, reference: u128, tolerance_bps: u16, retained_reserve_bps: u16) -> Result<()> { instructions::sell_pump_swap::handler(ctx, reference, tolerance_bps, retained_reserve_bps) }
    pub fn buy_v2(ctx: Context<BuyV2>, reference: u128, tolerance_bps: u16, retained_reserve_bps: u16) -> Result<()> { instructions::buy_v2::handler(ctx, reference, tolerance_bps, retained_reserve_bps) }
    pub fn sell_v2(ctx: Context<SellV2>, reference: u128, tolerance_bps: u16, retained_reserve_bps: u16) -> Result<()> { instructions::sell_v2::handler(ctx, reference, tolerance_bps, retained_reserve_bps) }
    pub fn buy(ctx: Context<LegacyBuy>, reference: u128, tolerance_bps: u16, retained_reserve_bps: u16) -> Result<()> { instructions::buy::handler(ctx, reference, tolerance_bps, retained_reserve_bps) }
    pub fn sell(ctx: Context<LegacySell>, reference: u128, tolerance_bps: u16, retained_reserve_bps: u16) -> Result<()> {
        instructions::sell::handler(ctx, reference, tolerance_bps, retained_reserve_bps)
    }
    pub fn burn_tokens(ctx: Context<BurnTokens>) -> Result<()> {
        instructions::burn::handler(ctx)
    }
    pub fn sweep_fees<'info>(ctx: Context<'info, SweepFees<'info>>) -> Result<()> {
        let limit = if ctx.accounts.quote_mint.key() == anchor_spl::token::spl_token::native_mint::ID { ctx.accounts.global_params.max_sol_per_sweep } else { ctx.accounts.global_params.max_stable_per_sweep };
        let amount = sweep_remaining(ctx.remaining_accounts, &ctx.accounts.trader.to_account_info(), &ctx.accounts.trader_quote_ata.to_account_info(), &ctx.accounts.token_program.to_account_info(), ctx.accounts.quote_mint.key(), limit, false)?;
        let event = SweepEvent { amount, timestamp: Clock::get()?.unix_timestamp }; emit!(event); emit_cpi!(event); Ok(())
    }
    pub fn sweep_fees_admin<'info>(ctx: Context<'info, SweepFeesAdmin<'info>>) -> Result<()> {
        let amount = sweep_remaining(ctx.remaining_accounts, &ctx.accounts.admin.to_account_info(), &ctx.accounts.admin_quote_ata.to_account_info(), &ctx.accounts.token_program.to_account_info(), ctx.accounts.quote_mint.key(), u64::MAX, true)?;
        let event = SweepEvent { amount, timestamp: Clock::get()?.unix_timestamp }; emit!(event); emit_cpi!(event); Ok(())
    }
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
    pub fn extend_account(ctx: Context<ExtendAccount>) -> Result<()> {
        let account = ctx.accounts.account.to_account_info();
        let old_size = account.data_len();
        let new_size = {
            let data = account.try_borrow_data()?;
            match data.get(..8) {
                Some(d) if d == GlobalParams::DISCRIMINATOR => 318,
                Some(d) if d == FeeRecipient::DISCRIMINATOR => 74,
                Some(d) if d == [0xb1,0xfd,0xbf,0x7d,0xcb,0x16,0x86,0x6b] => 170,
                _ => return err!(MayhemError::AccountTypeNotSupported),
            }
        };
        if old_size == new_size {
            msg!("Account already has the correct size");
            return Ok(());
        }
        if old_size > new_size {
            msg!("Account already has more than {} bytes: {}", new_size, old_size);
            return Ok(());
        }
        let required = Rent::get()?.minimum_balance(new_size).saturating_sub(account.lamports());
        if required > 0 {
            anchor_lang::system_program::transfer(
                CpiContext::new(ctx.accounts.system_program.key(),
                    anchor_lang::system_program::Transfer {
                        from: ctx.accounts.user.to_account_info(), to: account.clone()
                    }), required)?;
        }
        account.resize(new_size)?;
        let event = ExtendAccountEvent {
            account: account.key(), user: ctx.accounts.user.key(),
            old_size: old_size as u64, new_size: new_size as u64,
            timestamp: Clock::get()?.unix_timestamp,
        };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }
