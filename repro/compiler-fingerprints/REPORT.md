# Static compiler attribution evidence

Captured-program bytes were only read. This investigation does not rebuild source, establish whole-program equality, or identify a unique compiler release. The saved evidence is under `repro/compiler-fingerprints/`; the investigation ran in scratch before publication.

## Result

| Program | Unique stdlib path/line/column fingerprints | Releases matching the assumed reference source family | Recommended first candidate |
|---|---:|---|---|
| pump | 19 | v1.43, v1.44, v1.45, v1.46, v1.46.1 | v1.43 |
| pump_amm | 17 | v1.43, v1.44, v1.45, v1.46, v1.46.1 | v1.43 |
| pump_fees | 27 | v1.43, v1.44, v1.45, v1.46, v1.46.1 | v1.43 |
| mayhem | 11 | v1.52, v1.53, v1.54, v1.55, v1.56 | v1.52 |

Tested scope: every official platform-tools release v1.40 through v1.58, plus v1.42.1, v1.46.1, and v1.51.1 (22 releases). The first family is Rust 1.79.0; the second is Rust 1.89.0. This is a qualified standard-library-source family shortlist, conditional on ordinary unmodified official distributions. The script assumes the locally inspected v1.43/v1.52 source family as its comparison reference; matching reference lines does not independently prove the original compiler, and differing reference lines alone do not exclude a candidate. A custom compiler with reused/patched sysroot remains possible. The exact target, release, LLVM revision, build options, and dependency graph remain unresolved.

The v1.43 Fees selector comparison in `repro/experiments/fee-selector-v143.json` independently agrees with prioritizing v1.43: 376-byte function body matches except two unresolved relocations. That is not byte equality or unique release attribution.

## How the evidence was extracted

`analyze.py` parses each ELF section table and searches `.data.rel.ro` for Rust panic Location records pointing to embedded stdlib filenames. Every retained pointer has a `.rel.dyn` relocation with info 8. Captured pointer storage is `filename_file_offset << 32`; the descriptor then carries a u64 filename length and u32 line/column. Results include exact path and descriptor offsets in `panic-locations.json`.

Pump descriptors store the filename byte length. Mayhem descriptors store byte length + 1 and the string has a trailing NUL. This independently matches the `Location` transition from `file: &str` in the older family to `file_bytes_with_nul: &[u8]` in the newer family.

`score.py` compares each distinct captured path/line/column with source lines from the assumed v1.43 reference for Pump and v1.52 reference for Mayhem, using commit-pinned official sources. This establishes equivalence of the relevant source locations across release families. It is not a source-to-machine-code check: a source-line difference is retained as a difference, not automatically treated as independently disproving compilation. `candidate-scores.json` labels the assumption explicitly and retains all reference-line counts and differences. Filename-NUL compatibility is checked independently against each release’s Location definition. All four binaries have ELF flags 0. The three Pump `.rodata` flags are 18; Mayhem is 50. Section flags are supporting observations, not unique compiler signatures.

## Positive and negative examples

| Fingerprint | Pump binaries | Matching 1.79 family source | 1.75 / 1.84.1 / 1.89 negatives |
|---|---|---|---|
| `alloc/src/string.rs:2559:14` | all three | `expect(...)` | attribute / blank / blank |
| `alloc/src/vec/mod.rs:3112:13` | all three | capacity-overflow panic | closing brace / attribute / documentation |
| `alloc/src/fmt.rs:633:32` | all three | formatting-trait `expect(...)` | past EOF / documentation / documentation |
| `core/src/fmt/mod.rs:2399:34,2406:26` | all three | string slice indexing | different source sites |
| `core/src/slice/sort.rs` ten locations | Fees | all ten agree, including 1083:14 and 1342:41 | different or absent source |

Mayhem independently agrees at `alloc/src/string.rs:2830:14` and `488:23`, `alloc/src/raw_vec/mod.rs:558:17`, `alloc/src/slice.rs:449:29`, `core/src/fmt/mod.rs:2732:38` and `2741:26`, and `core/src/iter/traits/iterator.rs:2027:9`. Several of these files/locations do not exist in the older families. v1.57 and v1.58 are Rust 1.95.0 and differ from the assumed reference source-location set despite retaining the newer filename layout. The representative hard-negative checks below provide the separate reason to deprioritize them.

Mayhem also contains the exact registry path for `hashbrown-0.15.4/src/raw/mod.rs`; the v1.52 bundled Rust Cargo.lock includes hashbrown 0.15.4. This agrees with the newer family but cannot independently establish whether the application or sysroot introduced that dependency.

## Independent observations supporting the shortlist

These are separate from reference-line equality and use the actual captured descriptor locations:

- **Pump versus Rust 1.75 (v1.40–42,42.1):** the captured `alloc/src/fmt.rs:633:32` lies past EOF in the official 1.75 file. The captured `string.rs:2559:14` lands on an attribute and `vec/mod.rs:3112:13` lands on a closing brace. In v1.43 those exact coordinates identify `expect` and `panic!` call sites. Past EOF is the strongest of these checks.
- **Pump versus Rust 1.84.1 (v1.47–51,51.1):** the captured `string.rs:2559:14` is a blank line, `vec/mod.rs:3112:13` is an attribute, and `alloc/fmt.rs:633:32` is documentation, whereas the 1.79 coordinates are viable matching panic/expect expressions. These are source-coordinate contradictions under the ordinary, unmodified sysroot assumption, not a general theorem about arbitrary remapped/generated source spans.
- **Pump versus Rust 1.89/1.95 (v1.52–58):** every retained Pump filename descriptor excludes a terminating NUL from its length, contrary to these releases’ `Location.file_bytes_with_nul` representation. This representation mismatch is independent of choosing v1.43 as a baseline.
- **Mayhem versus Rust 1.75/1.79/1.84.1 (v1.40–51 and related patches):** retained Mayhem descriptors include a trailing NUL in the filename length, contrary to these releases’ `Location.file: &str` representation. Its `alloc/src/raw_vec/mod.rs` path is also absent in these checked source trees; the older file is `alloc/src/raw_vec.rs`.
- **Mayhem versus Rust 1.95 (v1.57–58):** the captured `alloc/src/string.rs:2830:14` identifies `expect` in the 1.89 source, but an attribute in 1.95; the captured `core/src/fmt/mod.rs:2741:26` identifies a slice-indexing expression in 1.89 but documentation in 1.95. The filename representation alone cannot exclude 1.95.

Positive source-coordinate checks are repeated across unrelated modules, and the embedded string for the Display error agrees with the referenced `expect` sites. They support testing the stated families first; they do not prove a unique rustc/LLVM artifact. Custom sysroots, line remapping, postprocessing, and deliberate reproduction of source spans are outside the tested official-distribution model.

## Captured byte identity

| Program | Captured length | Full capture SHA-256 | ELF-extent SHA-256 |
|---|---:|---|---|
| pump | 10485715 | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` | `05249b60f8ddf02a53d0f8a43980fde40cce33f73526355b4ef08e292279819f` |
| pump_amm | 10485715 | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` | `51a5f6a7fb5a812de7686e593ce6159f6ee59b15771a3d5d37ab661c46d64586` |
| pump_fees | 948944 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` | `5b6ceda57863f0dcc3e0e3623052f8342c2c81883379699e71d7ed5383cb3dcf` |
| mayhem | 777408 | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` | `9af9e3b1cbc9d89340af4d9d46e4c88d3dc2fc67e0090f9370047d97532ff09d` |

Full captures contain trailing allocation bytes, so their hashes differ from ELF-extent hashes. Neither original capture nor trimmed ELF bytes were modified.

## Local toolchains

| Release | Rust / LLVM | Official Rust source commit from version.md | Local rustc SHA-256 |
|---|---|---|---|
| v1.41 | 1.75.0-dev / 17.0.6 | `6cc5efcd78429dde832e7ec5c55c5889af8fc62e` | `7642234857bbe0007849e6ea06f6862e0121e6b19366096055e1592191321733` |
| v1.43 | 1.79.0-dev / 18.1.7 | `548684c092ca4b00e9e9e1eae7a3c789aa07f95b` | `8f5a063de83fa872d4b1587b3bd909f1be71d5d70d91fafcb1115ef0f8887612` |
| v1.48 | 1.84.1-dev / 19.1.7 | `293a1b6c60a0b8d92593843c373539e21e3ba087` | `ab6cfa61ce01944ef0729b01663e2da23251ff48e5eb5bf9238587f65096547d` |
| v1.52 | 1.89.0-dev / 20.1.7 | `790f1537507dbdb0da320fbb3b1c1eca3b33c474` | `c58ec8ad482a40216152a4e4a6172f485be22a7f4482623e7e3cdf6c7085beb8` |

These local binaries are aarch64-apple-darwin distributions. Host-distribution identity and linker behavior must still be accounted for in any exact rebuild. `analysis.json` records all inspected local source-file hashes and version.md hashes.

## Authoritative source provenance

Platform-tools [build and release process](https://github.com/anza-xyz/platform-tools) describes these customized Rust/LLVM distributions. Release pages explicitly identify [v1.43 as Rust 1.79 / LLVM 18](https://github.com/anza-xyz/platform-tools/releases/tag/v1.43) and [v1.52 as Rust 1.89 / LLVM 20](https://github.com/anza-xyz/platform-tools/releases/tag/v1.52). The downloaded `build.sh` files select `solana-tools-v1.*` Rust refs. `rust-refs.txt` records git object IDs; every downloaded Rust source URL in `official-source-files.json` uses its immutable commit ID.

Representative exact files:

- [v1.43 library/alloc/src/string.rs](https://raw.githubusercontent.com/anza-xyz/rust/548684c092ca4b00e9e9e1eae7a3c789aa07f95b/library/alloc/src/string.rs), SHA-256 `1c5f9182ccf4d80076f7392a0d26a7ac3004ccc69124674dcc4bc1cf82f64285`.
- [v1.43 library/core/src/panic/location.rs](https://raw.githubusercontent.com/anza-xyz/rust/548684c092ca4b00e9e9e1eae7a3c789aa07f95b/library/core/src/panic/location.rs), SHA-256 `42af49b238b9892d0973c89eb6597cc4b173a29b5133f7a083d2cb487d098f1f`.
- [v1.52 library/alloc/src/string.rs](https://raw.githubusercontent.com/anza-xyz/rust/790f1537507dbdb0da320fbb3b1c1eca3b33c474/library/alloc/src/string.rs), SHA-256 `46dadb69bbe909b50146366020dc23d4fa88f53b93435b7e0f70c6692d0ba629`.
- [v1.52 library/core/src/panic/location.rs](https://raw.githubusercontent.com/anza-xyz/rust/790f1537507dbdb0da320fbb3b1c1eca3b33c474/library/core/src/panic/location.rs), SHA-256 `ea1fa0aa3df25ee4a999d2f14d43dd31781c2f476a54e655abcce2b3827c7928`.

## Next discriminating checks

1. Use v1.43 first for Pump/AMM/Fees and v1.52 first for Mayhem. Do not use v1.52 output as evidence for compiler attribution of the three Pump programs: its standard-library fingerprint conflicts with theirs.
2. For the 1.79 shortlist, compare captured panic-call reachability and linked compiler-builtins to v1.43 versus v1.44. The official Rust diff introduces SDK custom-panic handling, compiler-builtins changes, linker updates, target splitting, and LLVM updates. From v1.44 to v1.45, stdlib size optimization and page-alignment changes provide further tests. Compare linked stdlib helper bodies, not just application monomorphizations.
3. If those do not discriminate, compile the same small source at v1.43 / v1.44 / v1.45 / v1.46 / v1.46.1 with identical flags, compare full emitted instruction bodies and relocation structure, and preserve all negative results. LLVM changes across these releases mean a single coincidentally matching function is insufficient.
4. For Mayhem, v1.52–v1.56 retain the same observed stdlib locations; their differences are chiefly LLVM/SBPF-target work. Compare representative integer arithmetic, aggregate-copy, and panic paths under the captured ELF-flag/target combination. Do not exclude newer releases merely because they added SBPFv3: they can also emit older targets.
5. For a byte-for-byte rebuild, lock the matching release asset SHA, host distribution, target, rustflags, profile settings, Cargo.lock resolution and dependency source contents. Confirm actual complete `.so` equality before claiming reconstruction.

`adjacent-release-changes.json` records the exact official GitHub comparison URLs, commits, and changed files supporting these checks. No release within either surviving family is excluded by this report.

## Reproduce

The source cache records the exact reviewed bytes and URLs. Extract it in a scratch copy of this directory before rerunning the source comparison. `analyze.py` also needs the four local toolchain installations named in the script; the saved extraction records can be checked directly against the immutable ELF captures. The lock audit describes the earlier sixteen-handler lock snapshot, not later dependency additions.

Run from repository root after configuring those toolchain paths:

```sh
tar -xzf repro/compiler-fingerprints/source-cache.tar.gz -C repro/compiler-fingerprints
python3 repro/compiler-fingerprints/analyze.py
python3 repro/compiler-fingerprints/fetch_sources.py
python3 repro/compiler-fingerprints/compare_sources.py
python3 repro/compiler-fingerprints/score.py
```

Downloaded source files are cached locally, with SHA-256 recorded. The analysis is fully static; it executes only local rustc version queries, not program transactions.
