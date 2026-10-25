# Donation relay reconstruction

Current proposed source-built checkpoint: [build15 owned arithmetic errors](source-build-15-owned-arithmetic/README.md), [tested source23](source-build-15-owned-arithmetic/runtime-plan/static-proof/source), [binding](current.json). Candidate477512B SHA256 `5f6d29410047551f5f4e448937f2de318c2a55546699fbfb33dacd5c89ddaea4`; symbols660912B SHA256 `573c172f0a58fd33b1c28e3908d6bfd0066dabffbd8850c045ca0c0acdb4638b`.

The cumulative source restores borrowed u16 weights after both admission guards, skips remainder sorting when no leftover exists, and returns the existing owned6008 ArithmeticOverflow error on three proved arithmetic failures. Quotient low64 truncation and output/remainder-before-allocated-overflow ordering are preserved. Caller propagates the owned error before recipient CPI; logging borrows it before consuming lowering. Global unrelated numeric overflow and IDL3001/3002/3003/3004 stay unchanged. Full static proofs and actual build exits are retained.

Unchanged ordinary12 passes:24submissions,50signature fields,12unique transactions,25unique signatures,24effect sets. Dynamic coverage of owned6008/weights/sort/checked-borrow-failure remains ZERO. New saved verification uses unchanged structural assertions(runtime=False) plus stock P24 current cryptography; historical Darwin runtimeTrue evidence remains separately labeled. No new authority/source-origin probe or fixture.

Complete492original/331candidate inventory retains33raw/122normalized matched originals,370unmatched. Whole original byte equality isFALSE; no normalized match-count improvement, full recursive/source/security equivalence or unique historical spelling is claimed. Truthful diagnostic differences remain unforced. Canonical source23 is installed from the exact tested snapshot after root reconciliation to source13; this is source selection reuse, NOT a genuine canonical/main Relay rebuild. Earlier immutable source13/14 evidence and the rejected v1.47 measurement remain provenance.

Selection and canonical-source equality are checked by source-build-15-selection/verify.py using supported Python3.12/solders0.27.1 saved-only verification.
