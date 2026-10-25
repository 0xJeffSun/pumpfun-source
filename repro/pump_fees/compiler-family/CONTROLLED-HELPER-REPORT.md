# Controlled linked-helper compiler comparison

**Prefer platform-tools v1.44 for the next Pump/Fees reconstruction builds.** With identical frozen sixteen-handler Fees source, Cargo.lock, target and release profile, v1.44 reproduces substantial captured stdlib instruction bodies that v1.45 and v1.46 do not. This is stronger than source-filename evidence, but does not uniquely prove the original compiler: v1.46.1 remains unbuilt, and the original LTO/profile/custom-sysroot settings are unknown.

This report follows the independent ELF-header evidence in `HEADER-AND-BUILD-REPORT.md`, which already excludes stock v1.43 output without external rewriting. No original or candidate executable was patched. All comparisons are static; no transactions were executed.

## Representative full instruction bodies

| Helper | Captured window / length | v1.44 | v1.45 | v1.46 |
|---|---|---|---|
| `core::fmt::write` | 775776 / 1056 bytes | Raw bytes exactly match | 1160-byte body; no instruction/relocation window match | Same 1160-byte negative |
| `panic_fmt` | 771136 / 80 bytes | Instructions/relocations match | Match | Match |
| `panic_bounds_check` | 771448 / 200 bytes | Instructions/relocations match; call target is mapped `panic_fmt` | Match | Match |
| 128-bit multiplication entry | 799040 / 352 bytes | Raw bytes exactly match `__multi3` | `__multi3` is a 72-byte wrapper; inner 352-byte function differs in two instructions | Same wrapper and inner-body difference |
| Unicode `is_printable` | Unique inferred entry / 872 bytes | Instructions/relocations match | 752-byte body; no match | 752-byte body; no match |
| Decimal `fmt_u64` | Unique inferred entry / 680 bytes | Instructions/relocations match | Match | No match; further LLVM code-generation difference |

The matching panic paths are explicitly retained as nondiscriminating controls. Decimal formatting matches v1.44/v1.45 but changes again at v1.46. The multiplication analysis includes the inner implementation rather than relying only on a changed exported-wrapper size: v1.45/v1.46 retain the same broad arithmetic algorithm but change register use in the final add/store instructions at function-relative offsets 328 and 336. v1.43 instead differs in the two comparison instructions at offsets 160 and 216. The captured 352-byte body matches v1.44 exactly.

Exact raw-positive hashes:

- `core_fmt_write`: candidate offset 319272, captured offset 775776, 1056 bytes, SHA-256 `7a5339492369c3813ea033c29cf8313288cf8efa07b2da552321cebc9c9f13c1`. Candidate/capture raw hashes are identical; no address masking is needed for this comparison.
- `integer_entry`: candidate offset 340296, captured offset 799040, 352 bytes, SHA-256 `face056642083fcc15c6737f1910030a4b59b6a78a4fa523f142dc0f28635762`. Candidate/capture raw hashes are identical; no address masking is needed for this comparison.

## Method and limits

`match_helpers.py` reads symbol ranges from the unstripped candidate and first verifies its `.text` bytes equal the independently emitted stripped output. It scans captured text for each full candidate body, using an in-memory diagnostic representation that clears only loader-relocation immediate fields and relative internal-call destinations. Every other instruction byte, branch displacement, register and constant remains unchanged. A match also requires identical relocation offsets, types and dynamic-symbol names. Known helper-to-helper call targets are checked against uniquely mapped captured entries.

The script separately records raw byte equality. Stronger results require the window to begin at an inferred function entry and end at the next inferred entry. Entries come from internal calls, ELF entrypoints and relocated function pointers. R10-relocated external calls are excluded even when their instruction uses src=1, preventing false self-call entries. These are inferred boundaries, not original debug symbols. Address masking is analysis only and is never written to an executable. A masked match is not byte-for-byte program equality or proof that every relocated data object is semantically identical.

Descriptive counts after adding compiler-builtins to the selected core/alloc/integer set:

| Candidate | Selected function ranges | Entry-bounded, call-consistent matches | Entry-bounded raw-exact matches |
|---|---:|---:|---:|
| v1.43 | 97 | 32 | 4 |
| v1.44 | 97 | 94 | 22 |
| v1.45 | 112 | 65 | 14 |
| v1.46 | 112 | 64 | 14 |

These counts are not independent statistical samples or a confidence score. Generic helper duplication and different inlining decisions change the denominator; the monomorphic full-body examples above are the more useful evidence. Earlier progress messages counted all instruction/relocation window matches before the stricter boundary/call checks and before including compiler-builtins; the table here is the final definition. A final review corrected external syscalls being mistaken for internal call entries; that correction increases the v1.44/v1.45/v1.46 bounded-match counts by one each and leaves all raw-positive hashes and representative conclusions unchanged.

## Controlled build results

All four successful attempts have exactly the same source/lock hash map and report `source_unchanged=true`; the profile has `lto=false`, `overflow-checks=true`, and `codegen-units=1`. The unchanged scratch lock SHA-256 is `7e895a83d26940404a7fc0769d7c7115e3a44bdca5aaf3cfda156b23f2bf13fc`. An isolated, checksum-verified Cargo cache was used with explicit `--locked --offline`. All whole-file and ELF-extent comparisons remain false.

| Release | Bytes | Candidate SHA-256 |
|---|---:|---|
| v1.43 | 406856 | `3eb19218e404dc7e0affc7defce68be233e05c75b53549e663c6e61c591d7fe8` |
| v1.44 | 395728 | `4de589921d973cb944b71215a99305ef0db6127fb29057cfb30e61dc0b266358` |
| v1.45 | 394136 | `86aa53106aa585163b7a8eb57675b14e1189aa47ffd4e98880976653a1a3c7c8` |
| v1.46 | 394136 | `2ea212986a1df4e4362224e1b23fac6d1dd627f8bfc6bff8bf4b7e01e5366ec8` |

| New official distribution | Locally computed release-asset SHA-256 | Compiler executable SHA-256 |
|---|---|---|
| v1.45 Darwin arm64 | `5fbe76de75dd9daf22db6680facca037f84aee0e609cc77c97b099c11868a8ee` | `a034e773f1aaae46e4c1e76a338588d8b24d4513b5b8652c28d964552d368ccd` |
| v1.46 Darwin arm64 | `06224b2ec78bc5bbd04e64046c536d2aefb8b5ec2cf0e926fe149b6371aa3be0` | `52285cde85cc086668cc73580f032179440e0d94479a1d6012c6b191f288d010` |

Exact asset URLs, release API IDs, sizes, local hashes, compiler versions, build-log hashes, commands and source hashes are retained in `selected-helper-evidence.json`, each `v1.*-toolchain-provenance.json`, and the build directories. The release APIs supplied no signed/publisher digest; these are recorded local integrity hashes. Existing v1.43 asset bytes were not reacquired, so only its installed compiler/source provenance is available.

## Official source context and remaining uncertainty

The immutable Rust bootstrap configuration changes `[rust] optimize = true` at v1.44 to `optimize = "s"` at v1.45. v1.46 and v1.46.1 have the identical configuration-file SHA-256. This supports the observed distribution-level stdlib inlining/layout changes, but is not a substitute for measuring v1.46.1 output. `stdlib-optimization-source.json` records immutable URLs and full-file hashes.

- [v1.44 config.toml:272](https://github.com/anza-xyz/rust/blob/08b7341888ab480dfaaa0698300cbbbbb2d75b53/config.toml#L272): SHA-256 `001ce8e3f5e6bb9dc70b0903a84418133f6926e0b06e21f3c24d228db2f568b0`.
- [v1.45 config.toml:272](https://github.com/anza-xyz/rust/blob/2830febbc59d44bdd7ad2c3b81731f1d08b96eba/config.toml#L272): SHA-256 `bfaedb480db185f54943c00f086e9c182543cf52c00645e2e86bcbe99a5fa177`.
- [v1.46 config.toml:272](https://github.com/anza-xyz/rust/blob/71b42e201d6e2e8a26d8a42e447c846809c84797/config.toml#L272): SHA-256 `bfaedb480db185f54943c00f086e9c182543cf52c00645e2e86bcbe99a5fa177`.
- [v1.46.1 config.toml:272](https://github.com/anza-xyz/rust/blob/71e82b8fbf1c50edc2cb1bf711b1d5b15a2c7278/config.toml#L272): SHA-256 `bfaedb480db185f54943c00f086e9c182543cf52c00645e2e86bcbe99a5fa177`.

Current conclusion: v1.44 is the strongest measured candidate for the captured Fees code and a justified first candidate for the shared Pump/AMM Rust 1.79 family. The direct instruction tests here are against Fees only. v1.45/v1.46 are poor matches under the controlled stock configuration, but unknown original LTO/custom-sysroot/profile choices prevent claiming unconditional release exclusion. v1.46.1 remains a measured gap. Genuine whole-program source rebuilding and exact deployed-byte equality remain unachieved.

Reproduce static comparisons:

```sh
python3 repro/pump_fees/compiler-family/compare_builds.py
python3 repro/pump_fees/compiler-family/match_helpers.py
python3 repro/pump_fees/compiler-family/summarize_helpers.py
python3 repro/pump_fees/compiler-family/verify_publication.py
```

The published scripts locate the repository from their own paths and use bundled candidate/symbol files. Original recorded build commands and `CARGO_HOME` remain historical evidence in `run-notes.json`; reproduction does not replace those values with publication paths. `artifact-hashes.json` covers every file in this publication except itself, and `verify_publication.py` checks the exact representative instruction bytes, final counts, candidate identities and recorded environment. These commands only parse files; they do not execute SBF programs.
