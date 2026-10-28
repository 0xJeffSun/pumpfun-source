# PumpSwap buyback basis points above the valid maximum panic the v2 trades

## Problem

The global config's `buyback_basis_points` is used as a share of the
protocol fee: `buyback_fee = protocol_fee * bps / 10000`. The code
assumes `bps <= 10000` and asserts it with
`buyback_fee never exceeds protocol_fee`. Nothing validates the config
value itself, so an admin-set (or captured) config with `bps > 10000`
computes a buyback fee larger than the protocol fee and panics the
trade instead of returning an Anchor error.

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18
signed executions, built on the repository's own trade-v2 differential
harness (`scripts/pump_amm_trade_v2_differential.py`) with the global
config patched at offset 899 (the `buyback_basis_points` field). The
clock is slot 100, epoch 0. `producer.py` reproduces every receipt from
the repository files.

| Case | bps | Original | Control | Candidate |
| --- | ---: | --- | --- | --- |
| buy_v2-buyback-65535 | 65535 | panic global_config.rs:391 | panic trade_v2.rs:122 | panic trade_v2.rs:122 |
| buy_v2-buyback-10001 | 10001 | panic global_config.rs:391 | panic trade_v2.rs:122 | panic trade_v2.rs:122 |
| sell_v2-buyback-65535 | 65535 | panic global_config.rs:391 | panic pool.rs:21 | panic pool.rs:21 |
| sell_v2-buyback-10001 | 10001 | panic global_config.rs:391 | panic pool.rs:21 | panic pool.rs:21 |
| buy_v2-buyback-5000-success | 5000 | success | success | success |
| sell_v2-buyback-10000-success | 10000 | success | success | success |

All panics carry the message `buyback_fee never exceeds protocol_fee`
and fail with `ProgramFailedToComplete` (a Rust panic, not an
AnchorError). The original computes the buyback fee in
`state/global_config.rs`; the #424 control and #427 candidate moved it
into `trade_v2.rs` (buy) and `pool.rs` (sell) — same message, moved
sites. `verify.py` rechecks every receipt independently: signature
validity, the patched bps in the before snapshot, the panic site per
image, rollback except the payer's 5000-lamport fee on failures, and
identical data-account states across images on the successes.

## Result

- **A config value above 10000 panics both v2 trade directions on all
  images.** Even the smallest excess (10001) panics whenever the
  protocol fee is nonzero, because `fee = protocol_fee * 10001 / 10000`
  already exceeds `protocol_fee` for fees of 10000 or more, and 65535
  panics for any nonzero fee.
- The valid-bps controls pin the cause to the config value: 5000 and
  10000 trade successfully and identically on all images.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The malformed config is a synthetic boundary condition, not a mainnet
  config state: it isolates the missing validation, the same way the
  bps-overflow packets isolated theirs. No live transaction was
  submitted. All executions are offline LiteSVM replays with normally
  signed transactions.
