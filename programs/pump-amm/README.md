# Partial PumpSwap source recovery

Twelve administrative and accumulator handlers are implemented from captured-program behavior and
disassembly. The remaining 26 published handlers are absent. This is not a
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
`scripts/pump_amm_accumulator_differential.py`, each taking `--candidate` and `--output`.

For a clean build with complete source/lock/toolchain hashes and an unmodified
whole-file comparison, use `scripts/build_partial_candidate.py`. See
`audit/pump_amm/ADMIN_RECOVERY.md` for recovered constraints and limitations.
