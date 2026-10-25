# Fees donation business reconstruction — clean main v1.44 checkpoint

The reviewed donation handler is integrated with a clean main build. **The complete ELF and unstripped symbol file are byte-identical to the tested scratch build02.** Its saved evidence covers **17,461 comparisons**: 17,441 unchanged baseline comparisons plus focused20, comprising eight repeated inputs and twelve new typed synthetic combinations. The ten-step donation sequence is separate. Fees remains **31 bounded instruction bodies**; exact whole-contract recovery remains **0/4**.

Candidate SHA-256: `fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2`, **770,744 bytes**. Symbols SHA-256: `0c85263619cd44252e91d412aa82294879740089e2eef3c4feb47ab9f94e8fd1`. Original SHA-256: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. Original whole-file equality and complete donation-handler normalized equality remain false.

## Accepted change and build

Only `programs/pump-fees/src/donation.rs` and its README changed from the [prior event-account checkpoint](../donation-event-account-v144/README.md). Exact Rust SHA is `a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9`. The source restores the two early logs and reserve-dependent BondingCurve path, including the raw quote extension threshold/range and wrapped-SOL fallback. It preserves the typed Pool/sharing accounts, original borrow scopes, guard order, state writes and event CPI. Separately evidenced corrections preserve origin-free PDA derivation errors, omit compared keys for shared-admin rejection, and order direct-creator/Pool compared keys as observed in the original.

All26 actual main inputs, including the finalized README, are archived. The reviewed patch, unchanged dependencies/lock/profile/flags, four build helpers, recorded53 SDK files and before/after tool hashes are bound. Compilation uses platform-tools v1.44; the recorded unchanged SDK installer uses v1.52 objcopy for stripping. This is the observed pipeline, not a claim of a uniquely recovered historical recipe or a complete invocation trace. The main build used its own SDK, Rustup home and target directory. Both complete outputs match scratch, and allocated section payloads are unchanged by stripping.

`scratch-handoff.tar.gz` preserves the complete174-payload scratch seal `ee487e38055c9bccda0df1d587518bbedcc21df826394b09b5e9a2eb37eedf05`, including the earlier natural-source proposal, independent source review, diagnostic correction, validation layers and superseded build01. Build01 compiled but was superseded after exact diagnostic discrepancies were established; it received **no runtime execution**. Build02 compiled the separately approved correction once. The clean main build is a third, separately identified build. No compiler/flag/path variants, byte patching, padding or source-coordinate spoofing were used.

The main README is the sole input difference from scratch. Saved receipts retain their actual scratch source/build/harness provenance; `main-scratch-identity.json`, `receipt-build-bindings.json` and `focused-main-bindings.json` bind them to current main through complete ELF and symbol identity. **No main runtime replay occurred.** Historical seals and packages were not changed.

## Runtime evidence and counts

The nine baseline comparison files total17,441 cases, including69 repeat-input comparisons; the separate donation sequence retains ten steps. The two authentic historical FeeConfig initializer messages retain original signed bytes/signatures and the existing freshness negative control. They do not establish FeeProgramGlobal initializer history. Saved ordinary transaction fields verify17,204 signatures across8,644 encoded fields; these counts do not describe every comparison execution or unique transactions.

`focused20.json.gz` adds40 ordinary signed executions and80 test-owned signatures. Eight inputs repeat existing cases with stronger checks; twelve are new typed curve/sharing combinations. Fresh LiteSVM instances use signature verification, blockhash checking and default transaction history. The frozen assertions compare watched account state, events, inner instructions, return data, errors and semantic logs, with explicit success/rejection expectations. Program ELF fields and its initial rent are normalized because the loaded binaries differ. Compute-unit lines and source-coordinate spans are excluded from semantic log equality; all error-origin presence and Left/Right values remain strict. Raw logs remain visible and differ in all20 cases. No assertion or driver was relaxed after execution.

`runtime-retained-diagnostics.json` strengthens eleven rows from the newly executed baseline, including shared-admin metadata and both Pool key-order cases. It only reads saved logs and adds no transactions or cases. The stronger focused assertions are not retroactively attributed to the entire baseline. Both normal and focused evidence retain their exact Python/solders/runtime and fixture bindings. One saved-only verification invocation initially omitted the venv site-packages; its import failure and successful corrected invocation remain preserved without transaction replay.

## Static evidence and remaining gaps

The complete928-byte wrapper and8,984-byte parser continue to match normalized bodies and relocation patterns. Of76 paired direct calls,74 target windows match. The handler and initialization closure remain explicit residuals. The new handler is13,592 bytes versus the original inferred13,800-byte window; size reduction is not proof of semantic or source identity.

The full relevant instruction and immediate-call/data ledgers are preserved, including84 direct-target windows and42 original targets with ambiguity and reached-from-root information. Both early log spans have exact pointer/length/syscall bindings. General128-byte data previews are not complete object-extent proof. Ten retained initializer/social/Pubkey bodies,26 immediate callees and five bounded literals still match. The five checked account codecs retain their known +528 source-line difference;35 immediate callees and consumed filenames match. No arbitrary descendant/data closure is claimed.

`full-function-inventory.json` retains every one of585 original inferred windows and546 fresh candidate symbol windows. Original status is unchanged from8f:437 mapped patterns,145 unattributed and three call conflicts. Candidate status is438 normalized-call-consistent,105 unmatched and three call conflicts. Raw/normalized/size alternatives, ambiguous matches,272 immediate-call residuals, indirect calls and data references remain visible. These windows are not a proven historical function denominator or a semantic completion percentage. This candidate is an experimental reconstruction, not a deployable substitute or a completed security audit.

## Portable and current-source verification

```sh
python -B repro/pump_fees/donation-business-v144/verify.py
# Python environment with solders installed; checks saved signatures, never runs SBF:
python -B repro/pump_fees/donation-business-v144/verify.py --runtime
# After these files are tracked, also validate the actual checkout inputs:
python -B repro/pump_fees/donation-business-v144/verify.py --runtime --current-main --repo .
```

The standalone verifier checks exact main/scratch ELF and symbols, source/build/SDK/tool/archive identities, nested immutable seals, all static analyses and every direct receipt/source binding. It recomputes focused saved assertions and diagnostic checks; `--runtime` additionally rechecks signatures. No compiler, VM, network call or signer creation is used.

`--current-main` requires current tracked files and matching bytes for all26source inputs, four build helpers, bounded documentation,44 canonical baseline harness files, four focused harness files,18runtime inputs and the candidate. The46 recorded baseline harness origins retain two explicit mappings to byte-identical public copies. No `work/` path is treated as a live input. The frozen focused driver retains its original scratch source map, including that README; current-main acceptance separately checks the finalized main map and complete identity rather than silently rewriting the driver or historical source records.

The copied-checkout test uses an independent Git index and no `work/` tree. It tests portable verification, current tracked bindings, the existing status/receipt schema, and source/harness/receipt/candidate failure cases. `status-proposal.json` and `completion-proposal.json` are integration proposals for the parent; they do not mutate central status or workflow files.
