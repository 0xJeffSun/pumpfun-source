# Frozen scratch acceptance

One isolated pinned v1.52 build succeeded with exit0 and unchanged copied source. No compiler/backend errors occurred. Existing compiler unused-import/dead-code warnings and the build-sbf syscall-symbol warning remain in the full build log.

- Stripped candidate:668544 bytes; SHA256 `dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4`.
- Unstripped candidate: SHA256 `f356e4a5c28ba6b5fb2312c6799470a0ffc9e8bec39984650de33797042ba1d2`.
- Original:777408 bytes; SHA256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
- All21 unchanged suites:9595 functional original/candidate instruction comparisons,19190 recorded/derived signed executions (not independently reverified signatures for every receipt), zero functional mismatches, zero new unique cases.
- The20 flat receipts contain9589 cases. Three sequential burn records each contain one initial burn and one second rejection:6 additional instruction comparisons,12 signatures. Their three `second.logs_without_compute_numbers` differences are preserved, match the previously accepted diagnostic-only schema, and are accepted by the unchanged burn verifier. They are not erased or counted as full log equality.
- All15 unchanged receipt verifiers passed; six administrative runners retain their complete original/candidate checks.
- Full source/helper/runtime-image/input/tool gates passed before/after the build. All215 locked registry crate archives match Cargo.lock; every archive member equals cached extracted source. Selected compiler/SDK hashes match the accepted baseline.
- Static new candidate: error11 stored at130856; typed Result unwrap call130936→573992; size4/alignment4 Debug vtable points to290504, selecting exact `PumpSwapCpiMathOverflow`. The old extra Option unwrap message is absent in the rerun zero-effective-reserve BuyPumpSwap case; source path/line differences remain.
- Fresh consistent inventory:441 original windows,410 candidate windows grouping504 alias symbols;184 admitted original bodies refreshed,257 original windows kept opaque;172 candidate windows match admitted originals under the unchanged normalizer. No cross-method completion percentage is claimed. Full byte mismatch intervals, sections, relocation records and admitted call/data rows are retained.

No main source edit or main build was done. `PROMOTION-UNRUN.md` is the exact one-clean-main-build recipe for root review. Full ELF identity with the original is false; exhaustive semantics, historical compiler identity and formatter dependency closure remain unresolved.
