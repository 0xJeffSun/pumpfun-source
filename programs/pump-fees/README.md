# Partial Pump Fees reconstruction

All 31 IDL instruction bodies now execute bounded recovered behavior: `get_fees`, `get_fees_with_quote_mint`,
`set_authority`, `set_social_claim_authority`, `set_disable_flags` and
`set_claim_rate_limit`, `initialize_fee_program_global`, `update_fee_config`,
`update_stable_fee_config`, `set_exotic_flat_fees`, `extend_fee_config`,
`revoke_fee_sharing_authority`, `transfer_fee_sharing_authority`, `upsert_fee_tiers`,
`upsert_stable_fee_tiers`, `update_admin`, `create_donation_fee_pda` and
`crank_donation_fee_pda`, `create_social_fee_pda`, `claim_social_fee_pda` and
`claim_social_fee_pda_v2`, `withdraw`, `initialize_buyback`, `update_buyback_authority`,
`update_buyback_claim_rate_limit`, `sweep_buyback`, `create_fee_sharing_config`,
`admin_cto_sharing_config`, `update_fee_shares`, `update_fee_shares_v2` and
`initialize_fee_config`. Two of these are deprecated rejecting dispatches.
All instruction bodies being present does not establish every account constraint,
historical source identity, complete security coverage or byte equality. Some
sharing-reset constraints are tested only through the genuine Pump caller. This
crate remains an experimental reconstruction target, not a deployable substitute.

The interface scaffold originated in `research/imported-lab/reconstruction/pump-fun-fees-candidate`
(source commit and unchanged upstream hashes in `research/import-manifest.json`).
This working copy adds actual query implementations, PDA constraints using the
stored bump, optional trailing bool parsing, and the custom FeeConfig parser.
Original program bytes are comparison inputs only and never compiler inputs.

Four buyback handlers add 1,249 cases, including all u8 indexes, ordinary authority
signatures, initialization, native/token sweeps, rate limits and checked counters.
Vault initialization accepts indexes 0–7 and leaves the authority zero until a
global-authority update. Sweeps transfer tokens before native SOL and retain rent
for the actual allocation. A zero rate bypasses cooldown; other rates use a strict
signed elapsed-time comparison. The observations and limits are detailed in the
[buyback draft](../../localnet/recovery/fees-buyback/README.md).

Sharing creation adds 116 cases with genuine captured Pump and PumpSwap CPIs.
The handler creates a version-two sharing account, validates creator authority,
and transfers the curve/pool creator role through the captured programs. Graduated
coins require AMM accounts. Existing nonzero sharing versions return early.
Temporary serialized creator/admin state before each CPI is retained, because
the called program reads that state. These cases use normally signed test-owned
keys and synthetic local accounts; they do not prove every live sharing transition.

The [prior v1.44 checkpoint](../../repro/pump_fees/all-thirtyone-v144/README.md)
passes 112 independent Surfpool comparisons with 224 signed local transactions.
All Surfpool counts below refer to that retained executable. The current authority-guard
build passes 17,384 SBF comparisons and the ten-step persistent donation sequence.
Twelve focused comparisons repeat existing indices/keys with stronger raw-log
assertions. Its source hashes and receipts are indexed by `repro/status.json`.
The enum restores four omitted IDL variants and the original literal `format`
messages for errors 6003 and 6011.

The sharing reset and two update handlers add 480 comparisons. Reset runs through
the captured Pump administrative caller and its own PDA-signed CPI. Sharing
updates distribute old fees through the captured Pump/AMM programs, then validate
the new list and revoke further administrator updates. Failure rolls back the
earlier transfers. The source preserves the observed one-to-ten, nonzero,
unique-shareholder and checked-u16 total constraints and error ordering.

The final initializer adds two exact historical signed-message replays and 28
ordinary-signer rejection cases. The original administrator's public signature
is verified; the signed message is unchanged. Only stale-blockhash freshness is
adapted for local replay. The 2,512-byte account, zero defaults, rent/balances and
events match both the captured executable and saved historical transaction
metadata. These are two initialization paths against a later executable, not a
complete historical bank reconstruction. See [the evidence](../../repro/pump_fees/initializer-history/REPORT.md).

Observed parser rules: wrong discriminator or allocation below 2,512 bytes returns
InvalidAccountData; malformed vector serialization returns BorshIoError. Standard
Anchor ownership and initialization checks run before deserialization, followed by
the config-program PDA constraint. These are tested recovered rules, not a claim
that every account migration/version path has been recovered.

Anchor 0.30.1 gave the wrong short-discriminator error (100 rather than original
101); 0.31.1 matches that behavior. The repository-root Cargo.lock pins the selected dependency graph,
which is not established as the historical graph. The full candidate still differs
substantially from the original binary. The experimental standalone fragments in
`recovered/` are separate compiler experiments; the crate builds `src/`.

```sh
python scripts/prepare_locked_cargo_home.py --lockfile Cargo.lock \
  --output work/fees-cargo-home
CARGO_HOME="$PWD/work/fees-cargo-home" python scripts/build_partial_candidate.py --manifest programs/pump-fees/Cargo.toml \
  --program pump_fees --artifact-name pump_fees_candidate.so \
  --tools-version v1.44 --output work/fees-clean-build
python scripts/fees_validate_all.py \
  --candidate work/fees-clean-build/artifacts/pump_fees_candidate.so \
  --output work/fees-handler-validation.json
```

Use a Python environment with root requirements installed and cargo-build-sbf
2.1.21 with platform-tools v1.44 available. The cache helper requires previously
downloaded crates and verifies archives against Cargo.lock. Build offline from the pinned lockfile;
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
31-instruction candidate passes 17,384 comparisons; full-file byte equality remains false.

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

Donation creation and forwarding are integrated from the independently validated
[draft](../../localnet/recovery/fees-donation/README.md). Their 713 signed synthetic
cases pass against this combined executable. A further 10-step persistent
creation/deposit/crank sequence and 10 Surfpool comparisons pass with normally
verified test-owned signatures. The sequence compares exact timestamped events;
independent Surfpool processes exclude only `last_crank_ts` wall-clock differences
from state equality and retain the raw values. Captured external dependency
binaries execute locally; the donation relay source remains unrecovered.

The three social-fee handlers add 1,562 signed differential cases, comparing
state, errors, events, CPI instructions and optional claim return values. The
prior retained executable also passes 29 Surfpool comparisons (58 signed
transactions) for social creation, SOL claims and token claims. See the
[social recovery notes](../../localnet/recovery/fees-social/README.md) for the
179-byte rent reserve, cooldown, versioned initialization, saturating counters,
token ATA creation and precise timestamp exclusions. These observations do not
establish that every authorization or token-extension combination is safe.

Referral `withdraw` adds 113 signed differential cases and 16 independent Surfpool
comparisons. It authenticates the user signer and the System-owned referral PDA,
retains the zero-data rent minimum for SOL, and supports optional token withdrawals
with mint/authority/program checks but no ATA-address requirement. The latest
combined executable passes all 55 donation/social/withdraw Surfpool comparisons
(110 signed transactions), plus the separate persistent donation sequence. See
[withdrawal recovery](../../localnet/recovery/fees-withdraw/README.md).

External Pump Global/BondingCurve and AMM Pool types now use generated Anchor account
codecs with explicit external owners. Sharing and donation parsing reuse the same
AMM Pool type. Three complete checked decoder patterns differ from the captured
original only in embedded source-file length and source-line constants after
relocation/call masking. Nine ordinary-signature malformed-account checks and all
existing regressions pass; this does not establish whole-program identity. See
[codec evidence](../../repro/pump_fees/external-codecs-v144/README.md).


## Declared external programs and workspace layout

Pump `Global`/`BondingCurve` and PumpSwap `Pool` are generated by consecutive
`declare_program!` invocations at `programs/pump-fees/src/lib.rs:27` and `:28`,
using the retained public historical IDLs under `idls/`. The workspace root owns
this member's manifest profile and lockfile; other reconstructed crates keep their
own workspace boundaries. Moving the existing macro items after `declare_id!`
requires no padding or extra source lines. The preceding reconstructed imports
and modules are not asserted to be the historical source prefix.

The three complete 728-byte checked decoders now match the captured instruction
patterns after call/relocation address normalization, with identical relocation
patterns and all seven internal calls mapped consistently. Filename and line
literals are checked separately. Raw function bytes and the complete ELF still
differ. Nine malformed-account cases also reproduce the exact Anchor error lines,
including filename and line. This does not prove a unique original macro, IDL
revision, compiler or historical source tree.

The retained declared-program candidate is 766,800 bytes with SHA-256
`cf34104a46c65538e7de734abfa9d5d74102639257969cc4e51eb36a31cbd0eb`.
The [declared-program evidence](../../repro/pump_fees/declared-programs-v144/README.md)
retains whole-workspace/IDL inputs, the actual build helpers, bounded decoder
comparisons, all 17,372 comparison receipts and the ten-step donation sequence.
It preserves the earlier helper used for the isolated experiment separately from
the corrected two-file helper used for the main build. Whole-file byte equality
remains false, and the older Surfpool receipts are not reattributed to this ELF.

## Recovered guard and account-layout details

Three buyback guards use `require_gt!(8u8, index, InvalidBuybackIndex)` and the
shared update context boxes its vault account. Their instruction bodies and
value-formatting helper support these source choices, and nine normally signed
index-7/8/255 comparisons assert exact compared-value logs. The separate
[buyback checkpoint](../../repro/pump_fees/buyback-source-v144/README.md) retains
the controlled macro, integer-type, and account-layout builds.

`set_authority` uses a plain public-key inequality guard. Unlike
`require_keys_neq!`, it does not attach compared-key fields to `InvalidAdmin`,
matching the original error dataflow and logs. Its 3,320-byte body has the
original relocation pattern and fourteen mapped internal calls; after address
normalization, only source filename length and line constants differ.

The [authority-guard checkpoint](../../repro/pump_fees/authority-guard-v144/README.md)
retains the clean main build, its exact scratch identity, all 22 source/workspace/IDL
inputs, and 17,384 comparison receipts plus the donation sequence. Its ELF is
768,824 bytes, SHA-256
`952a96cdb974517ec85ebeff3e2b5ec690029aaf3f822dfc22501e95bc3dba66`.
Source locations, compute-unit consumption and the complete executable still
differ from the capture; these checks do not establish unique historical source.
