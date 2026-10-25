# Pricing and local sort-invariant results

All four independent CLI tasks completed; total completed CLI tasks now number 37. Root ran each unchanged verifier from a separate copy and reviewed the reports. These static packages add no builds, runtime cases or accepted program-source changes.

| Package | Result and remaining boundary |
| --- | --- |
| [pump_nested_pricing](pump_nested_pricing/REPORT.md) | Global operand identities, curve/pool pricing widths, rounding and numeric error order recovered; pool tail words are inactive. Wide-division invariants and full create-context admission remain open. |
| [relay_sort_scheduler](relay_sort_scheduler/REPORT.md) | Conditional prefix/stack/capacity/merge-extent and final-input proof, importing partition/leaf and runtime primitive contracts. |
| [relay_sort_partition](relay_sort_partition/REPORT.md) | Conditional stable partition, predecessor bound and decreasing recursion proof; eager fallback avoids large recursive re-entry. Scheduler and leaf contracts remain dependencies. |
| [relay_sort_merge](relay_sort_merge/REPORT.md) | Conditional stable insertion and dual-ended merge proof, including rank-based exhaustion and exact terminal cursors; caller extents/disjointness remain premises. |

The three sort arguments are separate local ledgers. Their circular-looking imports must be discharged by a reviewed composition argument before promoting a combined source contract. They are manual algebraic/CFG proofs under explicit assumptions, not machine-certified theorems. Byte/hash verifiers alone do not certify those assumptions or all prose semantics. Original source attribution, handler admission, resource failures and full binary identity remain unresolved.

All inner seals are unchanged; the outer manifest binds every file except itself. No private audit inputs, stopped scopes, target execution or CLI telemetry are included.
