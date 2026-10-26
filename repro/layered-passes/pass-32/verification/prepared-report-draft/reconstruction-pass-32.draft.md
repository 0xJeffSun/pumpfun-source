# Reconstruction pass32

Whole-file identity remains **0/4 core programs**, **2/5 dependency capture images**, and **1/5 raw dependency compiler outputs**. These are different acceptance criteria, not an overall reconstruction percentage. Selected Pump71ec/AMM09be/Fees2387/Mayhemca5d and Relay15/5f6d remain unchanged. No source, status, ledger category, queue or match count changes are justified by this pass.

## Actual admitted scope

Two separately reviewed fixed collections retained **1,520 code bytes across six windows and182 instruction records**. AMM contributes680B/81records per side; Metaplex contributes four40B/five-record windows. All six decoder children exited0. New data/literal collections, compiler builds and target/VM executions are0. Before/finally-after source/status/complete-owner/eight-ledger/tool checks retain their exact admitted scope. No additional collection follows automatically from a decoded target or header.

## AMM: incoming register dependence closes locally

Original `[1151096,1151776)` and selected candidate `[1092128,1092808)` each contain81 instruction records across85eight-byte slots, with four16B LDDWs. Every record and all84encoded CFG edges per side are retained. One backedge offsets256→24 is included; syntactic reachability is not a branch-feasibility or termination proof.

The predecessor-intersection greatest-fixed-point analysis finds a local definition on every incoming encoded path at all25r4/r5read sites per side. A separate union-based may-dependency fixed point preserves entry-register tokens, unknownmemory/address dependencies, opaqueLDDWtokens and the correct priorDEST/registerSRC for ALU operations. Stores do not redefine registers. The only CALL is the final source-register1direct call at offset664, whose return is opaque.

At that call's input, r1 depends on entryr3, r2 on entryr2, r3 is literal1, r4 literal0 and r5 the entry frame registerr10. This closes the earlier concern about **incomingr4/r5 register dependence** through the admitted numeric windows. It does not prove equal memory contents, initialized/disjoint stack regions, table/pointer validity, alias behavior, numeric formatting or global output equivalence.

Exactly five raw records differ: fouropaque LDDW address payloads and the final relativeCALL displacement. Register/offset/reserved LDDW fields and other raw tuples agree. Opaque address values do not establish table contents, character encoding or source identity. Final targets1132800/1074592 are numeric boundaries only; no body/header/data grant follows. Unknown table bytes, child effects, ownership/allocation/destruction and original recipe remain open. No sourcepatch or missing-maximum bug is established.

Root's saved checker and independent review authenticate completecollection/admission/rawstreams, all81records/84edges/fixed-point states and five coherent rejecting mutations. Actual checker exits0 preserve bounded assertions; these checks are not target execution or proof of a unique original API.

## Metaplex: conditional lower forwarding

Original and RAWcandidate11 windows at12408..12448 and12016..12056 are40B each. Each same-role pair is raw-identical. RAWcandidate3bbaf remains distinct from the retained2c26allocation image; image equality and original source provenance are separate obligations.

The first window saves incomingP inr6, calls573280 from12416, restoresr1 fromr6, calls573840 from12432, then exits if both calls return. Exactsource1relative-call arithmetic establishes those targets. The restoration relies on the ordinary callee-savedr6assumption; these windows do not independently prove it or identify object/destructor/allocator types.

The last window first loads64bits from[r1+8] intor2. The subsequent nonzero branch gates a call from12040 to33656; it does not validate or guard the earlier load. Zero reachesEXIT12032. If the opaque call returns, JA12048 goes back toEXIT12032, **not back to the call**. No local repeat-call loop, pointer safety, noreturn or full cleanup/ownership equivalence is inferred.

The prior admitted192Bcaller routesP+0/P+24/P+48 to the first window andP+80 to the last under the same explicit r6preservation assumption. This local pointer map remains a bounded forwarding fact, not object-layout/drop/safety proof. Calls573280/573840/33656 have only existing metadata headers8B/48B/80B per image; no further bodies were inspected or granted. Five raw mutations reject changed callsource/target/branch/backjump/loadwidth. Strong proof verifiers authenticate their exact saved parents before assertions.

## Remaining identity obligations

| Program | Selected candidate | Differing or missing positions | Open work |
|---|---|---:|---|
| Pump | 71ec4d8a | 9,784,703 | Five partial handlers; wallet frozen 6093, generic 6050/post-ATA header checks, exact None-route logs, settlement/event/CPI/cleanup, account ownership and authentic recipe. |
| AMM | 09bee0df | 9,958,512 | 297 unmatched original windows; actual formatting targets 1152056/1093000 and the other two target pairs, data/ownership/cleanup, full context/diagnostic provenance and original source/build identity. |
| Fees | 2387f813 | 554,122 | 122 unattributed/two conflicting windows; non-ASCII conversion, indirect formatter target/effects, compared values, owned errors and allocator/drop/cleanup; admin-only changed-branch runtime coverage remains zero. |
| Mayhem | ca5d4f54 | 501,010 | 257 opaque classifications; five unknown GlobalParams field roles, external/helper/data/ownership/error closure and authentic source/dependency/SDK/recipe. |
| Relay | 5f6d2941 | 614,726 | 370 unmatched originals; 122 normalized/33 raw bounds do not close transitive data/calls, serialization, changed-domain coverage, privileged success or authentic source/build. Linux15 produced no candidate. |
| ATA | retained candidate | 307 | 304 text/three relocation positions; authentic asset-linked source/dependency/unit-ordering recipe. |
| Metaplex | candidate 11 | 1,509 retained / 88,052 raw | 1,477 text/30 diagnostic/two relocation positions; raw also lacks 86,543 bytes. Exact cleanup/allocation/provenance and authentic recipe remain open. |
| SPL Token | exact raw output | 0 | Current whole-file raw compiler output is exact. |
| Token-2022 | exact capture image | 0 capture / 770,960 raw missing | Equal 611,056-byte prefix excludes the original allocation tail; raw whole-file identity remains false. |

All table byte-position metrics remain unchanged from P30/P31. They are not semantic distance or a completion percentage. The AMM first formatter/numeric boundary is now locally refined by the register proof, while memory/table/callee/output contracts stay open. The Metaplex lower-path refinement leaves asset-linked source/dependencies/features/SDK/compiler/unit-ordering and recursive allocation/cleanup unresolved. Finite saved runtime inputs do not establish exhaustive safety, security or deployable equivalence.

## Preservation and publication

Archive/publication fields are **PENDING Root actual packaging**: group count, outerseal, compressed part sizes, member count, relocated transport receipts, final PR head/checks/merge. No draft number or expected check is a completed result. PriorP30/P31 failed attempts, held plans, actual external grants/collections, corrected checkers and immutable proof versions remain preserved. Current peers' unselected candidates are not Root-adopted selections.

All stopped execution lanes remain excluded: Pump sell_v2 corrective/transfer-fee probe; admin-update/claim incentives; Mayhem initializer; oldV3token-extension leaf; extraMetaplexruntime; filteredBuyV3partial-fill. Relay sort58/59 and rejected9d remain opaque. Pump parser expansion remains halted after the automated security filter reported possible cybersecurity risk without a detailed reason; no retry/reroute occurred. Private audit paths remain excluded. No signer/PDA/owner/history bypass, fabricated source coordinate, binary edit/padding, flags/layout sweep, live transaction or deployment occurred.

No future body/table/literal/callee collection is authorized by this report. Fresh Root review and exact scope grant are required before any continuation. No percentage for unknown remaining reconstruction work is claimed.
