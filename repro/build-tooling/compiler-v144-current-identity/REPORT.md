# Current v1.44 toolchain file identity audit

The seven prior tool-pin entries cover only six unique binary paths, of which three are inside the current v1.44 tree. This audit now records the complete current tree: **2,773 regular files, 1,286,107,104 logical regular-file bytes,523 directories and12 symlinks**. It adds hashes for2,770 in-tree regular files beyond those three executable pins. Every symlink resolves inside this tree; none was followed for directory traversal. No large binaries are copied into this packet.

This is a **current, after-the-fact filesystem observation**. Tree membership, modes, sizes and timestamps were stable across the hashing pass, and regular-file open/fstat/lstat checks guarded each read. It does not retroactively establish what was present before or after an earlier build, which sysroot objects were consumed, the actual loaded-library set, or the historical compiler provenance. File hashes identify these current bytes; they do not identify their original authorship or compilation recipe.

## Newly accounted files and library choices

The inventory contains151 `.rlib` files,10 static `.a` archives and four regular `.dylib` files. The host `aarch64-apple-darwin` rustlib contains26 rlibs, while each of `sbf-solana-solana`, `sbpf-solana-solana`, `sbpfv1-solana-solana`, `sbpfv2-solana-solana` and `sbpfv3-solana-solana` contains25. Host+five target variants of alloc, core, std, compiler_builtins and panic_abort each have six distinct hashes. `selected-sysroot-library-identities.json` records their paths, sizes and hashes. Presence and differing hashes do not prove which target or compilation units a particular build selected.

The prior tool availability record's53 SDK source hashes cover a separate SDK directory outside this toolchain. They do not cover these sysroot rlibs, compiler driver libraries, LLVM headers/resources, newlib/static libraries, installed Rust library sources or aliases. Their original53 hash bindings remain unchanged; this task does not reclassify them as a full compiler/sysroot witness. The original build plan, availability record and expected seven binary pins are retained as small authenticated controls, with no plan mutation.

## Selected Mach-O direct dependencies

Only `/usr/bin/otool -L` and `-l` inspected the six selected Mach-O files. All12 queries returned0, with raw stdout/stderr, command, input hash and stream hashes retained. No selected rustc, Cargo, LLVM linker, stripper, rustup launcher, cargo-build-sbf, SDK script, compiler, target program or VM was invoked.

Rustc directly declares two `@rpath` dependencies. Its recorded `@loader_path/../lib` RPATH resolves them to current in-tree files:

- `rust/lib/librustc_driver-63688e61c348922a.dylib`, SHA256 `43b6c3043522f23b9b1538be80cc5f16ac376cfa11ce0bfb42502479d5dda1ba`.
- `rust/lib/libstd-0775ac532004e171.dylib`, SHA256 `cd82c3e583d091abf8eb1eef55e64ed338639c5bd35db82e40ee39d8788adcf1`.

These two libraries were outside the earlier seven tool-pin entries and are now file-hash accounted. The inventory also contains a separate target-host libstd dylib with another hash and the LLDB library; mere presence does not prove either was loaded by the selected build. This review does not recursively inspect dylib load commands or determine runtime dlopen behavior.

The six tools collectively name11 distinct direct dependencies, nine under `/usr/lib` or `/System/Library`. Those system references are marked **dyld shared-cache/system resolution unobserved**, not missing merely because no standalone file was hashed. `@rpath` analysis is a current declared search candidate, not a loader trace; environment, interposition, inherited loader context and transitive resolution remain open. Otool's printed compatibility/current version fields are load-command metadata, not measurements of libraries actually loaded on this machine.

The selected v1.52 objcopy and v1.44 linker declare different libc++ load-command current versions (1900.180.0 and1700.255.5). This is an observed metadata difference between separately pinned host tools, not proof that a historical program used the wrong Rust version. Current v1.44 `version.md` records Rust repository commit08b7341888ab480dfaaa0698300cbbbbb2d75b53, Cargo804e325435de2e669e3833b7abab018a99113b16 and newlibf0f8003daa3f71a1a3e2f067f8d5bb46e2756514. Those claims are copied verbatim and hash-bound; their repository/release provenance is not independently authenticated here. No rustc/LLVM version command was run. Filenames such as clang-18 and liblldb.18.1.7-rust-dev are names, not independent semantic-version proofs.

## Remaining origin and provenance gaps

A future full toolchain witness can attest these explicit file hashes before and after an actual build. This packet cannot replace that evidence or its actual compiler/strip exit, source, crate-unit, flags, target and environment receipts. Full host dynamic-loader closure, system shared cache, transitive/dlopen dependencies, linker/sysroot use, external launch configuration and historical release/source provenance remain open. Ownership, ACLs and extended attributes are not a complete filesystem-identity claim.

Parent-supplied current Rust documentation adds a separate source-origin hypothesis: [`file!`](https://doc.rust-lang.org/std/macro.file.html) and [`--remap-path-prefix`](https://doc.rust-lang.org/rustc/command-line-arguments.html#--remap-path-prefix-remap-source-paths-in-output) describe dependence on source input/module paths, working directory and remapping. The [Cargo workspace documentation](https://doc.rust-lang.org/cargo/reference/workspaces.html) describes shared root lock/target/profile behavior. These are current documentation references, not evidence of option behavior in the historical Rust fork; the parent could not retrieve the1.79-versioned page. The parent's separate new-candidate origin at src/admin_cto.rs174 differs from the original collector path/line198. Missing module/source layout, build input paths, workspace/working directory, remaps and formatting are hypotheses to preserve. A path prefix or differing line alone cannot prove compiler/workspace version. No new compiler probe, remap, artificial coordinates, padding or build was attempted here.

## Replay and scope

Run `python -B verify.py --expected-seal <manifest SHA256>` for passive inventory/artifact and load-command interpretation replay. Add `--check-current-files` to rehash the explicitly recorded current tree and seven selected file pins; this executes no selected binary. No original contract capture, ELF/body/parser, SDK or network is accessed. The default offline replay checks retained hash witnesses, not absent1.28GB binary payloads.

An initial `otool -h` without a file printed usage and returned1; `preflight-notes.json` explicitly labels its author summary rather than a raw receipt. Subsequent scoped metadata commands have complete raw receipts. The metadata utility's `/usr/bin/otool` frontend hash is retained; the complete Xcode backend/runtime identity is not closed. No original build receipt, selected artifact, source, workflow, configuration or status was modified.
