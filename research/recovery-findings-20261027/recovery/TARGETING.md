# Byte-closing campaign — consolidated targeting ledger (2026-10-27)

Goal (user, explicit): make the 4 core contracts **byte-for-byte identical** to `evidence/original/<p>/deployed.so`; provenance/historical-tools NOT required; everything authorized incl. resuming stopped lanes + overriding the promotion guard.

All 4 scout audits (independent, read-only) agree: **behavioral reconstruction is complete** (0 differential mismatches each); **byte-identity is 0/4**, each blocked by a specifically-named missing input. The reconstruction is a behaviorally-equivalent but *different* source → different codegen/sizes → different bytes. Byte-identity fundamentally needs the *same* source (mod whitespace); we don't have it.

## Per-contract state

### pump  (current candidate = round16, sha 6faafcf1…; status.json pointer)
- dispatch 56/56 · differential 0 / 15,052 · build deterministic (round16 reproduces)
- `.text` 1,672,696 vs orig 1,792,208 → **−119,512 B (candidate SMALLER)**
- masked Jaccard 0.742 / unmasked 0.626 (layout lift 0.117); raw-equal fns 114/1035, normalized 670, **unmatched 365 (35.3%)**
- blocker: missing internal helper functions (need their exact source) + exact Cargo.lock identity
- lever: continue helper recovery (round13→16 already +38 KB matched_text) ; compiler/flags sweep ; ordering

### pump_amm  (status.json advanced to structural-tlv-recovery, sha 5c1e8b18…; audit measured dependency-liquidity sha 5cd7879a…)
- dispatch 38/38 · differential 0 / 17,462
- `.text` 1,201,240 vs orig 1,162,040 → **+39,200 B (candidate LARGER)**
- masked Jaccard 0.821 / unmasked 0.698 (layout lift 0.123); normalized 586/785, **unmatched 199 (44.5% of .text, big trade/swap/liquidity/curve-math handlers)**
- create_config: static-only, 0 runtime successes — gated on fixed admin key `8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8`; a positive init needs that **private key (not in our possession)** or a retained deploy-time init tx → NOT in-repo closeable
- update_fee_config 12/16 immediate targets; the 4 unmatched = GlobalConfig fee setters (lp/protocol/creator/recipients), 616 B orig vs 608 B cand = compiler monomorphization, not logic
- blocker: compiler/flags provenance (specialization) + create_config key
- lever: compiler/flags sweep (monomorphization) ; ordering

### pump_fees  (candidate sha 2387f813…) — the MOST complete, the hard wall
- dispatch 31/31 · differential 0 / 17,461
- `.text` 789,416 vs orig 799,648 → **−10,232 B (+1.28%)** (nearly size-matched)
- masked Jaccard 0.791 / unmasked 0.673 ; **opcode-mix Jaccard 0.971** ; aggressive-mask 0.919 ; normalized 463/585, raw 100
- **0 closeable logic windows** (0 size-equal+reloc-equal-but-differing windows → no flippable-constant/logic fix exists). Residual = register-allocation/scheduling/inlining + panic-`Location` line:col metadata.
- path strings 4/20 present; 16 recoverable by re-splitting modules into the original's disclosed filenames (**.rodata only, does not touch .text**)
- blocker: exact source *form* (drives regalloc/scheduling/inlining) + source file line:col (lost)
- lever: compiler/flags sweep (only thing that can shift regalloc) ; module re-split (rodata) ; ordering

### mayhem  (candidate sha 8dac1ff7…; toolchain v1.52–1.56 uncertain)
- dispatch 25/25 (identical discriminators + identical lddw multiplicity vs original) · differential 0 / 9,595
- `.text` 558,200 vs orig 706,744 → **−148,544 B (21% SMALLER)** — a *partial reimplementation*
- masked Jaccard 0.657 / unmasked 0.532 ; opcode-counter 0.786 ≈ size ratio 0.790 → "same instruction-kind shape, ~21% less of it"
- error surface: reconstruction has **6-variant MayhemError** vs original's **~19 error idents / ~18 message strings** (SolReservesTooLow, MayhemModeEnded/NotEnded, OverallRiskExceeded, InvalidBump, SweepFeeRateLimit, TradeRateLimit, Pump/PumpSwapCpi{Failed,MathOverflow,Slippage}, …) — **enumerated in the original binary's strings → recoverable**
- path strings 0/9 — recoverable by renaming crate dir `mayhem`→`mayhem-program` + re-splitting modules into original filenames (admin.rs, fee_recipients.rs, pump_interface.rs, pump_interface_v2.rs, pump_amm_interface.rs)
- blocker: missing error-surface source + exact compiler
- lever: **recover error surface (highest leverage — grows .text toward original)** ; toolchain sweep (genuinely unknown) ; path-string/module fixes ; ordering

## Crate build facts
- lib names / artifacts: pump=`pump_recovered`(?), pump_amm=`pump_amm_recovered`, pump_fees=`pump_fees_candidate`, mayhem=`mayhem_recovered`
- compiler families: pump/amm/fees = v1.44/1.45/1.46/1.46.1 (Rust 1.79) ; mayhem = v1.52–1.56
- originals all e_machine 263 (SBF); deployed.so are 10 MB padded dumps for pump/amm (extract sections)

## Campaign levers (ranked by expected byte-match gain)
1. **Missing-code recovery** — mayhem error surface (−149 KB gap, spec in binary), pump helpers (−119 KB). Highest potential ELF-size convergence.
2. **Compiler × flags sweep** — fees (regalloc; size already matches), mayhem (unknown toolchain), amm (monomorphization). Never done exhaustively (builds serialized + disk).
3. **Function-ordering match** — collapses the ~0.12 masked-vs-unmasked layout lift across all 4 (needs original order inference + link-order control).
4. **Path-string / module re-split** — rodata wins (fees 16, mayhem 9); no .text gain.

## Irreducible ceiling (honest)
Even with all levers + any compiler + full authorization: byte-identity requires the exact original source form (determines codegen + embedded line:col) and, for create_config, a private key we do not have. The campaign will measurably raise byte-match and may fully close some sections/windows, but whole-binary 4/4 is not guaranteed — it is bounded by information we do not possess, not by effort or permission.
