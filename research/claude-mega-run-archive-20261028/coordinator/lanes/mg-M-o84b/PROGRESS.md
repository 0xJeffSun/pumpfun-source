# mg-M-o84b PROGRESS (O0084 sell_v2_handler, orig 159160, 18096 B)
Work dir: WM/mega/mg-M-o84b (roots/, tools/, logs/, out/). Build: tools/bb.sh LABEL ROOT [ir] (label prefix mg-M-o84b-,
target mg-M-o84b / mg-M-o84b-mv; measures vs 438 = mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so; wr.py reports O0081-O0084).
## Start (01:5x)
- roots/h4 = parent-438 + o0084-port-r1 h4 files (state.rs, pump_interface.rs, buy_v2.rs, pump_interface_v2.rs).
- roots/v15 = h4 + brute-r1 best (price h4-lowmatch, arms quote-first, cap `match NA {true=>&f2,false=>&f11}` cap-min before max IN PLACE in state.rs initial_trade_output).
## Results (real builds, masked diff lines via tools/hunks.py score; measure vs 438)
- h4 on 438: O0084 122, O0081/O0082 matched, 438 no_losses (calibration OK).
- v15 (brute-r1 best as a REAL single variant: in-place AI capfirst-match ito + h4-lowmatch price + quote-first arms): O0084 24
  BUT loses O0081 + O0082 (legacy needs max-first AI ito) -> 436, no_losses false. Not admissible as is.
- existing build o0084-ir-r1-w22 (trait TradeCap early/late hooks; legacy &u64 late AI, v2 QuoteCap early non-AI; k1 let-else price):
  O0084 27, O0081/O0082 matched (on 436 base). Residual regions (by offset): price ~1400-1950, cap select ~2140-2420
  (w22: cap base/offsets right but select arm polarity inverted; v15: +8 folded into offsets), arm loads ~15240-15770.
- NOTE: never print disassembly listings (safety stop at 02:0x); score numerically only (tools/sc.py region counts).
## Next
- w438 = parent-438 + w22 state.rs + w22 handler; multi-variant sweep: QF arms, price forms, QuoteCap early polarity forms.
## 02:2x moved to parent-439 (state.rs/pump_interface*.rs/sell_v2.rs/buy_v2.rs identical to 438)
- Build: tools/bb4.sh LABEL ROOT [labels.json] (mayhem-env/tools/rbuild.py; measure vs mgMint-p439-clean). Copies of parent-439 need chmod -R u+w.
- roots/w439 = parent-439 + w22 state.rs + w22 pump_interface_v2.rs: 27 (P3 C9 A15), 439 no_losses (same as on 436).
- sweep c1 (22 variants, tools/sc.py; mv artifact +1 in M): QF arms 27->25 (A15->12); ALL cap polarity/value/match/inline forms no change;
  `native_mint::id()` instead of `native_mint::ID` in QuoteCap::early -> 18 (P0, len 18096 = orig).
- **r1 (REAL) = w439 + QF arms + id(): O0084 17 masked lines (P0 C5 A12), 18096 B, wr diffslots 69, 439 no_losses, no stack warn
  -> saved BEST-partial/.**
- c2 running: cap forms with id(), tuple orders, arm let orders, O0079-style per-field lets.
## 02:3x r2 = 8 masked lines (BEST-partial)
- QF arms superseded by per-field O0079-order event lets (c3): arm region 15->3. r2 real = 8 (P0 C5 A3), 439 no_losses, 18088 B.
- Residual r2 hunks: cap O+2328(+mov64) 2376(orig ldxdw,ldxdw -> mine sub64) 2408(orig mov64,sub64 -> mine ldxdw,ldxdw)
  = orig loads cap before the 10000-retained sub. arm O+15392(+ldxdw) 15456(-ldxdw) 15768(-mov64) = 1 load 64B early + 1 tail mov64 orig emits.
- Next: c4 = ito-copy variants (appended sa_/ito_ per variant via t6.sa_copy) reordering retained/max/cap.early (keep legacy &u64 path untouched);
  c5 = per-field let forms for the arm/tail region (recompute vs reuse, els values, field 72/field_56 placement).
## 02:4x r3 = 7 masked lines (BEST-partial) — shared lazy-retained
- r3 real: C4 + A3, 439 no_losses, O0081/O0082 norm_eq, no stackwarn, 18088 B. Mechanism in BEST-partial/NOTES.md.
- shared ito now takes retained_bps, computes retained_basis_points after cap.early (legacy-safe; mg-M-o83b buy side composes).
- r4 (full O0079 SellEvent literal order) = 13 (WORSE: new T-region diffs) -> h4's literal order is correct for O0084; keep it.
- c5 arm field-form sweep: no movement on A3 (all 9). c6 = adjacent literal swaps from h4 order; c7 = cap-scheduling ito forms.
- Residual r3: cap O+2376/2432 = 2 cap ldxdw scheduled 56B late; arm O+15392/15456 = 1 ldxdw 64B early; O+15768 = orig materializes fresh mov64 0 (else-arm). All scheduling/RA; source leverage limited (IR-proof territory per TECHNIQUES #4).
## 02:5x FINAL (time-box) — BEST-partial r3 = 7 masked lines
- O0084 driven 122 (prior best real) -> 7 masked lines on parent-439, no_losses, O0081/82 norm_eq, no stackwarn, clean root compile (rbuild.py, source/archives/tools unchanged, sym 925ea77d...). BEST-partial/ = full root + source.patch (state.rs + pump_interface_v2.rs only) + NOTES.md + measure.json + score/winreport.
- Mechanism (composable with mg-M-o83b buy side, which = my state.rs + buy_amounts<C:TradeCap>):
  trait TradeCap{early,late} default-identity; &u64 overrides late (AI, legacy max-first); QuoteCap{gp,quote_mint} overrides early (non-AI) w/ cap select using native_mint::id(); ito+sell_amounts generic; ito computes retained_basis_points lazily after cap.early (retained_bps param, callers pass through); SellEvent per-field O0079-order scalar lets with h4 LITERAL order.
- Residual 7 = pure scheduling/RA, NOT source-movable (swept value/ptr, literal order, field RHS forms, retained eager/lazy, max placement, cap guard forms):
  cap: 2 ldxdw 56B late (O+2376 orig / O+2432 mine); arm: 1 ldxdw 64B early (O+15392/15456); 1 orig fresh mov64 0 at O+15768 (len 18088 vs 18096).
- NEXT (handed to o83a / integrator): IR surgery (emit r3 IR via a patched rbuild adding --emit=llvm-ir, then llc per TECHNIQUES #4) on (1) MachineScheduler ordering of the cap-select load chain vs the real_sol*retained max arith; (2) the else-arm zero materialization + the one early event-store load. Same cap residue is shared with O0083 buy_v2.
- Roots: roots/{w439,r1,r2,r3,r4,r5,c1..c7}. Builds: mayhem-b/out/builds/mg-M-o84b-*. r3 and r5 tie at 7 (r3 is BEST).
## 03:0x IR-surgery done (coordinator-requested) — verdict: residue is RA/scheduler-bound
- Set up IR loop: tools/rbuild_ir.py (patched rbuild emitting --emit=llvm-ir) + tools/bir.sh; out/r3.ll + r3-f.ll. irx.py llc baseline = 7 (matches real r3 exactly).
- Levers tested, ALL NEUTRAL (stay 7): cap phi {96,176} order; event-alloca lifetime.start move; block-let event (r6 real); store/literal order (r4 real = worse 13); arm field forms (c5). Invalid SSA reorders are the only thing that changes output (scheduler re-sorts anyway).
- Conclusion: cap (ldxdw pair 56B late) + arm (1 ldxdw 64B early, 1 fresh mov64 0) are post-ISel MachineScheduler/RA. Not source/IR-structure steerable. Cap half shared with o83a O0083 (same initial_trade_output) — hand the MIR/scheduling angle to them.
- FINAL best = r3 (BEST-partial/), 7 masked, 439, no_losses, O0081/82 kept, clean build. Builds r3/r5/r6 all tie at 7.
