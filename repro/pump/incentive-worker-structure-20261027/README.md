# Main Pump incentive worker reconstruction

This work is confined to the captured **main Pump contract**. It reconstructs
its volume-accumulator worker and post-claim state update; no companion program
was changed.

## Recovered structure and behavior

The captured worker at `0x7bfd8` receives global/user accumulators, timestamp,
new volume and user key. The previous implementation exposed only claim-time
accrual. The reconstructed worker retains the full interface, copies the user
key internally, updates global/user volume, and preserves the separate end-day
helper. Claim continues to pass zero new volume. Static call tracing found only
its claim caller; no missing buy-volume behavior is asserted.

The module path `token_incentives/volume_accumulator.rs` comes from captured
panic/error metadata. Overflow handling now uses the observed checks and panic
messages. Full-log replay also found a real diagnostic mismatch after payout:
the original uses checked addition followed by `Option::unwrap`, while the old
reconstruction used `+=`. The corrected `record_claim` helper preserves the
observed checked sum, timestamp, flags, claimed total and pending-total update.
Source locations are natural locations in the reconstructed source; original
file coordinates have not been fabricated.

## What is proved, and what remains

- The worker's first **104 bytes match exactly**, including the argument-stack
  loads and user-key copy. Its full body remains different: 1,584 reconstructed
  bytes versus 1,864 captured bytes.
- The end-day helper is 232 bytes in both builds but still has 12 differing
  instruction slots after masking only internal call targets and ELF pointers.
- `proof/` contains an all-input SMT comparison derived from both actual SBF
  instruction windows. It covers every combination of the three 64-bit time
  fields, proves both path sets cover the input domain, and proves no reachable
  division by zero. Return values and terminal panic kind/message agree.
- That proof assumes valid global-struct memory and abstracts panic calls as
  terminal outcomes. It excludes panic allocation, source-location metadata,
  callers, transaction execution and whole-contract behavior. It is **not** a
  proof of ELF equality.
- A bounded worker instruction model checks 645 cases, including nonzero new
  volume, nonuniform daily arrays, overflow, and partial state before errors.
  It uses explicit summaries for integer builtins, the proved day helper, and
  terminal errors; it does not execute allocator/error construction internals.
- An independent concrete interpreter checks 4,515 day-index cases. Signed
  transaction receipts cover the 334-case claim corpus and a separate 334-case
  seeded holdout. Two full-log regressions check both overflow messages. The
  older build fails the claimed-total diagnostic; the corrected build passes.
- The full runner now requires **41 suites / 9,787 cases**, including those two
  diagnostic checks. A clean-target repeat build and the saved receipts are
  checked by `verify.py`.

Raw local body equality remains 112/1,035 captured function windows; 546 have
narrowly normalized local counterparts. These are local-body measurements,
not coverage percentages or a complete semantic proof. Full main-Pump source,
call/data identity, instruction layout and ELF reproduction remain unfinished.

## Retained evidence

`recovered/` binds the exact source snapshot, compiler/cargo hashes, commands,
logs and both ELFs. `repeat/` records a clean-target rebuild. `research/` retains
intermediate worker builds and the rejected v1.48 compiler control: that control
reduced normalized matches from 546 to 231 despite a closer small helper.
A separate root-crate inlining experiment reduced the count to 526 and left the
worker body unchanged, so it was also rejected. A 16-codegen-unit build left the
worker unchanged and reduced normalized matching windows to 361.
`panic-before-fix.json.gz` and its hash-verified capture adapter preserve the
counterexample. All replays are local; no transaction was broadcast.

To verify from the repository root, the proof verifier needs the pinned solver:

```sh
work/test-env/bin/python -m pip install --no-deps --target work/pump-claim-byte-recovery/z3-runtime z3-solver==4.13.4.0
work/test-env/bin/python repro/pump/incentive-worker-structure-20261027/verify.py
```

The solver is isolated from the shared Python environment. SMT queries are also
saved separately for inspection and replay.
