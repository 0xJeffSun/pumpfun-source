# Restore retained-reserve arithmetic in three live trade paths

Legacy Buy, BuyV2 and SellV2 still performed their own checked `u16` subtraction
of `retained_reserve_bps`. For `10001` or `65535`, the original reports the
underflow at `programs/mayhem-program/src/state.rs:321:26`; the reconstructed
handlers instead reported `buy.rs:74:15`, `buy_v2.rs:91:15` or `sell_v2.rs:89:15`.
These are actual executed panic paths, not manually replaced log strings.

The **four-line Rust delta** makes the existing recovered
`retained_basis_points` helper visible within the crate and uses it in those
three handlers. Legacy Sell and both AMM paths already use this arithmetic.
The subtraction remains checked and rejects the same out-of-range values.
No source lines are inserted/deleted and no padding, assembly or output patch is
used. This is not a claim to have authenticated the original function's name.

The change restores **14 non-compute diagnostic comparisons across seven
instruction/currency suites**. It also restores three complete typed Source
records referenced by the live handlers, each bound to the original location
through its matched entry wrapper. Full handler bodies and instruction-site
correspondence remain unproved; **426 complete normalized windows and 71
raw-local windows remain unchanged**, with no new body match claimed.
All 4,234 previously supported direct-call observations and 441 Source
observations in the existing matched cohort survive.

An artifact-specific follow-up remeasures the latest published account-data
proof on both this native control and the proposal: **156 typed-equal references,
zero typed-different and zero unresolved within that cohort**. All 26 official
SBF target-library members match the published repeated ABI probe. `cohort.py`
reuses that probe's bounded layouts and rechecks the actual consuming instructions,
callee shapes, objects and pointers in these two ELFs. The probe is not rebuilt
here and no new reference or whole-program data-closure claim is made.

## Control, builds and runtime

The control is the unchanged 65-input source map from the published
[AMM sell-quote recovery](../mayhem-sell-quote-call-recovery/README.md), freshly
rebuilt and replayed in the accompanying
[native control packet](../mayhem-native-clean-reproduction/README.md).
The separately published sweep-layout experiment is not a checkpoint successor
and is not composed here. The overlapping SDK-sharing work in PR238 explores
compiler metadata; it does not change these three trade calculations.

| Artifact | SHA-256 |
| --- | --- |
| Native control candidate | `9d242979b15dbac90be979732d4929ab58eb9d8b81051127424194ae3e60b291` |
| Recovered candidate (733,176 bytes) | `795ed55672f855fcfc1902120604e5c6500e2b05b9ff01005fa6751fbb4373ae` |
| Recovered symbol ELF (866,632 bytes) | `28bcf5f0c40a35a05da80854004831d9815200f7a4b23da3d5df69a9b58e9d9f` |

Three fresh proposal builds agree; two use the packaged controller with complete
SDK-member checks before/after. Both use the same official native Linux v1.54
compiler/target SDK, v1.52 stripper, locked registry source, root flags and pinned
network-disabled Docker image as the control. There are no dependency changes.
All 65 source inputs are authenticated and the verifier permits exactly the four
recorded line replacements, including after source hashes are resealed.

Fresh proposal replay covers **6,636 trade comparisons / 13,272 signed transaction
records**, through all six instructions and all fourteen instruction/currency
suites. All checked errors, account effects/rollback, events, CPI and returns
agree with the original. Five independent receipt checkers pass. The control's
full native packet additionally preserves 9,586 fresh comparisons and 19,202
signed records; its non-trade results are evidence for the control only, not
fresh proposal tests.

The control has 21 trade diagnostic differences; the proposal has **7**. Exactly
`retained10001` and `retained65535` are repaired in legacy Buy and each native,
Token and Token-2022 BuyV2/SellV2 suite. No formerly matching diagnostic regresses.
The remaining seven `quote_extreme_1_0_1` cases concern division-by-zero panic
construction and are left visible. The parent's 58 sweep diagnostic differences
are outside this trade-only change. Original ELF identity, the fifteen unmatched
bodies and complete semantic/transitive/data closure remain unproved.

## Inspect and reproduce

```sh
python -B research/mayhem-native-clean-reproduction/verify.py
python -B research/mayhem-retained-bps-recovery/verify.py
python -B research/mayhem-retained-bps-recovery/test_scope.py
python -B research/mayhem-retained-bps-recovery/analysis.py --check
python -B research/mayhem-retained-bps-recovery/cohort.py --check
```

These are offline saved-evidence checks: no compiler, target VM, RPC or network
is executed. The environment is Python 3.12, solders 0.27.1 and pyelftools 0.32.
`source.patch` is the complete code delta. `control-data.json`, `candidate-data.json`,
`validation/diagnostic-delta.json` and the saved receipts show before/after results.
Raw commands, compiler logs and independent-checker outputs are retained.

To materialize the actual candidate source into a new directory and rebuild it
using the SDK/cache setup documented by the native control:

```sh
python -B research/mayhem-retained-bps-recovery/verify.py \
  --skip-runtime --materialize /absolute/new/retained-source
python research/mayhem-native-clean-reproduction/build.py --work /absolute/work \
  retained-local --source /absolute/new/retained-source --fresh
```

The original captures, previous recovery packets, canonical selections and
workflow settings are unchanged by this contribution.
