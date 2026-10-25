# Frozen actual Relay build12 with stock v1.47

The one authorized frozen 23-input Relay12 measurement emitted an ELF with Cargo return 0 and fixed strip return 0, but **the backend printed two stack-limit diagnostics and the linked artifact contains a complete 608-byte driftsort helper with direct r10 offset −4112**. Successful process exits do not establish execution readiness. No runtime/SDK validation, accepted-artifact promotion or retry occurred; no all-state fault is asserted for an unexecuted path.

The unchanged actual source graph also reproduces the previously measured v1.47 library fingerprint: raw-exact 1,128-byte fmt::write, full 696→704-byte Unicode code/callee pair with 1,449 table bytes and actual slice extents, and the resolved 72→352-byte multiply chain. Whole captured Relay identity remains false. Source, dependency and compiler provenance claims are limited below; library code identity is not whole-program behavior or historical source identification.

## Exact frozen source and recipe preflight

The source is exclusively `repro/donation-relay/source-build-12-idl-discriminator-owned/source/`: 23 Rust/Cargo files, rehashed against both the sealed launcher map and the original attempt's source receipt before copying. It is not the current reconstruction checkout or typed-borrow proposal. Cargo.lock remains SHA-256 `6b6eff65b850f732b7420bf438c01056557ce4d9d3dc96109ac2174f9b7f825d`; all 23 input bytes remain identical after compilation.

The baseline's explicit standalone workspace and release profile are retained: default opt-level 3, abort panic, overflow checks, no LTO and one codegen unit. No feature declaration, source, version, lock or profile override was added. The original driver injects the same retained `-Zremap-cwd-prefix=` flag and uses the legacy `sbf-solana-solana` target; the selected v1.47 legacy capability already works, so no target-name adaptation was needed. The actual verbose command confirms the release settings and absence of CPU/target-feature CLI overrides.

The source's two direct dependencies remain exactly solana-program 2.2.1 and spl-token-2022 6.0.0 with its original no-entrypoint feature. All 232 frozen crates.io registry packages were available from the original sealed attempt's offline cache. Before building, every archive checksum and every source member was checked against Cargo.lock and the original build12 sealed archive/member maps: 7,607 files. Identical authenticated cache roots were copied into both Cargo namespaces inside this measurement; no network, installation or resolution sweep occurred.

## Selected compiler, isolation and strip phase

The selected distribution is the existing isolated official v1.47 Darwinarm64 asset from the immediately preceding bounded compiler audit. Archive measured SHA-256 `46c316ddfe3a6fe3027dc923ed288e4d85a3cfb19888eb506894bd74231c29f9`, size 422,159,112, Rust tag `89fb68fd3298a1c6998337b891f975eb60b8a4e4`, rustc 1.84.1-dev/LLVM 19.1.7 are retained. The official release provides no publisher asset digest; this is an official-origin measured archive seal, not independently publisher-checksum-verified binary identity.

All 60 selected compiler/runtime/backend/linker/sysroot bindings were rehashed before and after this measurement. Four CC/AR/objdump/objcopy bindings were additionally checked bytewise against their actual archive members, including clang-19. Actual genericV0 target facts remain machine 263, flags 0, intrinsic `+store-imm,+jmp-ext`; no features were overridden. The prior alias specs are equal but alias sysroot artifact maps differ; this measurement selects the supported legacy sysroot and does not call the alias bytes interchangeable.

Direct selected Cargo/rustc received a private CARGO_HOME, clean target directory and RUSTUP_HOME. A neutral temporary cwd, as in the historical launcher, avoids ancestor repository Cargo configs. No global Solana alias was readjusted. The same original v1.52 llvm-objcopy strip path/hash `12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be` was preserved.

This direct compiler adapter intentionally bypasses the old cargo-build-sbf install/alias and SDK post-build validation path. It is compiler measurement, not proof of SDK or runtime acceptance. Captured executable bytes are first read after successful compilation and strip, solely for comparison. Source and compiler inputs contain no captured binary bytes, metadata substitution or source-coordinate fabrication.

## Actual attempt and integrity checks

Exactly one clean program build was invoked. It completed in 13.28 seconds with Cargo return 0; strip separately returned0. There was no cache-setup/MSRV failure or second attempt. The diagnostics below were not repaired by changing profile, features, source or toolchain.

Post-build authentication rechecks all 232 original sealed registry source roots against their locked authentic archives, preserving all 7,607 source members. The exact positively observed compiled root set from the saved verbose log is 152 packages/3,857 source files; host and target invocations remain distinct in the log. Cargo-generated markers are excluded from source member equality. Tool and source before/after hashes agree.

| Artifact | Bytes | SHA-256 |
|---|---:|---|
|Captured Relay allocation|830,448|`367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`|
|Sealed source-build12/v1.44|473,264|`6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e`|
|Frozen same23 inputs/v1.47|501,144|`a6244e332aa2dcfdad3c27852e8c9542ac2c94b33371a71802d538cadf52face`|
|v1.47 unstripped symbols|576,512|`8330a56590851c4ca3fa5815112894f57c3b5c90652bf62cc82009a930a7ac0b`|

The new candidate differs from target starting at file offset 24, with 274,298 differing shared-length positions and 329,304 target excess bytes. The old checkpoint had 259,066 differing shared positions and 357,184 excess bytes. Changing layout and compared length make those positional totals unsuitable as a monotone recovery score. No size ratio or source-completeness percentage is asserted; no allocation padding was generated.

## Retained stack diagnostics and complete static witness

The saved combined Cargo log, uncompressed SHA-256 in the build receipt, contains exactly these two anchored backend diagnostic lines:

```text
Error: Function _ZN4core5slice4sort6stable14driftsort_main17hc815ec0327603b29E Stack offset of 4104 exceeded max offset of 4096 by 8 bytes, please minimize large stack variables. Estimated function frame size: 4160 bytes. Exceeding the maximum stack offset may cause undefined behavior during execution.
Error: Function _ZN4core5slice4sort6stable14driftsort_main17hed0244183bd693fbE Stack offset of 4104 exceeded max offset of 4096 by 8 bytes, please minimize large stack variables. Estimated function frame size: 4160 bytes. Exceeding the maximum stack offset may cause undefined behavior during execution.
```

`stack-diagnostics.json` retains both exact lines, the log hash and actual linked instruction witnesses. The second named function is the complete symbol/entry-bounded candidate window `[10224,10832)`, 608 bytes, with minimum direct r10 offset −4112. Its bytes match the unstripped symbol window; exact raw operands and decoded r10-relative instructions are recorded. `diagnose_stack.py` recomputes this from the actual ELF and saved full ledger, and re-extracts both diagnostics from the saved compressed log.

Direct frame observations do not infer alias-derived accesses or the combined call stack. No path using this helper was executed, so this packet does not assert a fault for every state or a universal runtime result. The diagnostics/static operand are sufficient to withhold readiness or promotion; no VM or SDK verifier was invoked to paper over the limit.

## Library signatures and remaining negative matches

The existing complete-helper method uses candidate symbol bounds, inferred target entries and exact next entry, exact relocation offset/type/symbol patterns, and instruction equality except masked internal-call/loader-relocation immediate fields in memory. Known mapped callees are checked; unresolved calls/data prefixes and ambiguity remain explicit. Raw equality is retained separately. No executable is edited.

|Same frozen 23-source recipe|Selected library-named bodies|Bounded/call-consistent|Bounded raw-exact|
|---|---:|---:|---:|
|Original v1.44 checkpoint|98|33|5|
|One v1.47 measurement|120|106|25|

These are descriptive emitted-body inventories; compiler/library changes affect the denominator. They are not percentages, confidence, unique-source matches or recursive behavior proofs. Thirteen v1.47 bodies have no complete pattern match: std::io::Error::new, four source-specific drop bodies, Error::type_id, driftsort_main, RawVec::grow_one, DebugInner::entry_with, DebugList::finish, debug_struct_field3_finish, debug_struct_field5_finish and debug_list. The emitted driftsort negative is also the linked static stack witness. A Debug-u32 shape has apparent windows but none satisfying complete bounds and mapped callee constraints; all rejections are retained.

The key new library positives survive in the actual Relay12 graph:

- fmt::write is raw-exact 1,128 bytes at target 721496.
- Unicode consumer 696→check 704 maps target 736464→735760 with the actual offset 288 call. All six arrays match authentic v1.47 source, candidate and target at all 1,449 bytes. Both candidate and target slice/tuple arguments pass the complete extents with verified tuple stride 2. Diagnostic records share the full 29-byte path and positions 10:43/26:54; pointer/placement bytes differ, so raw record identity is not claimed.
- Two 8-byte check-call thunks and their actual complete onward helper bodies are separately linked. Downstream panic/indirect/input-data closure remains unproved.
- Internal multiply is raw-exact 352 bytes at 751104, with no direct calls/global data references. Only 72-byte wrapper 752688 calls it; two other normalized lookalikes fail the actual callee check.

These establish the measured library/source-compiler family under the retained recipe, not historical compiler uniqueness or correctness of the reconstructed application/error graph.

## Same-method full-program ledgers

The exact sealed build12 analysis code is copied byte-identically and run with an explicit read-only map to the new artifacts and original 492 windows. It checks full text coverage, all allocated stripped/unstripped section equality, complete function ledgers, call-shape fixed point, data-prefix inventories, sections and whole-file residuals. The resulting candidate has 344 symbol windows, with no coverage gaps.

The original checkpoint had 33 raw/122 normalized matched target windows and 370 unmatched. The same method on v1.47 records 59 raw/224 normalized matches and 268 unmatched out of 492 original windows; 455 pattern pairs/306 recursive call-shape fixed-point pairs remain nonunique. Those normalized/full-ledger observations do not prove relocation-data objects, runtime ABI, indirect calls, semantics or historical source. `full-ledger/` retains complete witnesses and residuals; whole-file identity is still false.

## Supplement to the initial Fees-graph v1.47 packet

The initial frozen Fees16/11-input v1.47 measurement also had one anchored driftsort_main4104>4096/frame4160 diagnostic despite Cargo return 0. The earlier library-only report omitted that diagnostic; this supplement records it without altering the original sealed packet or claiming that an artifact was accepted or runtime-validated.

Exact saved reference: `repro/identity-audit/2026-10-25/relay-v147/build-02/build.log.gz`. Compressed SHA-256 `957a913ab916091b427efeb9f43b18e184144798e1a5244161f2f29778947ee7`; uncompressed log SHA-256 `9926af8e0c432b95c5fe92ce81d49e792e597f105679cf32b18bde4dd7504867`. The actual line is:

```text
Error: Function _ZN4core5slice4sort6stable14driftsort_main17h2c4587c6d659f2d2E Stack offset of 4104 exceeded max offset of 4096 by 8 bytes, please minimize large stack variables. Estimated function frame size: 4160 bytes. Exceeding the maximum stack offset may cause undefined behavior during execution.
```

`initial-fees147-stack-supplement.json` and an exact copy of that compressed log bind the published log and successful-process receipt. The portable verifier re-extracts the single diagnostic and checks both hashes. This corrects interpretation of successful process exits; library matches never established executable readiness.

## Portable verification and stopping point

Run `python3 -B <publication>/verify.py` in a repository copy retaining the hash-bound build12 checkpoint, Relay capture and published initial v1.47 log/receipt. Python's standard library suffices. Verification rehashes all 23 inputs, build/strip returns, tool records, all original dependency member maps, compiled root set, helper/code/callee/data/argument links, exact full-program analysis, both actual-source diagnostics and the complete −4112 linked witness, plus the initial Fees-log supplement. It uses no compiler, cache, network, SDK, VM or target execution.

This measurement stops here. No source/profile/feature/lock/toolchain repair, second build, runtime experiment or accepted/default/status promotion is authorized or performed. Program readiness, whole Relay identity, historical source/organization and complete error/cleanup/data closure remain unresolved.
