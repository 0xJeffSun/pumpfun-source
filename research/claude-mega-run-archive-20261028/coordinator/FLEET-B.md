# Fleet B — second coordinator for the mega run (started ~03:25 PDT 2026-10-28)

Why: one Claude session can run at most 20 sub-agents at once and fleet A (the first coordinator, session 30698782) is at
that cap. Fleet B runs extra window lanes in parallel with its own 20-agent budget. Same project, same rules.

MR = /Users/shawwalters/Documents/Codex/2026-10-24/mega-run

## What fleet B does
1. Read MR/RULES.md, MR/MECHANISMS.md, MR/BASES.md, MR/LANES.md (fleet A's lanes; don't duplicate them) and this file.
2. Launch one background sub-agent per lane below (general-purpose). Use the same short prompt shape fleet A uses:
   the lane name, "read MR/RULES.md, MR/MECHANISMS.md, then MR/lanes/<lane>/TASK.md and follow them", work autonomously
   for several hours, save verified wins as TASK.md says + a WIN line in MR/EVENTS.log, keep MR/lanes/<lane>/PROGRESS.md
   current, never touch the primary checkout or commit/push, work from scorer/diff summaries instead of long instruction
   listings of the deployed program, never fabricate results, final message <= 12 lines.
3. Record each lane and its agent id in MR/LANES-B.md (fleet B's own registry; never edit LANES.md or BASES.md).
4. Watch MR/EVENTS.log for your lanes' lines. When a lane finishes, relaunch work from the queue below or, if a lane's
   PROGRESS.md names a concrete next step, resume it with SendMessage. New TASK.md files: ask fleet A (SendMessage to the
   "Mega run" coordinator session) or write them by adding a lane to MR/state/make_tasks.py and re-running it.
5. Integration stays with fleet A's integrators (mg-M-int, mg-P-int, mg-A-int): they compose every WIN line from both
   fleets and own all PRs. Fleet B never opens PRs or pushes.
6. Stop when every lane below has finished and the queue is empty; report wins and best partials per lane.

## Fleet B lanes (TASK.md files exist under MR/lanes/)
Mayhem reached 441/441 normalized at ~03:25 (fleet A's lanes handle its banking and whole-ELF layout), so fleet B is all Pump/AMM.

| Lane | Contract | Windows |
| --- | --- | --- |
| mg-P-v3a | Pump | 0x83088 0x857a8 0x837a8 0x83c00 (v3 helpers) |
| mg-P-v3b | Pump | 0x147ba0 0x1489f8 0x859b0 (v3 buy / buy_exact_quote handlers) |
| mg-P-big | Pump | 0x13f630 0x144508 (large handler bodies) |
| mg-P-cto2 | Pump | 0x22a10 admin_cto from-scratch rebuild (adds the original's 4 log lines) |
| mg-P-mig | Pump | 0x49888 migrate_v2::execute, 0x3e550 fee-recipient validator |
| mg-P-cash | Pump | 0x76a28 claim_cashback reconstruction |
| mg-A-sp4 | AMM | 0x26da8 0x28dd0 0x2e720 (creator-fee transfers, extend) |

## Queue for fleet B (after the lanes above finish)
- Whatever fleet A's LANES.md "Queue" section still lists and fleet A has not started (check LANES.md first).
- Second passes on fleet-B lanes whose PROGRESS.md ends with a concrete, untried next step.
