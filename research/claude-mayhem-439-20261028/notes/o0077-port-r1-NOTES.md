# o0077-port-r1 NOTES (O0077 buy_pump_swap handler, 85600 / 9736 B)
Metric: ir-o77/tools/hunks.py masked slots (regs+stack masked); wr.py = winreport with O0077 added.
Base pl-o82-final2-434: 9016 B, hunks 988 slots.
Prior: ir-o77-2 (on 432) 388 slots; Codex qualified-amm434-union-01 (on 434) 9736 B 62 slots.

## p1 = parent-436 + Codex union buy_pump_swap.rs (side:false) + #[inline(always)] bought_amounts
9736 B, 33 masked slots, measure 436/436 no_losses. Remaining diff = SellEvent stores (7264-8640).

## p2 = p1 + phased event (let-bound fields in p1 eval order, literal in orig emission order)
9736 B, hunks 2 masked slots, no_losses. Unmasked ('none') 397: frame layout differs (p1's {let bump;let seeds;...} CPI block).
## batch b1 (batch.py = N handlers in one eval build, tolerance_bps&15 dispatch; idea from o0077-brute-r1)
q0 = plain CPI (brute B1 v2) + Codex inline event: none 147 / regs 33 (frame exact before event; event at -1880 like orig)
p3 = plain CPI + phased event: none 420 / regs 2 -> let-bound sol_vault/mint Pubkey locals get their own
  unmerged allocas (-200/-232) -> whole frame shifts 64 B. Hypothesis: orig computes them before Clock as
  locals whose scope ends at the literal (event built in a block) -> test r1/r2 (batch b2).
