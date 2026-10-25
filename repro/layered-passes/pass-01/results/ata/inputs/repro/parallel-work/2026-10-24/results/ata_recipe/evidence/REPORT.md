# ATA exactness and historical recipe review

The retained best candidate still differs from the captured ATA at **307 byte positions**. All **159 inferred windows** were independently rechecked against both ELF files using the retained entry-detection method. No fully supported historical build recipe was recovered. No build, program execution, network query, binary modification, source correction, commit or publication was performed.

This report uses the ATA candidate-2 baseline (candidate 4 is byte-identical), not new Pump/Fees candidates. The dependency inventory predates those core updates. User-provided published checkpoint `8099031` is context, not an artifact identity claim; all inspected inputs are instead sealed individually in `input-references.json`. `docs/COMPLETION.md` and `repro/status.json` were read first and retained unchanged.

## Exact byte and window gap matrix

All ranges below are decimal ELF file/text byte offsets, end exclusive. Both artifacts contain 105,032 bytes.

| Artifact | SHA256 |
|---|---|
| Captured ATA | `6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d` |
| Best candidate 2/4 | `ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b` |

`windows.json` includes every ordinal 0–158, precise original/candidate extents, per-window SHA256, same-address differing-byte counts, and all changed direct calls. `byte-differences.json` preserves each of the 307 exact offsets and original/candidate byte values. These are analytical records, not transformed executables.

| Inferred ordinal | Original range | Mapped candidate range | Same-address differing bytes | Changed mapped direct calls |
|---|---|---|---:|---:|
| 38 | 28592–29032 | 28944–29384 | 181 | 4 |
| 39 | 29032–29384 | 28592–28944 | 101 | 3 |
| 41 | 29704–31160 | same | 9 | 7 |
| 44 | 34296–34840 | same | 2 | 2 |
| 46 | 35936–37968 | same | 5 | 4 |
| 47 | 37968–40512 | same | 6 | 5 |
| Other 153 windows | Full rows in `windows.json` | same | 0 | 0 |

These six rows account for all 304 text differences within `.text` [288,92344). For diagnostic comparison only, original [28592,29032) maps by +352 and [29032,29384) maps by −440. All other instruction addresses map to themselves. Every instruction agrees after checking mapped internal-call targets; 153 mapped windows are raw-identical, six retain direct-call displacement differences. The names “RawVec specializations” come from prior native-build symbol attribution, not newly recovered original function identities. Window correspondence does not prove historical source identity or exhaustive behavior.

Relocation records 247 [102800,102816) and 248 [102816,102832) contain the other three differing bytes. Their original/candidate addresses are 28968/28880 and 29024/28936; both records have info 4294967306 (type 10). Their mapped relocation multisets agree, although ordered records and whole files do not. All remaining byte positions are identical.

## Provenance and missing-input matrix

Paths below are inside `inputs/`. Each file's complete bytes, hash, original repository path and observed Git-tracked status are in `input-references.json`. The machine-readable matrix is `provenance-matrix.json`.

| Evidence | Precise retained location | What it supports | Remaining gap |
|---|---|---|---|
| Official release attribution | `repro/pump/ata-release-attribution.json`, asset hash and capture equality fields | Recorded release asset equals capture | No original build-to-upload association; asset attribution is not a source build |
| Official verification command | `repro/pump/ata-release-v1.1.0.json`, `body`, Verification subsection | Solana 1.10.33, Debian bootstrap, Ubuntu 20.04 | Mutable image tag/bootstrap; no original resolved host tools or release source revision |
| Repository tool pins | `work/ata-provenance-followup/spl-Anchor.toml`, lines 1–2 | Best-source snapshot pins Anchor 0.24.2 and Solana 1.10.33 | Does not show uploader actually used these inputs |
| Anchor container implementation | `work/ata-provenance-followup/anchor-v0242-lib.rs`, lines 968–998, 1028–1066, 1082–1103 | `/workdir`, `docker-target`, rustup fetched without a Rust version, specified Solana installer, relative build manifest | Historical image digest, resolved bootstrap and process/tool identities absent |
| Token CI | `work/ata-provenance-followup/spl-.github_workflows_pull-request-token.yml`, lines 59–81 | Token build/tests precede ATA; deployment artifacts uploaded | No linkage between this job and release asset |
| CI host tool/flags | `work/ata-provenance-followup/spl-ci_rust-version.sh`, lines 18–22; `spl-ci_cargo-test-bpf.sh`, lines 6–10 and 30–47 | Default Rust 1.59.0; warnings flag; test-bpf invocation | Original job environment and full BPF invocations absent; candidate 4 already duplicates flag result |
| Cargo metadata mechanism | `work/ata-provenance-followup/cargo060-compilation-files.rs`, lines 522–583 | Package/features/dependencies/profile/mode/LTO/target/compiler/wrapper/channel participate | Original unit graph and `spl_token_2022 -Cmetadata` unavailable; reference implementation does not prove uploader Cargo version |
| Cargo source hashing | `work/ata-provenance-followup/cargo060-source-id.rs`, lines 357–375 | Workspace prefix removed for path-source hashing | Does not support mount-path search or universal compiler path independence |
| Candidate 2 source build | `repro/pump/ata-candidate-build-2/comparison.json`, commands/image/source fields; adjacent source manifest (including lockfile hash) and build log | Recorded direct `/build` recipe and pinned container; 307 differences independently confirmed | Candidate recipe does not establish historical original recipe |
| Chronology candidate | `repro/pump/dependency-exactness/ata-chronology-candidate.json`, timestamps and comparison fields | Pre-upload source candidate 5 was already tested and reproduced candidate 3 | Chronology alone cannot select exact original source/metadata |
| Earlier bounded access results | `repro/pump/dependency-exactness/ata-provenance-followup/REPORT.md`, lines 28–30 | Prior attempt found no original invocation or asset-to-CI association | Dated retained report, not a new query or proof no archive exists |

The five preserved candidates independently compare at 1,199 / 307 / 1,506 / 307 / 1,506 differing bytes respectively. Their complete identities and recorded source revisions are in `result.json`. No candidate improves this checkpoint.

## Present but unintegrated evidence

The twelve upstream/source snapshots listed in `work/ata-provenance-followup/sources.json`, that index, and the scratch report are not Git-tracked at their original paths. This package retains them verbatim and checks all twelve against their already-recorded URL/SHA256 provenance. The published independent report already describes the important findings, so these are raw-source retention improvements for parent review, not a newly discovered historical recipe. Git-tracked status alone does not establish whether another copy has ever been published.

The critical authentic difference is the Anchor verification bootstrap versus the recorded pinned-container candidate command. The bootstrap's unpinned Rust install prevents reconstructing its original resolved inputs from the command alone. The reference Cargo implementation narrows metadata inputs, but cannot identify which one caused the original specialization order. No arbitrary metadata override, compiler search, source reorder, padding, or address patch follows from this evidence.

A supported historical recipe requires a release-upload/build record binding the captured hash to the source revision, actual resolved lockfile, dependency/feature graph, host and BPF Cargo/rustc identities, full invocations (especially `spl_token_2022 -Cmetadata`), and resolved SDK/link/strip/bootstrap artifacts. An artifact-linked original intermediate library or build directory could further constrain attribution. These inputs remain missing in the reviewed corpus. Accordingly `reconstructable_historical_recipe` is null; this package intentionally provides no executable historical-build recipe.

## Portable verification

Run `python3 verify.py` from this directory (or by its absolute path). It requires only Python's standard library, reads the sealed local copies, writes nothing, and verifies all 67 inputs, all twelve upstream snapshot hashes, every inferred window, all instruction correspondence, the relocation multiset, every differing byte, five candidate comparisons, and output seals. The ELF parser is a retained parser with only its unused repository-discovery global removed; the verifier rederives its entries rather than trusting inventory row count.

`python3 verify.py --derive` regenerates only the analytical JSON files; no need to run it for verification. `prepare.py` records how inputs were copied from this machine; it is not needed by the portable verifier. No third-party packages, original checkout, compiler, chain access or runtime fixture are required. The manifest seals report, verifier, provenance matrix and all analytical outputs; its own SHA256 is provided in the handoff. This is bounded static verification, not security sign-off or whole-byte completion.
