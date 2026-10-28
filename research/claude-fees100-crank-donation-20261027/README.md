# Fees: complete byte-identical reconstruction — CrankDonationFeePda recovered (585/585, whole ELF equal)

**Result: 585 / 585 normalized original Fees functions (+1 vs the 584-function parent), 585 raw-local, 585 compiled windows.**
Newly matched original windows: 147944. No normalized match is lost
(raw-local lost: none). **The stripped candidate is byte-identical to the complete meaningful ELF of the captured original** (873,256 bytes; the remaining 75,688 bytes of the capture are all zero loader allocation).

Parent: the 584-function Fees research frontier (PR #385 CreateDonation on the qualified Sweep source) (Linux symbols `404a734e539dab46…`, rebuilt here byte-for-byte). Only the files listed in
`source.patch` change.

## CrankDonationFeePda recovery — the last Fees function

The reconstructed `#[program]` handler `crank_donation_fee_pda` matches the complete original window **147944
(1,950 instructions / 15,976 bytes)**. Every original Fees function now has a normalized **and raw** byte-equal
counterpart: **585/585 normalized, 585/585 raw-local, all 799,648 `.text` bytes**. With the existing layout recipe
(`ordered.ld` re-bound by `relayout.py`), the stripped build is **byte-identical to the original program's complete
meaningful ELF**. This confirms the end state proven in `research/claude-fees100-whole-elf-endstate-20261027`.

Source change: two files on the 584-function parent, `programs/pump-fees/src/lib.rs` and `programs/pump-fees/src/donation.rs`.
- **Handler, native arm:** `let donation = ctx.accounts.donation_fee_pda.to_account_info();`, then
  `match crate::donation::sync_native_excess(&donation, &mut ctx.accounts.donation_fee_pda_ata, &ctx.accounts.rent)?`
  with `Some(amount) => amount` and `None => return Ok(())`.
- **Handler, non-native arm:** computes the amount and keeps its own `msg!("Nothing to donate")`. This is the original's
  second log site. The relay CPI uses the direct receiver.
- **Helper:** `fn sync_native_excess(donation: &AccountInfo, ata: &mut Account<TokenAccount>, rent: &UncheckedAccount)
  -> Result<Option<u64>>`, a plain fn with no attributes. It reads the rent sysvar, computes
  `minimum_balance(218)` and the saturating excess, then moves the lamports. It then invokes SyncNative with three
  metas (`TokenInstruction::SyncNative.pack()`), reloads the token account and returns `Ok(None)` after the
  "Nothing to donate" message when the amount is zero.
- **Event:** `DonationFeePdaCranked` uses the standard `#[event]` serialization.

Why it reproduces the original. The last residual was register allocation around the SyncNative account-meta /
`pack` / account-info-clone region:
- With `rent: &AccountInfo`, the inlined helper parameter is `noalias readonly`. LLVM then attaches scoped-noalias
  metadata, so GVN reuses the `rent.key` pointer loaded for the `AccountMeta` (before `pack`) in the account-info
  clone (after `pack`). That pointer occupies a callee-saved register across `pack`, and the `AccountInfo` pointer is
  spilled and reloaded.
- The original instead reloads `rent.key` after `pack` (`ldxdw r3,[r6+0]` at body offset 13264). So its rent
  `AccountInfo` was not behind a noalias parameter.
- Passing the Anchor wrapper `&UncheckedAccount`, from which the `AccountInfo` is loaded, carries no noalias scope and
  yields exactly the original code. This was proved first with `llc` on the candidate IR, then by building it.
- `let rent: &AccountInfo<'info> = rent.as_ref();` at the top of the helper gives the same bytes.

Behavior is unchanged: same checks, CPIs, events and errors. Reload is equivalent to `try_borrow_data` +
`try_deserialize` + `set_inner`, and Borsh serialization of the event is equivalent to the per-field encoding.

Found by the fees100 Claude lane crank-brute. The crank-transfer and crank-derive lanes reached the same match
independently minutes later. It builds on the earlier crank-b lane's source and on PRs #271, #302 and #304 and
Codex's Crank research (callee multiset, frame analysis).

## Build and validation

- Canonical Linux v1.44 build (`sbpf-solana-solana`, `cargo rustc --release --locked --offline`, vendored macro at the
  parent's `/work/next637/vendor/used-public` path, `layout/ordered.ld` re-bound to the changed sections with
  `relayout.py` from research/claude-fees100-whole-elf-endstate-20261027 and applied through a linker wrapper,
  pinned v1.52 `llvm-objcopy --strip-all`): candidate `5b6ceda57863f0dcc3e0e3623052f8342c2c81883379699e71d7ed5383cb3dcf`, symbols `7ec99a6915bcb9245a2d5199996376a76651fa893c71e455b189cf59428f4e66`. A second build reproduced both hashes.
- Runtime: `scripts/fees_validate_all.py` passes **17,331 cases across 18 suites** with
  zero mismatches against the captured original.
- No assembly, captured instruction fragments, padding or post-link rewriting. `source/` is the complete workspace
  (program inputs, layout recipe and the vendored `anchor-attribute-program` with `#[used]`, inherited from the parent).

```sh
python3 -B research/claude-fees100-crank-donation-20261027/verify.py
```

The verifier rejects extra/symlinked/special files and optimized Python, re-hashes both ELFs, recomputes the
normalized/raw window sets with `research/fees-composed-frontier188/window_map.py`, checks the gained windows against
the included parent ELF, re-derives `source.patch`, and checks the runtime summary binding.
