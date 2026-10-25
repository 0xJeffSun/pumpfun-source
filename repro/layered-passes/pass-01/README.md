# Layered reconstruction pass 01

The complete original-file equality gate remains **0/4 core programs**. Bounded instruction implementation remains **140/150 (93.3%)**, with five partial and five unrecovered dispositions. These are different measures: finite behavioral coverage is not binary completion. The security audit remains incomplete.

This pass freezes the published `c1ffdd0667608d4755227e68aab9f27a7e9a0d37` baseline, inventories all remaining byte/window obligations, integrates two reviewed source improvements, then repeats the byte analysis on the resulting artifacts. All twelve CI jobs passed on that baseline in [run 40174516835](https://github.com/lalalune/pumpfun-source/actions/runs/40174516835). That run does not certify the subsequent changes.

## Changes integrated and verified

| Program | Change | Current executable SHA-256 | Saved comparisons |
| --- | --- | --- | ---: |
| Pump | Ordinary general Tokenkeg routes composed with accepted nested ancestry; four actual account-field labels recovered | `731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93` | 9,269 |
| Fees | Two AccountInfo clones replaced by the original evidenced borrows | `5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49` | 17,461 |
| AMM | Existing event-borrow checkpoint retained | `d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1` | 17,462 |
| Mayhem | Existing bounded non-initializer reconstruction retained | `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b` | 9,595 |

The total is **53,787 differential comparisons**, plus **1,024 separate Pump Surfpool comparisons**. Each changed main executable and its entire symbol ELF match its separately tested scratch build. Actual source, helper, harness and fixture bindings pass. No receipt from a different executable is transferred by similarity. Pump adds sixteen successful three-hop cases; Fees adds no unique cases. Existing sequence steps and repeated inputs remain separately identified.

The [Pump package](../../pump/nested-general-route-fortyeight/README.md) retains its compiler-success/outer-launcher-bookkeeping-failure history and additive completion without rebuilding. The [Fees package](../../pump_fees/donation-borrow-v144/README.md) explicitly retains the focused run's missing separately saved numeric exit code; its full success report, logs, outcomes and signatures were reverified. Neither limitation is silently rewritten.

## Full inventory and analysis after fixes

| Program | Frozen original/candidate windows | What remains |
| --- | ---: | --- |
| [Pump](results/pump/REPORT.md) | 1,035 / 777 at baseline; 785 candidate after integration | Partial trading/creation/routes; unmatched bodies, helpers, data and build origins. Post-fix call-consistent candidate windows increase 422→423; raw-equal pairs remain617 and are ambiguous, not unique functions. |
| [AMM](results/amm/REPORT.md) | 785 / 653 | 197 candidate windows lack normalized counterparts; scalar helper specialization, diagnostic origins, transitive calls/data and authentic initializer replay remain open. |
| [Fees](results/fees/REPORT.md) | 585 / 546 | 105 unmatched candidate windows and three conflicts; 145 unattributed original windows and three conflicts. These counts are unchanged after the borrowed-account change. |
| [Mayhem](results/mayhem/REPORT.md) | 441 / 409 | Non-initializer ABI, helper/data/panic provenance, five unknown GlobalParams roles, neutral state fields and opaque excluded windows. |
| [ATA](results/ata/REPORT.md) | 159 / 159 | 307 raw bytes differ: 304 text and three relocation bytes. Mapped call/body correspondence is not raw equality or an authentic original build recipe. |
| [Metaplex](results/metaplex/REPORT.md) | 1,251 / 1,251 | Utilize is the remaining unequal body; 1,509 bytes differ in the compared ELF extent. Twenty-nine diagnostic tuples and changed relocation sites remain. |
| [Donation relay](results/relay/REPORT.md) | 492 / no candidate at baseline | Eleven business paths and seven IDL operations had uncompiled source proposals. A subsequent diagnostic build now provides candidate bytes but fails stack requirements. |

The [analysis after fixes](after-fixes/REPORT.md) uses the actual new Pump/Fees symbols and source maps. Whole-file positional differences **increase** from9,779,698→9,787,214 for Pump and600,014→600,119 for Fees, counting every excess captured byte. These layout-sensitive counts do not measure semantic proximity. They also prevent claiming that smaller executables alone improve byte equality. Full raw/normalized/call/data results and all before/after rows remain available.

The tools preserve every inferred window, actual symbol/alias, ambiguity, unknown branch, unresolved indirect call, relocation and uncovered data extent. Inferred boundaries are not authenticated historical functions. Whole-file positional, section-relative, relocated-body and call-graph comparisons are separate measurements and must not be added or averaged into a completion percentage.

## Dependencies that remain exact

[Fresh read-only comparisons](exact-dependencies/result.json) confirm the retained SPL Token compiler output equals the complete108,600-byte captured payload. The Token-2022 compiler output equals the611,056-byte captured prefix; the independently retained allocation image also matches the remaining770,960 zero bytes and the complete1,382,016-byte payload. The raw compiler output and capture-sized allocation image are explicitly distinct. This pass creates no padding or new binary.

Thus **2/5 dependency captured payloads** have exact reconstruction evidence. ATA, Metaplex and donation relay remain incomplete. Observed zero allocation tails in other captures stay visible; they are not discarded to assert equality.

## Concrete next fixes and evidence gaps

| ID | Finding and next action | Current disposition |
| --- | --- | --- |
| P01 | [BuyV3 replacement excludes105 existing successes](../../pump/buy-v3-composition-review/REPORT.md). Preserve selection before account parsing, then one parser/body/same-context exit with the17-account ABI. | Original overlay rejected; composite-context source proposal being finalized. No narrower domain is accepted as completion. |
| A01 | [AMM destination rent](followup-results/amm-transfer-creator/REPORT.md) uses zero data length where original uses the actual destination length. | One-argument correction approved for isolated build and unchanged regressions. Existing zero-lamport data cases do not validate live nonempty destinations. |
| F01 | [Sharing-update AMM predicate](followup-results/fees-sharing/REPORT.md) should test all four reserves and owner, without the extra lamport-value condition. | Minimal two-site correction approved for isolated build. Current saved417rows remain equal and do not distinguish all reserve combinations. |
| F02 | [Donation quote ownership](followup-results/fees-quote-ownership/REPORT.md): cloned AccountInfo destruction must precede the zero-key comparison. | Natural owned helper proposed and approved for isolated build; historical source coordinates and full formatter closure remain unknown. |
| F03 | [Shared social ATA admission helper](../../pump_fees/social-ata-helper-source-proposal/REPORT.md) must derive/check address, allow System-owner creation only for the recipient, retain idempotent selector1, then validate owner and decoded mint. | Separate complete source proposal; no accepted build yet. |
| F04 | Legacy sharing quote-zero admission precedes version checking; remaining-account preprocessing and V2 payout ownership also differ. | Original evidence identified; complete source contracts still needed. No guessed token-extension interpretation. |
| M01 | [Mayhem exact-token crosswalk](followup-results/mayhem-field-crosswalk/REPORT.md) corrects12 false `field_8` references that actually name `field_89`. | Corrected documentation view accepted alongside immutable history; no program rename or new role inference. |
| P02 | Original final error metadata is `QuoteMintNotWritable`, while reconstruction uses an unsupported-domain surrogate. | Attribute discriminants and allowed callsites; never globally relabel unsupported branches. |
| R01 | [Relay diagnostic build](../../donation-relay/source-build-02-diagnostics/README.md) emits an ELF but reports301 stack diagnostics across six functions, up to7,552bytes. | Unsuitable for execution. [Natural separate wrappers and reduced admission-frame ownership](../../donation-relay/stack-source-repair-proposal/README.md) have a reviewed source proposal under a separate build. No runtime evidence. |
| B01 | Historical source/module origins, exact dependency selections, compiler/SDK/link/strip identities and complete file layout remain unresolved. | Evidence-linked recovery required; no flag/version/layout brute force or binary patching. |

The external claims of8/267AMM and4/417Fees mismatches remain unverified as specific claims. Static rechecking finds all accepted saved rows equal. Source-level gaps above are independently supported by original operands, not by trusting those external counts. A different VM's treatment of zero-lamport accounts is a remaining hypothesis, not a proven explanation.

## Incomplete instruction scope

Pump still has five partial paths: `buy_exact_quote_in_v3`, `buy_v3`, `create_v2`, `multi_hop_curve_swap`, and `sell_v3`. Its unrecovered dispositions are `admin_update_token_incentives`, `claim_token_incentives`, and `set_mayhem_virtual_params`. AMM `create_config` has static/source evidence but lacks authentic positive initializer replay. Mayhem `initialize_mayhem_state` remains unrecovered.

The stopped Pump incentive, sell_v2 transfer-fee corrective/probe, old unintegrated v3 token-extension, Mayhem initializer and extra Metaplex probe lanes remain stopped. They are not reassigned under different names. These unresolved exclusions mean full completion cannot presently be claimed.

The security audit also remains open: current source changes must be reconciled with account admission, privilege/alias behavior, CPI/error/rollback paths, arithmetic and deployment assumptions. Saved regressions and static body matches are evidence, not security sign-off.

## Parallel execution and repeatability

[Dispatch records](dispatch/launch.json) show all seven first inventories completed, and the separate BuyV3 review finished. [Five follow-ups](followups/launch.json) refine concrete source/evidence gaps. [Build dispatch](build-dispatch/launch.json) assigns the reviewed AMM and Fees changes to isolated builds and resumes static BuyV3 finalization. Native workers own relay repair, social-helper recovery and analysis after fixes. Account-limit failures are terminal attempt records; completed artifacts are preserved before a resumed assignment. The native concurrency setting is unchanged.

Each published package contains a manifest and portable verifier. Prior manifests remain immutable, including the Pump inventory's complete original archive; its accidental sealed Python cache is archived as evidence and never published as a loose importable file. The next pass must bind new source/build hashes, rerun all applicable regressions, reidentify actual symbols and regenerate every affected residual row before reporting progress.
