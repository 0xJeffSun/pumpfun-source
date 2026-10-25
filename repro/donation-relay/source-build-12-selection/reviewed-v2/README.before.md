# Donation relay reconstruction

The current source-built checkpoint is [build09: IDL header owned errors](source-build-09-idl-owned/README.md), with [complete source](source-build-09-idl-owned/source) and [machine-readable binding](current.json). Its candidate is469,016 bytes, SHA256 `977fa996ec68d82a5b03d718cb2893bfeb51e239dc8d07572969044722b28cbb`.

The latest source correction restores the header writer's I/O error destruction, owned3004 construction, account decoration, reporting and consuming lowering. It changes three source files and reuses the existing writer/error implementation. All12 unchanged ordinary cases pass on24 submissions; saved verification checks50 signature fields,25 unique signatures and24 effect sets. These cases do not exercise all header failures or privileged routes.

The complete original/candidate ledgers retain369 unmatched original windows. Whole-original byte equality, full source/diagnostic/dependency provenance and complete security acceptance remain unresolved. Source is maintained through immutable checkpoints; old packages are retained, and future changes advance `current.json` after verification.

Earlier source reconstruction:

- [Dispatch and wrappers](dispatch-source-proposal/README.md)
- [Account/context composition](context-source-proposal/REPORT.md)
- [Reserved IDL operations](idl-source-proposal/README.md)
- [Previous writer/error checkpoint](source-build-08-whitelist-writer/README.md)

Captured filenames and lines are original metadata; current source retains its truthful diagnostic locations. No claimed original bytes are synthesized or patched into the candidate.
