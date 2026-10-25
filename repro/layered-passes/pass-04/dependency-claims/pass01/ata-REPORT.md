# ATA residual analysis at immutable c1ffdd0667608d4755227e68aab9f27a7e9a0d37

**Whole-file equality remains false. The prior 307-byte discrepancy is correct: 304 text bytes and three relocation bytes, in 126 maximal contiguous mismatch ranges.** Both files are 105,032 bytes; neither has an excess tail. All 159 inferred windows correspond under the recorded address mapping. Only 153 are raw-equal at their mapped placements. No grounded natural source correction or authenticated historical recipe can be selected from the retained records. No patch is proposed.

| Input | SHA256 |
|---|---|
| Captured dependency `evidence/dependencies/associated_token/deployed.so` | `6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d` |
| Best candidate `repro/pump/ata-candidate-build-2/spl_associated_token_account.so` | `ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b` |

All inputs were extracted using `git show` at the full commit above. Moving branches and working-tree candidate files were not used. [Input provenance](input-provenance.json) binds each frozen path to size, SHA256 and Git blob ID. It distinguishes primary baseline paths from previously published nested evidence copies. Historical claims in retained reports remain historical claims. The verifier checks the prior 67-input package as well as this new analysis.

## Exact remaining bytes

Offsets here and in JSON are decimal ELF file offsets; intervals are half-open. The recorded address mapping is identity except original `[28592,29032)` maps by +352 and original `[29032,29384)` maps by −440. The observed text section uses equal file offsets and virtual addresses; headers retaining that fact are included in the ledger. No mapped or normalized executable is emitted.

| Original inferred ordinal | Original extent | Candidate extent | Same-position differing bytes | Mapped differing direct calls |
|---|---|---|---:|---:|
| 38 | 28592–29032 | 28944–29384 | 181 | 4 |
| 39 | 29032–29384 | 28592–28944 | 101 | 3 |
| 41 | 29704–31160 | same | 9 | 7 |
| 44 | 34296–34840 | same | 2 | 2 |
| 46 | 35936–37968 | same | 5 | 4 |
| 47 | 37968–40512 | same | 6 | 5 |

These account for all 304 text differences. The two moved windows contain respectively 55 and 44 instructions. Across the six windows, 25 internal call encodings differ. Eighteen internal calls have different numeric target addresses; all 581 internal direct-call destinations agree under the explicit mapping. Calls within moved callers can require different displacements even when their destinations stay fixed.

The remaining three byte differences lie in relocation records 247 `[102800,102816)` and 248 `[102816,102832)`. Ordered record sites change from 28968 to 28880 and from 29024 to 28936. Both records have info 4294967306, type 10, symbol index 1 (`abort`). **Record-index comparison and mapped-site comparison are different operations:** correspondence maps all 346 original relocation sites to candidate sites with identical info, but the mapped match can occur at a different record index. The ledger retains both orders and the explicit original-to-candidate record-index mapping. Sorting to compare multisets cannot establish original byte order.

The [complete residual ledger](residual-ledger.json) contains each differing original/candidate byte, each maximal range, every section payload hash and header, ELF/program headers, all relocation records and site bytes, and a disjoint partition covering the entire file. ELF header `[0,64)`, program headers `[64,288)`, section headers `[104456,105032)`, and the five-byte non-section interval `[96899,96904)` are raw-equal. No tail, uncovered file interval, header difference or additional section difference is hidden by the text comparison.

## Body, control flow, calls and data

The retained ELF reader is copied verbatim and sealed. It infers entries from nonempty function symbols, the ELF entrypoint, direct call targets and type-8 pointer targets. Only two named function symbols survive in each stripped ELF (`entrypoint` and `custom_panic`). All 159 original windows and all candidate windows are preserved. Text interval coverage is complete under this method; this does **not** authenticate historical function boundaries or exclude merged/split functions. The prior inventory is also preserved verbatim in the ledger.

The fresh instruction scan records 731 calls: 581 signed internal direct calls, 115 external relocated calls and **35 indirect/unresolved calls**. Internal destinations are calculated from the signed little-endian immediate as `site + 8 + immediate * 8`; assembly comments are unused. Every direct destination is retained, including its entry-membership status. External symbol/relocation identity matches, but the host implementation is not recovered by comparing symbol names. Indirect operands are retained with null targets; identical call-register instructions are not treated as proof of actual target equality.

All 1,638 static branch targets match under address mapping. Each branch operand and both mapped target addresses are retained. Branch feasibility, input coverage, runtime pointer values and allocator failure behavior remain unproved. No transaction, fixture, runtime probe, compiler or type checker was run.

All 159 mapped instruction windows are equal under the retained normalization, which masks internal-call immediates and designated relocation operands. Thirty-nine original windows have more than one normalized candidate. Every alternative is retained. The address mapping and target checks provide more evidence than normalized shape alone, but do not make source identity unique.

All 346 relocation records are inventoried: 231 type-8 pointers and 115 type-10 external calls. All 231 statically decoded pointer addresses correspond. Type-8 interpretation follows the existing parser: split LDDW immediates for text, upper-32-bit addend for data sites. Every decoded pointer retains its encoding and file-backed target section. The scan also retains every LDDW, including constants without relocations whose pointer intent is unknown.

The `.rodata` (4,555 bytes), `.data.rel.ro` (1,312 bytes), `.dynamic`, `.dynsym`, `.dynstr` and `.shstrtab` payloads are raw-equal. For referenced bytes the ledger deliberately reports a **section-bounded backing interval**, not an invented object length: 220 type-8 referenced section suffixes are equal, while 11 are unequal because their bounds include differing text. These eleven broad text-suffix differences do not establish eleven different referenced function bodies. Exact object extents and dynamically computed/loaded references are unresolved. There is no claim of unlimited transitive data or runtime-call closure.

Raw equality compares the byte at each file offset. Moving a body changes that comparison, adjusting a relative call changes its encoding, masking that encoding discards information, and sorting relocation records discards ordering. Consequently neither 159 normalized matches nor verified address correspondence can change the false whole-file equality result.

## Existing candidate and build records

| Candidate | Bytes | Positional mismatches | Text / relocation bytes |
|---|---:|---:|---:|
| 1 | 105032 | 1199 | 1187 / 12 |
| 2 | 105032 | 307 | 304 / 3 |
| 3 | 105032 | 1506 | 1491 / 15 |
| 4 | 105032 | 307 | 304 / 3 |
| 5 | 105032 | 1506 | 1491 / 15 |

Each row was freshly compared against the captured dependency, including excess-tail handling; complete hashes, source revisions, inferred windows, calls, branches, sections and relocations are in the ledger. Candidates 2/4 and 3/5 respectively are byte-identical. No new build occurred. Existing saved comparisons are finite evidence, not exactness or security proof.

Candidate 2 records source `f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca`, lockfile SHA256 `3c8f402f40488908503e9cc088388c1f95848d79da5141b5cb1a14006d74428b`, Linux amd64 image `solanafoundation/solana-verifiable-build@sha256:ee9ad7809009a99a70f659f7cba959e0c3c124e10f771b524914fd42f2b605a8`, host Rust 1.59.0 and direct `/build` `cargo build-bpf --manifest-path /build/associated-token-account/program/Cargo.toml -- --locked`. The retained tool record selects BPF rustc 1.59.0-dev, LLVM 13.0.0, under bpf-tools v1.27, with rustc SHA256 `1f070433db37406c128936f1b5baa734a7d4f4c94c6db31d07b890a649ed7a39`. These are recorded candidate facts, not authenticated original-tool facts. The complete source-manifest hash list is retained; it is not a recovered original source tree.

Recipe constraints are supported by existing source records, without new network access:

- [Anchor configuration](inputs/repro/pump/dependency-provenance-20261025/ata/spl-Anchor.toml), lines 1–2, pins Anchor 0.24.2 and Solana 1.10.33 at the candidate source snapshot.
- [Anchor 0.24.2 implementation](inputs/repro/pump/dependency-provenance-20261025/ata/anchor-v0242-lib.rs), lines 968–998, 1028–1066 and 1082–1103, mounts `/workdir`, uses `docker-target` and a relative manifest, and permits a Debian bootstrap that fetches Rust without pinning its historical version. This differs from the recorded candidate recipe, but supplies no causal proof for specialization order.
- [Cargo metadata construction](inputs/repro/pump/dependency-provenance-20261025/ata/cargo060-compilation-files.rs), lines 522–583, includes package/features/dependency metadata/profile/mode/LTO/target/compiler inputs. [Source hashing](inputs/repro/pump/dependency-provenance-20261025/ata/cargo060-source-id.rs), lines 357–375, removes the workspace prefix. These records do not justify a mount-path experiment, arbitrary `-Cmetadata`, or universal path-independence claim.
- [Token workflow](inputs/repro/pump/dependency-provenance-20261025/ata/spl-.github_workflows_pull-request-token.yml), lines 59–81, orders token before ATA tests and uploads deployment artifacts. [Rust selection](inputs/repro/pump/dependency-provenance-20261025/ata/spl-ci_rust-version.sh), lines 18–22, and [wrapper](inputs/repro/pump/dependency-provenance-20261025/ata/spl-ci_cargo-test-bpf.sh), lines 6–10 and 30–47, establish defaults and warnings flags. They do not bind this job to the uploaded release. Candidate 4 already tried the warnings flag without improvement.

The sealed prior provenance matrix includes excerpt hashes for those exact line ranges. The saved release/chronology records do not recover the original upload-to-build association; the timestamp-supported candidate 5 already reproduced candidate 3. Merely selecting an earlier commit does not improve the evidence.

## Residual classification and next actions

The two moved windows are **linked dependency/helper** residuals, previously attributed to RawVec specializations. That name is retained as a hypothesis supported by earlier attribution, not newly authenticated original symbols. Caller encodings and relocation order are **toolchain/build provenance** residuals. Their mechanical cause is clear; their historical build cause is not. No concrete application-source gap, source-organization edit, or diagnostic/data-byte correction is established by this comparison. Unknown indirect targets, original source ownership, object extents and historical recipe remain **ambiguous/unattributed**. The broader stopped program lanes remain excluded and were not investigated.

Priority 1 is to obtain an artifact-linked original build/upload record, if one is already available to root: exact source revision, actual resolved lockfile, features and Cargo unit graph, host and BPF Cargo/rustc identities, full invocations (especially `spl_token_2022 -Cmetadata`), original image/bootstrap digest, SDK/link/strip phases and upload association. Priority 2 is an artifact-linked original intermediate library/build directory to distinguish metadata/specialization ordering from source ownership. Neither exists in the reviewed evidence at sufficient specificity. A release verification command with mutable bootstrap is not that record.

Only after such evidence selects one authentic recipe should root consider a bounded natural correction and authorized build. Until then retain candidate 2/4, no padding, offset edits, source shuffling or version/flag search. This package proposes no patch, changes no accepted count and makes no whole-original identity claim. The user's ultimate byte-identical goal remains open because the authentic original recipe is missing.

## Reproduction and sealing

Run `python3 verify.py` from this directory or invoke it by absolute path. It verifies the immutable manifest, all frozen Git blob contents, regenerates and compares the complete ledger/result in memory, and runs the retained earlier verifier. It requires only Python's standard library, performs no network access and writes nothing. `python3 analyze.py --derive` is the explicit analytical-output regeneration command for an unsealed next-pass copy; it never writes target binaries. A new accepted snapshot requires newly frozen inputs and a new manifest; the old seal must not be reused.

`manifest.json` binds every payload file; `manifest.sha256` binds that manifest. The manifest hash is also carried in the root handoff receipt. A separate full copy under the assigned directory is used for portable verification, independently of the repository and original publication path. Integrity sealing is not external historical authentication. All output is confined to this assigned worker directory.
