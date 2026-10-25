# Partial Mayhem implementation recovery

This independently compiled Anchor program implements **18 of the 25 currently
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
- `extend_account`, `withdraw_admin`, `withdraw_quote_admin`
- `sweep_fees`, `sweep_fees_admin`
- `burn_tokens`

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

The dependency lockfile pins an Anchor 1.0.0 candidate build. Stronger static
evidence from burn recovery supersedes the earlier 0.31.1 baseline: typed duplicate
checks, Pubkey CPI context and event-authority constants match the newer family.
Exact historical revision and dependency identity remain unresolved. The explicit
System wrapper preserves the original address-before-executable validation order.
All previous 2,953 cases still pass. See the [eighteen-handler package](../../repro/mayhem/eighteen/README.md).

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

`repro/mayhem/eighteen/` retains the clean build's comparison/provenance and compressed
case evidence. See `audit/mayhem/RECOVERY.md` for bounded security observations.

The additional `scripts/mayhem_validate_fee_recipient.py` suite compares 306
fee-recipient initialization cases using the exact captured SPL Token, Token2022
and ATA dependency ELFs in both VMs. It covers every u8 recipient index, native
mint/token address constraints, authorization behavior, account flags, missing
accounts and rollback after CPI. Its receipt is
`repro/mayhem/fee-recipient-differential.json.gz`.

The account-extension suite adds 301 cases and the SOL-withdrawal suite adds 274,
for 1,932 differential cases across fourteen paths. Extension cases cover account
types, size boundaries, rent funding, zero initialization, events and rollback.
Withdrawal cases cover administrator/PDA constraints, transfer errors, timestamp
updates, rate boundaries and signed-add overflow. Receipts are retained as
`extend-differential.json.gz` and `withdraw-differential.json.gz`.

Quote withdrawal adds 329 cases and the two sweep paths add 692 cases, producing
2,953 total cases across seventeen implemented paths. Both suites load the exact
captured dependency ELFs. Quote tests cover ATA creation, signed vault transfers,
rate limits and Token2022 mismatch behavior. Sweep tests cover authorization,
recipient order/duplication, counters, caps, token mutations, malformed accounts,
randomized state, arithmetic and rollback. They do not establish full program
security or equivalence outside the tested instruction/state surface.

The burn handler adds three genuine captured account families and three sequential
second-burn rejections, for 2,959 comparisons. Complete state, events, inner calls
and errors agree for those fixtures; compute logs and source locations differ.
The capture archive and portable runners are in the eighteen-handler package.
