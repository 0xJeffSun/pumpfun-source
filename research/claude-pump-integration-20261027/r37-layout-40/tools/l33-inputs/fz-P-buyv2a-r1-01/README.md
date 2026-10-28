# fz-P-buyv2a-r1-01: 0x14910 admit_associated_token_account (base L31 -> 991/1035, raw 166)

Gain: 0x14910 (6080 B, buy_v2.rs sites 55/60/81/88). Losses: none (normalized and raw). Runtime valid, no stack warnings.
Only src/buy_v2.rs changes, 3 lines edited in place (line-neutral; all Source sites stay on their lines).

Changes (lines 10, 59, 61 of buy_v2.rs):
1. `payer: *const AccountInfo<'info>` instead of `&AccountInfo<'info>`; inside the create path `let payer=unsafe{&*payer};`.
   Call sites are unchanged (`&AccountInfo` coerces to `*const AccountInfo`); the pointer is only used during the call.
   Evidence: the original re-reads payer.key after the create_associated_token_account_idempotent call
   (`ldxdw r5,[payer+0]` after the call). With a `&AccountInfo` param rustc emits `noalias` and GVN reuses the key pointer
   loaded before the call; that changes register allocation for the whole function (orig keeps payer in r7, owner in r6,
   token_program in r2). Proof: removing only `noalias` from %payer in the pre-optimization IR (clang -O3 replay of rustc's
   pipeline) reproduces the original register allocation. A capture of payer (store to a global) does NOT; reference
   wrappers (&Signer, &UncheckedAccount, &SystemAccount, &&AccountInfo, Option<&AccountInfo>, by-value Signer/
   UncheckedAccount) either keep noalias or add a deref; `*const` and `NonNull` both match.
2. `let needs_create=account.owner==&anchor_lang::system_program::ID; if needs_create {` (bool bound before the `if`):
   gives the original `jeq ok,+1; ja err` after invoke (an unrelated block between the invoke block and its Ok block in IR
   order); the plain `if account.owner==&ID {` form puts the Ok block next (`jne err`).
3. Create call keys `&payer.key(),&authority.key()` (32-byte copies as in the original) instead of `payer.key,authority.key`.

Behavior: identical checks, error codes, CPI and order; the window is byte-equal to the original (normalized), so the
compiled function is the original's.
Tools/notes: lanes/fz-P-buyv2a-r1/sw (multiplex IR sweeps, IR block-move and branch-weight searches), progress in
mega-run/lanes/fz-P-buyv2a-r1/PROGRESS.md.
