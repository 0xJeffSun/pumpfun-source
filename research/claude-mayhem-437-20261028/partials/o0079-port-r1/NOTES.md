# o0079-port-r1 notes (O0079 sell_pump_swap handler, 95848 / 17312 B)

## Setup
- Root = parent-436 copy + one file (src/instructions/sell_pump_swap.rs). tools/b.py LABEL SRC.rs [--ir].
- tools/dump.py: handler dump (relative branch targets, calls/lddw masked). orig.txt = original.
- tools/llx.py: llc experiments on handler IR (renames %N -> %vN so lines can be permuted). llc ~3 s.
- tools/evorder.py / evall.py: extract the final SellEvent store emission order from any build.

## Results
- a1 = mayhem-o79 g5n6 ported to 436 (side:1 -> side:true): 17312 B, ratio 0.9577, 170 diff lines,
  no_losses true, no gains. First diff at insn 1823 (event construction). Everything before is exact.
- Remaining diff = scheduling of the final event block (store emission order) + spill-slot/regalloc
  consequences. Orig emission: qm sv side sa ta svb tvb vt ts et vs rs rt rrb ver gsd stn ssd mint gqd sqd rq vq qvb qa.
- llc experiments: permuting phis / pre-clock loads / post-clock loads / lifetime.end in IR: ~no effect.
  Permuting IR store order: effect (best 76 diff lines by climbing) but IR store order = decl order in rustc
  for temps, so not directly source-reachable.
- MINED (evall.py over 1488 builds): Codex "phased" builds (all fields let-bound locals, literal written in
  emission order: SellEvent{quote_mint,sol_vault,side:true,sol_amount,...}) reproduce the EXACT original
  store order; their window differs from the original ONLY in stack-frame offsets (88 lines, all
  [r10-N]/add64 constants; frame 32 B larger: event at -1760 vs -1728).
- => need: phased event order + original frame layout.

## IR proof (this lane, 00:3x)
- llc on Codex phased module.ll (qualified-amm436-phased-mint-tuple-01-build) + lifetime.start/end for %sol_vault and
  %_188 (mint) + phi order (state_ptr,qvb,gsd,sqd,gqd,vq,sa,svb,ssd,vs) = EXACT window (llc/e7.py 'irr1').
  Let-bound `let sol_vault=a.sol_vault.key()` / mint lose StorageLive/Dead under copy-prop -> no lifetime markers
  -> StackColoring cannot merge them -> frame +32 B. That is the whole frame difference of the phased family.
- Source c1 (scalar lets in irr1 order + quote_mint let FIRST in literal + inline sv/mint/timestamp): 17320 B, 0.5748
  (wrong; quote_mint must be LAST in the literal, see brute-r1 mechanism 1).

## Outcome
- O0079 was CLOSED by lane o0079-brute-r1 (build o0079-brute-r1-e1 / best-clean). Verified here independently:
  winreport norm_eq=True 17312 B 0 slots; measure.py vs pl-o82-final2-434: 436 -> 437, gains [O0079],
  no_losses true; no stack-offset warning (m/verify-brute-best-clean.json). Remaining lane builds cancelled to
  free lock slots. No separate BEST/ from this lane (its best own build, a1, has no gain).
