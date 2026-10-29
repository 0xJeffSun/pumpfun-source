# AMM track_volume is event-only; no trade path writes current_sol_volume

## Problem

Legacy buy takes a `track_volume` argument (`buy` /
`buy_exact_quote_in`, `OptionBool`), and every trade path
carries a `user_volume_accumulator` account whose
`current_sol_volume` field feeds the token-incentive claim
math (2nd #4 pinned claim rewards from externally seeded
volume). What was never pinned is whether the flag does
anything at all, and whether any trade path ever moves the
field it supposedly tracks. 2nd #47 noted in passing that
one cashback buy with track=1 left sol untouched; this
packet turns that aside into the full seat: legacy buy /
buy_exact, legacy sell (plain and cashback), trade_v2 buy /
sell / buy_exact, and 1-hop multi_hop buy / sell, each on a
fresh accumulator, on a fully pre-seeded accumulator, and
(where the path has a user field) on an accumulator whose
stored user is a stranger.

## Cases

26 cases x 3 images (original / #424 control / #427
candidate) = 78 signed receipts. The pre-seed is the same
137-byte accumulator everywhere: discriminator + user +
needs_claim=1, total_unclaimed=111, total_claimed=222,
current_sol_volume=333444, last_update_timestamp=999,
has_total_claimed_tokens=1, cashback_earned=555,
total_cashback_claimed=666 (offsets: user 8..40, needs 40,
unclaimed 41..49, claimed 49..57, sol 57..65, last 65..73,
has 73, earned 74..82, cb_claimed 82..90), funded with
10^9 lamports so `init_if_needed` is a no-op and the
payer pays only the 5,000 fee.

| Family | Cases | Result |
| --- | --- | --- |
| A legacy buy fresh | buy track 0 / 1, buy_exact track 0 / 1 (10^10 / 10^7) | Token deltas, payer (1,849,400), fresh accumulator bytes, and event fields byte-identical except event byte 360 (track_volume) |
| B legacy buy seeded | buy track 0 / 1, buy_exact track 1 on the payer-seeded accumulator | Accumulator bytes byte-identical before/after; payer 5,000 |
| C user-field overwrite | legacy buy / buy_exact, v2 buy / sell / buy_exact, 1-hop multi-hop buy on an OUTSIDER-user accumulator | Legacy buy overwrites the user field to the signer, all else identical; v2 and multi-hop leave OUTSIDER in place, all else identical |
| D v2 seeded | buy_v2 / sell_v2 / buy_exact_v2 on the payer-seeded accumulator | Accumulator bytes byte-identical; payer 5,000; event track byte 0 |
| E v2 fresh | buy_v2 / sell_v2 / buy_exact_v2 | Fresh accumulator (disc + signer + zeros, 1,844,400 lamports); payer 1,849,400; event track byte 0 |
| F legacy sell seeded | sell 10^9 plain; sell 10^9 on a cashback pool | Plain sell: accumulator byte-identical (sell has no volume account). Cashback sell: cashback_earned 555 -> 1103 (+548 creator fee), sol still 333444, all else identical |
| G track byte edges | buy track=2, buy track byte absent, buy_exact track=2 | Byte 2 -> 102 InstructionDidNotDeserialize, 0 events, full rollback, accumulator never created, payer 5,000. Absent byte -> success with track_volume=false in the event |
| H multi-hop | 1-hop buy fresh; 1-hop sell seeded | Buy: fresh accumulator, payer 1,849,400. Sell: accumulator byte-identical, payer 5,000 |

Measured anchors (all 3 images agree):

- Legacy buy 10^10: user base +10^10, user quote
  -1,847,796, vault base -10^10, vault quote +1,825,348,
  protocol ATA +8,487, creator ATA +5,475, buyback
  +8,486. Event (497 bytes): curve 1,824,983, lp 365
  (2 bps), protocol 16,973 (93 bps), quote-with-lp
  1,825,348, user-quote-in 1,847,796, creator 5,475
  (30 bps), buyback 8,486 (5,000 bps).
- Legacy buy_exact 10^7: user base +54,115,018,303,
  user quote -10,000,000, vault base -54,115,018,303,
  vault quote +9,878,518, protocol +45,926, creator
  +29,630, buyback +45,926. Event (512 bytes): gross
  quote 10,000,000 @64, net curve 9,876,542 @112.
- Legacy sell 10^9: user base -10^9, user quote
  +180,212, vault base +10^9, vault quote -182,458,
  protocol +849, creator +548, buyback +849. Event
  (449 bytes): curve 182,495, lp 37, protocol 1,698
  (gross, per 2nd #44), quote-with-lp 182,458, receipt
  180,212.
- v2 buy 10^6 (default fixture tier lp 2 / protocol 93 /
  creator 30, buyback 5,000): user base +10^6, user quote
  -187, vault base -10^6, vault quote +186, buyback +1.
  Vault leg = quote-with-lp 184 + net protocol 1 +
  creator 1; buyback is paid separately by the user.
  Pool accrual: protocol +1, creator +1, virtual quote
  -2 (fixture pool before: protocol 2,488, creator
  123,394, virtual -125,882).
- v2 sell 10^6: user base -10^6, user quote +178,
  vault base +10^6, vault quote -179, buyback +1. Pool
  accrual identical to v2 buy (+1 / +1 / -2).
- v2 buy_exact 10^4: user base +54,110,917, user quote
  -10,000, vault base -54,110,917, vault quote +9,954,
  buyback +46. Pool accrual: protocol +46, creator +30,
  virtual -76.
- 1-hop multi-hop buy 10^9: user base
  +5,368,809,031,467, user quote -10^9, vault base
  -5,368,809,031,467, vault quote +995,407,407,
  buyback +4,592,593. Event (508 bytes): out
  5,368,809,031,467, gross quote 10^9 @64, lp 197,531,
  protocol 9,185,186, quote-with-lp 987,851,851,
  user-quote-in 987,654,320, track byte 0.
- 1-hop multi-hop sell 10^9: user receipt +180,212
  and buyback +849 as in legacy sell, but the vault
  leg is -181,061 (= 180,212 + 849), not legacy
  sell's -182,458: protocol (849) and creator (548)
  accrue to pool state in the multi-hop path instead
  of leaving the vault. The multi-hop receipt watches
  no protocol/creator ATA, so those two legs are
  pinned only via this exact vault-leg arithmetic,
  not via ATA deltas.

## Result

- **track_volume is event-only.** Legacy buy with
  track=0 and track=1 produces byte-identical token
  deltas, payer cost, accumulator bytes, and event
  fields except event byte 360. With a pre-seeded
  accumulator, both values leave all 90 accumulator
  bytes untouched -- including current_sol_volume,
  which stays 333444 after a 10^10 buy that spent
  1,847,796.
- **No trade path writes current_sol_volume.**
  Legacy buy / buy_exact (track 0 and 1), legacy sell
  (plain: no volume account in the instruction at
  all), v2 buy / sell / buy_exact (event track
  hardcoded false), and 1-hop multi-hop buy / sell
  all leave a pre-seeded sol value exactly in place.
  The only accumulator field any trade path moves is
  `user` (see below) plus cashback_earned on the
  cashback sell path. Consequence, stated as a
  LiteSVM observation, not an on-chain claim: in
  this program, volume that a later
  claim_token_incentives could pay out on can only
  arrive by external seeding, never by trading --
  which is why 2nd #4's claim math had to be fed a
  seeded accumulator, and why sync's "No changes in
  accumulator" no-op (a known negative, not
  re-probed here) has no trade-side writer to
  explain it away.
- **User-field write rule diverges by path.**
  Legacy buy overwrites `user` unconditionally
  (buy.rs:339): an OUTSIDER-stored user becomes the
  signer. trade_v2 (trade_v2.rs:404-405) and
  multi_hop_swap (multi_hop_swap.rs:446-447) write
  it only when it is still the default pubkey, so
  an OUTSIDER-stored user survives a v2 or
  multi-hop trade untouched. The PDA seed still
  binds the account to the signer; only the stored
  field differs.
- **Rent is charged regardless of the flag.**
  A fresh accumulator costs 1,844,400 lamports
  (payer 1,849,400 with the fee) on a legacy buy
  with track=0 exactly as with track=1:
  `init_if_needed` does not consult the flag. A
  pre-seeded accumulator costs only the 5,000 fee
  on every path.
- **The track byte is an OptionBool.** Byte 2 (or
  any non-0/1 byte) fails deserialization with 102
  before any account work -- the accumulator is
  never created, 0 events, full rollback. A missing
  track byte deserializes as None and succeeds
  with track_volume=false in the event.
- **Cashback sell moves earned, not volume.**
  On a cashback pool, legacy sell diverts the 548
  creator fee to the accumulator ATA and adds it
  to cashback_earned (555 -> 1103) while sol stays
  333444 -- the same split 2nd #47 pinned for
  cashback buy (earned += gross creator fee, sol
  untouched), now shown for sell.

## Limits

- Offline LiteSVM synthetic fixtures only; no
  source change, no build, no whole-program
  equivalence claim. Numbers are exact for these
  fixture states (legacy fee tier lp 2 / protocol
  93 / creator 30 bps, buyback 5,000 bps; v2
  default fixture tier; pool fixture protocol
  2,488 / creator 123,394 / virtual -125,882),
  not claims about other pool states.
- The multi-hop sell protocol/creator legs are
  pinned via vault-leg arithmetic only (see above);
  the multi-hop receipts do not watch those ATAs.
- The claim-side consequence (nothing claimable
  accrues from trading) is an inference from the
  measured non-writes, not a separately executed
  buy-then-claim sequence in one VM.
- Error 102 has no "thrown in" site line (it fails
  at deserialization); verify.py checks the code
  and fragment, not a site.
