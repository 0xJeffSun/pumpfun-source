# liquidity first, then sweep -> collect

## Problem

3rd #6 chained sweeps INTO deposit, withdraw, and legacy buy and
found them price-neutral, and 3rd #4 chained trades into sweep ->
collect. Neither chained LIQUIDITY FIRST into sweep -> collect:
deposit and withdraw move vaults and LP supply but accrue nothing
into the pool fee buckets, so the sweep after a deposit should
move exactly the seed buckets -- and a trade's accrual should
survive an intervening deposit or withdraw untouched into the
sweep and the collect. The reverse-order question matters because
3rd #3 pinned deposit/withdraw legs to AVAILABLE reserves (raw
vault quote minus accrued fees): after a trade accrues 128,869,
the deposit leg must move, yet the bucket itself must not. This
packet measures that order directly, in both directions, with
loops and round trips, in single VMs, one signed transaction
per step, on three program images (original, #424 control, #427
candidate).

## Fixture

The repository liquidity fixture: pool
`GseMAnNDvntR5uFePZ51yZBXzNSn7GdFPkfHwfr6d77J`, base vault
673,696,395,912,745, quote vault 122,946,690,720, LP supply
4,194,352,106,721, pool protocol_fees 2,488, creator_fees 123,394,
virtual_quote_reserves -125,882, disable_flags 0, clock slot 100 /
timestamp 1234567890. A sweep to a fresh ATA costs 2,044,280
(fee 5,000 + ATA rent 2,039,280); in the legacy variant the
recipient ATAs pre-exist with 0 tokens, so each sweep costs only
5,000. Deposit/withdraw steps cost 5,000; the first trade step in
a case costs 1,849,400 (volume rent 1,844,400 + fee 5,000). The
collect destination DEST is pre-created with 0 tokens.

Event layouts (verified byte-for-byte):
- DepositEvent / WithdrawEvent, 264 bytes, disc `78f83d531f8e6b90` /
  `1609851aa02c47c0`: base leg @72, quote leg @80.
- SweepPoolFeeEvent, 185 bytes, disc `82a42461e48287a5`:
  timestamp @8, recipient @112, amount @176, bucket @184 (0
  protocol, 1 creator).
- CollectCoinCreatorFeeEvent, 120 bytes, disc `e8f5c2eeeada3a59`:
  timestamp @8, coin_creator @16, fee @48, vault ATA @56, token
  account @88.
- BuyEvent (v2), 500 bytes, disc `67f4521f2cf57777`; SellEvent
  (v2), 449 bytes, disc `3e2f370aa503dc2a`; legacy BuyEvent
  shares the v2 buy disc but is 497 bytes.

Pool states below are (virtual_quote_reserves, protocol_fees,
creator_fees); lp_supply is 4,194,352,106,721 unless noted.

## Cases (17 cases, 66 steps per image, 198 receipts)

Family A -- liquidity-first sweep/collect anchors (deposit and
withdraw accrue nothing):
- `a-dep9-swc-col`: dep-1e9 (-160,619,895,224 base /
  -29,312,410 quote, LP +10^9), sweep creator 123,394 (pool
  (-2,488, 2,488, 0), supply 4,195,352,106,721), collect drains
  exactly 123,394 to DEST.
- `a-dep12-swc-col`: dep-1e12 (-160,619,895,223,680 /
  -29,312,409,095, supply 5,194,352,106,721), sweep creator
  123,394, collect 123,394. Scale does not move the seed.
- `a-wd9-swc-col`: wd-1e9 (+160,619,895,223 / +29,312,409,
  supply 4,193,352,106,721), sweep creator 123,394, collect
  123,394.
- `a-wd12-swc-col`: wd-1e12 (+160,619,895,223,679 /
  +29,312,409,094, supply 3,194,352,106,721), sweep creator
  123,394, collect 123,394.

Family B -- trade -> liquidity -> sweep -> collect (the accrual
survives the intervening liquidity step untouched):
- `b-buy-dep9-swc-col`: buy 10^10 (spend 1,847,796, pool
  (-139,844, 10,975, 128,869)), dep-1e9 with legs
  -160,617,511,066 / -29,312,845 -- NOT the fresh legs
  (-160,619,895,224 / -29,312,410), because available reserves
  moved -- then sweep creator 128,869, collect 128,869.
- `b-buy-wd9-swc-col`: buy, wd-1e9 (+160,617,511,065 /
  +29,312,844, the 3rd #3 post-buy legs), sweep 128,869,
  collect 128,869.
- `b-sell-dep9-swc-col`: sell 10^10 (receipt 1,802,115, pool
  (-139,843, 10,974, 128,869)), dep-1e9 (-160,622,279,383 /
  -29,312,975), sweep 128,869, collect 128,869.
- `b-lbuy-dep9-swc-col` (legacy variant): legacy buy 10^10
  (spend 1,847,796, vault +1,825,348, protocol ATA +8,487,
  creator ATA +5,475, pool fields UNCHANGED (-125,882, 2,488,
  123,394)), dep-1e9 (-160,617,511,066 / -29,312,845), sweep
  creator 123,394 (pool (-2,488, 2,488, 0)), collect drains
  128,869 = the 123,394 seed PLUS the 5,475 direct legacy leg.
  The collect pipe merges the seed and the direct leg even
  though the pool fields never held the leg.

Family C -- liquidity -> trade -> sweep -> collect
(proportional liquidity is invisible to the v2 curve):
- `c-dep9-buy-swc-col`: dep-1e9, then buy 10^10 settles
  byte-identical to the fresh anchor (spend 1,847,796, vault
  +1,839,310, buyback 8,486, pool (-139,844, 10,975, 128,869)),
  sweep 128,869, collect 128,869.
- `c-wd9-buy-swc-col`: wd-1e9, then buy: identical to the
  fresh anchor, sweep 128,869, collect 128,869.
- `c-dep9-sell-swc-col`: dep-1e9, then sell 10^10: identical
  to the fresh sell anchor (receipt 1,802,115, pool (-139,843,
  10,974, 128,869)), sweep 128,869, collect 128,869.
- `c-dep9-buy-buy-swc-col`: dep-1e9, buy, second buy (spend
  1,847,852, curve 1,825,037, pool (-153,807, 19,462, 134,345)),
  sweep 134,345, collect 134,345. The loop accrual matches the
  sweep-free trade loop in 3rd #10 (second buy accrual 5,476).

Family D -- round trips and double collect:
- `d-dep9-swc-col-wd9`: dep-1e9, sweep 123,394, collect
  123,394, wd-1e9 returns the fresh withdraw legs exactly
  (+160,619,895,223 / +29,312,409), pool (-2,488, 2,488, 0).
- `d-dep9-wd9-swc-col`: dep-1e9, wd-1e9 (round trip nets -1
  base / -1 quote, pool back to (-125,882, 2,488, 123,394)),
  sweep 123,394, collect 123,394. The round trip leaves the
  seed intact.
- `d-dep9-swc-col-col`: dep-1e9, sweep 123,394, collect
  123,394, second collect is a SILENT NO-OP (0 events, payer
  5,000 only, DEST unchanged).

Family E -- protocol bucket in liquidity-first order:
- `e-buy-dep9-swp-swc-col`: buy, dep-1e9, protocol sweep
  10,975 (pool (-128,869, 0, 128,869)), creator sweep 128,869
  (pool (0, 0, 0)), collect drains only the creator 128,869.
  The 10,975 stays stranded in the protocol ATA, exactly as in
  3rd #4 -- liquidity first changes nothing about the
  protocol bucket's non-collectability.
- `e-buy-dep9-swp-colnoop` (creator vault ATA pre-created
  empty): buy, dep-1e9, protocol sweep 10,975, collect is a
  SILENT NO-OP (0 events, DEST 0, protocol ATA intact).
  Collect never touches the protocol bucket; without a creator
  sweep there is nothing for it to drain.

## Result

- Deposit and withdraw accrue nothing into either pool fee
  bucket, at either scale: every liquidity-first sweep moves
  exactly the 123,394 seed, and every liquidity-first collect
  drains exactly 123,394. The buckets are trade-only.
- A trade's accrual survives an intervening deposit or
  withdraw untouched: buy/sell -> dep/wd -> sweep -> collect
  always moves and drains the full 128,869, even though the
  intervening deposit/withdraw legs themselves move with the
  trade (dep after buy: base 160,617,511,066, quote
  29,312,845; dep after sell: base 160,622,279,383, quote
  29,312,975).
- Proportional liquidity is invisible to the v2 curve: dep or
  wd before a buy or a sell leaves every trade leg, fee, and
  accrual byte-identical to the fresh anchor. Only the LP
  supply differs (4,195,352,106,721 after dep-1e9,
  4,193,352,106,721 after wd-1e9).
- The legacy direct leg and the pool seed merge in the
  collect pipe: legacy buy -> dep -> sweep -> collect drains
  128,869 even though the pool fields never held the 5,475
  leg -- the sweep moves the seed, the collect drains the
  whole vault ATA.
- Round trips compose with the fee pipes: dep -> sweep ->
  collect -> wd returns the fresh withdraw legs exactly, and
  dep -> wd -> sweep -> collect still moves only the seed.
  A second collect after a full drain, and a collect after a
  protocol-only sweep, are both silent no-ops.

## Limits

- Offline LiteSVM reproduction on synthetic fixtures only; no
  claim about on-chain behavior beyond these measured
  transactions, no source change, no build, and no whole
  program equivalence claim.
- All amounts, error codes, and site lines are exact values
  for this fixture state, not claims about other pool states.
  Error site line numbers differ between the original and the
  rebuilt images; verify.py checks each image's recorded site
  line against that image's own logs and never compares site
  lines across images (2nd #36 lesson). The README cites
  error codes, which agree across images.
- Collect event interior slots past the fee/vault/dest fields
  are not decoded here; the event is asserted by discriminator
  and length plus the named slots above.
- Transfer-fee variants of liquidity-first chains were not
  chained here; the tf dimension for sweep chains was pinned
  in 3rd #5/#8/#9/#11 and the tf dimension for liquidity in
  2nd #19.
- Deposit/withdraw with disabled flags, and deposit/withdraw
  on cashback/mayhem pools, were not chained here; the
  disable-flag gates were pinned in 2nd #46 and the mode
  gates in 2nd #44.
