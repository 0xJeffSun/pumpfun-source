# Pump integration checkpoint: twenty-five recovered handlers

This source snapshot contains 27 dispatch entries:25 recovered handlers plus partial `buy_v3` and `sell_v3` paths. It extends creator-eighteen with creator-fee collection v2, account extension, volume synchronization, creator/protocol fee sweeps, creator migration and admin CTO. It remains a bounded reconstruction, not a complete replacement program.

**Full byte identity is false.** Candidate:690,480 bytes, SHA-256 `a1edac573ea08b5456116ca8bea53ed570d4e5dcae21c72cc438103d75774213`. Captured original at `evidence/original/pump/deployed.so`:10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Captured code was not a compiler input. Original binaries are referenced in repository evidence rather than duplicated here.

## Evidence and boundaries

All **3741 deterministic cases across16 suites passed**. All **176 Surfpool comparisons /352 signed transactions across nine runners passed**, with zero mismatches or unexpected original errors. Bootstrap transactions used to prepare alternative ATA fixtures are recorded separately and excluded from the352 Surfpool total.

`source/` preserves all17 source/manifest/lockfile inputs from the successful independent clean build. `build-comparison.json`, `build-attempt.json` and `build.log.gz` retain toolchain, source and ELF comparison evidence. `harness/` preserves maintained suite/runner scripts, their transitive local Python imports, and build/setup helpers. `source-harness-sha256.json` records exact source/harness hashes plus repository capture and fixture snapshots.

`all-differential.json.gz` contains all16 deterministic suite results; `summary.json` records verified counts. `surfpool/` preserves nine compressed runner receipts, synthetic fixtures, actual transaction bytes, and logs. Runners execute ordinary test-owned signatures in offline Surfpool1.6.1 with actual captured dependency CPIs. Failed transactions must preserve nonfee-payer account state. No live writes or privileged PDA signer injection are used.

Each runner retains its comparison scope. Recognized event timestamps are normalized against schemas while raw logs remain. Some return values are retained but not compared in Surfpool; deterministic receipts document their own rules. Distribution includes real alternative ATA bootstrap cases. Synthetic fixture parity is not exhaustive correctness, production safety or historical byte identity.

## Reproduction

Use a repository checkout containing captured evidence, IDLs and fixture inputs. Restore frozen `source/` and `harness/` contents to their original repository-relative paths in a separate checkout before replaying if current files differ. Nested harness copies should not be invoked directly: their root discovery expects repository layout.

The build used pinned Anchor0.31.1, the saved Cargo.lock, cargo-build-sbf2.1.21, explicitly selected platform-tools v1.44 and Rust1.79.0-dev / LLVM18.1.7 on aarch64 Apple Darwin. The version banner's default platform-tools v1.43 differs from the explicit v1.44 selection; compiler/SDK hashes and actual command appear in the build record.

```sh
CARGO_HOME="$PWD/work/fees-v144-cargo-home" python3.12 scripts/build_partial_candidate.py --manifest programs/pump/Cargo.toml --program pump --artifact-name pump_recovered.so --tools-version v1.44 --output work/replay-creator-twentyfive-build
work/localnet/venv/bin/python scripts/pump_validate_all.py --candidate repro/pump/creator-twentyfive/candidate.so --output work/replay-creator-twentyfive.json.gz
```

Replay the nine `localnet/pump_*_transactions.py` runners separately with `--candidate repro/pump/creator-twentyfive/candidate.so --output <new-directory>`. Their exact scripts and hashes are preserved. Keep the configured ports free and do not stop other processes to acquire them.

External prerequisites remain: offline Cargo caches, installed Rust/Solana SDK/platform-tools, Python packages, Surfpool, captured repository dependencies, `research/imported-lab/analysis/pump_fun/config-snapshot.json` and `repro/pump/constant-product-differential.json`. This is not a hermetic toolchain image; source paths and host/toolchain differences can change ELF bytes. Historical absolute paths identify the original execution environment. `manifest-sha256.json` covers all packaged files except itself. Hash checks do not rerun builds or tests.
