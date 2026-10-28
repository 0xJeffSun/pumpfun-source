# mg-P-cash-01: 0x76a28 claim_cashback body (cashback::claim), L27 + 1 window = 987/1035 normalized, 166 raw

Base: WP/base/L27 (986/1035, raw 166). Only file changed: src/token_incentives/claim_token_incentives.rs, lines 152 and
251-254 (line-neutral: line 251 and 253 were blank pad lines of the existing layout-pad block; every other Source site is
unchanged; the Overflow error! stays on line 252 = the original's recorded line). No losses, no raw losses, no stack warnings.

## Source form (claim)
```
let user_volume_accumulator=&mut ctx.accounts.user_volume_accumulator;let timestamp=Clock::get()?.unix_timestamp;
let min=Rent::get()?.minimum_balance(user_volume_accumulator.to_account_info().data_len());
let amount=user_volume_accumulator.get_lamports().saturating_sub(min);if amount==0{msg!("No cashback to claim");return Ok(());}
user_volume_accumulator.sub_lamports(amount)?;ctx.accounts.user.add_lamports(amount)?;            // line 251
user_volume_accumulator.total_cashback_claimed=user_volume_accumulator.total_cashback_claimed
    .checked_add(amount).ok_or(error!(PumpError::Overflow))?;                                   // line 252
let total_cashback_earned=user_volume_accumulator.cashback_earned;                                // line 253
let event=ClaimCashbackEvent{user:ctx.accounts.user.key(),amount,timestamp,
    total_claimed:user_volume_accumulator.total_cashback_claimed,total_cashback_earned};emit!(event);emit_cpi!(event);Ok(())
```

## Binary evidence
1. Body shape (Clock::get first, Rent::get, data_len/minimum_balance, lamports, saturating_sub, msg "No cashback to claim"
   (20 B), sub_lamports, add_lamports, eager ok_or(error!) = error built on both paths + drop_in_place<Error>, emit! +
   emit_cpi! without clone) = mg-P-z07 v/c1 / r5-z07 findings (0.8666 on L13 and L27).
2. Original reloads the uva info ptr `ldxdw rX,[r8+0x10]` before every lamports()/try_borrow_mut_lamports() call while
   keeping the accounts ptr in r8. A `&mut Account` local makes Lamports/ToAccountInfo resolve with Self=&mut Account
   (receiver &&mut Account): the inner pointer is not covered by the callee's noalias scope, so the [a+0x10] loads are not
   CSE'd across the out-of-line lamports() call. With `a.user_volume_accumulator.*` (Self=Account, noalias &self) the
   loads merge inside sub_lamports and the frame/regalloc shift (0.8666 -> 0.9679, 3864 B, 24 diff slots).
3. Remaining diff was the event store order (orig: ld cashback_earned, user key copy, then earned/total/ts/amount stores).
   llc proof on the saved IR: every order with the cashback_earned load AND the total_cashback_claimed store BEFORE
   lifetime.start(event) reproduces the original exactly (24 orders enumerated; tools/perm.py); source = read
   cashback_earned in a statement before `let event`. Result: byte-identical normalized window.
4. Multiplex experiments (never delivered): v/m1 (claim_b/c/d/f), v/m2 (claim_g/h/i/j): g/h/i = 2 diff slots = only the
   copies' own error! line constant; the in-place build (v/d1) matches.
Behaviour: the window is byte-identical to the deployed function (normalized), so behaviour equals the original by
construction; no other function changed bytes (gains [0x76a28], losses []).
