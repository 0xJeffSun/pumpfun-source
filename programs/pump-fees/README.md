# Partial Pump Fees reconstruction

Sixteen handlers execute recovered behavior: `get_fees`, `get_fees_with_quote_mint`,
`set_authority`, `set_social_claim_authority`, `set_disable_flags` and
`set_claim_rate_limit`, `initialize_fee_program_global`, `update_fee_config`,
`update_stable_fee_config`, `set_exotic_flat_fees`, `extend_fee_config`,
`revoke_fee_sharing_authority`, `transfer_fee_sharing_authority`, `upsert_fee_tiers`,
`upsert_stable_fee_tiers` and `update_admin`. The other 15 instruction bodies remain unsupported;
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
and inner instructions. The two query suites contribute10,838 additional cases.

The global initializer reads the older 740-byte Pump Global layout, authenticates
its authority and PDA, creates the 338-byte Fees global with canonical bump, and
emits the exact event log and self-CPI. Its 180 comparisons include prefunding,
malformed accounts, authorization, argument boundaries and CPI rollback. The
sixteen-handler candidate passes 13,098 cases; full-file byte equality remains false.

FeeConfig deserialization is gated by allocation: the normal schedule is read at
2,512 bytes, the stable schedule at 4,073, and exotic flat fees at 4,097. Earlier
layouts default the absent fields to empty/zero. Tests compare these boundaries
for both queries and writes; adding stable/exotic field bytes to a legacy
allocation does not make the original decoder consume them.

The three configuration setters have 625 independent SBF cases. Schedules must
contain 1–50 strictly increasing thresholds and each fee sum must be at most
10,000 basis points. Addition overflow aborts in the original and candidate.
The normal updater validates flat fees before schedule checks. Exotic fee updates
grow older accounts to 4,097 bytes and top up rent only when growing. State,
events, CPI payloads and rollback are compared, including preservation of the
existing schedule in current layouts. These are bounded reconstruction checks,
not proof that every configuration transition is safe.

Permissionless `extend_fee_config` validates the discriminator, owning program and
stored-bump PDA with custom error 6028, without decoding fee vectors. Accounts of
at least 4,097 bytes are left unchanged. Smaller accounts grow with zero-filled
bytes and a System transfer equal to the difference between old/new rent minima,
even when already overfunded; 297 cases compare this behavior and event CPI.
`revoke_fee_sharing_authority` and `transfer_fee_sharing_authority` are deprecated
in the captured deployment. Their recovered dispatches always return 6023;
80 payload/account-shape cases pass. They count as implemented rejection paths,
not recovered historical successful authority-transfer functionality.

The two tier upserts overwrite from the supplied offset, append beyond the old
end and retain unaffected trailing tiers. Offset cannot exceed the old length;
combined size cannot exceed 50. Validation covers the entire resulting schedule,
including retained entries. Their 578 cases cover insertion, overwrite, gaps,
length/order/fee boundaries and legacy allocation behavior. Events carry the
incoming tiers and offset. `update_admin` has 56 cases, accepts any new key,
including zero and nonsigners, and emits the previous and new keys. Its acceptance
of zero differs from the FeeProgramGlobal authority setter; these are separate
configuration types and recovered behaviors.
