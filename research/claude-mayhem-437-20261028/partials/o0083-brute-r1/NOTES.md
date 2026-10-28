# o0083-brute-r1 (source brute force on O0083 = buy_v2 handler, orig 140512..159160, 18648 B)

Base: parent-436 (copy at base/). Base candidate buy_v2::handler = 7640 B (out-of-line to_account_info clones).
Tools: tools/score.py (window score; mslots = reg/stack/target-masked diff slots), tools/gen.py (knob generator),
tools/mk.py (places handler in pump_interface_v2.rs lines 355.., buy_v2.rs re-exports it), tools/run.sh NAME TGT knobs.
Targets r436-o0083-brute-r1{,a,b,c} (parallel).

## Constraints from original Source records
- file programs/mayhem-program/src/instructions/pump_interface_v2.rs; error!(PumpCpiFailed) at line 376;
  `before_sol-after_quote` at 393:25; tokens sub 394:26. state.rs 321:26, 350:43, 378:89, 379:34 (already in base).

## Results
- v0 (handler in buy_v2.rs, let-else price closure, value cap, inline_cpi_info clones, sell_v2-style event tuple):
  18544 B, mslots 195 (ratio masked .9542), no_losses. (ir-o83 best-24 on 432 base was 228.)
