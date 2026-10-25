# Layered reconstruction pass 12

The AMM now uses the recovered stack-buffer base58 formatter and checked UTF-8
conversion. The complete current dependency is vendored; only the reviewed
formatter/import and bs58 dependency are changed. Every other package version
and lock record remains unchanged. This does not establish the original package
revision.

The main executable and symbols equal the separately tested scratch artifacts.
The complete 1,520-byte renderer, buffer-error and UTF-8 error formatters, and all
ten immediate call-target bodies match under the existing normalization. Four
additional original windows match, leaving 306 unmatched. Raw bytes, truthful
source locations, recursive data and indirect calls retain unresolved differences.

All 25 unchanged suites pass 17,462 comparisons; saved verification checks 35,074
transactions and 35,418 signatures, including 150 existing setup transactions.
No new cases or runtime probes were introduced.

The [complete remaining-work report](REMAINING.md), [current ledger index](current-analysis-index.json),
and [before](before-corrections/summary.json)/[after](after-corrections/summary.json)
snapshots include every byte and all opaque dispositions. Exact acceptance remains
0/4 core programs and 2/5 dependency captures; bounded instruction coverage remains
140/150. The security audit and full source/build reconstruction remain incomplete.
