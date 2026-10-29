# 3-hop multi-hop trades chained into sweep -> collect

## Problem

3rd #12 chained 1-hop multi-hop trades into sweep_creator_fee and
collect_coin_creator_fee, but left 3-hop routes open with the note
that intermediate pools' accruals were unaddressed -- the natural
guess being that each hop accrues its own fees into its own pool,
so a 3-hop trade would leave three sweepable buckets. This packet
measures all three pools after 3-hop buy and sell trades, and the
middle hop is the surprise: a 3-hop trade accrues fees into
exactly TWO pools, and the middle pool's state is byte-identical
before and after, in both directions. The packet then chains the
3-hop trades through sweep -> collect the way #12 did for 1-hop:
loops, sweep-first neutrality, limit gates, protocol-sweep
no-ops, and a cross-direction (buy -> sell) chain, all in single
VMs, one signed transaction per step, on three program images
(original, #424 control, #427 candidate).

## Fixture

The repository liquidity fixture: pool
`GseMAnNDvntR5uFePZ51yZBXzNSn7GdFPkfHwfr6d77J`, base vault
673,696,395,912,745, quote vault 122,946,690,720, LP supply
4,194,352,106,721, pool protocol_fees 2,488, creator_fees 123,394,
virtual_quote_reserves -125,882, disable_flags 0, clock slot 100 /
timestamp 1234567890. The 3-hop route is built by the
multi-hop harness: hop1 is the main pool (base/quote), hop2 is
POOL2 (BASE2/base), hop3 is P3 (BASE3/BASE2); POOL2 and P3 are
copies of the main pool's state with their own pool-authority
creators, vaults, and mints, and the same fee fields
(-125,882, 2,488, 123,394) and the same coin_creator. A 3-hop buy
pays userquote and lands BASE3 in U3; a 3-hop sell pays U3 and
lands quote in userquote. The protocol and creator recipient
ATAs and the collect destinations for all three pools are
pre-created with 0 tokens, so every sweep and collect costs only
the 5,000 fee. A trade step funds the user volume accumulator on
the first trade of a VM (1,844,400 lamports, 137 bytes); later
trades in the same VM reuse it and cost 5,000 only. The P3/POOL2
vault ATAs and destinations use the NON-native token layout
(like userbase), because BASE2/base are SPL mints, not the
native SOL mint (see Limits for the native-flag probe artifact).

Event layouts (verified byte-for-byte for sweep/collect;
multi-hop trade events asserted by discriminator and length
only, three per trade -- one per hop):
- Multi-hop buy event, 508 bytes, disc `67f4521f2cf57777`.
- Multi-hop sell event, 449 bytes, disc `3e2f370aa503dc2a`.
- SweepPoolFeeEvent, 185 bytes, disc `82a42461e48287a5`:
  timestamp @8, recipient @112, amount @176, bucket @184 (0
  protocol, 1 creator).
- CollectCoinCreatorFeeEvent, 120 bytes, disc
  `e8f5c2eeeada3a59`: timestamp @8, coin_creator @16, fee
  @48, vault ATA @56, token account @88.

Pool states below are (virtual_quote_reserves, protocol_fees,
creator_fees); lp_supply is 4,194,352,106,721 throughout and is
asserted on every step.

## Cases (14 cases, 63 steps per image, 189 receipts)

Family A -- fresh 3-hop anchors:
- `a-mhbuy3-1e9`: buy 10^9 quote: userquote -10^9, U3
  +5,315,084,721,958, buyback +4,607,153. Vault legs: main
  base -5,385,694,844,757 / quote +995,392,847; POOL2 base
  -5,356,844,515,538 / quote +5,385,694,844,757; P3 base
  -5,315,084,721,958 / quote +5,356,844,515,538. Pools: main
  (-4,733,036, 4,609,642, 123,394), POOL2 (-125,882, 2,488,
  123,394) UNCHANGED, P3 (-2,671,868,783, 2,488,
  2,671,866,295). Hop1 accrues protocol only (pf +4,607,154,
  cf +0); the tail accrues creator only (cf +2,671,742,901,
  pf +0); the middle accrues nothing.
- `a-mhsell3-1e9`: sell 10^9 BASE3: userquote +180,345,
  buyback +846. Vault legs: P3 base +10^9 / quote
  -997,499,001; POOL2 base +997,499,001 / quote
  -997,498,005; main base +997,498,005 / quote -181,191.
  Pools: main (-126,729, 3,335, 123,394), POOL2 UNCHANGED,
  P3 (-625,882, 2,488, 623,394). Hop1 (P3) accrues creator
  only (cf +500,000 exactly, pf +0); the tail (main)
  accrues protocol only (pf +847, cf +0).
- `a-mhbuy3-1e6`: buy 10^6: U3 +5,415,445,863, buyback
  +4,607. Pools: main (-130,490, 7,096, 123,394) (pf
  +4,608), POOL2 UNCHANGED, P3 (-2,833,620, 2,488,
  2,831,132) (cf +2,707,738).
- `a-mhsell3-1e6`: sell 10^6: userquote +180, buyback +1.
  Pools: main (-125,883, 2,489, 123,394) (pf +1), POOL2
  UNCHANGED, P3 (-126,382, 2,488, 123,894) (cf +500).

Family B -- buy loop (mhbuy3 -> swc P3 -> col P3 -> swc P2 ->
col P2 -> swc main -> col main -> mhbuy3 -> swc P3 -> col P3):
- First buy, then the tail sweep moves the full 2,671,866,295
  (seed included) and the collect drains exactly 2,671,866,295
  to DEST3. The middle sweep then moves only its 123,394 seed
  (POOL2 accrued nothing) and the collect drains 123,394 to
  DEST2. The main sweep moves only its 123,394 seed (hop1
  accrued protocol, not creator) and the collect drains
  123,394 to DEST.
- Second buy lands 5,121,405,353,567 U3 -- 193,679,368,391 less
  than the fresh anchor -- but its hop1 quote leg
  (+995,392,847), buyback (+4,607,153), and main protocol
  delta (+4,607,154) are BYTE-IDENTICAL to the first buy's;
  only the curve legs move. POOL2 is still unchanged after
  the second buy; the second tail sweep moves exactly
  2,601,564,322 and the collect drains it (DEST3 total
  5,273,430,617). The main protocol bucket keeps accruing
  across loops (4,609,642 -> 9,216,796) while only the
  creator bucket is swept.

Family C -- sell loop (mhsell3 -> swc main -> col main ->
mhsell3 -> swc P3 -> col P3 -> swp P3 -> col-noop):
- First sell, then the tail (main) sweep moves only its
  123,394 seed and the collect drains it. Second sell pays
  180,344 -- exactly 1 less than the anchor -- with buyback
  846 unchanged and main protocol delta +847 repeated. The
  P3 sweep then moves exactly 1,123,393 (seed 123,394 + second
  sell's hop1 creator accrual 499,999, vs the first sell's
  500,000) and the collect drains it. The protocol sweep
  moves 2,488 to the P3 protocol ATA (pool (0, 0, 0)); the
  following collect is a silent no-op (0 events, payer 5,000
  only) -- protocol sweep output is NOT collectable, now
  verified for the 3-hop tail/hop1 pool too.

Family D -- sweep-first multi-hop trades (volume unfunded
until the trade):
- `d-sweeps-all-mhbuy3`: both sweeps on all three pools
  (each moves only its seed: creator 123,394, protocol
  2,488, pools to (0, 0, 0)), then buy 10^9: every token
  delta is BYTE-IDENTICAL to the fresh anchor, and the pool
  DELTAS are identical too (main vq -4,607,154 / pf
  +4,607,154, P3 vq -2,671,742,901 / cf +2,671,742,901,
  POOL2 +0). Sweeping every hop is price-neutral.
- `d-tail-sweeps-mhbuy3`: both sweeps on P3 only, then buy:
  also byte-identical to the anchor (main/POOL2 pools end
  exactly as the anchor's).
- `d-sweeps-all-mhsell3`: both sweeps on all three pools,
  then sell 10^9: byte-identical to the fresh sell anchor
  (main vq -847 / pf +847, P3 vq -500,000 / cf +500,000,
  POOL2 +0).
- `d-sweeps-all-mhbuy3-limit-exact`: sweeps, then buy with
  limit exactly the anchor out (5,315,084,721,958): success
  with the anchor legs.
- `d-sweeps-all-mhbuy3-limit-plus1`: sweeps, then buy with
  limit 5,315,084,721,959: 6004 ExceededSlippage, full
  rollback, payer -5,000 only -- but the three hop events
  are already in the logs (ghost events on a rolled-back
  trade: the limit check runs after the hops emit).

Family E -- protocol no-op and middle-pool independence:
- `e-mhbuy3-proto-noop`: buy, protocol-sweep P3 (2,488,
  P3 vq -2,671,866,295 = -cf), then collect: silent no-op.
- `e-mhsell3-middle`: sell, creator-sweep POOL2 (123,394
  seed only, POOL2 to (-2,488, 2,488, 0)), then collect
  drains 123,394 to DEST2. The middle pool is sweepable but
  holds only its seed, in both directions.

Family F -- cross-direction chain (mhbuy3 -> mhsell3 -> swc
P3 -> col P3):
- Buy matches the anchor; the sell of 10^9 U3 then pays
  187,229 quote -- 6,884 MORE than the fresh sell anchor
  (180,345) -- because the buy moved all three pools'
  vaults. The sell accrues 879 into the main protocol bucket
  (4,609,642 -> 4,610,521, buyback 879) and 505,363 into the
  P3 creator bucket (2,671,866,295 -> 2,672,371,658) on top
  of the buy's buckets; POOL2 is still unchanged. The P3
  sweep moves the full 2,672,371,658 and the collect drains
  it to DEST3.

## Result

- A 3-hop trade accrues fees into exactly two pools: the
  first hop and the tail hop. The middle pool accrues
  nothing -- its (vq, pf, cf) is byte-identical before and
  after every 3-hop buy and sell measured, at both sizes.
  This corrects 3rd #12's Limits note, which assumed
  per-hop fees accrue into intermediate pools: they do not,
  so a middle-pool sweep moves only its 123,394 seed.
- The fee geography is directional: a buy accrues protocol
  at hop1 and creator at the tail; a sell accrues creator
  at hop1 (exactly 500,000 at 10^9, 499,999 on the loop's
  second sell, 500 at 10^6) and protocol at the tail. The
  other bucket of each pool is untouched by the trade.
- Every sweep converts its bucket into virtual quote
  reserves 1:1: after a creator sweep, a pool's vq equals
  exactly -(its protocol fees) (main after buy+sweep:
  (-4,609,642, 4,609,642, 0); P3 after buy+sweep: (-2,488,
  2,488, 0)).
- Loops do not reset prices, but fee legs repeat: the second
  buy's hop1 quote leg, buyback, and protocol delta repeat
  byte-identically while the U3 out falls; the second sell
  reprices by exactly 1. Sweep-first trades are price-neutral
  at every hop, and the sweep-first limit gate binds at the
  fresh anchor out to the unit -- with ghost hop events on
  the failing trade.
- Protocol sweep output is never collectable, for the 3-hop
  pools as for the 1-hop pool. Collect drains the vault ATA,
  never the pool, and the destination totals accumulate
  across loops (DEST3 5,273,430,617 after the buy loop's
  second collect).

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
- Multi-hop trade events are asserted by discriminator and
  length only (buy 508 bytes, sell 449 bytes, three per
  trade); their interior u64 slots are not decoded into named
  fields here, unlike the sweep/collect events whose
  amount/bucket/recipient/fee slots are pinned.
- The P3/POOL2 vault ATAs and destinations use the non-native
  token layout because BASE2/base are SPL mints. An earlier
  probe that flagged those accounts native=True produced
  runtime-level collect failures (UnbalancedInstruction /
  InsufficientFundsForRent); that is a harness artifact of
  the wrong account layout, not program behavior -- with the
  correct non-native layout every collect in this packet
  succeeds, and those artifact failures are not claimed here.
- Multi-hop trades under a transfer fee were not chained here
  (multi-hop+tf was a negative result in the hunt); this
  packet covers the no-fee 3-hop route only.
- Only 3-hop AMM routes are chained here; 5-hop routes
  (2nd #39) are not chained into sweep/collect.
