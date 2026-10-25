# Dependency provenance follow-up

These read-only investigations narrow missing source/build evidence without changing any candidate executable or identity claim.

- [ATA](ata/REPORT.md): the official Anchor verification recipe and Cargo0.60 metadata implementation do not justify a mount-path or arbitrary flag search. The closest retained build still differs at307 positions. The actual uploader recipe/lock/compiler association remains unresolved. Primary-source files and URL/hash mappings are preserved.
- [Metaplex](metaplex/REPORT.md): the July2025 primary audit names a later source revision in a repository unavailable through the current connection. A literal exists in the captured ELF and is absent from candidate4, but neither this difference nor the audit identifies exact deployed source. The PDF itself remains an external primary source with its verified published hash.

No new builds or behavioral tests were performed by these investigations. Existing SPL Token/Token2022 exact rebuilds and unresolved ATA/Metadata/relay status remain unchanged.
