# Fees residual attribution: published e501ca2

Static refresh complete. The machine catalog retains **548 named candidate ranges and 585 inferred original windows**, including all unresolved rows. The strongest concrete source proposal is to restore the witnessed `state.rs` ownership of four account declarations. A potentially more valuable initializer layout lead has complete immediate calls/data evidence but does **not** yet justify a particular field/type edit. No program build, runtime probe, dependency trial, main-repository edit, commit, publication, or chain action was performed.

## Artifact identities and baseline

| Artifact | SHA-256 |
|---|---|
| Current candidate | `e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f` |
| Captured original | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Current named symbols | `173b1310cd99717906797d9253a01d40c56ba6fc8421f93828c49e860d353b78` |
| Earlier Fees inventory candidate | `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa` |

The symbols' entire text equals the current candidate text. `inputs.json` records origins, sizes and hashes; raw original, candidate, symbol ELF and relevant source copies are frozen in `inputs/`. The earlier inventory predates both the accepted social exit and dependency family. Its addresses are retained only as labeled historical correspondences; symbol spellings with Rust hash suffix removed are correspondence leads, not proof of historical source identity.

The accepted social exit is now candidate **[209184,209744)** versus original **[405560,406120)**. Its full normalized body, seven direct targets and three literal spans pass the portable verifier. The accepted six Pubkey helpers occupy candidate **[643824,646464)** versus original **[751992,754632)**, including the 1,520-byte formatter and 40-byte raw-equal wrapper. All ten formatter direct-target body comparisons are rechecked. No dependency version trial is proposed. The frozen family report accounts for exactly these eight already accepted selections:

| Package | Previous | Current |
|---|---|---|
| solana-instruction | 2.3.3 | 2.2.1 |
| solana-loader-v3-interface | 5.0.0 | 3.0.0 |
| solana-program | 2.3.0 | 2.2.1 |
| solana-pubkey | 2.4.0 | 2.2.1 |
| solana-signature | 2.3.0 | 2.2.1 |
| solana-sysvar | 2.3.0 | 2.2.1 |
| solana-vote-interface | 2.2.6 | 2.2.1 |
| solana-zk-sdk | 2.3.13 | 2.2.0 |

This assignment rechecks body gates, not Cargo resolution or runtime receipts. Nine source-record checks and 17,441 comparisons remain inherited evidence in the published package, not new results here.

## Exhaustive denominator and residuals

All ranges use ELF file offsets and exclusive ends. Candidate ranges partition all **696,208 text bytes**. Original metadata windows cover **799,648 text bytes**; they are inferred from call/relocation entries, not recovered debug-symbol functions. Tiny thunks remain included.

| Measure | Current |
|---|---:|
| Named candidate ranges, including 29 eight-byte ranges | 548 |
| Ranges at least 16 bytes | 519 |
| Published matcher convention: bounded call-consistent, at least 16 bytes | 409 |
| Published matcher convention: raw equal, at least 16 bytes | 69 |
| Fresh bounded-window unique-call consistency, all sizes | 436 |
| Raw-equal candidate windows, all sizes | 98 |
| Candidate ranges with all immediate direct target body patterns supported | 415 |
| Unmatched candidate windows | 109 |
| Candidate bounded-mapping conflicts | 3 |
| Original windows with consistent candidate pattern | 435 |
| Original unattributed windows | 147 |
| Original bounded-mapping conflicts | 3 |

The earlier published convention was 398/512; current 409/519 reproduces the new published package. **Do not subtract the fresh 436 count from the old 425 count as a like-for-like recovery claim.** The old table inherited whole-text-search ambiguity conventions. The fresh method only uses entry-bounded original windows and therefore identifies two additional *metadata* conflicts. Both Rent calls at body offset 232 target original **[799664,799936)**, the terminal text window. Candidate **[693944,694216)** has exactly the same raw SHA-256, `5064629c0b173ec75a08a105975751990109ead5c78610174e373612d9c53026`. Lack of a next entry excludes that match from the strict index; this is not a semantic or compiler failure.

`catalog.json` contains every body, raw hash, symbols, raw signed direct call operands, external syscalls, indirect-call boundaries, relocated pointer addresses, candidate/original mappings, and baseline correspondences. `residuals.json` contains all **112 candidate and 150 original** strict residual rows, explicitly including the two terminal-boundary artifacts. `leads.json` retains all 55 one-to-eight-slot same-size leads, including ambiguous alternatives. No identity is accepted solely from similarity. All bodies retain transitive-data uncertainty even when their normalized patterns match.

The remaining nonterminal normalized-shape call discrepancy is `anchor_spl::associated_token::create_idempotent`: candidate **[575240,576168)** versus original **[681648,682576)**. At +72, candidate target 593272 has its bounded pattern at original 700528, but the actual original call reaches 700488. This is an unresolved helper attribution issue, not an established ATA behavior defect. It was not retried via dependency changes.

## Complete immediate evidence: initializer layout lead

`initialize_fee_program_global` is candidate **[463456,466448)** versus original **[85560,88552)**. These are complete 2,992-byte windows. The only normalized differences are these loads from r7:

| Instruction offset | Candidate displacement | Original displacement |
|---|---:|---:|
| 968 | 376 | 368 |
| 1008 | 368 | 360 |
| 1048 | 384 | 376 |
| 1304 | 410 | 402 |
| 1320 | 409 | 401 |
| 1336 | 408 | 400 |
| 1352 | 400 | 392 |
| 1368 | 392 | 384 |

At +40 r7 loads the accounts pointer from the context argument; the later differing block clones AccountInfo fields for event CPI. Every difference is -8 in the original. The complete body has **nine direct call sites**, all with matching complete normalized target windows and relocation patterns. Both relocated data references are fully accounted for: +2232 points to the identical 32-byte program Pubkey (candidate 700421, original 806573), and +2424 points to the identical 17-byte `__event_authority` seed (candidate 699036, original 802498). The seed length is stored at +2472. `focused-proof.json` records all ranges, hashes, calls, incoming callers and literal bytes. Inline immediate constants are covered by the complete normalized-body comparison.

This proves a bounded layout discrepancy with complete *immediate* calls/data coverage. It does not close descendants of those calls or prove historical field declarations. The source `contexts.rs:47–58` uses `#[event_cpi]`; the retained Anchor 0.31.1 macro already emits by-value `AccountInfo` for both event fields. Replacing that macro with those same explicit fields is therefore not an evidence-backed correction. The field ordering/type responsible for the eight-byte shift, versus compiler/ABI layout effects, remains unresolved. No speculative boxing/unboxing patch is offered.

## Strongest concrete next source change

Restore these account declarations to the witnessed `programs/pump-fees/src/state.rs`, preserving fields and semantics and updating imports or re-exports:

| Account | Current complete codec | Original complete window | Current source line | Observed original diagnostic |
|---|---|---|---|---|
| BuybackVault | [251456,252184) | [529488,530216) | buyback.rs:62 | state.rs:50 |
| SocialFeePda | [188656,189400) | [531232,531976) | social.rs:70 | state.rs:113 |
| DonationFeePda | [151912,152640) | [532872,533600) | donation.rs:99 | state.rs:135 |
| FeeProgramGlobal | [315304,316032) | [535376,536104) | types.rs:80 | state.rs:154 |

Each complete codec has all seven immediate target body patterns supported. Exact type-name literals agree. The changed slots +528/+536 encode source line and filename length; FeeProgramGlobal needs only +528 because `types.rs` and `state.rs` have equal path length. The pointer at +488 resolves the actual source filename, rather than inferring it from a matching window. `focused-proof.json` provides the complete bodies, call target hashes and exact filename/type-name extents.

**Do not move SharingConfig into state.rs.** Its candidate **[155064,155808)** versus original **[442944,443688)** identifies the separate original path `programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs:37`, versus `donation.rs:108` now.

`next-change.json` is the concrete parent proposal. This is authentic module-ownership recovery supported by captured literals, not a promise of binary improvement. Do not pad files to observed line numbers or fabricate source locations. Additional codec relocation targets include diagnostic/vtable records whose full extents and descendants remain unresolved, explicitly listed in the proof. Thus these codec leads do **not** have complete transitive data closure. Reconstruct natural module contents before expecting original line identity. A later separately authorized fixed-recipe build and appropriate existing checks would be needed before accepting an executable change.

FeeConfig's custom wrapper/decoder architecture also remains unresolved; previously attempted decoder variants are not repeated. Broad unmatched parser/handler/library bodies are retained in the machine residuals without invented semantic attribution. No new behavioral correction is established by this assignment.

## Reproduce

From this directory, run:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 verify.py
```

The verifier needs only Python's standard library and the files in this directory; it performs no build, ELF execution or network access. It checks the seal, regenerates the full catalog and leads, regenerates six focused proofs, checks accepted social/dependency body gates and verifies exhaustive residual membership. `manifest-sha256.json` seals report, code and results; `inputs.json` separately binds every preserved input. The scripts preserve executable bytes and normalize only in memory. Whole-byte equality and complete semantic/transitive equivalence remain unproved.
