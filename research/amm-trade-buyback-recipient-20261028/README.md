# PumpSwap trade buyback recipient validation: type check, then authorization

## Problem

Every trade validates the buyback fee recipient in two layers.
First, the account must be a token account at all: a non-token
account (here the system program) fails AccountTypeNotSupported
(6027). Second, a real token account must be the authorized
recipient: the user's own quote account fails
BuybackFeeRecipientNotAuthorized (6053). The fee cannot be
redirected to an arbitrary account on either path.

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18
signed executions: `buy_v2` with base in 10^10 and limit 10^9, and
`sell_v2` with base in 10^9 and limit 1, on the repository's own
trade-v2 differential harness
(`scripts/pump_amm_trade_v2_differential.py`), with the buyback
fee recipient account replaced per case. The clock is slot 100,
epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Buyback recipient | Result |
| --- | --- | --- |
| buy-baseline | authorized fixture account | base gained 10,000,000,000, quote spent 1,847,796 |
| buy-badtype-buyback | system program | 6027 AccountTypeNotSupported |
| buy-unauthorized-buyback | user's quote account | 6053 BuybackFeeRecipientNotAuthorized |
| sell-baseline | authorized fixture account | base spent 1,000,000,000, quote gained 180,212 |
| sell-badtype-buyback | system program | 6027 AccountTypeNotSupported |
| sell-unauthorized-buyback | user's quote account | 6053 BuybackFeeRecipientNotAuthorized |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
amounts against the expected values, the error code and log
fragment, the recorded error site (6027 at `trade_v2.rs:138`
original vs `:70` control/candidate; 6053 at
`global_config.rs:326` vs `:43`), rollback on the failures, and
agreement of amounts across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Two layers, both enforced**: the type check fires before the
  authorization check, so a non-token account never reaches the
  allowlist logic.
- **The allowlist is exact**: any token account other than the
  authorized recipient is rejected, including accounts the trader
  controls.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
