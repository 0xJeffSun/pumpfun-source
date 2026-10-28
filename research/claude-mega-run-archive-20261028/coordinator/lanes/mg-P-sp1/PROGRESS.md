# mg-P-sp1 PROGRESS (mega run, main Pump; 2nd pass on 6 partial windows)

Start: L24 (982/1035, raw 166). Lane src: claude-pump-work/lanes/mg-P-sp1/src (cp of base/L24/pump).
Score baseline: base/L24/inventory.json. Build pipeline verified: nbuild.py reproduces L24 byte-exact (sha 4c5c562d,
982/166, 0 gains/0 losses), ~42 s/build. Tools in lanes/mg-P-sp1/tools; fast probes in lanes/mg-P-sp1/probe.

## Status: NO WIN. All 6 windows are block-placement / inline-threshold residuals. Admissible Rust source plateaus
well below the ratio=1.0 required for a match, consistent with the two prior lanes (mg-P-z02, mg-P-lib). I did NOT
fabricate or deliver a sub-1.0 partial as a win.

## True current ratios on the L24 build (win.py show, real build)
- 0x17c850 TLV get_transfer_fee_config: 0.534 (best admissible source 0.559).
- 0x9b430 BondingCurve size-dispatch (un_fN): 0.564.  0x9b148 (744 B, the try_deserialize wrapper): 0.469.
- 0x2fa60 distribute_tokens: 0.223 (L24's committed form; z02's isolated 0.38 not reproduced on L24).
- 0x34558 distribute_fee_to_holders: 0.168 (z02 partial 0.60 never integrated; on a diverged base).
- 0x80df8 v3_buy_costs: 0.157 / 1416 B. NOTE for integrator: L24's trade_v3 v3_buy_costs has DEGRADED vs the
  mg-P-lib c80 partial (0.66 / ~2096 B, on an older/diverged base). The 2120 B body collapsed to 1416 B on L24.

## Distinctive new results (details + reusable tooling)
1. **0x17c850 is byte-EXACT-reachable in the real identity toolchain** (refutes "impossible"). Recipe is IR-only
   (NOT admissible as source): take the un-folded structure IR (store2=9, no `or` fold), split each shared error-exit
   block per predecessor (tools/irsplit.py), split the `config.is_some()||length<108` or-fold into two branches, and
   move the length<108 error block to the END of the IR fn (tools/blkmv.py ... END). llc then re-tail-merges in codegen
   and emits the original's exact 664 B / 83-insn layout. Saved: partials/0x17c850-IR-EXACT.ll (+ .o, scores 1.0000 EXACT).
   The residual is purely an MBP (MachineBlockPlacement) block-order tie-break that follows IR block textual order; no
   SOURCE form steers it in rustc 1.79-dev / LLVM 18.1.7.
2. **clo.sh = clang -O3 on rustc PRE-opt IR reproduces the FULL opt+codegen pipeline byte-exactly** (verified identical
   to the real build on get_transfer_fee_config). Unlike the post-opt llc loop (which cannot test inline decisions),
   this runs the inliner, so it can test inline-threshold hypotheses (e.g. 0x80df8's closure) with no build slot.
   Get pre-opt IR: rustc --emit=llvm-ir -C no-prepopulate-passes. tools/clo.sh in.ll out.o.
3. **Original TLV layout fact**: single MERGED result/exit block placed at the TOP (orig idx 13 err-store / 15 Ok-None /
   16 exit), everything else `ja`-s back up. z10's "inlined-callee merge-block appends at end" is the opposite of what
   this window needs; wrapper/inner-fn forms (p1 inner-fn = 0.559, best admissible) do not move MBP to put the merge at top.

## What was tried and failed (so later lanes don't repeat it)
- TLV: 1152 check-form combos (gen2.py), 5 config representations x 2 break/return forms (gen1.py), helper isolation of
  the length check / tag==1 arm (gen3/gen5: w1/w2/w3/q1/q2 all 0.44-0.55), thin-wrapper & inner-fn & closure-IIFE
  (gen4: p1-p4), `core::intrinsics::unlikely` on error edges (no effect). Greedy IR block-order hill-climb from the
  rustc-emitted order caps at 0.72-0.84 (local optimum); only the manual per-predecessor split + end-move reaches 1.0.
- BondingCurve 0x9b430: bc2's 8 dispatch forms (if-chain / else-if / match / range / reverse) all 0.564; `unlikely` on
  the n<41 and len<8 error edges = no change. Residual = original tail-DUPLICATES the two error exits (len<8 and n<41)
  and places them adjacent near the top with the decode dispatch after; rustc tail-MERGES the identical Err(invalid())
  exits and sinks them. Behaviour-preserving ways to make the two exits non-identical (so they don't merge) were not found.

## Tools (lanes/mg-P-sp1/tools)
sc.py (byte scorer: ratio/size/EXACT), dd.py (aligned normalized diff orig vs probe), odump.py (numbered orig listing),
qp.sh/cmp.py (standalone no-dep probe), clo.sh (clang full-pipeline on pre-opt IR), blkperm.py (IR block-order hill-climb),
blkmv.py (move one IR block), irsplit.py (per-predecessor block copies), rmlt.py (strip lifetime markers),
passtrace.py/irchunk.py (print-after-all pass tracing), nbuild.py (L24 nested-crate build+score).

## Best admissible partials (NOT deliverable; all < 1.0)
partials/0x17c850-inner-0.559.rs, partials/0x9b430-dispatch-0.5638.rs, partials/0x17c850-IR-EXACT.{ll,o} (IR-only, 1.0).

## Strongest remaining leads (for the owning lanes / integrator)
- 0x80df8: re-port the mg-P-lib c80 decomposition onto L27 (L24's v3_buy_costs regressed to 0.157); then use clo.sh to
  find a source form where the gross.checked_sub(net) Overflow closure callsite is BFI-cold (<2% -> threshold 45 -> the
  260-cost closure stays outlined like orig 0x81640). This is the one window whose blocker is a single inline decision,
  which clo.sh can iterate without build slots.
- 0x17c850 / 0x9b430 / 0x9b148: genuinely MBP-block-placement-bound; exhausted at the source level by 3 lanes now.
  Closing them likely needs either a rustc/LLVM version whose MBP tie-break differs, or acceptance that they stay raw-only.
