# Partial Pump Fees reconstruction

Seven handlers execute recovered behavior: `get_fees`, `get_fees_with_quote_mint`,
`set_authority`, `set_social_claim_authority`, `set_disable_flags` and
`set_claim_rate_limit` and `initialize_fee_program_global`. The other 24 instruction bodies remain unsupported;
their generated account declarations are not recovered constraints. This crate
is an experimental reconstruction target, not a deployable substitute.

The interface scaffold originated in `research/imported-lab/reconstruction/pump-fun-fees-candidate`
(source commit and unchanged upstream hashes in `research/import-manifest.json`).
This working copy adds actual query implementations, PDA constraints using the
stored bump, optional trailing bool parsing, and the custom FeeConfig parser.
Original program bytes are comparison inputs only and never compiler inputs.

Observed parser rules: wrong discriminator or allocation below 2,512 bytes returns
InvalidAccountData; malformed vector serialization returns BorshIoError. Standard
Anchor ownership and initialization checks run before deserialization, followed by
the config-program PDA constraint. These are tested recovered rules, not a claim
that every account migration/version path has been recovered.

Anchor 0.30.1 gave the wrong short-discriminator error (100 rather than original
101); 0.31.1 matches that behavior. Cargo.lock pins the selected dependency graph,
which is not established as the historical graph. The full candidate still differs
substantially from the original binary. The experimental standalone fragments in
`recovered/` are separate compiler experiments; the crate builds `src/`.

```sh
python scripts/build_partial_candidate.py --manifest programs/pump-fees/Cargo.toml \
  --program pump_fees --artifact-name pump_fees_candidate.so \
  --output work/fees-clean-build
python scripts/fees_validate_all.py \
  --candidate work/fees-clean-build/artifacts/pump_fees_candidate.so \
  --output work/fees-handler-validation.json
```

Use a Python environment with root requirements installed and cargo-build-sbf
2.1.21 with platform-tools v1.52 available. Build offline from the pinned lockfile;
source/toolchain/build-log hashes and the raw full-file comparison are retained.
The runtime comparison checks return bytes, error codes, and unchanged account
state/lamports for queries. It does not assert log strings, compute usage, or byte
identity. Synthetic invalid account states are included and do not establish
reachability or a vulnerability.

The four administration handlers use a 338-byte FeeProgramGlobal with stored-bump
PDA verification, signing/writable authority, and custom authorization error6016.
Changing the main authority to zero fails6001; the social-claim authority accepts
zero. All u8 flag values and the tested u64 rate-limit boundaries are accepted.
Every successful setter emits the typed log event and signed self-CPI event.
444 original/candidate cases compare errors, complete state, lamports, event bytes
and inner instructions. The two query suites contribute10,789 additional cases.

The global initializer reads the older 740-byte Pump Global layout, authenticates
its authority and PDA, creates the 338-byte Fees global with canonical bump, and
emits the exact event log and self-CPI. Its 180 comparisons include prefunding,
malformed accounts, authorization, argument boundaries and CPI rollback. The
seven-handler candidate passes 11,413 cases; full-file byte equality remains false.
