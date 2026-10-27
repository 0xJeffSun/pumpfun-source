# Complete AMM Buy quote-helper recovery

The complete **1,256-byte O0092 helper at original 185296** now matches all
157 instruction slots / 143 decoded instructions under the existing relocation
and local-CALL normalization. Composed with [PR280's Sell recovery](https://github.com/lalalune/pumpfun-source/pull/280)
and upstream's initializer/BuyV2 source, the actual native inventory advances
**431 to 432 of 441 normalized windows**. All 84 native raw-local matches and
4,373 prior positive immediate-call observations survive; ten new same-offset
observations give 4,383. Nine windows / 107,952 original text bytes remain
unmatched. Whole core identity remains **0/4**.

This recovery was found by independently replaying an existing control that the
previous handoff had incorrectly classified as negative. Its original 67-input
source map authenticates. The new proposal extracts only that Buy region and
caller change onto PR280's exact source; it preserves the newer initializer,
complete Sell helper, BuyV2, root program namespace and generated references.
The earlier control is not relabeled as a current build or execution.

## Source and machine evidence

Only `src/state.rs` and `src/instructions/buy_pump_swap.rs` differ from PR280.
The helper accepts the actual instruction's `u16` basis points, the caller drops
its redundant widening, and `native_mint::id()` is used. The cap is selected as a
reference to the real GlobalParams field. An early retained-basis-points call
preserves bounds rejection, while the retained value is computed after cap
selection immediately before the reserve limit. Physical source line counts and
all bytes outside the Buy helper/caller region remain unchanged.

A fresh conditional control keeps the other preparations but computes the
retained value early. Its Buy helper is 1,176 bytes and remains unmatched;
the union returns to 431 windows while keeping Sell and initializer matches.
This excludes only that exact tested form. The recovered Rust is an inferred
reproduction, not authenticated original private source.

All ten actual local calls match complete callee shapes at the same offsets.
Ten ordered immediate data contracts also agree: three 43-byte unwrap messages,
three 32-byte Debug vtables with immediate formatter shapes, and four counted
37-byte filename/Source records at `463:14`, `424:43`, `464:34`, `321:26`.
The actual BuyPumpSwap handler is identified through its matched wrapper;
its helper call is at original +2,136 and candidate +2,952. The full handler
remains unmatched. Sell's ten ordered data contracts and immediate callees are
rechecked on both new proposal artifacts. No recursive, indirect or global-data
closure is asserted.

## Build provenance

Three fresh sequential official Linux v1.54 builds capture the proposal, a
complete raw-identical repeat and the early-computation negative control.
PR280's exact 431-window parent build is explicitly **reused**, not freshly
recompiled. All four captures retain all 67 source inputs, actual compiler logs,
commands/environment, six executable identities, eight ELFs and four actual
strip replays. `source.tar.gz` is a deterministic full capture of the exact
PR280 source; changed inputs are captured separately. No Git/history/network
fallback is required to resolve sources.

Accepted candidate: 755,992 bytes, SHA256
`3c38a0607b3523c62a02e699a530c2945d3e190947edda09176b2dc17777c1d6`.
Symbols SHA256:
`1f8206f94d6ec3193ac92b71ab9abe3e5095c5d8e2721c61bf8fa2db1ec08e63`.
Both complete artifacts repeat exactly. The SDK acquisition, 26 target-library
and mode-only linker repair receipts are preserved. Dependencies are warm;
not every host library or original archive mode is authenticated. Native
objcopy is v1.54; qualified/mixed v1.52 and historical-macro recipes retain their
own raw counts and are not summed here. Originals are comparison inputs only.

## Fresh bounded runtime evidence

The exact 432-window candidate is replayed against the captured original in
six frozen AMM Buy/Sell suites. The three Buy suites have 419 pairs each and
three Sell suites have 413 each: **2,496 pairs / 4,992 independently verified
signed records**. Native and legacy-token Buy exercise successful CPIs; the
Token-2022 Buy suite contains only rejections and does not establish successful
Token-2022 Buy behavior. Complete receipts, raw logs, actual commands and
independent outputs are retained without normalization.

| Suite | Pairs | Successful pairs | Rejections |
| --- | ---: | ---: | ---: |
| Buy native | 419 | 163 | 256 |
| Buy legacy token | 419 | 164 | 255 |
| Buy Token-2022 | 419 | 0 | 419 |
| Sell native | 413 | 176 | 237 |
| Sell legacy token | 413 | 177 | 236 |
| Sell Token-2022 | 413 | 0 | 413 |

These are the frozen checkers' error/state/event/CPI/return/transaction
predicates, not raw-log or CU equality or exhaustive behavior. No fresh full
14-suite, initializer, Burn or sweep execution is claimed. Earlier PR280 and
historical runtime receipts keep their own artifact bindings and are not
retagged or added as new unique cases.

## Independent offline checks

```sh
python3 -B research/mayhem-buy-retained-recovery/verify.py
python3 -B research/mayhem-buy-retained-recovery/test_verify.py
# Explicit optional replay; uses an existing dependency environment, no VM/RPC:
python3 -B research/mayhem-buy-retained-recovery/replay_saved_signatures.py --python /path/to/python-with-solders-0.27.1
```

Normal and minimal isolated stdlib verification recompute the complete window
inventory, raw-local/no-loss sets, positive direct edges, ordered callees/data,
source/build/strip provenance and complete saved archive hashes. Four root
inputs in `scope.json` are pinned; missing inputs fail without a fallback.
The saved independent-check outputs are bound, not a second crypto proof.
The optional frozen harness replay independently repeats the same signature
checks using existing Solders 0.27.1; these are not additional VM cases.

Fourteen actual mutation/boundary tests cover scalar/register/stack/branch,
CALL target, import name, typed Source data, root source, manifest membership,
symlinks, special files and optimized Python. The relocated-pointer boundary
intentionally stays opaque until the typed-data layer. Normalization adds no
new masks. The 220-script frozen inventory is retained, not a claim all scripts
were executed. Only this new packet is changed; original captures, frozen
scripts/workflows, selected checkpoints and global ledgers remain unchanged.

Both whole Mayhem output and capture comparisons remain false. Other three
core programs are not freshly compiled or compared by this packet.
