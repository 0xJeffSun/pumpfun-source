# Reconstruction pass 25 — verified publication checkpoint

The four core programs remain **0/4 byte-identical**. Dependency capture images remain **2/5 identical**; only SPL Token is an exact whole-file raw compiler output (**1/5**). Token-2022's matching allocation image and its shorter compiler output are recorded separately. These acceptance counts do not estimate the percentage of reconstruction work completed.

## Selected changes

Pump selects `71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c`. The genuine managed-source build reproduced the tested executable and symbols exactly. It restores the holder-rewards-PDA rejection, WSOL quote rejection through the SDK native-mint constant, and owned 6019/6091/early-6092 error construction. All 9,269 unchanged differential cases, 1,024 signed comparisons and 68 receipt bindings pass their existing assertions. These counts overlap. Changed-error coverage is 17 differential cases and one signed case; individual holder-PDA and WSOL disjunct coverage remains unproved. Application ConstraintSeeds coverage is zero. The late numeric 6092 return, AccountInfo retention, evaluation order and transitive CPI/error behavior remain open. Superseded builds, failures and source history remain preserved.

Mayhem selects `ca5d4f54b14e2f67c4eca56fcac29b54801906cecf23c463801916fd9d6b6621`. The genuine managed-source build reproduces the tested executable and symbols using the measured official v1.54 recipe, with all 14 source inputs unchanged. Existing 9,595 functional comparisons and saved verifiers pass. Of 61 retained diagnostic domains, 58 have compute-only differences and three burn domains are identical under that diagnostic comparison. The actual retained raw evidence contains 13,284 verified transactions and 26,500 signatures; 5,906 administrative executions lack raw bytes. The empty SDK syscall allowlist still limits authority, and the measured recipe does not establish a unique historical compiler. Initializer execution remains excluded.

Relay selects source 15, `5f6d29410047551f5f4e448937f2de318c2a55546699fbfb33dacd5c89ddaea4`. It retains the u16 weight buffer and conditional leftover sort, and restores three owned arithmetic errors with Result propagation. The unchanged ordinary corpus passes 12 cases, 24 submissions, 50 signature fields, 12 unique transactions, 25 unique signatures and 24 effect checks. Changed arithmetic, materialization, sorting and borrow-failure branches have zero dynamic coverage. Portable saved signature verification is distinct from native Darwin runtime identity. Selection binds the 23 canonical source inputs; a fresh build from that canonical path is not claimed. Complete Relay 14 intermediate evidence remains historical. The v1.47 backend stack-overflow attempt stays rejected.

AMM and Fees selections remain `6dc621c8…` and `2387f813…`. AMM's existing corpus has 17,462 bounded cases. Fees has 17,461 comparisons and ten separate sequence steps; its 20 focused cases are included in the comparison total. These suites do not establish exhaustive behavior or security acceptance.

## Exact comparison of all original bytes

The full positional ranges are retained in `after-corrections/all-byte-ranges.json.gz`. Counts include differences in the common extent and any excess original bytes. They are not semantic distance or completion percentages.

| Program or dependency | Whole-file identity | Differing or missing positions |
|---|---|---:|
| Pump | No | 9,784,703 |
| AMM | No | 9,957,873 |
| Fees | No | 554,122 |
| Mayhem | No | 501,010 |
| Relay | No | 614,726 |
| SPL Token raw compiler output | Yes | 0 |
| Token-2022 retained allocation image | Yes | 0 |
| ATA retained image | No | 307 |
| Metaplex retained image | No | 1,509 |

Token-2022 raw compiler output matches the complete 611,056-byte common prefix but lacks 770,960 allocation bytes. Metaplex raw compiler output has 1,509 common-extent differences plus 86,543 missing positions. No binary padding or byte editing was used to turn these into compiler-output matches.

## Remaining work

- **Pump:** Five explicitly partial handlers; route, quote, extension, completion, settlement and event gaps; complete decoder/parser/application/wrapper and cleanup identity; AccountInfo ownership and error/evaluation order; exact source coordinates, diagnostics, indirect calls, data and CPI closure. The 1,035-window ledger retains 454 call-consistent pattern matches under its bounded method. Those matches are not a semantic-completion count. The incoming standalone virtual-params source fails existing no-op, threshold, arithmetic/narrowing and account-contract evidence and remains inactive. The stopped sell_v2 corrective execution remains excluded.
- **AMM:** 297 original windows without normalized matches; scalar/context, call/data and recursive closure; static-only create_config with zero runtime successes; exact source/build provenance and complete executable identity. A separate next-pass candidate, `09bee0df…`, compiled once with backend diagnostics clear and all eight after-gates passing. It changes only the collect-owner plain 6048 error construction. Its emitted review is pending; it has no new runtime acceptance and is not selected by this checkpoint.
- **Fees:** Of 585 original windows, 461 are mapped patterns, 122 unattributed and two call-conflicting. Candidate ranges retain 117 unmatched and two conflicting rows. There are 273 immediate-call residual pairs and 121 original/122 candidate indirect calls. Full parser/caller/helper/cleanup, ownership, compared values, data and diagnostic closure remain open. Admin-only authorization has zero runtime coverage. Supplemental key reviews retain no-change conclusions.
- **Mayhem:** Of 441 original windows, 184 are admitted and 257 remain opaque. Source/error/ownership gaps, five unresolved GlobalParams field roles, transitive calls/data and historical recipe identity remain open. Initializer remains excluded.
- **Relay:** 122 normalized and 33 raw original-window matches, with 370 original windows unmatched out of 492. Complete owned-error/serializer/reporting ABI, privileged success routes, source-origin restrictions, transitive calls/data and historical source/build provenance remain open. No source-origin or authority bypass is implied.
- **ATA:** 307 retained-image differences: 304 text and three relocation bytes. Historical source/build ordering is unresolved.
- **Metaplex:** 1,509 retained-image differences: 1,477 text, 30 diagnostic and two relocation bytes. Local CFG correspondence does not establish raw identity or historical source. Additional runtime probes stay excluded.
- **Across programs:** Unresolved indirect targets, consumed data extents, opaque scopes and original compiler/dependency/source provenance remain. Passing finite regression suites does not establish complete deployed equivalence or a comprehensive security audit.

## Reconciliation and validation

Pinned main `2508c2be79bc5e66956dcd979e5d2f2a780fd851` is reconciled. Incoming Linux measurements, SDK closure and static evidence are preserved. The 233-path hash inventory covers 225 positive paths and eight inactive paths; both sets of archived rename variants are retained. Selected source is preserved instead of reactivating stopped incoming execution lanes.

The verified current source maps contain 107 core inputs (37 Pump, 30 AMM, 26 Fees, 14 Mayhem) and 23 Relay inputs. Actual Git-index blob verification passed for all 130 source inputs and 329 source/asset paths. A separate complete index audit passed for 41 sealed packages: 8,152 paths and 2,712 distinct blobs. Whitespace checks passed with exact, hash-bound exceptions for retained evidence bytes.

The final index retains all **3,338 original function-window records**: 1,035 Pump, 785 AMM, 585 Fees, 441 Mayhem and 492 Relay. The complete deterministic queue was independently regenerated and compared as JSON. All 39 catalogued packages passed saved-evidence verification, including signatures under explicit supported Python 3.12 for Relay. Historical witnesses are integrity-checked without running stale current-state assertions. The new applicability and reconciliation guards passed, with no new compiler or VM execution. Both byte-comparison snapshots were independently recomputed.

See `verification-results.json`, `verification-runner-exits.json`, `current-analysis-index.json`, `packets.json` and `window-queue.json.gz`. The after-comparison's baseline commit records when its selected artifacts were captured; it is not a claim that the later publication commit was built again. Hosted CI remains a separate gate until observed for the published head.

Stopped executions remain excluded: the new Pump sell_v2 corrective/transfer-fee probe; Pump admin-update/claim token incentives; Mayhem initializer; the old V3 extension leaf; the additional Metaplex runtime probe; and filtered BuyV3 partial-fill. No new signer, PDA, owner, source-origin or history bypass, fabricated source coordinates, ELF padding, or compiler/layout sweep was introduced.
