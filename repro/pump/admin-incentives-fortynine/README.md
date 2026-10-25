# Pump admin-incentives checkpoint

This checkpoint adds the bounded `admin_update_token_incentives` handler to
upstream source commit `4ffe8bd88761059693e481ae972443c10204f7af`.
The candidate has 49 implemented handlers and four partial trade/creation
paths. It is 1,518,544 bytes, SHA-256
`c1558a656f889b2f4348161473b595d95060caf2951c3569d6f6962024ba75c4`.
The captured original is 10,485,715 bytes, SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
Whole-file equality is false; this is not a deployable replacement.

Two clean v1.44 source builds produced identical unmodified candidate files.
The build comparisons hash all current Pump source, the manifest and lockfile,
and the selected SDK/rustc. The two compressed build logs and exact candidate
are retained here. The isolated Agave 2.1.21 `cargo-build-sbf` installer was
patched to select cached platform-tools v1.44 instead of its hardcoded v1.43;
the actual v1.44 SDK source hashes are pinned in both build comparisons. This
proves repeatability for this candidate under that local toolchain, not the
unknown historical build environment. Generated keypairs and Cargo artifacts
are not packaged.

The focused [admin-incentive receipt](../admin-token-incentives-candidate-differential.json.gz)
has 98 validly signed local target/candidate comparisons: 43 successes and
55 rollbacks. It preserves transaction bytes, complete watched account
post-states, errors, event and return bytes, inner CPIs, and the accumulator
debug log. Its independent verifier replays both binaries and checks source,
build and dependency hashes. Both classic SPL Token and Token-2022 incentive
accounts, including missing-ATA creation, are covered.

All 9,161 differential cases from the preceding 48-handler checkpoint were
rerun against this exact candidate and matched. `differential/prior-thirtythree`
contains 7,957 cases from the maintained all-runner; the separately maintained
holder-distribution, nested-create and quote-control suites contain 649, 48
and 507 cases. The new 98 cases bring the total to 9,259 across 37 suites.
`regression-summary.json` binds each receipt by SHA-256. The preceding
[quote-control checkpoint](../quote-control-fortyeight/README.md) retains its
1,024 Surfpool comparisons; no new Surfpool comparison was run for this source.

The Global account in the new fixture is copied from a finalized public
snapshot with its authority replaced locally by a test-owned signer. The
GlobalVolumeAccumulator, mint and incentive ATA are synthetic canonical
states. This evidence does not prove live admin-key possession, all reachable
incentive schedules or later claim behavior. The known `sell_v2` quote
transfer-fee minimum/output and fee-event mismatch remains outside the passing
suites. No transaction was broadcast and no real funds moved.

Run the focused differential and verifier with a local Python environment
containing the repository's LiteSVM/Solders dependencies:

```sh
python scripts/pump_admin_token_incentives_differential.py \
  --second-build-comparison repro/pump/admin-incentives-fortynine/second-build-comparison.json
python scripts/pump_admin_token_incentives_verify.py
```

Both scripts use this checkpoint's retained candidate and first build
comparison by default. To check a newly built artifact instead, pass
`--candidate` and `--build-comparison` to both scripts.
