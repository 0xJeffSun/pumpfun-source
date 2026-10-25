# Accepted AMM d27be7e9: complete static residual inventory

This package inventories the frozen accepted AMM candidate. **The whole captured original and candidate are unequal.** There is no newly accepted source change, new handler, runtime replay, build, security conclusion or proposed byte patch. No new application-source defect sufficiently grounded to justify a minimal implementation patch was found in this static pass. `pending-proposals.json` contains evidence-gated next actions, separately from accepted source.

All repository inputs were obtained with `git show c1ffdd0667608d4755227e68aab9f27a7e9a0d37:<path>`. Moving main was not used. `input-provenance.json` records each original repository path, commit, Git blob identity, file size and SHA-256. `inputs/docs/COMPLETION.md` and `inputs/docs/PARALLEL_WORK.md` define scope. The 22 compiled source inputs match the frozen checkpoint's `current-main-bindings.json`. Source files, Cargo.lock, build phase evidence, original static results and historical inventories are included intact.

## Exact file identity and byte coverage

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| Captured original | 10,485,715 | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Accepted candidate | 1,199,048 | `d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1` |
| Candidate symbols ELF | 1,682,424 | `1288a48824e53fb7e02d0864ae5b8b5779a0b9810abb5973ee63d49f2cffb192` |

There are **670,956 unequal byte positions in the shared file extent**, plus **9,286,667 original-only positions** in `[1199048,10485715)`: **9,957,623 differing or missing positions total**. Missing positions are not compared as synthetic zero bytes. Every maximal mismatch interval appears in `analysis/whole-file.json` with exclusive end offsets. The entire original is retained, including its **9,217,211-byte all-zero tail** after the declared ELF extent at 1,268,504. This is an observed capture property, not permission to append padding to a candidate.

`analysis/file-region-coverage.json` partitions every artifact byte into ELF/header/section or unclaimed regions, retaining region hashes and nonzero counts. The candidate has no tail past its declared 1,199,048-byte ELF extent. File positions do not establish semantic correspondence after changed layout.

| Section | Original bytes | Candidate bytes | Unequal positions in shared section extent | Unequal/missing positions |
|---|---:|---:|---:|---:|
| `.text` | 1,162,040 | 1,103,880 | 602,277 | 660,437 |
| `.rodata` | 25,715 | 24,155 | 22,974 | 24,534 |
| `.data.rel.ro` | 8,584 | 8,672 | 2,941 | 3,029 |
| `.rel.dyn` | 70,384 | 60,608 | 10,727 | 20,503 |
| `.dynamic` | 176 | 176 | 15 | 15 |
| `.dynsym` | 408 | 384 | 7 | 31 |
| `.dynstr` | 255 | 228 | 21 | 48 |
| `.shstrtab` | 72 | 72 | 0 | 0 |

These comparisons align section-relative positions; they are separate from whole-file positional comparison. `section-differences.json` retains every interval, each original/candidate section header, and excess tails. `header-differences.json` lists changed ELF fields and both program-header tables. `elf-layout.json` retains all section/header records and relocation entries, including raw bytes. `all-symbols.json` preserves all 17 original, 16 candidate and 12,179 unstripped symbol-table entries, including undefined, data, zero-size and aliased symbols.

## Complete body, call and uncertainty ledger

`analysis/residual-ledger.json` retains **all 785 original inferred windows**, **all 653 candidate symbol ranges** (668 function-symbol rows including aliases), and **653 independently inferred candidate intervals**. Both text sections are fully covered, with no uncovered intervals or symbol-range overlap in this input. Absence of uncovered bytes does not establish authentic function boundaries: an entry inferred from a direct call or relocation may split a historical function; an indirect-only entry may be absent. All original symbols and all current names remain in the package.

There are **310 original windows without a complete normalized match** and **197 candidate symbol ranges without an original normalized counterpart**. Of the 475 original windows with normalized options, 158 have multiple options. Ninety-two original windows have a raw body match among the normalized options. Independent raw-byte match lists are also retained, without requiring relocation equality. Every row remains open for historical source/semantic provenance; none is declared a recovered historical function on the basis of a hash.

The normalization is exactly the frozen reader's: mask signed direct-call immediates and actual ELF-relocated call/lddw immediates in memory, require equal complete window length and equal relocation offset/type/symbol patterns. No normalized executable is emitted. Relocation-normalized matches do not mean the referenced objects match. Changed-placement raw body equality does not mean file equality.

Every direct call is decoded from its **signed operand** (`call_address + 8 + signed_imm * 8`). Assembly annotations are not used for targets. The ledger records each callsite, actual target, target-window options, relocated external calls, other unresolved call forms and every indirect call instruction. Every encoded branch retains target, in-window/text status and unresolved feasibility. Each wide immediate retains literal/pointer uncertainty, relocation and target region. For every matching body pair, actual target checks and corresponding relocated references are explicit.

There are 1,136 immediately call-consistent **pairs**, and 1,083 pairs survive recursive pruning over known direct-call edges. These are ambiguous graph relations, not counts of recovered functions. Cycles can survive that fixed point. It deliberately proves nothing about indirect targets, allocation/panic branches, consumed data, external calls or all runtime behavior. Unknowns stay null or explicitly unresolved.

`focused-transitive-closure.json` traverses actual direct targets for each focused root. For example, each fee-update handler reaches 50 windows and retains 14 indirect callsites; each event serializer reaches 17 windows and has no indirect call in that direct closure. The create wrapper reaches 123 original versus 125 candidate windows, with 23 versus 25 indirect callsites. Thus even a normalized wrapper with all immediate target bodies matching does not close its transitive graph. All reachable rows, unresolved edges, external calls and wide-immediate/data obligations are included.

`relocation-data-graph.json` retains every relocation, its encoded addend/target, mapped section, bounded 64-byte-or-shorter preview and relocation sites inside that preview. These preview links are leads, **not recovered object extents**. Data may contain additional nonrelocated/runtime-generated pointers. Full recursive object consumption remains unknown. This package does not claim to prove every allocator failure unreachable.

## Focused reconciliation against the actual accepted bytes

The frozen `static_compare.py`, `verify_update_data.py` and `verify_serializers.py` were rerun with transparent local input-path substitutions in `replay_static.py`. Their full output structures reproduce the saved results. `focused-body-differences.json` additionally supplies raw/normalized byte intervals and actual instruction streams for each focused pair.

| Root | Original / candidate bytes | Complete normalized body | Equal immediate target bodies / callsites |
|---|---:|---|---:|
| create wrapper | 2,320 / 2,320 | yes | 13 / 13 |
| create handler | 3,032 / 3,032 | yes | 12 / 16 |
| create context | 5,752 / 5,752 | yes | 39 / 40 |
| initializer helper | 5,896 / 5,896 | no: 2 instructions | 16 / 16 |
| recipient setter | 2,336 / 2,336 | no: 4 instructions | 23 / 23 |
| create event | 744 / 744 | yes | 4 / 4 |
| update wrapper | 2,296 / 2,296 | yes | 13 / 13 |
| update handler | 2,912 / 2,912 | yes | 12 / 16 |
| update event | 744 / 744 | yes | 4 / 4 |
| each of three scalar setters | 616 / 608 | no | call-order pairs retained; same-offset pairing invalid |

The accepted removal of the redundant event clone is already in the baseline. Both serializations now receive the same event buffer at stack offset -584. Five bounded relocated update references and both inline constants match; four compiler error/format/Location references remain unclosed. The complete Pool (1,704 bytes) and GlobalConfig (1,648 bytes) exits still normalize equally, with all 24 immediate target bodies and the eight-byte discriminator checked separately for each. None is a new proposal.

### Three scalar setters: genuine bound and actual helper specialization

Original ranges are `0x61630..0x61898`, `0x61898..0x61b00`, `0x61b00..0x61d68`; candidate starts are freshly symbol-located. All three source methods use `require_gte!(1000u64, fee, ...)` before storing the fee. In both LP bodies, the actual unsigned branch at +16 rejects values greater than 1000; the success store at +24 targets the same offset 896. The other two retain their own field stores in the instruction ledger. No absent scalar limit is inferred.

The original LP error path at +552 materializes 1000 in r4, then passes fee in r5 and calls original `0x1840` at +568. The candidate passes fee in r4 at +552 and calls actual helper `0x340` at +560. The candidate helper stores r4 and materializes 1000 internally. Its 1,336-byte body has four normalized instruction differences from original `0x1840`. The absent caller instruction changes the success jump displacement and following return sequence placement, accounting for 608 versus 616 bytes together with the diagnostic deltas. All five scalar calls are paired by order with their actual targets; no same-offset equivalence is invented.

There is a complete normalized helper match at candidate **0x1308**, but these scalar setters do **not** call it. Substituting it in an identity argument would be false. These data support a constant-specialization hypothesis, not a unique historical compiler version or sufficient source correction. Do not add attributes, opaque arithmetic or wrappers to force code layout. Continue with retained macro/generic/optimizer evidence if root pursues this lane.

### Recipient origin/data and initializer helper

The recipient setter retains nonzero checks before strictly ordered/unique checks and the accepted source uses `iter().all(...)` then `windows(2).all(...)`. Its four remaining unmasked differences are stores at relative offsets 2008, 2016, 2248 and 2256: original diagnostic lines **256/263** versus current **25/27**, and filename lengths **44** versus **26** twice. The referenced filename bytes actually differ (`programs/pump-amm/src/state/global_config.rs` versus `src/state/global_config.rs`). The equal 23 immediate target bodies do not erase these data differences or resolve transitive metadata.

The initializer helper's two unmasked differences are at +2384/+2392: diagnostic line **6 versus 7**, filename length **57 versus 39**. All 16 immediate target bodies normalize equally. The create context's one unequal immediate target is retained, not silently promoted by the helper's semantic plausibility. These are source ownership/provenance findings, not authorization to reproduce line coordinates with blank lines or fake origins.

The genuine fixed-admin initializer remains **static-only**. The copied source preserves the actual signer/address requirement and initialization context. An authentic successful historical fixed-admin replay and sufficient original prestate are still absent. Finite negative cases and normal runtime/framework premises cannot supply a missing signature. No signer, message, blockhash, history or authorization control was modified or exercised.

## Unrelated residuals and historical reconciliation

The old candidate was `5a68db39…`; it is not the accepted d27 candidate. `historical-reconciliation.json` embeds every historical original and candidate row, gives fresh original-row options, and maps historical candidate names to current name candidates without transferring offsets. The first-pass `all-row-dispositions.json`, `residual-rows.json` and `near-shape-candidates.json` remain intact under `inputs/`. Earlier “create_config absent” conclusions are historical, superseded only to the bounded extent established above.

A fresh exhaustive scan over equal-length/equal-relocation-shape candidates with at most four normalized instruction differences retains **412 pairs across 59 residual original windows**. All alternatives remain in `near-shape-residuals.json`; none becomes an exact match. Seven earlier diagnostic explanations reproduce at fresh locations:

| Original start | Current candidate start | Original / current diagnostic line | Original / current path length |
|---|---|---|---|
| `0x9e3b0` | `0x760f0` | 21 / 51 | 49 / 13 |
| `0xa0068` | `0x77da8` | 21 / 51 | 49 / 13 |
| `0xd44e0` | `0x57c18` | 8 / 4 | 49 / 17 |
| `0xd4f90` | `0x45188` | 25 / 125 | 49 / 12 |
| `0xe0148` | `0x93800` | 36 / 40 | 28 / 10 |
| `0xe0720` | `0x93dd8` | 36 / 40 | 28 / 10 |
| `0xf23f0` | `0xe3ed0` | 36 / 40 | 28 / 10 |

The changed current lines 125 and 40 show why old comparison offsets/coordinates cannot stand in for current evidence. The scan also retains the three earlier toggle leads and all non-diagnostic small-difference alternatives. A pointer-addend discrepancy or repeated tiny closure is not a license to change an account layout.

Large current residual bodies include `multi_hop::amm_hop` (32,128 bytes), `legacy_buy::execute` (27,248), the main `multi_hop_swap` body (25,840), `trade::execute` (25,800), `sell` (24,504), and substantial create/trade/legacy account parsers. Large original residual windows start at `0xaafd8` (17,368), `0x45940` (16,912), `0x9a6a8` (15,624), `0x40a08` (15,512) and `0xbfa90` (14,120). These lists are separate: no unsupported pairing is made. All other windows, calls, branches and references remain in the ledger and TSV, rather than disappearing behind the admin-focused analysis.

Categories are conservative triage, not proven root causes. Original rows comprise 412 linked dependency/helper, 305 ambiguous/unattributed, 63 source organization/ownership, three toolchain/build-provenance and two diagnostic/data-metadata rows. Current rows comprise 424 dependency/helper and 229 application source-ownership rows. Matching rows are included because provenance/data obligations remain. Unknown original identity is never called a concrete missing check. No newly proven application-source gap merits a patch here. Explicitly stopped lanes are listed in `pending-proposals.json` and were not inspected or resumed; AMM's own existing incentive functions are distinct from the stopped Pump lanes.

## Compiler/dependency and acceptance boundaries

`dependency-provenance.json` preserves every package, dependency edge, source and checksum from the accepted lock. In particular it records anchor-lang 0.31.1, anchor-syn 0.31.2, solana-program 2.3.0, Borsh 0.10.4 and 1.8.1, SPL Token 7.0.0 and Token-2022 6.0.0. These are accepted candidate inputs, not recovered original dependency identities. No crate registry was contacted.

The retained phase record distinguishes v1.44 compilation from SDK-selected v1.52 stripping, with recorded compiler/linker/objcopy hashes. A final rustup alias does not identify the earlier compiler. This task checked the published evidence files and source binding, not the historical host tools themselves. No compilation, typechecking, optimizer experiment or version/flag/layout search occurred.

The checkpoint reports 17,462 existing comparisons, 35,418 signatures, 191 scalar and 78 recipient diagnostic checks. Those remain finite **saved evidence**: this task did not execute transactions or newly verify their signatures. Static replay here concerns the Python byte-comparison tools only. Accepted counts stay unchanged; authentic initializer success, whole-original identity, broad input acceptance and security completion stay open.

## Portable reproduction and seal

Run `python3 -B verify.py` inside a copy of this publication directory, using Python 3.11+. Only the standard library is required. The verifier checks the immutable manifest seal, every packaged file, original Git blob identities and the 22 source bindings; reruns all three frozen static comparators; regenerates the complete inventories into a temporary subdirectory **inside the copied package**; and requires byte-identical analysis outputs. No repository, credentials, network, compiler or target execution is needed. It cleans only its own temporary analysis directory.

`manifest.json` covers every publication payload except itself and `manifest.sha256`; the latter records its SHA-256. This is a reproducibility/integrity seal, not an external authenticated signature. The separately retained `portable-verification.json` in the worker directory records verification after copying the complete package. Root owns any later acceptance, publication or build.

For the next accepted snapshot, run `analyze.py --original ORIGINAL --candidate CANDIDATE --symbols SYMBOL_ELF --out OUTPUT`. The generic inventory reruns against explicit paths; fixed-focus conclusions are enabled only for the frozen hashes. `enrich.py` and the frozen replay checks intentionally target this published d27 snapshot and must be deliberately updated for a successor, rather than silently transferring old static facts.
