# Independent second Pump CPI static review

PASS: exact one-file proposal replaces only the second manual CPI. IDL unchanged; five metadata flag words are0,256,0,0,0. Independent scratchsource comparison found onlysharing.rs changed and exact proposal bytes. Five full helper windows match normalized instructions and full relocations; all45 immediate call target bodies supported. Original windows552776/571320/560200 remain;556488/572392 are newly matched. Original inventory remains458mapped/125unattributed/2conflicts.

First call524120→377624 succeeds only when resulttag2 at524144, otherwise branches528160. Second call529000→381336 succeeds only when resulttag2 at529032, otherwise same error path528160. Graduated branch529040 follows that barrier. Exact raw bytes are asserted by verifier. The reviewed gate initially asserted callcounts rather than these order/barrier instructions; root is adding assertions separately. gate-reviewed.py preserves the version actually reviewed.

No build or target execution in this review. Existing runtime52581 belongs to root and was not duplicated. Full caller/recursive downstream, allocator/OOM and whole original identity are not proven by helper matches. No stopped handler bodies examined.
