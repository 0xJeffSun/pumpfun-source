# Relay build04: first 12 ordinary local cases

The one authorized `ordinary` group completed with process exit **0**, with **12/12 comparisons passing**. The original and build04 candidate each executed the same twelve freshly signed synthetic transactions: **24 submissions, 12 unique transactions, 25 unique transaction signatures / 50 encoded signature fields**. No mismatch interrupted the group. No rejection-group case, additional transaction, source change or compiler build was run.

| Binary | SHA-256 |
|---|---|
| Captured original, 830448 bytes | `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563` |
| Build04 candidate, 450016 bytes | `4954fdc437beed0f73e00d25f1df656ce7fdf0279f8f9bb8e70ca0bced4b53dd` |

The unchanged proposal is copied under `proposal/`, with its original seal `2ecc00fa48a19065fae6a2e8a43a9ab5ad4fe5de7c514b6fd3cd93faa118012c`. It binds all 21 candidate source/lock inputs, original ELF and dependencies, the actual solders 0.27.1 runtime files, twelve ordinary and three unexecuted rejection blueprints, and the original ABI evidence. Its README describes the earlier pre-execution state and remains unchanged. `run/launch.json`, `process-result.json`, stdout/stderr and `ordinary.json` retain the exact single invocation, timing, numeric exit, all input hashes and complete raw receipts.

Each fresh VM used real signature verification, current-blockhash checking and a transaction history capacity of 256. The ordinary transaction requested 1,400,000 compute units through a standard ComputeBudget instruction; no VM/feature/privilege settings were weakened. All PDAs signed through actual program CPI. The five donation cases exercised ordinary token/native transfers, real account creation, event logging/self-CPI/return data, and state exits. The seven IDL cases exercised Create, CreateBuffer, Write, SetBuffer, SetAuthority, Close and Resize with genuine test-owned authority signatures.

The independent `verify.py` does not call the harness or execute a VM. It parses raw legacy transaction bytes directly; rechecks exact instructions/account order/privileges and fresh blockhash; binds every fixture account, watched account and source/runtime input; verifies metadata and event/CPI/return bytes; independently checks token balances, tracker/debouncer state, IDL headers/payloads/closure/resize, and total lamport fees. `--runtime` uses the already recorded library only for Ed25519 signature checks and the proposal's saved-input verifier. It re-verifies all 50 encoded signatures. Zero-lamport empty System fixtures correctly appear as absent before execution in LiteSVM; no funded or data-bearing fixture may disappear.

Original/candidate equality remains exact for errors, inner instructions, return data, state bytes and lamports, and all logs except compute-consumption lines. The known different relay executable bytes and initial binary-size-dependent rent are excluded from behavioral equality; executable owner/flags and lamport changes are checked. Full original values remain in the receipts. No diagnostic, origin or Left/Right field is normalized away.

```sh
python3 -B work/relay-ordinary12-runtime-handoff/verify.py
work/test-env/bin/python -B work/relay-ordinary12-runtime-handoff/verify.py --runtime
```

Both commands verify saved evidence only and work from a copied package outside the repository. The first uses the standard library and checks retained signature assertions; `--runtime` additionally performs cryptographic signature re-verification against the pinned installed runtime.

This is bounded ordinary correctness evidence, not full relay equivalence or exhaustive security acceptance. The six fixed-relayer business success paths remain untested because the required genuine signer invocation is unavailable in the bounded public inputs. The three proposed business-rejection cases remain unexecuted. Token-2022 extension behavior, rich error/panic/resource behavior, OOM/Box ownership equivalence and the exact historical compiler/dependency recipe remain open. No historical transaction was rewritten or re-signed, and no existing package or main source was modified.

Eight independent copied-package checks passed: base Python, pinned-runtime signature checks, missing receipt, missing row, recorded mismatch, altered account state and altered transaction signature, then restored acceptance. Five rejected mutations were performed only on disposable copies; the four substantive JSON mutations were deliberately resealed to test receipt semantics rather than merely checksum detection. No new transaction was executed by this verification.
