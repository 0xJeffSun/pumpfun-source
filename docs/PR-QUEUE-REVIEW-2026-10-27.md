# PR queue review — 27 October 2026

Reviewed PRs #170–#184 as a combined merge tree based on `ba7883511942965c5c9def03971bdaff84963d6b`. Selected program sources, captures, scripts and workflows are unchanged. Overlapping append-only progress-log additions were preserved during local conflict resolution.

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

The checked PR head SHAs are listed in the Git merge parents. No complete-program identity or exhaustive semantic correctness follows from merging these research packets. The generated inventory remains pinned to its declared Fees and artifact-backed Relay candidates; alternative source proposals are not silently combined.

## Review checks

- Default source/evidence verifiers and each packet’s regression/mutation suite passed. Tests that depend on sibling-module imports were run with their documented normal Python entrypoint. Materialization tests used a non-symlink temporary directory so the intended symlink rejection remained enabled.
- `refresh.py --check` and `review.py --check` passed for all 4,415 inventory rows.
- The nine capture checks and six tooling tests passed. The current checkpoint guard passed.
- Independent Relay v1.48 compilation reproduced candidate `bdd03c7765c65d5c7ea9f1c16900f766e38c97fcec3071e29678f0ae52772399` and symbols `1ca9e99a37864a75d854d815848c7ce7cae838a719591dfac0286addf2193120` from a fresh target directory. The declared 483 normalized / 130 raw-local result and all 51 worker callees rechecked.
- Fresh runtime review: Relay 536 records / 534 fixtures, social creation 157 cases, and relay rejection 16 cases; zero comparator failures. These retain their documented exclusions.

The source-only packets deliberately omit compiled artifacts and replay receipts. Their default verifiers establish source integrity, not their reported local runtime observations. Genuine fixed-admin initialization, protected settlement success, all-data/transitive/indirect identity, historical recipes and whole-file equality remain open.
