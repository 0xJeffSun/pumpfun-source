# Relay nearest stock v1.47 compiler-family measurement

The single successful frozen Fees16 build with official platform-tools v1.47 closes the previously unexplained Relay library signatures: **complete `core::fmt::write` is 1,128 bytes raw-exact; the actual Unicode 696→704-byte pair matches completely under the defined call/relocation method; its full 1,449 table bytes and actual slice extents agree; and the 72→352-byte multiply chain is resolved.** These are materially stronger stock-family discriminators than headers, paths or size. They do not identify a unique historical compiler or reproduce the Relay whole file.

No other release, source/profile/feature variant or subsequent compiler experiment was performed. One earlier Cargo invocation failed offline-cache setup before emitting any rustc program command; that failure is retained separately. No Relay reconstruction, accepted artifact, lock/source, status, global alias, VM, deployment or stopped lane was changed or executed.

## Official source precheck and distribution provenance

The bounded research inspected only nearest previously unmeasured [official v1.47 release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.47). Release 212271860/tag commit `ca00504df4977ac1c4c86c3e3b74201f45b94a59` identifies Rust 1.84.1/LLVM 19. The immutable Rust tag resolves to `89fb68fd3298a1c6998337b891f975eb60b8a4e4`; its LLVM gitlink is `176f4c210ee2e2961265b2335f4c296ea6840e1d`. Exact source files and hashes/URLs are retained in `primary-source/receipts.json`.

Before building, authentic Rust printable source supplied all six arrays matching Relay at their full 1,449 bytes; `library/core/src/slice/sort/stable/quicksort.rs` exists in this revision, consistent with the captured path family. LLVM's immutable calling-convention/lowering sources still assign the single R0 return and reject more than one result, compatible with investigating the previously closed old multiply ABI. Compatibility justified a single measurement; no version-string match predicted body identity.

The official Darwin arm64 asset 246334619 is 422,159,112 bytes, downloaded from its saved GitHub release URL over HTTPS. Its measured SHA-256 is `46c316ddfe3a6fe3027dc923ed288e4d85a3cfb19888eb506894bd74231c29f9`. **The publisher supplies no asset digest in the saved API (`null`).** This is official-origin acquisition with a measured seal, not an independently signed or publisher-checksum-verified binary. That limitation is explicit rather than silently converting our measured hash into a publisher assertion.

Fresh extraction was isolated under scratch. Sixty selected executable/backend/dynamic-library/linker and both alias sysroot files were byte-bound to actual archive members, including all 25 files in the selected legacy V0 sysroot. `version.md` binds the exact Rust source above, Cargo `12fe57a9d229b236a595ca14f8946da5833e1fd2` and Newlib `f0f8003daa3f71a1a3e2f067f8d5bb46e2756514`. Compiler rustc1.84.1-dev/LLVM 19.1.7 and actual compiler/Cargo hashes are saved in the build receipt. The large archive, toolchain, registry cache and target directories are excluded from this small publication.

## Target capability and frozen recipe

Both immutable alias sources choose generic V0; emitted `sbf-solana-solana` and `sbpf-solana-solana` target-spec JSON are equal. The stock V0 feature string remains `+store-imm,+jmp-ext`; no CPU/feature override was added. The V0 linker script is raw-identical to retained v1.46.1, SHA-256 `5e8370b9380f55411d827721e2e43c8cfd1eac71d1383e20b938397bc0bd82c3`. A stock generic backend object has machine 263, flags 0.

Unlike v1.46.1, this release's legacy `sbf-solana-solana` no_std capability probe succeeds. No target-name adaptation was needed, so the original legacy target name was preserved. The alias sysroot file maps differ despite equal source/spec aliases; both are retained as unequal distribution inputs, and no byte-equivalence is claimed. Only the legacy sysroot was selected for the controlled graph build.

All 11 source/Cargo inputs match the identical frozen Fees16 graph used by v1.43–v1.46.1, including lock SHA-256 `7e895a83d26940404a7fc0769d7c7115e3a44bdca5aaf3cfda156b23f2bf13fc`. Release profile remains opt-level 3, panic abort, overflow checks, no LTO and one codegen unit. Default feature declarations and locked dependencies are unchanged. The actual verbose target command confirms those settings. The 53-file baseline SDK map remains an observed receipt input; direct selected Cargo does not run the old driver's installer, global alias updates or post-build syscall validation. The same observed v1.52 strip tool/hash as the retained v1.46.1 recipe is held constant.

Cargo/rustc are invoked directly from the isolated official distribution with `--release --target sbf-solana-solana --locked --offline --verbose`; the retained cwd-remap flag is unchanged. CARGO_HOME, target and RUSTUP_HOME are isolated. Paths and direct invocation are explicit recipe inputs, not hidden equivalence claims about the historical application build.

## Setup failure and the one successful program build

The initial cache copy used modern Cargo's `1949cf8c6b5b557f` namespace. Cargo 1.84 instead looked in `6f17d22bba15001f` and stopped with offline ahash-download failure, return 101, before compilation. `build-01/` retains the complete source-before/after hashes, command and compressed log; there are no `Running` rustc commands or `Compiling` lines. This is setup failure, not compiler-family exclusion.

The correction copied byte-identical verified registry archives and source trees into that isolated legacy namespace. No source, lock, version, registry selection, feature or profile changed. The identical frozen recipe then used a fresh target directory in `build-02/` and succeeded in 14.67 seconds. This is the only successful program build. Source hashes are unchanged. Both commands/outputs, cache correction and preparation failures are retained. Two earlier parser assumptions—an omitted generic-CPU JSON key and raw alias sysroot equality—were corrected before any program build and are separately labeled preparation failures.

All 201 frozen-lock registry archives/source roots, 7,075 files, were verified before building. After the successful build, exactly 144 registry roots positively present in verbose rustc commands were rechecked against authentic crate archives matching the frozen lock: 3,778 files, no extra source beyond Cargo extraction/checksum markers. `compiled-dependency-checks.json` is linked to the exact root set from the saved gzip log by the portable verifier.

The stripped frozen Fees-graph artifact is 448,312 bytes, SHA-256 `64e611c95cfc2682428ab0ae9f00212124ecd86116bf5f84989607d69a926a42`. It is a compiler-family test graph, not reconstructed Relay. The Relay payload remains 830,448 bytes, SHA-256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. Whole-file equality is false. These sizes are not missing-source percentages or compiler-version proofs.

## Complete-function comparison

The same full-helper method is recomputed against the captured Relay and all seven retained controls. Candidate bounds come from unstripped symbols; target bounds from direct calls/relocated code pointers plus the exact next inferred entry. Stripped/unstripped text is checked equal. Only internal-call and loader-relocated immediate bytes are masked in memory; all other instructions and exact relocation offset/type/symbol patterns remain. Unique identified callee checks reject lookalikes. Unresolved callees and data prefixes are visible. No executable is rewritten.

| Stock recipe | Graph | Selected library-named bodies | Bounded/call-consistent | Bounded raw-exact |
|---|---|---:|---:|---:|
|v1.43|Fees16|109|23|3|
|v1.44|Fees16|109|41|8|
|v1.45/v1.46/v1.46.1|Fees16|125|60|16|
|v1.47|Fees16|127|118|31|
|v1.52/v1.53|Mayhem24|118|39|5|

These are descriptive counts of selected emitted bodies, including graph-dependent monomorphizations; they are not fair cross-graph rankings, confidence scores or recovery percentages. Entry inference is not proof that every possible target entry is known. A mapped-callee subset does not automatically close unresolved calls or transitive behavior.

The nine v1.47 complete pattern negatives are retained: std::io::Error::new, std::io::ErrorKind::as_str, two Fees-specific context drop bodies, two RawVec::grow_one monomorphizations and three Error::type_id bodies. No nearest-looking target body is assigned to these names. Negatives do not imply source absence or exclude arbitrary other profiles/custom sysroots. The six 32-byte hex wrappers retain two ambiguous pattern windows each and unresolved formatter callees; they are not promoted to complete recursive formatter proofs.

## Named code, callee and full-data evidence

`core::fmt::write` matches Relay `[721496,722624)` raw-exact, 1,128 bytes, with complete target entry/end. This concrete positive replaces the earlier all-stock fmt negative. It establishes raw code identity, not the dynamic formatter/vtable/input-data graph.

The candidate Unicode 696-byte consumer matches Relay `[736464,737160)`, and its actual call at offset 288 maps to the complete 704-byte check `[735760,736464)`. All six actual relocated operands bind authentic source arrays and candidate/target bytes: NORMAL0(297), SINGLETONS0U(80), SINGLETONS0L(290), NORMAL1(486), SINGLETONS1U(88), SINGLETONS1L(208). All 1,449 bytes match raw.

`extent_links.py` independently decodes both actual target and candidate caller/callee arguments. Normal pointer/byte length and lower byte length bind through the exact frame slots; upper count 44/40 is multiplied by tuple stride 2 to give 88/80 bytes. Normal 486/297 and lower 208/290 lengths bind the full source arrays, with byte-loop/end checks retained. This proves full extents are passed and used by bounded iteration, not that every byte is read for a particular character or that the whole runtime algorithm is verified.

Both check bodies' two diagnostic records decode to the same 29-byte `core/src/unicode/printable.rs` path and source positions 10:43, 26:54. Actual 24-byte pointer/length/line/column-shaped records and full path bytes are retained; pointers/placement differ, so raw record identity is not claimed. This agrees with Relay's path representation that differed from the newer v1.53 library/path-plus-NUL record.

The check's two 8-byte onward call thunks, omitted by the main method's 16-byte minimum, are separately bounded, instruction/relocation-checked and linked to their actual complete onward helper bodies. The unwrap-failed edge is also a mapped known callee in the complete check result. These extra links do not close all diagnostic/vtable/indirect/panic behavior; those limits remain explicit.

The internal multiply body is 352 bytes raw-exact at Relay `[751104,751456)`, with no direct calls, global LDDW references or relocations. Its 72-byte `__multi3` wrapper has pattern windows at 752152,752616,752688; only 752688 calls the independently exact 352-byte body. The other two fail the actual callee constraint and remain rejected. This closes the old multiply pair alongside the new fmt/Unicode positives under the same stock recipe.

## Conclusion and portable verification

Nearest unmeasured stock v1.47 now explains the previously unaccounted Relay fmt/Unicode/multiply library signatures under this one frozen recipe. The measured source/compiler/sysroot family is stronger evidence than the prior path/header inference. No unique historical release claim follows: unmeasured intermediate releases, custom builds, original profiles/sysroots/dependencies and application organization remain possible. Original whole-file source/ABI/parser/error/cleanup/data identity and runtime/SDK acceptance remain unproved. No further experiment is launched by this result.

Run `python3 -B <publication>/verify.py` within a repository layout retaining its hash-bound control artifacts and Relay capture. The verifier needs only Python's standard library, not a toolchain/archive/cache/network/VM. It rehashes all saved and external inputs, exact frozen 11 files, setup-vs-success receipts, official metadata and selected distribution/source records, emitted target facts, actual compiled registry roots, full-helper scans, named code/callee/data/argument links and all nine negatives. Historical setup/build scripts are retained as receipts, not invoked by verification. The absent publisher checksum remains an explicit provenance limitation.
