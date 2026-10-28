# Legacy buy/sell account validation: same checks as v2, two divergences

## Problem

The legacy buy and sell handlers predate trade_v2 but guard
the same accounts. The checks are now pinned at runtime, and
two of them diverge from trade_v2 in check order.

## Cases

Twelve fresh-VM triples (original / #424 control / #427
candidate), 36 signed executions on the repository's own
legacy harnesses (`scripts/pump_amm_legacy_buy_differential.py`,
`scripts/pump_amm_legacy_sell_differential.py`). The clock is
slot 100, epoch 0. `producer.py` reproduces every receipt from
the repository files.

| Case | Result |
| --- | --- |
| legacy-base | buy 10^10: gains 10^10 base, spends 1,847,796 quote |
| legacy-wrong-pool | 3007 AccountOwnedByWrongProgram (pool) |
| legacy-wrong-config | 3007 AccountOwnedByWrongProgram (global_config) |
| legacy-wrong-feeconfig | 3007 AccountOwnedByWrongProgram (fee_config) |
| legacy-wrong-base-mint | 6008 InvalidBaseMint (pool) |
| legacy-wrong-quote-mint | 2014 ConstraintTokenMint (protocol_fee_recipient_token_account) |
| legacy-wrong-vaultbase | 6014 InvalidPoolBaseTokenAccount (pool) |
| legacy-wrong-vaultquote | 6015 InvalidPoolQuoteTokenAccount (pool) |
| legacy-wrong-buyback | 6053 BuybackFeeRecipientNotAuthorized at global_config.rs:336 |
| legacy-unsigned | 3010 AccountNotSigner (user) |
| legacy-readonly-pool | 2000 ConstraintMut (pool) |
| legacy-sell-wrong-vaultbase | 6014 InvalidPoolBaseTokenAccount (pool) |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
user token deltas against the expected values, the error code
and log fragment, the recorded error site (the buyback check
at `global_config.rs:336` original vs `:47` control/candidate;
the rest are `caused by account` constraint errors), rollback
on failures, and agreement across images. Receipts are stored
as parts (`runtime/raw-transactions-part1/2/3/4.jsonl.gz`) to
stay under GitHub's 25MB web-upload limit; `verify.py` reads
them in order.

## Result

- **Most checks are shared**: ownership (3007), base mint
  (6008), vaults (6014/6015), signer (3010), and mutability
  (2000) fire identically on legacy and v2, and the vault
  check holds on sell as on buy.
- **The quote-mint check diverges**: on legacy, a wrong quote
  mint fails 2014 ConstraintTokenMint on
  protocol_fee_recipient_token_account, not 6009
  InvalidQuoteMint as on trade_v2, because the legacy handler
  checks the protocol recipient ATA first.
- **The buyback check diverges**: on legacy, an unauthorized
  buyback recipient fails 6053
  BuybackFeeRecipientNotAuthorized, not 6009 as on trade_v2,
  because the legacy handler checks authorization before mint.
- **The unsigned case has a snapshot caveat**: the fee payer
  is not in the legacy harness snapshot, so the receipt's
  payer fee is recorded as 5000 by construction and the
  verifier skips the payer-delta check for that case only.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The checks are pinned on the fixture pool only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
