# multi-hop swaps reject Token-2022 mints

## Problem

Multi-hop swaps cannot route Token-2022 mints, pinned at
runtime on the two-pool route: a Token-2022 base mint fails
with IncorrectProgramId and a Token-2022 quote mint fails
with 6027 AccountTypeNotSupported, in both directions, while
single-pool trade_v2 withholds the same fees normally.

## Cases

Eight fresh-VM triples (original / #424 control / #427
candidate), 24 signed executions on the repository's own
multi-hop harness (`scripts/pump_amm_multi_hop_differential.py`,
two-pool route). The clock is slot 100, epoch 0. `producer.py`
reproduces every receipt from the repository files.

| Case | Result |
| --- | --- |
| multihop-token22-buy | Buy spends 10^9 quote, second user gains 5,343,557,184,089 base |
| multihop-token22-buy-base-tf100 | IncorrectProgramId |
| multihop-token22-buy-quote-tf100 | 6027 AccountTypeNotSupported (trade_v2.rs:138) |
| multihop-token22-buy-base-tf5000 | IncorrectProgramId |
| multihop-token22-sell | Sell spends 10^9 base from the second user, gains 180,345 quote |
| multihop-token22-sell-base-tf100 | IncorrectProgramId |
| multihop-token22-sell-quote-tf100 | 6027 AccountTypeNotSupported (trade_v2.rs:138) |
| multihop-token22-sell-base-tf5000 | IncorrectProgramId |

All three images behave identically in every case.
`verify.py` rechecks every receipt independently: signature
validity, the second-user and quote deltas against the expected
values for the success cases, the error and log fragment for
the failures, rollback of every non-payer account, and
agreement across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in
order.

## Result

- **The intermediate base transfer uses the wrong program**:
  with a Token-2022 base mint, the multi-hop handler passes
  the Token program for the intermediate transfer of a
  Token-2022-owned account and fails IncorrectProgramId, in
  both directions and at 1% and 50% fees alike.
- **The quote route fails its own check**: with a
  Token-2022 quote mint, the handler fails 6027
  AccountTypeNotSupported at trade_v2.rs:138, in both
  directions.
- **Single-pool trade_v2 does not share either failure**:
  with the matching Token-2022 program account, trade_v2
  withholds base and quote transfer fees normally (see the
  trade base and quote transfer-fee packets). The multi-hop
  handler has no equivalent path.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The Token-2022 mint extension is synthetic: the fixture mint was
  mutated after the fact. The checks are pinned on the fixture pool
  only. No live transaction was submitted. All executions are offline
  LiteSVM replays with normally signed transactions.
