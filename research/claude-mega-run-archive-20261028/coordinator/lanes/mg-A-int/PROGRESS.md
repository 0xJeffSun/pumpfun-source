# mg-A-int PROGRESS (PumpSwap integrator)
Work dir: ~/amm100-run/lanes/mg-A-int/ ; composite: ~/amm100-run/lanes/mg-union/

## Findings so far (01:53)
- collect-C/src-step1 (all amm100 lane wins on old 656 base, math-r1-03 not -04) = 739 native/150 raw.
  vs 733 base (native 728/139): C-only 18 = 0x1c890 0x1ef90 0x1fed8 0x22e88 0x2fb38 0x32750 0x40100 0x40308
  0x44ab0(!) 0x452e0 0x59408 0x5a570 0x5b5b8 0x5c590 0x5dc20 0x6f3c8 0xb92c8 0xf2ed0 ; 733-only 7 = amm_hop
  closures 0x446a0 0x448a8 0x44cc8 0x44ed0 0x450d8, prepare_pool 0x58028, calculate_fee 0x74648.
  0x13458 select_and_apply only in wins/math-r1-04 (not in collect-C). 0x44ab0 apply_hop_fees is matched by collect-C.
- So union target native = 728 + 18 + 0x13458 + 0x73ef0 = 748 (if all compose).
- Runtime suite runner: REPO repro/pump_amm/account-context-recovery-20261027/replay_parallel.py (25 suites,
  17,462 cases; harness scripts/pump_amm_*_differential.py; needs python with solders+litesvm; env not found yet).

## Composition steps (native, measured vs 733n frontier; tools in ~/amm100-run/lanes/mg-A-int/tools)
Patches vs mg-base733/src: ~/amm100-run/lanes/mg-A-int/steps/sNN.patch (+ sNN-rows.json)
- s01 730/150: fees.rs select_and_apply (math-r1-04, line-neutral) +0x13458; native crate calculate_pre_fee_amount
  + amount_before_fee uses it (SplFee impl/trait/import blanked) +0xf2ed0, raw +11 (139->150).
- s02 737/150: update_buyback_config.rs (admin-r1-03 file, lib.rs forwarder) +0x1c890; collect-C boost.rs
  (harvest -> utils::transfer_fee::harvest_to_mint) +0x1ef90 +0x1fed8; coin_creator/collect_coin_creator_fee.rs
  (lib.rs line 30 use-alias, collect.rs removed) +0x22e88; collect-C deposit.rs/withdraw.rs + lib.rs
  `pub use instructions::{boost, liquidity, ...}` +0x2fb38 +0x32750; multi_hop apply_hop_fees map(gate_fees) +0x44ab0.
- s03 743/150: collect-C incentives.rs, token_incentives/{mod,claim}.rs, state/volume_accumulator.rs,
  instructions/sweep_fees.rs (733 sweep.rs + cashback.rs removed), lib.rs lines 15/16/28 + 4 handlers from collect-C
  (claim_token_incentives, close, sync, claim_cashback) +0x59408 +0x5a570 +0x5b5b8 +0x5c590 +0x5dc20 +0x6f3c8.
- s04 744/150: supported_mint_data moved to native crate (Codex native-scanners) +0x73ef0.
- Published frozen base: ~/amm100-run/lanes/mg-union/u744/src, frontier shared/frontier/matched-union-744n.json.
- Build diag: 3x "overwrites values in the frame" (admin_update_token_incentives) = same as 733 base; no new.
- NOT ported (layout conflict, see findings): multi_hop C-layout windows 0x40100 0x40308 0x452e0 0xb92c8.

## 02:3x status
- Linux recipe: tools/lbuild.sh (podman, pinned image, recorded mounts; touch staged files!). Reproduced 733 parent
  exactly (fe66adb9/f7c4850c). u744 Linux = 749/159. u750 Linux = 755/159 (cc9586e3 / 2b869a02), repeat identical.
- Runtime: lin/venv (offline, solders 0.27.1 from uv cache) + wt/research/claude-amm-union-20261028/runtime/replay_parallel.py.
  u744 FAILED incentives_claim 254/255 (orig panics end_time<start_time; lane updater skipped end_day()) -> fixed
  (end_day() first). u750: 25 suites, 17,462 cases, 35,074 tx, 0 mismatches.
- s05 = u744 + fix + mg-A-4-03 + mg-A-6-02 + mg-A-7-02 -> native 750/150. Frozen: mg-union/u750/src,
  frontier shared/frontier/matched-union-750n.json.
- PR #426 (branch claude/amm-union-20261028, worktree ~/amm100-run/lanes/mg-A-int/wt): packet
  research/claude-amm-union-20261028 (verify.py stdlib PASS with HOME=empty -I -B). Packet builder tools/mkpacket.py.
- Next: compose new mg-A-* wins (shared/wins/mg-A-*.patch made on u744/u750), new BASE per composite, PR update
  every ~+5; then whole-ELF layout (shared/tools/nbuild-layout.sh, relayout.py; needs Linux toolchain for final).
- 02:35 s06 = u750 + mg-A-6-03 (+0x50598; trade_v2.rs/global_config.rs/trade.rs from lane) -> native 751/150, Linux
  756/159 (u751: mg-union/u751/src; lin/out-u751 c1df40c2). Runtime replay running (lin/rt/u751).
- tools/compose.py PATCH: 3-way merges a lane patch (base read from its header: u744 or u750) into mg-union/src.
- Open admissibility note: mg-A-4-03 joins the amm_hop tail onto 46 long lines (formatting-only device; listed in PR #426).
- Near-miss scan (same-size cand fn) for the 30 unmatched: none (all structural); lanes own all 30.
- 02:32 BASE union-751 published (Linux 756/159, runtime 25 suites/17,462 cases/0 mismatches; frontier matched-union-751n.json).
- mkpacket.py now parametric: --packet --union uNNN --a lin/out-uNNN --b lin/out-uNNNb --rt lin/rt/uNNN --composition pk/....json
  (deterministic: regenerating #426's packet gives identical bytes). Next PR: update branch claude/amm-union-20261028
  if #426 still open, else new branch from main.
- 02:45 s07 = u751 + mg-A-5-01 (+0x49b50, sell.rs + lib.rs from lane) + FIX cashback ATA `create` (lane used
  create_idempotent; legacy_sell 12 cases differed in inner CPI) -> native 752/150, Linux 757/159 (u752; a4a8b161),
  runtime 25/17,462/0 mismatches. Lesson: every lane win needs the runtime replay (2 of 7 lane wins changed behavior).
- 02:50 s08 = u752 + mg-A-3-01 (+0x376b0; buy.rs taken, lib.rs 3-way merged) + mg-A-5-01 02:48 update (cb_v11 cashback)
  -> both cashback ATA creations forced to associated_token::create (runtime: original issues Create). native 753/150,
  Linux 758/159 (u753; 20a11c04), runtime 25/17,462/0. INCIDENT 02:46: old compose.py applied mg-A-3-01 (absolute +++ paths)
  IN PLACE and BSD patch reversed mg-A-3's buy.rs/lib.rs; restored 02:47 byte-exact; compose.py rewritten (patch -o in tmp).
- 03:00 Whole-ELF prep finding: .text order = DefIndex/declaration order (see findings). Plan when normalized ~785:
  alphabetical `pub mod` in instructions/mod.rs, lib.rs mod order curve/instructions/state/utils, admin handler
  bodies into instructions/admin/<name>.rs external fns; then rodata/cst pool order (layout-r1 notes).
- PR #426 MERGED 02:32 (origin/main has research/claude-amm-union-20261028 = u750). Next PR = new branch
  claude/amm-union2-20261028 + packet research/claude-amm-union2-20261028 with parent = the u750 packet
  (verify.py v2 at mg-A-int/pk/v2/verify.py reads parent from measurement.json; mkpacket --parent/--parent-symbols).
- 03:05 s09 = u753 + mg-A-res1-01 (+0x23e40 migrate_pool_coin_creator in instructions/coin_creator/, external fn)
  -> native 754/150, Linux 759/159 (u754; 1eb1ce05), runtime 25/17,462/0. Tools lanever.py/compose.py handle a/ b/ headers.
- 03:12 order experiment (exp-order): alphabetical mod order = LIS 407->487, no normalized/raw change (not a scorer
  win; hold for the whole-ELF phase to avoid lib.rs merge churn for lanes).
- union2 packet built+verified in wt (branch claude/amm-union2-20261028, not pushed yet): waiting ~15 min for a 5th win.
- 03:19 PR #430 (branch claude/amm-union2-20261028): packet research/claude-amm-union2-20261028 = u754 (Linux 759/159),
  parent = merged #426 packet. Next PR: new branch from origin/main once #430 merges (packet union3, parent union2).
- 03:3x s10 = u754 + mg-A-sp2-01 (+0x16128; creator_reassignment.rs + lib.rs 3-way merged) -> native 755/150,
  Linux 760/159 (u755; dd1d823b), runtime 25/17,462/0. create vs create_idempotent resolved (normalized-identical
  anchor_spl fns; runtime decides: Create) -> findings.
- 03:4x s11 = u755 + mg-A-7-03 (+0xf31d8, raw too) -> native 756/151, Linux 761/160 (u756; fda362ef), runtime 25/17,462/0.
- 03:5x s12 = u756 + mg-A-sp4-01 (+0x26da8 +0x28dd0; transfer_creator.rs removed -> coin_creator/transfer_creator_fees_to_pump.rs)
  -> native 758/151, Linux source-only 763/160 (u758; 5a032d6d), runtime OK.
- Coordinator rule 4b (03:47): layout layer admissible, separately labeled. Tools copied from mg-A-raw into tools/raw
  (lbuild-raw.sh uses my linraw/ dirs). Procedure: lbuild-raw.sh SRC OUT-p1 (== source-only bytes) -> lay.py p1/symbols.so
  p1/link/link.map --ld ordered.ld --mode order -> lbuild-raw.sh SRC OUT-lay ordered.ld. u758+layout = 763/172 (+12 raw),
  runtime 25/17,462/0. Source-only stays the lane base; packets report both counts.
- 03:51 PR #434 (branch claude/amm-union3-20261028): packet research/claude-amm-union3-20261028 = u758 source-only
  Linux 763/160 + layout layer 763/172 (ordered.ld generated from original layout; verify.py v3 regenerates it).
  #430 merged 03:40. Packet builder: mkpacket.py --lay-* options; verify v3 at pk/v3/verify.py; packet lay.py at pk/lay.py.
- 04:0x s13 = u758 + mg-A-sp1-01 (+0x56710; base u753 from its JSON, compose.py PATCH@BASE) + mg-A-res1-02 (+0x24fd8; mod.rs/lib.rs:26 conflicts resolved by hand) -> native 760/151, Linux 765/160 (u760; bdf008b1), runtime OK.
