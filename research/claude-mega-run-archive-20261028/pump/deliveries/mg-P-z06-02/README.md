# mg-P-z06-02: +0x6a8a8 (add_quote_control_mint) on top of +0x6a1e0 (control_entry); 967/1035 normalized, 165 raw, base L14

Cumulative vs base L14 (965). Files: `src/quote_control/state.rs` (0x6a1e0, same change as mg-P-z06-01) and
`src/quote_control/update_quote_control_mints.rs` (0x6a8a8). Line-neutral: the only Source site in
update_quote_control_mints.rs (line 71, Overflow error!) stays on line 71; the helper is appended at the end of the file.

## 0x6a8a8 add_quote_control_mint: what changed
1. Line 71: lazy `.ok_or_else(|| error!(PumpError::Overflow))` (the original builds the error only on the overflow path).
2. new_len/new_space as ONE statement: `let new_space = QuoteControl::space(quote_control.mints.len().checked_add(1)
   .ok_or_else(|| error!(PumpError::Overflow))?)?;` (nested `?`). The space() Result temp is then live across the
   overflow-error construction (MIR StorageLive before argument evaluation), so stack colouring no longer folds it into
   the 184-B CpiContext slot: it lands at -0xe0 like the original (was the last residual: 4 insns).
3. Rent top-up: `let lamports_diff = Rent::get()?.minimum_balance(new_space).saturating_sub(info.lamports());
   pay_rent(&ctx, &info, lamports_diff)?;` with a private helper
   `fn pay_rent(ctx: &Context<..UpdateQuoteControlMints>, to: &AccountInfo, lamports: u64) -> Result<()>
   { if lamports > 0 { transfer(CpiContext::new(ctx.accounts.system_program.to_account_info(),
   Transfer { from: ctx.accounts.authority.to_account_info(), to: to.clone() }), lamports)?; } Ok(()) }`.
   `quote_control` is re-borrowed after the if (needed because the helper borrows ctx).

## Binary evidence
- Before: the system_program/authority AccountInfo::clone calls were OUT OF LINE (cold call site: BFI of the transfer block
  1.56% of entry < 2%, cost 60 > 45; print-bfi + inline remarks). Inside a private helper the transfer block is hot (clones
  inlined while the helper's SCC is processed), and the helper call site (6.25%) is not cold, so the whole helper inlines.
- usub.sat(required, lamports) stays BEFORE the `required > lamports` branch (original: saturation code, then
  `jle required, lamports`), because its use (the helper call) is no longer in the immediate successor block.
- `&Context` instead of `&AccountInfo` params: the authority AccountInfo pointer ([accounts+0x520]) is loaded through the
  non-noalias ctx.accounts pointer after the system_program clone's Rc stores (original order); with `&AccountInfo`
  params it was loaded at the call site (6336 B, .946), with `&Signer`/`&Program` params it was hoisted by scoped noalias.
- Diagnostic only (not delivered): -Cllvm-args=-cold-callsite-rel-freq=0 confirmed the clone-inlining hypothesis.
- Behaviour: same checks, same CPI (system_program::transfer from authority to quote_control, only when the account
  needs lamports), same realloc/push/event/emit_cpi order; the window is byte-identical (normalized).
- Measured: rebuild of this exact tree (nbuild, identity recipe): norm 967, raw 165, gains [0x6a1e0, 0x6a8a8], no losses,
  runtime_valid true, no stack warnings.
