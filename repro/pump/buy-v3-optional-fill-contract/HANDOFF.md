# Handoff

**Scalar contract recovered; full BuyV3 replacement still held.**

- Preserve `OptionBool`: wrapper forwards its bool to BuyV3's body.
- Ordinary nonwhitelist A>R selects R and retains residual A-R under either flag. Whitelist A>R clips only when flag=true, with residual zero; otherwise6021. Zero selected amount fails first with6020.
- Actual comparison is `147e30 -> 1b3678 -> sol_memcmp_`, comparing user key against Global+0x288 for32bytes. Signed encoded destinations, not assembly labels, establish the merge.
- Errors:6020 `BuyZeroAmount`, `(0u64,0i32)`;6021 `NotEnoughTokensToBuy`, `(reserve,selected)` as u64s. Original origins are trade_v3.rs:801/802; no source coordinates fabricated.
- [REPORT.md](REPORT.md), [SOURCE-DELTA.md](SOURCE-DELTA.md), [scalar Rust proposal](source/amount_selection.rs), [byte ledger](analysis.json), [ownership map](owned-map.json), [manifest](manifest.json).
- Retain all117 existing BuyV3 rows/105successes. No new runtime cases, compilation or main edits. Mode internals remain opaque. No compatibility mux or domain narrowing.
- Run `python3 -B verify.py`. Exact package integrity, byte edges/calls/errors and saved obligations are checked. Independent-copy verification is recorded outside the sealed publication.

The scalar helper is complete as a local source hypothesis, not as an authentic full handler/error-ABI reconstruction. Parser, preflight, downstream mode/settlement behavior and historical origins must still close before integration. Metadata-only parallel work is unaffected. Whole-file identity remains false.
