# ATA and Metaplex archival recipe review

**Negative result for both dependencies. Existing admissible evidence does not uniquely select a new source/recipe, and no future build is proposed.** This is a read-only static review of the complete retained pass-01 inventories and selected underlying public records. It adds archival and byte checks, not reconstructed source, runtime cases, or accepted binary identity.

ATA remains **307 differing raw positions** (304 text, three relocation) in equal 105,032-byte files. Metaplex remains **1,509 differing positions in the common 707,448-byte ELF extent** (1,477 text, 30 diagnostic-data, two relocation). Its captured file additionally has 86,543 zero bytes absent from the raw candidate; comparison to that raw file therefore has 88,052 changed or absent positions. The already-retained capture-sized candidate differs at 1,509 positions. No tail was generated here.

## Scope, inputs, and evidence levels

The starting point is `repro/layered-passes/pass-01/results/{ata,metaplex}`, whose reports bind their original inputs to `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. Complete ATA residual/inventory JSON and all Metaplex window, residual, relocation, coverage, symbol, CFG, decode, and unresolved ledgers are retained in `inputs/*/baseline/`. These include ambiguity, not just best matches. The current `docs/COMPLETION.md` is separately captured; it is not represented as belonging to that frozen commit.

`input-provenance.json` is the exact input allowlist: repository-relative source path, size, digest and destination. Prior manifest/seal files remain verbatim historical records. The verifier checks selected copies against those old seals; **it does not claim to rerun either entire inherited verifier**, because unneeded runtime artifacts and scripts are deliberately not republished. Build-log excerpts preserve numbered literal compilation/tool-selection lines and both compressed and decoded source hashes. Full logs remain in the existing archive. These excerpts are not a complete process trace, and portable verification cannot independently recover omitted log text from a digest.

The main-tree reads beyond the frozen packages were current completion and the precisely named public ATA provenance-follow-up records. No network, build, compiler invocation, transaction, new fixture, source edit, signing bypass, subagent, git mutation, or main-tree write occurred. Excluded program lanes and security documents were not investigated. No source line was fabricated, binary edited, or layout search performed.

Evidence levels used below:

* **Measured:** bytes decoded anew from copied ELF/archive inputs by `analyze.py`.
* **Recorded:** retained candidate command, source/lock digest, compiler selection or prior observation; not original build authentication.
* **Hypothesis:** a falsifiable causal explanation whose missing original evidence remains explicit.

## ATA: exact observations

Original SHA-256: `6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d`.
Best candidate 2/4: `ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b`.

The independent positional comparison reproduces all five failures: 1,199 / 307 / 1,506 / 307 / 1,506. Candidates 2=4 and 3=5 are byte-identical. All 159 windows in each of the six original/candidate inventories have their complete raw hashes rechecked, and recorded internal call destinations are independently decoded. Pass-01's 153 raw mapped windows and 159 normalized/mapped windows remain distinct from whole-file equality. Its 39 ambiguous normalized matches and 35 unresolved indirect calls remain open.

Original `[28592,29032)` (440 bytes) corresponds to best candidate `[28944,29384)`; original `[29032,29384)` (352 bytes) corresponds to candidate `[28592,28944)`. The remaining changed text lies in caller windows `[29704,31160)`, `[34296,34840)`, `[35936,37968)` and `[37968,40512)`. All 581 internal direct destinations correspond under the retained mapping. This does not resolve indirect runtime targets. Three changed bytes are in relocation records `[102800,102816)` and `[102816,102832)`: ordered sites 28968→28880 and 29024→28936, both type 10, symbol `abort`. Sorted/mapped relocation agreement does not preserve record order or raw identity.

The new archive check reads the actual candidate-5 `libspl_token_2022.rlib`, not just previous symbol prose. Its ELF member is `spl_token_2022.spl_token_2022.32652567-cgu.0.rcgu.o` (712,968 bytes; SHA-256 `77658c75f1c2e353ff22902924af5bf3791f303a0b64a155086f6da99ae04e9b`). Four `reserve_for_push` definitions appear, including:

| Archive symbol suffix | Object file offset / size | Candidate-5 linked location |
|---|---|---|
| `h6d451ef99513e40aE` | 2656 / 352 | `[28592,28944)` |
| `hae841c8baece7b9eE` | 3416 / 440 | `[28944,29384)` |

These symbols exist in candidate 5's retained unstripped ELF. The entire linked pair is raw-equal to the pair in best candidate 2. All seven allocated retained section payloads, including `.text` and `.rel.dyn`, equal candidate 5's stripped ELF. Thus the wrong order already exists before stripping in this recorded candidate. The archive has other similarly named definitions: a generic function name alone does not identify the surviving instantiation. Original stripped bytes do not authenticate these original mangled names, generic type identity, or original archive ownership. Full archive membership, symbol extents and hashes are in `evidence.json`.

### ATA provenance and falsifiable hypotheses

**A1 — Cargo/dependency metadata influenced specialization and link order. Plausible, not selected.** Candidate 2 records source `f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca`, lock digest `3c8f402f40488908503e9cc088388c1f95848d79da5141b5cb1a14006d74428b`, host Rust 1.59.0, BPF rustc 1.59.0-dev / LLVM 13, bpf-tools v1.27, and compiler digest `1f070433db37406c128936f1b5baa734a7d4f4c94c6db31d07b890a649ed7a39`. Its log names Solana 1.10.33, SPL Token 3.4.0 and Token-2022 0.4.2. The two retained bodies and changed relative call encodings support an ordering explanation, not missing application logic.

Cargo 0.60 source (`inputs/ata/ata/cargo060-compilation-files.rs`, lines 522 onward) hashes package identity, features, dependency metadata, profile, mode, LTO, target, compiler, workspace wrapper and default-library metadata channel. `cargo060-source-id.rs`, lines 357–375, removes the workspace prefix for path-source hashing. This is mechanism evidence from a captured upstream implementation, not proof that the original executed precisely this implementation. Rust 1.59 mono-item/compiler source hashes in the chronology record are retained reference claims; their source files are not included in the starting packages, so this pass does not promote their described algorithm to independently inspected original compiler evidence.

Contradictions/limits: source/manifest-only chronology candidate 5 reproduces candidate 3's 1,506 differences, not original order. It cannot select a historical metadata value. Best source's timestamp follows the recorded asset upload. A close byte score does not reverse that chronology. Falsification requires an original artifact-linked object/unit graph: if original matching instantiations had the same metadata and object order but changed during linkage, metadata ordering alone would be insufficient.

**A2 — Follow the published Anchor recipe or CI warnings flag. Not a justified next build.** The release metadata names Solana 1.10.33, Debian bootstrap and Ubuntu 20.04. Captured `Anchor.toml` pins Anchor 0.24.2. Its implementation mounts `/workdir`, chooses `docker-target`, uses a relative manifest, and bootstraps Rust without an immutable version. Candidate 2 instead records a direct `/build` command in a digest-pinned image. These are actual recipe differences, but no retained upload-to-build link says which produced the original asset. The release API's asset digest is null; byte attribution to the release is a retained comparison record, not a signature of build provenance.

Contradictions: candidate 4 already adds `-D warnings` and remains byte-identical to candidate 2. Workspace-prefix removal contradicts a simple claim that the mount string must alter Cargo's package metadata hash. It does not prove universal compiler path independence. Public follow-up queries retain empty check/run/comment lists; these do not prove there never was a build or an archive. A2 would become actionable only with the uploader's actual immutable environment and command record, not by guessing what mutable bootstrap downloaded.

**A3 — Change only stripping or add a natural module declaration. Unsupported.** The measured unstripped/stripped candidate-5 payload equality contradicts stripping as the observed cause of this candidate's pair order. Captured SDK v1.10.33 `build-bpf.rs` records default cwd remapping (lines 520–524), `cargo +bpf build` (540 onward), and non-Windows SDK `scripts/strip.sh` selection (615–632). It supplies neither the executed original strip-script bytes nor linker input order or binary digests. No original module declaration is recovered from the two stripped helper windows. No `custom_panic` source or feature assumption is made from the exported symbol.

Needed artifact: original upload-linked pre-strip ELF plus original rlib/object members and linker input list. If the original pre-strip pair matched this candidate but post-strip changed, that would contradict the current bounded strip conclusion. Nothing retained shows that event.

## Metaplex: exact observations

Original SHA-256: `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`.
Candidate 11 ELF: `3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec`.
Retained capture-sized candidate: `2c26e081f3faabf00592a9615fdb19d0115ff1c0ded5acf29548e214704d5283`.

All 1,251 original and candidate window hashes and recorded direct destinations are rechecked. Only Utilize `[236632,241736)` differs; 1,250 raw paired windows match. The original inventory's 460 ambiguous normalized matches on each side remain visible. All 51 Utilize direct calls reach 21 actual target windows whose raw bytes match. Their multisets agree, but their order differs. Neither target equality nor local predicates establishes equivalent paths, cleanup, input state or transitive data. The retained full inventory also has 81 unresolved indirect calls per side.

Exact guard instructions at file offsets 238800, 238816 and 238832:

| Offset | Original hex → branch destination | Candidate hex → branch destination |
|---|---|---|
| 238800 | `1509040000000000` → 238840 | `1509160000000000` → 238984 |
| 238816 | `2d19020000000000` → 238840 | `2d19140000000000` → 238984 |
| 238832 | `3d97070000000000` → 238896 | `2d79120000000000` → 238984 |

These support rejection of zero/over-total/over-remaining for the attributed unsigned roles; they show a different success/error block arrangement. Candidate source already implements those guards and checked subtraction. No further source correction follows from them.

Both relocated address loads move 24 bytes earlier: sites 241008→240984 and 241048→241024, in records `[671616,671632)` and `[671632,671648)`. Diagnostic tuple `[652112,652136)` points to the same `program/src/processor/uses/utilize.rs` bytes and has the same column 39, but its final eight bytes are `5500000027000000` (85:39) versus `5100000027000000` (81:39). All 29 changed 24-byte tuples are independently read, with exact filename range, complete hex and decoded line/column in `evidence.json`.

### Metaplex provenance and falsifiable hypotheses

**M1 — Authentic source spelling/organization accounts for diagnostic and Utilize differences. Plausible, underdetermined.** Grouped original-minus-candidate coordinates are:

| Source suffix | Tuples | Line delta | Column delta |
|---|---:|---:|---:|
| `processor/burn/nonfungible.rs` | 5 | +1 | 0 |
| `processor/edition/convert_master_edition_v1_to_v2.rs` | 3 | +3 | 0 or +20 |
| `processor/edition/create_master_edition_v3.rs` | 1 | +2 | 0 |
| `processor/metadata/transfer.rs` | 4 | +1 | 0 |
| `processor/uses/approve_use_authority.rs` | 2 | +2 | 0 |
| `processor/uses/revoke_use_authority.rs` | 2 | +1 | 0 |
| `processor/uses/utilize.rs` | 1 | +4 | 0 |
| `processor/mod.rs` | 3 | +1 | 0 |
| `utils/metadata.rs` | 8 | +5 | 0 |

A natural import, declaration, statement expansion, comment, formatting change or macro provenance could shift coordinates; these records do not identify which. The conversion tuple at `[651176,651200)` is 60:30 versus 57:10, which contradicts explaining every mismatch by inserting lines alone. Processor module declarations in the retained source are visible, but a +1 shift at its later diagnostics does not prove a missing `mod` or its location. The single Utilize point cannot locate four earlier missing lines. No padding or synthetic coordinates are justified.

`source-snapshot.tar.gz` contains exactly 18 changed source members, all rehashed against candidate 11's source manifest. `static-evidence.tar.gz` retains earlier public/candidate10 fragments and static analyses; it is not a recovered historical source release. It contains no full original lockfile or complete original dependency tree. The 18-file patch is explicitly reconstruction, not authenticated upstream source.

M1's decisive missing artifact is the original source archive (including module roots, cfgs/macros, dependency sources and exact lock) linked to this deployed payload. A proposed authentic declaration must explain the relevant coordinates and bytes without disturbing already matching bodies. If such a source explains line counts but not the column/Utilize instructions, that proposal is insufficient. Existing bytes do not uniquely supply this archive.

**M2 — Change toolchain/dependency/link/strip selection. Not justified.** Candidate 11 records public source `17e99434af5ead3e989c08f32af33609821d0bc0` plus the 18-file patch, program lock digest `64bb1d34591c281ead97a070ef304be3f8d290a2f4c47d7c367acf51a20fc730`, image digest `43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467`, host Rust 1.69.0 and selected platform-tools v1.37 rustc 1.68.0-dev / LLVM 15.0.7 (digest `7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384`). Logs show Solana 1.16.12, Token-2022 0.8.0, ATA 2.1.0 and multiple Borsh/context-derive versions. The command uses `cargo build-sbf`, sparse registry configuration and `--locked`; it does not explicitly pass `--tools-version`. A post-build selected-tool record is weaker than an original compiler-entry process trace.

Original `.rodata` contains Linux-distributed platform-tools sysroot paths, independently located in `evidence.json`; it also contains a `hashbrown-0.12.3` path. Those constrain embedded provenance, not the full application's resolved graph or unique build host. Candidate `.rodata` already matches in full. Both originals have only the nine recorded section entries and the exported `entrypoint`/`custom_panic` function names; neither has a `.comment` or debug section carrying an original compiler build identity. A symbol name does not prove which source or macro defined it.

Contradictions/limits: 1,250 raw body matches and matching rodata give no byte-backed reason to substitute a new dependency/compiler family. The candidate's selected compiler reports unknown commit/date. No artifact-linked original rustc/Cargo/linker/strip invocation or original intermediates are retained. The inaccessible security-repository revisions in `provenance.json` are a source lead only, not attribution to the captured ELF. No unavailable commit is reconstructed from its hash. Falsifying a source-only explanation needs original intermediate code/IR/object and exact compiler identity showing a differing generated body despite identical authentic source; current records cannot make that comparison.

The recorded 135 finite comparisons remain historical evidence. Only fourteen distinct saved Utilize cases request one use; they do not establish zero-use or all cleanup/allocator paths. They were not replayed or expanded here. The candidate-11 hosted build's final equality failure is retained in its README/comparison record, not replaced by static-check success.

## Missing artifacts and decision

For **ATA**, obtain an asset-hash-linked upload/build record, actual source and resolved lockfile contents, features/Cargo unit graph (especially Token-2022 `-Cmetadata` inputs), host and target Cargo/rustc digests and complete invocations, immutable bootstrap/image identity, original rlibs/objects/pre-strip ELF, and exact SDK/link/strip scripts and input order. The public release command and five failed candidate records do not supply these.

For **Metaplex**, obtain a deployment-hash-linked historical source/module archive and resolved lock/dependency tree, compiler-entry trace and tool digests, and original pre-link/pre-strip artifacts. This must explain both the 29 coordinate tuples and the Utilize body. A private-repository name, compiler version string, or diagnostic line delta is insufficient.

These are acquisition requirements, not permission or instructions to fetch/build. No new source patch, build command, tool version, path change or strip recipe is selected. Preserve both best candidates and every failed candidate. Whole-original identity remains false, historical recipe uniqueness remains unproved, and completion counts do not change.

## Reproduction and handoff

Run `python3 -B verify.py` from this package or by absolute path. It uses Python's standard library, validates the exact file allowlist/manifest and selected historical seals, rederives byte differences, every retained window hash/direct destination, archive membership, candidate-5 unstripped section equality, and all changed Metaplex diagnostic tuples. It reads targets as data and writes nothing. No inherited build script is executed. `python3 -B analyze.py --write` regenerates only the analytical JSON in a new unsealed working copy.

`manifest.json` seals every payload, including `ownedmap.json`; `manifest.sha256` seals that manifest. The owned map explicitly lists the two seal files, which cannot hash themselves. Separate-copy and deliberate-corruption verification results are delivered in the adjacent `verification.json`, outside the sealed package. SHA-256 integrity does not authenticate historical origin, and static-verifier success does not mean candidate equality.
