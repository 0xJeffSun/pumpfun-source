# Partial PumpSwap source recovery

Thirty-two administrative, accumulator, liquidity, v2 trading, pool creation, boost initialization, fee sweep, account extension, creator-fee collection/transfer and creator-reassignment, incentive scheduling/claim volume synchronization and cashback-claim handlers are implemented from captured-program behavior and
disassembly. The remaining six published handlers are absent. This is not a
replacement for the deployed program and does not match its bytes.

```sh
cargo build-sbf --tools-version v1.52 --manifest-path programs/pump-amm/Cargo.toml \
  --sbf-out-dir work/pump-amm-recovery/build
work/test-env/bin/python scripts/pump_amm_admin_differential.py \
  --candidate work/pump-amm-recovery/build/pump_amm_recovered.so \
  --output work/pump-amm-recovery/admin-differential.json
```

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
