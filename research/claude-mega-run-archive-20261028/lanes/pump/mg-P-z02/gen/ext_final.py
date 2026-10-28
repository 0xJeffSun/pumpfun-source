#!/usr/bin/env python3
# ext_final.py <c6 extend_account.rs> <out>: header (1-24) + transfer helper + execute (variant e) + pad,
# get_account_size header at line 83 and c6's lines 84-110 (sites 84/107 unchanged). Lines 111+ left free.
import sys
L = open(sys.argv[1]).read().split('\n')
assert L[24].startswith('fn get_account_size') and 'require!' in L[83] and 'err!' in L[106]
block = '''fn transfer_lamports(accounts: &ExtendAccount, lamports: u64) -> Result<()> {
    if lamports > 0 {
        anchor_lang::system_program::transfer(
            CpiContext::new(
                accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: accounts.user.to_account_info(),
                    to: accounts.account.to_account_info(),
                },
            ),
            lamports,
        )?;
    }
    Ok(())
}
pub fn execute(ctx: Context<ExtendAccount>) -> Result<()> {
    let account = &ctx.accounts.account;
    let current_size = account.data_len();
    let new_size = get_account_size(account)?;
    if current_size == new_size {
        msg!("Account already has the correct size");
        return Ok(());
    }
    if current_size > new_size {
        msg!("Account already has more than {} bytes: {}", new_size, current_size);
        return Ok(());
    }
    let rent = Rent::get()?;
    let delta = rent
        .minimum_balance(new_size)
        .saturating_sub(rent.minimum_balance(current_size));
    transfer_lamports(&ctx.accounts, delta)?;
    account.realloc(new_size, false)?;
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
}'''.split('\n')
out = L[:24] + block
while len(out) < 82: out.append('// layout-pad')
assert len(out) == 82, len(out)
out.append(L[24])            # line 83: fn get_account_size(...) {
out += L[83:110]             # lines 84..110
assert 'require!' in out[83] and 'err!' in out[106] and out[109] == '}'
open(sys.argv[2], 'w').write('\n'.join(out) + '\n')
print('lines', len(out))
