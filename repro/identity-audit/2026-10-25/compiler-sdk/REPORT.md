# Independent compiler / SDK identity audit, 2026-10-25

Audited baseline: `origin/main` at `3c5b492b`, whose latest change selected platform-tools v1.43 by default for Pump, Pump AMM and Fees. This audit does not identify a unique original compiler and does not establish any program's byte identity. It provides stronger counter-evidence to that default's stated justification and an actionable correction proposal.

## Findings that change the next action

1. **The new v1.43 candidates do not even match the captured ELF machine field.** A fresh independent parser finds `(e_machine,e_flags)=(247,0)` on all three binaries in `v1.43-recipe-switch/`, versus `(263,0)` on all four captured programs. This is a real byte mismatch at offset 18, not just layout or allocation padding. A section-size improvement cannot establish the correct compiler in the presence of this contrary evidence.
2. **A fresh minimal backend experiment reproduces the distinction.** Official installed v1.43 `llc` emits `(247,0)` for generic CPU and `(263,32)` for `sbfv2`. Official v1.44 emits `(263,0)` for generic, `(263,1)` for `v1`, and `(263,2)` for `v2`. The tiny input IR, object files, commands and tool hashes are retained. No program source, target or candidate binary was patched. The failed Clang `sbfv2` front-end probe is retained separately and is not used as evidence; the succeeding llc probes avoid that front-end crash.
3. **Existing full-helper evidence also contradicts the claim that v1.43 and v1.44 helper bodies are identical.** Independently extracted Fees `__multi3` at captured file offset 799040 is 352 bytes, SHA-256 `face056642083fcc15c6737f1910030a4b59b6a78a4fa523f142dc0f28635762`. The retained v1.44 body is raw-identical. The v1.43 body differs at full instruction offsets 160 and 216, with no relocations or calls to explain those differences. The original publication verifier passes. The package additionally reports 94/97 entry-bounded/call-consistent selected helpers for v1.44 versus 32/97 for v1.43; those counts are descriptive, not percentages of recovered source.
4. **v1.44 is the strongest measured stock candidate for Fees, not uniquely proved historical provenance.** Measured v1.45 and v1.46 have negative full-helper matches. v1.46.1 is still unmeasured in the retained controlled experiment. Custom compiler patches, rebuilt sysroots, mixed compiler/linker pipelines, LTO/profile differences and externally rewritten headers remain hypotheses requiring independent evidence. Direct helper discrimination has been established for Fees; inferring the same release for Pump/AMM from their shared era/header is a useful starting point, not a separate proof.
5. **Mayhem v1.52 is compatible, not uniquely confirmed.** Its `raw_vec/mod.rs` and `hashbrown-0.15.4` paths constrain source families; those paths do not identify one distribution. Current reconstructed Cargo.toml's `rust-version=1.89` and lockfile's `indexmap` requirements are inputs selected for this reconstruction. Failure of an older Cargo to build that lockfile does not exclude the target having been built with a different historical lockfile. Conversely, v1.53/v1.54 failing under the installed old build driver's `sbf-solana-solana` target can be a driver/target-name mismatch; it does not prove those compilers cannot explain target code. The official release APIs list v1.52, v1.53 and v1.54 as Rust 1.89 / LLVM20. Compare monomorphic target helper bodies and adapt the correct matching driver before excluding them.

## Primary source checks

Downloaded immutable source files and SHA-256 records are in `source-records.json`, `rust-source-records.json` and `platform-source-records.json`.

- [v1.43 SBF object writer](https://github.com/anza-xyz/llvm-project/blob/646ec14456ddca7daae27ee811e642f3c88ce2ad/llvm/lib/Target/SBF/MCTargetDesc/SBFELFObjectWriter.cpp#L51-L57) selects EM_SBF only for the SBFv2 predicate; its full-file SHA-256 is `338855145f7ac3476b6825ea62d048f3d0276be9fe1934df1e2af1262c80bf4d`.
- [v1.43 target flags](https://github.com/anza-xyz/llvm-project/blob/646ec14456ddca7daae27ee811e642f3c88ce2ad/llvm/lib/Target/SBF/MCTargetDesc/SBFMCTargetDesc.cpp#L59-L74) couple that CPU to flag32; full-file SHA-256 `6f374eda972802cc6f2fbea11155759bca39ad235bbacca0d3f791c3f0fc75ca`. Its [linker flag propagation](https://github.com/anza-xyz/llvm-project/blob/646ec14456ddca7daae27ee811e642f3c88ce2ad/lld/ELF/Arch/SBF.cpp#L118-L140) is retained, SHA-256 `1bc23ec724a276cf1b81ed069477cf49ec420e3e63b92f9039c7efb72975e9ed`.
- [v1.44 writer](https://github.com/anza-xyz/llvm-project/blob/08aedd64bf3abe4f163407b7bcf680403b84b32d/llvm/lib/Target/SBF/MCTargetDesc/SBFELFObjectWriter.cpp#L50-L54) uses EM_SBF unconditionally, SHA-256 `3311b1529c1ce9ca47a266fe49c2e106430d507484336b76ff8ad17079dbceba`. Target flag selection is separately retained, SHA-256 `2a55b642c1ef0634669a088e2449498ebc13f6391efeae6e57531e20bcf0d338`.
- [Platform-tools official repository](https://github.com/anza-xyz/platform-tools) release build scripts clone tagged Rust and Cargo and record source commit IDs in `version.md`. The local v1.43/v1.44 installed version records map Rust to `548684c0...` / `08b73418...`; the fetched immutable Rust trees map to the LLVM commits above. The full source and release API receipts, not a generic upstream version table, are retained.
- [Official cargo-build-sbf](https://github.com/anza-xyz/cargo-build-sbf) documents independent platform-tools selection. Driver release, platform-tools, Rust compiler, sysroot, target and strip executable must be treated as separate inputs.

## ELF allocation is not missing code

Independent extent parsing, excluding NOBITS sections from file ranges:

| Program | Captured payload file | Real ELF extent | Trailing zero allocation |
|---|---:|---:|---:|
| Pump | 10,485,715 | 1,934,800 | 8,550,915 |
| Pump AMM | 10,485,715 | 1,268,504 | 9,217,211 |
| Fees | 948,944 | 873,256 | 75,688 |
| Mayhem | 777,408 | 775,416 | 1,992 |

Every tail is verified all-zero. Exact payload identity must ultimately account for allocation, but adding zeros cannot repair executable differences. Conversely the tail is not evidence of undecompiled instructions. Report complete payload and ELF-extent identity separately, along with `.text`, `.rodata`, relocations, entry point, dynamic symbols, and program/section headers.

The 99.9% / 99% / 86% `.text`-length ratios in the recipe report are **size ratios, not source-completeness estimates**. Different code may have identical length; inlining, generic instantiations, dependency implementations and compiler passes may change length without changing source coverage. Equal instruction multisets are also weaker than equal bodies/call/data graph. Whole-program source and release claims cannot be inferred from a finite differential corpus.

## SDK / library / flag gaps still unaccounted for by the claimed recipe

- Rust `rustc --version` alone omits fork commit, LLVM commit, bootstrap `config.toml`, sysroot library object contents and host-specific build paths. Record executable and target rlib hashes, exact compiler entry, target features/CPU/ABI and rustlib target name.
- The existing Darwin v1.44 build pipeline has separately attributed v1.52 stripping, while the original unmodified Linux SDK defaults to v1.43 for that phase. Do not label the whole pipeline simply v1.44. Preserve the actual `llvm-objcopy`, `ld.lld`, linker script, SDK `env.sh`/`strip.sh`/installer and archive digests for every trial.
- The current helper records a subset of environment. It does not establish absence or exact values of `RUSTFLAGS`, `CARGO_ENCODED_RUSTFLAGS`, `RUSTC_WRAPPER`, `RUSTC_WORKSPACE_WRAPPER`, `CC`, `AR`, target-specific Cargo config, profile overrides, remap flags or linker selection. Record an allowlisted, normalized build environment and actual process executable/argument trace. Do not dump arbitrary environment or credentials.
- Current manifest/lock hashes prove the reconstruction's inputs, not historical crate identity. Exact crate archives plus enabled features, cfgs, patches and vendored source digests are necessary. Embedded panic paths identify compiled file versions but can be copied or remapped; resolved Cargo package lists do not reveal which dependency functions survive linking.
- `overflow-checks=true` can explain a family of panic paths but does not uniquely recover profile. `panic=abort`, LTO, `codegen-units`, opt-level, strip/remap choice and macro-generated module organization still require controlled discriminators, not present-day Cargo.toml assertions.
- Upstream `rust-version` and newer package requirements describe the reconstructed source's MSRV; use target fingerprints independent of that source when excluding historical toolchains.

## Next discriminating experiments

1. Keep the current accepted candidate binding unchanged; correct the research default rationale to v1.44 as strongest measured older-family candidate, explicitly unresolved. `build-default-correction.patch` proposes only that correction and retains explicit `--tools-version v1.43` experiments.
2. On one frozen source and lock, retain per-function raw + relocation/call-consistent comparisons across stock v1.44, v1.45, v1.46, **v1.46.1**, independent Linux/Darwin sysroots and strip implementations. Match monomorphic std/runtime helpers before using app body size. The extant Fees 352-byte multiply and 1,056-byte fmt bodies are inexpensive discriminators.
3. For Mayhem, compare v1.52/v1.53/v1.54 using their compatible target/driver combinations and controlled frozen dependencies, and identify multiple complete target helper boundaries, callees and rodata. Treat an unbuildable experiment as setup failure rather than evidence of original compiler.
4. Separate source gaps from generated/dependency/runtime gaps in a full reachable function/call/data ledger; exact bodies, relocations, literal identities and caller contexts must map. Only a full rebuilt payload SHA match closes identity.

## Reproduce this audit

`python <audit-folder>/verify.py` is portable, read-only and standard-library-only. It validates saved probe object bytes, target/candidate headers, ELF extents, immutable source hashes, exact positive/negative multiply bodies and all artifact/external hashes. No installed compiler, VM or network is required. Commands and binary hashes for optional fresh llc probes are in `llc-header-probe-results.json`; `header-probe.ll` is the complete input. Existing `repro/pump_fees/compiler-family/verify_publication.py` also passed independently in this audit.
