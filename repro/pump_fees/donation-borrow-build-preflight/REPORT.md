# Fees donation account-borrow prebuild

This packet prepares exactly the two source substitutions approved from `repro/pump_fees/donation-borrow-source-proposal/borrowed-accounts.patch`. It performs no build, typecheck, program execution, new fixture, network request or main-source edit. Root review of this frozen packet is the next gate.

The accepted main checkpoint is `repro/pump_fees/donation-business-v144`: candidate `fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2`, with compiled `donation.rs` hash `a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9`. All 26 current source inputs match that checkpoint, including the root workspace/lock, both IDLs, every Rust file and the Fees README. The four maintained build-helper files also match. Current Git revision is recorded as context; file hashes establish the selected baseline.

Only `programs/pump-fees/src/donation.rs` changes:

```rust
let info = &ctx.accounts.pool;
let sharing = &ctx.accounts.sharing_config;
```

These replace the corresponding two `.to_account_info()` clones. The full-file diff is byte-for-byte the reviewed patch; proposed source hash is `540a659ea7d2867db556b2dc95a2b085fb99e4d34d59fc211488c33910d2d40b`. Every other source, README, lock, IDL, profile and helper byte remains unchanged. The optional quote-helper fragment is retained only inside the unchanged historical review packet and is not applied. Original authorization, state updates, diagnostic ordering and event logic remain intact. The source-level ownership premise still requires the separately approved compilation and regression work; this packet makes no binary improvement prediction or behavioral acceptance claim.

`source-sha256.json` contains the 26 normalized proposed inputs; `actual-prospective-build-inputs.json` records their exact new isolated paths from the unchanged source-manifest helper. Unlike Pump, the Fees README is explicitly included among these 26 compiler inputs. `build-plan.json` records one future source build with the accepted CLI helper, v1.44 requested compilation and unchanged SDK v1.52 stripping behavior. The output target, SDK and rustup home will be isolated by that same helper. No build was launched and no source path, compiler version, flags or dependency variants were tried.

The read-only environment recheck verifies all four accepted compile-tool hashes, the v1.52 stripper, CLI binary, all 53 SDK template files and all four maintained helper modules. The CLI's default v1.44 cache paths resolve to the same accepted compile-tool bytes. The CLI version text reports its default metadata; it does not replace the requested or actual compiler-phase record. A future successful build must retain actual compilation and stripping evidence separately.

The exact existing `work/fees-family-221-trial/cargo-home` cache was checked without writes or fetching: 252 locked registry packages, 504 archive copies and 13,306 extracted source-file copies. Every archive hash matches Cargo.lock; extracted files are checked against those archive members. Manually prepared cache directories can lack `.cargo-checksum.json`; the direct archive-member comparison still checks their complete source payload. Existing generated registry metadata is identified separately. This is a current local cache integrity check, not proof of the original historical dependency graph.

`preparation-diagnostics/` preserves two tooling preparation failures: the review uses SHA-string manifest values rather than object records, and this manually prepared cache omits an optional Cargo checksum metadata file. The resumed preparation checked all already written bytes and performed no destructive reset. Neither event was a compiler or runtime failure. The final direct archive/source check passed; no cache data was repaired or changed.

The future authorized regression scope is the unchanged 17,441 baseline comparisons, the exact accepted 20 strict donation comparisons, and the separate 10-step donation sequence. Those inputs are repeated validation, not new coverage. Fresh static analysis must measure the complete handler, actual wrapper/parser and call/data dependencies; no favorable size or equality result is assumed. Counts remain 31 bounded Fees handlers, full original ELF equality remains unproved, and the audit remains incomplete. All stopped and private lanes remain excluded.

Verify saved integrity anywhere with Python 3.11+:

```sh
python -B verify.py
```

From this repository, also recheck current main inputs and the existing local cache/tools:

```sh
python -B work/fees-donation-borrow-build/prebuild/verify.py --repo . --recheck-environment
```

The verifier is read-only and never launches a target, compiler, network request or transaction. Generated deployment keypairs must never be read, hashed, copied or packaged. A future build may record excluded filenames only and must retain only named artifacts, never its whole target directory.
