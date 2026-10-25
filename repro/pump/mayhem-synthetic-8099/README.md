# Synthetic Mayhem CPI on the 8099031 Pump baseline

This draft packet rebuilds this branch's bounded
`set_mayhem_virtual_params` handler after merging upstream `8099031`. The
earlier [Pump48 synthetic packet](../mayhem-synthetic/README.md) remains
historical evidence. This test installs a **synthetic** caller at Mayhem's
program ID in local LiteSVM. It can sign the off-curve `sol-vault` PDA; no
deployed Mayhem route to this Pump handler has been proven.

Two isolated clean v1.44 SBF builds produced the identical 1,555,032-byte
[candidate](candidate.so), SHA-256
`820f843573acf855f1462b883e48dc245d48c549a44cd91af8bdf46335811ff2`.
The [build comparison](build-comparison.json),
[second build](second-build-comparison.json),
[source and toolchain pins](build-reproducibility.json), attempts, and
compressed logs are adjacent. Deployed Pump is byte-different.

The [fresh signed differential](differential.json.gz) replays 25
target/candidate transactions through the synthetic caller. All 25 reach
Pump, all compared account/error/event/inner-instruction fields match, and
13 succeed. The [quote-control replay](quote-control-regression.json.gz)
passes 507/507 cases; the [native-curve replay](multi-hop-regression.json.gz)
passes 56/56. The [regression summary](regression-summary.json) binds both
receipts to this candidate. Other inherited suites and Surfpool runners were
not rerun on the composite executable.

The funded/modified accounts and test payer remain local, disposable state.
These cases do not establish a live Mayhem invocation route, exploitability,
fund risk, historical source identity, or full Pump behavior. No transaction
was broadcast and no real funds were used.

Verify the saved source hashes, builds, signed replay and regressions with
the project Python environment:

CI's `verify_current_bindings.py pump` selects this branch candidate from
`repro/status.json`; it retains the earlier serializer package as historical
static evidence and executes the verifier below for the current source.

```sh
<venv>/bin/python scripts/verify_pump_set_mayhem_params_8099.py
```
