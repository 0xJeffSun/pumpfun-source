# Partial Pump reconstruction

The Anchor 0.31.1 source implements forty-eight recovered handlers:
`toggle_create_v2`, `toggle_mayhem_mode`, `toggle_cashback_enabled`, and
`set_max_curve_depth`, `set_virtual_quote_reserves`, `update_buyback_config`,
`update_creator_fee_config`, `update_holder_reward_config`, `add_quote_mint`, and
`remove_quote_mint`, `update_global_authority`, `set_reserved_fee_recipients`,
`init_user_volume_accumulator`, `close_user_volume_accumulator`,
`collect_creator_fee`, `distribute_creator_fees`, `distribute_creator_fees_v2`,
`distribute_fee_to_holders`, and
`get_minimum_distributable_fee`, `collect_creator_fee_v2`, `extend_account`,
`sync_user_volume_accumulator`, `sweep_creator_fee`, `sweep_protocol_fee`,
`migrate_bonding_curve_creator`, `admin_cto`, `set_params`, `set_creator`,
`set_metaplex_creator`, `admin_set_idl_authority` and legacy `create`, `sell`, `sell_v2`, `migrate`, `buy`, `buy_exact_sol_in`, `buy_v2`, `buy_exact_quote_in_v2`, `migrate_v2`, `claim_cashback`, `claim_cashback_v2`, `initialize`, `initialize_quote_control`,
`set_quote_control_admin`, `set_quote_control_reserves_admin`, `add_quote_control_mint`,
`remove_quote_control_mint` and `set_quote_control_mint_reserves`. It also implements **partial `sell_v3`, `buy_v3`, `buy_exact_quote_in_v3`, `create_v2` and `multi_hop_curve_swap` paths**.
It is incomplete and is not a deployable replacement. The current sell_v2 quote-transfer-fee minimum-output check and fee-event fields have a confirmed mismatch with the captured original; the saved passing suites do not cover that boundary.

The current frozen checkpoint is [curve-preparation-fortyeight](../../repro/pump/curve-preparation-fortyeight/README.md):
9,269 differential comparisons across 40 suites and 1,024 Surfpool comparisons
across 28 runners passed. The candidate is 1,588,480 bytes, SHA-256
`b02a7e08b1f928a48793d909a86ef01c99cb3cb11a2aaf3d85e4ac422b989b51`.
It preserves 48 recovered handlers and five partial paths. The selected compiler
is v1.44; the unchanged installed CLI SDK uses v1.52 for its stripping step.
These observed phases do not establish the historical compiler recipe.

The preceding metadata checkpoint restored binary-evidenced `PumpError::QuoteMintNotWritable`
(ordinal 110, code 6110) while keeping all eleven existing reconstruction fences
in a separate local error enum with their unchanged names, messages and codes.
The captured official IDL still ends at 6109. Complete Debug, Display, name and
From-error bodies now match after relocation normalization, as do all 62 actual
direct-call targets. Final error literals match; transitive data remains partial,
including the different compiler source-path prefix in a panic record. The same
9,269 differential and 1,024 Surfpool comparisons were freshly repeated; this adds
no handlers or unique cases, and full original ELF equality remains false.

The current three-file correction decodes all nine evidenced historical
BondingCurve layouts and connects V3 trades to the recovered shared account
preparation before quote checks. Preparation protects recorded reserves, funds
only a positive rent gap and grows short accounts to 166 bytes. The route retains
its explicit short-account boundary before the helper. This does not complete
the V3 bodies, broaden the tested routing domain or recover their remaining
mode, settlement and event behavior. Historical short-layout and underfunded
V3 inputs have source evidence but no new runtime fixtures in this pass.

All 9,269 existing differential and 1,024 Surfpool comparisons were freshly
repeated. The complete serializer and four metadata bodies retain their matches.
In the same full-inventory method, original call-consistent matches change from
455 to 454 and raw-equal pairs remain 617. Source recovery and finite behavioral
agreement are not evidence of a closer whole-file byte match.

The partial `create_v2` path now traverses ordinary Tokenkeg quote ancestry,
including canonical pre-existing migrated Pool accounts, and derives reserves
through the retained curve/Pool pricing operations. Sixteen new unique cases cover
normal curve chains through depth five, Pool ancestry in different positions,
asymmetric reserves, signed Pool adjustments and depth rejection. Fifteen succeed;
one rejects with 6105 and complete rollback, including the original ordered
`Left: 1` / `Right: 2` diagnostics. The fixture ancestry is synthetic and already
exists before invocation; no migration or initializer was run to create it.
These cases retain the normal create_v2 child-mint initialization and genuine
payer/mint signatures, explicit signature and blockhash checking, default history,
and the 1232-byte packet limit. Mayhem and exhaustive ancestry/error/input coverage
remain unresolved; no new Token-2022 ancestry or extension modes are included.

The partial `multi_hop_curve_swap` source now handles ordinary noncompleting
Tokenkeg routes beyond two hops. Sixteen fresh three-hop cases use the captured
AMM's genuine PDA-signed Pump CPI, flags `[1,0,2]` / `[2,0,1]`, four fixed fee modes
and two input amounts. All sixteen succeed and match the original in errors,
normalized logs, events, inner instructions, return data, watched state and
Pump/Token calls. The 32 original/candidate transactions carry 32 genuine ordinary
signatures and fit in 1,128-byte packets. A standard 600,000-compute-unit instruction
precedes the AMM instruction; default signature, blockhash and history checks remain.
The prior default-budget exhaustion is preserved as a failed attempt. It is not
included in the passing count. Larger route lengths and arbitrary account/fee
combinations are not established by these finite tests.

The earlier two-curve suite retains exactly SOL→A→B and B→A→SOL with ordinary
Tokenkeg accounts, canonical pre-existing vaults, a native root storing quote zero,
and strictly non-completing buys. Sixteen of its twenty comparisons succeed, two
stop in AMM before Pump, and two reach successful Pump execution before AMM's final
slippage rejection rolls back the transaction. Eighteen reach Pump; its paired
receipts contain forty verified signatures. All curve and vault fixture state is
synthetic and already exists before invocation.

The earlier [native-curve-partial-fortyeight](../../repro/pump/native-curve-partial-fortyeight/README.md)
checkpoint added the one-native-curve path with fee flag 3, legacy Tokenkeg
82/165-byte mint/account layouts and an ordinary 166-byte curve. Its retained
56-case subset has 50 Pump CPI comparisons, six caller rejections, 11 successes
and 112 verified signatures. Its one-curve restriction describes that historical
checkpoint. Other quote currencies, arbitrary hop counts, Token-2022/extensions,
holder/cashback/Mayhem curves, short-account resizing and completion remain outside
the current validated routing scope. Explicit reconstruction domain fences are
not asserted to be original guards. See the current package and
[the earlier curve-run report](../../audit/pump/MULTI_HOP_CURVE_RECOVERY.md).

All 38 existing differential suites (9,237 cases), the sixteen accepted nested
cases, the sixteen general-route cases and all 28 established Surfpool runners
were freshly executed on the same decoder/preparation-corrected scratch ELF. Its 37 actual compiler
inputs are bound to the retained receipts. The clean main executable and symbols
must equal that scratch output before saved evidence is reused. The differential
receipts contain 15,934 transactions and 24,352 verified signatures; Surfpool
records 2,048 transactions and 2,980 signatures. The extra original-only nested
acceptance run is sixteen transactions / thirty-two signatures and adds no cases.
Legacy embedded source maps remain incidental baseline checkout snapshots; the
actual candidate build maps and canonical current-source checks are separate.
These are local synthetic fixtures, not live-network transactions.

The complete 1,840-byte BondingCurve serializer, 25 immediate target bodies and
discriminator remain matched. At the earlier nested-general-route checkpoint, the full nested walker and its
85 immediate callees were normalized-identical to the accepted nested checkpoint.
Its route hop parser had all 33 immediate callees matched and four consumed account
labels matched the original; three parser instructions still exchanged memcmp
arguments. Its 560-byte hop exit matched. Those historical checks and the current
passing corpus do not close the full route context/handler/helper/data obligations. These checks do not establish whole-program equality.

The prior [bonding-curve-serializer-fortyeight](../../repro/pump/bonding-curve-serializer-fortyeight/README.md)
checkpoint used a 1,534,768-byte executable with SHA-256
`92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a`.
It added explicit `BondingCurve` account traits that propagate serializer I/O
errors. That checkpoint's complete 1,840-byte exit matched the original under
strict relocation/internal-call normalization, including 25 direct calls to six
unique matched bodies and the eight-byte discriminator. The serializer source
is unchanged in the current checkpoint. See
[the serializer report](../../audit/pump/BONDING_CURVE_SERIALIZATION_RECOVERY.md).

The earlier [quote-control-fortyeight](../../repro/pump/quote-control-fortyeight/README.md)
checkpoint added six independent quote-control handlers and passed 9,161 cases
across 36 suites. Its 507 focused cases recorded 1,014 transactions and 2,008
verified signatures. See [the quote-control report](../../audit/pump/QUOTE_CONTROL_RECOVERY.md)
and [the earlier holder/nested report](../../audit/pump/HOLDER_NESTED_RECOVERY.md).
Nested creation remains partial beyond the stated ordinary curve/Pool ancestry
and finite tested inputs, including Mayhem and exhaustive error precedence.
Full original-byte equality remains false; historical compiler/dependency identity
and the security audit remain incomplete. Earlier checkpoint counts below describe
their historical source snapshots.

The partial v3 trade paths handle constant-product reserve changes, fee tier selection,
creator/protocol/buyback accounting, Token/Token2022 `transfer_checked` CPI,
lamport transfers, and log/CPI TradeEvents. USDC quote paths transfer tokens through the supplied quote token program,
use stable fee tiers, and zero legacy SOL-only event fields. A130-case suite
checks locally synthesized quote accounts under SPL Token and Token2022, without
claiming every token extension combination. Other v3 quote branches remain unsupported; the recovered routing paths above
have their own limited coverage. SOL Mayhem trades suppress buyback,
holder-reward trades report the observed creator-fee-derived reward fields, and
cashback coins are rejected with the original v3 error6094. FeeConfig parsing
accounts for legacy allocation boundaries2512/4073/4097. The334-case expanded buy suite also compares complete recorded inner
instructions. The buy path supports the observed curve-completion state and CompleteEvent,
including an omitted or explicit optional boolean argument. The original meaning
of that argument outside tested branches remains unresolved. The final eight TradeEvent
bytes are zero in this fixture; their meaning is unresolved and the source names
them `unparsed_trailing_field`. Zero in bounded fixtures is not proof of a general
invariant. Instructions not listed as implemented or partial above remain unimplemented.

The six newer configuration handlers add351 differential cases, including exact
events and inner CPIs. Buyback configuration accepts None and values through10000,
rejecting larger values with6060. Creator-fee limits and virtual quote reserves
accept the observed fullu64 range; only creator-fee configuration emits its event.
Quote whitelist mutation preserves the observed eligibility, duplicate, full, and
not-listed checks.

The account layouts derive from the captured official IDL. Four administration
handlers retain the earlier 93-case regression suite. Toggles reject unchanged
values with NotAuthorized (6000), update their boolean, and emit no event. Wrong
authority also uses6000. `set_max_curve_depth` accepts the tested u8 boundaries.
The expanded partial sell suite covers301 cases, comparing errors, account bytes/owners/
lamports, and raw events with the captured original. The replaced executable Pump
account is excluded from semantic state comparison; its independent binary
comparison remains a mismatch. Tests load captured external dependency binaries
into local LiteSVM, without sending transactions to a network.

Historical administration-only receipts remain in `repro/pump/admin-*`; their
source hashes identify the older four-handler source. New sell and buy receipts identify
the expanded source separately. Neither passing differential cases nor matching
arithmetic establishes instruction-level or full-program byte identity. Actual
historical compiler/crate versions remain unresolved; Anchor0.31.1 matches the
observed error101 for short dispatch data but does not uniquely identify a version.

```sh
python scripts/build_partial_candidate.py --manifest programs/pump/Cargo.toml \
  --program pump --artifact-name pump_recovered.so --tools-version v1.44 --output work/pump-clean
python scripts/pump_validate_admin.py \
  --candidate work/pump-clean/artifacts/pump_recovered.so --output work/pump-admin.json
python scripts/pump_validate_sell.py \
  --candidate work/pump-clean/artifacts/pump_recovered.so --output work/pump-sell.json
python scripts/pump_validate_buy.py \
  --candidate work/pump-clean/artifacts/pump_recovered.so --output work/pump-buy.json
python scripts/pump_validate_quote.py \
  --candidate work/pump-clean/artifacts/pump_recovered.so --output work/pump-quote.json.gz
python scripts/pump_validate_config_admin.py \
  --candidate work/pump-clean/artifacts/pump_recovered.so --output work/pump-config.json.gz
python scripts/pump_verify_dependencies.py
```

The authority/recipient checkpoint adds 59 cases. Global authority changes accept
zero and self keys and emit the previous/new authority. Reserved recipients use
the first eight remaining accounts, each nonzero, non-executable and rent exempt;
extra remaining accounts are ignored in tested fixtures. The caller authority
signs without needing to be writable. The volume lifecycle handlers add 66 cases:
initialization creates a 137-byte account or preserves an existing account;
close refunds its lamports even when observed reward/cashback fields are nonzero.
Closure requires the user signature, with the PDA tying that signer to the account. These synthetic
state tests do not establish every reachable lifecycle transition. The previous
volume checkpoint passed all 1,334 administration, lifecycle and partial-trade cases,
with whole-file equality still false. See [the review](../../audit/pump/volume-lifecycle-review.md).


The creator-fee checkpoint adds collection, native/token distribution and the
minimum-distributable query. It preserves native rent thresholds, floor rounding,
legacy curve decoding, the sharing-program owner/discriminator, token program
errors and the observed event/return behavior. The query emits its event as well
as returning it. V2 distribution optionally creates missing recipient ATAs through
the captured associated-token program. All fixture signatures are verified.

The creator-eighteen integrated build uses platform-tools v1.44 (Rust 1.79 family), Anchor
0.31.1 and the committed lockfile. Compatibility pins permit that compiler to
build current recovered source; they are not asserted historical dependency
versions. Offline reproduction requires the corresponding populated Cargo cache.
The creator-eighteen candidate passes all 1,924 maintained differential cases and
50 Surfpool comparisons using 100 signed transactions. Run all maintained suites
with `scripts/pump_validate_all.py`. The frozen build,
whole-file mismatch and signed local transaction receipts are indexed in
`repro/pump/creator-eighteen/`. See
[the recovery review](../../audit/pump/creator-fees-recovery.md) for limits.


The next creator-twentyfive checkpoint adds token collection, account extension,
volume synchronization, fee sweeps, creator migration and administrative creator
changes. Its distribution V2 now explicitly checks recipient ATA addresses,
matching the original rejection of an existing same-mint ATA belonging to another
wallet. The regression creates that alternate ATA through the real captured ATA
program using a normal signature. It exposed a reconstruction defect; it did not
establish a defect in the original program.

Fee sweeps preserve native/token quote distinctions, rent top-ups and normal versus
Mayhem recipient selection. Creator migration preserves legacy curve boundaries,
holder immutability and the outstanding-creator-fee guard. Administrative creator
changes execute the captured Fees and AMM CPIs, including outgoing wallet payouts
and holder conversion. Volume synchronization clears claimed incentive fields only
in the observed pre-campaign branch. This does not recover incentive administration
or claim handlers. The combined v1.44 candidate passes 3,741 differential cases and 176 Surfpool
comparisons using 352 signed transactions. Build and validation evidence is under
`repro/pump/creator-twentyfive/`; the indexed status identifies the published build.
Full byte equality remains false.


The creator-twentynine checkpoint adds parameter updates, both creator setters and
IDL-authority administration. Parameter updates preserve validation ordering,
sorted recipient requirements, reserve arithmetic and unaffected Global fields.
Creator setters preserve metadata parsing and legacy curve serialization behavior.
IDL-authority handling uses the actual Anchor account deserialization/serialization
flow. Some malformed short IDL accounts behave differently in LiteSVM and Surfpool;
the original and candidate match within each runtime. The six cross-runtime
differences remain explicit: IDL lengths 0/7 yield InvalidRealloc in LiteSVM and
6010 in Surfpool; lengths 8/31/40/43 yield InvalidRealloc in LiteSVM and succeed
in Surfpool. These errors are not normalized across runtimes. The frozen package
retains all raw fixtures and transaction receipts. Its 20 source/build inputs and
46 harness files are hash-bound. Alternative ATA bootstrap transactions are
retained separately and are not counted among the 484 Surfpool transactions.


The creator-thirty source adds legacy SPL Token creation, ordinary SOL
Token-2022 creation and exact-quote v3 buys. Legacy creation uses genuine captured
Metaplex/Token/ATA CPIs, creates immutable metadata, mints supply and revokes mint
authority. Partial create_v2 preserves metadata-pointer/Token-2022 initialization,
holder-reward creation and optional argument decoding for its normal SOL branch.
Mayhem and remaining quote-account creation branches are explicitly unrecovered.

Partial exact-quote v3 covers SOL and synthetic USDC under SPL Token and Token-2022
without token extensions. It preserves rounding before the affordability
adjustment, completion/post-completion reserve accounting and Mayhem partial-fill
behavior. Token completion omits the native migration-fee deduction. Broader quote
chains, exhaustive account validation and full source identity remain unresolved.
The combined clean candidate passes 5,139 cases across 22 differential suites;
all 346 Surfpool comparisons using 692 signed transactions also pass. The frozen
package preserves the exact source, candidate and validation receipts.
