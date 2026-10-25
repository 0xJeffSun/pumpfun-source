# Mayhem non-initializer residual analysis

The original and accepted candidate remain **unequal**. This pass finds no evidence-backed application-source patch that would improve byte identity without guessing at historical source or compiler behavior. The actionable correction is a documentation derivation defect: twelve references attributed to `MayhemState.field_8` actually use `field_89`. Keep historical artifacts immutable and regenerate a corrected crosswalk as a separate, pending result.

All repository inputs were obtained with `git show` at **c1ffdd0667608d4755227e68aab9f27a7e9a0d37**. No moving branch, private audit output, stopped lane, network, compiler, target execution, or new fixture was used. The script performs static instruction decoding, not SBF execution. No accepted count or program source changes occur.

## Exact file result

| Input | Bytes | SHA-256 |
|---|---:|---|
| Original `evidence/original/mayhem/deployed.so` | 777,408 | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| Accepted `repro/mayhem/twentyfour/mayhem_recovered.so` | 667,552 | `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b` |

There are **361,719 differing positions in the common prefix**, in 98,294 maximal half-open ranges. The original has an additional **109,856-byte tail [667552,777408)**. Counting each excess byte gives **471,575 positional differences**. This measures physical file positions, not instruction correspondence. The complete ranges are in `residual-ledger.json/whole_file_comparison`; the tail is separately recorded so it cannot disappear in a zip-based comparison.

The candidate `.text` exactly equals the retained symbol ELF's `.text`; all 409 grouped symbol ranges and every alias are rebound. All fourteen accepted build source hashes match the frozen `programs/mayhem` files, including the lockfile and manifests. `inputs.json` records repository path, immutable commit, Git blob OID, SHA-256 and byte count for every input. The symbol ELF's whole hash, all symbol records and record offsets are in `elf.symbols_binding`. Its larger unstripped file is attribution evidence, not an alternate accepted executable.

| Section, compared at its own start | Original bytes | Candidate bytes | Differing bytes including excess |
|---|---:|---:|---:|
| `.text` | 706,744 | 605,928 | 425,929 |
| `.rodata` | 18,396 | 16,540 | 17,488 |
| `.data.rel.ro` | 7,784 | 7,744 | 3,259 |
| `.dynamic` | 176 | 176 | 13 |
| `.dynsym` | 384 | 384 | 9 |
| `.dynstr` | 221 | 221 | 50 |
| `.rel.dyn` | 40,768 | 35,616 | 10,710 |
| `.shstrtab` | 72 | 72 | 0 |

Section-relative counts are not additive to whole-file positional counts because sections move. The ELF header differs in six bytes, program-header table in 41 and section-header table in 47. Entry addresses are 535800 versus 399000; section-header offsets are 774840 versus 666976. All decoded header fields, section hashes/ranges, all 2,548 original and 2,226 candidate relocation records, symbol names and raw relocation encodings are preserved. We do not edit headers or relocations. Neither these differences nor the shared ELF machine value identify a historical compiler.

The physical file intervals outside headers and sections are also retained: original `[725428,725432)`, `[733997,734000)`, `[775416,777408)`; candidate `[622756,622760)`, `[631285,631288)`. They are unassigned file regions, not a license to fabricate padding.

## Complete inventory and safety boundary

The ledger retains all **409 candidate rows and 441 original inferred rows**. The original inventory is copied verbatim as a frozen input, preserving earlier matches, ambiguities, unresolved targets and annotations. Fresh analysis is separate. No original historical symbol names are invented.

* 398 candidate windows are decoded; nine initializer-named windows and two mixed-entry windows remain opaque. Candidate symbol ranges cover the complete text section without gaps.
* 184 original full windows are admitted through prior non-initializer handler attribution or a permitted candidate's recorded pattern correspondence. Another 16 selected-window records from the withdrawal/error/field studies are independently rebound, including overlapping repeated witnesses. These are not sixteen newly recovered functions.
* 257 original full rows remain opaque in this pass. Some contain a separately justified selected slice, which does not authorize the rest of that row. Every uncovered interval is listed under `coverage.original.body_analysis_uncovered_intervals`.
* The stopped original initializer wrapper is only the metadata interval **[528112,528568)**. Unknown windows may contain additional initializer-related code; their identity is not inferred. The original entry region remains opaque. No initializer call graph is traversed.

The candidate opaque intervals, before merging neighboring rows, are `[352816,356224)`, `[365656,366776)`, `[366776,367224)`, `[399000,400192)`, `[412384,415704)`, `[415704,420720)`, `[420720,421224)`, `[422784,432128)`, `[432128,437312)`, `[437312,440360)`, `[440360,441960)`. They receive the **explicitly stopped** disposition; hashing and positional inventory do not constitute body inspection.

The 441 inferred original intervals happen to cover `.text`, but next-known-entry boundaries can merge functions, split functions at internal targets, or include unreachable material. Complete interval coverage is not complete historical function discovery or a semantic audit. All branch records retain `feasibility=unresolved`, including branches leaving their inferred window.

## Body, call and data layers

Fresh bounded comparisons reproduce **172 candidate windows with a normalized counterpart**, including **40 with a raw-equal counterpart at a different placement**. The 172 windows have 399 possible counterpart pairs; 72 candidate rows have multiple possible originals. Do not collapse these alternatives into a one-to-one match. The old inventory's 177 original pattern rows are retained separately from candidate counts.

Normalization follows the frozen `elf_reader.py` convention: zero internal relative-call immediates, type-10 external-call immediates and type-8 relocated `lddw` address words, and require the same relative relocation pattern. No executable is normalized on disk. Only the window-local comparison buffer changes. Other instruction bytes remain significant.

All permitted candidate windows together contain **3,947 direct calls, 89 indirect calls, 111 external calls, 1,629 relocated code/data loads and 8,717 branch records**. The 184 admitted original full windows contain **756 direct calls, 21 indirect calls, 34 external calls, 580 relocated loads and 2,547 branches**. Separately admitted original slices retain their own complete instruction inventories. Counts overlap across selected slices and full rows; they must not be summed into unique coverage.

Direct calls are recomputed from their signed immediate as `PC + 8 + 8 * immediate`. Relocated type-10 calls are not mistaken for relative self-calls. Assembly label comments are never a target authority. Each edge identifies a catalogued target, opaque target or missing boundary. Every indirect edge remains unresolved. All relocation records are preserved even for opaque windows; they are not followed there.

Of the 399 normalized pairs, 268 have every direct call landing in a recorded target-pattern correspondence. This includes vacuous call-free pairs and ambiguous target choices; it is not 268 closed functions. Numeric target addresses, pattern-supported counterpart targets, raw target bodies, indirect/external implementations and recursive behavior remain different facts. `actual_call_targets_equal`, `referenced_data_equal` and semantic equality remain null when unproved. All pairs preserve raw-body equality, normalized equality, relocation-pattern equality and full body-relative raw mismatch ranges independently.

| Previously attributed application body | Candidate half-open range | Original inferred range |
|---|---|---|
| Burn | [63776,69792) | [55448,61200) |
| Legacy sell | [69792,79296) | [127520,140512) |
| Legacy buy | [79296,90088) | [113672,127520) |
| Mayhem sell_v2 | [90088,102152) | [159160,177256) |
| Mayhem buy_v2 | [102152,115288) | [140512,159160) |
| PumpSwap buy | [121656,138512) | [85600,95336) |
| PumpSwap sell | [138512,152160) | [95848,113160) |

All seven full bodies differ; fresh raw mismatch ranges, sizes and tails are attached to each `known_counterparts` entry. Their identity is inherited dispatch evidence, not inferred from similar byte counts. No newly demonstrated business-logic defect follows from their size differences.

Six data pairs from the identified error path are rebound to the whole binaries. The SOL/quote instruction labels, 28-byte `InstructionDidNotDeserialize` name and 55-byte message agree exactly. The 16-byte relocated message descriptor and 48-byte formatter table differ raw. The prior verified descriptor decoding connects the message pointers and lengths; it does not close the formatter's indirect targets. For every other relocated pointer the target extent remains null. No arbitrary prefix or adjacent string is substituted for a proven object extent.

## Reassessment of error return and diagnostics

All **494 permitted candidate direct edges to constructor 530416**, across 78 rows, are enumerated again. Every other error-related helper, parser, serializer and caller remains in the general symbol/call ledger rather than disappearing from scope. Only the two previously identified withdrawal callers have the deeper constructor-argument/return-consumer witness; the remaining 492 edges explicitly lack that argument-flow proof. Other constructor families are not covered by that 494-edge count.

Original constructor `[632296,632880)` returns discriminant/box in r0/r1. Candidate `[530416,531008)` receives an output pointer and stores the two words at output+0/+8. Original calls `0x7ed48` and `0x7efd8` pass code 102 in r1 and forward the pair. Candidate `0x59078` and `0x58d48` pass output in r1/code in r2, then load/store the returned words. The four callsites, constructor stores, error-name/Display selection and bounded data witnesses pass the retained static verifier and whole-binary slice rebinding.

Both observed constructors allocate 160 bytes with alignment eight and have corresponding boxed payload stores. The selected official Anchor source declares two boxed `Error` variants. `repr(u32)` belongs to `ErrorCode`, not the returned `Error`. Thus an ABI or interprocedural lowering difference is established locally; a new Error representation, manual serializer, missing application check, or particular compiler version is not established. Formatting allocation, string allocation, pre-constructor drop, OOM and panic behavior remain open. No statement here proves every allocator failure path.

Seven formatter predicates select absolute bit 151: original byte at +18 masked by `0x80`, candidate word at +16 masked by `0x800000`. Their zero/nonzero predicate agrees; their nonzero numeric values and memory access widths differ. The retained `core::fmt` flag declaration supports this interpretation under the bounded normal framework layout premise. It does not prove arbitrary invalid-pointer access safety or whole helper equality.

The six saved PumpSwap receipt files contain 2,496 finite comparisons. This pass reads them as records and executes none. It independently enumerates **26 diagnostic-difference rows: buy/native 11, buy/token 5, sell/native 5, sell/token 5; both Token2022 suites zero**. Each row retains its case, exact JSON pointer, error, panic lines and complete-log digest.

Eighteen rows have matching overflow-message detail with different source coordinates. Eight zero-effective-reserve rows have an extra candidate `Option::unwrap()` message while the original reports a panic location without that message. They are two cases in each of buy/sell × native/token. Candidate source is `checked_div(...).unwrap()` at buy line 101 or sell line 97. Original locations are state.rs 463:14 and 490:14; subtraction and time-addition locations also differ. The evidence does not establish whether original panic detail is due to source spelling or historical std/panic lowering. Adding a zero check returning an application error, suppressing logging, guessing a different unwrap expression, or inventing old file coordinates would be unjustified. Existing receipts establish finite regression observations only, not exhaustive state, compute, security or byte equivalence.

## Fields and framework premises

All retained GlobalParams and MayhemState rows are included in `all_field_inventory`, with seven focused GlobalParams dispositions in `field_dispositions`. Source spans, symbol aliases and complete macro binding contracts are preserved. The two interval roles are supported by prior original wrapper/handler/rate-helper edges, now freshly rebound: account `[154,162)` is the SOL withdrawal interval; `[230,238)` is the quote interval. Both are read as signed i64 with a last-timestamp/nonzero gate, while public option/event fields remain u64. Preserve those wire widths, signed interpretation and reset behavior; a descriptive name is not a type-change authorization.

Five GlobalParams roles remain unknown: field_0 `[8,12)`, field_1 `[12,16)`, field_3 `[24,32)`, field_6 `[137,138)`, field_10 `[166,174)`. Setter/event/serializer/reset evidence does not establish trading meaning, boolean meaning, deadness or initializer use. Field_10 is preserved by reset; it is distinct from max_sol_per_sweep. The original serializer's successful writer lengths total 254 bytes including discriminator. The burn codec's ten-component/106-byte bounded evidence remains retained; wrapper, diagnostics and error ABI are still open.

The current crosswalk's twelve supposed MayhemState.field_8 uses all match **field_89** as an exact token in the frozen source. The script proves every cited source hash, line and token distinction. The corrected view must keep field_8 unresolved; field_89's timestamp uses cannot be transferred to it.

The retained official-crate binding package passes its static verifier for eleven archives, 24 handlers, 15 contexts, 231 fields and 454 source spans. Its source contracts narrow interpretation without proving deployed equivalence: legacy transfer construction remains fixed despite an Interface input; existing-ATA and init-if-needed checks differ; uniqueness scanning is declared-field scoped; event target construction differs from earlier documentation; manual extension does not inherit generic realloc guards. These findings do not justify inventing missing original checks or claiming an exploit. No macro expansion or target execution occurs.

## Residual classes and prioritized actions

Every fresh row has a residual class; candidate application symbols have an additional organizational group. These are work dispositions, not speculative causal attribution. Unexplained application bodies remain **ambiguous/unattributed**. Named library bodies are **linked dependency/helper**; diagnostic records are **diagnostic/data metadata**; file structures are **toolchain/build provenance**; opaque stopped windows are **explicitly stopped**. The documentation correction is **source organization/ownership**. No new **concrete application-source gap** is established in this pass.

1. **Root documentation action:** generate a new exact-token crosswalk removing the twelve false field_8 uses, preserve the old evidence and explicitly retain five unknown GlobalParams roles. No program patch is supplied or needed for this correction. The proposal is pending, not accepted.
2. **Error ABI evidence:** obtain already-existing authenticated original lowering/IR or compiler-source evidence tied to the constructor and identified callers. Use the 78-row/494-edge inventory to extend bounded argument and return-consumer analysis only where non-initializer identity is established. A compiler-version search is not the next authorized step.
3. **Application/helper boundaries:** use the seven attributed bodies and existing non-initializer dispatch evidence to establish the identities of missing helpers before decoding any opaque original interval. Preserve all ambiguous pairs. Close signed call targets and actual data extents before accepting a body as more than a normalized pattern.
4. **Panic organization:** retain the 26-row ledger as a finite diagnostic regression boundary. Authentic source/module ownership or retained std provenance must precede changing panic source spelling, paths or lines. Do not add business checks solely to make diagnostic text look closer.
5. **Next accepted snapshot:** root supplies its accepted candidate, associated symbol ELF, source/build manifest and appropriately refreshed non-initializer attribution. Rerun this deterministic analysis and compare the full ledgers. Hash assertions intentionally reject silently reusing old addresses against a new candidate. Any new code/build remains root-owned. Continue preserving all stopped windows.

## Reproduction and seal

Run `python3 -B publication/verify.py` (or `python3 -B verify.py` from a copied publication). It verifies the exact sealed file set, all hashes/Git blob IDs, recomputes the complete residual ledger, and runs four bundled static verifiers. It requires Python 3.11+ and no third-party modules, network, Git repository, compiler or target runtime. `analyze.py` regenerates only the local ledger when explicitly invoked; `verify.py` does not rewrite sealed outputs.

Optional `python3 -B publication/rebind_inputs.py --repo /path/to/pumpfun-source` additionally compares every copied input with its immutable Git blob. This never reads moving main. `manifest.json` seals all publication files except itself; its digest and separate-copy verification receipt live outside the publication. The seal detects change, not independent authenticity of the originally captured deployment. The retained capture and accepted build remain the evidence basis.

The worker handoff includes a successful verifier run from a separate directory copy, original-input rebinding, and a second deterministic analysis comparison. Full-file equality remains false; no completion, semantic audit or security sign-off is claimed.
