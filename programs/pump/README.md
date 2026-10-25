# Partial Pump reconstruction

The Anchor 0.31.1 source implements fourteen recovered handlers:
`toggle_create_v2`, `toggle_mayhem_mode`, `toggle_cashback_enabled`, and
`set_max_curve_depth`, `set_virtual_quote_reserves`, `update_buyback_config`,
`update_creator_fee_config`, `update_holder_reward_config`, `add_quote_mint`, and
`remove_quote_mint`, `update_global_authority`, `set_reserved_fee_recipients`,
`init_user_volume_accumulator` and `close_user_volume_accumulator`. It also implements **partial SOL and USDC-quote `sell_v3` and `buy_v3` paths**.
It is incomplete and is not a deployable replacement.

The trade paths handle constant-product reserve changes, fee tier selection,
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
invariant. All remaining instructions are unimplemented.

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
  --program pump --artifact-name pump_recovered.so --output work/pump-clean
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
state tests do not establish every reachable lifecycle transition. All 1,334
administration, lifecycle and partial-trade cases pass on the same clean candidate,
with whole-file equality still false. See [the review](../../audit/pump/volume-lifecycle-review.md).
