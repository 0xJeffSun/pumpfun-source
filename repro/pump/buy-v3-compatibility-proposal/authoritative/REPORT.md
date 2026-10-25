# Pump568546 residual inventory at immutable c1ffdd0

The accepted Pump binary is **not byte-identical** to the captured original. This package inventories the entire files, all inferred original windows, all candidate symbol windows, every statically visible call, branch and relocation, and unresolved data dependencies. It proposes no accepted source change, compiles nothing, executes no target and adds no regression receipt. Root owns source integration and builds.

The baseline is `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`, read with `git show`. Moving main, combined731003 and its scratch files were not read. Pending route and BuyV3 work is not treated as accepted source. No stopped handler is semantically reopened. Candidate stopped-window records are byte inventory only; original ownership that cannot be established remains unknown.

## Exact file result

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| Captured original | 10,485,715 | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` |
| Accepted nested candidate | 1,598,992 | `568546bcf038740d995325c1e742528f218f630840ac152f96dcf5c2147eabc2` |
| Candidate symbol ELF | 2,180,904 | `ca42ab7b4ba47c3ce16929abaf5a62e8a0740877906e9b653c517492c0150025` |

There are **9,779,698 positional mismatches including missing tail bytes**, of which **892,975** are within the common file extent. The original excess is `[1598992,10485715)`, 8,886,723 bytes. The original's last ELF-owned extent ends at 1,934,800; its remaining **8,550,915 bytes are verified zero**. These zeros remain part of the unequal original; they are not removed, supplied to a candidate, or dismissed from the equality gate. `details.json.byte_partitions` hashes every header/table/section/gap/tail interval and identifies overlaps. No conclusion about how to recreate this allocation is inferred from observing zero bytes.

The ELF header differs in entry address (original 1,404,464; candidate 1,198,368) and section-table offset (1,934,224 versus 1,598,416). Full ident/header fields, program headers, section fields and relocation records are retained, rather than just these selected differences. Candidate and symbol `.text` bytes and text relocation patterns agree exactly. The symbol ELF is evidence for candidate names/extents, not a second accepted deployment.

Section-relative raw comparisons follow. Missing bytes count as mismatches. Sections are aligned by name only; this does not assert semantic object alignment.

| Section | Original bytes | Candidate bytes | Mismatches |
|---|---:|---:|---:|
| `.text` | 1,792,208 | 1,477,296 | 1,134,231 |
| `.rodata` | 32,031 | 29,431 | 30,635 |
| `.data.rel.ro` | 10,352 | 9,544 | 4,610 |
| `.dynamic` | 176 | 176 | 13 |
| `.dynsym` | 456 | 456 | 6 |
| `.dynstr` | 288 | 288 | 0 |
| `.rel.dyn` | 98,352 | 80,864 | 30,864 |
| `.shstrtab` | 72 | 72 | 0 |

All exact half-open runs are in `residual-ledger.json.positional_differences` and `.sections`. Whole-file and section-relative mismatch counts are different measurements and must not be added.

## Complete static inventory and its limits

The accepted package's unchanged `elf_reader.py` is retained and used. Its signed relative calls govern target inference; assembly annotations are not used. Original boundaries come from entry, actual internal-call destinations and relocated function pointers, then extend to the next inferred entry or text end. They are **not verified historical function boundaries**. The candidate uses the symbol ELF's exact extents, retains every raw symbol row/alias, and also records a separate inferred-entry inventory.

* Original: **1,035** inferred windows; candidate: **777** symbol windows and **777** inferred windows. The coverage sweep finds no uncovered text interval or overlapping symbol extent for these inputs. This is byte coverage, not a proof that every true function was identified.
* **489** candidate windows have at least one equal normalized pattern with the same relocation pattern. There are **1,458 candidate/original pairs**, all retained, including multiple alternatives.
* Signed-call consistency pruning removes 383 pairs over rounds of 339, 25, 15, 3 and 1. The **1,075 remaining pairs** cover **422 candidate** and **449 original** windows. Thus **355 candidate** and **586 original** windows lack a surviving correspondence. **99 candidate rows remain ambiguous**. Eliminated pairs, targets and candidate alternatives are retained, not erased.
* There are **617 raw-equal pairs**, covering only **90 unique candidate** and **98 unique original** windows. These are body bytes at possibly different placements, not 617 uniquely recovered functions. They do not establish surrounding data or whole-file equality.
* A separate deterministic same-size scan retains **544 near-pattern hypotheses** with at most eight differing normalized instructions. It retains all alternatives, the complete raw mismatch runs, both sides of each call, and all relocation references. The threshold is a search aid, not a matching or confidence criterion; other windows remain in the main ledger.
* Original calls: **10,591 signed-relative**, **270 relocated external**, **144 unresolved indirect**. Candidate calls: **9,608 signed-relative**, **173 relocated external**, **131 unresolved indirect**. All 22,018 original and 18,208 candidate branch sites retain their raw instruction, computed target and unresolved predicate. Branch outcomes are not proved.
* All **6,147 original** and **5,054 candidate** relocation records retain file location, raw record, type, symbol, relocated site and, where supported, pointer/section information. Every lddw immediate is also recorded, including unrelocated values that might be scalars or pointers. A preview is never treated as a proved consumed extent.

Normalization zeroes only actual signed internal-call immediates and supported relocation immediates in memory. It does not normalize arbitrary constants, stack offsets, conditional branches, instruction order, source line numbers or literal lengths; it writes no normalized executable. A normalized pair separately records raw-body equality, actual numeric call destinations, target-pattern consistency, external-symbol correspondence and unresolved data. External-symbol equality does not prove a runtime implementation. A call-consistent fixed point does not imply a unique bijection, indirect-call closure, referenced-data equality, arithmetic correctness or semantic equivalence.

Every window has a residual category. Named framework/account operations route to source organization/ownership, named linked helpers to linked dependency/helper, stopped symbols to explicitly stopped, and uncertain bodies/original ownership to ambiguous/unattributed. These are work-routing categories, not invented diagnoses. The eight incomplete handlers separately carry the concrete application-source obligations. Nontext layouts are toolchain/build provenance; unresolved relocation data and the witnesses below are diagnostic/data metadata. Unknown original functions are not silently assigned the semantics of a similarly shaped candidate.

## Substantive operand and data findings

### 1. A concrete final-error-name divergence, outside the new BuyV3 implementation

Candidate `PumpError::Debug` is `[0x12ef70,0x130098)`, and its 4,392-byte near-pattern counterpart is original `[0x15eca8,0x15fdd0)`. Only one normalized instruction differs: body offset **2120**, the string length (31 versus 20). At offset **2104**, actual relocated lddw operands select exactly:

* Original: `QuoteMintNotWritable` (20 consumed bytes), pointer **1805262**.
* Candidate: `ReconstructionBranchUnsupported` (31 consumed bytes), pointer **1488047**.

The sole direct callee has a surviving call-consistent body correspondence. Complete window differences, raw pointer/length instructions, exact consumed bytes and hashes are in `details.json.data_witnesses`. Offset 2096 compares against 109 and branches away; it is **not** evidence that this string is enum ordinal 109. The candidate source places `QuoteChainAccountsRequired` at ordinal 109 and its surrogate at ordinal 110. The retained official IDL ends at code 6109/`QuoteChainAccountsRequired`, and does **not** list `QuoteMintNotWritable`. Preserve this IDL-versus-binary boundary; do not fabricate a published IDL entry or infer all original call-site checks from one string.

This supports recovering the original final error metadata and separately resolving the surrogate's uses. It does **not** support globally renaming the surrogate: current `create_v2.rs:39`, `trade.rs:296–298`, and many `multi_hop_curve.rs` gates intentionally return it for unsupported reconstruction domains. Relabeling those failures as “quote mint not writable” would conceal missing logic. Root should first attribute original error conversion/call sites, preserve existing accepted-domain behavior, and retire or separate the surrogate only as those actual branches are recovered. No missing writable check is invented here. No patch is supplied for this finding because a sound standalone replacement is not established.

### 2. QuoteControl has a concrete source-path/build-origin residual

`QuoteControl::space` is candidate `[0x9a4b0,0x9a770)`, original `[0x68918,0x68bd8)`: 704 bytes. Its sole normalized difference is offset **608**, storing path length **26 versus 40**. The pointer at offset **560** consumes:

* Original: `programs/pump/src/quote_control/state.rs`.
* Candidate: `src/quote_control/state.rs`.

`QuoteControl::set_mint_reserves` is candidate `[0x9bac0,0x9bd78)`, original `[0x69f28,0x6a1e0)`: 696 bytes. Its sole normalized difference is offset **552**, the same 26-versus-40 length; pointer offset **504** selects the same source paths. Both complete call sets have five calls, four direct target patterns and only three surviving transitive call-consistent target relations. Therefore the one-instruction local similarity does not close helper/data dependencies.

The actual `state.rs` file is present, and all 37 compiler-source bindings match the accepted package. This is evidence to inspect authentic workspace/module and compiler invocation origins, not permission to pad lines, manufacture an origin, add remapping flags, or try path/layout variants. Preserve arithmetic and ordering while recovering genuine provenance. The linked formatting path also exposes the retained `/home/runner/...` versus `/Users/runner/...` family; it remains a build/dependency attribution issue, not proof of a unique historical host.

### 3. Fresh route-parser evidence retains the pending label correction

The accepted parser is **0xa2b20**, not a stale focused-route offset. Original **0xdd700** and candidate have 3,512-byte windows and seven normalized instruction differences: **1360, 2544, 2552, 2560, 2992, 3264, 3408**. Pointer/length pairs at offsets **1344/1360, 2976/2992, 3248/3264, 3392/3408** consume original `associated_base_bonding_curve` / `associated_quote_bonding_curve` versus candidate `base_vault` / `quote_vault`.

All **33 immediate target bodies** have normalized patterns; only **28** survive the stricter transitive call relation. The other five are not discarded or declared equivalent. The remaining three local instruction differences are retained as raw operand differences, not “fixed” by register manipulation.

The baseline's public `general-route-label-proposal/README.md` already proposes the natural field-identifier correction on the isolated route source. This inventory independently rebinds the same literal issue to **accepted568546**, but neither imports that patch into accepted source nor duplicates root's pending route implementation. The focused5cc comparison and combined prebuild remain finite/pending evidence; combined731003 is outside this worker's input set.

### 4. Existing body closures are freshly re-established, with data boundaries intact

The accepted BondingCurve exit is reselected from the new full inventory by original start **0x5a28**, without reusing a prior candidate address. Its **1,840-byte** normalized body, all **25 immediate target patterns**, and exactly the consumed 8-byte discriminator `17b7f83760d8ac60` are recomputed. Deeper data equality is still unknown.

The five wide-runtime functions are likewise reselected by immutable original windows against current568546: unsigned divide wrapper at candidate **0x1680e8**, divide/remainder core **0x166a90**, logical right shift **0x167ed8**, low product **0x167f88**, left shift **0x168240**. The 5,960 bytes retain three raw-equal bodies; the wrapper/core differ at four/two raw bytes, respectively, with signed-call destinations preserved by the correspondence. Their old package was for another candidate and is used only for original window identity. Historical compiler-builtins linkage and surrounding route semantics remain unresolved; no allocator-failure or all-input arithmetic proof is claimed.

## Five partial and three unrecovered handler obligations

All 56 baseline Pump dispositions are retained verbatim in the main ledger; `details.json.handler_obligations` separately lists these eight with candidate-symbol hypotheses and unclaimed original correspondences. Baseline accounting stays **48 bounded, five partial, three unrecovered**.

| Handler | Accepted limitation and next boundary |
|---|---|
| `buy_v3` | SOL/USDC, Mayhem/holder fields and cashback rejection are bounded. Other quote routes, exhaustive extension/account validation and event suffix remain incomplete. The separate uncompiled composition is under preservation review; this worker does not duplicate it. |
| `sell_v3` | Same bounded quote/field domains; other routes, extensions, account validation and event suffix remain unresolved. Ordinary-route suffix interpretation does not establish this entire handler. |
| `buy_exact_quote_in_v3` | Bounded SOL/synthetic USDC Token/Token2022, configured fees/truncation, vault-balance completion, optional fills and Mayhem crossing. Nested routes, transfer-fee extensions and exhaustive admission remain open. Do not let a narrower BuyV3 replacement regress it. |
| `create_v2` | Accepted ordinary Curve/Pool ancestry depth one through five uses synthetic pre-existing canonical accounts. Mayhem, exhaustive ancestry/error cases, and new Token-2022 ancestry/extension modes remain unresolved. Accepted depth work does not make creation complete. |
| `multi_hop_curve_swap` | One native curve plus exactly SOL→A→B and B→A→SOL in the accepted ordinary Tokenkeg restrictions. Arbitrary hops/quotes, completion and other modes remain open. Public general-route proposals are pending relative to this baseline. |
| `admin_update_token_incentives` | Unrecovered; explicitly stopped. Inventory only; no implementation or semantic study. |
| `claim_token_incentives` | Unrecovered; explicitly stopped. Inventory only; no implementation or semantic study. |
| `set_mayhem_virtual_params` | Static dispatch/body/parser attribution exists; no valid genuine Mayhem PDA invocation acceptance. Remains unrecovered. No signer bypass, fixture or invocation is attempted. |

The known `sell_v2` transfer-fee minimum/event correction is still stopped despite its baseline bounded-handler accounting. Mayhem initializer, unintegrated v3 extension work and aborted Metaplex probe are also not resumed. No audit/security conclusion follows from these byte inventories or saved comparisons.

## Prioritized next pass and invalidation

1. Root should review the final-error metadata discrepancy and actual original conversion/call sites, distinguishing the unsupported-domain surrogate from an authentic original error. This is a precise non-BuyV3 source/data obligation, but a blanket rename is unsafe.
2. Recover authentic QuoteControl/compiler source-origin provenance before considering organization changes. Keep its identified length/literal residuals, helper conflicts and runtime error behavior separate. Do not change arithmetic to “repair” path metadata.
3. Let the existing route owner carry the natural field-label proposal and route source through its separate acceptance gates. Recheck the fresh parser operands and all 33 callees/transitive data against the resulting accepted snapshot. No result from combined731003 is imported here.
4. Finish independent preservation review of the existing BuyV3 proposal. In particular retain accepted shared SellV3 context, exact-quote, configured-fee, Mayhem/holder/cashback, completion and existing nested creation behavior as applicable. This inventory is not authorization to narrow them or to reopen excluded extension work.
5. Use the complete unmatched-window and helper tables to recover genuine source/dependency ownership. Keep ambiguous and unresolved indirect targets open; acquire provenance evidence instead of brute-forcing compilers, flags or layout. Repeat the **entire** byte/static analysis after every root-accepted build.

`details.json.next_pass_invalidation` supplies exact current candidate seed windows, all statically resolved transitive callees, all reverse-call ancestors, relevant relocation sites and unresolved calls for route, BuyV3/shared trade/event/volume, and error-metadata changes. This is a minimum semantic review graph, not an exemption for the rest of the ELF. Adding a source module can change inlining, monomorphization, string interning, drops, symbols, diagnostics and placement outside this graph.

For **either route or BuyV3 acceptance**, invalidate all cached candidate offsets, source hashes, symbols, pattern pairs, positional/section runs, relocation/data mappings, call relations, discriminator witnesses and build bindings. Rebuild this package from a new immutable accepted commit, retain this old manifest, and rerun every inventory plus all newly relevant root-owned acceptance evidence. Re-establish candidate/symbol text binding before using names. Re-find original windows from bytes/operands and preserve unresolved alternatives. Do not transfer the old 9,253/1,024 saved comparison applicability automatically to a changed binary. No target tests are executed by this worker.

## Reproduction and package contract

`python3 -B verify.py` works from a separate copy using Python's standard library only. It checks the SHA-256 seal, exact file set, every input hash, Git commit/tree/blob membership at c1ffdd0, all 37 accepted-source bindings, candidate/symbol text and relocations, and independently recomputes `analyze.py` and `details.py` results. `analyze.py --check` and `details.py --check` expose the deterministic static checks separately.

`provenance.json` records immutable repository path, Git blob, length and SHA-256 for every copied input. `git-proof.json` plus `git-objects/` preserve the commit/tree chain; this establishes Git content membership, not external publisher authentication. `manifest.json` seals scripts, inputs, source, report and outputs, with its external digest in `manifest.sha256`. The copied verifier result is retained outside the sealed package as `portable-verification.json` in the worker directory to avoid a self-referential manifest.

Machine-reading entry points: `result.json` (decision/status); `residual-ledger.json` (all windows, rows, alternatives, calls, branches, sections, exact runs and 56 dispositions); `details.json` (all lddw, near-hypothesis calls/data, exact consumed witnesses, byte partitions and reanalysis graphs). Unknown extents, predicates, original ownership, indirect calls and semantic equivalence remain explicitly unknown. There is no additional source patch: current evidence supports the bounded proposals and next actions above, not an independently safe new accepted implementation.
