# fz-P-srf-r3-01 (base L36 1016/1035 -> 1017/1035, raw 168; +0x6fef8; 0 normalized / 0 raw losses)

Window: 0x6fef8 `set_reserved_fee_recipients` (9176 B) - now normalized-equal (ratio 1.0000, same size).
Files changed (patch.diff vs base/L36/pump): `src/lib.rs` (lines 295-300 only) and `src/set_reserved_fee_recipients.rs`.
Line-neutral: lib.rs keeps 3215 lines and all 75 `// layout-pad` lines; in set_reserved_fee_recipients.rs the handler's
Source sites sit on the original's lines (require_gte! :40, require_keys_neq! :60, decoded from the original window) and the
private helper `rent_exempt_error` is appended at the file end (after every other site; 124 -> 128 lines). synthetic_layout: false.

## Source changes (behaviour-preserving: same checks, errors/codes, account-name strings, writes, event and CPI order)
1. (fz-P-sweep-r1/r2, ported from L33) The handler lives in set_reserved_fee_recipients.rs (original file tree); lib.rs:295
   delegates `crate::set_reserved_fee_recipients::set_reserved_fee_recipients(ctx, whitelist_pda)` and keeps 5 blank lines.
   Body: require_gte!(len, 8usize) (shared (usize,usize) with_values instance), recipients via
   `collect::<Vec<Pubkey>>().try_into().map_err(|_| ErrorCode::AccountNotEnoughKeys).unwrap()`, `[Pubkey; 7]` rest local
   copied with `copy_from_slice`, `Rent::get()?` once before the loop, `try_data_len()?`, executable error via
   `with_account_name(format!(..))`, rent error via the private helper `rent_exempt_error(error, name: String)` ->
   `with_owned_name(error, &name)`, tail `Ok(())`.
2. (this lane) Validation loop written as a block-scoped iterator + `while let`:
   `{ let mut accounts = remaining_accounts.iter().take(8).enumerate(); while let Some((index, account)) = accounts.next() { .. } }`.
   `while let` gives a Some-first switch, so rustc codegens the loop body (and creates the loop-scope StorageDead join block)
   before the post-loop code; the block scope keeps the iterator's StorageDead out of the function-scope drop chain. That
   reproduces the original's block order (fz-P-sweep-r2 IR proof: moving that join block right before the function-scope
   drop block -> .9973). Same mechanism as the AMM srf handler (fz-A-srf-r3-01). Same iteration, same checks.
3. (this lane) `let remaining_accounts = ctx.remaining_accounts; let global = &mut ctx.accounts.global;` bound before the
   require_gte (both are plain field reads; no check moves): gives the original's entry load order (ctx.accounts [r2+8]
   loaded before remaining_accounts.ptr [r2+0x10]).

## Binary evidence
- Multiplex build mx1 (6 variants in one build, lane res/mx1.txt): port .9854, block-scoped while-let .9954, + remaining/global
  lets first .9982 where the only remaining differences were the two Source line immediates of the multiplexed copy.
- Real build (lane res/srf1): normalized 1017, raw 168, gains [0x6fef8], losses [], raw_gains [], raw_losses [], runtime_valid,
  no stack warnings; window ratio 1.0000. Rebuilt in a second work dir (res/srf1b): identical unstripped sha256 b21810c5...
- Call list (lane tools/callseq.py): 68 calls in the original and in ours, all the same callees except the rent path's format!
  call: the original calls the out-of-line `alloc::fmt::format`, ours inlines it and calls `format_inner` directly (normalized
  bytes identical; call targets are masked). Relevant only for raw readiness; see the lane PROGRESS.md.
