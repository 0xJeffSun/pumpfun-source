# mg-M-int PROGRESS (Mayhem integrator/banker)
Work dir: WM/mega/mg-M-int  (WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work)

## Status log
- 01:5x codex438 materialized: WM/mega/mg-M-int/roots/codex438 (= Codex packet 437 tar + overrides sell_pump_swap.rs);
  all 67 sha256 match composed-inputs.json; identical to packet source.tar.gz.
- codex438 differs from Claude parent-438 in: Cargo.toml (profile-rustflags anchor-lang remap), curve-accounts/idls/pump.json,
  curve-accounts/src/interface_definition.rs, lib.rs (ExtendAccountEvent moved), extend_account.rs, fee_recipients.rs (O0076),
  buy_pump_swap.rs + pump_amm_interface.rs (O0077, Claude only).
- codex438 buy_pump_swap.rs / pump_amm_interface.rs == parent-437 copies -> O0077 patch applies cleanly.
- roots/p439 = codex438 + o0077-ir-r1/BEST (2 files). Building codex438 (label mgMint-c438-a, target mg-M-int-c438).
- 01:5x WM wrapper build of codex438 FAILS (curve-accounts: unresolved historical_anchor_program; Codex passes that macro
  crate by hand via --extern; Cargo.toml profile-rustflags). So codex438/439 need the Codex root recipe.
- tools/crecipe.py = replica of packet builds/first/launch.json (root-only rustc vs qualified434 rlibs cloned into cache/,
  packet linker.py logic + ordered.ld; WM SDK == Codex SDK, 2354 files identical). codex438 replica = b69ee99d/a4e4768d EXACT.
  measure: 438, raw 141, unmatched O0077 O0083 O0084, edges 4573, Source 502.
- p439 (codex438 + O0077 2 files): e899e096 (765,856 B) / symbols 5d18b89a; vs c438: 439, gains [O0077], no_losses, raw 141,
  edges 4670, Source 505. Clean rebuild (fresh source copy + fresh cache clone) identical; shared tool build identical.
- 01:58 published WM/mayhem-env/parent-439 (read-only) + shared build tool WM/mayhem-env/tools/rbuild.py (+cache-q434, q438-first);
  baseline symbols WM/mayhem-b/out/builds/mgMint-p439-clean/symbols.so. BASE line + FINDINGS line written.
- vs Claude parent-438: +O0076, raw 100->141, Source 490->505, 2 profile changes O0112/O0270 = corrections toward original.
- 02:0x runtime: repo-ro = git archive origin/main b7b3a84e (scripts, evidence, research/{imported-lab,mayhem-sweep-failure-recovery,
  mayhem-initializer-validation,claude-fees-final-mayhem-o0073}, repro/behavioral-recovery, repro/mayhem/{19,20,21,22,24}, programs/mayhem);
  all 15 Codex-recorded repo inputs + drivers hash-equal. Controllers retargeted by tools/mkruntime.py (paths+expected hash only)
  -> runtime-ctl439/; run via tools/runall.sh into runtime439/ (control = codex438 b69ee99d).
- 02:1x RUNTIME 439 (e899e096, control codex438 b69ee99d, REPO test-env python): trades 14 families 6,636 cases / 13,272 signed tx,
  0 mismatches, 0 log diffs (recomputed with harness rule: 0); sweeps 692 (2,076 signed) + rates 150 (450) 0 mismatches,
  control logs == original; initializer 69 (53 rejections + 16 pump-cpi, 168 signed) 0 mismatches; target rates 856 cases,
  2,568 attested records, 0 mismatches, 0 candidate-vs-parent diffs. Summary: runtime439/summary.json (tools/rtsum.py).
- next: packet research/claude-mayhem-439-20261028 in worktree WM/mega/mg-M-int/wt (branch claude/mayhem-439-20261028).
- 02:2x PR #423 opened (branch claude/mayhem-439-20261028, commit 7682f39d3, worktree WM/mega/mg-M-int/wt): packet
  research/claude-mayhem-439-20261028 (62 files, 8.4 MB); verify.py 187 checks PASS, test_verify.py 14 tests OK (HOME=empty, -I -B);
  CI suite mayhem-439-o0077 added to verify.yml. Packet staging helpers: tools/{seal.py,rtsum.py,winreport.py,mkruntime.py}.
- BANKER LOOP next: watch EVENTS.log for Mayhem WIN lines (mg-M-o83a/b, mg-M-o84a/b, mg-M-raw); lanes on parent-438 (cargo
  wrapper) -> port their src diff onto parent-439 and build with mayhem-env/tools/rbuild.py.
- 02:2x Checked: O0083/O0084 handler codegen (buy_v2::handler, sell_v2_handler, buy_pump_swap, sell_quote) is normalized-identical
  between parent-438 (cargo wrapper) and parent-439 (root recipe) -> lane wins port across. Lanes o83a/o83b/o84b already build on 439.
- Banking pipeline ready: tools/bank.sh NAME LANE_MAYHEM LANE_BASE_MAYHEM PARENT_ROOT PARENT_SYMS PARENT_CAND
  (port.py 3-way -> rbuild -> measure -> crecipe clean (cache2) -> runtime -> rtsum). Watcher: tools/watch.sh <PR#s> (Monitor).
- Next packet (440): include full sources/source.tar.gz (deterministic) so the parent chain is self-contained; parent = 439 packet.
- 02:3x Packet generator ready + self-tested: tools/mkpkt.py CONFIG.json (templates pkt-src/tmpl/{verify,elf_check,test_verify}.py;
  config example logs/selftest439.json). Self-test on the 439 inputs: verify 186 checks PASS, 14 tests OK (removed after).
  For 440: parent_inventory=research/claude-mayhem-439-20261028/sources/source-inputs.json, parent_tree=[tar Q438 source.tar.gz,
  overlay research/claude-mayhem-439-20261028/sources/shipped/instructions -> src/instructions], parent_images=439 builds/*.gz
  (needs #423 merged; else stack on branch claude/mayhem-439-20261028). Repeat build via rbuild.py (now records packet_linker_sha256).
- 02:19 o84b NOTE: O0084 best r3 = 7 masked lines (not closed). No Mayhem WIN yet. PR #423: 132 checks pending (CI queue).
- 02:21 PR #423 MERGED (bulk-merger; CI still pending at merge). Watching CI suite mayhem-439-o0077 result.
- 03:19 WIN mg-M-o83c +O0083 (440, raw 223) -> banking as p440 (tools/bank.sh)
- 03:2x coordinator: o83c closed O0083+O0084 = 441; banking p441 (440 run kept as intermediate evidence, no 440 PR)
- 03:2x bank 441 normalized (o83c BEST x01c): p441 build 44e4f540 == lane; clean identical; vs 439: +O0083 +O0084, raw 223, no_losses;
  runtime 6636/69/692/150/856, 0 mismatches (runtime-p441/). Superseded by the raw tree below (coordinator).
- 03:2x raw tree mg-M-raw WIN-r441a independently rebuilt: roots/p441r (= WIN root; 6 files vs parent-439) + generated ordered.ld
  (b1f8671d): rbuild (shared cache) and crecipe (cache2, fresh copy) both 380157fa / 5fda6745, no stack warn. measure vs 439:
  441, raw 441 (all), +O0083 +O0084, no_losses, edges 4768, Source 519. tools/wholeelf.py: 775,416 B vs original 777,408
  (1,992-B zero tail); 30 differing bytes (.dynsym 1, .dynstr 20, .rel.dyn 9); all 9 section headers equal.
- 03:27 published WM/mayhem-env/parent-441 (+ordered.ld, README) + BASE line. crecipe.py/rbuild.py accept MGRAW_ORDERED.
- 03:4x PR #432 opened (branch claude/mayhem-441-20261028, commit e30b7826e, worktree WM/mega/mg-M-int/wt441): packet
  research/claude-mayhem-441-20261028 (85 files, 8.9 MB) via tools/mkpkt.py logs/pkt441.json + hand README; verify 249 checks PASS,
  test_verify 14 OK; CI suite mayhem-441-o0083-o0084-raw. Runtime on 380157fa: 6636/69/692/150/856, 0 mismatches.
- Templates now support a shipped generated ordered.ld (ORDERED_FROM_PACKET) and per-section whole-ELF claims (WHOLE_DETAIL).
- NEXT: whole-ELF identity with mg-M-raw/raw2 (30 B = dynsym order sol_log_data vs sol_memcpy_, from anchor_lang rlib member ref order).
- 03:4x posted dynsym facts + multi-CGU anchor_lang hypothesis to FINDINGS for mg-M-raw/raw2; PR #432 CI 136 pending (queue stalled; #423 merged with 132 pending).
- 03:5x anchor codegen-units sweep (diagnostic): N>=4 gives the original dynsym order exactly but changes 6 anchor windows; posted to FINDINGS.
- 03:43 PR #432 MERGED (bulk-merger; CI pending at merge). Waiting on mg-M-raw/raw2 for the last 30 B (whole-ELF identity).
