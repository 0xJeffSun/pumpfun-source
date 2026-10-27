# Main Pump shared scheduler reconstruction

**Validated:** 42 suites / 10,362 cases pass, and a clean-target rebuild
reproduces the candidate. Whole-contract byte identity remains unfinished.

This pass restores a shared routine and a missing function boundary inside the
main Pump contract. It does not modify companion programs.

## Recovered structure

The capture has a state-update worker at `0x7c720..0x7dfc8`. Its outer scheduler
obtains the clock and emits events/logs. The reconstruction previously combined
those layers, so comparing that combined handler against the worker was not a
like-for-like byte comparison.

The state worker now lives in `token_incentives/volume_accumulator.rs`, the path
present in captured error metadata. It receives the accumulator, requested
start/end/period, mint, day number, supply, and timestamp in the observed order.
The outer instruction calls it before emitting the event and accumulator log.
The claim worker and scheduler now call the same end-day helper, matching the
shared routine in the capture rather than maintaining separate copies.

Static call-site multiplicity is still different: the captured shared helper
has four direct call sites, while this build has three. The worker's full
instruction body remains unmatched (6,312 captured bytes, 4,856 reconstructed
bytes). The shared 232-byte helper still has 12 differing normalized instruction
slots. These gaps remain explicit in `recovered/`.

## Corrected diagnostics

Comparing complete panic messages revealed 25 counterexamples hidden by the old
field comparison:

- 21 zero-period cases emitted generic division-by-zero text instead of
  `current_timestamp should be bigger than start_time`.
- Four period-multiplication overflow cases emitted generic overflow text
  instead of `Unexpected overflow`.

The worker now uses the observed checked arithmetic and panic messages. The
scheduler regression compares these messages while retaining complete logs,
including the differing natural source coordinates. No historical file/line
coordinates were fabricated.

## Evidence and limits

- `before-schedule.json.gz` retains all 575 old-candidate comparisons and their
  25 diagnostic failures. `schedule-cases.json.gz` retains the corrected run.
- Signed transaction checks cover the 575 scheduler cases, 334 claim cases,
  two claim-panic regressions, and 60 probes with jointly extreme time fields.
- Direct instruction models cover 816 scheduler-state cases, 645 claim-worker
  cases, and 4,515 day-index cases. The models use explicit summaries for integer
  builtins, errors, and panics; they do not execute allocation or error-formatting
  internals. They retain intermediate state, including state before failures.
  The scheduler model is also calibrated against all 191 successful signed VM
  scheduler cases, including their serialized account contents. All 191
  accumulator debug messages in those successful cases match exactly.
- `proof/` contains the shared day helper's all-input comparison over three
  64-bit fields. It proves return and terminal panic kind/message equivalence,
  path coverage, and absence of reachable zero division under valid global
  memory. It excludes source-location diagnostics, panic internals, callers,
  and whole-contract behavior.
- The aggregate runner now requires **42 suites / 10,362 cases**, including the
  scheduler and its diagnostic assertions. `repeat/` holds the clean rebuild.

The verifier checks actual source/binary hashes, native instruction windows,
signed receipts, model executions, the symbolic result, and the aggregate run:

```sh
work/test-env/bin/python repro/pump/shared-scheduler-20261027/verify.py
```

It uses the isolated `z3-solver==4.13.4.0` runtime under
`work/pump-claim-byte-recovery/z3-runtime`, installed during the preceding pass.
The saved SMT queries can also be inspected or replayed separately.

Whole main-Pump reconstruction remains unfinished. The build still differs from
the captured ELF, and only 112 of 1,035 original windows have raw local body
counterparts (546 have narrowly normalized counterparts). Those counts are not
complete semantic-coverage measurements.
