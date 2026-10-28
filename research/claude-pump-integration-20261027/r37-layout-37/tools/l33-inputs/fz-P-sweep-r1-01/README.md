# fz-P-sweep-r1-01: +0x75308 claim_token_incentives (L31 -> 991/1035, raw 166)

Base: L31 (source-only, 990/1035, raw 166). Build: lanes/mg-P-int/tools/nbuild.py identity recipe, runtime_valid, no stack warnings.
Score: normalized 991, gains [0x75308], losses [], raw_gains [], raw_losses [].

Change (src/token_incentives/claim_token_incentives.rs, `claim`, line-neutral):
- Transfer CPI moved into a nested private `fn transfer<'info>(decimals: u8, token_program, mint, from, to, authority: &AccountInfo<'info>, signer_seeds, amount) -> Result<()>`
  (body: transfer_checked(CpiContext::new_with_signer(token_program.clone(), TransferChecked{from,mint,to,authority clones}, seeds), amount, decimals)).
  Caller: `{ let token_program = accounts.token_program.as_ref(); let authority = accounts.global_volume_accumulator.to_account_info(); let signer_seeds = ...;
  transfer(accounts.mint.decimals, token_program, accounts.mint.as_ref(), accounts.global_incentive_token_account.as_ref(), accounts.user_ata.as_ref(), &authority, signer_seeds, amount)?; }`
- Tail `Ok(())` instead of `return Ok(());`.
- emit!(event); emit_cpi!(event) instead of the hand-written event self-CPI (identical instruction).

Binary evidence (win.py show 0x75308): orig loads token_program's info pointer during the authority clone, then to/from/mint/decimals
pointers together before the clones (= caller-evaluated &AccountInfo args of an inlined helper), drops one AccountInfo (authority) after
the CPI (caller-held clone), and builds the 280-B CpiContext at the frame top (inlined callee alloca). Param order (decimals, tp, mint, from, to)
reproduces the original load order; tail Ok(()) moved the return block out of the post-CPI fallthrough (IR proof: moving bb25 gives 5920 B).
Behavior: same CPI accounts/seeds/amount/decimals and the same order of update, "No tokens to claim" msg, record_claim, emit, emit_cpi.
Runtime corpus not run here (integrator runs harness/regress.sh on the package).
