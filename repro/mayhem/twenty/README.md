# Mayhem twenty-handler checkpoint

This clean main-source candidate adds legacy `buy` to the preserved nineteen-
handler checkpoint. It is 457,600 bytes, SHA256
`cbc298fd88e6f4c940d92cae21605b6f9a8e4a57ce000993aea7c3daaf9e4c43`.
The entire file matches the independently built and fully tested scratch
candidate. The captured 777,408-byte original first differs at byte 24; there
are 247,853 differences across the shared length. This is bounded source recovery,
not complete program, historical source, or build identity. No original machine
code was embedded or patched into the candidate. `../nineteen/` is preserved.

There are **3,841 instruction comparisons across nine semantic suites**, accounting
for **7,682 original/candidate signed transactions**. New buy coverage has 486
synthetic cases: 187 successes and 299 rejections. All 3,355 previous comparisons
also pass on the same bytes: 2,953 admin/fee-recipient/extension/withdrawal/quote/
sweep cases, 396 sell cases, and six comparisons in three genuine burn sequences.

Buy uses 23 outer accounts, with a configured writable trader signer and the
original typed ownership, PDA/ATA, System, Token-2022 and self-program constraints.
The original `bonding-curve-v2` PDA derives under Mayhem. Its real Pump buy CPI
uses 18 accounts in outer-index order
`[8,10,3,9,11,4,5,6,7,12,13,14,15,16,17,18,21,22]`; Mayhem itself signs its real
sol-vault PDA. Arguments are a u128 price reference and two u16 basis-point values.
Pause/rate/deadline/threshold and price-band guards precede reserve arithmetic.
The resulting budget is capped by configuration and retained real SOL reserves;
token output is capped by real token reserves. Actual post-CPI deltas update
checked i128 counters before overall/per-coin risk checks. Positive counters must
have low u64 limbs strictly below their limits, reproducing the original behavior
on explicitly synthetic large-counter boundaries. Failure rolls back the whole
transaction, including Pump changes. Complete 303-byte log and self-CPI events
are reproduced.

Portable buy tests ran again from their final repository paths against the clean
main artifact. Original/candidate VMs receive byte-identical transactions signed
by test-owned payer/trader keypairs, with signature and blockhash checks enabled.
The simulator GlobalParams names the actual test trader. All watched account
bytes, metadata and balances, errors, return data, events and inner instructions
agree; only the deliberately different Mayhem executable account is excluded
from cross-binary equality. Both executable hashes remain captured.

`buy-verification.json` independently checks 972 signed transactions, 374
successful-side quote/CPI/state/event observations and 598 failed-side complete
rollback observations. It derives expectations from saved starting bytes and
handles zero-lamport System-account removal. Coverage includes strict risk limits,
negative/zero/large counters, real-token caps, funding depletion, volume windows,
malformed accounts, truncation, flags, program substitutions and CPI rejection.
No live authority, historical prestate or full historical buy replay is claimed.
No privileged initializer or authorization workaround was used.

Raw diagnostic differences remain recorded. Compute usage and source paths differ.
Four buy panic cases have normalized log differences: rate-add overflow, retained
basis points 10001/65535, and zero virtual SOL. Their errors and complete rollback
agree; zero virtual SOL additionally logs an Option unwrap in the candidate.
Existing sell/burn diagnostic caveats remain unchanged. Exact historical compiler,
dependencies and executable layout are unresolved. `buy_v2`, `sell_v2`,
`buy_pump_swap`, `sell_pump_swap` and `initialize_mayhem_state` remain absent.

`build-comparison.json` and `source-snapshot.tar.gz` bind actual integrated inputs;
`main-scratch-identity.json` proves whole-file identity to the tested scratch
artifact. The seven inherited suites retain their original harness metadata and
bind the same candidate SHA; six legacy runners record the then-current main19
sources, while the clean build records actual main20 sources. Runtime, source and
test snapshots include the build helper and `build_source_manifest.py`. Prior
research attempts and static original-byte-checked excerpts remain archived.

```sh
python3 scripts/mayhem_buy_differential.py \
  --candidate repro/mayhem/twenty/mayhem_recovered.so \
  --cases repro/mayhem/twenty/buy-cases.json --output work/mayhem20-buy.json
python3 scripts/verify_mayhem_buy.py \
  --candidate repro/mayhem/twenty/mayhem_recovered.so \
  --receipts work/mayhem20-buy.json --output work/mayhem20-buy-verification.json
```

The saved compressed report is also accepted by the verifier. To replay the
captured burn sequences, extract `captured-fixtures.tar.gz` into a new work
directory and use `scripts/mayhem_burn_sequence.py` and its independent verifier,
as documented in the preserved nineteen-handler package.
