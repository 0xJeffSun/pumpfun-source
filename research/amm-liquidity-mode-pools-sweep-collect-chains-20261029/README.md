# liquidity on cashback and mayhem pools chained into sweep -> collect

## Problem

2nd #44 pinned the trade-path mode gates: v2 trades reject
cashback pools with 6079 CashbackCoinNotSupported, legacy sell
accepts cashback pools but rejects mayhem pools with 6013
InvalidProtocolFeeRecipient, and mayhem v2 trades force the
buyback leg to 0. 3rd #18 chained liquidity-first sweep/collect
on a plain pool. Nobody chained LIQUIDITY on a mode-flagged
pool into the fee pipes: deposit and withdraw take no mode
check at all, so on a cashback pool a deposit should still move
exactly the seed buckets into sweep/collect even though the
very next v2 trade fails 6079, and on a mayhem pool a deposit
should still sweep/collect the seed even though the protocol
sweep itself fails 6013. This packet measures that order
directly -- liquidity first, then sweep -> collect, then (for
cashback legacy trades) claim -- in single VMs, one signed
transaction per step, on three program images (original, #424
control, #427 candidate).

## Fixture

The repository liquidity fixture: pool
`GseMAnNDvntR5uFePZ51yZBXzNSn7GdFPkfHwfr6d77J`, base vault
673,696,395,912,745, quote vault 122,946,690,720, LP supply
4,194,352,106,721, pool protocol_fees 2,488, creator_fees 123,394,
virtual_quote_reserves -125,882, disable_flags 0, clock slot 100 /
timestamp 1234567890. Mode flags are patched on the pool account
only: is_mayhem_mode byte 243, is_cashback_coin byte 244.
Cashback cases pre-create the user volume accumulator (137 bytes,
lamports 10^9, all fields zero) and its ATA (2,039,280 lamports,
0 tokens); the protocol and creator recipient ATAs and the
collect destination DEST are pre-created with 0 tokens, so every
sweep and collect costs only the 5,000 fee. A v2 trade step funds
the user volume accumulator on the first trade of a VM
(1,844,400 lamports, 137 bytes); later steps reuse it and cost
5,000 only. Legacy buy uses the `buy` instruction with arguments
(amount, limit) plus a track byte 0; legacy sell uses `sell`
with (amount, minquote); the cashback remaining layout is
[accumulator ATA, accumulator PDA, pool-v2 PDA, buyback owner,
buyback dest] for both.

Event layouts (verified byte-for-byte):
- DepositEvent / WithdrawEvent, 264 bytes, disc `78f83d531f8e6b90` /
  `1609851aa02c47c0`: base leg @72, quote leg @80.
- BuyEvent (v2), 500 bytes, disc `67f4521f2cf57777`: curve @64,
  lp_bps @72, lp_fee @80, proto_bps @88, proto_fee @96, quote
  @104, user_quote_in @112.
- SellEvent (v2), 449 bytes, disc `3e2f370aa503dc2a`: same
  slots, quote @104, user_out @112.
- BuyEvent (legacy cashback buy, 497 bytes, disc
  `67f4521f2cf57777`): out @16, max @24, curve @64, lp_bps @72,
  lp_fee @80, proto_bps @88, proto_fee @96, quote @104,
  user_quote_in @112, creator_bps @344, creator_fee @352 (0 on
  cashback pools), track @360, cashback_bps @408,
  cashback @416, buyback_bps @424, buyback_fee @432.
- SellEvent (legacy cashback sell, 449 bytes, disc
  `3e2f370aa503dc2a`): curve @64, lp_fee @80, protocol_fee
  @96 (gross 1,698), quote @104, user_out @112, creator_bps
  @344, creator_fee @352 (0), cashback_bps @360, cashback
  @368, buyback_fee @384.
- SweepPoolFeeEvent, 185 bytes, disc `82a42461e48287a5`:
  timestamp @8, recipient @112, amount @176, bucket @184 (0
  protocol, 1 creator).
- CollectCoinCreatorFeeEvent, 120 bytes, disc
  `e8f5c2eeeada3a59`: timestamp @8, coin_creator @16, fee
  @48, vault ATA @56, token account @88.
- ClaimCashbackEvent, 72 bytes, disc `e2d6f62107f293e5`:
  user @8..40, amount @40..48, timestamp @48..56,
  total_claimed @56..64, total_cashback_earned @64..72.

Pool states below are (virtual_quote_reserves, protocol_fees,
creator_fees); lp_supply is 4,194,352,106,721 unless noted.

## Cases (21 cases, 81 steps per image, 243 receipts)

Family A -- cashback liquidity anchors (volume pre-created,
accumulator fields 0/0 throughout unless a legacy trade runs):
- `a-dep-swc-col`: dep-1e9 (-160,619,895,224 base /
  -29,312,410 quote, LP +10^9), sweep creator 123,394 (pool
  (-2,488, 2,488, 0)), collect drains exactly 123,394 to DEST.
- `a-wd-swc-col`: wd-1e9 (+160,619,895,223 / +29,312,409,
  LP -10^9), sweep 123,394, collect 123,394.
- `a-dep-wd-swc-col`: dep-1e9, wd-1e9 (round trip nets -1
  base / -1 quote, pool back to (-125,882, 2,488, 123,394)),
  sweep 123,394, collect 123,394. The round trip leaves the
  seed intact.
- `a-dep-swp-colnoop`: dep-1e9, protocol sweep 2,488 (pool
  (-123,394, 0, 123,394)) -- the protocol sweep SUCCEEDS on a
  cashback pool -- then collect is a SILENT NO-OP (0 events,
  payer 5,000 only, DEST 0). Collect never touches the
  protocol bucket.
- `a-wd-swp-swc-col`: wd-1e9, protocol sweep 2,488, creator
  sweep 123,394 (pool (0, 0, 0)), collect 123,394. The two
  sweeps compose; the protocol leg stays stranded.

Family B -- mayhem liquidity (volume absent; no trade runs):
- `b-dep-swc-col`: dep-1e9, sweep creator 123,394, collect
  123,394 -- the mayhem flag does not touch liquidity or the
  creator sweep.
- `b-wd-swc-col`: wd-1e9, sweep 123,394, collect 123,394.
- `b-dep-swp-fail-swc-col`: dep-1e9, protocol sweep fails
  6013 InvalidProtocolFeeRecipient with full rollback
  (payer -5,000 only, pool unchanged), then creator sweep
  123,394, collect 123,394. The failed protocol sweep does
  not disturb the creator pipe.
- `b-wd-swp-fail-colnoop`: wd-1e9, protocol sweep fails
  6013, collect is a silent no-op (creator vault ATA empty).

Family C -- cashback v2 gates after liquidity (volume
pre-created; the failed trades fund nothing):
- `c-dep-buy-fail-swc-col`: dep-1e9, buy_v2 10^10 fails
  6079 CashbackCoinNotSupported with full rollback, sweep
  123,394, collect 123,394.
- `c-wd-sell-fail-swc-col`: wd-1e9, sell_v2 10^10 fails
  6079, sweep 123,394, collect 123,394.
- `c-dep-exact-fail-swc-col`: dep-1e9, buy_exact_quote_in_v2
  10^7 fails 6079, sweep 123,394, collect 123,394. All three
  v2 entry points reject the cashback pool after liquidity
  exactly as they do before it.

Family D -- mayhem v2 trades into sweep/collect (volume
funded by the first trade, 1,844,400 lamports, 137 bytes):
- `d-buy-swc-col`: buy_v2 10^10 on a mayhem pool: spend
  1,847,796, vault takes the FULL spend (+1,847,796),
  buyback 0, pool (-148,330, 19,461, 128,869). Sweep creator
  128,869 (pool (-19,461, 19,461, 0)), collect 128,869.
- `d-dep-buy-swc-col`: dep-1e9, then the buy settles
  byte-identical to the fresh mayhem buy (same spend,
  same vault legs, same pool deltas; only LP supply
  differs), sweep 128,869, collect 128,869. Proportional
  liquidity is invisible to the mayhem trade, as on plain
  pools.
- `d-dep-sell-swc-col`: dep-1e9, sell_v2 10^10: receipt
  1,802,115 -- the same receipt as the plain-pool sell --
  but the vault sends ONLY the receipt (-1,802,115, no
  buyback leg), buyback 0, pool (-148,329, 19,460, 128,869).
  Sweep 128,869, collect 128,869.
- `d-dep-buy-buy-swc-col`: dep-1e9, buy, second buy (spend
  1,847,852, curve 1,825,037, pool (-170,779, 36,434,
  134,345)), sweep 134,345, collect 134,345. The loop
  accrual matches the plain-pool loop (second buy accrual
  5,476); only the buyback split differs.

Family E -- cashback legacy trades after a deposit (volume
pre-created; pool fields never move under legacy trades):
- `e-dep-cbbuy-claim-swc-col`: dep-1e9, cashback buy 10^10
  (spend 1,847,796, vault +1,825,348, protocol ATA +8,487,
  buyback +8,486, uvata +5,475, earned 5,475, pool fields
  unchanged), claim pays 5,475 (claimed 5,475), sweep
  123,394, collect 123,394. Total: 5,475 + 123,394 =
  128,869, the non-cashback total, conserved.
- `e-cbbuy-dep-claim-swc-col`: cashback buy first, then
  dep-1e9 with MOVED legs (base 160,617,511,066 / quote
  29,312,845 -- the post-buy available legs, as in 3rd #18)
  but the same buckets, claim 5,475, sweep 123,394,
  collect 123,394. The deposit leg moves with the vault;
  the fee buckets do not.
- `e-dep-cbsell-claim-swc-col`: dep-1e9, cashback sell 10^9
  (receipt 180,212, vault -182,458, protocol ATA +849,
  buyback +849, uvata +548, earned 548, creator leg 0),
  claim pays 548, sweep 123,394, collect 123,394. Total:
  548 + 123,394 = 123,942.

Family F -- both flags, and mayhem legacy sell after a
deposit:
- `f-dep-buy-fail-swc-col`: both flags set, dep-1e9,
  buy_v2 fails 6079 (cashback wins over mayhem), sweep
  123,394, collect 123,394.
- `f-dep-msell-fail-swc-col`: mayhem pool, dep-1e9, legacy
  sell 10^9 fails 6013 with full rollback (the mayhem
  reserved-recipient gate binds the legacy sell even after
  a deposit), sweep 123,394, collect 123,394.

## Result

- Deposit and withdraw ignore both mode flags entirely: on
  cashback, mayhem, and both-flags pools, dep-1e9 and wd-1e9
  settle with the fresh legs, accrue nothing into either
  bucket, and the following creator sweep moves exactly the
  123,394 seed, drained in full by collect. A dep->wd round
  trip leaves the seed intact.
- The protocol sweep is the mode-sensitive step: it succeeds
  on a cashback pool (2,488, then collect no-op) and fails
  6013 on a mayhem pool with full rollback, in liquidity
  order exactly as in trade order -- and the failure never
  disturbs the creator pipe.
- The v2 cashback gate survives liquidity: buy, sell, and
  buy_exact all fail 6079 after a deposit or withdraw, with
  full rollback and the seed sweep/collect intact. With
  both flags set, cashback wins (6079).
- Mayhem v2 trades chain cleanly into the pipes: the buyback
  leg is forced to 0, so the buy's vault leg is the full
  spend and the sell's vault leg is exactly the receipt,
  while the pool accrues the full protocol fee (buy:
  pf 2,488 -> 19,461; sell: pf 2,488 -> 19,460) and the
  creator fee as usual (5,475 per trade). Deposit before
  either trade leaves every leg byte-identical.
- Cashback legacy trades are untouched by a neighboring
  deposit: dep->cbbuy and dep->cbsell match their fresh
  anchors to the unit, cbbuy->dep moves only the deposit
  legs (available reserves), and claim + sweep + collect
  conserve the non-cashback totals exactly (128,869 buy /
  123,942 sell).

## Limits

- Offline LiteSVM reproduction on synthetic fixtures only; no
  claim about on-chain behavior beyond these measured
  transactions, no source change, no build, and no whole
  program equivalence claim.
- All amounts, error codes, and site lines are exact values
  for this fixture state, not claims about other pool states.
  Error site line numbers differ between the original and the
  rebuilt images (6079 at trade_v2.rs:103 on the original,
  :59 on the rebuilt images; 6013 at swap/mod.rs:164 on the
  original, :23 on the rebuilt images); verify.py checks each
  image's recorded site line against that image's own logs
  and never compares site lines across images (2nd #36
  lesson). The README cites error codes, which agree across
  images.
- The mode flags are patched post-hoc on the pool account (as
  in 2nd #44); this pins handler behavior on flagged pools,
  not a reachable mainnet state.
- Transfer-fee variants of mode-pool liquidity chains, and
  deposit/withdraw on cashback/mayhem pools under a transfer
  fee, were not chained here; the tf dimension for sweep
  chains was pinned in 3rd #5/#8/#9/#11/#15/#19 and the mode
  gates in 2nd #44.
- Multi-hop trades on mode pools were pinned in 2nd #44 and
  are not re-chained here.
