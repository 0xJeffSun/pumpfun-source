# Handoff

**Review-only, not promotion-ready.** V2 source is composed against frozen sharing source94a11c22 and manifest56fcdea6. Original parser-to-named-account tracing, historical diagnostics and transitive identity remain incomplete.

- `proposal/v2-only.patch` replaces only V2 and appends V2 helpers; baseline legacy body/helpers/contexts are preserved exactly.
- `proposal/pump.json` adds the retained upstream V2 instruction needed for the generated client. No dependency changes.
- Paired payout preparation and formatted comparison errors are now expressed as owned typed source; ordered quote/preprocessing/AMM, filtering/rescaling, early serialization, conditional Pump, validation/event are composed.
- Complete original CPI helpers/meta builders and exact IDL names/order/flags are in `review.json`. Wire binding is distinguished from unresolved original context layout.
- All17,461 cases/all417 sharing rows plus separate ten steps remain required. Zero builds, runtime cases or new fixtures; no receipt transfer or whole-original identity claim.

Read `REPORT.md`, `ownedmap.json`, `PORTABILITY.md`. Run `python3 -B verify.py` in a separate copy. Export only files in `manifest.json` plus that manifest and its seal. Prior four packages and failures remain unchanged.
