# multi_hop_swap account validation: wrong route accounts fail before routing

## Problem

multi_hop_swap routes through a pool's vaults, and each route
account is checked before any hop runs. The checks are now
pinned at runtime, including two multi-hop-only errors.

## Cases

Nine fresh-VM triples (original / #424 control / #427
candidate), 27 signed executions on the repository's own
multi-hop harness (`scripts/pump_amm_multi_hop_differential.py`).
The clock is slot 100, epoch 0. `producer.py` reproduces every
receipt from the repository files.

| Case | Result |
| --- | --- |
| mh-base | hop buys 5,368,809,031,467 base for 10^9 quote |
| mh-wrong-pool | 6027 AccountTypeNotSupported at multi_hop_swap.rs:239 |
| mh-wrong-config | 3007 AccountOwnedByWrongProgram (global_config) |
| mh-wrong-feeconfig | 3007 AccountOwnedByWrongProgram (fee_config) |
| mh-wrong-vaultbase | 6014 InvalidPoolBaseTokenAccount (pool) |
| mh-wrong-vaultquote | 6015 InvalidPoolQuoteTokenAccount (pool) |
| mh-wrong-buyback | 6009 InvalidQuoteMint at trade_v2.rs:146 |
| mh-unsigned | 3010 AccountNotSigner (user) |
| mh-wrong-base | 6084 MultiHopDiscontinuousPath at multi_hop_swap.rs:300 |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
user token deltas against the expected values, the error code
and log fragment, the recorded error site (the pool-type check
at `multi_hop_swap.rs:239` original vs `:256` control/candidate,
the route-continuity check at `:300` vs `:294`, the buyback
mint check at `trade_v2.rs:146` vs `:75`; the rest are
`caused by account` constraint errors), rollback on failures,
and agreement across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in
order.

## Result

- **The pool account is type-checked**: a pool that is not a
  program account fails 6027 AccountTypeNotSupported, not an
  ownership check, because the route loader reads the account
  type first.
- **Config ownership is checked**: a global config or fee
  config owned by the wrong program fails 3007, as on trade
  and liquidity.
- **Vault checks are shared with trade**: a wrong base vault
  fails 6014 and a wrong quote vault fails 6015, reported
  against the pool account.
- **The buyback check is the shared one**: a buyback
  recipient whose mint is not the quote fails 6009 at the same
  `trade_v2.rs:146` site as single-hop trades.
- **Route continuity is multi-hop-only**: a base mint that is
  not on the route fails 6084 MultiHopDiscontinuousPath,
  because no hop's input mint matches it.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The checks are pinned on the fixture pool only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
