# Main Pump: incentive scheduler integration and signed-time recovery

This pass concerns the main Pump contract only. The goal of a perfectly
reconstructed contract remains **unfinished**. The current main source declares
54 of the captured IDL's 56 instruction names; declaration is not behavioral or
byte-identity acceptance. `claim_token_incentives` and
`set_mayhem_virtual_params` still have no dispatch wrapper in this source.
No other program source is changed by this pass.

## Source change and counterexamples

The previously isolated `admin_update_token_incentives` reconstruction is now
compiled by the main Pump crate. `GlobalVolumeAccumulator` derives `Debug` for
the observed end-of-handler state log.

A 575-case signed offline suite found five errors in the initial integration:
negative timestamps and stored schedule bounds could incorrectly succeed or
produce a named error where the captured program aborts. The original worker
at `0x7c720` calls an end-day helper at `0x7dfc8`. Its field conversions occur
before unsigned checked subtraction and division. The source now preserves
these conversions and the early before-start return in the current-day path.
The final artifact matches all 575 cases, including the five counterexamples.

The source records, both compiled candidates, and counterexamples are retained.
The fixture's Global authority is replaced with a disposable signer; accumulator
state, mint, and funding are local synthetic inputs. These malformed schedules
are not claimed to be reachable through every legitimate schedule transition.
No public-network transaction was sent.

## Verification

- Full maintained Pump corpus: 9,259/9,259 across 38 suites.
- Expanded scheduler: 575 matching cases, 191 original successes.
- Prior incentive administration suite: 98/98, including 43 successes.
- Quote control: 507/507.
- Volume synchronization: 341/341.
- `sell_v2`: 206/206, including the previously added transfer-fee boundaries.
- V3 quote-mint extension suite: 126/126 across all three v3 trade handlers.

The full run passed its first 37 suites, then the frozen final harness rejected
the expanded source manifest before executing. A current adapter replaces its
hard-coded 36-file check with equality against the complete actual manifest;
its 20 cases then pass, including 18 cases that enter Pump through the captured
caller. The frozen historical harness is unchanged. `full-regression.json.gz`
records both execution segments and retains the first-attempt failure log.
The aggregate runner now uses this adapter and expects the expanded 206-case
`sell_v2` suite.

These suites overlap in purpose and must not be added as unique semantic
coverage. Receipts compare errors, account state, events, inner instructions,
and return data. Compute consumption and every diagnostic source coordinate
are outside that equality claim.

The accepted artifact is built directly with the cached v1.44 Rust/Cargo tools,
using locked offline dependencies, a separate target directory, and
`-Zremap-cwd-prefix=`. This avoids the old installer rejecting non-semver names
in the shared SDK cache. The driver-patching experiments were unsuccessful and
are not the accepted recipe. Compiler identity, command, environment, source
hashes, logs, and unstripped output are retained under `recovered/`. A second
build in a fresh target directory reproduces both artifacts exactly; see
`repeatability.json` and `repeat/`.

The stripped candidate is 1,636,648 bytes, SHA-256
`f71642116dbbbdcdacf35a9fd3d1c7b8b3973de8146a1099fc0624eda1336ef2`.
The captured file is 10,485,715 bytes, SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
**Whole-file equality is false.** The scheduler's business body and day helper
also remain unmatched under the existing instruction matcher. The closure
match in the saved function report does not certify the handler.

Run the frozen evidence verifier from the repository root:

```sh
work/test-env/bin/python repro/pump/focused-incentive-scheduler-20261026/verify.py
```

The verifier reads saved evidence; it does not run the target. Fresh runtime
checks use `scripts/pump_incentive_schedule_differential.py`, with a separately
built `--candidate`, `--build-comparison`, and new `--output` path.
