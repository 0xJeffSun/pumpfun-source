# PumpSwap incentive checkpoint

This candidate implements 31 of 38 published IDL handlers. It adds volume
synchronization, incentive administration and incentive claims to the 28-handler
creator-reassignment checkpoint. The complete program is not reconstructed.

The independent clean main-source build is 926,096 bytes, SHA-256
`64eb043633e3c0cbac05a16ebb0f1160f0123f7731d038e8faf2b59794e57ed6`.
The captured original is 10,485,715 bytes, SHA-256
`6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.
Whole-file equality is false, with the first difference at byte 24. Captured code
was not a compiler input; no executable bytes or headers were edited.

All 14,489 comparisons across 20 suites passed against this artifact. The three
new suites contribute 1,697 cases and 3,394 original/candidate signed transactions.
Their ordinary test-owned signatures are verified with runtime signature checking
enabled. They compare complete recorded account state, events, inner instructions,
return data, errors and transaction bytes. Raw logs retain compute/source-location
differences and are excluded from the equality predicate. Other suites retain their
previously documented limits. Fixtures are synthetic offline state; passing cases
do not establish that every fixture is reachable on chain.

`source-snapshot.tar.gz` preserves all 13 main build inputs at repository-relative
paths. `test-snapshot.tar.gz` and `test-source-sha256.json` preserve the 25 harness
and local-import files. Build records preserve tool, SDK, source and log hashes.
Platform-tools v1.52, Anchor 0.31.1 and the Cargo lock graph remain candidate choices,
not proven historical versions. The main build independently reproduced the scratch
build's complete bytes. Regression receipts were then regenerated with the main
source bindings. `original-static-evidence.tar.gz` retains instruction decoding and
original-code ranges used to resolve schedule/claim differences.

`attempts/` retains earlier compiler records, artifacts where available and mismatch
receipts. The exact build 03 source snapshot is verified against its attempt hashes.
Complete source snapshots were not retained for builds 01/02; their recorded hashes
and logs are evidence of attempts, not self-contained reproductions. Build 04 matches
the main source content at a scratch path and is retained for comparison. Earlier
receipts may record the then-current main source metadata separately from the
scratch candidate; the successful main build record is the authoritative source
binding for this checkpoint.

To reproduce, restore snapshots into a separate checkout containing the repository's
captured `evidence/` and imported fixture inputs, then run from its root:

```sh
python scripts/build_partial_candidate.py --manifest programs/pump-amm/Cargo.toml --program pump_amm --artifact-name pump_amm_recovered.so --tools-version v1.52 --output work/replay-amm31-build
python scripts/pump_amm_incentives_differential.py --family sync --candidate repro/pump_amm/incentives-thirty-one/pump_amm_recovered.so --output work/amm31-sync.json
python scripts/pump_amm_incentives_differential.py --family admin --candidate repro/pump_amm/incentives-thirty-one/pump_amm_recovered.so --output work/amm31-admin.json
python scripts/pump_amm_incentives_differential.py --family claim --candidate repro/pump_amm/incentives-thirty-one/pump_amm_recovered.so --output work/amm31-claim.json
```

The exact remaining suite invocations are in `regression-run.json`; use new output
paths. External Cargo caches, the Rust/Solana toolchain and Python packages are
required. This package is not a hermetic toolchain image. See
`audit/pump_amm/INCENTIVES_RECOVERY.md` for recovered behavior and limitations.
The security review frozen at 329fc44 excludes these additions. No complete security,
context-parity or source-identity claim is made. No live transaction was broadcast.
