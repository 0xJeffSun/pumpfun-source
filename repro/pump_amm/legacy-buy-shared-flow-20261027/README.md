# Shared legacy-trade control flow

Read-only original evidence for the next source-structure investigation.
`original-helpers.json` binds four complete original instruction windows, their
actual caller addresses, immediate custom-error codes and outgoing calls.
Candidate symbol names are possible correspondences, not proof that a referenced
callee's data or behavior is identical.

The original ordinary buy and exact-quote buy business windows are separate
(9,936 and12,936 bytes), while the current source shares a runtime `exact` branch
inside one larger execute function. Both original handlers call the8,104-byte
window at0x351a8, which contains cashback-account checks, ATA/transfer activity
and a pool-v2 helper call. The1,376-byte window at0x37150 constructs missing
buyback-account errors. The1,320-byte window at0x4ea90 derives/compares the
pool-v2 PDA. Their precise Rust signatures and all control/data dependencies
remain unresolved.

A useful next experiment is to recover these shared helpers and the separate
ordinary/exact handler control flows from actual argument/register evidence.
No source change, new function match or runtime acceptance is claimed here.
Forcing inlining/outlining attributes or copying instruction bytes is not
supported by this evidence.
