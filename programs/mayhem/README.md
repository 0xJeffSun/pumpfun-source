# Partial Mayhem implementation recovery

This independently compiled Anchor program implements **21 of the 25 currently
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
- `burn_tokens`, `sell`, `buy`, `sell_v2`

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
All previous 2,953 cases still pass. The current candidate has 5,260 instruction
comparisons across twelve suite runs; see the [twenty-one-handler package](../../repro/mayhem/twentyone/README.md).

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

`repro/mayhem/twentyone/` retains the clean build's comparison/provenance and compressed
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

Legacy `sell` adds 396 normally signed synthetic cases: 134 successes and 262
rejections. The source preserves configured-trader authorization, typed ownership,
PDA/ATA constraints, fixed Token-2022 and self-program IDs, guard ordering,
reserve/tolerance arithmetic, the real Pump CPI, checked accounting updates,
complete 303-byte events and transaction rollback. Sell's external curve decoder
zero-pads to 141 bytes; burn retains its separate strict codec. All earlier cases
pass on the combined artifact. The main build is byte identical to the fully
tested scratch candidate, but differs from the original ELF.

```sh
python3 scripts/mayhem_sell_differential.py \
  --candidate repro/mayhem/nineteen/mayhem_recovered.so \
  --output work/mayhem-sell-replay.json
python3 scripts/verify_mayhem_sell.py \
  --candidate repro/mayhem/nineteen/mayhem_recovered.so \
  --receipts work/mayhem-sell-replay.json --output work/mayhem-sell-verification.json
```

The sell fixtures use only test-owned signatures and synthetic configuration;
they do not establish a full historical sell replay. Compute usage and recorded
source locations differ. In one zero-reserve panic case, the candidate additionally
logs an Option-unwrapping message; the error and complete rollback agree. At that checkpoint, four
other trade handlers and Mayhem-state initialization remained unrecovered.


Legacy `buy` adds 486 ordinary-signature synthetic cases: 187 successes and 299
rejections. It preserves the 23-account parser, actual 18-account Pump CPI,
price/tolerance guards, reserve-based budget and real-token cap. Actual spent SOL
and gained tokens drive checked signed-128-bit accounting. Overall and per-coin
risk checks run after the CPI, with strict upper limits; a failed check rolls back
the complete transaction. The original tests counter positivity before comparing
the low u64 limb, including for synthetic counters above u64::MAX. Complete events,
inner calls, watched account state and rollback agree with the captured original.

All 3,355 previous comparisons also pass on the combined twenty-handler artifact.
Its clean integrated-source build matches the reviewed scratch artifact byte for
byte. The portable buy harness and offline verifier can reproduce the evidence:

```sh
python3 scripts/mayhem_buy_differential.py \
  --candidate repro/mayhem/twenty/mayhem_recovered.so \
  --cases repro/mayhem/twenty/buy-cases.json --output work/mayhem-buy-replay.json
python3 scripts/verify_mayhem_buy.py \
  --candidate repro/mayhem/twenty/mayhem_recovered.so \
  --receipts work/mayhem-buy-replay.json --output work/mayhem-buy-verification.json
```

Buy fixtures use configured test-owned traders and synthetic account state, with
real program-derived CPI signing. They do not claim historical prestate or live
authority. Compute and source diagnostics differ; four panic cases retain explicit
log differences while matching failures and complete rollback. At that checkpoint, four trade paths
and Mayhem-state initialization remained absent.


Quote-aware `sell_v2` adds 1,419 ordinary-signature synthetic comparisons across
native SOL, legacy SPL Token, and Token-2022 quote families (473 each). It preserves
the 31-account parser and actual 26-account Pump CPI. The configured trader,
PDA/ATA and typed-owner constraints remain enforced. Quote selection controls the
budget cap, reserve threshold, actual received balance and global signed-i128
counter; both families share the state counter. Complete 303-byte events retain
zero native-specific fields for token quotes. All 3,841 prior comparisons pass on
the same artifact. Its clean integrated build is byte-identical to the tested
scratch build, with original executable identity still unresolved.

```sh
python3 scripts/mayhem_sell_v2_differential.py \
  --candidate repro/mayhem/twentyone/mayhem_recovered.so \
  --cases repro/mayhem/twentyone/sell-v2-cases.json --family native \
  --output work/mayhem-sell-v2-native.json
python3 scripts/verify_mayhem_sell_v2.py \
  --candidate repro/mayhem/twentyone/mayhem_recovered.so \
  --receipts work/mayhem-sell-v2-native.json --output work/mayhem-sell-v2-verification.json
```

Repeat with `--family token` and `--family token22` for the two token-quote runs.
The 418 successes and 1,001 rejections agree on full watched account state,
events, inner calls, return data and errors. Independent saved-receipt checks
verify every signature, successful quote/CPI/state/event and failed rollback.
Four panic diagnostics differ in each family, as documented in the package.
Starting business states and configured authorities are synthetic and test-owned;
no live authority or historical prestate is claimed. Three trade handlers
(`buy_v2`, `buy_pump_swap`, `sell_pump_swap`) and `initialize_mayhem_state` remain absent.
