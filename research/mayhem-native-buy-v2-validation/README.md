# BuyV2 shared validation on the native Program source

This composes PR226's verified shared-validator call with the newer
[native Program parser source](../mayhem-native-program-recovery/README.md).
It keeps all 54 source/vendor inputs except the six-line BuyV2 validation block,
which becomes a call to `MayhemState::validate_trade` with blank lines preserving
later source coordinates. It does not substitute PR226's older fifteen-input
Linux artifact for the newer source.

Two real root builds reproduce the same 624,560-byte candidate:
`14f7054abdedfe8986f0c1ee1a1a687239d1cbcece0cebe308f0a7c4ce9f2a26`.
The symbol artifact is
`a08ba8c311f5b4dfba94814e8fefdd871cff62b5ac4935f47abb19eec5d6c045`.
These reuse the private dependency cache and do not claim all-dependency-clean
compilation. Source and vendor inputs are authenticated against the parent.

## Preserved bodies and restored call

The full scan preserves all **341 matching original windows**, including the
fourteen parser gains, 58 raw-local matches and 283 normalized-only matches.
There are still 100 unmatched windows totaling 350,216 original text bytes.
No new complete body match or whole-ELF equality is claimed.

The matched O0189 entry wrapper identifies O0083 as BuyV2. Its original call to
O0094 is now present in this candidate. O0094's complete 1,192-byte body and all
nine ordered immediate callee bodies match under the unchanged normalization.
The full BuyV2 body, its remaining data/callee differences and transitive closure
remain unresolved. `edge.json` records actual call sites and targets, and
`audit.json` records all 441 windows for this artifact.

## Fresh bounded replay

All 613 cases in each of three quote families pass: **1,839 fresh comparisons**.
The checker independently verifies 3,678 signatures and recomputes the existing
BuyV2 success and rollback obligations. For the before/after comparison it also
rechecks the 3,678 signature entries from the parent's already-published BuyV2
receipts, for 7,356 verified entries across both candidates.

Non-compute log differences decrease from **130 to 118**. The remaining 118 and
raw compute differences are not normalized into an equality claim. Original
errors, tracked account outcomes, CPI, return data and events agree throughout
these bounded cases. Fixtures are synthetic local executions, not mainnet.

The parent's other trade suites, 1,032 admin cases and Burn families were not
rerun on this follow-up. Their observations retain the parent candidate hash;
they are not relabelled as fresh execution of this artifact. Canonical selected
sources/checkpoints are unchanged.

## Recheck

```
python3 -B research/mayhem-native-buy-v2-validation/verify.py
python3 -B research/mayhem-native-buy-v2-validation/analysis.py --check
```

The verifier authenticates the complete parent source map, the one-file change,
both builds, all-window preservation, the restored call and signed replay. It
executes no compiler or target VM. `override/`, `source.patch`, `builds/`,
`artifacts/` and `runtime/` retain the reproducible evidence; absolute recorded
build paths require relocation and a prepared SDK/cache for a new build.
