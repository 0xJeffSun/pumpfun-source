# claude-mayhem-437-20261028

Source recovery of Mayhem window **O0079**, the `SellPumpSwap` handler (original start 95848, 17,312 bytes). It builds on the 436/441 frontier that PR #404 merged on main. The packet also archives the r436 lane partials for the four windows still open.

- **Parent:** the 436/441 tree shipped on main in `research/claude-mayhem-436-20261027/` (stripped `e93b60f1…`, symbols `49d70dc7…`).
- **With this change: 437/441.** The only gain is O0079.
  - No losses of any kind. Raw-local stays at 100. Direct edges go 4472 → 4520 and Source records 484 → 487.
  - No stack-offset warning.
- **Remaining unmatched:** O0076, O0077, O0083, O0084.

The change is ordinary Rust in one file, `src/instructions/sell_pump_swap.rs`. It uses no asm, padding, patched bytes or unused operations, and keeps the line count at 115.

## What changed in `SellPumpSwap::handler`
Found by lane `o0079-brute-r1`. Lane `o0079-ir-r1` confirmed it independently at the IR level, and lane `o0079-port-r1` confirmed it again.

- **Price and quote helpers.** The effective-quote and price-check arithmetic move into two `#[inline(always)]` helpers, `effective_quote` and `price_check`, using the O0081/O0082 let-else closure forms. `validate_quote`, `price_check` and `sell_quote` then run in the original order.
- **`native_accounting` removed.** The event's `global_quote_deployed` selects on `native` alone. This matches the original's instruction stream.
- **Inline signer seeds.** The CPI account struct is built inline, with the `sol-vault` signer seeds written in place.
- **Event block.** The event is assembled in the original's phased order. The scalar fields are let-bound in the order the original loads them. The struct literal follows the original's store order. The `Pubkey` fields stay inline `key()` temporaries.
  - The inline temporaries keep their lifetime markers, so the stack frame stays at the original size. A let-bound Pubkey copy-props away its StorageLive/Dead and grows the frame by 32 B.
  - `quote_mint` is bound last, after the `Clock::get()?` operand. That reproduces the original's quote-mint-first memcpy.

The IR proof (`llc` on rustc's own module with 3–4 edits gives the exact window) is in `partials/o0079-ir-r1/` and `partials/o0079-brute-r1/`.

## Layout
- **`source.patch`:** unified diff from parent-436 to shipped (`a/programs/mayhem/…`).
- **`sources/`:**
  - `parent/` and `shipped/` hold the touched file.
  - `source-inputs.parent436.json` and `source-inputs.json` are the full 67-file inventories.
- **`builds/`:**
  - Clean build (fresh target, anchor re-cleaned): `candidate.so.gz` (stripped `4bfd62f2…`), `symbols.so.gz` (`847485d3…`), `build-result.json`, `launch.json`, `build-stderr.gz`.
  - `repeat-*`: the lane's incremental build of the same 67 inputs, which gave the identical stripped ELF.
- **`measurement/`:**
  - `measure-vs-parent436.json`: 436 → 437, gains `[O0079]`, no losses.
  - `winreport.txt`: per-window report.
- **`runtime/`:**
  - `sweeps-differential.json.gz`: stock sweep suite (`scripts/mayhem_validate_sweeps.py`), 692 cases, 0 mismatches.
  - `trades-summary.json`: 14 trade families, 6,636 cases. These cover the three `sell-amm-*` SellPumpSwap families. The per-family outputs are not committed; rerun them with `research/claude-mayhem-b-20261027/tools/run_trades.py`.
- **`partials/`:** NOTES (plus BEST patch and measurement where one exists) from every r436 lane on O0076, O0077, O0079, O0083 and O0084, with the shared `FINDINGS.md` and lane `RULES.md`. Best open-window states at packaging time:
  - **O0076** `sweep_fees`: 7 masked slots, no losses (`o0076-port-r1`). `native` is computed in the handler and passed into `SweepFees::sweep`. JumpThreading's cloned `noalias.scope.decl` keeps the original branch triangle.
  - **O0077** `buy_pump_swap`: 2 masked slots. The remaining difference is the same 64 B Pubkey-local frame shift that O0079's form solves.
  - **O0083** `buy_v2`: 162 slots, no losses (`o0083-ir-r1`). The cap select moves inside `state::initial_trade_output`.
  - **O0084** `sell_v2`: 25 slots, from cap-select-inside-`initial_trade_output`, the price-check let-else forms and quote-first arm tuples.
- **`verify.py`:** stdlib-only checker that does not depend on HOME.

## Build
Mixed host/target SDK, qualified `ordered.ld`, under the shared slot lock:

    python3 claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- \
      python3 -B claude-mayhem-work/mayhem-b/build/build_lane.py LABEL ROOT TARGET

`ROOT` is the 436 tree with `source.patch` applied.

## Verify
    HOME=$(mktemp -d) python3 -B research/claude-mayhem-437-20261028/verify.py
