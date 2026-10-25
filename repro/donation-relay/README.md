# Donation relay reconstruction

The current source-built checkpoint is [build12: owned IDL discriminator mismatch](source-build-12-idl-discriminator-owned/README.md), with [complete source](source-build-12-idl-discriminator-owned/source) and [machine-readable binding](current.json). Candidate473264 bytes SHA256 `6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e`.

The two-file correction restores owned3002 name/message construction, truthful Source origin and its IdlAccount replacement before immutable data release, then the existing outer account rename/log/lower path. Existing3001/3003/3004 source paths remain unchanged. Natural emitted src/idl.rs:115 differs from original programs/contracts/src/lib.rs:36; no coordinates are coerced.

All12 unchanged ordinary cases pass on24 submissions; saved verification checks50 signature fields,25 unique signatures and24 effect sets. No new authority or source-origin probe was added. These cases do not exhaust mismatch/formatter/OOM paths. The complete492original/330candidate ledgers retain33raw and122normalized matched originals, with370unmatched; no match-count improvement is claimed. Whole original byte identity and full security/source/recursive-data acceptance remain unresolved.

Source is maintained through immutable checkpoints. [Build11](source-build-11-idl-discriminator/README.md) and all earlier packages remain retained; current.json advances only after root verifies exact publication identity. This publication carries the tested source/executable rather than claiming a nonexistent separate main Relay crate build.
