# Pass23 Fees portable/mutation checks

All15 cases passed on independent temporary copies. Original canonical4049 main,52cd scratch and03bf evidence packets were inventoried before and after; every file path/hash agrees. No ELF was changed, even in disposable tests. No compiler, target/VM, signing, network or active source/status/Git operation was performed.

Positive checks: main standalone, main optional --current-root actual managed checkout, standalone scratch with saved-signature verification, evidence standalone, and evidence --scratch plus --repo current binding. Scratch --runtime-signatures only revalidates retained signed bytes; it executes no target.

Negative checks reseal each copied top-level manifest so rejection cannot rely only on stale outer hashes: main source, README, helper, build.log, dependency manifest; identity gate boolean; nested reviewed plan modified and resealed; scratch acceptance wrong candidate binding; exported receipt wrong candidate with updated export/raw bindings; archive-member binding swapped. All rejected with nonzero exact exits retained in results.json. The plan mutation also reseals its nested plan so its known912 seal must reject. Evidence wrong candidate reaches its explicit2387 assertion; member swap is checked against the exact scratch archive bytes. All raw executable/symbol bytes remain untouched.

Case stdout/stderr and exact numeric exits are retained. original-before.json/original-after.json cover every canonical file; test_packets.py records reproducible setup/mutations and asserts ELF inventories before/after each case. This is a bounded verifier test suite, not a new security audit or additional authorization runtime coverage. Admin-only coverage remains zero; passing saved17461 comparisons/10steps is not exhaustive all-input equivalence.

The separate eight bridge cases remain under work/pass23-bridge-review and are not counted again. These15 cases test the packets themselves and explicit portable/current-root flags. Root may publish this packet independently; no immutable source packet was edited.
