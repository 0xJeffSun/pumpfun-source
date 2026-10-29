# user_volume_accumulator close lifecycle chains

## Problem

2nd #10 pinned `init_user_volume_accumulator` and
`close_user_volume_accumulator` in isolation (rent, rewrite rules,
length gates, close returns the full balance) and 2nd #4 pinned
`claim_token_incentives` math in isolation, but no packet ever
chained them: what happens to a seeded accumulator's unclaimed
tokens when it is closed, what a claim, a sync, a second close, or
a cashback claim sees after the account is gone, whether re-init
restores anything, and what the close event reports after a claim
or a sync reset. This packet answers that with multi-step chains,
one signed transaction per step, on three program images
(original, #424 control, #427 candidate).

## Fixture

Per case, fresh VM per image: global volume accumulator (start 20,
end 49, period 1, supplies 1000x30, volumes 100x30), incentive mint,
vault 10^9 tokens, user ATA 17 tokens, seeded user accumulator
(needs_claim 1, total_unclaimed 500, total_claimed 700,
current_sol_volume 20, last_update_timestamp 10,
has_total_claimed_tokens 1, cashback_earned 55,
total_cashback_claimed 13, 10^9 lamports). The reward case seeds
last_update_timestamp 20 instead of 10. Fee payer is the user
(OUTSIDER) unless a step says otherwise. Payer deltas are measured
per step against that step's before snapshot; absolute lamport
balances are not asserted because the harness VM accumulates
airdrops across setups in one process.

Event layouts (all verified byte-for-byte):
- CloseUserVolumeAccumulatorEvent, 80 bytes, disc
  `929fbdac925838f4` (= sha256("event:CloseUserVolumeAccumulatorEvent")[:8]):
  user @8..40, timestamp @40..48, total_unclaimed @48..56,
  total_claimed @56..64, current_sol_volume @64..72,
  last_update_timestamp @72..80.
- InitUserVolumeAccumulatorEvent, 80 bytes, disc
  `86240d48e86582d8`: payer @8..40, user @40..72, timestamp @72..80.
- SyncUserVolumeAccumulatorEvent, 64 bytes, disc
  `c57aa77c74515bff`: user @8..40, before @40..48, after @48..56,
  timestamp @56..64.
- ClaimTokenIncentivesEvent, 104 bytes, disc `4facf631cd5bcee8`:
  user @8..40, mint @40..72, amount @72..80, timestamp @80..88,
  total_claimed @88..96, current_sol_volume @96..104.

## Cases (16 cases, 34 steps per image, 102 receipts)

Family C — close chains:
- `c-close-seeded`: close the seeded account. Account removed,
  payer +999,995,000 (full 10^9 minus the 5,000 fee), one close
  event (unc 500, claimed 700, volume 20, last 10).
- `c-close-then-claim`: close, then claim_token_incentives ->
  3012 AccountNotInitialized (caused by account:
  user_volume_accumulator), full rollback, payer -5,000. The 500
  unclaimed tokens are NOT paid out by the close; they exist only
  in the close event.
- `c-close-then-sync`: close, then sync -> 3012, same rollback.
- `c-close-then-close`: close, then close again -> 3012.
- `c-close-then-cashback`: close, then claim_cashback -> 3012
  (the accumulator check fires before any token-account check).
- `c-close-then-init`: close, then init. Fresh 137-byte account,
  rent 1,844,400, payer -1,849,400, every field zeroed: the 700
  claimed and 55 cashback_earned history is gone, not preserved.
- `c-close-init-claim10`: close, init, claim at now=10. The claim
  succeeds with 0 events ("No tokens to claim") and leaves the
  fresh account untouched (last stays 0).
- `c-close-init-claim21`: close, init, claim at now=21. Still 0
  events and no payout, but last_update_timestamp stamps 0 -> 21:
  the timestamp<=end_time block runs even for a zero claim.
- `c-close-init-by-payer`: close, then init with payer = PAYER.
  PAYER -1,849,400, USER 0, and the Init event records payer
  PAYER, user USER: init's payer need not be the user.
- `c-close-by-other`: close by another signer (PAYER) against
  USER's accumulator -> 2006 ConstraintSeeds (caused by account:
  user_volume_accumulator), rollback, PAYER -5,000. Close binds to
  the PDA seeds, not the stored user field.
- `c-close-unsigned`: close with the user meta unsigned, fee paid
  by PAYER -> 3010 AccountNotSigner (caused by account: user),
  rollback, PAYER -5,000.

Family R — claim/sync interplay with close:
- `r-claim-then-close`: claim at now=10, then close. The claim
  first RESETS claimed 700 -> 0 (now < start and last < start)
  and then pays the 500 unclaimed (vault 999,999,500, user ATA
  517, claimed 500, volume still 20, needs still 1). The close
  event then reports unclaimed 0, claimed 500, volume 20, last 10.
- `r-reward-claim-then-close`: seed last 20, claim at now=21,
  then close. Reward 20*1000/100 = 200 accrues, 700 paid (vault
  999,999,300, user ATA 717, claimed 1400, volume 0, needs 0,
  last 21). The close event reports unclaimed 0, claimed 1400,
  volume 0, last 21.
- `r-sync-then-close`: sync at now=10, then close. Sync resets
  claimed 700 -> 0 (event before 700 after 0,
  has_total_claimed_tokens 1 -> 0) and the close event then
  reports claimed 0 with unclaimed 500 still in it: the reset
  does not pay anything out.
- `r-claim-close-claim`: claim, close, claim again -> the third
  step fails 3012, rollback, payer -5,000.
- `r-claim-close-init-claim`: claim, close, re-init, claim at
  now=21. The final claim pays nothing and only stamps last
  0 -> 21. The 500-token claim history is gone, not merely
  zeroed: the re-created account is a new account.

## Result

- Close is terminal for the account but not for the user: it
  returns the full lamport balance and reports the token totals
  in its event, but it never pays unclaimed tokens or cashback.
  Every downstream instruction that requires the accumulator
  (claim, sync, second close, cashback claim) fails 3012 after a
  close until a re-init creates a fresh account.
- Re-init is a full reset, not a restore: all nine serialized
  fields return to zero, including total_claimed and
  cashback_earned, and a later claim cannot recover the
  pre-close history.
- A zero claim is not a no-op on the timestamp: at now=21 a
  fresh account's last_update_timestamp still advances 0 -> 21,
  while at now=10 (before the incentive start) it does not move.
- Close's authorization is the PDA seeds: a different signer
  fails 2006 even though the stored user field is never
  re-checked on the success path (2nd #10), and an unsigned user
  fails 3010.
- The claim reset (now < start and last < start zeroes
  total_claimed) is visible in the close event: a claim at
  now=10 reports claimed 500, not 1200, and a sync at now=10
  reports claimed 0, because the reset runs before the payout
  in the claim path and standalone in the sync path.

## Limits

- Offline LiteSVM reproduction on synthetic fixtures only. No
  source change, no SBPF build, no whole-program equivalence
  claim. Numbers are exact for this fixture state (global
  accumulator start 20, end 49, period 1, supplies 1000, volumes
  100; seeded accumulator totals above), not claims about other
  pool or incentive states.
- Error sites are per-image: the original and rebuilt sources
  differ in line numbers, so `verify.py` checks each image's
  recorded site line against that image's own logs and never
  compares sites across images (2nd #36 lesson). The README
  cites error codes and caused-by accounts, not line numbers.
- The cashback-after-close case pins only the 3012 gate: the
  token accounts in that step are dummies because Anchor checks
  the accumulator before any token-account validation.
- Absolute fee-payer lamport balances are not asserted (the
  harness VM accumulates airdrops across setups in one process);
  every payer assertion in this packet is a per-step delta.
