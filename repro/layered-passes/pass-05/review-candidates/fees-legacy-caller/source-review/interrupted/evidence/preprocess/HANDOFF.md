# Static-only handoff

Recovered the complete [231576,234096) preprocessing contract and supplied `proposal/remaining_preprocess.rs`, a separate uncompiled helper bound to the exact 8ff12 source map. No main changes.

The helper uses `curve.complete`, returns the original slice when false, otherwise checks/removes the last AccountInfo. It derives the authority and pool PDAs, returns ConstraintSeeds with actual/expected keys on mismatch, and borrows data only when the final account owner equals AMM. Data length >=287 permits a u64 read at [279,287); a nonzero value returns 6033. All acquired borrows are released. No token-extension interpretation is made.

The original caller writes the returned prefix back into Context.remaining_accounts. Current `validate_remaining` is a different function; this proposal is not a drop-in replacement for that loop or proof of the whole payout path.

See `REPORT.md` for ABI/lifetimes, exact branches, error order, 17 actual callsites / 12 callees and remaining limits. `OWNEDMAP.json` and the SHA-256 manifest define the exact portable package. Run `python3 -B /path/to/handoff/verify.py`; separate-copy results are in `PORTABILITY.md`.

Zero builds, runtime executions, probes or new fixtures. No new whole-body candidate match or whole-file identity; no comparison receipts transferred to the proposal.
