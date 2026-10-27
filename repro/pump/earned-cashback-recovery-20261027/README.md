# Main Pump earned-cashback recovery

This checkpoint restores the earned-counter helper and its placement within
main Pump's v2 buy/sell instructions. **43 suites / 10,454 cases** pass. A clean
build reproduces both stripped and unstripped binaries. Whole-contract byte
identity remains unfinished.

## Source and instruction recovery

The captured function at `0x7bda8..0x7bec0` selects native or stable earned totals,
checks the addition, and reports the corresponding captured panic message.
The reconstructed helper has the same 280-byte body after normalizing only
internal call targets and addresses into known ELF sections. Raw helper bytes
still differ. Its `expect_failed` callee also matches under this normalization;
source-location records and full panic internals are not proven equal.

The previous source returned Anchor Overflow (6024) for these v2 overflows.
More importantly, it accumulated earnings after later payment operations.
Signed failing transactions showed extra inner CPIs before the error. The
recovered v2 paths now transfer cashback, update the earned counter, then
perform subsequent payments. Native sell likewise updates cashback before
crediting the user and ordinary fee recipients. Overlapping balance failures
confirm this ordering within the tested paths.

Only three main-Pump files change relative to the preceding checkpoint:
`buy_v2.rs`, `sell_v2.rs`, and `token_incentives/volume_accumulator.rs`.
The legacy buy routine is unchanged; it has separate remaining ordering gaps.

## Evidence and limits

- `baseline-cases.json.gz` exposes 32 differing cases out of the 61-case corpus.
  `earned-cases.json.gz` has none. Nine successful original transactions
  calibrate actual earned increments, then exact u64 boundaries, inactive
  cashback and overlapping payment failures are tested.
- Receipts retain signed synthetic transactions, complete logs, final accounts,
  events, return data and inner instructions. Panic messages are compared;
  source coordinates and compute-unit totals are retained but excluded.
- `proof/` symbolically executes both complete 280-byte helpers over every
  combination of native/stable u64 totals, u64 amount and a Rust boolean. Both
  agree with an independent checked-add specification and each other; all five
  mismatch and coverage queries are UNSAT with Z3 4.13.4.0. This assumes valid
  aligned disjoint memory and treats `expect_failed` as terminal. It excludes
  panic internals, source coordinates, callers and whole-transaction behavior.
- `full-regression.json.gz` contains the 43-suite run, including the new 61-case
  suite. `log-audit.json` compares panic text and Anchor error names/numbers/
  messages wherever paired logs exist. Cases without those fields are outside
  that audit, and complete logs are not claimed byte-identical.
- `recovered/`, `repeat/` and `promotion.json` bind the exact source and binaries.
  Scratch, canonical and clean-target builds have identical binary hashes.

## Remaining main-contract work

The full captured ELF still differs. Of 1,035 inferred original windows, 112
have raw local counterparts and 548 have narrowly normalized counterparts;
487 remain unmatched. These are local body counts, not semantic-coverage or
complete callee/data-equivalence claims. The trading handlers themselves still
have unmatched bodies.

Separate legacy-buy probes expose four boundary cases where the error agrees
but later payment CPIs occur before it. A scratch correction is being verified
under `work/pump-legacy-cashback-order/`; it is not part of this candidate.
Other main-contract reconstruction gaps, including scheduler/claim bodies and
remaining ABI, parser, dependency and layout differences, remain open.
Companion programs are outside this work.

Verify this checkpoint with:

```sh
work/test-env/bin/python repro/pump/earned-cashback-recovery-20261027/verify.py
```

The verifier binds source and binaries, re-executes the scoped proof and its
queries, checks signed receipts and accumulation calibration, recomputes local
body comparisons, and validates aggregate counts and the log audit.
