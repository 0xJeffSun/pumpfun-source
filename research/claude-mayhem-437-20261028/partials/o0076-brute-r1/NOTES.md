# o0076-brute-r1 (source brute force, O0076 sweep_fees)
- base = copy of parent-436 (base/). tools/bb.py = batch builder under sbf lock (TARGET r436-o0076-brute-r1, ~7-12 s/variant incremental), logs/results.jsonl.
- Base: 8464 B, winreport ratio .2817, 1355 slots; select(520,576) limit.
- g1 (limit forms: method, let-else assign, ref select, gp deref, in-loop): all select 520/576, no change. In-loop limit changes size (8672), worse.
- IR (llc on own base.ll): branch+phi(176,232) off accounts+344 = 8384 B, rratio .992 (e1-bp). select of 176/232 alone = no gain;
  phi of ptrs / loads in arms = .70. Branch weights don't survive clang -O3 re-opt.
- Peer o0076-port-r1 (FINDINGS 00:5x): the branch survives only if the else arm keeps a codeless non-speculatable instruction.
- g2 queued (helper methods sol_limit/stable_limit at several visibilities, gp passed as an argument, Deref/into/clone/!native arms). Lock contention is heavy (22 waiters).
