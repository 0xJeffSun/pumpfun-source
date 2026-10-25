# Pump integration checkpoint: thirty-three recovered handlers

This source snapshot contains 37 dispatch entries: 33 recovered handlers plus partial `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3` and `create_v2` paths. It extends creator-thirty with legacy sell, sell_v2, legacy migration, quote-control creation admission and configured creator fee corrections. It remains a bounded reconstruction, not a complete replacement program.

**Full byte identity is false.** Candidate:1,129,592 bytes, SHA-256 `85358197282b1c5579dbccc623d407bab2e04e0fae1c72e1b6066a5f8bc25292`. Captured original at `evidence/original/pump/deployed.so`:10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Captured code was not a compiler input. Original binaries are referenced in repository evidence rather than duplicated here.

## Partial-path limitations

`create_v2` covers normal SOL and whitelisted quote creation plus quote-control consumer admission, reserve configuration and creator fee checks. Mayhem and nested quote creation paths remain unrecovered; these fixtures do not establish those paths. The legacy `create` handler is a separate recovered path with its own captured Metaplex dependency validation.

`buy_exact_quote_in_v3` covers bounded native SOL and synthetic USDC/Token22 fixtures, including funded completion crossing, optional partial fills, Mayhem crossing behavior and selected fee-rounding boundaries. Other quote routes, transfer-fee extensions and complete trade equivalence remain unestablished. Existing `buy_v3` and `sell_v3` also remain partial. None of these scoped results establishes full source recovery or whole-program byte identity.

## Corrected fee and completion behavior

Configured nonzero curve creator fees override the selected tier rate in the recovered trade paths. The v3 exact-quote path preserves gross-spend fee truncation before net-quote calculation and uses the actual base vault balance for post-completion reserves. The combined regression retains extreme fee values, zero creators, holder/Mayhem flags, normal SOL and synthetic USDC token routes, and independent base-vault balance cases. These are reconstruction corrections, not changes to the captured program.

## Evidence and boundaries

The combined candidate passed 6,338 differential cases across 28 suites and 694 Surfpool comparisons (1,388 normally signed transactions) across 21 suites. All original/candidate comparisons matched within their stated scope; original IDL runtime differences are retained below.

`source/` preserves all 25 source/manifest/lockfile inputs from the successful independent clean build. `build-comparison.json`, `build-attempt.json` and `build.log.gz` retain toolchain, source and ELF comparison evidence. `harness/` preserves maintained suite/runner scripts, their transitive local Python imports, and build/setup helpers. `source-harness-sha256.json` records exact source/harness hashes plus repository capture and fixture snapshots.

`all-differential.json.gz` contains all 28 deterministic suite results; `summary.json` records verified counts. `surfpool/` preserves twenty-one compressed runner receipts, synthetic fixtures, actual transaction bytes, and logs. Runners execute ordinary test-owned signatures in offline Surfpool 1.6.1 with actual captured dependency CPIs. Failed transactions must preserve nonfee-payer account state. No live writes or privileged PDA signer injection are used.

Each runner retains its comparison scope. Recognized event timestamps are normalized against schemas while raw logs remain. Some return values are retained but not compared in Surfpool; deterministic receipts document their own rules. Distribution includes real alternative ATA bootstrap cases. Synthetic fixture parity is not exhaustive correctness, production safety or historical byte identity.

## Reproduction

Use a repository checkout containing captured evidence, IDLs and fixture inputs. Restore frozen `source/` and `harness/` contents to their original repository-relative paths in a separate checkout before replaying if current files differ. Nested harness copies should not be invoked directly: their root discovery expects repository layout.

The build used pinned Anchor 0.31.1, the saved Cargo.lock, cargo-build-sbf 2.1.21, explicitly selected platform-tools v1.44 and Rust 1.79.0-dev / LLVM 18.1.7 on aarch64 Apple Darwin. The version banner's default platform-tools v1.43 differs from the explicit v1.44 selection; compiler/SDK hashes and actual command appear in the build record.

```sh
CARGO_HOME="$PWD/work/fees-v144-cargo-home" python3.12 scripts/build_partial_candidate.py --manifest programs/pump/Cargo.toml --program pump --artifact-name pump_recovered.so --tools-version v1.44 --output work/replay-creator-thirtythree-build
work/localnet/venv/bin/python scripts/pump_validate_all.py --candidate repro/pump/creator-thirtythree/candidate.so --output work/replay-creator-thirtythree.json.gz
```

Replay the 21 runners listed in `run-surfpool.py` separately with `--candidate repro/pump/creator-thirtythree/candidate.so --output <new-directory>`, or adapt that orchestrator's work output directory for the restored checkout. Exact scripts and hashes are preserved. Keep configured ports free and do not stop other processes to acquire them.

External prerequisites remain: offline Cargo caches, installed Rust/Solana SDK/platform-tools, Python packages, Surfpool, captured repository dependencies, `research/imported-lab/analysis/pump_fun/config-snapshot.json` and `repro/pump/constant-product-differential.json` and the two signed Surfpool fixture captures listed in `source-harness-sha256.json`. This is not a hermetic toolchain image; source paths and host/toolchain differences can change ELF bytes. Historical absolute paths identify the original execution environment. `manifest-sha256.json` covers all packaged files except itself. Hash checks do not rerun builds or tests.

## IDL authority runtime differences

The original itself differs between LiteSVM and Surfpool for short IDL account headers. Lengths 0/7 return InvalidRealloc in LiteSVM and custom 6010 in Surfpool; lengths 8/31/40/43 return InvalidRealloc in LiteSVM and succeed in Surfpool. The runner records these explicitly in original_runtime_differences and accepts only these exact observed signatures. Original and candidate are compared within each runtime; errors are not normalized across runtimes. Raw fixtures, transactions and state remain in the receipts. This distinction is essential when assessing IDL reallocation behavior.
