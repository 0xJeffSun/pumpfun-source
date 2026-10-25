# FeeConfig deserializer source trials

Four clean, source-built v1.44 trials test the captured decoder's separate allocation branches and Borsh reader calls. None matches its complete 2,648-byte body. No trial replaces the validated main serializer candidate, and no runtime-equivalence claim is made. The [three branch trials](three-branches/REPORT.md) preserve the boundary and field-read observations; the [reader API trial](reader-api/READER-REPORT.md) produces the exact same ELF as the split-callers trial, ruling out that API spelling alone in this build.

Root independently verified both original artifact manifests, all 22 input hashes per source snapshot, successful unchanged-source build records, complete logs and candidate hashes. No executable edits, optimizer attributes or runtime transactions were used. The source spelling and full original byte identity remain unresolved.

These evidence bundles preserve actual execution paths. To rerun historical scripts, restore each source snapshot at its recorded work path and use the bound build helpers and compiler/dependency inputs referenced by the serializer package. Original package manifests remain unchanged beneath this wrapper.
