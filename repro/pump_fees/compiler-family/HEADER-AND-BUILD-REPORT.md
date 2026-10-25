# Fees controlled compiler builds and header attribution

Both frozen sixteen-handler Fees source builds succeeded under locked/offline Cargo: platform-tools v1.43 and v1.44. Neither output equals the captured Fees ELF. No candidate or reference ELF header was rewritten, and no program transactions were executed.

## Compiler shortlist correction

**This supersedes the v1.43-first recommendation in the report published at commit `49135e8` under `repro/compiler-fingerprints`.** The earlier stdlib evidence still identifies the Rust 1.79 source family. Independent header evidence excludes ordinary stock v1.43 compiler/linker output, narrowing the Pump/Pump AMM/Pump Fees shortlist to **v1.44, v1.45, v1.46, v1.46.1**. Mayhem remains in the previously qualified v1.52–v1.56 family.

All four captured binaries contain `e_machine=263` at ELF offset 18 and `e_flags=0` at offset 48. Immutable official LLVM sources establish:

- v1.43’s SBF object writer selects machine 263 only for CPU `sbfv2`; the same CPU predicate sets flags `EF_SBF_V2=0x20`. Other SBF CPUs select machine 247 and flags 0. The stock linker propagates compatible object flags. Neither ordinary case produces the captured pair (263, 0).
- v1.44’s SBF object writer selects machine 263 unconditionally; the V0 target sets flags 0. Its fresh controlled source build produces the captured header pair (263, 0).

This excludes stock v1.43 compilation/linking under the inspected code, not arbitrary custom toolchains, external header rewriting, or mixed compiler/linker pipelines. Header agreement at v1.44 does not distinguish it from v1.45/v1.46/v1.46.1 and does not establish a whole-program match.

## Controlled builds

| Build | Size | e_machine / e_flags | SHA-256 |
|---|---:|---|---|
| v143-build-02 | 406856 | 247 / 0 | `3eb19218e404dc7e0affc7defce68be233e05c75b53549e663c6e61c591d7fe8` |
| v144-build-01 | 395728 | 263 / 0 | `4de589921d973cb944b71215a99305ef0db6127fb29057cfb30e61dc0b266358` |
| Captured Fees allocation | 948944 | 263 / 0 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |

Captured ELF extent is 873256 bytes, SHA-256 `5b6ceda57863f0dcc3e0e3623052f8342c2c81883379699e71d7ed5383cb3dcf`. Neither comparison succeeds even when ignoring trailing allocation zeros. Independent parser/comparison results agree with the build helper: v1.43 first differs at offset 18 and v1.44 at offset 24. Full differing-position counts and per-section hashes are in `independent-comparisons.json`.

Both builds used the same nine scratch Rust files, verified identical to the sixteen-handler root source before later root work. The inherited scratch lock already pinned blake3. The remaining audited pins were applied only to the scratch lock:

- blake3 1.8.2; proc-macro-crate 3.3.0; indexmap 2.11.4; unicode-segmentation 1.12.0.
- Final scratch Cargo.lock SHA-256 `7e895a83d26940404a7fc0769d7c7115e3a44bdca5aaf3cfda156b23f2bf13fc`.
- Original inherited scratch lock retained as `inherited-Cargo.lock.snapshot`.
- Both build attempts report returncode 0 and `source_unchanged=true`; the helper forwards Cargo `--locked --offline` and uses fresh target/rustup/SDK directories.

The initial v1.43 attempt failed only because old Cargo could not find ahash 0.8.12 in its older registry-cache namespace. `prepare_cache.py` populated a scratch-only Cargo home with 201 existing published crate archives, individually verified against the pinned lock checksums, and matching existing registry-index metadata. Subsequent builds set `CARGO_HOME` to that isolated directory. This additional environment is recorded in `run-notes.json`; the helper’s own JSON does not record CARGO_HOME.

Three source deprecation warnings and the helper’s undefined/unknown-syscall warnings remain in the full build logs. Compilation success does not establish runtime acceptance; no transaction replay was requested or performed.

## Exact official source evidence

`header-evidence.json` contains every source URL, full-file SHA-256, and exact excerpt with line numbers, along with capture/candidate hashes and header offsets. Relevant immutable sources:

- [v1.43 llvm/lib/Target/SBF/MCTargetDesc/SBFELFObjectWriter.cpp lines 51–57](https://github.com/anza-xyz/llvm-project/blob/646ec14456ddca7daae27ee811e642f3c88ce2ad/llvm/lib/Target/SBF/MCTargetDesc/SBFELFObjectWriter.cpp#L51-L57), SHA-256 `338855145f7ac3476b6825ea62d048f3d0276be9fe1934df1e2af1262c80bf4d`.
- [v1.43 llvm/lib/Target/SBF/MCTargetDesc/SBFMCTargetDesc.cpp lines 59–74](https://github.com/anza-xyz/llvm-project/blob/646ec14456ddca7daae27ee811e642f3c88ce2ad/llvm/lib/Target/SBF/MCTargetDesc/SBFMCTargetDesc.cpp#L59-L74), SHA-256 `6f374eda972802cc6f2fbea11155759bca39ad235bbacca0d3f791c3f0fc75ca`.
- [v1.43 lld/ELF/Arch/SBF.cpp lines 118–140](https://github.com/anza-xyz/llvm-project/blob/646ec14456ddca7daae27ee811e642f3c88ce2ad/lld/ELF/Arch/SBF.cpp#L118-L140), SHA-256 `1bc23ec724a276cf1b81ed069477cf49ec420e3e63b92f9039c7efb72975e9ed`.
- [v1.44 llvm/lib/Target/SBF/MCTargetDesc/SBFELFObjectWriter.cpp lines 50–54](https://github.com/anza-xyz/llvm-project/blob/08aedd64bf3abe4f163407b7bcf680403b84b32d/llvm/lib/Target/SBF/MCTargetDesc/SBFELFObjectWriter.cpp#L50-L54), SHA-256 `3311b1529c1ce9ca47a266fe49c2e106430d507484336b76ff8ad17079dbceba`.
- [v1.44 llvm/lib/Target/SBF/MCTargetDesc/SBFMCTargetDesc.cpp lines 72–84](https://github.com/anza-xyz/llvm-project/blob/08aedd64bf3abe4f163407b7bcf680403b84b32d/llvm/lib/Target/SBF/MCTargetDesc/SBFMCTargetDesc.cpp#L72-L84), SHA-256 `2a55b642c1ef0634669a088e2449498ebc13f6391efeae6e57531e20bcf0d338`.

Rust-to-LLVM submodule links are recorded in `llvm-submodule-provenance.json`: v1.43 Rust 548684c092ca4b00e9e9e1eae7a3c789aa07f95b points to LLVM 646ec14456ddca7daae27ee811e642f3c88ce2ad; v1.44 Rust 08b7341888ab480dfaaa0698300cbbbbb2d75b53 points to LLVM 08aedd64bf3abe4f163407b7bcf680403b84b32d.

The official [v1.44 Darwin-arm64 distribution](https://github.com/anza-xyz/platform-tools/releases/download/v1.44/platform-tools-osx-aarch64.tar.bz2) is 400,794,156 bytes with locally computed SHA-256 `66e20d135fddd70ff519baf7ff320d762957f9aedf93a50e23756db23ad79351`. The release API supplied no publisher digest, so this is a recorded local integrity hash, not an independently signed checksum. `v144-toolchain-provenance.json` and `v144-release-metadata.json` preserve provenance. Its version.md matches the expected Rust source commit, and build metadata records compiler executable SHA-256.

## Files for publication

- `header-evidence.json` and this report: shortlist correction with immutable source citations.
- `v143-build-02/build-attempt.json`, `build-comparison.json`, `build.log`: successful v1.43 build.
- `v144-build-01/build-attempt.json`, `build-comparison.json`, `build.log`: successful v1.44 build.
- `independent-comparisons.json`, `compare_builds.py`: separate ELF/byte comparison.
- `run-notes.json`, `pin-attempts.json`, `source-copy-check.json`, `cache-manifest.json`: controlled-input and cache provenance.

Next compiler discrimination should retain this frozen source/lock and compare v1.45/v1.46/v1.46.1 or linked stdlib helper bodies. This experiment demonstrates compatibility and narrows compiler hypotheses; the full source reconstruction remains incomplete.
