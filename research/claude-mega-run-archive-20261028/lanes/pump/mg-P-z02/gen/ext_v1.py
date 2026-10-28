HEAD = '''pub fn execute_{S}(ctx: Context<ExtendAccount>) -> Result<()> {
    let account = &ctx.accounts.account;
    let current_size = account.data_len();
    let new_size = get_account_size_{S}(account)?;
    if current_size == new_size {
        msg!("Account already has the correct size");
        return Ok(());
    }
    if current_size > new_size {
        msg!("Account already has more than {} bytes: {}", new_size, current_size);
        return Ok(());
    }
'''
TAIL = '''    account.realloc(new_size, false)?;
    let event = ExtendAccountEvent {
        account: account.key(),
        user: ctx.accounts.user.key(),
        current_size: current_size as u64,
        new_size: new_size as u64,
        timestamp: Clock::get()?.unix_timestamp,
    };
    emit!(event);
    emit_cpi!(event);
    Ok(())
}
'''
DELTA = '''    let rent = Rent::get()?;
    let delta = rent
        .minimum_balance(new_size)
        .saturating_sub(rent.minimum_balance(current_size));
'''
TR = 'anchor_lang::system_program::transfer(CpiContext::new({p}, anchor_lang::system_program::Transfer {{ from: {f}, to: {t} }}), lamports)'
H_INFO = '''fn transfer_lamports_{S}<'info>(from: &AccountInfo<'info>, to: &AccountInfo<'info>, system_program: &AccountInfo<'info>, lamports: u64) -> Result<()> {
'''
CALL_INFO = '    transfer_lamports_{S}(ctx.accounts.user.as_ref(), account, ctx.accounts.system_program.as_ref(), delta)?;\n'
tr_info = TR.format(p='system_program.clone()', f='from.clone()', t='to.clone()')
VARIANTS = {
 'b': H_INFO + '    if lamports > 0 {\n        ' + tr_info + '?;\n    }\n    Ok(())\n}\n' + HEAD + DELTA + CALL_INFO + TAIL,
 'c': H_INFO + '    if lamports == 0 {\n        return Ok(());\n    }\n    ' + tr_info + '\n}\n' + HEAD + DELTA + CALL_INFO + TAIL,
 'd': '''fn transfer_lamports_{S}<'info>(user: &Signer<'info>, account: &AccountInfo<'info>, system_program: &Program<'info, System>, lamports: u64) -> Result<()> {
    if lamports > 0 {
        ''' + TR.format(p='system_program.to_account_info()', f='user.to_account_info()', t='account.to_account_info()') + '''?;
    }
    Ok(())
}
''' + HEAD + DELTA + '    transfer_lamports_{S}(&ctx.accounts.user, account, &ctx.accounts.system_program, delta)?;\n' + TAIL,
 'e': '''fn transfer_lamports_{S}(accounts: &ExtendAccount, lamports: u64) -> Result<()> {
    if lamports > 0 {
        ''' + TR.format(p='accounts.system_program.to_account_info()', f='accounts.user.to_account_info()', t='accounts.account.to_account_info()') + '''?;
    }
    Ok(())
}
''' + HEAD + DELTA + '    transfer_lamports_{S}(&ctx.accounts, delta)?;\n' + TAIL,
 'f': '''fn fund_{S}(accounts: &ExtendAccount, current_size: usize, new_size: usize) -> Result<()> {
    let rent = Rent::get()?;
    let lamports = rent
        .minimum_balance(new_size)
        .saturating_sub(rent.minimum_balance(current_size));
    if lamports > 0 {
        ''' + TR.format(p='accounts.system_program.to_account_info()', f='accounts.user.to_account_info()', t='accounts.account.to_account_info()') + '''?;
    }
    Ok(())
}
''' + HEAD + '    fund_{S}(&ctx.accounts, current_size, new_size)?;\n' + TAIL,
 'g': H_INFO + '    if lamports > 0 {\n        ' + tr_info + '?;\n    }\n    Ok(())\n}\n' + HEAD + '''    let rent = Rent::get()?;
    let new_minimum_balance = rent.minimum_balance(new_size);
    let current_minimum_balance = rent.minimum_balance(current_size);
    let delta = new_minimum_balance.saturating_sub(current_minimum_balance);
''' + CALL_INFO + TAIL,
}
