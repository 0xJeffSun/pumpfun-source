# Layered reconstruction pass14

The Relay IDL header now uses the existing BpfWriter and owned3004 error path,
including error destruction, account decoration, reporting and consuming lowering.
Exactly three source files changed. The pinned single build and complete source
are bound by the [current checkpoint](../../donation-relay/current.json).

The unchanged12 ordinary cases pass on24 submissions. Saved checks verify50
signature fields,25 unique signatures and24 effect sets. No new header-failure
or privileged probe was added; those coverage gaps remain explicit.

The new candidate is469,016 bytes, SHA256
`977fa996ec68d82a5b03d718cb2893bfeb51e239dc8d07572969044722b28cbb`.
The complete ledger has492 original and328 candidate windows,123 normalized
original matches and369 unmatched originals. Whole-file identity remains false.

The [remaining-work report](REMAINING.md), [current index](current-analysis-index.json),
and [before](before-corrections/summary.json)/[after](after-corrections/summary.json)
snapshots retain every mismatch. Core exactness remains0/4 and dependency capture
exactness2/5; the security audit and full reconstruction remain incomplete.
