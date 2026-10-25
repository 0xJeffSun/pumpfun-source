pub struct ExtendAccount<'info> {
    /// CHECK: Owner/mut checked here; recognized discriminator checked in handler.
    #[account(mut, owner = ID)]
    pub account: UncheckedAccount<'info>,
    pub user: Signer<'info>,
    pub system_program: CheckedSystemProgram<'info>,
    /// CHECK: Preserve the captured runtime PDA derivation and ConstraintSeeds error.
    #[account(seeds = [b"__event_authority"], bump)]
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: Captured parser consumes this account without an address constraint.
    pub program: UncheckedAccount<'info>,
}

#[event(discriminator = [0x61,0x61,0xd7,0x90,0x5d,0x92,0x16,0x7c])]
pub struct ExtendAccountEvent {
    pub account: Pubkey,
    pub user: Pubkey,
    pub old_size: u64,
    pub new_size: u64,
    pub timestamp: i64,
}

#[derive(Accounts)]
pub struct WithdrawAdmin<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(mut, seeds = [b"global-params"], bump, has_one = admin)]
    pub global_params: Account<'info, GlobalParams>,
    /// CHECK: PDA/writability enforced here; System CPI enforces spending owner.
    #[account(mut, seeds = [b"sol-vault"], bump)]
    pub sol_vault: UncheckedAccount<'info>,
    pub system_program: CheckedSystemProgram<'info>,
}

#[derive(Accounts)]
pub struct WithdrawQuoteAdmin<'info> {
    #[account(mut)] pub admin: Signer<'info>,
    #[account(mut, seeds = [b"global-params"], bump, has_one = admin)]
    pub global_params: Account<'info, GlobalParams>,
    /// CHECK: PDA authorizes its token accounts.
    #[account(mut, seeds = [b"sol-vault"], bump)] pub sol_vault: UncheckedAccount<'info>,
    pub quote_mint: InterfaceAccount<'info, Mint>,
    #[account(mut, associated_token::mint = quote_mint, associated_token::authority = sol_vault, associated_token::token_program = token_program)]
    pub vault_quote_ata: InterfaceAccount<'info, TokenAccount>,
    #[account(init_if_needed, payer = admin, associated_token::mint = quote_mint, associated_token::authority = admin, associated_token::token_program = token_program)]
    pub admin_quote_ata: InterfaceAccount<'info, TokenAccount>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: CheckedSystemProgram<'info>,
}

#[event(discriminator = [218,130,134,253,101,109,149,152])]
pub struct SweepEvent { pub amount: u64, pub timestamp: i64 }
fn sweep_remaining<'info>(remaining: &'info [AccountInfo<'info>], destination: &AccountInfo<'info>, destination_ata: &AccountInfo<'info>, token: &AccountInfo<'info>, mint: Pubkey, limit: u64, admin: bool) -> Result<u64> {
    require_eq!(remaining.len(),16,MayhemError::AccountTypeNotSupported);
    let rent = Rent::get()?;
    let mut total = 0u64;
    for pair in remaining.chunks_exact(2) {
        let mut recipient=Account::<FeeRecipient>::try_from(&pair[0])?;
        let ata=InterfaceAccount::<TokenAccount>::try_from(&pair[1])?;
        let before_total=total;
        let available = limit - total;
        let token_amount = ata.amount.min(available);
        if token_amount > 0 {
            let index=[recipient.index];let bump=[recipient.bump];let seeds: &[&[u8]]=&[b"fee-recipient", &index, &bump];
            anchor_spl::token::transfer(CpiContext::new_with_signer(*token.key, anchor_spl::token::Transfer { from: ata.to_account_info(), to: destination_ata.clone(), authority: recipient.to_account_info() }, &[seeds]),token_amount)?;
            total += token_amount;
        }
        if mint == anchor_spl::token::spl_token::native_mint::ID {
            let account = recipient.to_account_info();
            let amount = (account.lamports() - rent.minimum_balance(account.data_len())).min(limit-total);
            **account.try_borrow_mut_lamports()? -= amount;
            **destination.try_borrow_mut_lamports()? += amount;
            total += amount;
        }
        let (counter, timestamp) = if mint == anchor_spl::token::spl_token::native_mint::ID { (8, 0) } else { (16, 24) };
        let previous=u64::from_le_bytes(recipient.opaque[counter..counter+8].try_into().unwrap());
        recipient.opaque[counter..counter+8].copy_from_slice(&(previous + total-before_total).to_le_bytes());
        if !admin { recipient.opaque[timestamp..timestamp+8].copy_from_slice(&Clock::get()?.unix_timestamp.to_le_bytes()); }
        recipient.exit(&ID)?;
    }
    Ok(total)
}

#[derive(Accounts)]
pub struct SweepFees<'info> {
    #[account(mut)] pub trader: Signer<'info>,
    #[account(mut, seeds=[b"global-params"], bump, has_one=trader)] pub global_params: Account<'info, GlobalParams>,
    pub quote_mint: InterfaceAccount<'info, Mint>,
    #[account(mut, associated_token::mint=quote_mint, associated_token::authority=trader, associated_token::token_program=token_program)] pub trader_quote_ata: InterfaceAccount<'info, TokenAccount>,
    pub system_program: CheckedSystemProgram<'info>,
    #[account(address=anchor_spl::token::ID)] pub token_program: Interface<'info,TokenInterface>,
    pub associated_token_program: Program<'info,AssociatedToken>,
    /// CHECK: Preserve the captured runtime PDA derivation and ConstraintSeeds error.
    #[account(seeds = [b"__event_authority"], bump)]
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: Captured parser consumes this account without an address constraint.
    pub program: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct SweepFeesAdmin<'info> {
    #[account(mut)] pub admin: Signer<'info>,
    #[account(mut, seeds=[b"global-params"], bump, has_one=admin)] pub global_params: Account<'info, GlobalParams>,
    pub quote_mint: InterfaceAccount<'info, Mint>,
    #[account(mut, associated_token::mint=quote_mint, associated_token::authority=admin, associated_token::token_program=token_program)] pub admin_quote_ata: InterfaceAccount<'info, TokenAccount>,
    pub system_program: CheckedSystemProgram<'info>,
    #[account(address=anchor_spl::token::ID)] pub token_program: Interface<'info,TokenInterface>,
    pub associated_token_program: Program<'info,AssociatedToken>,
    /// CHECK: Preserve the captured runtime PDA derivation and ConstraintSeeds error.
    #[account(seeds = [b"__event_authority"], bump)]
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: Captured parser consumes this account without an address constraint.
    pub program: UncheckedAccount<'info>,
}
