# Partial Mayhem implementation recovery

This independently compiled Anchor program implements **12 of the 25 currently
identified instruction paths**. It is not a full program reconstruction, a
byte-identical ELF, or a deployable replacement. Other handlers are absent.
No original machine code is embedded or patched into the build.

Implemented paths:

- `initialize_global_params`, `initialize_fee_recipient`
- `reset_sol_deployed`, `reset_stable_deployed`, `reset_state`
- `stop_trading`, `resume_trading`
- `update_admin`, `update_trader`
- `update_max_sol_per_sweep`, `update_max_stable_per_sweep`
- `update_global_params`

## Evidence and unresolved source details

The original captured binary is `evidence/original/mayhem/deployed.so`. Its
router/wrapper addresses are in `evidence/dispatch-map.json`. Account and state
recovery uses successful and failing local calls to that exact capture, supported
by its disassembly. The GlobalParams discriminator is the Anchor hash of
`account:GlobalParams`, and the serialized account length is 254 bytes.

The current source deliberately preserves unresolved field names as byte arrays
or numbered fields. The full account's Borsh positions are recovered for these
operations; historical Rust field names, numeric signedness of opaque fields,
struct memory layout, code ordering and dependency versions are not established.
The event discriminator is observed directly from original event bytes, not
claimed to derive from a recovered historical event type name.

The dependency lockfile pins the candidate's build. Anchor 0.31.1 matches the
original short-discriminator behavior: 0–7 bytes return error 101. An earlier
0.30.1 candidate returned 100 and was rejected. This is version-family evidence,
not proof that the original used exactly Anchor 0.31.1.

## Reproduce

```sh
cargo build-sbf --manifest-path programs/mayhem/Cargo.toml --tools-version v1.52 \
  --sbf-out-dir work/mayhem-build -- --locked
python3 scripts/mayhem_validate_admin.py \
  --candidate work/mayhem-build/mayhem_recovered.so \
  --output work/mayhem-admin-validation.json
```

The 1,051 deterministic admin cases compare complete original and candidate SBF calls
inside separate LiteSVM instances. They compare instruction error, GlobalParams
bytes/owner/balance, admin and payer balance changes, logged event data, and inner
instructions. They include random valid serialized states, malformed state,
wrong owner/seeds/admin, missing/wrong accounts, signature/writability, trailing
instruction data, argument truncation, option tags, version-counter overflow,
initialization with System CPI, and event self-CPI. Full textual logs, compute
units, all transactions, and the absent instruction paths are not equivalent
claims. States are synthetic; injected configurations are not proof of reachable
mainnet states.

`repro/mayhem/` retains the clean build's comparison/provenance and compressed
case evidence. See `audit/mayhem/RECOVERY.md` for bounded security observations.

The additional `scripts/mayhem_validate_fee_recipient.py` suite compares 306
fee-recipient initialization cases using the exact captured SPL Token, Token2022
and ATA dependency ELFs in both VMs. It covers every u8 recipient index, native
mint/token address constraints, authorization behavior, account flags, missing
accounts and rollback after CPI. Its receipt is
`repro/mayhem/fee-recipient-differential.json.gz`.
