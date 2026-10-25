# Layered reconstruction pass 02

The exact acceptance gate remains **0/4 core programs** and **2/5 dependency captured payloads**. The separate instruction measure remains **140/150 bounded implementations**, five partial and five unrecovered. Every core executable still has unresolved original bytes, calls, data and build provenance; bounded handlers are not completed byte-identical functions. The security audit remains incomplete.

This pass starts from published `dff3b7ddc64dc2ae1f3253252e096723998ce861`. It reviews the prior full inventories, builds only byte-backed source corrections, repeats existing regression corpora, and independently compares every captured byte again. Historical manifests, failed builds, uncertain attribution and unmatched alternatives remain available.

## Complete-file baseline

The [machine-readable comparison](before-promotions/summary.json) binds every original and candidate hash. The compressed range ledger retains every differing run and complete excess extent. Allocation images are distinguished from raw compiler outputs; no binary was edited or padded in this pass. Relay is the newly compiled review candidate, not a runtime-accepted dependency.

| Program or dependency | Different common-position bytes | Excess/missing bytes | Entire captured payload equal |
| --- | ---: | ---: | --- |
| pump | 880,923 | 8,906,291 | No |
| pump_amm | 670,956 | 9,286,667 | No |
| pump_fees | 421,191 | 178,928 | No |
| mayhem | 361,719 | 109,856 | No |
| spl_token | 0 | 0 | Yes |
| spl_token_2022 | 0 | 0 | Yes |
| associated_token | 307 | 0 | No |
| token_metadata | 1,509 | 0 | No |
| donation_relay | 247,326 | 380,432 | No |

Token-2022's raw compiler output matches the611,056-byte captured prefix; its previously retained allocation image also matches the770,960-byte zero tail. Metaplex's previously retained allocation image differs by1,509 bytes; its raw compiler output additionally lacks86,543 captured zero bytes. These separate cases are preserved in the report. Positional differences are layout-sensitive and are not a percentage of recovered behavior.

## Reviewed changes and current build gates

| Work | Evidence-supported change | Result at this report snapshot |
| --- | --- | --- |
| AMM destination rent | Use the destination's actual data length in rent minimum, preserving guard, ATA selector0 and transfer order. | Clean scratch build;17,462 comparisons and35,418 signatures pass. Independent clean main build equals scratch executable and entire symbol ELF. [Main publication](../../pump_amm/destination-rent-v144/REPORT.md), current-source bindings and generic receipt verification pass; correction integrated. |
| Fees sharing predicate and donation ownership | Check all four reserves and System owner at both AMM gates; release cloned quote AccountInfo before comparison. | Clean review candidate `a769ab3c…`;17,441 baseline+20 focused comparisons and separate10-step sequence pass. Independent saved verification passed. |
| Fees legacy quote admission and social ATA helper | Restore quote-zero admission before version check; restore shared address/create/owner/mint admission in its original order. | Second clean review candidate `8ff12f9c…`;all17,461 comparisons and separate10 steps pass. Portable finalization/main promotion pending. |
| Pump error metadata | Recover real ordinal110/error6110 name/message while keeping11 reconstruction-only fences in a separate local enum. | Clean review build `2aa18c73…`;all four complete metadata bodies and their immediate targets match under documented normalization. Full unchanged9,269+1,024 corpus pending finalization. |
| Donation relay | Box admitted values, use separate natural wrappers, then borrow cached settlement fields. | Build02 had301 backend errors in6 functions;build03 had166 in2;build04 has0. Build04 still has380 unmatched original windows and no transaction acceptance. |

The [AMM review package](review-candidates/amm-destination-rent/REPORT.md) and [Fees review package](review-candidates/fees-predicate-quote/REPORT.md) retain whole-file inequality and their coverage limits. In particular, zero-lamport fixtures do not establish behavior for live nonempty destination accounts. Existing417 sharing cases do not distinguish every reserve combination. Passing saved cases do not close those gaps.

The [Pump metadata source proposal](../../pump/final-error-metadata-source-proposal/REPORT.md), [Fees legacy quote proposal](../../pump_fees/legacy-quote-admission-source-proposal/REPORT.md), and previously published [social helper proposal](../../pump_fees/social-ata-helper-source-proposal/REPORT.md) preserve exact patches and original byte/call evidence. They are not represented as accepted merely because they compile.

## Remaining function and source obligations

| Program | Full inventory and unresolved obligations |
| --- | --- |
| Pump |1,035 original inferred windows. Five partial trading/creation/routing instructions; missing genuine invocation for set_mayhem_virtual_params; unsupported fences, error/data provenance, unmatched helpers and transitive calls remain. Metadata build's same-method candidate pattern matches rise492→494 and call-consistent matches423→428; original call-consistent matches450→455. These are not raw whole-file equality. |
| AMM |785 original and653 candidate windows.197 candidate windows lack normalized counterparts. Scalar error-helper specialization, recipient/initializer source origins, transitive calls/data, and authentic successful create_config replay remain open. Rent correction does not close all transfer-creator behavior. |
| Fees |585 original windows. New helper build has547 candidate windows; mapped original windows437→439 and unattributed145→143 under that analyzer. Legacy remaining-account preprocessing, V2 payout, shared helper details, error/data origins and full ELF identity remain unresolved. |
| Mayhem |441 original and409 candidate windows. Five GlobalParams business roles remain unknown. Non-initializer ABI/helper/panic/data provenance and opaque excluded code remain.40 candidate raw-body matches and172 normalized-body matches do not prove whole-program equality. |
| ATA |159 windows;153 mapped raw-equal and all159 mapped/normalized. Two reserve helper bodies are in a different order, with four affected caller windows and three relocation bytes. Original Cargo unit metadata, intermediate objects and upload-linked build recipe remain missing. |
| Metaplex |1,251 windows;1,250 raw-equal. Utilize's5,104-byte body,29 diagnostic tuples across9 source files, and two relocation records remain different. Actual called bodies match, but path/order/data and original source spelling are not recovered. |
| Relay |492 original inferred windows and282 compiled candidate windows.29 raw complete-body matches,112 shape matches,380 unmatched originals. Eleven business handlers and seven IDL operations have source hypotheses; loader/transaction acceptance, fixed-relayer authorization, original call/data ABI and build provenance remain open. |

The [BuyV3 authentic-parser review](../../pump/buy-v3-authentic-parser-review/REPORT.md) finds an additional concrete gap: the original passes and uses the optional-fill flag, while both current source and the proposed ordinary replacement discard it. Original evidence supports one typed parser and one success-only exit. The [compatibility dispatcher proposal](../../pump/buy-v3-compatibility-proposal/REPORT.md) is preserved but **not approved as recovered original source**. Its finite routing argument cannot substitute for original parser/body recovery. Separate workers now own the exact flag/amount merge and typed parser/initialization/exit contracts, retaining all117 saved BuyV3 rows and105 successes.

The [Mayhem field review](../../mayhem/global-params-remaining-field-review/REPORT.md) corroborates14 source accesses and33 byte witnesses for storage, event and reset behavior, but cannot recover five business meanings. Neutral names remain. A failed assumption that a serializer address adjustment was a scalar load is preserved and corrected; no fabricated semantics or cosmetic rename was applied.

The [ATA/Metaplex provenance review](dependency-provenance-review/README.md) selects no new build recipe. ATA's wrong helper order already exists in retained pre-strip bytes. Metaplex line deltas alone do not explain its changed column and control flow. Existing source/build evidence is insufficient to justify another recipe. No flag/version/layout search or binary patch is substituted for missing provenance.

## Relay failures, correction and next acceptance gate

[Build03](../../donation-relay/source-build-03-diagnostics/README.md) remains unsuitable because of its backend errors. Its report's original wrapper labels186/187 were wrong; the [additive correction](../../donation-relay/settlement-borrow-source-proposal/README.md) proves185 for just_swap_v1 and184 for swap_then_distribute_v1. The old seal is unchanged.

[Build04](../../donation-relay/source-build-04-stack-clean/README.md) removes the reported stack errors with the exact reviewed two-file borrowed-settlement change. All282 candidate windows have observed direct r10 accesses within4,096 bytes; that is not a full dynamic stack proof. The candidate and original load in separate local VMs with normal verification controls, but no transactions have yet been accepted. Five ordinary donation handlers and seven IDL operations are being prepared for local comparison. Six business handlers require the fixed relayer identity; synthetic signatures cannot replace that authorization.

## Incomplete instruction dispositions

| Instruction | Current disposition |
| --- | --- |
| pump.admin_update_token_incentives | unrecovered |
| pump.buy_exact_quote_in_v3 | partial |
| pump.buy_v3 | partial |
| pump.claim_token_incentives | unrecovered |
| pump.create_v2 | partial |
| pump.multi_hop_curve_swap | partial |
| pump.sell_v3 | partial |
| pump.set_mayhem_virtual_params | unrecovered |
| pump_amm.create_config | unrecovered |
| mayhem.initialize_mayhem_state | unrecovered |

The stopped Pump incentives, sell_v2 corrective/probe lane, old unintegrated v3 token-extension work, Mayhem initializer and extra Metaplex runtime probe remain excluded from reassignment. These unresolved scopes prevent claiming full completion. Every otherwise bounded instruction remains subject to the complete-file obligations above.

## Verification and parallel work

Root independently verified the copied source/build packages, saved signatures, metadata/predicate evidence and full residual ledgers. [Verification records](verification/copied-verification.json) retain numeric exits and complete outputs. The provenance-review envelope archives an accidental sealed bytecode cache without publishing it as a loose importable file; its original seal and readable source evidence are preserved.

Native agents own Pump, Fees and Relay fixes. Separate CLI workers handle AMM publication, BuyV3 contracts, Mayhem fields and dependency provenance. The CLI main-promotion worker correctly stopped at its assigned-directory boundary without attempting a write; root performed the authorized main build using its existing workspace access. No global agent count or sandbox setting was changed.

The next report must bind final main artifacts, rerun affected full byte/call/data analyses, and retain every unresolved row. Repeated regressions add no unique cases. Exact whole-original equality and the unfinished security audit remain separate gates.
