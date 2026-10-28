# Consolidated ledger — pumpfun-source, 28 Oct 2026 ~01:35 PDT

Collected from the Claude session transcripts for this project, their workflow lanes and sub-agents, the durable
work folders, and `origin/main` (fetched 01:08 PDT). No agents were launched from the session that wrote this.
All times are PDT. "Normalized" = function windows equal after masking call immediates and section pointers.

## 1. Where each contract stands

| Contract | Selected on main (Codex) | Best research on main | Best result on disk, not in any PR | Unmatched in every artifact |
| --- | --- | --- | --- | --- |
| Fees | 585/585, whole meaningful ELF byte-identical (#392) | same | — | 0 (complete) |
| Mayhem (441) | `repro/mayhem/initializer-current-20261027` (older checkpoint; status.json records no window count) | Codex qualified437: 437 / 141 raw (adds O0076 SweepFees); Claude 437 (#417, adds O0079) | `parent-438` (adds O0077) | 2: O0083 BuyV2 (18,648 B), O0084 SellV2 (18,096 B) |
| Pump main (1035) | Round46: 823 / 203 raw | L12 layout composite 907 / 165 raw (#401) + round-5 deliveries (#416) | r5-z04-02, r5-z07-03 (newer than #416) | 69 |
| PumpSwap (785) | native-scanners: 660 / 159 raw | fee-value chain 733 / 148 raw (#408) | collect-C composite 739 native (~744 Linux), 150 raw | 33 |

Notes on the union:
- **Mayhem:** Codex's 437 and Claude's 437 close different windows (O0076 vs O0079), and `parent-438` adds O0077.
  If all three combine, the total is 439/441. They have not been composed.
- **Pump:** L12 plus the newest delivery of every round-5 lane gains 56 windows (each delivery has no losses on its
  own; they have not been composed). Round46 additionally matches 0x43ea0, 0x502f0 and 0x68bd8. That leaves 69
  windows matched nowhere (list: `state/pump-remaining.json`).
- **PumpSwap:** the 733 chain has 52 unmatched windows. The amm100 lane wins (made on the older 656 base) close 18
  of them and Codex's 660 closes 0x73ef0, which leaves 33 matched nowhere (list: `state/amm-remaining.json`).
  collect-C (all amm100 wins on the 656 base) is +18/−7 against the 733 chain, so neither contains the other.

## 2. Results that exist only on disk (not in any PR)

| Item | Where | State |
| --- | --- | --- |
| Mayhem `parent-438` (O0077 closed) | `claude-mayhem-work/mayhem-env/parent-438`; lane `r436/o0077-ir-r1/BEST` | 438/441, no losses vs 437; incremental build only, clean rebuild and runtime run not done |
| Mayhem lane partials | `r436/o0076-port-r1/BEST`, `r436/o0079-ir-r1/BEST`, `r436/o0083-ir-r1/BEST`; O0083/O0084 lane dirs | partial trees with notes; O0076 was closed separately by Codex |
| Pump r5-z04-02 (909, +2) and r5-z07-03 (918, +11) | `claude-pump-work/deliveries/` | newer than the #416 packet, which holds z04-01 and z07-02 |
| Pump composite `integ-layout-r37-13` | — | never built; the r5 workflow stopped before its integrator ran |
| PumpSwap amm100 wins (44 files, 14 lanes) | `~/amm100-run/shared/wins/` | measured natively on the 656 base; no Linux build, no runtime run |
| PumpSwap collect-C step 1 | `~/amm100-run/lanes/collect-C/` (`out/cand.so` 00:59 build; tree in `src-step1/`) | 739 native / 150 raw, 0 losses vs 651; source edited again at 01:01 (step 2 unfinished) |
| PumpSwap collect-A / collect-B | `~/amm100-run/lanes/collect-{A,B}/` | partial compositions on main659 (709 and 682 native), unfinished |
| PumpSwap 733 base, extracted | `~/amm100-run/lanes/mg-base733/` | builds natively at 728 / 139 raw; frontier `shared/frontier/matched-733n.json` |

## 3. Sessions in this project (newest first)

| Session | Title / goal | Ended | Outcome |
| --- | --- | --- | --- |
| 38f6d223 | Mega workflow (this ledger) | — | collection done; fleet launch stopped by a safety classifier, no agents started |
| 1507f021 | "finish the mayhem contract" | 01:02, stopped | r436 workflow; #404 (436), #417 (437); O0077 closed but not banked |
| d40bd6b9 | "finish the main pump contract" | 01:02, stopped | r5 workflow on L12; #416 (12 lane deliveries, +53 windows then); composite not built |
| 7ffdcf6a | "finish the pumpswap contract" | 00:55, stopped | amm100 workflow (16 lanes) + collect workflow (3 integrators); no PR |
| 5c3859ee | Branch review and cleanup | 00:58, interrupted | ~45 branches deleted; archives #410, #414, #415 |
| 7aba7fbf | In-flight work report | 23:21 Oct 27 | report artifact claude.ai/artifact/TLXmBhn5LrmabcggB9U991 |
| bf960843 | Parallel subagents, all contracts | 22:58 Oct 27 | hit the session limit; lanes later taken over by the per-contract sessions |
| e9a70435 | Pump fees completion | 22:58 Oct 27 | Fees complete (#392); archive #400; all Fees PRs merged |
| bfdcc76c | Main pump completion | 22:57 Oct 27 | Round37 composites (#396, #401, #402, #403) |
| d810a7ff | Pump swap AMM completion | 22:32 Oct 27 | amm2 lanes (c726 chain); merged 29 queued PRs |
| da0556fe | Parallel subagents, all contracts | 22:01 Oct 27 | Mayhem/Fees PR review; Mayhem 433 (#390) |
| bbe1e9ca | Parallel subagents, 100% completion | 07:25 Oct 27 | findings packet #263, compiler sweep, Mayhem error-enum fix |
| ae15be56 | Recent conversations review and consolidation | 17:19 Oct 26 | ended with an Opus safeguards flag ("[cyber]") |
| ab7c4152 | Review and merge all PRs | 17:01 Oct 26 | PR queue merged |
| 97bae1bb | "finish everything", parallel agents | 17:01 Oct 26 | 15-lane workflow (sparse worktrees, build lock) |
| 1dc54165 | Project consolidation and cleanup | 17:01 Oct 26 | consolidation PR #61 |
| 5536bcf9, 35efdafb | Initial reconstruction review | Oct 24–26 | first status reports and build recipes |

Three other transcripts in this folder (c81d12cc, 6f1304cc, 07a4ba01) belong to unrelated projects.

## 4. Workflows and their lanes (all stopped at ~01:02)

Per-agent last messages: `state/workflow-agents.json` (extractor: `state/extract_agents.py`).

- **Mayhem r436, `wf_be477d90-0fc` (session 1507f021), 16 agents.** One banking agent (#404) plus three
  strategies (ir / brute / port) for each of five windows. O0079 closed (brute-r1, #417) and O0077 closed (ir-r1,
  unbanked). O0076 reached a close-but-unequal partial (8,392 B, 8 masked slots) before Codex closed it. O0083 and
  O0084 have partials only. The lanes' findings are in `claude-mayhem-work/r436/FINDINGS.md`.
- **Pump round 5, `wf_8dcaac4b-74d` (session d40bd6b9), 20 agents.** Lanes coord, libinst and z00–z10, rounds 1–2.
  Newest deliveries: coord-03 915 (+8), libinst-06 916 (+9), z00-03 910 (+3, synthetic layout), z01-02 909 (+2),
  z02-02 912 (+5, synthetic layout), z03-07 914 (+7), z04-02 909 (+2), z05-04 918 (+11), z06-02 909 (+2),
  z07-03 918 (+11), z08-03 911 (+4), z09-01 911 (+4); z10 delivered nothing. Insights: `claude-pump-work/shared/INSIGHTS-R5.md`.
- **PumpSwap amm100, `wf_3f4f1b1b-55a` (session 7ffdcf6a), 16 lanes.** Best per lane, native vs 651:
  closures520 678 (+27), liquidity 668 (+17), sell 664 (+13), admin 663 (+12), incentives 660 (+9), math 659 (+8),
  poolstate 659 (+8), buy 658 (+7), tradev2 657 (+6), multihop 656 (+5), boost 655 (+4), utilmath 655 (+4),
  createpool 653 (+2), creatorfees 652 (+1). bigunknown and layout recorded no win. Findings: `~/amm100-run/shared/findings.md`.
- **PumpSwap collect, `wf_539a0163-241` (session 7ffdcf6a), 3 integrators.** compose-A, B and C, see section 2.

## 5. Pull requests

- Open: none (checked 01:10).
- Merged in the last day include: #417 Mayhem 437, #416 Pump round-5 deliveries, #418/#413/#412/#407/#406/#398/#393
  contributor Mayhem research, #415/#414/#410/#403 branch and lane archives, #408/#405/#388/#395/#409 the AMM
  research chain to 733, #404 Mayhem 436, #402/#401/#396 Pump composites, #400 fees100 archive, #397 Mayhem 434,
  #392/#394 Fees complete, #390 Mayhem 433, #389/#391 CI fixes.

## 6. Other agents on the repo

- Codex works inside the primary checkout's `work/` and in `~/.codex/worktrees/pr-queue-review/`. It publishes Pump
  rounds roughly every 20 minutes (Round46 at 00:45) and AMM/Mayhem checkpoints. At 01:09 it was compiling Mayhem
  in `work/mayhem-priority-20261027`.
- A bulk-merger (as lalalune) merges mergeable PRs within minutes. Contributor forks (AlleyBo55, startrack3r,
  hongikAn, Muzzy5150, adanamanya, SYMBaiEX) keep adding Mayhem and AMM research packets.

## 7. Durable work folders

- Mayhem: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work` (`r436/`, `mayhem-env/parent-43x`, `mayhem-b/build/`).
- Pump: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work` (`base/`, `deliveries/`, `lanes/`, `harness/`, `shared/`).
- PumpSwap: `/Users/shawwalters/amm100-run` (`lanes/`, `shared/wins`, `shared/frontier`, `shared/tools`).
- This ledger and the union lists: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run`.
