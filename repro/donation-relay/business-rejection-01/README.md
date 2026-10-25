# Relay first business-rejection run: retained diagnostic mismatch

The single authorized run of the frozen three-case `business_rejection` group stopped after its first case, exactly as specified. The process exited **1**. **Zero comparisons passed; one case was attempted; two cases were not run.** This failure is separate from the previously accepted twelve ordinary successes and does not add successful coverage to any core-program count.

`donation_message_too_long` sends the frozen ordinary token-donation transaction with a 256-byte message. The original and build04 candidate both returned `Custom(6009)` / `InvalidMessageLength`. Their complete inner instructions, return data, before/after state, fees and rollback match. The only difference after the already approved removal of metering lines is:

```text
Original:  Program log: AnchorError thrown in programs/contracts/src/tools/checks.rs:55. Error Code: InvalidMessageLength. Error Number: 6009. Error Message: Invalid message length.
Candidate: Program log: AnchorError occurred. Error Code: InvalidMessageLength. Error Number: 6009. Error Message: Invalid message length.
```

These lines remain unequal in the full saved receipts. The verifier validates this retained failure; it does not relabel it as a passing comparison. The tip 10001 and insufficient-token-balance cases were **not executed**, and no retry, comparator change, source build or main-source edit followed.

The same transaction was submitted once to each binary, with two genuine test-owned signatures: two submissions, one unique signed transaction and four encoded signature fields. The original is `367f07a6…` / 830448 bytes; candidate build04 is `4954fdc4…` / 450016 bytes. All source, harness, fixture, runtime and binary inputs remain exactly bound by proposal seal `2ecc00fa48a19065fae6a2e8a43a9ab5ad4fe5de7c514b6fd3cd93faa118012c`, copied unchanged under `proposal/`. Signature, blockhash and transaction-history checks remained enabled; the ordinary ComputeBudget instruction was unchanged. Full raw output, exact signed bytes, launch arguments and numeric exit are retained under `run/`.

## Existing-byte cause

Five complete original windows and their direct calls are bound under `evidence/`: message check 104 [114032,114568), shared donation 112 [131136,141384), AnchorError conversion 284 [652392,652528), error report 286 [652688,652752), and AnchorError logger 289 [655256,657016).

- Shared donation 112 calls message check 104 at 131256, before the tip check at 131320.
- The branch at 114048 accepts unsigned length <256. The failure path writes code 6009 at 114368.
- At 114344/114360 it stores path pointer 755233. The exact 38 bytes are `programs/contracts/src/tools/checks.rs`. At 114384 it stores line 55; at 114392 path length 38; at 114400 Source-origin tag 0. Compared-values tag 2 at 114376 means no comparisons.
- Call 114440→652392 copies the 160-byte rich error into its allocated representation. Logger 289 tests Source tag 0 and chooses the source-bearing format. This matches the actual original error log.
- Current `handlers.rs` invokes `require(...,6009)`, which constructs only `Error::Code`. `error_report.rs` explicitly passes origin=None for that variant and emits the originless format. This was already an explicit business-diagnostic limitation in the preserved runtime-source report.

The evidence establishes missing source-origin metadata. It does not establish historical Rust file contents, file layout, or a uniquely reproducible compiler recipe.

## Minimal uncompiled natural-origin proposal

`source-origin-proposal.patch` changes only three of the 21 retained source/lock files:

1. `lib.rs` adds a `LocatedCode` variant and a `require_at` constructor carrying a static file and line.
2. The single message-length guard in `handlers.rs` calls `require_at(...,file!(),line!())` at its actual source location. Its predicate, code, order and successful path are unchanged; unrelated guards remain untouched.
3. `error_report.rs` reports that natural origin and lowers it to the same `ProgramError::Custom(code)`.

This repairs the missing **kind of metadata**, but **does not recover the original path/line and would not make this strict comparison pass**. No captured path or line is hardcoded into new executable source, and no artificial file movement, padding or compiler flag is proposed. The actual historical tuple remains evidence only. A source-origin representation change can alter enum/layout/resource/code generation; it is uncompiled and untested, and no new runtime acceptance is claimed. A build merely to replace this known mismatch with a different location mismatch is not justified by the current evidence. Parent review should decide whether to preserve this as research or pursue an authentic source-layout lead; the strict failed row must remain unresolved.

## Verify saved evidence

```sh
python3 -B work/relay-business-rejection-01-handoff/verify.py
work/test-env/bin/python -B work/relay-business-rejection-01-handoff/verify.py --runtime
```

The verifier binds the unchanged proposal and all run inputs, independently parses the transaction and privileges, checks its fixed blockhash and exact instruction bytes, verifies rollback and the sole diagnostic mismatch, redecodes the original raw windows/metadata writes, and reproduces the exact three-file proposal diff. `--runtime` additionally verifies the two actual Ed25519 signatures (the same bytes appear in both receipts) and the already frozen proposal runtime. It does not create a VM, construct a transaction, compile source or execute a target. The known runtime failure remains explicitly reported as `runtime_comparison_passed: false` even when evidence verification succeeds.

Eight copied-package checks passed: base/runtime verification, missing receipt, fabricated pass, erased diagnostic mismatch, altered signature, altered original metadata and restored acceptance. The four modified JSON objects were resealed deliberately to check semantic rejection, not only payload checksums. These tests execute no target and do not alter the preserved original rejection receipt.
