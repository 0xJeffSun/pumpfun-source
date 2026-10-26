# Independent actual Linux v1.48 provenance review

**PASS for the retained provenance evidence**, with the exported-byte/attestation distinction below. No download, compiler, Cargo fetch/build, VM, transaction or target execution was performed by this review. The separate SDK review owns descriptor/code/callee closure.

Saved GitHub run40207765391 is completed/success at `a71de2091f0ab56a4eb2996777f0ecbf51986aa3`, event workflow_dispatch. Artifact12604207171's downloaded ZIP is2,019,422bytes, SHA256 `bc6ab05803118461a09522f1c9cdf4b43232df7ee37652d99a67577a09b00a44`, equal to the saved API digest. All72 ZIP files agree byte-for-byte with the extracted tree and its strict manifest `d576fc96411768fc659c0523d6d0633eba95de15ee87270f9e29cf8183f41e8a`. The exported measurement script is byte-identical to reviewed V2 and Git a71de209, SHA256 `350695dc5eb5d8efdf7b37ec542cc6456b55d28ec4bd4ca2edc73856751b54de`. These are offline checks of saved API receipts, not a fresh hosted-state query.

The measured candidate is501,144bytes, SHA256 `41bb7d4a3fc3ca64bad9fee44be2ee034392a1910f746e12a9c421b0f143cdbb`; unstripped576,520bytes SHA256 `a18bef15fba0415d87982ac693bc83f4813d2adb6e1e0e0bd53797f3da616146`. Every allocated, non-NOBITS section's address and bytes agree before/after strip; header is machine263/flags0. Actual selected current.json still names `e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244`, so this measurement is unselected. No whole-original identity or promotion is established.

## What the exported bytes directly verify

- All23 source/lock files equal the pinned original Relay12 map, plan, fetch-after, build-after and result maps. Release profile remains opt-level3, abort panic, overflow checks, no LTO, one codegen unit.
- Exactly one recorded fetch and one recorded program build are present. The successful build's actual root rustc command is unique and independently re-parsed from the retained verbose log. Cargo uses `--release --target sbf-solana-solana --locked --offline --verbose`; actual root flags preserve opt-level3/panic/codegen/overflow settings and the sole empty cwd-remap flag, without target CPU/features/LTO overrides. Private tool/cache/target/RUSTUP paths and the explicit credential-free build environment are retained.
- Compile and strip process receipts both return0; every decompressed log matches its receipt hash. No anchored backend Error line appears under the reviewed diagnostic parser. This is not general stack safety, loader acceptance or runtime readiness.
- Stock capability output has generic CPU, `+store-imm,+jmp-ext`, Solana family and no dynamic-frames. Capability print cfg is a standalone print invocation; its incidental debug_assertions is not asserted as the release build's complete cfg. The actual root build flags are checked separately.
- Recorded host is Ubuntu24.04 x86_64. Native compiler output says Rust1.84.1-dev/LLVM19.1.7 with **commit-hash/date unknown**. Exact Rust293a source identity comes from the reviewed script's version.md content assertion and its member-hash receipt, not an independently reported rustc commit. The version.md bytes are not exported.
- Actual rustc command lines positively identify151 registry roots, covering3,405 authenticated source-member records. These are Linux counts, not Darwin's152/3,857. The member count does not prove each individual source file was opened by rustc. Host/proc-macro and target command lines remain visible; these counts are not a target-only dependency inventory.

## Integrity receipts whose full bytes are not exported

| Recorded acquisition | Bytes | Recorded archive SHA256 | Publisher qualification |
|---|---:|---|---|
|Official v1.48 Linux compiler/sysroot asset254652416|516,334,851|a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597|Saved official API digest is null; measured official-origin archive/member seal|
|Official v1.52 Linux strip-role asset310634197|519,270,959|8b3861e93daf085ec12b65c4fac374d9bec4587a3de16871da6b08ab0c1d907e|Recorded measured hash equals the pinned saved official publisher digest|

All232 locked registry archive checksums and all7,607 original sealed member maps agree with the run's before/after authentication attestations; both full authentication records are identical. The current review rehashes exported source and receipts and checks the canonical member-map inventory hashes. It **cannot freshly rehash the232 archives/extracted cache**, which were deliberately excluded from publication. Source-map equality proves the exported source corresponds to the frozen inputs; the claim it was used unchanged during compilation additionally relies on the authenticated runner script/log/receipts.

The compiler has61 selected member hash records, including25 legacy-target sysroot records; before/after tool maps agree. The strip executable's selected-member record is bound separately to the v1.52 archive receipt. Those tools, sysroots, complete extraction member inventory and archives are not exported; local verification checks saved integrity relationships, not actual binary bytes against archive members. Native libc/glibc/system linker/loader and other host system-library closure remain unproved. Linux compiler/host and strip bytes differ from the Darwin control; this is not the same complete build recipe or proof of the historical uploader OS/compiler.

The reviewed script preserves one-attempt labels and reads captured target bytes only after compilation, strip and provenance gates succeed. This ordering is supported by the authenticated script plus recorded successful stages; the exported evidence is not a complete independent process/file-access trace. Failure paths were source-tested earlier; this actual artifact reports a successful measurement.

## Recheck and stopping point

`python3 -B verify.py --repo /path/to/pr8-review --download /path/to/relay-linux-v148-downloaded` repeats saved-byte/receipt checks and compares the saved review summary. It uses Python standard library and read-only `git show` for the already retained a71de209 script; no native compiler is invoked. `input-references.json` binds77 actual input files using stable repo/download-relative keys. Current-selection observation is intentionally checked and will fail if a later authorized selection changes.

This note retains the successful measurement and its limits. It does not claim runtime acceptance, source completeness, original ABI/data equivalence, publisher authentication unavailable for v1.48, an exhaustive compiler process trace or a unique historical build.
