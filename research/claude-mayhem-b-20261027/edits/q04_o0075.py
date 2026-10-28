#!/usr/bin/env python3
"""q04: close O0075 (sweep_fees_admin) on top of q03.

1. The handler takes its accounts reference before the remaining-accounts check
   (`let accounts = &*ctx.accounts;` on line 398), so `ctx.accounts` is loaded in the
   entry block.  Codegen then sees the accounts pointer as a value from another block,
   and the remaining-accounts pointer load is scheduled after the account-field loads.
2. The admin sweep binds the three account infos it uses inside the loop before the loop
   (admin, admin_quote_ata, token_program; same line as `let mut total`), which gives the
   original preheader load order.
No line numbers change.  usage: python3 -B q04_o0075.py PROGRAMS_MAYHEM_DIR
"""
import sys
from pathlib import Path

p = Path(sys.argv[1]) / 'src/instructions/fee_recipients.rs'
s = p.read_text()
n0 = s.count('\n')


def rep(old, new):
    global s
    assert s.count(old) == 1, (s.count(old), old[:80])
    s = s.replace(old, new)


SIG = "pub(crate) fn sweep_fees_admin<'info>(ctx: Context<'info, crate::SweepFeesAdmin<'info>>) -> Result<()> {\n"
REQ = "    require!(ctx.remaining_accounts.len() == 16, crate::MayhemError::AccountTypeNotSupported);\n"
rep(SIG + "\n" + REQ + "    let amount = ctx.accounts.sweep(ctx.remaining_accounts)?;",
    SIG + "    let accounts = &*ctx.accounts;\n" + REQ + "    let amount = accounts.sweep(ctx.remaining_accounts)?;")
rep("impl<'info> crate::SweepFeesAdmin<'info> {\n    fn sweep(&self, remaining_accounts: &'info [AccountInfo<'info>]) -> Result<u64> {\n"
    "        let native = self.quote_mint.key() == anchor_spl::token::spl_token::native_mint::ID;\n        let mut total = 0u64;\n",
    "impl<'info> crate::SweepFeesAdmin<'info> {\n    fn sweep(&self, remaining_accounts: &'info [AccountInfo<'info>]) -> Result<u64> {\n"
    "        let native = self.quote_mint.key() == anchor_spl::token::spl_token::native_mint::ID;\n        let mut total = 0u64;"
    " let admin: &AccountInfo<'info> = self.admin.as_ref();"
    " let admin_quote_ata: &AccountInfo<'info> = self.admin_quote_ata.as_ref();"
    " let token_program: &AccountInfo<'info> = self.token_program.as_ref();\n")
rep("anchor_spl::token::transfer(CpiContext::new_with_signer(self.token_program.key(), anchor_spl::token::Transfer { from: ata.to_account_info(), to: self.admin_quote_ata.to_account_info(),",
    "anchor_spl::token::transfer(CpiContext::new_with_signer(token_program.key(), anchor_spl::token::Transfer { from: ata.to_account_info(), to: admin_quote_ata.to_account_info(),")
rep("**self.admin.to_account_info().try_borrow_mut_lamports()? += lamports;",
    "**admin.to_account_info().try_borrow_mut_lamports()? += lamports;")
assert s.count('\n') == n0
p.write_text(s)
print('q04 applied to', p)
