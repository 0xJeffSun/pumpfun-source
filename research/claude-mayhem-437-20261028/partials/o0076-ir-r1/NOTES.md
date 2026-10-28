# o0076-ir-r1 (IR-first lane for O0076 sweep_fees)
- Built 436 base with --emit=llvm-ir,link (label o0076-ir-r1-base): candidate e93b60f1 = base. IR at ir/base.ll, fn at ir/base-fn.ll.
- llc (v1.54 platform-tools, -O3 sbf generic pic function-sections) on unmodified IR reproduces base window exactly (8464 B, slots 987, ratio 0.3177).
- Reproduced mayhem-o76 IR results on the 436 IR: replacing `select or.cond74, 520, 576` with a branch on native + phi(176,232) + gep +344 -> 8384 B, 518 slots, rratio 0.992 (e1-bp); load-order permutation e2b-LTAPG -> ratio 0.911.
- Remaining after e1-bp: prologue load order of accounts fields (600/160/352), a few spill/reload register-allocation differences, size 16 B short.
- No source form found; no build improved the window. Session stopped early.
