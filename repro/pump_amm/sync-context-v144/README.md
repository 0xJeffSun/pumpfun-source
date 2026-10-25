# AMM Sync account context restoration

One isolated pinned v1.44 compile/v1.52 strip changes only two SyncUserVolumeAccumulator declarations: user now owns AccountInfo, and the global accumulator Account is inline. The event_cpi macro and all Claim source—including its self-transfer and overflow-before-mutation corrections—remain unchanged. The complete28-input map includes all vendored files; Cargo.lock, other27 source inputs, SDK/tools and dependency records match the accepted baseline and remain unchanged after compilation.

Candidate SHA256: `69e5b9fc8d6bcecf5f8ae60748767fefc685a3b13823189a945b2f9d1c77e758`.
Symbols SHA256: `ee10da5e480b5f6b6977949db9d392deb60fad3db2e25c28720f528f38599db2`.

Build and all25 unchanged suites exit0. There are17462 passing comparisons,35074 recorded transactions and35418 verified signatures, including150 existing fixture-setup transactions. No new fixture, probe, negative case, runtime assertion or compiler/source variant was introduced. No main edit occurred.

Complete original/current Sync parser5056 and wrapper1424 now match normalized instruction bodies and relocation patterns. The full inventory improves from483 to485 normalized original matches and302 to300 unmatched; candidate unmatched192→190. These are triage counts, not completion percentages. The wrapper's handler target remains mismatched, and the Sync handler itself is2680 bytes versus2904 original. The complete prior Claim handler/parser/wrapper normalized bodies remain identical to the accepted self-transfer baseline. No full recursive or original ELF equality is claimed.

`source-proof/` retains the full original/current context, constructor, macro, member and drop evidence. The five-member original context is784 bytes versus208 before this correction; the discrepancy is exactly an inline544-byte Account versus an8-byte box plus a48-byte owned AccountInfo versus8-byte borrowed wrapper. The event/program fields already use owned AccountInfo via the existing macro and were not rewritten. This is restoration of evidenced types, not artificial padding, field-order forcing or compiler experimentation.

`sync-static.json` and its reusable checker record the full new normalized bodies and Claim preservation checks. All before/after function/call/data inventories retain unmatched/ambiguous rows and unresolved data extents. Truthful source diagnostics and measured compute remain explicit differences. Finite passing evidence does not establish all inputs, all error/allocator paths, historical textual source or dependency versions.

The portable verifier hashes the exact cache-free file set, checks source/build identity, regenerates both full inventories and static proofs, and verifies saved signatures without building or executing a target. Run `python3 -B verify.py`. Optional `--current-main /path/to/repo` binds28 compiler inputs only; main binary acceptance requires its own companion. The verifier uses the accepted Python analysis dependencies including solders.
