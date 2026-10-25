# Partial Pump reconstruction

The Anchor 0.31.1 source implements four recovered administration handlers:
`toggle_create_v2`, `toggle_mayhem_mode`, `toggle_cashback_enabled`, and
`set_max_curve_depth`. It also implements **partial SOL and USDC-quote `sell_v3` and `buy_v3` paths**.
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
python scripts/pump_verify_dependencies.py
```
