# PumpSwap cashback checkpoint

The candidate implements 32 of 38 published IDL handlers, adding `claim_cashback` to
the 31-handler incentive checkpoint. The clean main build is 944,064 bytes, SHA-256
`7b254a06d237de30c815d105a062aa467067ec41182c17821f6a0998288cc1d7`.
The captured original is 10,485,715 bytes, SHA-256
`6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.
Whole-file equality is false, with the first difference at byte 24. No executable
bytes or headers were edited, and the original was not a compiler input.

All 14,635 comparisons across 21 suites pass. New cashback coverage contributes 146
cases and 292 original/candidate signed transactions. Ordinary test-owned signatures
and runtime signature checks remain enabled. The new suite compares recorded
account state, errors, events, inner calls and transaction bytes; raw logs are
retained while compute/source-location differences are excluded. Other suites
retain their own documented comparison scope. Synthetic state is not proof of
production reachability or exhaustive context/extension parity.

Cashback pays the complete vault balance to a token account owned by the user,
skipping token CPI for a zero balance but still emitting both events. It increments
the claimed counter with checked arithmetic and leaves earned cashback unchanged.
The first draft's 13 mismatches came from a zero-amount CPI and a late program-account
check. Both source drafts, compiler records, artifacts and receipts are retained
under `attempts/`, with source snapshots verified against their build-attempt hashes.
The main build independently reproduced draft 02's whole bytes.

`source-snapshot.tar.gz` contains 14 main build inputs. The 26-file test snapshot and
hash map preserve local Python imports. Static original wrapper/body/context ranges
and signed original observations are retained separately. Build records include
source, compiler, SDK, command and log hashes. Platform-tools v1.52, Anchor 0.31.1
and the saved Cargo graph remain candidate build inputs, not proven historical
versions. `manifest-sha256.json` covers every packaged file except itself.

For replay, restore the source/test snapshots into a separate checkout containing
the repository's captured evidence and imported research fixtures. Run from the
checkout root with installed Python dependencies, Cargo caches and Rust/Solana tools:

```sh
python scripts/build_partial_candidate.py --manifest programs/pump-amm/Cargo.toml --program pump_amm --artifact-name pump_amm_recovered.so --tools-version v1.52 --output work/replay-amm32-build
python scripts/pump_amm_cashback_differential.py --candidate repro/pump_amm/cashback-thirty-two/pump_amm_recovered.so --output work/replay-amm32-cashback.json
```

The remaining exact suite commands are retained in `regression-run.json`; choose
fresh output paths. This is not a hermetic toolchain image. See
`audit/pump_amm/CASHBACK_RECOVERY.md` for behavior and limits. Six IDL handlers,
full source attribution, binary identity and a complete original-program security
audit remain unresolved. The security review frozen at 329fc44 excludes this change.
