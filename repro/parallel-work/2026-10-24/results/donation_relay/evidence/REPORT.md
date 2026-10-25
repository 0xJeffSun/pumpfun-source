# Donation relay static reconstruction handoff

This assignment accounts for **all 492 inferred windows and all 11 IDL dispatch branches**. It provides four binary-corroborated fixed account wire models, one IDL-shaped variable account model with binary prefix corroboration, and one unnamed pure register-level fragment. **All 492 windows remain source-unattributed**: none of these results establishes original source provenance, a deployable replacement, security completeness, or whole-byte equality.

Only retained evidence was read. No builds, SBF/Rust execution, runtime probes, network requests, chain calls, source repository searches, workers, commits or publication were performed. All writes are inside this assigned directory. Stopped lanes were not resumed.

## Evidence and baseline

The parent supplied published checkpoint `8099031` (Pump92575cd, Fees e501ca2, AMM5a68db, Mayhem9e4e19). This analysis uses the older `work/dependency-function-gap-inventory/donation-relay-functions.json` baseline, not an inventory refreshed against newer Pump/Fees candidates. No cross-program candidate matching is used here. `docs/COMPLETION.md` and `repro/status.json` were read first and frozen in `inputs/`.

Captured relay: 830,448 bytes; SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. Its text extent is **[288,752776)**, 752,488 bytes. All ranges in this report and JSON are decimal, half-open ELF byte offsets; this ELF's `.text` address equals its file offset. The raw captured ELF is copied unchanged in `inputs/deployed.so`.

Retained IDL JSON SHA256 `b075f7b39b019630067e5f6a67015396ccbd66d282c7da048753660506472d6c`. The frozen IDL account has a 5,991-byte compressed payload at **[44,6035)**. Decompression reproduces the parsed IDL, version 0.6.0. The decompressed byte hash is distinct from the pretty-printed JSON hash. No new RPC observation was made. Input paths, lengths and hashes are in `inputs-manifest.json`.

The supplied relay attribution/provenance records retain the embedded source URL and prior unavailability observations. They do not contain recovered original Rust text or an artifact-linked source revision. This pass adds precise references to the 26 embedded local paths, not source recovery. Thirty-four windows directly reference such paths; five are discriminator wrappers, leaving 29 in the separate path-reference group. Inlining, diagnostics and generic code prevent these labels from proving function identity. The `fair_distribution.rs` string exists, but this pass does not establish a direct text LDDW reference to that path or identify its original function.

## Exhaustive grouping

`all-windows.csv` is the compact exhaustive ledger: every ordinal, exact range, SHA256, group, direct callers/callees, dispatch affiliations and indirect-call count. `windows.json` adds raw branch/data-reference evidence; `instructions.json` preserves decoded fields and raw instruction bytes. `groups.json` is a disjoint partition, not a recovered-symbol table.

| Group | Windows |
|---|---:|
| account_discriminator_check | 5 |
| dispatch_wrapper | 11 |
| embedded_local_path_references | 29 |
| exported_entry | 2 |
| outside_dispatch_direct_call_closure_unattributed | 168 |
| shared_static_dependency_unattributed | 238 |
| single_dispatch_dependency_unattributed | 39 |

Entries are independently re-derived from exported entries, internal direct-call targets and relocation-derived function pointers, then checked against every baseline window hash. No source-function boundary claim is made. Data-reference extraction covers immediate file-address constants and the recorded relocations; it is not a complete pointer analysis.

There are 89 indirect-call sites. Direct-call closures below are structural sets including the root wrapper, not executable-path proofs. The optional branch/fallthrough graph reaches 407 windows for each wrapper because conservatively treating unknown terminal calls as returning connects otherwise separate regions. It is intentionally kept separate and must not be used to infer shared semantics or dead code. The 168 windows outside direct closure remain unresolved, not irrelevant.

## All dispatch branches and immediate reconstruction dependencies

`dispatch.json` preserves each discriminator constant PC, comparison PC/raw opcode, branch target, call PC, wrapper range/hash and complete IDL instruction. `branch-landmarks.json` records the candidate parsing roles and actual direct-call chains below. Candidate roles are hypotheses, while the edges and ranges are byte facts.

| Instruction | Branch | Wrapper range | Direct closure size | Argument candidates; account candidate; downstream direct chain (ordinals) |
|---|---:|---|---:|---|
| close_donation_epoch_v1 | 516776 | 542112–544128 | 150 | []; [142]; [204, 96] |
| distribute_after_just_swapping_v1 | 517112 | 547224–549192 | 160 | [78]; [146]; [201, 97, 108] |
| distribute_non_swap_output_mint_v1 | 517224 | 549192–551160 | 156 | [78]; [148]; [200, 98, 108] |
| donate_native_pubkey_config_id_v1 | 516552 | 537080–539584 | 204 | [74]; [131]; [192, 93, 112] |
| donate_native_v1 | 516440 | 534576–537080 | 204 | [74]; [126]; [191, 92, 112] |
| donate_pubkey_config_id_v1 | 516328 | 532048–534576 | 186 | [74]; [135]; [190, 94, 112] |
| donate_pubkey_config_id_with_payer_v1 | 516664 | 539584–542112 | 186 | [74]; [138]; [193, 95, 112] |
| donate_v1 | 516216 | 529520–532048 | 186 | [74]; [121]; [190, 94, 112] |
| just_swap_v1 | 517000 | 545792–547224 | 170 | [77]; [150]; [202, 99] |
| swap_then_distribute_v1 | 516888 | 544128–545792 | 183 | [77, 78]; [154]; [203, 100, 108] |
| upsert_mint_whitelist_v1 | 517336 | 551160–552048 | 104 | [79]; [156]; [101] |

For example, donate_v1 and donate_pubkey_config_id_v1 both call ordinal190 at [553640,556736), which directly calls ordinal94, then shared ordinal112 at [131136,141384). Native and payer variants reach that shared dependency through distinct chains. This is dependency evidence, not evidence that the variants have equal checks or effects. The three distribution paths reach ordinal108 [119440,127704), which directly references `tools/distribution/shared.rs`.

## Codec findings and scratch Rust

`reconstruction.rs` is a semantic scratch sketch, not recovered historical code. `codecs.json` supplies field offsets, IDL JSON pointers, exact binary windows/hashes, successful wrapper-to-body call PCs and raw witnesses. The fixed decoders read these serialized layouts; ordinary Rust in-memory layout is different.

| Account | Checked wrapper | Decoder | Serialized bytes including discriminator |
|---|---|---|---:|
| DebouncerV1 | 505216–506304 | 506304–507440 | 82 |
| DistributionV1 | 507440–508560 | 508560–509800 | 98 |
| EpochTrackerV1 | 509800–510920 | 510920–512088 | 90 |
| MintWhitelistV1 | 512088–513224 | 513224–513680 | 13 + 32*n |
| SwapReceiptV1 | 513680–514800 | 514800–515416 | 49 |

Debouncer, Distribution and EpochTracker share bump at8, enum state at9, config_id at10–42 and mint at42–74. The state reads/branches accept byte0 or1 at the decoding layer; this does not establish business-state admission. Debouncer total_amount occupies74–82. Distribution epoch occupies74–90 and total_amount90–98. EpochTracker current_epoch occupies74–90. SwapReceipt has bump8, distribution9–41 and output_amount41–49. The fixed body checks test lower bounds and do not require exact buffer exhaustion. These sketches intentionally omit Anchor errors, panic paths and result representation.

MintWhitelist has bump8, u32 count9–13 and 32-byte pubkeys thereafter under the retained IDL. Body513224–513680 calls vector helper60320–61568; raw witnesses show a four-byte count read and 32-byte element scaling. The borrowed slice sketch does not translate the allocation/growth loop or establish equal resource-limited behavior. The remaining instruction/event/type layouts in `codecs.json` are **IDL-only**, not binary-confirmed serializers.

The unnamed [629280,629312) window is exactly four instructions: set r0=357; if r1==355 jump to return; otherwise copy r1 to r0; return. Its scratch form is `if input == 355 { 357 } else { input }`. Its domain meaning, original name and source type remain unknown. This is a local static translation, not a recovered relay handler.

## Prioritized reconstruction dependencies

1. Finish account/argument codecs and exact error ABI: fixed models are available; variable arrays, UTF-8 strings, share enums, allocation and writers still need full static tracing.
2. Trace shared checks and computation: `checks.rs` references at ordinals104/105/107, donation shared112, distribution shared108, and dependency113 [141384,143608). Establish arithmetic, rounding, overflow and error precedence before assigning domain helper names.
3. Resolve all eleven validation families using the branch ledger. PDA/owner/signer/rent/remaining-account and lifecycle rules remain outside the codec findings.
4. Trace Token/System/Jupiter CPI data and events. Source-path landmarks and external symbol references locate boundaries but do not prove call effects or full event encoders.
5. Resolve indirect calls, generic/error/allocator helpers and original build provenance. Historical source, dependency lock/features, compiler/SDK phases and complete function/data/relocation identity remain missing. No new build or runtime probe is proposed by this handoff.

`dependencies.json` supplies the exact ordinal sets, prerequisites and missing evidence for each group. `reconstruction-queues.json` assigns every one of the 492 windows to exactly one priority queue; earlier explicit priorities win overlaps and all residual windows remain in priority5. These are review priorities, not a topological schedule or source identities. Higher-level reconstruction depends on these lower-level contracts; a process per inferred window would duplicate shared work.

## Verification and limits

Run `python3 verify.py` from any directory. The package needs only Python's standard library and its frozen inputs; it does not access the parent checkout. It checks all input/output hashes, IDL decompression, independently re-derived ELF windows and dispatch operands, complete group coverage, codec call targets and selected raw length/state/load witnesses. It regenerates the static graph/codec JSON in memory and compares it. It does not execute the Rust sketches or emulate the program, and the handwritten semantic interpretation remains reviewable rather than machine-proven.

`verification.json` contains the successful run. `artifact-sha256.json` seals the report, result, analytical scripts, Rust and derived ledgers (excluding itself and the later verification receipt). No new handler implementation, runtime comparison, original source commit or source-built candidate is claimed. Parent publication remains the parent's action.
