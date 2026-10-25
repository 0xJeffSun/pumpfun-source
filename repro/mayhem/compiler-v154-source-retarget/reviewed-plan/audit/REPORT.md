# Controlled Mayhem v1.54 comparison and read-only Relay discriminator

**v1.54 improves the measured Mayhem stock-family helper evidence beyondv1.53, but does not reproduce the original whole file or identify a unique historical compiler.** The one allowed frozen14-input Mayhem build succeeded with every input unchanged. The same118-function method finds106 entry-bounded/call-consistent matches, versus82 forv1.53 and65 forv1.52. The new multiply leaf is344bytes raw-exact; decimal leaf bodies and their complete200-byte table also match. The already-builtv1.54 Unicode/fmt/multiply bodies do **not** match Relay. No extra Relay build, target execution, VM, stopped-lane work, source/lock/feature/status change, global alias mutation, commit or push occurred.

## Distribution/source inspection before the build

The [officialv1.54 Darwinarm64 archive](https://github.com/anza-xyz/platform-tools/releases/tag/v1.54) is415,708,909bytes, SHA256 `1c8b3af5e8614e1c459393a95c5b19bfbcc8ed13822a1cb539fae68471f9bfbb`, matching the saved official publisher digest. The complete archive was reacquired into scratch. All38 selected compiler/Cargo/dynamic-library/backend/linker/genericV0sysroot files were verified bytewise against the cached installed files, using the same selection asv1.53. Large archives/toolchains/caches/targets are excluded from this packet.

Deduplication was not justified: **32of38 selected files differ**, including rustc_driver, backend and target sysroot archives. Six files match, including rustc/rustdoc loader executables. A matching loader or Rust1.89/LLVM20 label is not equality of the compiled distribution. The complete selected-file comparison is retained with both verified distribution manifests.

The installed version records bind Rustv1.53 commit `7a87f939d96c478029873d3d43f3a4372f484c42` versusv1.54 `daa3af4a1110ec3f10ce08083bb0b7855a88416f`; Cargo and Newlib source IDs are unchanged. The [immutable Rust comparison](https://github.com/anza-xyz/rust/compare/7a87f939d96c478029873d3d43f3a4372f484c42...daa3af4a1110ec3f10ce08083bb0b7855a88416f) contains two commits changing build.sh, the LLVM gitlink and a Nix tool file. The [LLVM comparison](https://github.com/anza-xyz/llvm-project/compare/afb02f33b18a65ab1a18105c4562d3fc25f6e156...7ab1c5c58f2d29bfcd27e27b50f7e68101cdeaa6) contains two commits: LLDB scripts/docs and SBF return lowering/tests. SBF return registers expand R0→R0/R1, and LowerReturn/LowerCallResult permit two results. This is a concrete material backend difference, not an inferred version-string effect. No independent per-change causality experiment was performed.

Immutable generic target base/alias sources are raw-identical betweenv1.53 andv1.54. Their emitted generic target-spec JSON is also exactly equal, including the two aliases withinv1.54. CPU is generic, V0 linker script unchanged, intrinsic V0 features empty in both releases; no CPU/feature override was added. The legacy sbf-name no_std probe again failsE0463 missingcore. That retained failure is setup evidence, not compiler exclusion. The direct supported `sbpf-solana-solana` Cargo recipe follows only after the primary-source/emitted-spec/linker checks. A generic backend sanity object has machine263/flags0.

## Frozen build and artifact integrity

The same14 Rust/Cargo files match the accepted24-handler receipt and measuredv1.53, including lock SHA256 `03c991d636c42f72dda4e72e7aa5344ae8cba80aff672ec601d7176e596049b3`. Source, registry cache, target and RUSTUP_HOME are isolated. The53-file baseline SDK reference map is unchanged; direct Cargo avoids installer/alias changes and does not perform the old driver's post-build syscall validation. Release source features, opt-level3, abort panic, overflow checks, noLTO, one codegen unit, locked/offline resolution and cwd-remap flag remain fixed. The same observedv1.52 strip binary is held constant. Paths and the supported target alias are explicit recipe inputs.

Exactly one frozen Mayhem build succeeded, returncode0,13.06seconds, source/lock unchanged. All142 registry roots positively present in verbose rustc commands have their3,392 files verified against crate archives whose hashes match the frozen lock. No dependency source/version was modified or newly resolved from the network. Host and target compilation commands remain visible in the compressed log.

Candidate:599,784bytes, SHA256 `ca5d4f54b14e2f67c4eca56fcac29b54801906cecf23c463801916fd9d6b6621`. Captured original:777,408bytes, SHA256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. Full-file equality remains false; first difference24. Size/layout and byte-difference totals are diagnostics, not source-completeness percentages or compiler provenance. No candidate promotion or public-status edit is made here.

## Complete monomorphic helpers

The exact same matcher includes118 selected core/alloc/std/hashbrown/builtins functions per release. Candidate function extents come from symbols; captured entries come from direct calls and relocated code pointers. A full match requires the next inferred captured entry at the window end, exact instruction bytes except in-memory normalization of internal-call displacements/loader-relocated immediates, exact relocation offset/type/symbol pattern, and consistency of mapped known callees. Raw equality, ambiguity and unresolved calls/data are retained separately. No executable bytes are normalized or patched on disk.

| Helper | v1.52 | v1.53 | v1.54 |
| --- | --- | --- | --- |
| fmt::write |1000B raw-exact|1000B raw-exact|1000B raw-exact at original678096|
| Unicode is_printable |816B negative|768B match|768B match at690080|
| Unicode check |648B match|648B match|648B match at689432|
| Decimal internal u32 leaf |856B negative|848B negative|776B match at694392|
| Decimal internal u64 leaf |688B negative|688B negative|656B match at695288|
| hashbrown reserve_rehash |4360B negative|4304B negative|4096B match at45368|
| __multi3 |352B negative|352B negative|**344B raw-exact at706432**|
| Six hexadecimal formatters |negative|entry-bounded matches|same positive matches|
| panic_fmt / panic_bounds_check |48/200B controls|same controls|same controls|

| Diagnostic count | v1.52 | v1.53 | v1.54 |
| --- | ---: | ---: | ---: |
| Entry-bounded/call-consistent matches |65|82|106|
| Entry-bounded raw-exact matches |11|13|18|
| Unique inferred-entry matches |32|49|66|
| Complete candidate bodies with no pattern match |51|34|12|

These are selected-function diagnostics, not recovery percentages/confidence or transitive semantic closure. The twelvev1.54 negatives remain in full: eight AccountInfo-array drop monomorphizations, RawVec finish_grow/grow_one, and two Error::type_id bodies. A negative does not prove original source absence; application types/organization, profiles and historical sysroot/recipe choices can matter. The packet does not match a nearest-looking target body by name.

## Actual callee and table closure

The Unicode caller768B and check648B are complete entry-bounded matches with the actual caller→callee edge bound. All six actual table references consume arrays that match raw between captured original, candidate and immutable authentic printable source: NORMAL0(297), SINGLETONS0U(80), SINGLETONS0L(290), NORMAL1(486), SINGLETONS1U(88), SINGLETONS1L(208), total1,449bytes. Their full extents/hashes and addresses are retained.

The newly matched u32/u64 decimal helpers are leaf bodies with no direct calls. Each has four actual references to DEC_DIGITS_LUT. All200bytes of that authentic source table match captured and candidate bytes at every reference. The344-byte multiply leaf has no direct calls or data references and matches raw. These are concrete consumed-data/call discriminators, stronger than aggregate sizes/version labels. The source/table receipts do not uniquely identify a historical compiler or the complete surrounding application.

Other matched bodies retain bounded64-byte pointer-prefix inventories, often unequal, with unproved object extents. Their vtables, diagnostic/source-location descriptors, allocators/destructors and indirect/runtime edges remain open.106 instruction/call-consistent matches do not mean106 complete recursive data or behavior proofs.

## Relay: read-only negative using the same already-built artifact

The Relay capture is freshly hash-bound in `relay-readonly-negative.json` and external-inputs. Its actual Unicode caller is696B `[736464,737160)`, calling its704B check `[735760,736464)`; inferred entries/ends and raw body hashes are checked. All six actual Relay pointers consume the same full1,449 authentic printable-array bytes. Shared tables establish compatible source-family data, not equal compiler lowering.

None of the completev1.54 Mayhem helper bodies for Unicode768B, check648B, fmt::write1000B, decimal leaves776/656B or multiply344B has an instruction/relocation-pattern match anywhere in the captured Relay text. All six negatives are retained; this does not assume Relay usesv1.54. No Relay source was compiled and no extra program build was performed. This measurement leaves Relay's observed lowering unexplained by these stock bodies; it does not exclude every other profile/library/custom-toolchain combination.

## Verification and remaining limits

`python3 -B verify.py` needs only Python's standard library and the existing hash-bound original/v1.52 repository artifacts. The v1.53 comparison artifacts and receipts are included locally, so no large toolchain/cache or separate scratch packet is required. Verification rehashes inputs, checks release/selected-file and target-spec/source differences, the one successful build/dependency/strip receipts, recomputes all three118-helper scans, and freshly checks Unicode/decimal/multiply bodies/tables plus all six Relay negatives and Relay actual callee/array pointers. It uses no network/compiler/solver/VM and writes nothing.

The controlledv1.52/v1.53/v1.54 shortlist now has measurements under documented supported targets for the frozen accepted source. v1.54 is strongest on these selected stock discriminators. Unique historical compiler/distribution identity, original application/lock/macro organization, complete parser/ABI/error/cleanup and transitive data closure, whole-file identity and runtime/SDK acceptance remain unproved. Existing accepted artifacts/status are preserved. No other release or variant sweep was attempted.
