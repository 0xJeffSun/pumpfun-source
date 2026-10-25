# Donation relay reconstruction

The current source-built checkpoint is [build13: checked typed-borrow owned ProgramError](source-build-13-typed-borrow-owned/README.md), with [complete source](source-build-13-typed-borrow-owned/source) and [machine-readable binding](current.json). Candidate473688 bytes SHA256 `e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244`.

The one-file correction converts checked typed-account data-borrow failure to the existing owned128byte ProgramError before outer account naming/log/lower. Failed acquisition has no guard decrement; unchecked=false behavior stays unchanged. Existing3001/3002/3003/3004 roles remain; truthful emitted src/idl.rs:123 differs from prior:115 and original programs/contracts/src/lib.rs:36. No coordinates are coerced.

All12 unchanged ordinary cases pass on24 submissions; saved verification checks50signature fields,25unique signatures and24effect sets. New borrow-failure runtime coverage is zero. No new authority/source-origin probe or fixture was added. Complete492original/330candidate ledgers retain33raw and122normalized matched originals,370unmatched; no match-count improvement. Whole original byte identity and full security/source/recursive-data acceptance remain unresolved.

[Build12](source-build-12-idl-discriminator-owned/README.md) and all earlier immutable checkpoints remain retained. This publication carries actual tested source/executable rather than claiming a separate main Relay crate rebuild. Selection identity is checked by source-build-13-selection/verify.py.
