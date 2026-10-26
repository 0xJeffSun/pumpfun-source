# Reconstruction pass 30

PR #15 merged as `870afda90abeef65fbcca3a40de00ef01cff4c9b`. Root independently verified that all 24 server check runs at exact head `2e4b3f49` succeeded, the merge's entire tree equals that head, and the merge is in main's ancestry. Hosted acceptance applies to that exact tree; it does not establish original program identity.

Whole-file identity remains **0/4 core programs (0%)**, **2/5 dependency capture images (40%)**, and **1/5 raw dependency compiler outputs (20%)**. These are separate criteria, not an overall implementation percentage. No selected source, candidate, status or ledger changes in this pass. No natural program source correction is justified by the new bounded evidence.

## AMM: scalar caller and three receiving helpers

Two separately reviewed collections retained **5,232 code bytes across five windows and 625 instruction records**: the original 616-byte/70-record caller and current 608-byte/69-record caller, then three 1,336-byte/162-record helper windows. All five decoder children exited 0. New data collection, compiler builds and target/VM executions are all zero. 30 source inputs, selected 09be/symbol f6, all eight current ledger files and the pinned tool matched before and after.

The scalar pair is original `[398896,399512)` and candidate `[63320,63928)`. Both locally branch on unsigned fee >1000; the accepting path writes the fee at incoming state+896 before the two output-word stores. The error path stores numeric 6000. Original numeric fields 220/44 differ from current 7/26; these observations do not authorize synthetic coordinates, line padding or source relocation. The original inferred extent and historical name remain unverified; a candidate symbol does not establish original ownership.

The original caller explicitly supplies r4=1000 and r5=fee before calling 6208. The current caller explicitly supplies r4=fee before calling 4872. The new receiving windows distinguish actual targets from the ledger counterpart:

| Role | Window | Local scalar-slot preparation |
|---|---|---|
| Original actual target | `[6208,7544)` | Incoming r4→frame-296; incoming r5→frame-288. |
| Current actual target | `[4872,6208)` | Literal 1000→frame-296; incoming r4→frame-288. |
| Current ledger counterpart | `[3536,4872)` | Incoming r4→frame-296; incoming r5→frame-288. |

The maximum is explicitly present in the current receiving helper. Under the observed caller assignments, the two scalar slots carry the same max/fee pair. This closes the purported missing-maximum argument concern locally, without proving historical source spelling or compiler specialization causality.

The two current helper windows differ only at four prologue records and eight relative-call displacements. All eight decoded actual targets agree at corresponding offsets: calls reach 1093000,1069408 or1094096. Remaining raw instruction records coincide. Complete raw differences, local CFG and conditional call-return edges are retained; original/counterpart opaque pointer and target changes remain unclosed.

Crucially, r4/r5 still differ at the first opaque call. Incoming r5 has no explicit local read in the current actual helper before overwrite, but that does not prove an opaque callee ignores it. Full register states, receiving ABI, aliasing, initialization, formatting, ownership, allocation, destruction, panic behavior and transitive data equivalence remain unproved. No missing-move/size-based source patch or full-helper-equivalence claim follows.

Current-only Anchor lang 0.31.1/attribute-error 0.31.2 source shows the by-value `(1000u64,fee)` macro operands and u64/ToString route. That is candidate source context, not the original resolved graph, authentic compiler receipt or historical API proof.

## Verification repairs and preserved failures

The first actual pair CLI returned 1 before the external grant guard, output creation, images or decoder: its manifest reader assumed a `files` wrapper while the retained metadata used a bare mapping. Actual new code bytes/images/decoder children were zero. This was a collector setup defect, not program rejection. Its grant, exact plan, stdout/stderr and observed exit remain preserved. A separately reviewed v2 required a distinct external admission before the successful corrective collection.

The corrected reader accepts both exact manifest schemas while retaining known raw seals, sidecars, strict regular membership, payload hashes and optional sizes. Receipt tests retain exact returned bytes/counts before acceptance, including early failures; decoded PCs must be strictly contiguous8/16-byte rows covering the exact interval.

The first three-role plan 3f95 was held **unexecuted** when review found its copied scope still said 1,224 bytes/max 2 and its output used old scalar headers. The separately reviewed successor enforces 4,008/max 3 and independently sealed helper headers before image access. New helper metadata and prior scalar-caller metadata are emitted under separate truthful filenames. This hold is not an invented failed collection attempt.

Root also found an analyzer bug: ADD-immediate used a source-register definition instead of the prior destination. The repaired proof preserves original a933 and every raw tuple/CFG/store/load/call target, corrects that dependency and adds independent MOV/ADD/call-clobber regressions. Definition records are expressly **linear textual last-local-write bookkeeping**, not CFG reaching-value analysis. Caller-saved values across opaque calls remain unknown; callee-saved preservation is an ABI assumption. The receiving checker also verifies LDDW register, offset and reserved bytes while leaving address payloads opaque, and binds copied caller records to their exact parent manifest. Coherent mutations reject. These checks supply no new historical attribution or data admission.

## Metaplex: exact lower-header gate remains missing

Existing admitted Utilize metadata records calls to 12448 at original 237936/238880 and candidate 11 237936/241576. This is the complete recorded list within that admitted body, not a global caller census. The referenced build11 inventory summary contains 1,251/1,251 aggregate windows and the unmatched Utilize header, but no exact owning 12448 header.

Original and candidate 12448 end/size/rawhash/admission therefore remain absent. No extent was inferred from a neighboring function, call target or destructor-like name. The next gate is an independently bound per-image owning header and inventory provenance before a separate bounded request. No lower body, literal or ELF was collected. Extra Metaplex runtime remains stopped, and the original asset-linked source/lock/features/tool/SDK/build recipe remains unresolved.

## All remaining identity obligations

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

The complete reconstruction queue remains **3,338 original function-window records**: Pump 1,035, AMM 785, Fees 585, Mayhem 441 and Relay 492. AMM's 297 unmatched count is unchanged. Supplemental static proof does not promote match counts or executable routes. Positional differences, normalized pairs and finite cases are not semantic distance, an implementation percentage or hours remaining.

Pump's five partial handlers remain sell_v3, buy_v3, buy_exact_quote_in_v3, create_v2 and multi_hop_curve_swap. Existing finite ordinary/SOL/USDC/multi-hop cases do not close arbitrary quote routes, extensions, nested/Mayhem/completion behavior, validation or final event fields. The sell_v2 transfer-fee minimum-output/fee-event discrepancy remains unresolved and its corrective lane remains stopped. SDK resolver/derivation/account/wrapper/fee/external-constant/JavaScript-graph obligations also remain open; locked package counts are not historical compiled-unit receipts.

## Publication and next proof gates

The [lossless research archive](research-evidence/inventory.json) retains 22 explicitly sealed groups, including all preparation failures, held plans, complete actual collections and independent reviews. Outer seal: `e0a7515d2da6ebad110128b353f15d8d6df27878c029899f7b419580bdbd8477`. One compressed part contains 831,191 bytes. Root's relocated [stream verifier](research-evidence/verify_stream.py) exited 0 for all 1,022 file/directory members and known inner seals, with no extraction or archived-code execution. The [packaging plan](packaging-plan/PLAN.md), seal `051638c428ff283baa2704d59ec341d4b895ff158a278a1f58f642b11cdcbeba`, uses the byte-identical reviewed P29 engine and retains its twelve synthetic cases.

Reproduce transport verification with `python3 -B repro/layered-passes/pass-30/research-evidence/verify_stream.py --package repro/layered-passes/pass-30/research-evidence --expected-seal e0a7515d2da6ebad110128b353f15d8d6df27878c029899f7b419580bdbd8477`. This checks raw files/modes/paths/parts/inner seals; it grants no new execution scope. Actual Root packaging and relocation receipts are [retained separately](verification/README.md).

Useful next AMM work is a separately reviewed metadata/admission gate for the actual original 1152056/current 1093000 path and original 1126296/current 1069408 plus original 1153176/current 1094096, followed only if authorized by bounded code/data/ownership proof. It must resolve actual receiving arguments and effects rather than force scalar source shape. Metaplex first needs the missing 12448 owning header. Other program gaps in the table remain independent obligations. This report grants no additional collection, source patch, build or execution.

All stops remain: Pump sell_v2 corrective/transfer-fee probe; admin-update/claim incentives; Mayhem initializer; old V3 token-extension leaf; extra Metaplex runtime; filtered BuyV3 partial-fill. Relay sort58/59 and rejected 9d remain opaque. Further Pump parser expansion stays halted after the automated security filter reported possible cybersecurity risk without detailed reason; it was not retried or rerouted. No signer/PDA/owner/history bypass, fake source coordinates, binary edit/padding, recipe/flag/layout sweep, deployment or live transaction occurred.
