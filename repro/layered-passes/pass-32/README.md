# Reconstruction pass 32

Whole-file identity remains **0/4 core programs**, **2/5 dependency capture images**, and **1/5 raw dependency compiler outputs**. These are different acceptance criteria, not an overall reconstruction percentage. Selected Pump 71ec/AMM 09be/Fees 2387/Mayhem ca5d and Relay 15/5f6d remain unchanged. No source, status, ledger category, queue or match count changes are justified by this pass.

## Main reconciliation

[PR #17](https://github.com/lalalune/pumpfun-source/pull/17) merged as `a78bcd37d6c1000ec0e3e53fb01628d8cdf7070b` after all 24 checks succeeded at exact head `6dde3f9818b867be168051bbc4e07e88edbc64a3`. Root independently verified the actual merge tree equals the reviewed union `15e5d2cf0a6a94d8598a9f8b0f7bb6300e3fb797`, preserving both the PR head and prior main14 ancestry. The union includes main14 data, so it differs from the incoming head tree. Final union/main-push hosted coverage remains a separate run.

Pinned main14 merge `2e7f904a9c9fad50185fd9bcee0f18aa4be8fc9b` adds 2,480 paths and 248,046,133 raw bytes: eight sealed package trees plus one document. Independent review hashes every raw Git blob. Root's actual Git-index audit verifies 2,479 package paths and 2,090 distinct blobs, exit 0. All protected source, status, scripts, workflows, attributes and root manifest/lock bytes remain equal to the accepted 1621 projection. Incoming collector 6e and related research stay unselected. Their saved build/runtime/compiler/SDK claims remain passive evidence here; no incoming controller, parser fixture or target executes.

The incoming payloads retain 386 raw whitespace diagnostics: 344 trailing-whitespace and 42 EOF findings. The raw command remains exit 2, with no payload edit or attribute waiver. A first qualification script failed because splitlines split carriage-return log context; its actual failure and raw logs remain preserved. The corrected record authenticates every recognized diagnostic's owning manifest and retains all context without interpreting it as source behavior. This is preservation of incoming evidence, not a passing raw whitespace result.

## Actual admitted scope

Two separately reviewed fixed collections retained **1,520 code bytes across six windows and 182 instruction records**. AMM contributes 680B/81records per side; Metaplex contributes four 40B/five-record windows. All six decoder children exited 0. New data/literal collections, compiler builds and target/VM executions are 0. Before/finally-after source/status/complete-owner/eight-ledger/tool checks retain their exact admitted scope. No additional collection follows automatically from a decoded target or header.

## AMM: incoming register dependence closes locally

Original `[1151096,1151776)` and selected candidate `[1092128,1092808)` each contain 81 instruction records across 85 eight-byte slots, with four 16B LDDWs. Every record and all 84 encoded CFG edges per side are retained. One backedge offsets 256→24 is included; syntactic reachability is not a branch-feasibility or termination proof.

The predecessor-intersection greatest-fixed-point analysis finds a local definition on every incoming encoded path at all 25 r4/r5 read sites per side. A separate union-based may-dependency fixed point preserves entry-register tokens, unknownmemory/address dependencies, opaqueLDDWtokens and the correct priorDEST/registerSRC for ALU operations. Stores do not redefine registers. The only CALL is the final source-register1direct call at offset 664, whose return is opaque.

At that call's input, r1 depends on entry r3, r2 on entry r2, r3 is literal 1, r4 literal 0 and r5 the entry frame register r10. This closes the earlier concern about **incoming r4/r5 register dependence** through the admitted numeric windows. It does not prove equal memory contents, initialized/disjoint stack regions, table/pointer validity, alias behavior, numeric formatting or global output equivalence.

Exactly five raw records differ: four opaque LDDW address payloads and the final relativeCALL displacement. Register/offset/reserved LDDW fields and other raw tuples agree. Opaque address values do not establish table contents, character encoding or source identity. Final targets 1132800/1074592 are numeric boundaries only; no body/header/data grant follows. Unknown table bytes, child effects, ownership/allocation/destruction and original recipe remain open. No sourcepatch or missing-maximum bug is established.

Root's saved checker and independent review authenticate completecollection/admission/rawstreams, all 81 records/84 edges/fixed-point states and five coherent rejecting mutations. Actual checker exits0 preserve bounded assertions; these checks are not target execution or proof of a unique original API.

## Metaplex: conditional lower forwarding

Original and RAW candidate11 windows at 12408..12448 and 12016..12056 are 40B each. Each same-role pair is raw-identical. RAW candidate3bbaf remains distinct from the retained 2c26 allocation image; image equality and original source provenance are separate obligations.

The first window saves incoming P in r6, calls 573280 from 12416, restores r1 from r6, calls 573840 from 12432, then exits if both calls return. Exact source1 relative-call arithmetic establishes those targets. The restoration relies on the ordinary callee-saved r6 assumption; these windows do not independently prove it or identify object/destructor/allocator types.

The last window first loads 64 bits from[r1+8] into r2. The subsequent nonzero branch gates a call from 12040 to 33656; it does not validate or guard the earlier load. Zero reachesEXIT12032. If the opaque call returns, JA12048 goes back toEXIT12032, **not back to the call**. No local repeat-call loop, pointer safety, noreturn or full cleanup/ownership equivalence is inferred.

The prior admitted 192B caller routes P+0/P+24/P+48 to the first window and P+80 to the last under the same explicit r6 preservation assumption. This local pointer map remains a bounded forwarding fact, not object-layout/drop/safety proof. Calls 573280/573840/33656 have only existing metadata headers 8B/48B/80B per image; no further bodies were inspected or granted. Five raw mutations reject changed callsource/target/branch/backjump/loadwidth. Strong proof verifiers authenticate their exact saved parents before assertions.

## Remaining identity obligations

| Program | Selected candidate | Differing or missing positions | Open work |
|---|---|---:|---|
| Pump | 71ec4d8a | 9,784,703 | Five partial handlers; wallet frozen 6093, generic 6050/post-ATA header checks, exact None-route logs, settlement/event/CPI/cleanup, account ownership and authentic recipe. |
| AMM | 09bee0df | 9,958,512 | 297 unmatched original windows; incoming r4/r5 register dependence closes locally, while opaque tables, final callees1132800/1074592, memory initialization/aliasing, formatting, ownership/allocation/cleanup, context/diagnostic provenance and authentic original source/build remain unresolved. |
| Fees | 2387f813 | 554,122 | 122 unattributed/two conflicting windows; non-ASCII conversion, indirect formatter target/effects, compared values, owned errors and allocator/drop/cleanup; admin-only changed-branch runtime coverage remains zero. |
| Mayhem | ca5d4f54 | 501,010 | 257 opaque classifications; five unknown GlobalParams field roles, external/helper/data/ownership/error closure and authentic source/dependency/SDK/recipe. |
| Relay | 5f6d2941 | 614,726 | 370 unmatched originals; 122 normalized/33 raw bounds do not close transitive data/calls, serialization, changed-domain coverage, privileged success or authentic source/build. Linux15 produced no candidate. |
| ATA | retained candidate | 307 | 304 text/three relocation positions; authentic asset-linked source/dependency/unit-ordering recipe. |
| Metaplex | candidate 11 | 1,509 retained / 88,052 raw | 1,477 text/30 diagnostic/two relocation positions; raw also lacks 86,543 bytes. Exact cleanup/allocation/provenance and authentic recipe remain open. |
| SPL Token | exact raw output | 0 | Current whole-file raw compiler output is exact. |
| Token-2022 | exact capture image | 0 capture / 770,960 raw missing | Equal 611,056-byte prefix excludes the original allocation tail; raw whole-file identity remains false. |

All table byte-position metrics remain unchanged from P30/P31. They are not semantic distance or a completion percentage. The AMM first formatter/numeric boundary is now locally refined by the register proof, while memory/table/callee/output contracts stay open. The Metaplex lower-path refinement leaves asset-linked source/dependencies/features/SDK/compiler/unit-ordering and recursive allocation/cleanup unresolved. Finite saved runtime inputs do not establish exhaustive safety, security or deployable equivalence.

## Preservation and publication

The [lossless research archive](research-evidence/inventory.json) retains 12 sealed groups. Its outer seal is `924a1e7722b08ec10722e9ced05d12aed36387be8acedec176bbcb2c8a896056`; one compressed part contains 547,914 bytes. Root's relocated [stream verifier](research-evidence/verify_stream.py) exited 0 for all 309 file/directory members and known inner manifests, without extraction or archived-code execution. The separately sealed [packaging plan](packaging-plan/PLAN.md), `64f94732f4cb78a27e85a0b5a79d9bfad3cb2e8f8d9a04e2de6f64445e944517`, uses the unchanged P29/P30/P31 engine and retains twelve synthetic checks. [Actual verification receipts](verification/README.md) distinguish the PR-head checks, reviewed merge union, source/metadata checks and archive transport checks.

Reproduce transport verification with `python3 -B repro/layered-passes/pass-32/research-evidence/verify_stream.py --package repro/layered-passes/pass-32/research-evidence --expected-seal 924a1e7722b08ec10722e9ced05d12aed36387be8acedec176bbcb2c8a896056`. Prior failed attempts, held plans, grants, collections and immutable checker versions remain preserved. Current peers' unselected candidates are not current selections. This publication requires its own exact-head hosted acceptance.

All stopped execution lanes remain excluded: Pump sell_v2 corrective/transfer-fee probe; admin-update/claim incentives; Mayhem initializer; old V3 token-extension leaf; extra Metaplex runtime; filtered BuyV3 partial-fill. Relay sort58/59 and rejected 9d remain opaque. Pump parser expansion remains halted after the automated security filter reported possible cybersecurity risk without a detailed reason; no retry/reroute occurred. Private audit paths remain excluded. No signer/PDA/owner/history bypass, fabricated source coordinate, binary edit/padding, flags/layout sweep, live transaction or deployment occurred.

The complete queue remains 3,338 records: Pump 1,035, AMM 785, Fees 585, Mayhem 441 and Relay 492. No source or count promotion follows from this report. Further collection must preserve the stopped executions and established evidence boundaries. No percentage for unknown remaining work is claimed.
