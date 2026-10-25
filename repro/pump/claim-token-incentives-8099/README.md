# Claim source on the 8099031 Pump baseline

This is a fresh build and signed offline replay of this branch's bounded
`claim_token_incentives` handler after merging upstream `8099031`. The earlier
[`4ffe8bd` claim packet](../claim-token-incentives/README.md) is retained as
historical evidence. The new candidate includes upstream's partial native
curve and BondingCurve serializer source. It is not byte-identical to deployed
Pump and is not a deployable replacement.

Two isolated clean v1.44 SBF builds of the same merged source produced the
identical 1,555,464-byte [candidate](candidate.so), SHA-256
`3e1bc69113cef484818a47cffc7d9f911fc4b4e1a99268338296a239d7691d64`.
The [build record](build-comparison.json), [second build](second-build-comparison.json),
[source and toolchain pins](build-reproducibility.json), attempts, and compressed
logs are adjacent. The deployed ELF differs from the candidate.

The [fresh differential](differential.json.gz) re-executes 60 validly signed
target/candidate transactions: 60 matches, 48 successes, 31 payout events,
and 12 rollbacks. It compares complete watched accounts, errors, events, and
inner instructions. The [quote-control replay](quote-control-regression.json.gz)
adds 507/507 matches, and the [native-curve replay](multi-hop-regression.json.gz)
adds 56/56 matches on this exact candidate. The
[regression summary](regression-summary.json) binds both receipts to its hash.
The remaining inherited Pump suites and Surfpool runners were not rerun on
this composite executable.

The positive reward schedule and funded incentive ATA are synthetic local
state. These results do not establish live claimability, current fund risk,
all mint/account variants, historical source identity, or full Pump behavior.
No transaction was broadcast and no real funds were used.

Verify the saved source hashes, two builds, signed cases, and regression
receipts with the project Python environment:

```sh
<venv>/bin/python scripts/pump_claim_token_incentives_8099_verify.py
```
