# Concurrent compiler research: acceptance boundary

After pass09 was committed as `e70db8da740e06edef8773ff4ba684063b73ee03`, the first push encountered a concurrent remote commit, `31aa51d`. The remote research was merged without changing the pass09 source, build artifacts, status or acceptance evidence. All 612 reviewed pass09 files retained their exact hashes after the merge.

The concurrent [recipe report](../../parallel-work/2026-10-25/independent-reconstruction-review/RECIPE-REVERSE-ENGINEERING.md) proposes v1.43 for Pump, AMM and Fees. Its section-size measurements and finite regression summaries are candidate observations. They do not establish the historical compiler or source completeness:

- Similar `.text` size does not imply that the same functions, conditions, ownership operations or data are present. Extra and absent code can offset each other. A size ratio is not a source-recovery percentage.
- Matching selected runtime helpers does not uniquely identify a compiler when those helpers may be shared across releases. Conversely, a closer total size does not disprove the other compiler's provenance.
- A version failing against the reconstructed lockfile or installed driver does not prove that the captured original used a different version. The historical lockfile, driver and build environment have not been established.
- An order-independent instruction multiset discards control-flow and position information. It cannot prove that reordering source will recover the original program.
- The Fees comparison explicitly identifies older baseline `4938820`, with candidate hashes `c678b29580750359290d2026891b55a72ba9ff5a732318b41c8775d0cfc45dfa` and `e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe`. Neither is the current accepted V2 candidate `b2d02994dbc29680273f0a3589d8d9fd2763445505483c1acbd4c9f09e1502fb`. Its 6,147 reported cases are not the current 17,461-case corpus or its source binding.

The merged research is retained for review. No candidate, recipe, source-completeness percentage or test result is promoted from it in pass09. Current accepted candidates keep their existing pinned recipes and exact source/build/runtime bindings. Historical compiler/dependency/flag identity remains unresolved, and whole-original equality remains 0/4. No additional compiler sweep, layout experiment or stopped-scope probe was run for this review.
