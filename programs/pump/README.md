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
`remove_quote_control_mint` and `set_quote_control_mint_reserves`. It also implements **partial `sell_v3`, `buy_v3`, `buy_exact_quote_in_v3` and `create_v2` paths**.
It is incomplete and is not a deployable replacement. The current sell_v2 quote-transfer-fee minimum-output check and fee-event fields have a confirmed mismatch with the captured original; the saved passing suites do not cover that boundary.

The current frozen checkpoint is [quote-control-fortyeight](../../repro/pump/quote-control-fortyeight/README.md):
9,161 differential cases across 36 suites and 1,024 Surfpool comparisons using
2,048 signed transactions across 28 runners passed. The Surfpool transactions
contain 2,980 verified individual signatures. Its candidate is 1,478,960 bytes,
SHA-256 `c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804`.
It adds six independent quote-control handlers to holder-nested-fortytwo.
Main and scratch clean builds are whole-file identical. All 35 prior differential
suites and 28 prior Surfpool runners were rerun against this candidate. The new
507-case quote-control suite separately records 1,014 executed transactions and
2,008 verified signatures, with explicit signature/blockhash checks and complete
saved transaction bytes. Nested creation remains partial for Mayhem, migrated
parents and deeper chains. See [the quote-control recovery report](../../audit/pump/QUOTE_CONTROL_RECOVERY.md)
and [the earlier holder/nested report](../../audit/pump/HOLDER_NESTED_RECOVERY.md).
Full original-byte equality remains false. Earlier checkpoint counts below describe
their historical source snapshots.

The partial v3 trade paths handle constant-product reserve changes, fee tier selection,
creator/protocol/buyback accounting, Token/Token2022 `transfer_checked` CPI,
lamport transfers, and log/CPI TradeEvents. USDC quote paths transfer tokens through the supplied quote token program,
use stable fee tiers, and zero legacy SOL-only event fields. A130-case suite
checks locally synthesized quote accounts under SPL Token and Token2022, without
claiming every token extension combination. Other quote and multi-hop routes remain
unsupported. SOL Mayhem trades suppress buyback,
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
