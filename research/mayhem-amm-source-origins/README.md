# Mayhem AMM shared state and source origins

This research source continues the verified Sell-origin baseline. It restores
shared AMM Buy validation, accounting, risk checks and source-origin diagnostics.
It does not yet reproduce any additional complete original function body.

Both real root builds emit the same 625,488-byte candidate:
`fa4f9894cdecf2dd1528fe09e25aa8b762fea5771a8b32827ccff5f8c0b24da7`.
The symbol ELF is
`f3842f3de053ba2e3ace334bbd1155e8463f3114d8386e82351a17e683aab7f4`.
The source has sixteen inputs, adding `instructions/pump_amm_interface.rs`.
Canonical program sources and selected checkpoints remain unchanged.

## What changed

- AMM Buy calls the existing shared trade/quote validators, preserving their
  original state.rs error sites.
- Shared buy accounting updates quote deployment and token balances, then checks
  overall and per-coin risk limits at state.rs 243 and 250. Its 2,536-byte body
  and twelve calls are close to O0090's 2,544 bytes/twelve calls, but the risk
  branching still differs. Similar size is not a complete-body match.
- One retained-reserve subtraction serves Sell and AMM Buy at state.rs 321:26.
  The AMM first quotient conversion and final division/conversion carry the
  original 424:43, 463:14 and 464:34 coordinates. These coordinates are checked
  against the original relocated Location records, not invented diagnostics.
- The balance-delta adapter lives at its original source path and restores both
  arithmetic panic sites: pump_amm_interface.rs 403:23 and 404:26. This is ordinary
  compiled Rust; no diagnostic strings or executable output bytes are patched.

The AMM quote body remains 1,120 bytes against O0092's 1,256, with ten direct calls
in each. The accounting body and quote body remain unmatched. Cap expression,
helper split and limit ordering controls did not recover either full body.
The retained records here bind the final source and results, not all private
rejected experiments. One overlapping private build failed before saving an
artifact and supplies no accepted evidence. The final build driver serializes
access to its private target directory; the two accepted final builds agree.

## Fresh verification

| Replay | Cases | Verified signatures | Successful original cases |
| --- | ---: | ---: | ---: |
| BuyPumpSwap native | 419 | 838 | 163 |
| BuyPumpSwap legacy token | 419 | 838 | 164 |
| BuyPumpSwap Token-2022 | 419 | 838 | 0 |
| Legacy Sell | 396 | 792 | 134 |
| Admin transport/update/reset | 1,032 | 2,064 | 624 complete account results checked |
| Three sequential Burn families | 6 signed operations per side | 12 | See Burn receipts |

All 5,382 saved signatures verify independently. All 1,653 trade comparisons have
identical logs after removing **only** explicit compute-consumption lines. Raw
compute logs still differ. This removes the previous AMM control's 27 native and
25 legacy-token diagnostic differences. Token-2022 cases cover rejections only.

The verifier compares signed transactions, errors, tracked account snapshots
except the intentionally different Mayhem executable, CPI instructions, return
data, event logs and snapshot digests. The separate Sell verifier recomputes its
successful updates and rollback obligations. The admin verifier reconstructs
624 complete successful account results; initializers remain excluded. Burn
uses its existing bounded comparison and exclusions, including its compute and
source-coordinate scope. No mainnet execution or exhaustive semantic proof is
claimed. Builds use the pinned Darwin v1.54 SDK, v1.52 stripper and private cached
dependencies; they are fresh root compilations, not fresh dependency builds.

## Honest inventory expansion

The full 441-window ledger now explicitly examines O0090 (shared buy accounting)
and O0092 (AMM buy quote), previously retained as opaque. Thus **198 examined =
188 matched + 10 unmatched**, with **243 opaque**. No old match was lost. This
is an expanded audit scope, not a regression or a claim of additional byte
identity. The original 196-window cohort still retains all 188 matches.

Among examined windows, 46 are raw-local and 142 normalized-only. Twelve opaque
windows also happen to match raw-local bytes, giving 58 across the full ledger.
The ten examined gaps total 101,480 original bytes. This excludes opaque code,
data, relocations and whole-ELF layout; it is not a completion percentage.
See [functions.tsv](functions.tsv) for every row.

```
python3 -B research/mayhem-amm-source-origins/inventory.py --check
python3 -B research/mayhem-amm-source-origins/verify.py
```

These commands verify saved evidence without running a compiler or target.
Source/build inputs, exact commands, logs and both artifacts are retained under
`sources/`, `builds/` and `artifacts/`. The recorded build helper's absolute SDK,
cache and source paths require a prepared local environment for a new build.
