# PumpSwap multi_hop_swap: routing, arity, fixed zero names

## Problem

`multi_hop_swap` routes through remaining-account hops, but its
arity, its zero checks, and its two-hop economics were not
pinned: how many remaining accounts are required, whether the
zero errors are direction-aware, and whether two hops beat one.

## Cases

Ten fresh-VM triples (original / #424 control / #427 candidate),
30 signed executions on the repository's own multi-hop harness
(`scripts/pump_amm_multi_hop_differential.py`). The clock is slot
100, epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Result |
| --- | --- |
| hop1-buy | base +5,368,809,031,467, quote -10^9 |
| hop1-sell | base -10^9, quote +180,212 |
| hop1-notail | 6044 NotEnoughRemainingAccounts, rollback |
| hop1-amount0 | 6002 ZeroQuoteAmount, rollback |
| hop1-sell-limit0 | 6001 ZeroBaseAmount, rollback |
| hop1-unsigned | 3010 AccountNotSigner, rollback |
| hop1-buy-limit-huge | 6004 ExceededSlippage, rollback |
| hop2-buy | USER2 second-base +5,343,557,184,089, quote -10^9 |
| hop2-sell | USER2 second-base -10^9, quote +180,345 |
| hop2-buy-limit0 | 6001 ZeroBaseAmount, rollback |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
user token deltas against the expected values, the error code
and log fragment, the recorded error site (6044 at
`multi_hop_swap.rs:278` original vs `:269` control/candidate;
6002 at `:273` vs `:266`; 6001 at `:274` vs `:267`; 6004 at
`:389` vs `:445`), rollback on failures, and agreement across
images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Two hops route**: the second hop's curve eats ~0.47% on
  the buy, but the two-hop sell yields 180,345, slightly MORE
  than the direct sell's 180,212, because the second pool's
  reserves differ.
- **Zero checks are fixed to buy names**: amount 0 always
  reports ZeroQuoteAmount and limit 0 always reports
  ZeroBaseAmount, regardless of direction. A multi-hop sell
  limit of zero therefore FAILS, unlike sell_v2 where it
  succeeds.
- **Arity and authorization hold**: no remaining accounts fail,
  an unsigned user fails, and a limit one above the computed
  output slips.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The routes are pinned on the synthetic second pool only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
