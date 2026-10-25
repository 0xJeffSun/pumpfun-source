# Twenty-seven-handler Fees checkpoint

The combined Fees candidate is 680,112 bytes, SHA-256
`4f379b83a2197a54a00895e3d4fb03211bbac085d9111a16694ccf3cb99e9439`.
It differs from the complete captured original, starting at byte 25. Four
instruction bodies remain unsupported; this is not a deployable replacement.

The source adds four buyback handlers and sharing creation to the prior
twenty-two-handler checkpoint. All 16,851 independent SBF comparisons pass on this
single executable. The six Surfpool reports cover 81 comparisons and 162 normally
signed local transactions. The persistent donation sequence separately covers ten
steps and twenty signed transactions. Per-suite normalization and coverage limits
are retained in the receipts; these counts do not establish exhaustive security.

The clean build used platform-tools v1.44 with locked, offline Cargo resolution.
The six compatibility pins in `run-context.json` enable this Rust 1.79-family
build; they are not asserted historical dependency versions. A checksum-verified
isolated Cargo cache is documented by `cache-manifest.json`. The compiler choice
follows the [controlled helper comparison](../compiler-family/CONTROLLED-HELPER-REPORT.md).
Its exact helper matches do not establish full-program identity.

`build-comparison.json` records current source hashes, toolchain identity and the
strict full-file comparison; `source-snapshot.tar.gz` preserves those inputs.
`build-attempt.json` and `build.log` retain the actual build. The coordinating
agent recorded the additional CARGO_HOME setting and original helper hash in
`run-context.json`; the helper at invocation is saved separately. The main helper
now records that environment setting automatically in future builds. No original
executable bytes were used as compiler inputs or copied into this candidate.

Reproduction commands are in [the crate README](../../../programs/pump-fees/README.md).
Build and cache output directories must be new. Existing historical checkpoints
remain separate and keep their original hashes.
