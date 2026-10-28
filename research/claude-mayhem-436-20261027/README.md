# claude-mayhem-436-20261027

Source recovery of two more Mayhem windows, **O0081** (Legacy Buy handler, original start
113672, 13,848 bytes) and **O0082** (Legacy Sell handler, original start 127520, 12,992 bytes),
on top of the 434/441 frontier merged on main by PR #397.

Parent: the 434/441 tree shipped on main (mayhem-b `cp4-q04-o0075`, PR #390, with
`research/claude-fees-final-mayhem-o0073/composition-cp4/fee_recipients.rs`, PR #397;
stripped `e0d0d0c3…`, symbols `828751f9…`). With this change: **436/441**, gains exactly
O0081 + O0082, **no losses of any kind**, raw-local 100 kept, direct edges 4370 -> 4472,
Source records 470 -> 484, no stack-offset warning. Remaining unmatched windows: O0076, O0077,
O0079, O0083, O0084.

The change is ordinary Rust only: no asm, padding, patched bytes, or unused operations. It
touches six files (`source.patch`). Line counts are preserved everywhere except
`pump_interface.rs`, which drops its now-unused trailing `legacy_price_check` helper (the last
12 lines of the file), so every earlier line:column is unchanged.

## Layout
- `source.patch`: unified diff from parent-434 to shipped, paths `a/programs/mayhem/...`.
  Apply it with `patch -p1` at the crate root's parent.
- `sources/parent/`, `sources/shipped/`: the six touched files before and after.
  `sources/source-inputs.parent434.json` and `sources/source-inputs.json` are the full 67-file
  inventories of both trees.
- `builds/`: `candidate.so.gz` (stripped, `e93b60f1…`), `symbols.so.gz` (`49d70dc7…`),
  `build-result.json`, `launch.json`, `build-stderr.gz`, plus `repeat-build-result.json` and
  `repeat-launch.json` from the second clean build (different fresh target dir), which gave the
  identical ELFs.
- `measurement/measure-vs-parent434.json`: 434 -> 436, gains [O0081, O0082], no losses.
  `measurement/measure-vs-parent433.json`: against cp4 (433), gains [O0073, O0081, O0082], no
  losses. `measurement/winreport.txt`: per-window report for the remaining windows plus O0073
  and O0082. `measurement/o0082-ablations.json`: lane pl-o82's ablations. Each one removes a
  single O0082 hunk, and each removal loses O0082 (see PROGRESS.md).
- `runtime/sweeps-differential.json.gz`: the stock sweep suite
  (`scripts/mayhem_validate_sweeps.py`, 692 cases) on the shipped stripped ELF. It has 0
  mismatches and equals the original on every case, logs included (mod compute units). It is
  also case-for-case identical to the parent-434 receipt on main.
- `runtime/trades-summary.json`: 14 trade families, 6,636 cases, 0 mismatches, 0 non-compute
  log differences. The per-family outputs are about 700 MB and are not committed. To rerun them:
  `research/claude-mayhem-b-20261027/tools/run_trades.py ROOT candidate.so OUTDIR`.
- `verify.py`: a stdlib-only checker that does not depend on HOME.

## Build
Mixed host/target SDK, qualified `ordered.ld`, under the shared slot lock, run twice with fresh
target names and `LANE_CLEAN_ANCHOR=1`:

    python3 claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- \
      python3 -B claude-mayhem-work/mayhem-b/build/build_lane.py r436-bank-a ROOT r436-bank
    python3 claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- \
      python3 -B claude-mayhem-work/mayhem-b/build/build_lane.py r436-bank-b ROOT r436-bank2

`ROOT` is the parent-434 tree with `source.patch` applied. Both builds gave stripped
`e93b60f1001c5bc65d4c24b3b3e727d52fb887b9a671c1bd5f7863e27c65ef93` and symbols
`49d70dc773147690f6b0995c0b1f2c0620741262c2809b34337e3314b6b30f38`. These equal lane pl-o82's
incremental `final2-434` build.

## Verify
    HOME=$(mktemp -d) python3 -B research/claude-mayhem-436-20261027/verify.py

The checker covers six things:
- the manifest;
- that the parent tree equals main's 434 tree (cp4 source-inputs plus the #397 fee_recipients.rs);
- that the patch reproduces the shipped files;
- that the gzipped ELFs match both clean builds, with no stack warning;
- the measurement: O0081 and O0082 are the only gains and nothing is lost;
- the runtime receipts, recomputed from the committed data and bound to the shipped ELF.

## Mechanism
See PROGRESS.md. In short:
- O0081 (Legacy Buy) closes when the trade helpers take the bonding curve and the cap by
  reference, the price check uses `let … else` with `checked_div`, the Pump `buy` CPI context is
  built inline with inline signer seeds, and `SellEvent` is declared in its serialized field
  order with `side: bool`.
- O0082 (Legacy Sell) needs that layer plus four sell-side hunks: the price check as an
  immediately-invoked closure, inline signer seeds, the `token_program` clone before
  `creator_vault`, and the `SellEvent` literal order.
