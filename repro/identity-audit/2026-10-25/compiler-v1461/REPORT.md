# Controlled v1.46.1 compiler discriminator

The previously unmeasured platform-tools v1.46.1 release is now tested on the same frozen sixteen-handler Fees source and lock. It does **not** improve the target runtime-helper matches over measured v1.46. v1.44 remains the strongest measured stock compiler candidate; a unique historical compiler is still unproved.

## Official distribution and source identity

The isolated Darwin arm64 asset is 372,707,817 bytes. Its SHA-256 `b8764fbd1cd2c7e99011f7b1ac645e1a6eb9313d3356c44ec7a2d46c4b340f5a` matches the official release API's publisher digest. The download, release/asset IDs, source snapshots and full-file hashes are retained. The 1.2 GB extracted toolchain and original archive remain in scratch, not this publication; `selected-distribution-manifest.json` records selected executables and all target rlibs for independent reacquisition.

- [Official v1.46.1 release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.46.1).
- [Immutable Rust comparison](https://github.com/anza-xyz/rust/compare/71b42e201d6e2e8a26d8a42e447c846809c84797...71e82b8fbf1c50edc2cb1bf711b1d5b15a2c7278): two commits change the compiler linker/metadata implementation, target spec and packaging. Bootstrap config is identical to v1.46.
- [Immutable LLVM comparison](https://github.com/anza-xyz/llvm-project/compare/d735770352aec84c81e66648967e211fe50c41a2...cbb576f77b6a78683af1d7540b8541429eef2ac1): 32 commits include SBF code generation and linker changes. Therefore this is not an unchanged compiler/sysroot despite the same Rust 1.79 / LLVM18 version labels.
- Cargo and Newlib source commit IDs are unchanged. Nevertheless the release executables and all 25 matched SBPF-target rlib archives differ bytewise from the installed v1.46 distribution; identical source version strings are not binary identity.

## Legacy target setup and the explicit adaptation

The release intentionally stops shipping `rustlib/sbf-solana-solana`. A minimal `no_std` compilation using that legacy name fails E0463, missing `core`. This is a **setup result**, not exclusion of v1.46.1 as a possible target compiler.

One controlled Fees source build then used the release's supported `sbpf-solana-solana` target via its direct Cargo/rustc executables. The immutable source maps the old alias and new alias to the same `sbf_target("v0")`, generic CPU and the unchanged V0 linker script. A fresh backend object confirms `(e_machine,e_flags)=(263,0)` before the build. The target alias and direct invocation are explicit additional recipe inputs, so this is **not** falsely described as an unchanged old-driver invocation.

All 11 Rust/Cargo inputs equal the retained v1.46 controlled source after removing only the old scratch path prefix; the Cargo.lock SHA is `7e895a83d26940404a7fc0769d7c7115e3a44bdca5aaf3cfda156b23f2bf13fc`. No source, dependency version, profile or feature was changed. The retained 53-file SDK map is exact. The invocation keeps `-Zremap-cwd-prefix=`, panic abort, overflow checks, opt-level3, no LTO and one codegen unit; it runs `--locked --offline` in a clean target directory with the existing isolated checksum-verified Cargo cache. No global toolchain alias or shared source was changed. The post-compile strip executable is the same observed v1.52 llvm-objcopy generation used by that retained Darwin SDK pipeline and is independently hashed.

The only frozen source build succeeded, returncode0, source unchanged. Candidate size396,096 bytes; SHA-256 `b77515ed9fccd6ec4eac91c04c8aea23350a322769b5fb3a5e2e347771f0dd79`. Captured payload equality is false, first difference24. Raw output size/layout is not used as compiler identification.

## Complete monomorphic helpers

The read-only matcher infers target function entries from calls/relocated pointers, matches **full** candidate function bodies, preserves all instruction bytes except loader-relocation immediates and internal-call destinations in its in-memory analysis view, and requires relocation offset/type/symbol agreement. Candidate stripped/unstripped `.text` identity is verified. No normalized representation is written to any executable.

| Helper | Captured / v1.44 | v1.46 | v1.46.1 adapted build |
|---|---|---|---|
| `core::fmt::write` | 1056-byte whole body, v1.44 raw-identical | 1160 bytes, no match | 1160 bytes, no match |
| `__multi3` | 352-byte entry, v1.44 raw-identical | 72-byte wrapper, no match | 72-byte wrapper, no match |
| internal 352-byte multiply | target matches v1.44 entry | differs at instruction offsets328/336 | same two negative offsets328/336 |
| Unicode `is_printable` | 872-byte v1.44 match | 752 bytes, no match | 752 bytes, no match |
| decimal `fmt_u64` | 680-byte v1.44 match | no match | no match |
| `panic_fmt` | 80-byte match after allowed analysis masking | match | match |
| `panic_bounds_check` | 200-byte match after allowed analysis masking | match | match |

The full selected core/alloc/builtins scan produces exactly the same aggregate counts for v1.46 and v1.46.1:112 functions,64 entry-bounded/call-consistent matches,14 entry-bounded raw-exact matches. The retained v1.44 run has97 functions,94 entry-bounded/call-consistent and22 raw-exact. These are descriptive diagnostics with changing denominators, not source-recovery percentages or statistical confidence.

The negative fmt/multiply/Unicode bodies together are stronger discriminators than either shared panic controls or aggregate ELF size. Their outcome closes the **missing v1.46.1 measurement**; it does not establish unconditional exclusion under unknown original LTO/profile/custom-sysroot choices. Application source, exact dependency graph, macro/module organization, linker/strip behavior and historical pipeline identity remain unresolved.

## Verification

`python <publication-folder>/verify.py` is a portable, read-only, standard-library-only check of saved source/lock, successful build, SDK hashes, official release digest receipt, target adaptation, candidate bytes and every retained full-helper match/negative. The large toolchain and build cache are not needed. Existing baseline v1.44/v1.46 candidates and the target are read through hash-bound repository paths in `external-inputs.json`.

`build_once.py` retains the historical adapted build command and allowlisted environment, but is a scratch reproducer, not a turnkey installer. Reacquire the official digest-verified release into an isolated location and adjust its input/cache paths explicitly; never replace the global Rust alias. The recorded build did not use captured program bytes as compiler input. No SBF transaction, network simulation, deployment, candidate promotion or main push was performed by this experiment.
