# Partial PumpSwap source recovery

Thirty-seven of 38 published handlers are implemented from captured-program behavior
and disassembly, including legacy buy, exact-quote buy, sell, direct fee/cashback payouts, boost buy-and-burn, and AMM/curve multi-hop routes.
One handler remains absent: create_config. This is not a replacement for the deployed program
and does not match its bytes.

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
proof of the historical compiler/dependencies. The preceding 32-handler compiler checkpoint is preserved. See
[`repro/pump_amm/compiler-v144`](../../repro/pump_amm/compiler-v144/README.md) and
[`audit/pump_amm/COMPILER_V144.md`](../../audit/pump_amm/COMPILER_V144.md) for full
build provenance, artifact identity and limits. Cache preparation requires the
pinned archives to be locally available; it does not download them.

The legacy buy checkpoint adds two bodies and corrects zero-fee cashback sell event
labels. All 23 suites pass 16,221 comparisons, including all previous cases, 16 sell
regressions, and 1,011 buy/exact-quote cases. Its clean main-path build uses the same
v1.44 lockfile. See
[`repro/pump_amm/legacy-buy-thirty-five`](../../repro/pump_amm/legacy-buy-thirty-five/README.md)
and [`audit/pump_amm/LEGACY_BUY_RECOVERY.md`](../../audit/pump_amm/LEGACY_BUY_RECOVERY.md).
The previous AMM33 package and its subsequently discovered negative event receipt
remain preserved; the new package binds that exact signed case to a passing regression.

The boost buy-and-burn checkpoint adds one body. All 24 suites pass 16,727
comparisons, including 506 new normally signed boost cases. Its clean main build
is identical to the scratch executable used for the complete regression run.
Quote transfer, base burn, trade/boost events, final vault closure, Token-2022 fee
harvesting, and error 6088 are covered by the bounded corpus. See
[`repro/pump_amm/boost-burn-thirty-six`](../../repro/pump_amm/boost-burn-thirty-six/README.md)
and [`audit/pump_amm/BOOST_BUY_BURN_RECOVERY.md`](../../audit/pump_amm/BOOST_BUY_BURN_RECOVERY.md).
The earlier AMM35 package remains immutable.

The multi-hop checkpoint adds one body. All 25 suites pass 17,462 comparisons,
including 735 new normally signed route cases. The clean main-path executable
matches the scratch executable exactly; the maintained route harness also passes
from `/tmp`. One, two and three AMM legs, grouped Pump curves, both kinds of
AMM/curve transition, inline fee allocation, captured CPIs, rollback/error order,
and endpoint/intermediate token transfer fees are covered. See
[`repro/pump_amm/multi-hop-thirty-seven`](../../repro/pump_amm/multi-hop-thirty-seven/README.md)
and [`audit/pump_amm/MULTI_HOP_RECOVERY.md`](../../audit/pump_amm/MULTI_HOP_RECOVERY.md).
Earlier packages remain immutable. Fixed-admin `create_config` remains static-only:
retained runtime evidence consists of 372 ordinary-signer rejection comparisons,
with no successful fixed-administrator initialization replay. No signer bypass is used.

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
`scripts/pump_amm_cashback_differential.py`, and
`scripts/pump_amm_legacy_sell_differential.py`, and
`scripts/pump_amm_legacy_buy_differential.py`, and
`scripts/pump_amm_boost_burn_differential.py`, and
`scripts/pump_amm_multi_hop_differential.py`, each taking `--candidate` and `--output`.

For a clean build with complete source/lock/toolchain hashes and an unmodified
whole-file comparison, use `scripts/build_partial_candidate.py`. See
`audit/pump_amm/ADMIN_RECOVERY.md` and `audit/pump_amm/LIQUIDITY_RECOVERY.md` and
`audit/pump_amm/TRADE_V2_RECOVERY.md` and `audit/pump_amm/CREATE_POOL_RECOVERY.md` and `audit/pump_amm/BOOST_RECOVERY.md` and `audit/pump_amm/SWEEP_RECOVERY.md` and `audit/pump_amm/EXTEND_RECOVERY.md` and `audit/pump_amm/CREATOR_FEES_RECOVERY.md` and `audit/pump_amm/CREATOR_REASSIGNMENT_RECOVERY.md` and `audit/pump_amm/INCENTIVES_RECOVERY.md` and `audit/pump_amm/CASHBACK_RECOVERY.md` for recovered constraints and limitations.

The current [Pool serializer checkpoint](../../repro/pump_amm/pool-serialization-thirty-seven/README.md) preserves those 37 bodies and reruns all 25 suites / 17,462 comparisons. Both Pool and GlobalConfig complete normalized account-exit bodies match the captured original, including each exit's 24 direct call targets. Its clean main and scratch executables are byte-identical; equality to the original whole binary remains false. The prior [GlobalConfig checkpoint](../../repro/pump_amm/serialization-thirty-seven/README.md) remains preserved. See [the Pool serialization audit](../../audit/pump_amm/POOL_SERIALIZATION_RECOVERY.md) for the source correction and verification limits. Static-only `create_config` source is retained separately and is not promoted.
