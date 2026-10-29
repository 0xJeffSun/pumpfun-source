# cashback legacy buy/sell chained into sweep -> collect -> claim under transfer fee

## Problem

3rd #13 chained the cashback legacy SELL through sweep ->
collect -> claim without a fee, 3rd #14 chained the cashback
legacy BUY through the same pipes without a fee, 3rd #02
pinned buy -> claim under tf100 only (no sweep/collect), and
2nd #47 pinned the cashback buy accrual under tf only. Nobody
chained the full cashback pipes under a transfer fee. The
question is sharp because the fee withholds at every hop: the
buy/sell creator leg is withheld into the accumulator ATA, the
sweep is withheld into the vault ATA, the collect is withheld
into DEST, and the claim itself withholds into the user quote
ATA -- so the two pipes no longer conserve the non-cashback
total, and each hop's gap is pinned here to the unit on three
program images (original, #424 control, #427 candidate).

## Fixture

The repository liquidity fixture: pool
`GseMAnNDvntR5uFePZ51yZBXzNSn7GdFPkfHwfr6d77J`, base vault
673,696,395,912,745, quote vault 122,946,690,720, LP supply
4,194,352,106,721, pool protocol_fees 2,488, creator_fees 123,394,
virtual_quote_reserves -125,882, disable_flags 0, clock slot 100 /
timestamp 1234567890. Cashback cases set pool byte 244
(is_cashback_coin) to 1. The quote mint carries a synthesized
Token-2022 transfer-fee extension (post-hoc, as in 3rd #5/#8:
the legacy creation path cannot put a transfer fee on a quote
mint either); the mint, the user quote ATA, and the vault quote
ATA are converted by the liquidity harness `transferfee`
override to 178-byte Token-2022 accounts, whose withheld field
sits at offset 170 (not 174 -- see Limits). The protocol,
creator, buyback, accumulator, and collect-destination ATAs are
pre-created Token-2022 ATAs (182 bytes, withheld at offset 174)
funded at the 182-byte rent (2,157,600 lamports), so every sweep
and collect costs only the 5,000 fee. Legacy buy uses the `buy`
instruction with arguments (amount, limit) plus a track byte 0;
legacy sell uses `sell` with (amount, minquote); the cashback
remaining layouts are [accumulator ATA, pool-v2 PDA, buyback
owner, buyback dest] for buy and [accumulator ATA, accumulator
PDA, pool-v2 PDA, buyback owner, buyback dest] for sell. The
claim uses `claim_cashback` with keys [payer, accumulator PDA,
quote mint, token program, accumulator ATA, user quote ATA,
default, event authority, program].

Event layouts (verified byte-for-byte):
- BuyEvent (legacy buy 497 bytes / buy_exact 512 bytes, disc
  `67f4521f2cf57777`): out @16, max @24, curve @64, lp_bps @72,
  lp_fee @80, protocol_bps @88, protocol_fee @96 (GROSS),
  quote @104 (vault NET receipt), user_quote_in @112 (nofee
  spend), creator_bps @344, creator_fee @352 (0 on cashback
  pools), track @360, cashback_bps @408 (buy) / @423 (exact),
  cashback @416 (buy) / @431 (exact) (GROSS), buyback_bps
  @424 (buy) / @439 (exact), buyback_fee @432 (buy) / @447
  (exact) (NET -- the one net field in the event).
- SellEvent (legacy sell, 449 bytes, disc `3e2f370aa503dc2a`):
  curve @64, lp_fee @80, protocol_fee @96 (GROSS 1,698 =
  gross protocol 849 + gross buyback 849, identical to the
  nofee event -- it is NOT the sum of the net legs, 840 +
  840 = 1,680), quote @104, user_out @112 (GROSS receipt),
  creator_bps @344, creator_fee @352 (0), cashback_bps @360,
  cashback @368 (GROSS), buyback_fee @384 (NET).
- SweepPoolFeeEvent, 185 bytes, disc `82a42461e48287a5`:
  timestamp @8, recipient @112, amount @176 (GROSS), bucket
  @184 (0 protocol, 1 creator).
- CollectCoinCreatorFeeEvent, 120 bytes, disc
  `e8f5c2eeeada3a59`: timestamp @8, coin_creator @16, fee
  @48 (GROSS vault-ATA drain), vault ATA @56, token account
  @88.
- ClaimCashbackEvent, 72 bytes, disc `e2d6f62107f293e5`:
  user @8..40, amount @40..48 (GROSS uvata drain),
  timestamp @48..56, total_claimed @56..64,
  total_cashback_earned @64..72 (GROSS cumulative).

## Cases (18 cases, 41 steps per image, 123 receipts)

Family B -- tf100 buy chains (seeded accumulator: 137 bytes,
lamports 10^9, all fields zero; accumulator ATA 2,157,600
lamports, 0 tokens):
- `b-buy-tf100`: cashback buy 10^10 under tf100. User spend
  1,866,234 (grossed up from the nofee 1,847,796): vault nets
  the nofee 1,825,348 (withheld 18,438, vault lamports rise by
  the gross 1,843,786), protocol nets 8,402 (withheld 85),
  buyback nets 8,401 (withheld 85), uvata nets 5,420
  (withheld 55) while earned rises by the gross 5,475.
  Event: curve 1,824,983, lp 365, protocol gross 16,973,
  quote 1,825,348, uout 1,847,796 (the nofee spend),
  cashback gross 5,475, buyback NET 8,401.
- `b-buy-collect-noop-tf100`: buy, then collect is a SILENT
  NO-OP (0 events, payer 5,000 only, DEST 0, creator vault
  ATA 0). The fee does not feed the collect pipe: the 5,420
  sits in the accumulator ATA, not the vault ATA.
- `b-buy-sweep-collect-claim-tf100`: buy, sweep creator
  (vault ATA nets 122,160, withheld 1,234, event gross
  123,394; vault ATA lamports rise by the gross 123,394),
  collect (DEST nets 120,938, withheld 1,222, event gross
  122,160; vault ATA drains to 0 but keeps its 1,234
  stranded), claim (user nets 5,365, userquote withheld 55,
  event 5,420, claimed 5,420 vs earned 5,475 -- gap 55).
  DEST 120,938 + user 5,365 = 126,303 against the nofee
  pipe total 128,869: the missing 2,566 is exactly the
  stranded withheld (1,234 + 1,222 + 55 + 55 uvata).
- `b-buy-claim-sweep-collect-tf100`: buy, claim, sweep,
  collect -- the same finals as the previous case (DEST
  120,938, user +5,365, claimed 5,420, gap 55). Pipe order
  does not matter under the fee either.
- `b-buy-buy-claim-tf100`: two cashback buys, then one
  claim. The second buy spends 1,866,291 (curve moved:
  vault +1,825,403, withheld 18,439) with the same 8,402 /
  8,401 protocol and buyback nets but a 5,421 uvata net
  (gross leg 5,476); earned 5,475 -> 10,951, uvata 5,420 ->
  10,841 (withheld 110). The claim pays the full 10,841,
  user nets 10,732 (withheld 109), claimed 10,841 vs earned
  10,951 -- gap 110.
- `b-buy-fresh-chain-tf100`: cashback buy with a FRESH
  accumulator (volume + accumulator ATA created by the buy
  itself, payer -4,007,000 = fee 5,000 + accumulator rent
  1,844,400 + 182-byte accumulator ATA rent 2,157,600;
  accumulator ATA lamports 2,163,075 = rent + gross 5,475),
  then sweep 122,160, collect 120,938, claim 5,365 -- the
  same chain as the seeded case, with creation costs only
  on the first step. The claim leaves accumulator ATA
  lamports at 2,163,075 (unlike the nofee claim, which
  restores rent to 2,039,280: the Token-2022 account's
  lamports do not mirror its token balance).
- `b-buyexact-sweep-collect-claim-tf100`: cashback
  buy_exact 10^7 under tf100. Spend 9,998,786 -- LESS than
  the nofee 10,000,000: the exact quote-in is the gross
  budget, so every leg nets down (vault +9,779,732,
  withheld 98,786; protocol/buyback net 45,012 each,
  withheld 455; uvata nets 29,040, withheld 294, earned
  29,334). Out falls to 53,573,907,921 (nofee
  54,115,018,303). Event: curve 10,000,000, lp 1,956,
  protocol gross 90,934, quote 9,779,732, uout 9,777,776,
  cashback gross 29,334, buyback NET 45,012. Then sweep
  122,160, collect 120,938, claim pays 29,040, user nets
  28,749 (withheld 291), claimed 29,040 vs earned 29,334
  -- gap 294.

Family S -- tf100 sell chains (seeded accumulator):
- `s-sell-tf100`: cashback sell 10^9 under tf100. User nets
  178,409 of the gross 180,212 (withheld 1,803); vault sends
  the gross -182,458 fee-blind (vault withheld stays 0);
  protocol nets 840 (withheld 9), buyback nets 840
  (withheld 9), uvata nets 542 (withheld 6), earned rises
  by the gross 548. Event: curve 182,495, lp 37,
  protocol gross 1,698, quote 182,458, uout 180,212
  (gross), cashback gross 548, buyback NET 840.
- `s-sell-collect-noop-tf100`: sell, then collect is a
  SILENT NO-OP (DEST 0, uvata 542 intact).
- `s-sell-sweep-collect-claim-tf100`: sell, sweep creator
  122,160, collect DEST 120,938, claim pays 542, user nets
  536 (userquote withheld 1,803 -> 1,809), claimed 542 vs
  earned 548 -- gap 6.
- `s-sell-claim-tf100`: sell, claim only: user nets 536,
  claimed 542 vs earned 548, gap 6.

Family F -- tf5000 buy chain (seeded accumulator):
- `f-buy-sweep-collect-claim-tf5000`: cashback buy 10^10
  under tf5000. Spend 3,673,144: vault nets 1,825,348
  (withheld 1,825,348 -- the vault leg grosses to exactly
  twice the net), protocol/buyback net 4,243 each
  (withheld 4,244 / 4,243), uvata nets 2,737 (withheld
  2,738), earned 5,475. Event buyback NET 4,243, the rest
  gross. Sweep creator nets 61,697 (withheld 61,697);
  collect DEST nets 30,848 (withheld 30,849); claim user
  nets 1,368 (withheld 1,369), claimed 2,737 vs earned
  5,475 -- gap 2,738, exactly half the gross accrual.

Family L -- limit gates under tf100 on a cashback pool:
- `l-buy-limit-gross-tf100`: buy limit exactly the gross
  spend 1,866,234 -> success with the anchor legs.
- `l-buy-limit-minus1-tf100`: limit 1,866,233 -> 6004
  ExceededSlippage, full rollback, 0 events.
- `l-buy-limit-nofee-tf100`: limit 1,847,796 (the nofee
  spend) -> 6004. A limit copied from a nofee anchor does
  not survive the fee: the buy limit is gross-spend-side.
- `l-sell-limit-net-tf100`: sell minquote exactly the net
  receipt 178,409 -> success with the anchor legs.
- `l-sell-limit-plus1-tf100`: minquote 178,410 -> 6004,
  full rollback, 0 events.
- `l-sell-limit-gross-tf100`: minquote 180,212 (the gross
  receipt) -> 6004. The sell limit is net-side.

## Result

- The fee withholds at every hop of the cashback pipes, and
  every hop's gap is additive and permanent: buy tf100 loses
  55 at accrual, 1,234 at sweep, 1,222 at collect, 55 at
  claim; the two pipes together deliver 126,303 of the
  nofee 128,869, and the 2,566 shortfall is exactly the
  stranded withheld (vault ATA 1,234 + DEST 1,222 +
  userquote 55 + uvata 55).
- Earned always rises by the GROSS creator leg (5,475 /
  29,334 / 548) while the accumulator ATA nets; claimed
  always equals the ATA balance paid out, so
  earned-minus-claimed equals the cumulative withheld and
  never closes -- at tf100 (55 / 110 / 294 / 6) and at
  tf5000 (2,738, half the gross).
- Events report gross everywhere except buyback_fee, which
  is net in both the buy and the sell events (8,401 / 4,243
  / 45,012 buy-side, 840 sell-side); the buy event's
  user_quote_in is the nofee spend (1,847,796) while the
  user actually pays the grossed-up 1,866,234 (tf100) or
  3,673,144 (tf5000).
- Buy_exact under tf is the one path where the user pays
  LESS than nofee: the exact quote-in is a gross budget, so
  the out falls (54,115,018,303 -> 53,573,907,921) instead
  of the spend rising.
- Pipe order does not matter under the fee: buy -> sweep ->
  collect -> claim and buy -> claim -> sweep -> collect end
  at the same DEST + user + claimed, and collect after a
  cashback buy/sell is a silent no-op with or without the
  fee, because the creator leg never enters the vault ATA.
- Limit sides under tf100 on a cashback pool: buy limit is
  gross-spend-side, sell limit is net-receipt-side; nofee
  anchors copied as limits fail both ways.
- The Token-2022 accumulator ATA's lamports do not mirror
  its token balance: the fresh buy funds it at rent + gross
  (2,163,075) and the claim leaves lamports unchanged, while
  the nofee SPL-token claim restores rent (2,039,280).

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
- The withheld-field offset depends on how the account was
  built: the liquidity harness `transferfee` override produces
  178-byte accounts with withheld at offset 170, while the
  packet's own `t22acct` helper produces 182-byte accounts
  with withheld at offset 174. verify.py reads each layout
  at its own offset; a reader that assumes one offset for
  both layouts will misread one side's withheld balance.
- The quote-mint transfer-fee extension is synthesized
  post-hoc (as in 3rd #5/#8); this pins handler transfer
  behavior, not a reachable mainnet state.
- The sell event's protocol_fee field (1,698) equals the gross
  protocol leg (849) plus the gross buyback leg (849), exactly
  as in the nofee event; it is not the sum of the net legs
  (840 + 840 = 1,680).
- The buy event's interior u64 slots past buyback_fee are not
  decoded here; the exact event is asserted by discriminator
  and length plus the named slots above.
