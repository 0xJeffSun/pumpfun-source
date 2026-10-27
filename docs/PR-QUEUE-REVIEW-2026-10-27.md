# PR queue review — 27 October 2026

Reviewed PRs #170–#203 as a combined merge tree based on `ba7883511942965c5c9def03971bdaff84963d6b`. Through #202, selected program sources and workflows were unchanged. #203 explicitly promotes Relay and changes its guard entrypoints; the four core source maps, captures and scripts remain preserved. Overlapping append-only progress-log additions were preserved during local conflict resolution.

| PR | Reviewed change | Verification and scope |
| --- | --- | --- |
| [#170](https://github.com/lalalune/pumpfun-source/pull/170) | Relay: source-only close_epoch recovery (484/492) | Source map, patch, static verifier and 8 tests pass; reported 484-window result remains source-only. |
| [#171](https://github.com/lalalune/pumpfun-source/pull/171) | Fees: recover crank account parser and integrate relay rejection | Crank parser and decoder integration verifier plus mutation checks pass; fresh 16-case relay-address matrix on the successor candidate passes. |
| [#172](https://github.com/lalalune/pumpfun-source/pull/172) | Recover Fees social-PDA creation body and existing-state precedence | Body/callee verifier passes; 157 strict social-creation cases freshly replayed with zero mismatches. |
| [#173](https://github.com/lalalune/pumpfun-source/pull/173) | Fees: source-only native recipe and 27 Location corrections | Source verifier and 15 tests pass; optional binary claims remain outside this source-only review. |
| [#174](https://github.com/lalalune/pumpfun-source/pull/174) | Relay: source-only just_swap recovery (485/492) | Source verifier and 8 tests pass; reported 485-window result remains source-only. |
| [#175](https://github.com/lalalune/pumpfun-source/pull/175) | Relay: source-only module layout and Anchor facade (142 raw windows) | Six source stages and 7 tests pass; 142 raw-local measurement is not promoted to the retained compiled inventory. |
| [#176](https://github.com/lalalune/pumpfun-source/pull/176) | Fees: recover sharing creation account context | Context/body/data/receipt verifier and mutation tests pass; 399-pair candidate remains separately bound to its parent. |
| [#177](https://github.com/lalalune/pumpfun-source/pull/177) | Trace LLVM stack coloring in the earlier Fees body-direct candidate | Offline compiler-evidence verifier and 16 tests pass; no new target execution or body gain claimed. |
| [#178](https://github.com/lalalune/pumpfun-source/pull/178) | Fees: pinned source integration (544 windows, 161 Locations) | Pinned source integration verifier and 15 tests pass; 544-window recipe is not asserted to include all later branches. |
| [#179](https://github.com/lalalune/pumpfun-source/pull/179) | Artifact-back Relay shared worker recovery (483/492) | Artifact/source/callee/replay verifier passes; independent fresh build exactly reproduced both worker artifacts and 536 records were freshly replayed with zero failures. |
| [#180](https://github.com/lalalune/pumpfun-source/pull/180) | Verify Mayhem configuration history from raw transaction and event payloads | Wire decoder, historical entrypoint and 25 tests pass; capture consistency does not authenticate RPC data or establish field semantics. |
| [#181](https://github.com/lalalune/pumpfun-source/pull/181) | Relay: exact read-only data through ordinary settlement source | Source/data-graph verifier and 9 tests pass; exact read-only-data result remains a source-only measured proposal. |
| [#182](https://github.com/lalalune/pumpfun-source/pull/182) | Fees: source-only extension admission diagnostics | Source verifier and 13 tests pass; runtime/build claims are explicitly unverified by the packet. |
| [#183](https://github.com/lalalune/pumpfun-source/pull/183) | test: run disassembly CLI fixtures on Windows | 20 disassembly tests pass locally, including real fixture subprocesses; native Windows execution remains the author’s retained validation. |
| [#184](https://github.com/lalalune/pumpfun-source/pull/184) | Relay: recover three complete settlement bodies (488/492) | Source verifier and 9 tests pass; three-file patch preserves a 60-input map. Reported 488-window/data-graph result remains source-only; no independent compiler or VM execution of this variant in this review. |
| [#185](https://github.com/lalalune/pumpfun-source/pull/185) | Fees admin-sharing parser and dispatch | Artifact/source/data verifier and three mutation checks pass; fresh 63-case captured-Pump admin-CTO replay passes. Separate 401-pair Fees candidate; business body remains unmatched. |
| [#186](https://github.com/lalalune/pumpfun-source/pull/186) | Artifact-backed Relay settlement recovery | Independent fresh baseline/recovered builds reproduce expected outputs; 488 normalized and 142 raw-local windows, 99 settlement callees, data graph and 536 fresh replay records pass. This advances the retained Relay inventory to four unmatched windows. |
| [#187](https://github.com/lalalune/pumpfun-source/pull/187) | Mayhem shipped v1.54 sysroot object provenance | Offline verifier and 21 regression tests pass; ten raw capture ranges match retained objects and linked bodies. GitHub publisher metadata independently matches the recorded archive digest. Full archive/member associations were not rerun in this review; their author receipt is retained. |
| [#188](https://github.com/lalalune/pumpfun-source/pull/188) | Fees math ownership and authentic SyncNative packing | Source verifier and nine tests pass. Optional four-build measurements remain the authors’ reported evidence; this review did not compile or replay the proposal. Its reported 545 normalized windows are a separate pinned experiment, not a replacement for the current inventory. |
| [#189](https://github.com/lalalune/pumpfun-source/pull/189) | Complete Relay normalized inventory | Source verifier and nine tests pass; independent 490/492 builds match published hashes, full optional measurement and 536 fresh signed replay records pass. Whole ELF remains unequal. |
| [#190](https://github.com/lalalune/pumpfun-source/pull/190) | Fees social/context composition | Artifact/source/callee/data verifier and four mutation tests pass. Its 402-pair candidate remains separate from the later 404-pair composition now used in the current inventory. |
| [#191](https://github.com/lalalune/pumpfun-source/pull/191) | Independent Mayhem history decoder | Fixed package-relative input paths and added an actual decoded old/new version-chain check. All 13 captures match; five negative/path tests and the original package verifier pass. Claims are limited to captured-data consistency, with no RPC authentication or semantic field attribution. |
| [#192](https://github.com/lalalune/pumpfun-source/pull/192) | Mayhem Linux helper comparison | Saved-artifact verifier and 18 tests pass. Five additional raw ranges are reproduced with ambiguity retained; no new compilation, runtime or unique historical compiler claim. |

| [#193](https://github.com/lalalune/pumpfun-source/pull/193) | Relay DonateContext source identity | Independent native build reproduces both hashes; full optional ELF measurement and all six tests pass. Natural-link raw matches improve 317→320 without losses. |
| [#194](https://github.com/lalalune/pumpfun-source/pull/194) | Fees boxed admin context source proposal | Source verifier and 13 tests pass. Rebased head was re-reviewed with identical proposal files. This source change was already present in the current composition. |
| [#195](https://github.com/lalalune/pumpfun-source/pull/195) | Fees full-account prefix integration | Verifier and five mutation tests pass; independent native build matches both hashes. Fresh 17,331-case suite passes. Current frontier: 552 normalized, 118 raw-local, 405 unique, 33 unmatched. |
| [#196](https://github.com/lalalune/pumpfun-source/pull/196) | Relay access-control layout and allocation provenance | All nine evidence verifiers and five negative tests pass; 536 signed records revalidated, all 13 retained loader transactions decoded, and 912 local signed loader transactions freshly replayed. Default-link variant reaches 376 raw-local windows; selected sources remain unchanged. |

| [#197](https://github.com/lalalune/pumpfun-source/pull/197) | Source-only Fees union and Crank diagnostic correction | Source integrity/materialization and all nine tests pass. The safe-materialization test requires a non-symlink temporary directory. Three source stages and reported 545/550/550 measurements remain separate from the later artifact-backed frontier; no optional compiler or runtime verification is claimed in this review. |

| [#198](https://github.com/lalalune/pumpfun-source/pull/198) | Source-only exact Relay ELF/linker recipe | Default verifier, all 12 tests and 60-input materialization pass. Optional literal comparison against the retained fresh exact build passes. All 492 selectors resolve uniquely to the same ordered object sections as that build; the allocator selector is safely generalized. No new compilation or VM run was needed in this review. Its allocation helper constructs a separate zero-filled image; the earlier artifact packet supplies the distinct real-loader execution evidence. |

| [#199](https://github.com/lalalune/pumpfun-source/pull/199) | Unique Relay reference correspondence | Regenerated graph/certificate and all 18 tests pass. The declared positional graph forces 492 singleton pairs matching the retained linker solution. This is graph-scoped uniqueness, not historical source or indirect-behavior proof. |
| [#200](https://github.com/lalalune/pumpfun-source/pull/200) | Included AdminCto business source | Source verifier and 13 tests pass. Subsequent independent composition onto the actual current source reaches 554 windows with two identical builds and 17,331 passing cases; the PR's original source-only 547→548 result retains its own scope. |

| [#201](https://github.com/lalalune/pumpfun-source/pull/201) | Crank native-only flow and strict observations | Verifier, six mutation tests and saved-signature checker pass. Fresh 304-case replay exactly reproduces the retained receipt: 292 raw-equal cases, 12 failures limited to compute-log lines; every application/nonlog field agrees. Separate 552-window candidate; not promoted into the current 554-window composition. |
| [#202](https://github.com/lalalune/pumpfun-source/pull/202) | Public instruction-module source proposal | Source verifier and all 13 tests pass. Its 545→546 parent-specific claim is separate from the independently artifact-backed 553-window visibility recovery already integrated here; no additional current-window gain is counted. |

| [#203](https://github.com/lalalune/pumpfun-source/pull/203) | Canonical exact Relay source and successor guard | Replaces the canonical Relay source with the 60-input exact recipe and archives the prior 23-input source. Review fixes author-checkout-dependent mount validation, adds portable-locator/read-only/critical-code controls, and updates the current inventory to the canonical selection. Current/historical guards, saved signatures, fresh loader and independent native build are verified in the review evidence. |

The checked PR head SHAs are listed in the Git merge parents. No complete-program identity or exhaustive semantic correctness follows from merging these research packets. The generated inventory remains pinned to its declared Fees and artifact-backed Relay candidates; alternative source proposals are not silently combined.

## Review checks

- Default source/evidence verifiers and each packet’s regression/mutation suite passed. Tests that depend on sibling-module imports were run with their documented normal Python entrypoint. Materialization tests used a non-symlink temporary directory so the intended symlink rejection remained enabled.
- `refresh.py --check` and `review.py --check` passed for all 4,415 inventory rows.
- The nine capture checks and six tooling tests passed. The current checkpoint guard passed.
- Independent Relay v1.48 compilation reproduced candidate `bdd03c7765c65d5c7ea9f1c16900f766e38c97fcec3071e29678f0ae52772399` and symbols `1ca9e99a37864a75d854d815848c7ce7cae838a719591dfac0286addf2193120` from a fresh target directory. The declared 483 normalized / 130 raw-local result and all 51 worker callees rechecked.
- Fresh runtime review: Relay 536 records / 534 fixtures, social creation 157 cases, and relay rejection 16 cases; zero comparator failures. These retain their documented exclusions.

The source-only packets deliberately omit compiled artifacts and replay receipts. Their default verifiers establish source integrity, not their reported local runtime observations. Genuine fixed-admin initialization, protected settlement success, all-data/transitive/indirect identity, historical recipes and whole-file equality remain open.

## Subsequent exact-link integration

The separate linked-ELF packet now reproduces all meaningful Relay bytes and the
loader-created capture payload. Two real builds, a fresh isolated dependency
build, 536 bounded signed records and 912 fresh loader transactions support this
result. This is an explicitly reconstructed layout, not historical build proof.
The four core selected programs remain byte-unequal.

## Additional PR204–206 review

| PR | Scope | Review result |
| --- | --- | --- |
| [#204](https://github.com/lalalune/pumpfun-source/pull/204) | Constant Pubkey initializer boundary | Source verifier and all 13 tests pass; exact one-file source delta reviewed. The 550→551 observation is source-only and not composed onto later frontiers. |
| [#205](https://github.com/lalalune/pumpfun-source/pull/205) | Checked Crank destination credit | Saved-evidence verifier passes. Fresh 76-case replay equals the saved JSON exactly: 15 control errors, zero proposal errors. PR201 follow-up preserves the native-only flow; no combined candidate claimed. |
| [#206](https://github.com/lalalune/pumpfun-source/pull/206) | Complete legacy/V2 distribution helpers | Full verifier and five negative controls pass. All three source maps differ only in sharing_update.rs. Fresh 417-case replay equals the saved JSON exactly; 556 normalized, 118 raw-local, 409 unique pairs, 29 unmatched. |

These additions retain their own immutable baselines. README and remaining-work
notes distinguish the newest 556-window research candidate from the generated
554-window pinned inventory. Additive progress-log conflicts were resolved by
retaining both entries. PR203's rebased head adds no source changes to the tested
canonical Relay; the reviewed portable guard is retained.

## PR207: typed Relay donation encoder

The full verifier and all five negative controls pass. Fresh execution of all
357 donation-Crank cases matches the retained JSON exactly, including the 159
cases reaching the real captured Relay CPI. Ordinary public module visibility
retains the borrowed typed encoder and its real caller; nine direct callee
bodies and all 165 Locations match. The new candidate reaches 557 normalized
windows, 118 raw-local, and 410 unique pairs without losses. The Crank caller
and whole ELF remain unmatched. The current 556 inventory is not silently
changed by this additive packet. Progress-log conflicts retain both entries.

## PR208–210 review

| PR | Evidence reviewed | Result |
| --- | --- | --- |
| #208 | Mayhem alloc type-ID provenance | Verifier and all 16 tests pass; two existing ranges traced to retained library objects. Full publisher archive membership was not rerun during this review. No new body coverage or execution claimed. |
| #209 | Source-only six-body Fees union | Source verifier and all 13 tests pass; 42→43 input map and seven overrides. Added three exact package-local whitespace rules with literal verification; compiler input bytes unchanged. The reported 558 count is an independent older-baseline source proposal. |
| #210 | AMM buyback helper | Full artifact/source/window/location/saved-signature verifier and all five resealed negative controls pass. 489 normalized windows, 93 raw, 296 unmatched; 53 Locations and 3,172 signed submissions per retained build. No fresh compiler or VM execution claimed by this review. |

The #209 proposal does not contain #201's native lifetimes or #206's helper
recoveries. Its count is not added to the current independently compiled union.
#210 retains explicit synthetic source-line layout and root path mappings,
not a historical recipe claim. Its publication wording was corrected;
artifact and source bytes are unchanged.

## PR211–213 review

- PR211: full verifier and ten mutation tests pass; 804 saved signatures verify.
  Six Mayhem helper gains are distinguished from one newly admitted existing
  match. Full handlers and four Sell log discrepancies remain unresolved.
- PR212: source verifier and thirteen tests pass on its exact 43-input parent.
  Two literal package-local whitespace rules preserve the source and patch.
  Its exotic-body gain is not added to the independent current558 composition.
- PR213: full body/callee/data verifier and five mutation checks pass. Retained
  417 plus24 cases remain bound to its independent557 parent; the22 completed-
  curve cases exercise the new branch, while two incomplete-curve controls
  retain downstream log differences. No fresh VM run is claimed in this review.

The remaining-account helper's public ownership/borrow reconstruction is
recorded separately; all three source counts retain their declared baselines.

## PR214: Mayhem GlobalParams layout

The full verifier and fourteen mutation tests pass, including independent
verification of 2,868 saved signatures and complete expected account bytes for
624 successful transport/update/reset cases. Four complete helper matches are
added; the quote-aware validator remains explicitly unmatched. The latest
research scope is196 admitted /188 matched /8 unmatched and245 opaque windows;
twelve raw-equal opaque windows remain semantically opaque. Four Sell log
differences and all full trade-handler gaps remain. No canonical promotion or
fresh VM execution is claimed by this review.

## PR215: legacy Social claim source semantics

The source verifier and all thirteen tests pass. Review preserves two exact
package-local whitespace rules without changing compiler inputs. The claimed
348-case correction and 559-window parent remain explicitly unpublished
execution observations, not newly verified runtime evidence. This source-only
proposal does not alter the current 558-window artifact-backed Fees inventory.
Mayhem remains the active reconstruction priority.

## PR216–217 review

- PR216: full verifier and three resealed negative controls pass. The 563-window Fees composition preserves both declared parents and adds a complete 1,688-byte caller; its preparation callee remains unequal. Saved 17,331 plus 24-case receipts are checked, with no new compiler/VM execution claimed in this review. It remains separate from the currently pinned research inventory.
- PR217: the controlled Mayhem sysroot verifier and all 21 tests pass. The saved experiment holds the Windows compiler fixed while replacing the complete target library set. It adds provenance evidence, not new body ranges. Full publisher archives were not rechecked in this review, and no fresh compilation is claimed.

## PR216 updated head: shared authorization

The updated head also retains a complete 1,208-byte authorization helper, with
nine direct callee bodies and eleven directly referenced objects checked. Both
packet verifiers and the new three negative controls pass. The independent
Fees composition reaches 564 normalized windows, 143 raw-local matches and
168 Location observations. These counts belong to that packet; the pinned
research inventory is unchanged while Mayhem remains the active priority.

## PR218: sharing-parser source integration

The source verifier and all thirteen tests pass. Review preserves patch context
with a single literal package-local whitespace rule. The two parser gains and
attributed distribution-helper composition remain an independent 563-window
source proposal; no new compiler or runtime execution is claimed by this review.
It is not combined with the other 563/564-window branch or the pinned inventory.

## PR219: native payout arithmetic

Merged as `427ddc0783ff306ee26eb66f2586ed637379b00c`. Review checked the three
source changes and saved build/regression evidence, then independently reran
all 119 focused cases: 38 baseline mismatches, zero proposal mismatches. Overflow
rollback and V2 native no-op diagnostics are covered. The packet reports 17,331
saved regression comparisons and preserves 559 normalized / 143 raw-local
counterparts; no new complete body is claimed. This review did not rerun that
full suite or compile the candidate. The separate Fees proposal does not replace
the pinned inventory. GitHub confirms the PR is merged.

## PR220: composed Fees transfer frontier

Reviewed head `944e06e79e0d3018a1003b27ddb9119a7462ce95`. The verifier recomputes
569 normalized matches, 143 raw-local matches, 168 Location observations and all
33 direct callee shapes for the three new transfer bodies. It checks the native
payout and parser composition plus saved 17,331 + 119 + 8 + 24 comparisons. All
four negative controls pass, and eight fresh quote-owner replays pass. No fresh
compiler or full 17,331-case execution is claimed by this review.

Another process merged the same reviewed head as
`3dc06e669571ed12290339df96f08866fca43eb0` while review was running. The published
tree was verified identical to the local reviewed merge. This independent Fees
frontier does not silently replace the pinned inventory or change the Mayhem
priority.

## PR221: history-independent Relay source authentication

The source loader verifies the unchanged historical manifest, complete package
membership, all three 60-input source maps and both patches without Git or
network access. Review found macOS temporary fixtures traversed the `/var`
symlink; the tests now resolve their temporary roots, while the loader's strict
symlink checks remain intact. All ten tests pass, including an actual shallow
fixture and a no-subprocess export. The archived linked-ELF verifier also passes
locally; this is saved-evidence verification, not a new build or target run.

The merge preserves the current Mayhem documentation and governance hashes,
regenerates dependency seals, and leaves historical sources, artifacts and
runtime receipts unchanged. Hosted CI remains a separate check.

## PR222: complete Fees V2 transfer adapter

Reviewed head `0e8fa80aa560862bb8d2ed1df6e48add8271959b` and merged as
`350db1c8`. The verifier checks the full 3,096-byte body, thirteen direct callee
shapes and the complete System ID, preserving the parent frontier and all saved
17,331 + 119 + 8 + 24 comparisons. All three negative controls pass. No fresh
compiler or target execution is claimed by this review. The separate Fees
candidate reaches 570 normalized windows and retains 143 raw-local matches;
Mayhem remains the active reconstruction priority.

## PR223: native Windows baseline provenance

Merged as `5905229cd0859e8a423eae39ea8867242382a98b`. Review passed the source/
artifact verifier and all seventeen tests. All 215 publisher crate archives were
also independently rehashed, with their complete vendor checksum maps regenerated;
local Windows SDK files and the provisioned vendor tree were not rechecked.
No fresh Windows compiler or target execution was performed during review.

This is an independent control of the old fifteen-input PR214 source, preserving
188 examined and 327 all-window matches. It does not replace the new 341-window
native Program source or add recoveries. Its 720-byte text-size difference is
explained by two duplicate function-shape counts, not proved to be a historical
linker decision. Whole original identity remains unproved.

## PR224: SweepBuyback source-only proposal

Merged as `aafcc037`. The source verifier, all fourteen source tests (including
an added narrow-whitespace check), and exact 43-input materialization pass.
Review preserves the literal reversible patch with a package-local attribute;
no source input or source patch bytes were changed. The proposal retains its
explicit false native-build/runtime/whole-identity claims. Unpublished local
execution claims are not acceptance evidence for this review, and PR219's
independently published destination arithmetic fix keeps its prior credit.

## PR225: legacy update caller and finishing helper

Merged as `ed5ac169e01c2542a4c1305f7e3a9ba160b54ed5` after marking the reviewed
draft ready. The complete verifier and all three negative controls pass. The
packet binds two complete normalized bodies (5,672 and 5,640 bytes), 59 direct
callee shapes and all 40 direct data references; the independent Fees frontier
reaches 572/585 with 143 raw-local matches. This review does not rerun the full
saved 17,331-case suite or compile a new artifact.

Sixteen fresh legacy-update comparisons match errors, accounts, CPI, return
values and events. Fourteen also have identical application logs. Two retain
the parent's existing remaining-account source-location difference (original
update_fee_shares.rs:186 versus candidate sharing_update.rs:230); neither is a
new regression. The merged packet's files were verified identical to the
reviewed head. Canonical selected checkpoints remain unchanged.
