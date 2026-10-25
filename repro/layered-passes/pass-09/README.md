# Layered reconstruction pass 09

AMM now assigns the accumulator user field after successful Clock retrieval,
matching the original instruction order. This one-statement movement preserves
the account contexts, event construction, pinned build recipe and dependencies.
A single isolated build and a clean main build produce equal complete executable
and symbol files. The candidate is 1,199,072 bytes, SHA-256
`8ce5f9588bdf7ca3d357a542518ad47aa1376fd8f3d242c37f18f55cef766a0e`.

All 25 unchanged suites pass 17,462 comparisons. Independent saved-evidence
verification checks 35,418 signatures over 35,074 transactions, including 150
existing setup transactions. No new fixture or initializer-success replay was
added. The original and candidate full inventories retain 785 and 653 windows,
respectively, with 310 original and 197 candidate windows unmatched.

The eight-byte size increase and positional byte differences reflect layout;
they are not semantic distance or a completion percentage. The ordering fix
does not establish committed-state differences when a transaction reverts.

The [fresh dependency review](dependency-review/REPORT.md) independently
reproduces all 307 ATA and 1,509 Metaplex differing positions. It identifies no
additional source correction supported by current evidence. Historical
source/build identity, full cleanup flow and diagnostic provenance remain open.

The [remaining-work report](REMAINING.md), [complete analysis index](current-analysis-index.json)
and [before](before-corrections/summary.json)/[after](after-corrections/summary.json)
comparisons cover every captured byte. Exact acceptance remains **0/4 core
programs and 2/5 dependency captures**. The bounded instruction measure remains
140/150 and is not overall completion. Pump fee-basis and Mayhem typed-error
builds are separate pending work. Full semantic closure and the security audit
remain incomplete.

The [concurrent recipe review](CONCURRENT-RECIPE-REVIEW.md) records a remote
research merge encountered during publication. Its size-based compiler and
source-completeness claims do not change this pass's acceptance records.
