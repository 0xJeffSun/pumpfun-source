# Fleet B lane registry (coordinator: Claude session "Mega run fleet B"; lanes launched 03:23 PDT 2026-10-28)

Fleet B's own registry (fleet A owns LANES.md and BASES.md). Agent ids are for coordinator SendMessage relays.
All lanes start on Pump base L27 (986/1035) or AMM union-754 (Linux 759/785; native 754/150). Integration and PRs stay with
fleet A's integrators (mg-P-int, mg-A-int).

## Running (0; fleet B finished 03:54; launched 03:23)
| Lane | Contract | Windows | agent id |
| --- | --- | --- | --- |

## Finished
- mg-P-v3a (ended ~03:38; its own notes say 03:55, a wrong clock; agent a356b6e330425b064): 0 wins. Stopped early after a safety check halted one analysis step (not resumed). Best IR partials (unwired draft helpers): 0x83088 .642 (epc_d, 1080 vs 1088 B), 0x837a8 .740 (fit_b) / .676 equal length (fit_c); 0x83c00 and 0x857a8 untouched. Tree WP/lanes/mg-P-v3a/src (+exp/v1.rs); wiring relayed to mg-P-v3b at 03:38.
- mg-P-cto2 (pass 1 ~03:36, pass 2 ended 03:40; agent a9ca11e9a2e7db8e7): 0 wins on 0x22a10. Pass 2 was stopped twice by safety checks while it worked from the deployed-program listing; not resumed or reassigned (needs a user decision). Finding: the original calls create_idempotent too (CreateIdempotent ix; the "create 2/0" count was a naming artifact), so no behavior fix. Best partial = clean L27 (ratio .0870); src_v1 rewrite .0763. Tools sumcmp.py/ctargets.py in WP/lanes/mg-P-cto2/tools.
- mg-P-cash (ended 03:45; agent a7bee8073c5e9d9c8): **+0x76a28 claim_cashback** (normalized equal; raw differs only by whole-program layout). Deliveries WP/deliveries/mg-P-cash-01 (L27, 987) and -02 (L29, 989); composed into L30. Fixes: &mut account local before Clock::get, cashback_earned local before let event. Next idea (fleet A window 0x77940, lane mg-P-z07b) relayed via EVENTS NOTE 03:45.
- mg-P-big (ended 03:45; agent a402246436c405e9c): 0 wins. 0x144508 sell_v2 rewritten in the original call order: .128 -> .4285 (13624 vs 13976 B; ~.70 frame-masked, ~.85 also reg-masked), clean, 986/166, no losses; tree WP/lanes/mg-P-big/v/s1 (gen/sell_v1.tpl + gen/place.py). 0x13f630 not started. Stopped after a safety check halted a binary-decoding step; not resumed (user decision).
- mg-P-v3b (ended 03:48; agent aa207cbfc0361f1dc): 0 wins; stopped after a safety check halted an analysis step (not resumed). Best tree best-h2 (gen/gen.py): 986/166 net 0 (+0x857a8, -0x163bf0 serializer inlined; needs a cold emit block so its inline threshold drops 250 -> 45). Ratios 0x1489f8 .313, 0x859b0 .335, 0x83c00 .440, 0x147ba0 .645, 0x837a8 .615, 0x83088 .457. (mg-P-int 03:53: the 0x80df8 gross-up formulas are provably equal, so no behavior difference.) Concrete next step (IR-only, our own build): make the post-complete emit block cold; check with clang -O3 inline remarks.
- mg-P-mig (ended 03:49; agent af0c12c34951c55be): no delivery; stopped after a safety check halted a step (not resumed). 0x49888: BEST-V1 986/167 (+raw 0x4d240 side effect, 0 losses), window .085 -> .758; IR-only v/V3 (pay_migration_fee helper taking &a.pool_authority) .947, not built. 0x3e550 not started. Next: build v/V3 (tools/bld.sh), then tools/mx.py variants.
- mg-A-sp4 (ended 03:54; agent ac34d94a9729af885): **+0x26da8 +0x28dd0** (wins/mg-A-sp4-01.patch/.json, native 756/150, in union-758). 0x2e720 extend_account partial: masked diff 436 -> 6 (623 vs 617 insns), 756/150 no losses, lanes/mg-A-sp4/best-partial-src (+best-partial.patch, includes win 01). Stopped after a safety check halted a step (not resumed). Next: build the second error name string in place instead of copying a temporary (IR shows a full match).

## Queue (fleet B)
- Whatever LANES.md "Queue" still lists that fleet A has not started (checked at launch: both items are already fleet B lanes,
  mg-A-sp4 and mg-P-mig/mg-P-cash).
- Second passes on fleet-B lanes whose PROGRESS.md ends with a concrete, untried next step.
- 03:54: queue empty. The concrete next steps (0x2e720, 0x857a8 via best-h2, 0x49888 v/V3) belong to lanes that stopped after
  safety checks; they are held for a user decision rather than resumed or reassigned.
