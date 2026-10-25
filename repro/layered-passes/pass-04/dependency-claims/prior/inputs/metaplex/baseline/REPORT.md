# Metaplex frozen residual inventory

The best retained candidate is **not byte-identical** to the captured original. Recomputed from frozen commit `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`: **1,509 changed positions** against the already-retained capture-sized candidate; **88,052 unequal/missing positions** against the unextended candidate ELF, including its **86,543-byte absent tail**. No candidate bytes, source, headers, relocations or allocation padding were changed or generated. No new source correction is justified by this static pass.

| Input | Size | SHA-256 |
|---|---:|---|
| Captured original | 793991 | `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011` |
| Candidate 11 ELF | 707448 | `3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec` |
| Existing capture-sized candidate | 793991 | `2c26e081f3faabf00592a9615fdb19d0115ff1c0ded5acf29548e214704d5283` |

All offsets and half-open ranges in the ledgers are file bytes unless explicitly named virtual. Every input has frozen repository path, commit, Git blob identity, size and SHA-256 in `inputs.json`. The inherited package under `prior/`, including its verifier and all seals, is byte-for-byte unchanged. Its baseline prose remains historical; this report uses the explicitly supplied immutable commit. `docs/COMPLETION.md` and `docs/PARALLEL_WORK.md` were read from that commit and are preserved under `inputs/docs/`.

## Exact residual and coverage accounting

| Region | Range | Changed positions |
|---|---|---:|
| `.text` | [288,628328) | 1477 |
| `.data.rel.ro` | [649384,662136) | 30 |
| `.rel.dyn` | [662816,706800) | 2 |
| Captured zero tail | [707448,793991) | 0 against existing capture-sized candidate |

The ELF header, all four program headers, all nine section headers, other section bytes and intervening file gaps match. `sections.json` records both headers and full section comparisons; `byte-coverage.json` partitions the entire captured file, including non-section gaps. `residual-ledger.json` contains **431 exact differing runs**, their original/candidate hex, classifications and diagnostic-record intersections. `pair-residuals.json` adds the unextended ELF pair and its absent-tail residual; `result.json` preserves both whole-file comparisons and the absent-tail interval; absence is not counted as equality just because the original bytes are zero.

All **1,251 original and 1,251 candidate inferred windows** are freshly recovered from ELF symbols, entrypoint, relocation-address references and signed relative call operands. Every window has both full raw hashes, normalized hashes, anchors, calls, branches and immediate references in `windows.json`. All retained historical window rows are preserved in-place and checked against recomputed hashes. There are **1,250 raw equal and normalized equal paired windows**; the only unequal paired window is ordinal **346**, [236632,241736), 5104 bytes, attributed by retained evidence to Utilize. All paired starts coincide: these window matches are not merely matches at changed placement.

No text bytes precede the first inferred entry or remain outside the last window. This is interval coverage, not a claim that every interval is a historical function. Two sized dynamic function symbols per ELF (`custom_panic` and `entrypoint`) are separately preserved with their own spans in `symbol-windows.json`; a sized symbol need not end at the next inferred entry. No unavailable private debug symbols are invented.

**460 windows on each side have multiple normalized candidate matches.** Every alternative ordinal is retained, along with raw-match alternatives. Same-ordinal placement and identical bytes do not erase this ambiguity or recover unique source ownership.

## Calls, data and Utilize control flow

Each side contains **5,713 signed relative calls, 323 relocated external calls and 81 indirect/unresolved calls** across the complete window inventory. Relocated external `imm=-1` instructions are decoded through relocation symbols, never as self-call anchors. Every one of **2,749 relocation records per side** appears in `relocations.json`, including original/candidate site, raw record, type, symbol and decoded type-8 pointer. Dynamic targets and external implementations remain unresolved in `unresolved-ledger.json`. Raw target-window equality is separate from call-site equality and transitive data identity.

Utilize decodes to **626 instructions / 638 eight-byte slots**, **51 direct calls to 21 distinct targets**, and **91 branches** per side. All 51 called target windows are raw equal at their actual signed destinations. The target multiset matches but **call sequence does not**. This is not path-by-path semantic equivalence. `utilize-decode.json` preserves the complete raw instruction stream; `utilize-cfg.json` splits each side into **107 basic blocks**, records every successor and all raw/normalized matching block alternatives, including matches at changed placement. All branch conditions remain explicitly unproved semantically. A block hash match does not prove its incoming state or outgoing context.

There are twelve wide immediate loads in Utilize on each side. Four resolve to addresses:

| Referent | Evidence | Disposition |
|---|---|---|
| 629320 | Token program key bytes; 32-byte sample | Raw equal; enclosing `.rodata` also entirely equal |
| 652112 | 24-byte source-location tuple | Pointer/length equal; original line 85, candidate line 81, column 39 |
| 631104 | `burn` prefix; sample begins `6275726e` | Raw equal; source uses `BURN.as_bytes()` |
| 631312 | `metadata` prefix; sample begins `6d65746164617461` | Raw equal; source uses `PREFIX.as_bytes()` |

All immediate values are retained, including non-address constants. Samples are explicitly bounded at 32 bytes; no inferred object extent is treated as proven. The tuple's explicit filename length is decoded by the inherited verified analyzer, not inferred from a sample. It names `program/src/processor/uses/utilize.rs`. Identical `.rodata` resolves direct literal byte differences but does not make the diagnostic record or all transitive data equal.

The two changed relocation records are [671616,671632) and [671632,671648), both type 8 with equal loaded addresses. Their sites move from 241008 to 240984 and from 241048 to 241024 respectively, exactly 24 bytes earlier. Their 16-byte address-load instructions are raw equal at the corresponding moved sites. This accounts for the relocation differences without editing records or attributing an unknown historical compiler decision.

## Supported source decisions and remaining historical evidence

`prior/utilize.rs` has SHA-256 `9ce4753676e73e6565b957d86eecf113ce16cade3f782d849e2f7a97b640bed7`. The unchanged inherited verifier rechecks all 18 archived changed source files against the candidate and upstream manifests, source patch and decompressed build log. `source-attribution.json` binds every one of the **29 changed diagnostic tuples** to the exact candidate source member and nearby numbered lines; together those tuples cover all 30 changed `.data.rel.ro` bytes. It does not invent original source lines.

| Residual class | What is known | What remains / proposed action |
|---|---|---|
| Concrete application-source gap | Candidate 11 already rejects zero, over-total and over-remaining use counts; retains checked subtraction | No additional supported application edit identified; keep current source |
| Source organization/ownership | Original places error/cleanup before successful subtraction; candidate places successful work first and shares cleanup | Historical spelling, block organization and ownership are not uniquely recoverable; do not rearrange source merely to chase bytes |
| Linked dependency/helper | All 21 immediate Utilize target bodies match raw; every other call is inventoried | Transitive external/indirect behavior, allocator failure and historical API linkage are not proved |
| Diagnostic/data metadata | Exactly 29 tuples differ, including Utilize 85:39 versus 81:39 | Need authentic historical source coordinates; no fabricated padding, paths or line directives |
| Toolchain/build provenance | Recorded Linux/amd64 image and selected compiler identity are preserved | Need authentic deployed build recipe, exact source/dependency/API association; no brute-force variants |
| Ambiguous/unattributed | 1477 Utilize text-byte differences remain despite local predicate/call correspondence | Retain unequal status until a grounded source/compiler explanation produces exact bytes |
| Explicitly stopped | Extra Metaplex runtime probe | Not resumed, prepared, designed or delegated |

The independently decoded guard at 0x3a4d0 rejects `r9 == 0`; 0x3a4e0 rejects `r9 > r1`. At 0x3a4f0 original branches on `r7 >= r9` into success, whereas candidate branches on `r9 > r7` into error. The respective rejection destinations 0x3a4f8 and 0x3a588 load `86 << 32`. For the evidenced unsigned register roles this supports the same local zero/total/remaining predicate. It does not prove every predecessor establishes those roles, all cleanup paths agree, or every allocator failure behaves identically.

The source retains account parsing and metadata/standard checks (lines 35–79), use update (80–97), delegated allowance/owner authorization (98–122), save followed by conditional exhausted-Burn handling (123–151), and checked arithmetic. These are retained source decisions, not missing work to implement again. Existing assembly annotations are not relied on for actual call targets.

The recorded build starts from public source revision `17e99434af5ead3e989c08f32af33609821d0bc0` plus the 18-file patch. The selected program lock digest is `64bb1d34591c281ead97a070ef304be3f8d290a2f4c47d7c367acf51a20fc730`. The recorded image is `solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467`; platform-tools v1.37 selects rustc 1.68.0-dev / LLVM 15.0.7, compiler digest `7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384`. Host Rust 1.69.0 is not the selected SBF compiler. Its compiler commit/date are unknown, and the deployed recipe is not established by the retained successful candidate build. These are frozen records, not newly queried services.

The inherited static verifier rechecks 135 saved cases and decodes their existing transaction bytes. It does not execute transactions or cryptographically reverify signatures. Only fourteen distinct saved cases target Utilize; all request one use and nine accounts. Existing comparisons therefore remain finite regression evidence, without proving zero-use, delegated, exhausted-Burn or exhaustive failure semantics. No new fixture or probe was created.

## Separate captured-tail verification

The original bytes [707448,793991) contain **86,543 zeros**, SHA-256 `1b2375eb207e27a905c91cfe8b5de1777d0db39d5f030d3b96d202520e1236ea`. They equal the independently read tail of the existing capture-sized candidate. Its prefix separately equals the retained candidate ELF. This is a static observation of existing allocation bytes, not an allocation runtime assertion or permission to modify binaries.

## Priorities and verification

1. Root can use this complete inventory as the baseline for the next accepted source snapshot. Preserve the existing source semantics and stopped-lane status; no new patch accompanies this report.
2. Resolve authentic historical source/module coordinates and compiler/API/build provenance from already admissible evidence. Missing historical evidence must remain missing rather than be replaced with speculative source layout.
3. If root later accepts a grounded candidate, run `python3 -B compare_pair.py ORIGINAL CANDIDATE OUTPUT_JSON` to produce a fresh static pair inventory. That reusable path retains each side's windows independently and all possible raw/normalized matches; it does not transfer this snapshot's source attributions to a new candidate.
4. Recheck exact whole-file equality, tails, calls, data and all residual rows. An accepted new build remains root-owned. The current package does not close whole-original equality or change any accepted count.

Run **`python3 -B verify.py`** inside this publication directory or any separate copy. It verifies the complete immutable SHA-256 manifest, frozen Git blob identities, unchanged inherited seal/verifier, and every recomputed output. The script uses only Python's standard library and performs no builds, network calls or target execution. `manifest-sha256.json` is a local integrity seal, not an external signature. Its digest is recorded outside the sealed directory in `verification.json`, together with the separate-copy verifier result.
