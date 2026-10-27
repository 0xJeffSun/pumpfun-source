# PumpSwap lane amm-mid (original windows 0x3d828 … 0x724a0)

Research packet from the parallel byte-identity effort. It is based on the
published AMM frontier
[`repro/pump_amm/native-fee-cpi-recovery-20261027`](../../repro/pump_amm/native-fee-cpi-recovery-20261027/README.md)
(candidate `a4b978ee…`, 599/785 normalized, 125 raw, 186 unmatched).

The maintained `programs/pump-amm/src` is **not** modified on this branch.
CI binds it to the frontier's canonical source (`verify_pump_amm_checkpoint.py`
asserts `current_source_verified`). The recovered change ships here as
[`source.patch`](source.patch) (cumulative, `git apply` at the repository root)
plus the full changed file under [`source/`](source).

## Result

| | Frontier `a4b978ee` | This packet |
| --- | ---: | ---: |
| Normalized windows | 599 | **600** |
| Raw-equal windows | 125 | 125 |
| Unmatched windows | 186 | 185 |
| Lost windows | — | none |

Newly matched original window: **`0x52c58`** (1,784 bytes, the sell event
builder `create_sell_event`).

Final Linux candidate SHA-256 is
`5e853b8419b7836af219551b3277040e584c9bae50c2222efcf8a9447337086e`
(unstripped `dbe8b0bc…`). It was built with the frontier's authenticated
Linux v1.44 SBPF recipe; see [Reproduce](#reproduce).

## Recovered source cause (0x52c58)

The frontier builder differed from the original by one instruction: the
`lddw r4, 1_000_000_000_000_000` feeding the mayhem `base_supply` phi was
scheduled six slots early, ahead of the three `context.user*` field-address
computations (`r9+96/+64/+32`). Tracing the codegen pipeline for this one
function showed the mechanism:

- MachineSink moves the phi-constant materialization into the block that
  ends at the mayhem branch. It inserts at the top of the target block and
  preserves the relative order of instructions sunk together.
- In the frontier, the field addresses were defined in that block, so the
  constant landed above them.
- In the original, the three addresses come from the entry block (before
  `Clock::get()`). They are sunk along the same chain after the constant, so
  they land above it: `+96, +64, +32, 1e15, +8`.

Re-running `llc` on the crate's own optimized IR with only those three
`getelementptr`s moved into the entry block reproduces the original window
exactly. The corresponding ordinary source captures the user keys with the
other context fields, before the fallible clock read:

```rust
let pool = context.pool;
let global_config = context.global_config;
let base_supply = context.base_supply;
let user = context.user;
let user_base_token_account = context.user_base_token_account;
let user_quote_token_account = context.user_quote_token_account;
let timestamp = Clock::get()?.unix_timestamp;
```

The same captures in `create_buy_event`, before its checked addition, remove
the buy builder's displaced `pool+8` spill sequence. That leaves `0x52070`
with exactly one difference: the source-line immediate of its `Overflow` site
(original `trade_v2.rs:515`). So `0x52070` is not counted here. The change is
behavior-neutral: the copied keys come from an immutable by-value context.

## Validation

All suites ran against the final candidate (`5e853b84…`) with
`work/test-env/bin/python` and the frontier harnesses/observer:

| Suite | Cases | Mismatches |
| --- | ---: | ---: |
| `scripts/pump_amm_trade_v2_differential.py` (observed) | 870 | 0 |
| `scripts/pump_amm_buyback_differential.py` (observed) | 369 | 0 |
| `scripts/pump_amm_cashback_differential.py` (observed) | 146 | 0 |
| `probe_sell_events.py` (holder, mayhem, fee, reserve modes) | 10 | 0 |
| `probe_buy_events.py` (`buy_v2`, `buy_exact_quote_in_v2`) | 16 | 0 |

Only the three trade_v2 executors call the two builders. Transaction
sidecars and gzipped receipts are in
[`gains/01-event-context-captures/runtime`](gains/01-event-context-captures/runtime).

## Residual diagnosis in this range

There are 64 unmatched windows in range at the frontier. Their categories:

- **Source-line immediates only** (about 25 windows): every remaining
  difference is the `line` stored by an `error!`/`require!` site, and
  intra-function line deltas already match. Examples: Pool helpers
  `0x6b780`, `0x6ba68`, `0x6bf50`, `0x6c328`, `0x6c768`, `0x6d128`
  (`state/pool.rs` 386–484); GlobalConfig setters `0x61d68`, `0x62c40`,
  `0x62e68`, `0x63778`; the 520-byte `error!` closures `0x40100`,
  `0x446a0`–`0x450d8`, `0x4bf30`–`0x4c548`, `0x57e20`; `0x50ca8`, `0x516e0`,
  `0x6f608`; and now `0x52070`. Across the whole program, 121 of 186
  unmatched windows carry such sites, and only 3 matched windows do. As
  Codex's pool-source-organization lane concluded, these need the original
  preceding file contents, not padding, so they are not attempted here.
- **In flight in Codex work dirs** (skipped): `0x58028` (pool-prepare),
  `0x4efb8`/`0x4f1d8`/`0x62e68` (buyback validator), `0x6db20`/`0x6f3c8`
  (incentive state), `0x44ab0` (fee context).
- **Structural** (large handlers that also carry line sites): `0x3dbc0`,
  `0x40a08`, `0x45940`, `0x49b50`, `0x4c750`, `0x53350`, `0x54a20`, `0x56710`.

See [PROGRESS.md](PROGRESS.md) for per-window status and next steps, and
[`negative-controls/negative-controls.json`](negative-controls/negative-controls.json)
for every variant tried.

## Reproduce

```sh
# 1. stage the frontier workspace from canonical source + this patch
git apply research/claude-amm-mid-20261027/source.patch   # in a scratch checkout only
python3 repro/pump_amm/native-fee-cpi-recovery-20261027/workspace_recipe_v2.py stage \
  --source-root . --output /tmp/amm-stage
# 2. strict offline Linux v1.44 build (frontier recipe; lane copies mounted at the
#    frontier's recorded container paths; holds the shared sbf + podman locks)
python3 research/claude-amm-mid-20261027/tools/linux_build.py --source /tmp/amm-stage --output /tmp/amm-build
# 3. measure with the repository tool
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py \
  --candidate /tmp/amm-build/artifacts/pump_amm_recovered.so \
  --symbols /tmp/amm-build/artifacts/unstripped.so --output /tmp/amm-measure.json
```

Building the unmodified frontier source with `tools/linux_build.py`
reproduces `a4b978ee…` (unstripped `784592ce…`) byte-for-byte. Native macOS
v1.44 builds (`tools/native_build.sh`) produce identical bodies for every
symbol except TypeId-bearing `type_id` helpers (all outside this range), so
they were used for iteration only.
