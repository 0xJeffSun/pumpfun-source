# Layered reconstruction pass 13: remaining source contracts

Six further source reviews are published with their complete retained evidence and portable static checks. No executable changes in this pass. Both byte snapshots are the unchanged pass12 state, reverified against every current byte and hash.

- [AMM scalar values](amm-scalar-review/original/REVIEW.md): all three setters supply `(1000, fee)` in the original order; the residual is specialization, with updated actual helper addresses and full direct call evidence.
- [AMM account exit](amm-account-exit-review/original/REVIEW.md): a complete952-byte near-match differs by a context-member offset. All12 immediate target bodies, label and program ID match. Parser/member provenance is required before a representation change.
- [Mayhem posttrade accounting](mayhem-accounting-review/original/REPORT.md): two previously opaque windows are attributed to signed-i128 account updates and buy-side risk checks through four complete callers. Existing source expresses that contract. Classification history and unresolved transitive calls remain.
- [Mayhem risk values](mayhem-risk-values-review/original/REPORT.md): limit and unsigned low64 counter are attached in original order. Full selected formatting/name/box bodies remain unequal and are retained.
- [Relay owned3004](relay-owned-review/original/REVIEW.md): the reviewed source preserves name, formatted message and box ownership order. Dynamic versus specialized factory emission does not establish a source defect.
- [Relay IDL header](relay-idl-review/original/REVIEW.md): identifies a concrete missing I/O-error/owned-error boundary. A separate coherent correction is under build review and is not accepted in this pass.

The current [remaining-work report](REMAINING.md) and [full artifact/ledger index](current-analysis-index.json) retain all mismatches. Exact acceptance remains0/4 core programs and2/5 dependency captures. Bounded instruction coverage remains140/150; these static attributions add no runtime cases. Recursive data, indirect calls, historical source/build identity and the full security audit remain incomplete.
