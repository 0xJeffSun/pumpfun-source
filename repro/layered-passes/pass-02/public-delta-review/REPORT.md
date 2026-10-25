# Public source delta review — dff3b7d to AMM 2a8a69 / Fees 8ff12 / Pump metadata proposal

## Result and scope

**No concrete introduced correctness or security regression identified in the reviewed deltas. This is not security sign-off.** The full security audit remains incomplete. The review is static, limited to the nine changed source files and their relevant public source/byte evidence. It does not certify the programs, all inputs, all account relationships, or captured-original vulnerabilities.

AMM and Fees root source match the exact reviewed packages. At the sealed observation, Pump's four root files still match published `dff3b7ddc64dc2ae1f3253252e096723998ce861`, not the metadata proposal. Therefore **all-three root promotion verification is not satisfied**. This is a source applicability gap, not an introduced vulnerability. `source-identity.json` retains the timestamp and every SHA-256. Recheck with the optional verifier after the parent promotes Pump; do not treat the future promotion as already observed.

`docs/COMPLETION.md` was read first and copied as evidence. Its older Fees checkpoint is supplemented by the public pass-02 report and `legacy-social-admission-v144` package identifying `8ff12…`. The old completion measures remain 140/150 bounded implementations and 0/4 original core ELF equality. Prior failures, seals, unresolved original windows and stopped lanes are not superseded.

No target execution, compiler invocation, new fixture, transaction, exploit, network, subagent, main edit or git mutation was performed. Only public main/source packages were read. Pump bodies outside exact error declarations/substitutions are opaque; excluded lane semantics were not reviewed. The hash inventory of other tracked source files is identity accounting, not semantic review.

## Exact source applicability

| Group | Exact review input | Changes from dff3b7d | Root at sealed observation |
|---|---|---|---|
| AMM | `repro/layered-passes/pass-02/review-candidates/amm-destination-rent/source` | One argument in `transfer_creator.rs` | Exact match |
| Fees | `repro/layered-passes/pass-02/review-candidates/fees-legacy-social/source` | `donation.rs`, `sharing_update.rs`, `social.rs`, `instructions/fee_sharing/mod.rs` | All four exact matches |
| Pump | `repro/pump/final-error-metadata-source-proposal/proposal` | Error declarations in `lib.rs`; eleven exact token substitutions in three callers | All four still baseline |

The standalone verifier applies the public patches strictly, with exact hunk bytes and no fuzzy matching, to the frozen baseline files. AMM's single patch, Fees' predicate/ownership then legacy/social patches, and Pump's metadata patch reproduce all nine complete reviewed files. It separately regenerates the nine baseline-to-reviewed diffs and verifies the eleven Pump substitutions leave all other bytes in those three files unchanged. Fees' Pool and SharingConfig clone-to-borrow changes already exist at dff3b7d; they are retained context, not new changes in this review.

All 22 AMM and 26 Fees main input bindings match their published maps; all 37 Pump inputs still match the proposal's frozen baseline. `input-bindings.json` records these checks.

The source inventory hashes every dff3b7d-tracked Rust/Cargo file in these three programs without interpreting unchanged bodies. The only observed changed tracked source paths are the AMM file and four Fees files. This is not an inventory of arbitrary untracked main files. Whole-file source equality and known package identity do not authenticate a unique historical source tree.

Artifact hashes independently read during this review:

- AMM review executable: `2a8a69f1e2f91f470b9742fe1c7caa129fa9ea126d54588473e8e3d490b7e706`.
- Fees main package executable: `8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b`.
- Original AMM: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.
- Original Fees: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
- Original Pump: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.

The public pass-02 README calls the Pump review build `2aa18c73…`. This review binds the exact approved source proposal, not a separately published full 2aa18c build package. It does not independently authenticate that build's complete hash, receipt transfer, normalized body claims or runtime acceptance. Do not combine the baseline Pump receipts with the proposed source as if they executed it.

## Review observations, paths and original byte support

Line numbers below refer to `reviewed/programs/...`, whose full bytes are sealed. None of the following observations is a confirmed regression or assigned a vulnerability severity.

### AMM: rent admission and CPI order

`pump-amm/src/transfer_creator.rs:56` replaces only the destination rent size argument. The preflight remains `rent(165) + saturating_sub(rent(destination.data_len()), destination.lamports())`, with checked addition and the same Overflow conversion. The strict insufficient-vault comparison at line 57 remains an early successful no-op. For positive account size this can require more funding than the old zero-size calculation; that is the intended admission correction, not evidence that every live account now succeeds.

Context constraints at lines 14–20 and 33–42 still bind vault authority, canonical token account and canonical Pump destination. No signer, address, owner constraint, transfer recipient or seeds change. The new `data_len()` call uses an infallible RefCell borrow in the pinned account-info implementation. A conflicting existing mutable data borrow could panic; this is a coverage boundary, not demonstrated reachable from this unchanged context. No new borrow is held over a CPI.

Lines 58–60 retain close-to-authority, ATA **create selector 0**, then System transfer of the authority balance, with errors propagated. No new recovery catch or partial-success branch was added. Atomic rollback on propagated errors remains dependent on ordinary transaction semantics; this review does not execute a late failure. Unchanged authority funding and account closure behavior are not globally certified.

Fresh byte witnesses independently confirm candidate call `257392 → 1021224` (data length), return move at 257408, `257416 → 1014920` (rent), then the same r9 account's lamports read. Calls remain `260496 → 945672`, `261816 → 937832`, `262160 → 1006536` in order. The public ledger identifies complete normalized original counterpart windows at 1085256 (80 bytes) and 1077224 (400 bytes); those original bytes are retained in `byte-witnesses.json`. Matching helper bodies does not alone establish the original caller's full semantics. Original/candidate whole-file equality remains false.

### Fees: owned quote temporary and unchanged borrows

`pump-fees/src/donation.rs:59` and `:106–113` move the old quote read into a helper taking an **owned AccountInfo**. The zero buffer, length threshold 115, infallible borrow and exact bytes 83..115 stay unchanged; zero-to-native conversion still follows the helper. The data Ref ends inside the helper and the owned clone drops before the returned Pubkey is compared. It does not extend a data/lamport borrow into a state write or CPI.

Pool and sharing references at lines 67 and 79 were already borrowed at dff3b7d. Their data Refs stay local to their blocks, before donation state writes at line 95 and events at line 103. Existing owner, mint, PDA, payer/admin and active-status checks are byte-identical. Their security sufficiency for all inputs is outside this delta conclusion. The public predicate/ownership report retains original and compiled ownership ordering, and explicitly leaves the full donation body unmatched. Allocation/drop correspondence is not full historical Rust-source identity.

### Fees: sharing admission and AMM predicates

`pump-fees/src/sharing_update.rs:9–11` now evaluates the stored quote before version admission. `:48–52` admits short data (<115 bytes) and otherwise tests bytes 83..115 against zero. It does **not** equate explicit wrapped SOL with zero. The temporary AccountInfo and Ref drop before the Boolean require; there is no borrow across the following calls. An infallible-borrow panic is not relabeled a custom error. Earlier typed parser failures can still precede this helper.

Original bytes independently checked: call `193744 → 75880`; helper `75904 → 731512`; complete helper `[75880,76384)`; stores `194680: 620a20fe8f170000` (6031) and `195208: 620a20fe88170000` (6024). The public ledger retains plain Source origins and no compared-key augmentation. New stores at 510088 and 511968 retain these numeric errors. This supports the intentional changed error priority, subject to unchanged earlier parser checks; it is not an accidental authorization bypass.

Both legacy and V2 gates (`:14–18`, `:35–39`) now require all four reserves to be zero and ATA owner not System. The previous lamports-nonzero condition is removed. Original gate bytes beginning at 237576 and 240232 are retained, with the public predicate report documenting four-reserve/owner ordering. The call payloads, account metas, signers and following Pump call are unchanged. Downstream share validation, state assignment and events remain after the CPIs; errors still propagate. No selective rollback handler is introduced. Coverage of arbitrary reserve combinations and live zero-lamport account representation remains unresolved.

### Fees: social admission, caller order and error handling

`pump-fees/src/instructions/fee_sharing/mod.rs:17–42` implements the shared admission order: canonical ATA key, System-owner creation branch, creation flag, ordinary idempotent ATA CPI, exact supplied token-program owner, fallible data borrow/decode, then decoded mint. It does not invent a decoded-authority test. `social.rs:19–26` passes false for source creation and true for destination creation. Existing context seeds, typed programs and global `has_one` authority are unchanged at `social.rs:103–120`; ordinary signer privileges remain required.

Original complete helper `[243184,249264)` is retained as raw bytes. Independently checked calls include `243368 → 698680` for derivation, `248912 → 724296` for ordinary invoke, successful/error six-account cleanup at `248976/249208 → 40472`, and `245328 → 732088` / `245456 → 685664` for borrow/decode. Original data retain System ID, FeeError ordinal 29 (owner), and 30 (mint). The public ledger supplies both callers' false/true flags, constructor selector **1**, six AccountInfos, actual callees and error comparison fields. The candidate selector-1 store at 598544 and both admission calls at 403792/405840 were independently read. This is not a claim that every transitive callee or data object is equivalent.

Both admissions precede source amount extraction (`social.rs:27–31`), so destination validation/creation can still occur for zero source amount. Source decode propagates failure. Destination borrow also propagates failure, while destination decode defaults to zero (`:32–35`), as recorded by the original post-admission path. This apparent error suppression is part of the bounded original contract, not an unsupported new fallback: original destination error drop at 144400 and zero default at 144408 are retained in the public ledger. No CPI or account mutation intervenes between successful destination admission and the later destination decode in this source. All data Refs end before transfer at line 37; only then are totals and timestamp updated. Later propagated transfer/event failures retain ordinary transaction rollback. A successful zero-amount return may retain destination creation; this ordering is explicitly supported, not mislabeled rollback.

### Pump: metadata identity without branch relabeling

`pump/src/lib.rs:411–422` restores the authentic name/message at explicit ordinal 110 and puts the old unsupported-branch variant in a local enum at the same ordinal. The eleven substitutions in `create_v2.rs`, `trade.rs` and `multi_hop_curve.rs` are exact tokens only. Conditions, admission, calls, mutation order and branch reachability were not altered or reinterpreted. No original error call site is newly introduced. The separate migration error declaration remains unchanged and opaque.

Original bytes at 1793568 contain `6e000000` (110), at 1805262 contain `QuoteMintNotWritable`, and at 1810044 contain the 115-byte authentic message. The metadata-only construction block `[307992,308208)` calls name `308024 → 1405824`, ToString `308064 → 43320`, and stores 6110 at 308128. No business guard is inferred from this metadata block. The copied static ledger retains complete formatter windows and selector paths; normalized Display-body agreement alone did not imply equal message data.

The pinned macro generator uses variant name/message and `enum as u32 + offset`; it does not add containing-enum names to the public error name. Thus the local unsupported variant retains code 6110, name and message, while authentic metadata is separated. The duplicate numeric code is an explicit inherited compatibility limitation, not a unique-name guarantee for number-only clients. Real `error!` origins and natural source-line movement are retained. Binary layout, generated IDL behavior under other build features, and execution of the proposed source require their own evidence. The captured official IDL still stops at 6109.

## Finite tests and residual gaps

The review read the saved summaries, source packages and the two public Fees comparison harnesses; it did not execute them or independently reverify all saved signatures. Package-reported passes remain attributed to the packages:

- AMM: 17,462 comparisons / 35,418 saved signature checks; 267 transfer rows, including 24 destination-data rows and 100 rent-edge rows. The zero-lamport destination setup does not prove live nonempty-account behavior. Transfer equality compares error, selected states, events and inner instructions, not every log or execution step. The external 8/267 claim remains unverified.
- Fees: 17,441 baseline +20 focused comparisons and a separate ten-step sequence, all existing inputs. Social/sharing harnesses compare error, before/after watched account snapshots, events, inner instructions and return data. Executable accounts are excluded from those snapshots; ordinary logs are retained but not in these equality expressions (`fees_social_claim_v2_differential.py:86`, `fees_sharing_update_differential.py:141`). The social baseline uses `with_transaction_history(0)` at line 17; passing its signatures does not prove default duplicate-history behavior. The review did not alter or rerun that historical harness. The focused suite's separately reported controls must not be generalized to every baseline harness.
- Pump: the public pass-02 report describes the 2aa18c review build, while the copied exact metadata proposal is source-only. No new execution claim is made here. Root promotion and complete build/receipt binding remain outstanding at the sealed observation.

Remaining gaps include realistic destination account liveness, exhaustive reserve combinations, borrow conflicts/aliasing, full diagnostic identity, all late CPI/error paths, remaining-account preprocessing, V2 payout, transitive callees/data, historical compiler/dependency/source provenance and whole-original binary identity. Unchanged or excluded code has no implied review approval. Additional evidence is required for security sign-off even if future root source matches all three proposals.

## Delivery and verification

`manifest.json` lists exact payload bytes/hashes; `manifest.sha256` seals it. The external `ownedmap.json` is the sole publication allowlist, including portable verification receipts. Do not copy the entire worker directory. No CLI telemetry, cache, keypair or full unrelated binary inventory is part of this payload.

Run `python3 -B verify.py` from any copy with Python's standard library. It checks the exact payload set and seals, source snapshots, strict patch composition, byte-witness direct-target arithmetic and copied upstream member hashes. It does not run the upstream verifiers or regenerate full function inventories.

Optional `--repo /path/to/pumpfun-source` also checks bounded raw witnesses against their original public ELFs and classifies current changed source files as reviewed/baseline/OTHER. `--require-all-promoted` adds a strict all-nine-reviewed check, expected to fail while Pump remains baseline. Standalone integrity success therefore does not imply promotion success. Copied upstream seals are preserved without modification; only selected public members are rechecked here, not whole upstream packages.
