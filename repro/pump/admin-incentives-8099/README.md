# Admin incentive source on the 8099031 Pump baseline

This is a fresh build and signed offline replay of this branch's bounded
`admin_update_token_incentives` handler after merging upstream `8099031`.
The earlier [`4ffe8bd` admin packet](../admin-incentives-fortynine/README.md)
is retained as historical evidence. The new candidate includes upstream's
partial native curve and BondingCurve serializer source. It is not
byte-identical to deployed Pump and is not a deployable replacement.

Two isolated clean v1.44 SBF builds of the same merged source produced the
identical 1,576,184-byte [candidate](candidate.so), SHA-256
`afad2a757245bfca045c8eca0f25ddb2ff53ac6ffb678c84ed7b560a96aec8e7`.
The [build record](build-comparison.json), [second build](second-build-comparison.json),
[source and toolchain pins](build-reproducibility.json), attempts, and compressed
logs are adjacent. The deployed ELF differs from the candidate.

The [fresh differential](differential.json.gz) re-executes 98 validly signed
target/candidate transactions: 98 matches, 43 successes, and 55 rollbacks.
It compares complete watched accounts, errors, events, logs, inner
instructions, and return data. The
[quote-control replay](quote-control-regression.json.gz) adds 507/507 matches,
and the [native-curve replay](multi-hop-regression.json.gz) adds 56/56 matches on
this exact candidate. The [regression summary](regression-summary.json) binds
both receipts to its hash. The remaining inherited Pump suites and Surfpool
runners were not rerun on this composite executable.

The captured Global account is locally re-authorized to a disposable signer;
the accumulator, mint, and incentive ATA are synthetic canonical state. These
results do not establish live admin authority, all reachable schedules,
downstream claims, historical source identity, or full Pump behavior. No
transaction was broadcast and no real funds were used.

Verify the saved source hashes, two builds, signed cases, and regression
receipts with the project Python environment:

CI's `verify_current_bindings.py pump` selects this branch candidate from
`repro/status.json`; it retains the earlier serializer package as historical
static evidence and executes the verifier below for the current source.

```sh
<venv>/bin/python scripts/pump_admin_token_incentives_verify.py \
  --receipt repro/pump/admin-incentives-8099/differential.json.gz \
  --candidate repro/pump/admin-incentives-8099/candidate.so \
  --build-comparison repro/pump/admin-incentives-8099/build-comparison.json \
  --expected-baseline 80990317bd9c0363e071646b892490886d7bf946
```
