# transfer_creator_fees_to_pump (v1 and v2) rejects Token-2022 quote

## Problem

transfer_creator_fees_to_pump and its v2 cannot move
Token-2022 quote fees: both handlers' associated-token
constraint requires the AMM creator vault to be associated
under the Token program passed in, so a Token-2022 quote
mint fails 2023 ConstraintAssociatedTokenTokenProgram before
any funds move, at 1% and 50% fees alike.

## Cases

Six fresh-VM triples (original / #424 control / #427
candidate), 18 signed executions on the repository's own
transfer harness setup
(`scripts/pump_amm_transfer_creator_differential.py` account
layout, AMM creator vault 1000). The clock is slot 100,
epoch 0. `producer.py` reproduces every receipt from the
repository files.

| Case | Result |
| --- | --- |
| transfer-token22-v1-base | Vault -1000 |
| transfer-token22-v1-quote-tf100 | 2023 ConstraintAssociatedTokenTokenProgram |
| transfer-token22-v1-quote-tf5000 | 2023 ConstraintAssociatedTokenTokenProgram |
| transfer-token22-v2-base | Vault -1000 |
| transfer-token22-v2-quote-tf100 | 2023 ConstraintAssociatedTokenTokenProgram |
| transfer-token22-v2-quote-tf5000 | 2023 ConstraintAssociatedTokenTokenProgram |

All three images behave identically in every case.
`verify.py` rechecks every receipt independently: signature
validity, the vault drain against the expected value for the
success cases, the error and log fragment for the failures,
rollback of every non-payer account, and agreement across
images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in
order.

## Result

- **Both versions fail on a Token-2022 quote mint**: v1 and
  v2 each fail 2023 at 1% and 50% fees alike.
- **The failure is the program constraint**: the handlers
  require the vault to be associated under the Token
  program passed in, and a Token-2022-owned vault violates
  it before any transfer.
- **Trade_v2 does not share the failure**: with the matching
  Token-2022 program account, trade_v2 withholds quote
  transfer fees normally (see the sell transfer-fee packet).
  The transfer handlers have no equivalent path.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The Token-2022 mint extension is synthetic: the fixture mint was
  mutated after the fact. The checks are pinned on the fixture pool
  only. The pump-side ATA is derived inside the handler, not a passed
  account, so the packet pins the vault drain, not the destination
  balance. No live transaction was submitted. All executions are offline
  LiteSVM replays with normally signed transactions.
