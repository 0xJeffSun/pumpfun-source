#!/usr/bin/env python3
"""q03: move the sweep panic sites to the original line:column locations.

Applies to the checkpoint-2 source (programs/mayhem/src/instructions/fee_recipients.rs).
Only whitespace and line placement change; no tokens are added or removed.
usage: python3 -B q03_columns.py PROGRAMS_MAYHEM_DIR
"""
import sys
from pathlib import Path

p = Path(sys.argv[1]) / 'src/instructions/fee_recipients.rs'
lines = p.read_text().split('\n')
n0 = len(lines)


def at(lineno, expect):
    got = lines[lineno - 1]
    assert got.strip() == expect.strip(), (lineno, got)
    return got


def pad_unwrap(prefix, col):
    # Location::caller() for `.unwrap()` reports the column of `unwrap` (1-based).
    assert len(prefix) <= col - 2, (prefix, col)
    return prefix + ' ' * (col - 2 - len(prefix)) + '.unwrap();'


xfer_trader = ("anchor_spl::token::transfer(CpiContext::new_with_signer(self.token_program.key(), "
               "anchor_spl::token::Transfer { from: ata.to_account_info(), to: self.trader_quote_ata.to_account_info(), "
               "authority: recipient.to_account_info() }, &[seeds]), amount)?;")
xfer_admin = xfer_trader.replace('self.trader_quote_ata', 'self.admin_quote_ata')
I12, I16 = ' ' * 12, ' ' * 16

# Trader (crate::SweepFees::sweep): transfer joins the `if` line, total unwrap at 276:84.
at(275, 'if amount > 0 {')
at(276, xfer_trader + ' total = total.checked_add(amount).unwrap();')
lines[274] = I12 + 'if amount > 0 { ' + xfer_trader
lines[275] = pad_unwrap(I16 + 'total = total.checked_add(amount)', 84)
# Trader lamports total unwrap at 296:86.
at(296, 'total = total.checked_add(lamports).unwrap();')
lines[295] = pad_unwrap(I16 + 'total = total.checked_add(lamports)', 86)

# Admin (crate::SweepFeesAdmin::sweep): transfer on 350, total unwrap at 353:84.
at(349, 'if amount > 0 {')
at(350, '')
at(353, xfer_admin + ' total = total.checked_add(amount).unwrap();')
lines[349] = I16 + xfer_admin
lines[352] = pad_unwrap(I16 + 'total = total.checked_add(amount)', 84)
# Admin lamports subtraction starts at 358:37.
at(358, 'lamports = recipient.get_lamports() - Rent::get()?.minimum_balance(pair[0].data_len());')
lines[357] = (I16 + 'lamports =').ljust(36) + 'recipient.get_lamports() - Rent::get()?.minimum_balance(pair[0].data_len());'
# Admin lamports total unwrap at 368:86.
at(368, 'total = total.checked_add(lamports).unwrap();')
lines[367] = pad_unwrap(I16 + 'total = total.checked_add(lamports)', 86)

assert len(lines) == n0
p.write_text('\n'.join(lines))
print('q03 columns applied to', p)
