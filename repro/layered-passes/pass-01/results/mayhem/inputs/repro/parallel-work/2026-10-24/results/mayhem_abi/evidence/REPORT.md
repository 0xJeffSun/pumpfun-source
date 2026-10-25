# Mayhem non-initializer residual disposition

The accepted `9e4e19…` candidate still has unresolved return-ABI provenance, unmatched bodies, transitive code/data, diagnostics and whole-ELF identity. No program-source correction, dependency change or compiler variant is justified here. This static review reconciles every retained inventory row and narrows two documentation gaps: the seven formatter predicates select the same bit, and two of the seven GlobalParams fields unresolved by the trade-only crosswalk have withdrawal roles in the accepted candidate source.

All writes are inside this assigned directory. No build, runtime probe, chain call, worker launch, commit or publication occurred. The stopped initializer was not followed. Unknown original windows receive metadata-only dispositions; they are not assumed unrelated to initialization. Full raw input files are preserved for hashes, but no initializer body or graph was analyzed. Nine initializer-named candidate ranges and both mixed entry ranges are excluded from body checking.

## Artifact binding and baseline

| Artifact | SHA-256 |
| --- | --- |
| Original, 777,408 bytes | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| Current candidate, 667,552 bytes | `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b` |
| Accepted source `programs/mayhem/src/lib.rs` | `def14c8135f370f8657b327c2bc2da3f8802ef3223778ad29b51958ba89c3649` |
| Retained official Anchor error.rs | `c3f5fa7c0b79429191f6c7942344f592c81344dbdf18d3d2bc4ff932f9b7fd78` |

The parent supplied published checkpoint `8099031`; this review binds conclusions to file hashes, not a new Git ancestry check. `work/fees-mayhem-function-inventory` predates the new Pump/Fees candidates. Its Fees `a9c4ea9e…` baseline is historical, but its Mayhem `9e4e19…` baseline equals the currently accepted executable. The much older burn catalog's `5e691d88…` candidate addresses/counts are not current coverage.

The verifier binds current lib.rs to both the accepted build source manifest and the retained source archive. `inputs.json` records origin, size and SHA-256 for all 28 frozen inputs. Raw source, original/candidate ELFs, the original inventory and prior ABI/codec reports remain unmodified under `inputs/`.

## Exhaustive disposition within the retained inventory

`result.json` retains one disposition for each of the **409 candidate rows and 441 original metadata rows**. This is exhaustive accounting of that inventory, not discovery of all historical functions or semantic completion. Original boundaries are inferred, and aliases/multiple pattern counterparts remain ambiguous. Normalization results below are inherited from the sealed inventory; this verifier independently checks permitted candidate raw-range hashes and newly reported call operands, not the entire original normalization algorithm.

| Candidate disposition | Rows |
| --- | ---: |
| Bounded pattern match; transitive code/data unresolved | 172 |
| Unmatched named candidate | 219 |
| Previously attributed handler counterpart, complete body differs | 7 |
| Initializer-named metadata only | 9 |
| Mixed entry metadata only | 2 |

Of the 398 candidate rows permitted for raw-range verification, 226 lack a bounded match. The baseline's 237 unmatched rows includes the 11 excluded rows. The 172 pattern matches span 64,800 candidate bytes; the baseline has 40 raw-identical ranges. Neither statistic proves equivalent calls, reachable data, behavior or source identity.

| Original metadata disposition | Rows |
| --- | ---: |
| Candidate pattern mapped; closure unresolved | 177 |
| Unattributed, identity unknown, no body review here | 263 |
| Previously excluded initializer metadata | 1 |

Symbol-based work grouping, with program types taking precedence over framework trait names: program 87 (2 pattern matches, 7 known differing bodies, 78 unmatched); Anchor 69 (11 matched, 58 unmatched); Solana/SPL 50 (32 matched, 18 unmatched); Rust/other 192 (127 matched, 65 unmatched). These are organizational groups, not library provenance proofs; they intentionally differ from a count of every symbol containing `anchor`.

Every candidate row carries its exact half-open byte range, raw SHA, names, inherited pattern/raw counterpart addresses, dependency counts and next disposition. All original rows remain represented even when unidentified. No unmatched row has been silently discarded or assigned a business identity from shape alone.

The seven previously attributed handler pairs remain body gaps:

| Handler | Candidate byte range | Original inferred byte range |
| --- | --- | --- |
| burn | [63776, 69792) | [55448, 61200) |
| legacy sell | [69792, 79296) | [127520, 140512) |
| legacy buy | [79296, 90088) | [113672, 127520) |
| Mayhem sell_v2 | [90088, 102152) | [159160, 177256) |
| Mayhem buy_v2 | [102152, 115288) | [140512, 159160) |
| PumpSwap buy | [121656, 138512) | [85600, 95336) |
| PumpSwap sell | [138512, 152160) | [95848, 113160) |

Identity attribution is inherited from the original inventory's retained dispatch evidence; it is not established by a near-match. No new behavioral mismatch is claimed.

## Error-return ABI and codec boundary

The prior codec follow-up remains supported: original state serializer [427504,428280) and candidate generic account exit [22056,23344) serialize the same ten ordered components over 106 bytes in that bounded analysis. Checked/unchecked wrapper CFG, error-path and diagnostic equality remain open. Width agreement does not establish historical names or signedness. No manual codec change follows.

The constructor pair is original **[632296,632880)** versus candidate **[530416,531008)**. Full raw bytes and range hashes are in `result.json.constructor_ranges`. The verifier independently rechecks all retained payload stores and return instructions:

- Both observed variants allocate a 160-byte boxed AnchorError and store corresponding payload fields at offsets 0, 32–72, 80 and 152.
- Original successful return sets zero in r0 and leaves the box pointer in r1; candidate preserves the output pointer in r6 and writes the discriminant/pointer at output offsets 0/8.
- The current selected error.rs is byte-identical to retained official Anchor commit `25be6d502ec6957d34d436bc2a6170040fc64153`. Its Error declaration, lines 283–287, has two boxed variants. The selected error-code generator, lines 77–89, constructs AnchorError through ordinary `From`; its `repr(u32)` at line 59 applies to the generated error-code enum, not a prescribed returned Error ABI.

The new call-edge inventory verifies **494 direct call instructions across 78 permitted candidate ranges** targeting byte 530416. Each has a containing range, exact PC, eight raw instruction bytes, signed operand and recomputed target in `constructor_call_edges`. This is an exhaustive enumeration of those edges within the permitted retained candidate rows. It is not an argument-flow proof for 494 paths or an original-to-candidate callsite correspondence. No initializer or mixed entry calls were counted, and no unknown original caller was inspected.

The retained ABI report also records complete normalized ErrorCode name/Display bodies and compatible compiler-source clues. Those remain bounded evidence, not proof of recursive strings/vtables or the original compiler. Same boxed payload stores do not prove every error variant or explain why one executable returns a register pair. Historical Rust/LLVM lowering, target/build-profile and unobserved dependency details remain unresolved. Preserve the fixed source and selected baseline.

## Formatter equivalent bits

Seven retained load/mask pairs in six formatting helper windows were independently rechecked against raw bytes. Original code loads byte +18 and masks 0x80; candidate loads the word at +16 and masks 0x800000. Both select absolute bit **151** of the same little-endian memory. The retained v1.52 `core::fmt` source defines `ALTERNATE_FLAG = 1 << 23` at line 315.

| Original load+mask range | Candidate load+mask range |
| --- | --- |
| [676064,676080) | [574960,574976) |
| [676912,676928) | [575808,575824) |
| [677128,677144) | [576024,576040) |
| [677800,677816) | [576696,576712) |
| [682544,682560) | [581376,581392) |
| [682920,682936) | [581752,581768) |
| [683376,683392) | [582208,582224) |

The masked numeric results are different when set (128 versus 8,388,608); their **zero/nonzero predicates** agree. The verifier checks all 256 values of the selected byte and the exact register/load/mask fields. This does not prove full helper equivalence, accessibility of the wider read in all contexts, or unique compiler provenance. “Formatter layout changed” is not supported by these particular differences.

## Seven GlobalParams field roles

The earlier crosswalk is explicitly limited to six trade bodies. Looking at permitted withdrawal/update/reset source explains two additional candidate roles. Account offsets include the eight-byte discriminator; they are not Rust memory offsets or variable-length instruction offsets.

| Argument | Serialized bytes | Current-source disposition |
| --- | --- | --- |
| field_0 | [8,12) | Update/event storage and reset; business role unresolved |
| field_1 | [12,16) | Update/event storage and reset; business role unresolved |
| field_3 | [24,32) | Update/event storage and reset; business role unresolved |
| field_6 | [137,138) | Update/event storage and reset; business role unresolved |
| field_8 | [154,162) | Native withdrawal spacing interval |
| field_10 | [166,174) | Update/event storage; preserved by reset_state; business role unresolved |
| field_15 | [230,238) | Quote-token withdrawal spacing interval |

Exact accepted lib.rs evidence: withdrawal source lines **45–77**, update/event lines **127–167**, reset lines **193–202**, and account declaration **234–249**, each retained with excerpt hash in `source_ranges`.

`withdraw_admin` reads field_8 through `reset_middle[17..25]` as i64 and compares Clock time against last timestamp plus interval when both are nonzero. Its last timestamp is `reset_middle[1..9]`, account bytes [138,146). `withdraw_quote_admin` does the analogous operation with field_15 through `reset_stable_suffix[8..16]` and last timestamp at [16..24], account bytes [238,246). Both write the current timestamp and perform their transfer. The current named withdrawal bodies are [389360,391000) and [387344,389360), respectively; no original body equivalence is claimed.

Thus five of these seven fields still lack a behavioral role in the reviewed non-initializer candidate source. **All seven still lack newly proved original-binary semantics and historical names/types.** This review does not promote the two candidate roles into original recovery or change handler coverage.

A separate exact-token issue exists in the retained MayhemState crosswalk: all 12 references listed under `field_8` actually mention `field_89`. The verifier checks that fact. Those references cannot support a field_8 use; its role remains unresolved. Parent should fix the crosswalk generator's matching rather than change program source.

## Remaining gaps and supported next steps

1. Parent can correct the field-role documentation: distinguish the six-trade-body scope from withdrawal uses, retain original-semantic uncertainty, and repair the `field_8`/`field_89` reference mix-up. No program edit is indicated.
2. Use the 78 known candidate caller ranges as a finite index for future static error-path work. Match individual original callers only through retained non-initializer dispatch/call evidence; then trace inputs and returned values. The ABI cause still requires retained authoritative compiler/target evidence that distinguishes lowering from representation. No compiler/profile/source variant search is proposed.
3. For the 226 permitted unmatched candidate ranges, resolve caller identity and complete callee/data requirements by dependency group. For the 263 unattributed original rows, first establish a permitted non-initializer caller. Unknown identity is missing evidence, not proven missing source. Preserve the known handler size gaps until complete-body evidence supports a source correction.
4. For the 172 pattern matches, separately close direct/indirect/external targets and actual data extents. Address normalization and inferred windows alone cannot establish historical function identity or whole-program behavior.
5. Retain the diagnostic gap: completion.md reports 26 panic diagnostic differences including eight unwrap-detail differences. This run does not independently re-count those receipts. Source coordinates, recursive diagnostic values and compiler/stdlib provenance remain unresolved; no padding or path remapping is justified.
6. Leave all initializers and the other stopped lanes untouched. No permitted evidence here closes whole-byte recovery, all-input behavior or the security audit. Counts of saved cases remain bounded evidence only.

## Portable verification

Run `python3 -B verify.py` from any directory; it uses the bundled files and Python standard library only. It recomputes result.json, input seals, every disposition, permitted candidate range hashes, constructor call targets/stores, seven bit predicates, accepted source bindings and exact source excerpts. It hashes the full ELF inputs for identity but decodes no initializer body. No original unknown body is decoded. Baseline normalized matches and previous behavioral receipts remain explicitly inherited, not newly executed or independently re-proved.

`manifest.json` seals this report, verifier, collector, inputs and result. The collector is provenance tooling for this workspace; only `verify.py` is the portable offline entry point. Publication and any root documentation edits belong to the parent.
