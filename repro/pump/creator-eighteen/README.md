# Pump creator-fee integration checkpoint

This snapshot contains 20 dispatch entries: 18 recovered handlers and partial `buy_v3` / `sell_v3` paths. It adds creator-fee collection, distribution v1/v2, and the minimum-distributable-fee query to the previous integrated candidate. This is bounded reconstruction evidence, not a complete replacement program.

**Full byte identity is false.** The independent candidate is 536,168 bytes, SHA-256 `ebc76c833fa4edb373ec90b4285d05b6865d889922164f9a2933385aebc54108`. The captured original at `evidence/original/pump/deployed.so` is 10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Captured code was not a compilation input. Original ELFs are referenced in the repository, not duplicated here.

## Evidence

All **1,924 deterministic differential cases across 10 suites passed** against this candidate; see `all-differential.json.gz` and per-suite counts in `summary.json`. Original/candidate hashes and all ten top-level suite-script hashes were verified before packaging.

- `source/` preserves all 11 source and manifest/lockfile inputs recorded by the successful independent build.
- `build-comparison.json`, `build-attempt.json`, and `build.log.gz` retain the clean-target build provenance and whole-file comparison.
- `harness/` preserves the validation scripts and their transitive local Python imports. `source-harness-sha256.json` maps repository-relative paths to exact bytes.
- `surfpool/` preserves compressed receipts, initialized account fixtures, transaction bytes, and validator logs. Collection passed 13 comparisons, distribution 24, and minimum query 13: **50 comparisons / 100 signed transactions**, without mismatches or unexpected original errors.

Surfpool 1.6.1 ran on isolated loopback ports with synthetic accounts and normal test-owned signatures. Each candidate used the same captured dependencies as the original. Account states and errors were compared; recognized event timestamps were normalized while raw evidence was retained. Distribution return values were retained but not compared in Surfpool; deterministic differential receipts retain their own comparison rules. These cases do not establish universal behavior equivalence, production safety, or binary identity.

## Reproduction

Run from a checkout of this repository with the captured `evidence/` dependencies. The frozen source and harness trees preserve original repository-relative layout; restore them into a separate checkout before replaying if current files have changed. Avoid running the nested harness copies directly because their root discovery expects that layout.

The build used Anchor 0.31.1, the committed Cargo.lock, Solana cargo-build-sbf 2.1.21, selected platform-tools v1.44, and Rust 1.79.0-dev / LLVM 18.1.7 on aarch64 Apple Darwin. Exact compiler and SDK hashes, command, and environment appear in the build record. Its cargo-build-sbf version banner reports default v1.43; the selected build toolchain was explicitly v1.44.

```sh
CARGO_HOME="$PWD/work/fees-v144-cargo-home" python3.12 scripts/build_partial_candidate.py --manifest programs/pump/Cargo.toml --program pump --artifact-name pump_recovered.so --tools-version v1.44 --output work/replay-creator-eighteen-build
work/localnet/venv/bin/python scripts/pump_validate_all.py --candidate repro/pump/creator-eighteen/candidate.so --output work/replay-creator-eighteen.json.gz
```

Run `localnet/pump_collect_transactions.py`, `localnet/pump_distribution_transactions.py`, and `localnet/pump_minimum_transactions.py` sequentially with `--candidate repro/pump/creator-eighteen/candidate.so --output <new-directory>`. Their port pairs are 20031/32, 20041/42, and 20051/52. The local setup script and existing localnet documentation describe Python/Surfpool installation.

The package is not a hermetic toolchain distribution: offline Cargo caches, installed Rust/Solana tools, platform-tools, Python dependencies, and captured repository fixtures remain external prerequisites. Required repository data includes the captured IDLs and dependencies, `research/imported-lab/analysis/pump_fun/config-snapshot.json`, and `repro/pump/constant-product-differential.json`. The provenance map also records a current hash snapshot of repository captures and these fixtures. Historical absolute paths in receipts identify the original run. Source paths and host/toolchain differences can affect rebuilt ELF bytes. `manifest-sha256.json` authenticates every packaged file except itself; verifying hashes does not rerun compilation or validation.
