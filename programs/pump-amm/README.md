# Partial PumpSwap source recovery

Thirty-two administrative, accumulator, liquidity, v2 trading, pool creation, boost initialization, fee sweep, account extension, creator-fee collection/transfer and creator-reassignment, incentive scheduling/claim volume synchronization and cashback-claim handlers are implemented from captured-program behavior and
disassembly. The remaining six published handlers are absent. This is not a
replacement for the deployed program and does not match its bytes.

```sh
work/test-env/bin/python scripts/prepare_locked_cargo_home.py \
  --lockfile programs/pump-amm/Cargo.lock --output work/amm-replay-cargo-home
CARGO_HOME="$PWD/work/amm-replay-cargo-home" work/test-env/bin/python scripts/build_partial_candidate.py \
  --manifest programs/pump-amm/Cargo.toml --program pump_amm \
  --artifact-name pump_amm_recovered.so --tools-version v1.44 --output work/amm-replay-build
work/test-env/bin/python scripts/pump_amm_admin_differential.py \
  --candidate work/amm-replay-build/artifacts/pump_amm_recovered.so \
  --output work/amm-replay-admin.json
```

The v1.44 checkpoint uses a pinned, checksum-verified dependency graph and a clean
main-path build. The previous v1.52 cashback checkpoint remains preserved. Both
the compiler and lockfile changed, so this is not a compiler-only experiment or
proof of the historical compiler/dependencies. The 32 implemented handlers and
14,635 passing comparisons are unchanged. See
[`repro/pump_amm/compiler-v144`](../../repro/pump_amm/compiler-v144/README.md) and
[`audit/pump_amm/COMPILER_V144.md`](../../audit/pump_amm/COMPILER_V144.md) for full
build provenance, artifact identity and limits. Cache preparation requires the
pinned archives to be locally available; it does not download them.

Additional SBF suites are `scripts/pump_amm_buyback_differential.py`,
`scripts/pump_amm_fee_config_differential.py`,
`scripts/pump_amm_resize_differential.py --creator`, and
`scripts/pump_amm_reserved_differential.py`, and
`scripts/pump_amm_accumulator_differential.py`, and
`scripts/pump_amm_liquidity_differential.py`, and
`scripts/pump_amm_trade_v2_differential.py`,
`scripts/pump_amm_create_differential.py`, and
`scripts/pump_amm_migration_create_differential.py`, and
`scripts/pump_amm_boost_differential.py`, and
`scripts/pump_amm_sweep_differential.py`, and
`scripts/pump_amm_extend_differential.py`,
`scripts/pump_amm_collect_differential.py`, and
`scripts/pump_amm_transfer_creator_differential.py`,
`scripts/pump_amm_creator_reassignment_differential.py`, and
`scripts/pump_amm_creator_reassignment_cto_differential.py`, and
`scripts/pump_amm_incentives_differential.py --family sync|admin|claim`, and
`scripts/pump_amm_cashback_differential.py`, each taking `--candidate` and `--output`.

For a clean build with complete source/lock/toolchain hashes and an unmodified
whole-file comparison, use `scripts/build_partial_candidate.py`. See
`audit/pump_amm/ADMIN_RECOVERY.md` and `audit/pump_amm/LIQUIDITY_RECOVERY.md` and
`audit/pump_amm/TRADE_V2_RECOVERY.md` and `audit/pump_amm/CREATE_POOL_RECOVERY.md` and `audit/pump_amm/BOOST_RECOVERY.md` and `audit/pump_amm/SWEEP_RECOVERY.md` and `audit/pump_amm/EXTEND_RECOVERY.md` and `audit/pump_amm/CREATOR_FEES_RECOVERY.md` and `audit/pump_amm/CREATOR_REASSIGNMENT_RECOVERY.md` and `audit/pump_amm/INCENTIVES_RECOVERY.md` and `audit/pump_amm/CASHBACK_RECOVERY.md` for recovered constraints and limitations.
