# Pump integration checkpoint: thirty recovered handlers

This source snapshot contains 34 dispatch entries:30 recovered handlers plus partial `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3` and `create_v2` paths. It extends creator-twentynine with legacy creation and the two explicitly partial paths described below. It remains a bounded reconstruction, not a complete replacement program.

**Full byte identity is false.** Candidate:955,072 bytes, SHA-256 `273e07ca4d27788bbf8eedd8a901b521ebce7406400610f4edce5f1198940ab2`. Captured original at `evidence/original/pump/deployed.so`:10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Captured code was not a compiler input. Original binaries are referenced in repository evidence rather than duplicated here.

## Partial-path limitations

`create_v2` covers normally signed normal-SOL creation only. Mayhem and alternative quote creation paths are not recovered by this checkpoint; do not interpret successful SOL fixtures as their approval. The legacy `create` handler is a separate recovered path with its own captured Metaplex dependency validation.

`buy_exact_quote_in_v3` covers bounded native SOL and synthetic USDC/Token22 fixtures, including funded completion crossing, optional partial fills, Mayhem crossing behavior and selected fee-rounding boundaries. Other quote routes, transfer-fee extensions and complete trade equivalence remain unestablished. Existing `buy_v3` and `sell_v3` also remain partial. None of these scoped results establishes full source recovery or whole-program byte identity.

## Evidence and boundaries

The combined candidate passed 5,139 differential cases across 22 suites and 346 Surfpool comparisons (692 normally signed transactions) across 15 suites. All original/candidate comparisons matched within their stated scope; original IDL runtime differences are retained below.

`source/` preserves all22 source/manifest/lockfile inputs from the successful independent clean build. `build-comparison.json`, `build-attempt.json` and `build.log.gz` retain toolchain, source and ELF comparison evidence. `harness/` preserves maintained suite/runner scripts, their transitive local Python imports, and build/setup helpers. `source-harness-sha256.json` records exact source/harness hashes plus repository capture and fixture snapshots.

`all-differential.json.gz` contains all22 deterministic suite results; `summary.json` records verified counts. `surfpool/` preserves fifteen compressed runner receipts, synthetic fixtures, actual transaction bytes, and logs. Runners execute ordinary test-owned signatures in offline Surfpool1.6.1 with actual captured dependency CPIs. Failed transactions must preserve nonfee-payer account state. No live writes or privileged PDA signer injection are used.

Each runner retains its comparison scope. Recognized event timestamps are normalized against schemas while raw logs remain. Some return values are retained but not compared in Surfpool; deterministic receipts document their own rules. Distribution includes real alternative ATA bootstrap cases. Synthetic fixture parity is not exhaustive correctness, production safety or historical byte identity.

## Reproduction

Use a repository checkout containing captured evidence, IDLs and fixture inputs. Restore frozen `source/` and `harness/` contents to their original repository-relative paths in a separate checkout before replaying if current files differ. Nested harness copies should not be invoked directly: their root discovery expects repository layout.

The build used pinned Anchor0.31.1, the saved Cargo.lock, cargo-build-sbf2.1.21, explicitly selected platform-tools v1.44 and Rust1.79.0-dev / LLVM18.1.7 on aarch64 Apple Darwin. The version banner's default platform-tools v1.43 differs from the explicit v1.44 selection; compiler/SDK hashes and actual command appear in the build record.

```sh
CARGO_HOME="$PWD/work/fees-v144-cargo-home" python3.12 scripts/build_partial_candidate.py --manifest programs/pump/Cargo.toml --program pump --artifact-name pump_recovered.so --tools-version v1.44 --output work/replay-creator-thirty-build
work/localnet/venv/bin/python scripts/pump_validate_all.py --candidate repro/pump/creator-thirty/candidate.so --output work/replay-creator-thirty.json.gz
```

Replay the eleven `localnet/pump_*_transactions.py` runners plus `scripts/pump_{idl_authority,create,create_v2,exact_quote}_surfpool.py` separately with `--candidate repro/pump/creator-thirty/candidate.so --output <new-directory>`. Their exact scripts and hashes are preserved. Keep the configured ports free and do not stop other processes to acquire them.

External prerequisites remain: offline Cargo caches, installed Rust/Solana SDK/platform-tools, Python packages, Surfpool, captured repository dependencies, `research/imported-lab/analysis/pump_fun/config-snapshot.json` and `repro/pump/constant-product-differential.json`. This is not a hermetic toolchain image; source paths and host/toolchain differences can change ELF bytes. Historical absolute paths identify the original execution environment. `manifest-sha256.json` covers all packaged files except itself. Hash checks do not rerun builds or tests.

## IDL authority runtime differences

The original itself differs between LiteSVM and Surfpool for short IDL account headers. Length0/7 return InvalidRealloc in LiteSVM and custom6010 in Surfpool; length8/31/40/43 return InvalidRealloc in LiteSVM and succeed in Surfpool. The runner records these explicitly in original_runtime_differences and accepts only these exact observed signatures. Original and candidate are compared within each runtime; errors are not normalized across runtimes. Raw fixtures, transactions and state remain in the receipts. This distinction is essential when assessing IDL reallocation behavior.
