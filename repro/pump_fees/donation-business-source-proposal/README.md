# Donation creation business-source hypothesis

This package proposes a natural implementation of the recovered `create_donation_fee_pda` handler flow. It is **uncompiled and unexecuted**, has no candidate ELF or new receipts, and is not an accepted equivalent implementation. Main source is unchanged. Root review is required before choosing a build or normal-operation validation cases.

The baseline is the accepted `donation-event-account-v144` package, manifest `a544615738c62279f1ebfd9dae4107b1db5640ac55f05d25f65e939933f91340`, executable SHA-256 `8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e`. All 26 actual source/workspace/IDL inputs are frozen in `source/`; only `programs/pump-fees/src/donation.rs` differs. `source.patch` is the exact integration diff. No lock, IDL, declaration, other handler, build profile, flag or source path changes are proposed.

The reviewed CLI evidence is retained unchanged in `inputs/business-branches-publication.tar.gz`, including its original `39fd03b09e8f07d29ccd3fac6ebf59d609ccb87f5b52369fb6822abbb0e8dbe5` seal. Its source checkpoint is 4d3c19e and its candidate is 8cce. The full historical donation source is explicitly rebound to the accepted 8f source: the only Rust difference is the previously approved first event-authority field becoming **AccountInfo**. That accepted field and the entire current context declaration are retained byte-for-byte. The proposal does not copy the old UncheckedAccount type back. Existing parser/wrapper matches are baseline evidence; no post-proposal compiled-body match is predicted.

## Proposed behavior

1. Check disable bit 4, log the exact disabled message and return FeatureDeactivated. Then check nonzero version, log the existing-account message and return success. Account parsing/init_if_needed still precedes this handler.
2. Test real SOL, virtual SOL, real token and virtual token reserves in that original order. Any nonzero value selects the curve path; all zero selects the pool path. The existing IDL's SOL-reserve spelling is preserved; no complete, supply, mode or amount predicate is added.
3. In the curve path, clone the accepted BondingCurve AccountInfo. Length below 115 yields zero quote bytes. Length at least 115 reads exactly data[83..115], using the observed shared RefCell borrow behavior. A zero pubkey becomes wrapped SOL; any nonzero key remains unchanged. Creator comes from the already decoded curve. The raw extension is not added as a guessed field to the BondingCurve IDL or decoder.
4. The pool branch keeps the current owner, borrow, decoder, base mint, derived creator, PDA construction and pool-key checks in their existing order. It returns coin_creator and quote_mint without the curve's zero/native fallback. The lexical branch scope releases its data borrow before shared authorization, consistent with the original convergence cleanup.
5. Both paths share creator authorization. If creator equals sharing_config.key: Fees owner, explicit nonempty data, shared borrow, SharingConfig decoding, base mint, payer equals admin, admin not revoked, then active status. Otherwise payer must equal the selected creator. This restores payer-before-revocation precedence and the original empty-data guard.
6. Preserve state-field initialization, zero counters/reserved bytes, then Clock, event log and event CPI, using the selected quote and authorized creator. No amount, reserve mutation, relay invocation or transfer is introduced.

`source-decisions.json` binds each choice to exact original ranges and its limitations. The complete proposed function is also in `proposed-create.rs` for review; it is exactly the function inserted in the one-file patch.

## Framework choices

The exact locked public archives are included and checksum-bound to the unchanged Cargo.lock: anchor-lang 0.31.1, anchor-syn 0.31.2, solana-account-info 2.3.0, and solana-pubkey 2.2.1. Seven selected source members are retained and verified against their archive members. No dependency version was changed, downloaded or enumerated.

The original curve branch calls data_len and then performs an inline infallible shared borrow, including its panic path. AccountInfo::data_len uses `data.borrow().len()`; `try_borrow_data` instead returns AccountBorrowFailed. Accordingly the hypothesis uses `info.data.borrow()` for the raw curve extension, while preserving `try_borrow_data()?` for Pool and SharingConfig decoding. `copy_from_slice` expresses the exact 32-byte slice; its generated bounds/cleanup behavior is not yet validated. Pubkey::new_from_array simply wraps those bytes in the locked source.

The original disabled exit converts FeeError index 21 directly at 164080; the revoked exit converts index 9 at 177016. Their later paths do not augment a source origin or compared values. The locked generated `From<FeeError>` uses `None` for both, so those two branches use `Err(FeeError::...into())`. In contrast, the original empty-sharing-data error constructs source-origin code 6007 (original line 197), supporting a plain `require!` for that guard. Existing `require_keys_eq!` checks retain their key-comparison form. This is a grounded macro choice, not a claim of exact error-ABI or historical-coordinate equality.

Existing typed BondingCurve/Pool/SharingConfig declarations and their decoder calls are unchanged. The source uses the exact existing BondingCurve IDL fields, and the retained approved binary decoder ledger supplies their original context mapping. Complete decoder compatibility, nested types, malformed-input behavior and drop paths remain separate obligations. No generated IDL/type replacement is attempted.

## Remaining uncertainty

The proposal has not been parsed, typechecked, compiled, disassembled or executed. Natural code can generate different bodies, register choices, layout or cleanup. Adding the handler lines also moves truthful macro source coordinates. No padding, path remapping, inline attributes, synthetic callsites or compiler variants are used to imitate historical diagnostics.

RefCell/data alias behavior, borrow and bounds panics, allocation and decoder/Rc drop paths, complete error objects and nested literals, PDA syscalls, event invocation, final account serialization and runtime rollback remain incompletely proved. These limits do not prevent writing this source hypothesis, but they prevent accepting it as original-equivalent. Existing saved receipts apply to the accepted 8f baseline, not to these unbuilt bytes. This package authorizes neither a build nor new fixtures/signatures; root will decide the next validation step.

Run `python3 -B verify.py` from any directory. It checks the package seal, accepted source/build records, all 26 baseline/proposed inputs, the exact one-function diff, current AccountInfo declaration preservation, historical-to-current field rebind, locked archive members and the unchanged CLI static verifier. Optional `--current-main /path/to/repo` checks that the accepted 26 inputs still match the live checkout. Verification does not compile or execute any Solana program.
